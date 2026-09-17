import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { 
  Flame, Award, BookOpen, BarChart3, Trophy, LogIn, LogOut, 
  Settings, Sparkles, FileText, Download, HelpCircle, ShieldAlert 
} from 'lucide-react';

export function Navbar({ onOpenFirebaseConfig }) {
  const { user, loginWithGoogle, logout, isDemoMode } = useAuth();
  const { 
    currentScreen, setCurrentScreen, streaks, stats, 
    dueFlashcards, handleDownloadPdf, openHelpTutorial 
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentScreen('dashboard')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-xl">⚖️</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-slate-100 tracking-tight leading-none">
                CA Law <span className="text-amber-400">Learn</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium">CA Foundation Business Laws</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800/60">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              currentScreen === 'dashboard'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Dashboard
          </button>

          <button
            onClick={() => setCurrentScreen('answer-structure')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              currentScreen === 'answer-structure'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            4-Step Blueprint
          </button>

          <button
            onClick={() => setCurrentScreen('progress')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              currentScreen === 'progress'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Progress
          </button>

          <button
            onClick={() => setCurrentScreen('leaderboard')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              currentScreen === 'leaderboard'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            Leaderboard
          </button>

          <button
            onClick={() => setCurrentScreen('admin')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              currentScreen === 'admin'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Admin
          </button>
        </nav>

        {/* Right Status Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Help / How To Use Tutorial Button */}
          <button
            onClick={openHelpTutorial}
            title="Help / How to Use This App"
            className="flex items-center gap-1 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-amber-400 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">How to Use</span>
          </button>

          {/* Export Full PDF Button */}
          <button
            onClick={() => handleDownloadPdf(null)}
            title="Download Master Keyword PDF Cram Sheet"
            className="hidden xl:flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Master PDF</span>
          </button>

          {/* Daily Streak Indicator */}
          <div 
            title="Daily Review Streak (Complete 3 cards/day)"
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-950/40 to-orange-950/40 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-400 font-bold text-sm shadow-inner"
          >
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-flame" />
            <span>{streaks.currentStreak || 0} <span className="hidden sm:inline font-normal text-xs text-amber-300/80">days</span></span>
          </div>

          {/* Settings / Firebase Toggle */}
          <button
            onClick={onOpenFirebaseConfig}
            title="Firebase DB & Auth Config"
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 rounded-xl transition-all"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* User Auth Action */}
          {user && !user.isAnonymous ? (
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border border-slate-700" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-amber-400">
                  {user.displayName.charAt(0)}
                </div>
              )}
              <button
                onClick={logout}
                title="Sign Out"
                className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 px-2 py-1 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs shadow-md shadow-amber-500/20 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Google Sign In</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
