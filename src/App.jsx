import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ChapterView } from './components/ChapterView';
import { FlashcardReview } from './components/FlashcardReview';
import { ProgressDashboard } from './components/ProgressDashboard';
import { LeaderboardModal } from './components/LeaderboardModal';
import { AnswerStructureView } from './components/AnswerStructureView';
import { AdminDashboard } from './components/AdminDashboard';
import { FirebaseConfigModal } from './components/FirebaseConfigModal';
import { GuidedTutorialModal } from './components/GuidedTutorialModal';
import { CelebrationModal } from './components/CelebrationModal';

function AppContent() {
  const { 
    currentScreen, loadingData, showTutorial, 
    completeTutorial, isTutorialReplay, celebrationEvent, 
    setCelebrationEvent 
  } = useApp();
  
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  if (loadingData) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4 text-slate-300">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold tracking-wide">Loading CA Business Law Deck...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Sticky Header Navbar */}
      <Navbar onOpenFirebaseConfig={() => setIsConfigOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {currentScreen === 'dashboard' && <Dashboard />}
        {currentScreen === 'chapter' && <ChapterView />}
        {currentScreen === 'review' && <FlashcardReview />}
        {currentScreen === 'progress' && <ProgressDashboard />}
        {currentScreen === 'leaderboard' && <LeaderboardModal />}
        {currentScreen === 'answer-structure' && <AnswerStructureView />}
        {currentScreen === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 text-center text-xs text-slate-400 space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-semibold">
          <span>Indian Contract Act, 1872</span>
          <span>•</span>
          <span>Sale of Goods Act, 1930</span>
          <span>•</span>
          <span>Indian Partnership Act, 1932</span>
          <span>•</span>
          <span>LLP Act, 2008</span>
          <span>•</span>
          <span>Companies Act, 2013</span>
        </div>
        <p>© CA Law Learn — Free Business Law Spaced-Repetition Study Platform for CA Foundation Students</p>
        <p className="text-[11px] text-slate-500 max-w-2xl mx-auto pt-1">
          <strong>About this content:</strong> 100% Verified ICAI syllabus content designed for CA Foundation Business Laws. Features 21 topic modules, examiner keywords, landmark case laws, definition breakdowns, and SM-2 spaced repetition.
        </p>
      </footer>

      {/* Multi-Screen Guided Tutorial Modal (Auto-play first time & Replay mode) */}
      <GuidedTutorialModal 
        isOpen={showTutorial}
        onClose={completeTutorial}
        onComplete={completeTutorial}
        isReplay={isTutorialReplay}
      />

      {/* Celebration Popup for Streak Milestones & Mastery */}
      <CelebrationModal 
        event={celebrationEvent} 
        onClose={() => setCelebrationEvent(null)} 
      />

      {/* Firebase Settings Modal */}
      <FirebaseConfigModal 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)} 
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}
