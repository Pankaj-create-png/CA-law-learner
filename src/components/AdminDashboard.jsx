import React, { useState, useEffect } from 'react';
import { getFeedbackData, updateFeedbackStatusData, getAnalyticsSummaryData } from '../services/db';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldAlert, BarChart3, MessageSquare, CheckCircle2, 
  Clock, AlertTriangle, Users, BookOpen, RefreshCw, Filter, Sparkles 
} from 'lucide-react';

export function AdminDashboard() {
  const { topics, chapters } = useApp();
  const { user } = useAuth();

  const [feedbackList, setFeedbackList] = useState([]);
  const [analytics, setAnalytics] = useState({ totalReviews: 0, topics: {}, dau: {} });
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'open' | 'resolved'
  const [loading, setLoading] = useState(true);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const fbData = await getFeedbackData();
      const anaData = await getAnalyticsSummaryData();
      setFeedbackList(fbData);
      setAnalytics(anaData);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleToggleStatus = async (feedbackId, currentStatus) => {
    const nextStatus = currentStatus === 'open' ? 'resolved' : 'open';
    await updateFeedbackStatusData(feedbackId, nextStatus);
    setFeedbackList(prev => prev.map(item => item.id === feedbackId ? { ...item, status: nextStatus } : item));
  };

  // Map topic IDs to title for presentation
  const topicMap = {};
  topics.forEach(t => { topicMap[t.id] = t.title; });

  // Calculate topic difficulty (Hard rating %)
  const topicStats = Object.entries(analytics.topics || {}).map(([topicId, data]) => {
    const reviews = data.reviews || 0;
    const hardCount = data.hardCount || 0;
    const hardPercent = reviews > 0 ? Math.round((hardCount / reviews) * 100) : 0;
    return {
      topicId,
      title: topicMap[topicId] || topicId,
      reviews,
      hardCount,
      easyCount: data.easyCount || 0,
      hardPercent,
      lastReviewedAt: data.lastReviewedAt
    };
  }).sort((a, b) => b.hardPercent - a.hardPercent || b.reviews - a.reviews);

  // Filter feedback
  const filteredFeedback = feedbackList.filter(item => {
    if (filterStatus === 'open') return item.status === 'open';
    if (filterStatus === 'resolved') return item.status === 'resolved';
    return true;
  });

  const openFeedbackCount = feedbackList.filter(i => i.status === 'open').length;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayDau = analytics.dau?.[todayStr]?.count || Object.keys(analytics.dau || {}).length || 1;

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4 text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-sm font-semibold">Loading Admin Usage Analytics & Feedback Inbox...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" /> Admin Insights Dashboard
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Usage Analytics & Content Feedback
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Monitor student card review difficulty, spot confusing topics, and manage issue reports.
            </p>
          </div>

          <button
            onClick={loadAdminData}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-all self-start sm:self-center"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Reviews */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Card Reviews</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-slate-100">
            {analytics.totalReviews || 0}
          </div>
          <p className="text-[11px] text-slate-500">Across all CA Business Law chapters</p>
        </div>

        {/* Daily Active Users */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Today's Active Students</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-100">
            {todayDau}
          </div>
          <p className="text-[11px] text-slate-500">Students with active study streaks today</p>
        </div>

        {/* Open Feedback Items */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Open Feedback Reports</span>
            <MessageSquare className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {openFeedbackCount}
          </div>
          <p className="text-[11px] text-slate-500">Pending review from students</p>
        </div>

        {/* Confusing Topics Flagged */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Topics Needing Revision</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">
            {topicStats.filter(t => t.hardPercent >= 40).length}
          </div>
          <p className="text-[11px] text-slate-500">Topics with ≥40% "Hard" ratings</p>
        </div>

      </div>

      {/* Main Grid: Topic Difficulty & Feedback Inbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Columns: Topic Difficulty Signals */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">Topic Rating Breakdown</h3>
                <p className="text-xs text-slate-400">High "Hard" ratings signal confusing content</p>
              </div>
            </div>
          </div>

          {topicStats.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-xs">
              No topic review analytics recorded yet. Card reviews will automatically populate difficulty metrics!
            </div>
          ) : (
            <div className="space-y-4">
              {topicStats.map((item, idx) => (
                <div key={item.topicId || idx} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 truncate max-w-[240px]">{item.title}</span>
                    <div className="flex items-center gap-2 text-slate-400 font-semibold">
                      <span>{item.reviews} reviews</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.hardPercent >= 50 
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' 
                          : item.hardPercent >= 30 
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {item.hardPercent}% Hard
                      </span>
                    </div>
                  </div>

                  {/* Rating distribution progress bar */}
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                    <div 
                      style={{ width: `${100 - item.hardPercent}%` }} 
                      className="bg-emerald-500 h-full transition-all duration-300" 
                      title={`Easy/Good: ${item.easyCount}`}
                    />
                    <div 
                      style={{ width: `${item.hardPercent}%` }} 
                      className="bg-rose-500 h-full transition-all duration-300" 
                      title={`Hard: ${item.hardCount}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 5 Columns: Student Feedback Inbox */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">Student Feedback</h3>
                <p className="text-xs text-slate-400">Issue reports from flashcard reviews</p>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {['all', 'open', 'resolved'].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all ${
                    filterStatus === st 
                      ? 'bg-amber-500 text-slate-950' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {filteredFeedback.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No feedback submissions matching filter "{filterStatus}".
            </div>
          ) : (
            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredFeedback.map(fb => (
                <div 
                  key={fb.id} 
                  className={`p-4 rounded-2xl border text-xs space-y-2.5 transition-all ${
                    fb.status === 'open'
                      ? 'bg-slate-950 border-amber-500/30'
                      : 'bg-slate-950/40 border-slate-800 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg text-[10px]">
                      {fb.issueType || 'General'}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(fb.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {fb.contextTitle && (
                    <p className="text-[11px] text-slate-300 font-medium">
                      Context: <span className="text-amber-300 font-bold">{fb.contextTitle}</span>
                    </p>
                  )}

                  {fb.message ? (
                    <p className="text-slate-200 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-[11px] leading-relaxed">
                      "{fb.message}"
                    </p>
                  ) : (
                    <p className="text-slate-500 italic text-[11px]">No additional message attached.</p>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                    <span className="text-[10px] text-slate-400">User: {fb.userEmail || fb.userId || 'Guest'}</span>
                    <button
                      onClick={() => handleToggleStatus(fb.id, fb.status)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                        fb.status === 'open'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{fb.status === 'open' ? 'Mark Resolved' : 'Reopen'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
