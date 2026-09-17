import React from 'react';
import { Flame, Trophy, Award, Sparkles, X, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function CelebrationModal({ event, onClose }) {
  if (!event) return null;

  // Trigger confetti burst on open
  try {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  } catch (e) {}

  const getEventData = () => {
    if (event.type === 'streak') {
      const days = event.days;
      if (days === 3) {
        return {
          icon: <Flame className="w-10 h-10 text-amber-500 fill-amber-500" />,
          title: "🔥 3-Day Streak Achieved!",
          subtitle: "You're building a strong, daily study habit.",
          copy: "Keep going — 3 consecutive days of spaced repetition makes examiner keywords stick!"
        };
      } else if (days === 7) {
        return {
          icon: <Award className="w-10 h-10 text-indigo-400" />,
          title: "⚡ 7-Day Streak Master!",
          subtitle: "One full week of consistent law study.",
          copy: "Awesome momentum! You're turning difficult law provisions into automatic recall."
        };
      } else if (days >= 30) {
        return {
          icon: <Trophy className="w-10 h-10 text-amber-400" />,
          title: "👑 30-Day Legend Streak!",
          subtitle: "30 days of relentless dedication to CA Foundation.",
          copy: "Outstanding work! You're on track for an AIR rank level score in Business Laws."
        };
      }
      return {
        icon: <Flame className="w-10 h-10 text-amber-500 fill-amber-500" />,
        title: `🔥 ${days}-Day Streak!`,
        subtitle: "Your daily habit is stronger than ever.",
        copy: "Consistency converts concepts into exam success."
      };
    } else if (event.type === 'chapter_completed') {
      return {
        icon: <CheckCircle2 className="w-10 h-10 text-emerald-400" />,
        title: "🏆 Chapter Mastered!",
        subtitle: `You've mastered 100% of ${event.chapterTitle || 'the chapter'}!`,
        copy: "Chapter mastered! You're one step closer to that 60+ score."
      };
    }

    return {
      icon: <Sparkles className="w-10 h-10 text-amber-400" />,
      title: "Great Job!",
      subtitle: "Every flashcard reviewed brings you closer to your goal.",
      copy: "Nice — that's the kind of keyword answer that scores marks."
    };
  };

  const data = getEventData();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-center space-y-5 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-500/30 rounded-3xl mx-auto flex items-center justify-center p-2 shadow-xl animate-bounce">
          {data.icon}
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-100">{data.title}</h3>
          <p className="text-sm font-semibold text-amber-400">{data.subtitle}</p>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">{data.copy}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 rounded-2xl text-xs transition-all shadow-md"
        >
          Keep Learning!
        </button>

      </div>
    </div>
  );
}
