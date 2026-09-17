import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, Play, CheckCircle2, BookOpen, ChevronRight, 
  Zap, Target, Award, CheckCircle, Download, FileText, Sparkles, Star 
} from 'lucide-react';

export function Dashboard() {
  const { 
    chapters, chapterStats, stats, streaks, 
    dueFlashcards, startReviewSession, setSelectedChapter, 
    setCurrentScreen, handleDownloadPdf 
  } = useApp();

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  // Compute last 7 days habit completion dots
  const getHabitDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'narrow' });
      
      const isActive = streaks.lastActiveDate === dateStr || 
        (i === 0 && (streaks.cardsReviewedToday || 0) >= 3);
      
      days.push({ dateStr, dayName, isActive, isToday: i === 0 });
    }
    return days;
  };

  const habitDays = getHabitDays();
  const streakBroken = streaks.currentStreak === 0 && streaks.longestStreak > 0;

  return (
    <div className="space-y-6 lg:space-y-8 pb-12">
      
      {/* Top Welcome & Streak Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
        
        {/* Today's Review Challenge Hero Card */}
        <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-3xl p-5 sm:p-7 shadow-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Today's Review • {today}</span>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-800/80 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
                  <BookOpen className="w-3 h-3 text-amber-400" /> 7 Full Syllabus Chapters
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug">
                {dueFlashcards.length > 0 ? (
                  <>You have <span className="text-amber-400 font-black">{dueFlashcards.length} cards due for review today</span></>
                ) : (
                  <>You're all caught up! Come back tomorrow to keep your streak alive.</>
                )}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                Reviewing cards daily strengthens long-term memory for examiner keywords, sections, and landmark case laws.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <button
                onClick={() => startReviewSession('today')}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{dueFlashcards.length > 0 ? "Start Review" : "Practice Flashcards"}</span>
              </button>

              <a
                href="/assets/CA-Law-Learn-Study-Guide.pdf"
                download="CA-Law-Learn-Study-Guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold px-4 py-3 rounded-2xl text-xs shadow-md shadow-emerald-500/20 transition-all active:scale-95"
              >
                <Download className="w-4 h-4 shrink-0 text-slate-950" />
                <span>Download Full Study Guide (PDF)</span>
              </a>

              <button
                onClick={() => setCurrentScreen('answer-structure')}
                className="flex items-center justify-center gap-2 bg-slate-950/80 hover:bg-slate-800/80 border border-indigo-500/30 text-indigo-300 font-semibold px-4 py-2.5 rounded-2xl text-xs transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>4-Step Answer Blueprint</span>
              </button>
            </div>
          </div>
        </div>

        {/* Streak & Don't Break The Chain Widget */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500 animate-flame" />
              </div>
              <div>
                <h3 className="font-bold text-slate-200 text-sm">Daily Habit Streak</h3>
                <p className="text-xs text-slate-400">Review $\ge 3$ cards daily</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-amber-400">{streaks.currentStreak || 0}</span>
              <span className="text-xs text-slate-400 block font-medium">Best: {streaks.longestStreak || 0}d</span>
            </div>
          </div>

          {/* Encouraging Streak Message */}
          {streakBroken && (
            <div className="mt-3 p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 font-medium">
              "Your streak reset, but your progress didn't. Let's start a new one today."
            </div>
          )}

          {/* 7-Day Habit Visualizer */}
          <div className="my-4">
            <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
              <span>Don't break the chain</span>
              <span className="text-[11px] text-amber-400/90">{(streaks.cardsReviewedToday || 0)}/3 reviewed today</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
              {habitDays.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div 
                    className={`w-full aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      day.isActive 
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30' 
                        : day.isToday 
                          ? 'bg-slate-800 border-2 border-dashed border-amber-500/50 text-amber-300' 
                          : 'bg-slate-800/60 text-slate-500'
                    }`}
                  >
                    {day.isActive ? '🔥' : day.dayName}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{day.dayName}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center italic">
            "Consistency converts concepts into CA AIR ranks."
          </p>
        </div>

      </div>

      {/* Global Mastery Stat Dial Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Target className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Overall Mastery</span>
            <span className="text-lg sm:text-xl font-black text-slate-100">{stats.masteryPercent}%</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Cards Mastered</span>
            <span className="text-lg sm:text-xl font-black text-emerald-400">{stats.masteredCount} <span className="text-xs font-normal text-slate-400">/ {stats.totalCards}</span></span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">In Review</span>
            <span className="text-lg sm:text-xl font-black text-indigo-300">{stats.reviewingCount}</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
            <Award className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">New Cards</span>
            <span className="text-lg sm:text-xl font-black text-slate-300">{stats.newCount}</span>
          </div>
        </div>

      </div>

      {/* Full 7 Chapters Grid Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-100">Full 7-Chapter CA Foundation Syllabus</h3>
            <p className="text-xs text-slate-400">Select a chapter to practice specific legal provisions & case laws</p>
          </div>

          <a
            href="/assets/CA-Law-Learn-Study-Guide.pdf"
            download="CA-Law-Learn-Study-Guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md shadow-amber-500/20 transition-all shrink-0 self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download Full Study Guide (PDF)</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {chapters.map((chap) => {
            const chapStat = chapterStats[chap.id] || { totalCards: 0, masteredCards: 0, percent: 0, topicCount: 0 };
            
            return (
              <div 
                key={chap.id}
                className="group bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      {chap.unitNumber}
                    </span>

                    {/* HIGH WEIGHTAGE BADGE */}
                    {chap.highWeightage && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-full shadow-sm">
                        <Flame className="w-3 h-3 text-amber-500 fill-amber-500 animate-pulse" /> High Exam Weightage
                      </span>
                    )}

                    {/* VERIFIED SYLLABUS CONTENT BADGE */}
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shadow-sm">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified Syllabus
                    </span>

                    {chapStat.percent === 100 && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-2.5 h-2.5" /> 100% Mastered
                      </span>
                    )}
                  </div>

                  <h4 
                    onClick={() => {
                      setSelectedChapter(chap);
                      setCurrentScreen('chapter');
                    }}
                    className="font-bold text-slate-100 text-lg group-hover:text-amber-300 cursor-pointer transition-colors leading-snug"
                  >
                    {chap.title}
                  </h4>
                  
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {chap.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-400">Mastery Level</span>
                    <span className="text-amber-400 font-bold">{chapStat.percent}% ({chapStat.masteredCards}/{chapStat.totalCards})</span>
                  </div>
                  
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${chapStat.percent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => handleDownloadPdf(chap)}
                      title="Export Keyword Cram Sheet PDF for this chapter"
                      className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-amber-300 bg-slate-950 border border-slate-800 hover:border-amber-500/30 px-2.5 py-1 rounded-lg transition-all"
                    >
                      <Download className="w-3 h-3 text-amber-400" />
                      <span>Cram Sheet PDF</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedChapter(chap);
                        setCurrentScreen('chapter');
                      }}
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-300 group-hover:text-amber-400"
                    >
                      <span>Explore Topics</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
