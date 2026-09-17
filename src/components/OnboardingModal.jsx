import React from 'react';
import { BookOpen, Flame, Award, Sparkles, ArrowRight, X } from 'lucide-react';

export function OnboardingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 lg:p-8 space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Welcome Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Sparkles className="w-7 h-7 text-slate-950" />
          </div>
          <h2 className="text-2xl font-black text-slate-100">Welcome to CA Law Learn! 🌟</h2>
          <p className="text-xs text-slate-300">
            Your friendly companion to master CA Foundation Business Laws without stress.
          </p>
        </div>

        {/* 3-Step Simple Onboarding Guide */}
        <div className="space-y-3 pt-2">
          
          <div className="flex items-start gap-3.5 p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-black text-amber-400 text-sm shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Pick a chapter</h4>
              <p className="text-xs text-slate-400">Choose from Indian Contract Act, Sale of Goods Act, or Regulatory Framework.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-black text-indigo-300 text-sm shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Review flashcards daily</h4>
              <p className="text-xs text-slate-400">Flip cards to reveal examiner keywords, section references, and case laws.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-black text-emerald-400 text-sm shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Watch your streak grow</h4>
              <p className="text-xs text-slate-400">Complete just 3 cards a day to build a habit that leads directly to 60+ marks!</p>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
        >
          <span>Let's Start Learning!</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
