import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FeedbackModal } from './FeedbackModal';
import { 
  RotateCw, ArrowLeft, CheckCircle2, AlertTriangle, 
  BookOpen, Sparkles, Scale, FileText, Lightbulb, Copy, Check, 
  Flame, Trophy, CheckCircle, Layers, ShieldAlert, Zap, ThumbsUp, Puzzle, MessageSquare 
} from 'lucide-react';

export function FlashcardReview() {
  const { 
    reviewQueue, reviewIndex, handleRateCard, 
    setCurrentScreen, cardProgress, topics, 
    explanationMode, toggleExplanationMode 
  } = useApp();

  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedKeyword, setCopiedKeyword] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState(null);
  const [activeBackTab, setActiveBackTab] = useState('breakdown'); // 'breakdown' | 'standard'
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const isCompleted = reviewQueue.length > 0 && reviewIndex >= reviewQueue.length;
  const currentCard = reviewQueue[reviewIndex];

  // Keyboard navigation (Space to flip, 1 for Hard, 2 for Easy)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isCompleted || !currentCard) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key === '1' && isFlipped) {
        onRate('hard');
      } else if (e.key === '2' && isFlipped) {
        onRate('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, isCompleted, currentCard]);

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [reviewIndex]);

  const onRate = (rating) => {
    if (rating === 'easy') {
      setFeedbackToast("Nice — that's the kind of keyword answer that scores marks.");
    } else {
      setFeedbackToast("Almost there — we'll review this one again tomorrow!");
    }
    
    setTimeout(() => setFeedbackToast(null), 2000);
    handleRateCard(rating);
    setIsFlipped(false);
  };

  // Handle keyword click to copy
  const handleKeywordClick = (e, kw) => {
    e.stopPropagation();
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 1500);
  };

  // If session is complete
  if (isCompleted) {
    return (
      <div className="max-w-xl mx-auto py-10 px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-emerald-500 rounded-3xl mx-auto flex items-center justify-center p-1 shadow-2xl shadow-amber-500/20 animate-bounce">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Trophy className="w-10 h-10 text-amber-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Review Batch Completed!</h2>
          <p className="text-sm text-slate-300">
            You're all caught up! Come back tomorrow to keep your streak alive.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-slate-950/60 rounded-xl">
            <span className="text-xs text-slate-400 font-medium block">Cards Reviewed</span>
            <span className="text-2xl font-black text-amber-400">{reviewQueue.length}</span>
          </div>
          <div className="text-center p-3 bg-slate-950/60 rounded-xl">
            <span className="text-xs text-slate-400 font-medium block">Spaced Repetition</span>
            <span className="text-2xl font-black text-emerald-400">Updated</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3.5 rounded-2xl shadow-md text-sm transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-slate-300 font-medium text-sm">You're all caught up! Come back tomorrow to keep your streak alive.</p>
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="mt-4 bg-slate-800 text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const topicObj = topics.find(t => t.id === currentCard.topicId);
  const cardProg = cardProgress[currentCard.id];
  const progressPercent = Math.round(((reviewIndex) / reviewQueue.length) * 100);
  const breakdown = currentCard.back?.definitionBreakdown;

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-16 px-2 sm:px-4">
      
      {/* Feedback Toast Banner */}
      {feedbackToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <ThumbsUp className="w-4 h-4 fill-slate-950" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Session Progress Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit
        </button>

        <div className="flex items-center gap-2">
          {/* Feedback Report Issue Button */}
          <button
            onClick={() => setIsFeedbackOpen(true)}
            title="Report content error or confusing explanation"
            className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-400 hover:text-amber-400 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Report Issue</span>
          </button>

          {/* Explanation Mode Toggle Button */}
          <button
            onClick={toggleExplanationMode}
            title="Toggle between Short Revision Mode and Deep Learning Mode"
            className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Mode: <strong className="text-amber-400 uppercase">{explanationMode}</strong></span>
          </button>

          <span className="text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-xl">
            {reviewIndex + 1} / {reviewQueue.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Interactive 3D Flip Flashcard */}
      <div 
        onClick={() => setIsFlipped(prev => !prev)}
        className="relative min-h-[440px] cursor-pointer perspective-1000 select-none group"
      >
        <div 
          className={`w-full min-h-[440px] transition-all duration-500 transform-style-preserve-3d relative ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          
          {/* ==================== FRONT OF CARD ==================== */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-slate-800 group-hover:border-amber-500/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl backface-hidden">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                Question
              </span>

              <span className="text-xs text-slate-400 flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
                Tap to flip
              </span>
            </div>

            <div className="my-auto text-center space-y-4 px-2 sm:px-4 py-6">
              <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-md">
                {topicObj?.title || 'Business Laws'}
              </span>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-100 leading-snug tracking-tight">
                {currentCard.front}
              </h3>
              
              <p className="text-xs text-slate-400 italic">
                (Recall section references, examiner keywords, and landmark case laws)
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4">
              <span>Mode: <strong className="text-amber-400 uppercase">{explanationMode}</strong></span>
              <span className="text-amber-400/90 font-medium">Tap card to see answer →</span>
            </div>
          </div>


          {/* ==================== BACK OF CARD ==================== */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 border-2 border-amber-500/60 rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-2xl backface-hidden rotate-y-180 overflow-y-auto">
            
            <div className="space-y-4 sm:space-y-5">
              
              {/* Header & Section Reference & View Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Answer
                  </span>

                  {/* Definition Breakdown View Switcher */}
                  {breakdown && (
                    <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setActiveBackTab('breakdown')}
                        className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                          activeBackTab === 'breakdown' 
                            ? 'bg-amber-500 text-slate-950 shadow-sm' 
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        🧩 Breakdown
                      </button>

                      <button
                        onClick={() => setActiveBackTab('standard')}
                        className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                          activeBackTab === 'standard' 
                            ? 'bg-amber-500 text-slate-950 shadow-sm' 
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        📜 Standard
                      </button>
                    </div>
                  )}
                </div>

                {currentCard.back.sectionRef && (
                  <span className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5 self-start sm:self-auto">
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    {currentCard.back.sectionRef}
                  </span>
                )}
              </div>

              {/* DEFINITION BREAKDOWN WIDGET */}
              {breakdown && activeBackTab === 'breakdown' ? (
                <div className="space-y-4">
                  {/* Original Text */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-amber-400" /> Original Statutory Text
                    </span>
                    <p className="text-xs text-slate-300 bg-slate-950/80 border border-slate-800 p-3 rounded-xl font-mono leading-relaxed italic">
                      "{breakdown.originalText}"
                    </p>
                  </div>

                  {/* Labeled Parts Breakdown */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <Puzzle className="w-3.5 h-3.5 text-amber-400" /> Labeled Parts Breakdown
                    </span>

                    <div className="space-y-2">
                      {breakdown.parts.map((part, idx) => (
                        <div key={idx} className="p-3 bg-slate-950/60 border border-indigo-500/20 rounded-xl space-y-1">
                          <span className="text-xs font-extrabold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md inline-block">
                            "{part.phrase}"
                          </span>
                          <p className="text-xs text-slate-200 leading-relaxed font-medium pt-0.5">
                            👉 {part.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plain English Summary */}
                  <div className="p-3.5 bg-gradient-to-r from-emerald-950/40 to-slate-950 border border-emerald-500/30 rounded-xl space-y-1">
                    <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" /> Plain English Takeaway Summary:
                    </span>
                    <p className="text-xs text-emerald-200 font-bold leading-relaxed">
                      "{breakdown.plainSummary}"
                    </p>
                  </div>
                </div>
              ) : (
                /* STANDARD VIEW */
                <>
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-indigo-400" /> Legal Definition
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 border border-slate-800/80 p-3 sm:p-3.5 rounded-2xl font-medium">
                      {currentCard.back.definition}
                    </p>
                  </div>
                </>
              )}

              {/* Examiner Keywords (High-Yield Tags) */}
              {currentCard.back.keywords && currentCard.back.keywords.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Examiner Keywords
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">Tap tag to copy</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentCard.back.keywords.map((kw, i) => (
                      <span
                        key={i}
                        onClick={(e) => handleKeywordClick(e, kw)}
                        title="Click to copy phrase"
                        className="text-xs font-bold bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-xl cursor-pointer transition-all flex items-center gap-1"
                      >
                        {kw}
                        {copiedKeyword === kw ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-amber-400/60" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* DEEP VIEW EXTENDED DETAILS */}
              {explanationMode === 'deep' && (
                <>
                  {currentCard.back.caseLaw && (
                    <div className="bg-slate-950/80 border border-amber-500/30 p-3 rounded-2xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5" /> Landmark Case Law:
                        </span>
                        <span className="text-xs font-black text-slate-100 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                          {currentCard.back.caseLaw}
                        </span>
                      </div>
                      {currentCard.back.caseSummary && (
                        <p className="text-xs text-slate-300 italic pt-1">
                          "{currentCard.back.caseSummary}"
                        </p>
                      )}
                    </div>
                  )}

                  {currentCard.back.examples && currentCard.back.examples.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Examples
                      </span>
                      <ul className="space-y-1">
                        {currentCard.back.examples.map((ex, i) => (
                          <li key={i} className="text-xs text-slate-300 bg-slate-950/40 border border-slate-800 p-2 sm:p-2.5 rounded-xl list-disc list-inside">
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Interval: {cardProg?.intervalDays || 1} day(s)</span>
              <span>Rate performance below ↓</span>
            </div>

          </div>

        </div>
      </div>

      {/* Answer Evaluation Buttons (Easy vs Hard) */}
      {isFlipped ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
          
          <button
            onClick={() => onRate('hard')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-rose-600/20 transition-all text-xs sm:text-sm active:scale-95"
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <div className="text-left">
              <span className="block font-black leading-none">Hard</span>
              <span className="text-[10px] opacity-80 font-normal">Review tomorrow (+1d)</span>
            </div>
          </button>

          <button
            onClick={() => onRate('easy')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all text-xs sm:text-sm active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <div className="text-left">
              <span className="block font-black leading-none">Easy</span>
              <span className="text-[10px] opacity-90 font-medium">Spaces out (+3d to +7d)</span>
            </div>
          </button>

        </div>
      ) : (
        <div className="text-center py-2">
          <p className="text-xs text-slate-400">
            Press <kbd className="bg-slate-800 text-amber-400 border border-slate-700 px-2 py-0.5 rounded text-[11px] font-mono">Space</kbd> or tap card to flip answer
          </p>
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        contextId={currentCard.id}
        contextType="flashcard"
        contextTitle={currentCard.front?.title || 'Flashcard'}
      />

    </div>
  );
}
