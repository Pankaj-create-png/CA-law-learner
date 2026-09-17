import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Scale, BookOpen, CheckCircle2, AlertCircle, FileText, 
  HelpCircle, ChevronRight, Award, Sparkles, Edit3, ArrowRight, Eye 
} from 'lucide-react';

export function AnswerStructureView() {
  const { workedAnswers } = useApp();

  const [selectedAnswer, setSelectedAnswer] = useState(() => workedAnswers[0] || null);
  const [userAnswers, setUserAnswers] = useState({ step1: '', step2: '', step3: '', step4: '' });
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const activeQuestion = selectedAnswer || workedAnswers[0];

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto px-2 sm:px-4">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-5 sm:p-7 lg:p-8 space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" /> ICAI Exam Strategy • Score 60+ Marks
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug">
          How to Frame a Scoring Answer (4-Step Blueprint)
        </h2>

        <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-3xl">
          ICAI examiners evaluate subjective law answers against a strict 4-part marking rubric. Following this structure guarantees maximum credit for case study questions.
        </p>

        {/* 4-Step Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl">
            <span className="text-xs font-black text-amber-400 block mb-1">STEP 1: PROVISION</span>
            <p className="text-[11px] text-slate-400">State the Act, Section & Case Law rule clearly.</p>
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl">
            <span className="text-xs font-black text-indigo-400 block mb-1">STEP 2: FACTS</span>
            <p className="text-[11px] text-slate-400">Summarize given exam question in 2 lines.</p>
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl">
            <span className="text-xs font-black text-emerald-400 block mb-1">STEP 3: ANALYSIS</span>
            <p className="text-[11px] text-slate-400">Apply the provision directly to the facts.</p>
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl">
            <span className="text-xs font-black text-sky-400 block mb-1">STEP 4: CONCLUSION</span>
            <p className="text-[11px] text-slate-400">Give direct unequivocal final answer.</p>
          </div>

        </div>
      </div>

      {/* Interactive Worked Answer Selector */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          Worked Answer Examples ({workedAnswers.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {workedAnswers.map(wa => (
            <button
              key={wa.id}
              onClick={() => {
                setSelectedAnswer(wa);
                setShowModelAnswer(false);
                setUserAnswers({ step1: '', step2: '', step3: '', step4: '' });
              }}
              className={`p-4 rounded-2xl text-left border transition-all ${
                activeQuestion?.id === wa.id 
                  ? 'bg-amber-500/10 border-amber-500 text-slate-100 shadow-md' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-amber-400">Case Study</span>
                {activeQuestion?.id === wa.id && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
              </div>
              <h4 className="font-bold text-slate-200 text-xs leading-snug line-clamp-2">{wa.title}</h4>
            </button>
          ))}
        </div>
      </div>

      {/* Active Question Breakdown Card */}
      {activeQuestion && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-6 shadow-xl">
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                Real CA Exam Question
              </span>
              <button
                onClick={() => setShowModelAnswer(prev => !prev)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3.5 py-1.5 rounded-xl transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showModelAnswer ? "Hide Model Answer" : "View Model Answer"}</span>
              </button>
            </div>
            
            <h3 className="font-bold text-slate-100 text-base sm:text-lg leading-snug">
              {activeQuestion.question}
            </h3>
          </div>

          {/* ICAI Model Answer View */}
          {showModelAnswer ? (
            <div className="space-y-4 bg-slate-950/80 border border-amber-500/30 p-4 sm:p-5 rounded-2xl">
              <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> ICAI Examiner Recommended 4-Step Model Answer
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <p className="text-slate-200 leading-relaxed">{activeQuestion.answerStructure.step1}</p>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <p className="text-slate-200 leading-relaxed">{activeQuestion.answerStructure.step2}</p>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <p className="text-slate-200 leading-relaxed">{activeQuestion.answerStructure.step3}</p>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <p className="text-slate-200 leading-relaxed font-semibold">{activeQuestion.answerStructure.step4}</p>
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Student Practice Draft Area */
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-300 block">
                Draft your answer step-by-step to test your framing skills:
              </span>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-400 block">Step 1: State Provision / Applicable Law & Section</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. As per Section 2(d) of Indian Contract Act 1872..."
                    value={userAnswers.step1}
                    onChange={(e) => setUserAnswers({ ...userAnswers, step1: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-indigo-400 block">Step 2: Summarize Given Facts of the Case</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. In the given problem, the mother transferred property..."
                    value={userAnswers.step2}
                    onChange={(e) => setUserAnswers({ ...userAnswers, step2: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-emerald-400 block">Step 3: Analysis & Legal Application</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Applying the rule from Chinnaya v. Ramayya..."
                    value={userAnswers.step3}
                    onChange={(e) => setUserAnswers({ ...userAnswers, step3: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-sky-400 block">Step 4: Final Conclusion</label>
                  <input
                    type="text"
                    placeholder="e.g. Therefore, the uncle can legally recover the annuity."
                    value={userAnswers.step4}
                    onChange={(e) => setUserAnswers({ ...userAnswers, step4: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowModelAnswer(true)}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md active:scale-95"
              >
                Compare My Draft with Model Answer
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
