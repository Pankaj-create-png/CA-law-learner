import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/db';
import { useAuth } from '../context/AuthContext';
import { Trophy, Flame, Shield, ArrowLeft, Crown } from 'lucide-react';

export function LeaderboardModal() {
  const { user } = useAuth();
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBoard() {
      setLoading(true);
      const data = await getLeaderboard();
      setBoard(data);
      setLoading(false);
    }
    fetchBoard();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Trophy className="w-7 h-7 text-slate-950" />
        </div>
        <h2 className="text-2xl font-black text-slate-100">CA Law Study Leaderboard</h2>
        <p className="text-xs text-slate-400">
          Top study streaks maintained by CA Foundation aspirants across India.
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading rankings...</div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {board.map((item, index) => {
              const rank = index + 1;
              const isCurrentUser = item.userId === user?.uid || item.displayName?.includes('Local Student');

              return (
                <div 
                  key={item.userId || index}
                  className={`p-4 flex items-center justify-between transition-colors ${
                    isCurrentUser ? 'bg-amber-500/10 border-l-4 border-amber-500' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-center font-extrabold text-sm">
                      {rank === 1 ? (
                        <Crown className="w-6 h-6 text-amber-400 mx-auto" />
                      ) : rank === 2 ? (
                        <span className="text-slate-300">🥈</span>
                      ) : rank === 3 ? (
                        <span className="text-amber-700">🥉</span>
                      ) : (
                        <span className="text-slate-500">#{rank}</span>
                      )}
                    </div>

                    <div>
                      <span className="font-bold text-slate-200 text-sm block">
                        {item.displayName || 'CA Student'} {isCurrentUser && <span className="text-amber-400 text-xs">(You)</span>}
                      </span>
                      <span className="text-[11px] text-slate-400">Longest Streak: {item.longestStreak || item.currentStreak}d</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl text-amber-400 font-extrabold text-sm">
                    <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{item.currentStreak} <span className="text-xs font-normal">days</span></span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
