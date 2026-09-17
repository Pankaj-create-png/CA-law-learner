import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { 
  getChapters, getTopics, getFlashcards, getWorkedAnswers, 
  getUserCardProgress, saveUserCardProgress, getUserStreaks, 
  recordReviewAndCheckStreak, seedInitialDataToFirestore,
  recordAnalyticsReviewData
} from '../services/db';
import { calculateNextReview, isCardDue } from '../services/spacedRepetition';
import { exportKeywordPdf } from '../services/pdfExport';
import { db, isFirebaseConfigured } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import confetti from 'canvas-confetti';

import { verifyAllTopicsContent } from '../utils/contentVerifier';

const AppContext = createContext(null);

const LOCAL_STORAGE_KEYS = {
  EXPLANATION_MODE: 'calaw_explanation_mode_v1',
  TUTORIAL_COMPLETED: 'calaw_tutorial_completed_v1'
};

export function AppProvider({ children }) {
  const { user } = useAuth();
  
  // Navigation & Active View state
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard' | 'chapter' | 'review' | 'progress' | 'leaderboard' | 'answer-structure'
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  // Short vs Deep Explanation Toggle state — DEFAULT TO 'short'
  const [explanationMode, setExplanationMode] = useState(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEYS.EXPLANATION_MODE) || 'short';
    } catch (e) {
      return 'short';
    }
  });

  // Guided Tutorial Modal state (first-time vs replay)
  const [showTutorial, setShowTutorial] = useState(false);
  const [isTutorialReplay, setIsTutorialReplay] = useState(false);

  // Celebration modal state
  const [celebrationEvent, setCelebrationEvent] = useState(null);

  // Data collections
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [workedAnswers, setWorkedAnswers] = useState([]);
  const [cardProgress, setCardProgress] = useState({});
  const [streaks, setStreaks] = useState({ currentStreak: 0, longestStreak: 0, lastActiveDate: null, cardsReviewedToday: 0 });
  const [loadingData, setLoadingData] = useState(true);

  // Check tutorial completion status on load (local storage + Firestore profile)
  useEffect(() => {
    async function checkTutorialStatus() {
      const localFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.TUTORIAL_COMPLETED);
      
      if (localFlag) {
        setShowTutorial(false);
        return;
      }

      // Check Firestore profile if user signed in
      if (isFirebaseConfigured && db && user?.uid && user.uid !== 'guest') {
        try {
          const userDocRef = doc(db, `users/${user.uid}/profile`, 'main');
          const snap = await getDoc(userDocRef);
          if (snap.exists() && snap.data()?.hasCompletedTutorial) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.TUTORIAL_COMPLETED, 'true');
            setShowTutorial(false);
            return;
          }
        } catch (e) {
          console.warn("Firestore check tutorial error:", e);
        }
      }

      // First time user! Show tutorial
      setShowTutorial(true);
      setIsTutorialReplay(false);
    }

    if (!loadingData) {
      checkTutorialStatus();
    }
  }, [loadingData, user?.uid]);

  // Complete tutorial helper (persists locally and in Firestore)
  const completeTutorial = async () => {
    setShowTutorial(false);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TUTORIAL_COMPLETED, 'true');
    } catch (e) {}

    if (isFirebaseConfigured && db && user?.uid && user.uid !== 'guest') {
      try {
        const userDocRef = doc(db, `users/${user.uid}/profile`, 'main');
        await setDoc(userDocRef, { hasCompletedTutorial: true, updatedAt: new Date().toISOString() }, { merge: true });
      } catch (e) {
        console.error("Save tutorial status to Firestore error:", e);
      }
    }
  };

  // Open Help tutorial replay
  const openHelpTutorial = () => {
    setIsTutorialReplay(true);
    setShowTutorial(true);
  };

  // Persist explanation mode toggle
  const toggleExplanationMode = () => {
    setExplanationMode(prev => {
      const next = prev === 'short' ? 'deep' : 'short';
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.EXPLANATION_MODE, next);
      } catch (e) {}
      return next;
    });
  };

  // Load core data when user changes
  useEffect(() => {
    async function loadData() {
      setLoadingData(true);
      try {
        const [chaps, tops, cards, answers, progressMap, streakData] = await Promise.all([
          getChapters(),
          getTopics(),
          getFlashcards(),
          getWorkedAnswers(),
          getUserCardProgress(user?.uid),
          getUserStreaks(user?.uid)
        ]);

        setChapters(chaps);
        setTopics(tops);
        setFlashcards(cards);
        setWorkedAnswers(answers);
        setCardProgress(progressMap);
        setStreaks(streakData);

        // Run full syllabus content completeness verification audit
        verifyAllTopicsContent(tops, cards);
      } catch (err) {
        console.error("Error loading application data:", err);
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
  }, [user?.uid]);

  // Compute "Today's Review" due cards queue
  const dueFlashcards = useMemo(() => {
    return flashcards.filter(card => {
      const prog = cardProgress[card.id];
      return isCardDue(prog);
    });
  }, [flashcards, cardProgress]);

  // Compute overall stats
  const stats = useMemo(() => {
    const totalCards = flashcards.length;
    let masteredCount = 0;
    let reviewingCount = 0;
    let newCount = 0;
    let verifiedCount = 0;

    flashcards.forEach(card => {
      if (card.verified) verifiedCount++;
      const prog = cardProgress[card.id];
      if (!prog || prog.status === 'new') {
        newCount++;
      } else if (prog.status === 'mastered') {
        masteredCount++;
      } else {
        reviewingCount++;
      }
    });

    const masteryPercent = totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0;

    return {
      totalCards,
      masteredCount,
      reviewingCount,
      newCount,
      verifiedCount,
      dueCount: dueFlashcards.length,
      masteryPercent
    };
  }, [flashcards, cardProgress, dueFlashcards]);

  // Compute Chapter-wise statistics
  const chapterStats = useMemo(() => {
    const map = {};
    chapters.forEach(chap => {
      const chapTopics = topics.filter(t => t.chapterId === chap.id);
      const topicIds = new Set(chapTopics.map(t => t.id));
      const chapCards = flashcards.filter(f => topicIds.has(f.topicId));
      
      let mastered = 0;
      let total = chapCards.length;

      chapCards.forEach(card => {
        const prog = cardProgress[card.id];
        if (prog && prog.status === 'mastered') {
          mastered++;
        }
      });

      const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
      map[chap.id] = {
        totalCards: total,
        masteredCards: mastered,
        percent,
        topicCount: chapTopics.length
      };
    });
    return map;
  }, [chapters, topics, flashcards, cardProgress]);

  // Trigger Flashcard Review Session
  const startReviewSession = (mode = 'today', targetId = null) => {
    let cardsToReview = [];

    if (mode === 'today') {
      cardsToReview = dueFlashcards.length > 0 ? dueFlashcards : flashcards.slice(0, 10);
    } else if (mode === 'chapter' && targetId) {
      const chapTopics = topics.filter(t => t.chapterId === targetId);
      const topicIds = new Set(chapTopics.map(t => t.id));
      cardsToReview = flashcards.filter(f => topicIds.has(f.topicId));
    } else if (mode === 'topic' && targetId) {
      cardsToReview = flashcards.filter(f => f.topicId === targetId);
    } else if (mode === 'all') {
      cardsToReview = [...flashcards];
    }

    if (cardsToReview.length === 0) {
      alert("You're all caught up! Come back tomorrow to keep your streak alive.");
      return;
    }

    setReviewQueue(cardsToReview);
    setReviewIndex(0);
    setCurrentScreen('review');
  };

  // Handle rating a flashcard as "Easy" or "Hard"
  const handleRateCard = async (rating) => {
    if (reviewQueue.length === 0 || reviewIndex >= reviewQueue.length) return;

    const currentCard = reviewQueue[reviewIndex];
    const prevProg = cardProgress[currentCard.id];
    
    // Calculate new spaced repetition schedule
    const newProg = calculateNextReview(prevProg, rating);
    
    // Save updated progress locally and in Firestore
    const updatedMap = await saveUserCardProgress(user?.uid, currentCard.id, newProg);
    setCardProgress(updatedMap);

    // Update daily streak tracking
    const prevStreakVal = streaks.currentStreak || 0;
    const updatedStreaks = await recordReviewAndCheckStreak(user?.uid, 3);
    setStreaks(updatedStreaks);

    // Record aggregate usage analytics
    const currentTopic = topics.find(t => t.id === currentCard.topicId);
    await recordAnalyticsReviewData({
      chapterId: currentTopic?.chapterId,
      topicId: currentCard.topicId,
      flashcardId: currentCard.id,
      rating,
      userId: user?.uid || 'guest'
    });

    // Check streak milestone celebration (3, 7, 30 days)
    if (updatedStreaks.currentStreak > prevStreakVal && [3, 7, 30].includes(updatedStreaks.currentStreak)) {
      setCelebrationEvent({ type: 'streak', days: updatedStreaks.currentStreak });
    }

    // Advance to next card or complete session
    if (reviewIndex + 1 < reviewQueue.length) {
      setReviewIndex(prev => prev + 1);
    } else {
      // Session finished celebration!
      try {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }
  };

  // Trigger PDF Download
  const handleDownloadPdf = (chapter = null) => {
    exportKeywordPdf(chapter, topics, flashcards);
  };

  // Seed Firestore helper
  const handleSeedData = async () => {
    const result = await seedInitialDataToFirestore();
    if (result.success) {
      alert(result.message);
      const [chaps, tops, cards, answers] = await Promise.all([
        getChapters(), getTopics(), getFlashcards(), getWorkedAnswers()
      ]);
      setChapters(chaps);
      setTopics(tops);
      setFlashcards(cards);
      setWorkedAnswers(answers);
    } else {
      alert(`Seeding notice: ${result.reason || result.error}`);
    }
  };

  return (
    <AppContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      selectedChapter,
      setSelectedChapter,
      selectedTopic,
      setSelectedTopic,
      explanationMode,
      toggleExplanationMode,
      showTutorial,
      isTutorialReplay,
      completeTutorial,
      openHelpTutorial,
      celebrationEvent,
      setCelebrationEvent,
      chapters,
      topics,
      flashcards,
      workedAnswers,
      cardProgress,
      streaks,
      stats,
      chapterStats,
      dueFlashcards,
      reviewQueue,
      reviewIndex,
      loadingData,
      startReviewSession,
      handleRateCard,
      handleDownloadPdf,
      handleSeedData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
