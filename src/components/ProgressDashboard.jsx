import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, Award, BarChart2, CheckCircle2, BookOpen, 
  AlertTriangle, ArrowRight, ShieldAlert, Target, HelpCircle 
} from 'lucide-react';

export function ProgressDashboard() {
  const { 
    chapters, chapterStats, stats, streaks, 
    setSelectedChapter, setCurrentScreen, startReviewSession, openHelpTutorial 
  } = useApp();

  // Find weak chapters (mastery < 70%)
  const weakChapters = chapters.filter(chap => {
    const s = chapterStats[chap.id];
    return !s || s.percent < 70;
  });

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-amber-400" />
            Study Analytics & Retention Progress
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track card mastery, spaced repetition intervals, and daily habit consistency.
          </p>
        </div>

        <button
          onClick={openHelpTutorial}
          className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/30 text-amber-400 font-semibold px-3 py-1.5 rounded-xl text-xs transition-all self-start sm:self-auto"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Watch tutorial again</span>
        </button>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Streak Stat */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Streak Record</span>
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-flame" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-amber-400">{streaks.currentStreak || 0}</span>
            <span className="text-sm font-semibold text-slate-400">days active</span>
          </div>
          <p className="text-xs text-slate-400 border-t border-slate-800 pt-3">
            Longest recorded streak: <strong className="text-amber-300">{streaks.longestStreak || 0} days</strong>
          </p>
        </div>

        {/* Overall Mastery Stat */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Cards Mastered</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-emerald-400">{stats.masteredCount}</span>
            <span className="text-sm font-semibold text-slate-400">/ {stats.totalCards} cards</span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${stats.masteryPercent}%` }} />
          </div>
        </div>

        {/* Spaced Repetition Queue */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">In Active Review</span>
            <BookOpen className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-indigo-300">{stats.reviewingCount}</span>
            <span className="text-sm font-semibold text-slate-400">cards scheduling</span>
          </div>
          <p className="text-xs text-slate-400 border-t border-slate-800 pt-3">
            New unstudied cards remaining: <strong className="text-slate-300">{stats.newCount}</strong>
          </p>
        </div>

      </div>

      {/* Weak Areas & Chapter Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chapter Performance Breakdown */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
          <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            Chapter-wise Mastery Breakdown
          </h3>

          <div className="space-y-4">
            {chapters.map(chap => {
              const s = chapterStats[chap.id] || { percent: 0, masteredCards: 0, totalCards: 0 };
              return (
                <div key={chap.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-200">{chap.title}</span>
                    <span className="text-amber-400 font-bold">{s.percent}% ({s.masteredCards}/{s.totalCards})</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all"
                      style={{ width: `${s.percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Focus Areas (Weak Chapters Alert) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
              <ShieldAlert className="w-4 h-4" />
              Focus Areas (Weak Chapters)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Chapters with lower than 70% mastery need additional examiner keyword review.
            </p>

            {weakChapters.length > 0 ? (
              <div className="space-y-3">
                {weakChapters.slice(0, 3).map(chap => (
                  <div key={chap.id} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-slate-200 block">{chap.title}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-rose-400 font-semibold">
                        Mastery: {chapterStats[chap.id]?.percent || 0}%
                      </span>
                      <button
                        onClick={() => {
                          setSelectedChapter(chap);
                          startReviewSession('chapter', chap.id);
                        }}
                        className="text-[11px] font-bold text-amber-400 hover:underline flex items-center gap-1"
                      >
                        Practice Now <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="text-xs text-emerald-300 font-bold">All chapters above target mastery!</p>
              </div>
            )}
          </div>

          <button
            onClick={() => startReviewSession('all')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-3 rounded-xl transition-all"
          >
            Review All Flashcards
          </button>
        </div>

      </div>

      {/* Footer Secondary Replay Link */}
      <div className="pt-4 text-center border-t border-slate-800/80">
        <button
          onClick={openHelpTutorial}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Need a refresher on how the app works? Watch the guided tutorial again</span>
        </button>
      </div>

    </div>
  );
}
