import React, { useState, useEffect } from 'react';
import { 
  Sparkles, RotateCw, ThumbsUp, Flame, Layers, FileText, 
  ChevronLeft, ChevronRight, X, CheckCircle2, HelpCircle 
} from 'lucide-react';

export const TUTORIAL_SCREENS = [
  {
    id: 1,
    title: "Welcome to CA Law Learn!",
    badge: "Getting Started",
    icon: <Sparkles className="w-8 h-8 text-amber-400" />,
    description: "Let's show you how this app helps you master Business Laws in a few minutes a day."
  },
  {
    id: 2,
    title: "Keyword & Case Law Flashcards",
    badge: "Core Mechanic",
    icon: <RotateCw className="w-8 h-8 text-indigo-400" />,
    description: "Each topic has flashcards with the definition, keywords, section number, and case law you need for full marks. Flip the card to see the answer."
  },
  {
    id: 3,
    title: "Easy / Hard Spaced Repetition",
    badge: "Memory Engine",
    icon: <ThumbsUp className="w-8 h-8 text-emerald-400" />,
    description: "After each card, tell us if it was Easy or Hard. Hard cards come back sooner so you don't forget them — this is how spaced repetition works."
  },
  {
    id: 4,
    title: "Daily Habit Streak",
    badge: "Habit Layer",
    icon: <Flame className="w-8 h-8 text-amber-500 fill-amber-500 animate-flame" />,
    description: "Review your due cards each day to build a streak. Don't break the chain — consistency is what makes law easy to remember."
  },
  {
    id: 5,
    title: "Short vs Deep View",
    badge: "Flexible Revision",
    icon: <Layers className="w-8 h-8 text-amber-300" />,
    description: "Every topic has a Short view for quick revision and a Deep view with full explanations, examples, and exceptions when you want to go deeper."
  },
  {
    id: 6,
    title: "Answer Writing Guide & Keyword PDF",
    badge: "60+ Exam Booster",
    icon: <FileText className="w-8 h-8 text-indigo-300" />,
    description: "Check out the Answer Writing Guide to learn how to structure answers that score marks, and download the Keyword PDF for each chapter for last-minute revision."
  }
];

export function GuidedTutorialModal({ isOpen, onClose, onComplete, isReplay = false }) {
  const [currentStep, setCurrentStep] = useState(0);

  // Reset to step 0 when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalSteps = TUTORIAL_SCREENS.length;
  const activeScreen = TUTORIAL_SCREENS[currentStep];
  const isLastScreen = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (isLastScreen) {
      if (onComplete) onComplete();
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    if (onComplete) onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
        
        {/* Top Header & Skip Action */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            {activeScreen.badge} ({currentStep + 1}/{totalSteps})
          </span>

          <div className="flex items-center gap-2">
            {!isReplay && (
              <button
                onClick={handleSkip}
                className="text-xs font-semibold text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-lg transition-colors"
              >
                Skip Tutorial
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Visual Card */}
        <div className="my-auto py-4 text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-amber-500/10">
            {activeScreen.icon}
          </div>

          <div className="space-y-2 px-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight leading-snug">
              {activeScreen.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              {activeScreen.description}
            </p>
          </div>
        </div>

        {/* Navigation Step Indicators & Controls */}
        <div className="space-y-4 pt-2 border-t border-slate-800/80">
          
          {/* Step Dots */}
          <div className="flex items-center justify-center gap-2">
            {TUTORIAL_SCREENS.map((_, idx) => (
              <div 
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full cursor-pointer transition-all ${
                  idx === currentStep 
                    ? 'w-7 bg-amber-500' 
                    : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-400 px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950/60 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{isLastScreen ? "You're ready! Let's start" : "Next"}</span>
              {!isLastScreen && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
