import { db, isFirebaseConfigured } from '../config/firebase';
import { 
  collection, doc, getDoc, getDocs, setDoc, updateDoc, 
  query, where, orderBy, limit, writeBatch 
} from 'firebase/firestore';
import { 
  INITIAL_CHAPTERS, INITIAL_TOPICS, INITIAL_FLASHCARDS, INITIAL_WORKED_ANSWERS 
} from '../data/seedData';
import { calculateStreakUpdate } from './spacedRepetition';

const LOCAL_STORAGE_KEYS = {
  CARD_PROGRESS: 'calaw_card_progress_v1',
  STREAKS: 'calaw_streaks_v1',
  LEADERBOARD_OPT_IN: 'calaw_leaderboard_opt_in_v1',
  USER_PROFILE: 'calaw_user_profile_v1',
  FEEDBACK: 'calaw_feedback_v1',
  ANALYTICS: 'calaw_analytics_v1'
};

// Helper for local storage reading
const getLocal = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

// Helper for local storage writing
const setLocal = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Local storage error:", e);
  }
};

/**
 * Fetch all chapters
 */
export async function getChapters() {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'chapters'));
      if (!snap.empty) {
        const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return list.sort((a, b) => a.order - b.order);
      }
    } catch (err) {
      console.warn("Firestore fetch chapters failed, using initial dataset:", err);
    }
  }
  return INITIAL_CHAPTERS;
}

/**
 * Fetch topics (optionally filtered by chapterId)
 */
export async function getTopics(chapterId = null) {
  let list = INITIAL_TOPICS;
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'topics'));
      if (!snap.empty) {
        list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore fetch topics failed:", err);
    }
  }
  if (chapterId) {
    list = list.filter(t => t.chapterId === chapterId);
  }
  return list.sort((a, b) => a.order - b.order);
}

/**
 * Fetch flashcards (optionally filtered by topicId)
 */
export async function getFlashcards(topicId = null) {
  let list = INITIAL_FLASHCARDS;
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'flashcards'));
      if (!snap.empty) {
        list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore fetch flashcards failed:", err);
    }
  }
  if (topicId) {
    list = list.filter(f => f.topicId === topicId);
  }
  return list;
}

/**
 * Fetch worked answer examples
 */
export async function getWorkedAnswers(chapterId = null) {
  let list = INITIAL_WORKED_ANSWERS;
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'workedAnswers'));
      if (!snap.empty) {
        list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore fetch worked answers failed:", err);
    }
  }
  if (chapterId) {
    list = list.filter(w => w.chapterId === chapterId);
  }
  return list;
}

/**
 * Get user card progress map { [flashcardId]: progressObject }
 */
export async function getUserCardProgress(userId = 'guest') {
  if (isFirebaseConfigured && db && userId && userId !== 'guest') {
    try {
      const colRef = collection(db, `users/${userId}/cardProgress`);
      const snap = await getDocs(colRef);
      const progressMap = {};
      snap.forEach(doc => {
        progressMap[doc.id] = doc.data();
      });
      return progressMap;
    } catch (err) {
      console.warn("Firestore get user card progress error:", err);
    }
  }
  return getLocal(LOCAL_STORAGE_KEYS.CARD_PROGRESS, {});
}

/**
 * Save user card progress for a specific card
 */
export async function saveUserCardProgress(userId = 'guest', flashcardId, progressData) {
  const localMap = getLocal(LOCAL_STORAGE_KEYS.CARD_PROGRESS, {});
  localMap[flashcardId] = progressData;
  setLocal(LOCAL_STORAGE_KEYS.CARD_PROGRESS, localMap);

  if (isFirebaseConfigured && db && userId && userId !== 'guest') {
    try {
      const cardDocRef = doc(db, `users/${userId}/cardProgress`, flashcardId);
      await setDoc(cardDocRef, progressData, { merge: true });
    } catch (err) {
      console.error("Firestore save card progress error:", err);
    }
  }
  return localMap;
}

/**
 * Get user streak status
 */
export async function getUserStreaks(userId = 'guest') {
  const defaultStreaks = { currentStreak: 0, longestStreak: 0, lastActiveDate: null, cardsReviewedToday: 0 };
  
  if (isFirebaseConfigured && db && userId && userId !== 'guest') {
    try {
      const streakRef = doc(db, `users/${userId}/streaks`, 'main');
      const snap = await getDoc(streakRef);
      if (snap.exists()) {
        return snap.data();
      }
    } catch (err) {
      console.warn("Firestore get user streaks error:", err);
    }
  }
  return getLocal(LOCAL_STORAGE_KEYS.STREAKS, defaultStreaks);
}

/**
 * Record a card review and update streak
 */
export async function recordReviewAndCheckStreak(userId = 'guest', cardsThreshold = 3) {
  const today = new Date().toISOString().split('T')[0];
  const streaks = await getUserStreaks(userId);

  let cardsReviewedToday = streaks.lastActiveDate === today ? (streaks.cardsReviewedToday || 0) + 1 : 1;
  let updatedStreaks = { ...streaks, cardsReviewedToday };

  if (cardsReviewedToday >= cardsThreshold && streaks.lastActiveDate !== today) {
    const streakCalc = calculateStreakUpdate(streaks);
    updatedStreaks = {
      ...streakCalc,
      cardsReviewedToday
    };
  }

  setLocal(LOCAL_STORAGE_KEYS.STREAKS, updatedStreaks);

  if (isFirebaseConfigured && db && userId && userId !== 'guest') {
    try {
      const streakRef = doc(db, `users/${userId}/streaks`, 'main');
      await setDoc(streakRef, updatedStreaks, { merge: true });

      const optIn = getLocal(LOCAL_STORAGE_KEYS.LEADERBOARD_OPT_IN, true);
      if (optIn) {
        const userProfile = getLocal(LOCAL_STORAGE_KEYS.USER_PROFILE, { displayName: 'Law Aspirant' });
        const leaderRef = doc(db, 'leaderboard', userId);
        await setDoc(leaderRef, {
          userId,
          displayName: userProfile.displayName || 'CA Aspirant',
          currentStreak: updatedStreaks.currentStreak,
          longestStreak: updatedStreaks.longestStreak,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }
    } catch (err) {
      console.error("Firestore streak update error:", err);
    }
  }

  return updatedStreaks;
}

/**
 * Fetch Leaderboard top students
 */
export async function getLeaderboard() {
  const mockLeaderboard = [
    { userId: '1', displayName: 'Rohan Sharma (AIR 12)', currentStreak: 24, longestStreak: 24 },
    { userId: '2', displayName: 'Ananya Verma', currentStreak: 19, longestStreak: 21 },
    { userId: '3', displayName: 'Priya Mehta', currentStreak: 14, longestStreak: 14 },
    { userId: '4', displayName: 'Vikram Gupta', currentStreak: 9, longestStreak: 12 },
    { userId: '5', displayName: 'You (Local Student)', currentStreak: getLocal(LOCAL_STORAGE_KEYS.STREAKS, {}).currentStreak || 0, longestStreak: getLocal(LOCAL_STORAGE_KEYS.STREAKS, {}).longestStreak || 0 }
  ];

  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'leaderboard'), orderBy('currentStreak', 'desc'), limit(20));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => d.data());
      }
    } catch (err) {
      console.warn("Firestore leaderboard query error, using fallback:", err);
    }
  }
  return mockLeaderboard.sort((a, b) => b.currentStreak - a.currentStreak);
}

/**
 * Submit feedback entry
 */
export async function submitFeedbackData({ userId = 'guest', userEmail = '', contextId = '', contextType = 'general', contextTitle = '', issueType, message }) {
  const newFeedback = {
    id: 'fb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    userId,
    userEmail: userEmail || 'Anonymous Student',
    contextId,
    contextType, // 'flashcard' | 'topic' | 'general'
    contextTitle,
    issueType, // 'Wrong section/case law' | 'Confusing explanation' | 'Bug' | 'Other'
    message: message || '',
    createdAt: new Date().toISOString(),
    status: 'open' // 'open' | 'resolved'
  };

  // Save locally
  const localList = getLocal(LOCAL_STORAGE_KEYS.FEEDBACK, []);
  localList.unshift(newFeedback);
  setLocal(LOCAL_STORAGE_KEYS.FEEDBACK, localList);

  if (isFirebaseConfigured && db) {
    try {
      const fbRef = doc(db, 'feedback', newFeedback.id);
      await setDoc(fbRef, newFeedback);
    } catch (err) {
      console.warn("Firestore feedback submission error (saved locally):", err);
    }
  }

  return { success: true, feedback: newFeedback };
}

/**
 * Fetch all feedback entries for admin review
 */
export async function getFeedbackData() {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'feedback'));
      if (!snap.empty) {
        const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    } catch (err) {
      console.warn("Firestore get feedback error, fallback to local storage:", err);
    }
  }
  return getLocal(LOCAL_STORAGE_KEYS.FEEDBACK, []);
}

/**
 * Update status of a feedback entry ('open' or 'resolved')
 */
export async function updateFeedbackStatusData(feedbackId, newStatus) {
  const localList = getLocal(LOCAL_STORAGE_KEYS.FEEDBACK, []);
  const updated = localList.map(item => item.id === feedbackId ? { ...item, status: newStatus } : item);
  setLocal(LOCAL_STORAGE_KEYS.FEEDBACK, updated);

  if (isFirebaseConfigured && db) {
    try {
      const fbRef = doc(db, 'feedback', feedbackId);
      await updateDoc(fbRef, { status: newStatus });
    } catch (err) {
      console.warn("Firestore update feedback status error:", err);
    }
  }
  return true;
}

/**
 * Record aggregate analytics when a card is reviewed
 */
export async function recordAnalyticsReviewData({ chapterId, topicId, flashcardId, rating, userId = 'guest' }) {
  const today = new Date().toISOString().split('T')[0];
  
  const analyticsData = getLocal(LOCAL_STORAGE_KEYS.ANALYTICS, {
    totalReviews: 0,
    topics: {},
    chapters: {},
    dau: {}
  });

  analyticsData.totalReviews = (analyticsData.totalReviews || 0) + 1;

  if (chapterId) {
    analyticsData.chapters[chapterId] = analyticsData.chapters[chapterId] || { reviews: 0, easyCount: 0, hardCount: 0 };
    analyticsData.chapters[chapterId].reviews += 1;
    if (rating === 'easy' || rating === 'good') analyticsData.chapters[chapterId].easyCount += 1;
    if (rating === 'hard') analyticsData.chapters[chapterId].hardCount += 1;
  }

  if (topicId) {
    analyticsData.topics[topicId] = analyticsData.topics[topicId] || { reviews: 0, easyCount: 0, hardCount: 0, lastReviewedAt: null };
    analyticsData.topics[topicId].reviews += 1;
    if (rating === 'easy' || rating === 'good') analyticsData.topics[topicId].easyCount += 1;
    if (rating === 'hard') analyticsData.topics[topicId].hardCount += 1;
    analyticsData.topics[topicId].lastReviewedAt = new Date().toISOString();
  }

  analyticsData.dau[today] = analyticsData.dau[today] || { count: 0, users: {} };
  if (!analyticsData.dau[today].users[userId]) {
    analyticsData.dau[today].users[userId] = true;
    analyticsData.dau[today].count += 1;
  }

  setLocal(LOCAL_STORAGE_KEYS.ANALYTICS, analyticsData);

  if (isFirebaseConfigured && db) {
    try {
      const analyticsRef = doc(db, 'analytics', 'summary');
      const topicRef = doc(db, 'analytics', `topic_${topicId || 'general'}`);
      const dauRef = doc(db, 'analytics', `dau_${today}`);

      const prevDoc = await getDoc(analyticsRef);
      const existingTotal = prevDoc.exists() ? (prevDoc.data().totalReviews || 0) : 0;
      await setDoc(analyticsRef, { totalReviews: existingTotal + 1, updatedAt: new Date().toISOString() }, { merge: true });

      if (topicId) {
        const prevTopicDoc = await getDoc(topicRef);
        const tData = prevTopicDoc.exists() ? prevTopicDoc.data() : { reviews: 0, easyCount: 0, hardCount: 0 };
        await setDoc(topicRef, {
          topicId,
          reviews: (tData.reviews || 0) + 1,
          easyCount: (tData.easyCount || 0) + (rating !== 'hard' ? 1 : 0),
          hardCount: (tData.hardCount || 0) + (rating === 'hard' ? 1 : 0),
          lastReviewedAt: new Date().toISOString()
        }, { merge: true });
      }

      const prevDauDoc = await getDoc(dauRef);
      const dauData = prevDauDoc.exists() ? prevDauDoc.data() : { count: 0, users: [] };
      const usersList = Array.isArray(dauData.users) ? dauData.users : [];
      if (!usersList.includes(userId)) {
        usersList.push(userId);
        await setDoc(dauRef, { date: today, count: usersList.length, users: usersList }, { merge: true });
      }
    } catch (err) {
      console.warn("Firestore analytics update error:", err);
    }
  }

  return analyticsData;
}

/**
 * Fetch analytics summary for admin dashboard
 */
export async function getAnalyticsSummaryData() {
  let summary = getLocal(LOCAL_STORAGE_KEYS.ANALYTICS, {
    totalReviews: 0,
    topics: {},
    chapters: {},
    dau: {}
  });

  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'analytics'));
      if (!snap.empty) {
        const firestoreTopics = {};
        const firestoreDau = {};
        let totalReviews = 0;

        snap.forEach(d => {
          const id = d.id;
          const data = d.data();
          if (id === 'summary') {
            totalReviews = data.totalReviews || 0;
          } else if (id.startsWith('topic_')) {
            firestoreTopics[data.topicId || id.replace('topic_', '')] = data;
          } else if (id.startsWith('dau_')) {
            firestoreDau[data.date || id.replace('dau_', '')] = { count: data.count || 0 };
          }
        });

        if (totalReviews > 0 || Object.keys(firestoreTopics).length > 0) {
          summary = {
            totalReviews: Math.max(totalReviews, summary.totalReviews || 0),
            topics: { ...summary.topics, ...firestoreTopics },
            chapters: summary.chapters || {},
            dau: { ...summary.dau, ...firestoreDau }
          };
        }
      }
    } catch (err) {
      console.warn("Firestore get analytics summary error:", err);
    }
  }

  return summary;
}



/**
 * Seed initial dataset into Firestore if collection is empty
 */
export async function seedInitialDataToFirestore() {
  if (!isFirebaseConfigured || !db) return { success: false, reason: 'Firebase not configured' };

  try {
    const chaptersSnap = await getDocs(collection(db, 'chapters'));
    if (!chaptersSnap.empty) {
      return { success: true, message: 'Firestore already populated' };
    }

    const batch = writeBatch(db);

    INITIAL_CHAPTERS.forEach(chap => {
      const ref = doc(db, 'chapters', chap.id);
      batch.set(ref, chap);
    });

    INITIAL_TOPICS.forEach(topic => {
      const ref = doc(db, 'topics', topic.id);
      batch.set(ref, topic);
    });

    INITIAL_FLASHCARDS.forEach(card => {
      const ref = doc(db, 'flashcards', card.id);
      batch.set(ref, card);
    });

    INITIAL_WORKED_ANSWERS.forEach(wa => {
      const ref = doc(db, 'workedAnswers', wa.id);
      batch.set(ref, wa);
    });

    await batch.commit();
    return { success: true, message: 'Seeded 30 flashcards, chapters, topics, and worked answers to Firestore!' };
  } catch (err) {
    console.error("Failed to seed Firestore:", err);
    return { success: false, error: err.message };
  }
}
