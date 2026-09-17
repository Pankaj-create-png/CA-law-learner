import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { submitFeedbackData } from '../services/db';
import { X, MessageSquare, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export function FeedbackModal({ isOpen, onClose, contextId = '', contextType = 'general', contextTitle = '' }) {
  const { user } = useAuth();
  
  const [issueType, setIssueType] = useState('Confusing explanation');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitFeedbackData({
        userId: user?.uid || 'guest',
        userEmail: user?.email || '',
        contextId,
        contextType,
        contextTitle,
        issueType,
        message
      });
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setMessage('');
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Feedback submit error:", err);
      setSubmitting(false);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  const ISSUE_TYPES = [
    { id: 'Confusing explanation', label: 'Confusing Explanation', icon: '💡' },
    { id: 'Wrong section/case law', label: 'Wrong Section / Case Law', icon: '⚖️' },
    { id: 'Bug', label: 'Bug or UI Issue', icon: '🐛' },
    { id: 'Other', label: 'Other Suggestions', icon: '💬' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Thank You! 🌟</h3>
            <p className="text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
              Your feedback helps make CA Law Learn better for all students. We'll look into it right away!
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">Report an Issue / Feedback</h3>
                <p className="text-xs text-slate-400">Help improve this study material</p>
              </div>
            </div>

            {/* Context Badge */}
            {contextTitle && (
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center gap-2 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">Context: <strong className="text-amber-300">{contextTitle}</strong></span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Issue Type Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">Select Issue Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {ISSUE_TYPES.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setIssueType(type.id)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left flex items-center gap-2 transition-all ${
                        issueType === type.id
                          ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span>{type.icon}</span>
                      <span className="truncate">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Message Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Details <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what was confusing, wrong section reference, or any typo..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Feedback</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );
}
