import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FeedbackModal } from './FeedbackModal';
import { 
  ArrowLeft, Play, BookOpen, CheckCircle, FileText, 
  Sparkles, ChevronRight, Download, Eye, Layers, Award, MessageSquare 
} from 'lucide-react';

export function ChapterView() {
  const { 
    selectedChapter, topics, flashcards, workedAnswers, cardProgress, 
    setCurrentScreen, startReviewSession, setSelectedTopic, 
    handleDownloadPdf, explanationMode, toggleExplanationMode 
  } = useApp();

  const [feedbackTopic, setFeedbackTopic] = useState(null);

  if (!selectedChapter) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No chapter selected.</p>
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          className="mt-4 bg-slate-800 text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Filter topics and worked answers for selected chapter
  const chapterTopics = topics.filter(t => t.chapterId === selectedChapter.id);
  const chapterWorkedAnswers = workedAnswers.filter(w => w.chapterId === selectedChapter.id);

  // Compute chapter mastery
  const chapCards = flashcards.filter(f => chapterTopics.some(t => t.id === f.topicId));
  let masteredCards = 0;
  chapCards.forEach(c => {
    if (cardProgress[c.id]?.status === 'mastered') masteredCards++;
  });
  const isChapterComplete = chapCards.length > 0 && masteredCards === chapCards.length;

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      
      {/* Navigation & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl transition-all self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex flex-wrap items-center gap-2">
          
          {/* Explanation Mode Toggle */}
          <button
            onClick={toggleExplanationMode}
            className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Mode: <strong className="text-amber-400 uppercase">{explanationMode}</strong></span>
          </button>

          {/* Download Chapter Cram Sheet PDF */}
          <button
            onClick={() => handleDownloadPdf(selectedChapter)}
            className="flex items-center gap-1.5 bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-indigo-900/60 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Cram Sheet PDF</span>
          </button>

          {/* Practice Chapter */}
          <button
            onClick={() => startReviewSession('chapter', selectedChapter.id)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-xl text-xs shadow-md shadow-amber-500/20 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            Practice Chapter
          </button>
        </div>
      </div>

      {/* Chapter Overview Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            {selectedChapter.unitNumber}
          </span>

          {isChapterComplete && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <CheckCircle className="w-3 h-3" /> Chapter Mastered! You're one step closer to that 60+ score.
            </span>
          )}
        </div>

        <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-100 tracking-tight">
          {selectedChapter.title}
        </h2>

        <p className="text-sm text-slate-300/80 leading-relaxed max-w-3xl">
          {selectedChapter.description}
        </p>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            Chapter Topics ({chapterTopics.length})
          </h3>
          
          <span className="text-xs text-slate-400">
            Active Mode: <strong className="text-amber-400 capitalize">{explanationMode}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapterTopics.map((topic) => {
            const topicCards = flashcards.filter(f => f.topicId === topic.id);
            let masteredCount = 0;
            topicCards.forEach(c => {
              if (cardProgress[c.id]?.status === 'mastered') masteredCount++;
            });

            return (
              <div
                key={topic.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 space-y-4 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md">
                        {topicCards.length} Flashcards
                      </span>
                      <button
                        onClick={() => setFeedbackTopic(topic)}
                        title="Report issue or suggestion for this topic"
                        className="p-1 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {masteredCount === topicCards.length && topicCards.length > 0 && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" /> Mastered
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-100 text-base leading-snug">
                    {topic.title}
                  </h4>
                </div>

                {/* Mode Preview */}
                <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {explanationMode === 'short' ? "Quick Revision View (Default)" : "Deep Learning View"}
                  </span>
                  <p className="text-slate-400 line-clamp-2 text-[11px]">
                    {explanationMode === 'short' 
                      ? "Definition and examiner keywords for quick daily revision."
                      : "Full explanation, case laws, examples, and statutory exceptions."
                    }
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Mastered: <strong className="text-amber-400">{masteredCount}</strong> / {topicCards.length}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedTopic(topic);
                      startReviewSession('topic', topic.id);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-xl transition-all"
                  >
                    <span>Practice</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter Worked Answers Section */}
      {chapterWorkedAnswers.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            Worked ICAI Exam Answers for this Chapter
          </h3>

          <div className="space-y-3">
            {chapterWorkedAnswers.map(wa => (
              <div key={wa.id} className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                    {wa.title}
                  </span>
                  <button
                    onClick={() => setCurrentScreen('answer-structure')}
                    className="text-xs text-amber-400 hover:underline font-semibold"
                  >
                    View in 4-Step Builder →
                  </button>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">{wa.question}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Modal for selected topic */}
      <FeedbackModal
        isOpen={Boolean(feedbackTopic)}
        onClose={() => setFeedbackTopic(null)}
        contextId={feedbackTopic?.id || ''}
        contextType="topic"
        contextTitle={feedbackTopic?.title || 'Topic'}
      />

    </div>
  );
}
