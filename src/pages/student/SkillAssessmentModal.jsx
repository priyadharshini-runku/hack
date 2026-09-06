import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Check, 
  X, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  RotateCcw,
  ShieldCheck,
  Flag,
  ListOrdered,
  BookOpen,
  Filter,
  BarChart3,
  CheckSquare
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { getSkillAssessment } from '../../data/skillAssessments';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

export const SkillAssessmentModal = ({ isOpen, onClose, skillName, onSkillVerified }) => {
  const { user, profile, refreshProfile, showToast } = useAuth();
  const student = profile || user;

  const assessment = getSkillAssessment(skillName || 'Grand Exam');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(assessment.timeLimitSeconds || 1800);
  const [scoreData, setScoreData] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setMarkedForReview({});
      setSubmitted(false);
      setTimeLeft(assessment.timeLimitSeconds || 1800);
      setScoreData(null);
      setActiveCategoryFilter('All');
      setShowSubmitConfirm(false);
    }
  }, [isOpen, skillName]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, submitted, selectedAnswers]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (questionIndex, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleToggleReview = (questionIndex) => {
    if (submitted) return;
    setMarkedForReview(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  const handleClearResponse = (questionIndex) => {
    if (submitted) return;
    const updated = { ...selectedAnswers };
    delete updated[questionIndex];
    setSelectedAnswers(updated);
  };

  const handleSubmitTest = async () => {
    let correctCount = 0;
    const categoryBreakdown = {};

    assessment.questions.forEach((q, idx) => {
      const cat = q.category || assessment.skill || 'General';
      if (!categoryBreakdown[cat]) {
        categoryBreakdown[cat] = { total: 0, correct: 0 };
      }
      categoryBreakdown[cat].total++;

      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
        categoryBreakdown[cat].correct++;
      }
    });

    const scorePct = Math.round((correctCount / assessment.questions.length) * 100);
    const isPassed = scorePct >= assessment.passingScore;

    const result = {
      correctCount,
      totalQuestions: assessment.questions.length,
      scorePct,
      isPassed,
      categoryBreakdown,
      timeTaken: (assessment.timeLimitSeconds || 1800) - timeLeft
    };
    setScoreData(result);
    setSubmitted(true);
    setShowSubmitConfirm(false);

    if (isPassed) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
      showToast(`🎉 Passed! You scored ${scorePct}% on ${assessment.title}!`, 'success');

      // Auto verify skill on backend
      try {
        const verifySkillName = skillName && skillName !== 'Grand Exam' ? skillName : 'Comprehensive Engineering Competency';
        await fetch(`/api/students/${student.id}/skills`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: verifySkillName,
            level: 'Advanced',
            category: 'Technical',
            verified: true,
            verifiedBy: 'SkillBridge Grand 50Q 30-Min Proctored Exam',
            rating: 4.9
          })
        });
        refreshProfile();
        if (onSkillVerified) onSkillVerified(verifySkillName);
      } catch (err) {
        console.error('Failed to verify skill on server:', err);
      }
    } else {
      showToast(`Scored ${scorePct}%. You need ${assessment.passingScore}% to pass. Review explanations and retake!`, 'info');
    }
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const totalMarked = Object.values(markedForReview).filter(Boolean).length;
  const currentQ = assessment.questions[currentQuestionIndex];

  const categories = ['All', ...Array.from(new Set(assessment.questions.map(q => q.category).filter(Boolean)))];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={assessment.title} maxWidth="max-w-6xl">
      <div className="space-y-6 animate-in fade-in duration-200">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 text-white shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-500/30 text-brand-300 border border-brand-400/40 uppercase tracking-wider">
                {assessment.questions.length}-Question Technical Benchmark
              </span>
              <span className="text-xs text-slate-300">
                Passing Criteria: <strong>{assessment.passingScore}%</strong>
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold font-display">
              {assessment.subtitle || assessment.title}
            </h2>
          </div>

          {/* Live Timer */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-sm font-extrabold border backdrop-blur-md ${
              timeLeft < 300 
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' 
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}>
              <Clock className="w-4 h-4 text-brand-300" />
              <span>{formatTime(timeLeft)}</span>
              <span className="text-[10px] uppercase font-sans text-slate-400">Remaining</span>
            </div>

            {!submitted && (
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <CheckSquare className="w-4 h-4" /> End & Submit
              </button>
            )}
          </div>
        </div>

        {/* NOT SUBMITTED: Dual-Column Examination Cockpit */}
        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Active Question Workspace (8 cols) */}
            <div className="lg:col-span-8 space-y-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              
              {/* Question Meta & Review Flag */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 border border-brand-200">
                    Question #{currentQuestionIndex + 1} of {assessment.questions.length}
                  </span>
                  {currentQ.category && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {currentQ.category}
                    </span>
                  )}
                  {currentQ.difficulty && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {currentQ.difficulty}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleToggleReview(currentQuestionIndex)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    markedForReview[currentQuestionIndex]
                      ? 'bg-amber-100 border-amber-300 text-amber-900 ring-2 ring-amber-300/40'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${markedForReview[currentQuestionIndex] ? 'text-amber-600 fill-amber-600' : 'text-slate-400'}`} />
                  {markedForReview[currentQuestionIndex] ? 'Marked for Review' : 'Mark for Review'}
                </button>
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-display">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 text-brand-950 font-bold shadow-xs ring-2 ring-brand-400/30'
                          : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-colors ${
                          isSelected ? 'bg-brand-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span className="leading-snug">{option}</span>
                      </div>

                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleClearResponse(currentQuestionIndex)}
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 disabled:opacity-30 transition-colors"
                >
                  Clear Response
                </button>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 disabled:opacity-30 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  <button
                    disabled={currentQuestionIndex === assessment.questions.length - 1}
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: 50-Question Navigation Grid & Live Stats (4 cols) */}
            <div className="lg:col-span-4 space-y-4 bg-slate-50 p-5 rounded-3xl border border-slate-200">
              
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ListOrdered className="w-4 h-4 text-brand-600" /> Question Palette
                </h4>
                <span className="text-xs font-semibold text-slate-500">
                  {totalAnswered} / {assessment.questions.length} Answered
                </span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold bg-white p-2.5 rounded-xl border border-slate-200/70">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500"></span>
                  <span>Answered ({totalAnswered})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-400"></span>
                  <span>Review ({totalMarked})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-200"></span>
                  <span>Left ({assessment.questions.length - totalAnswered})</span>
                </div>
              </div>

              {/* 50-Question Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 gap-1.5 max-h-72 overflow-y-auto p-1.5 bg-white rounded-2xl border border-slate-200/80">
                {assessment.questions.map((q, idx) => {
                  const isCurrent = currentQuestionIndex === idx;
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  const isMarked = markedForReview[idx];

                  let btnStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
                  if (isAnswered) {
                    btnStyle = 'bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-600 shadow-2xs';
                  }
                  if (isMarked) {
                    btnStyle = 'bg-amber-400 text-slate-950 hover:bg-amber-500 border-amber-500 shadow-2xs font-extrabold';
                  }
                  if (isCurrent) {
                    btnStyle += ' ring-2 ring-brand-600 ring-offset-1 font-extrabold scale-105';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-8 rounded-lg text-xs font-bold border transition-all flex items-center justify-center ${btnStyle}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Category Filter shortcut */}
              {categories.length > 2 && (
                <div className="space-y-2 pt-2 border-t border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" /> Filter by Domain
                  </span>
                  <select
                    value={activeCategoryFilter}
                    onChange={(e) => {
                      setActiveCategoryFilter(e.target.value);
                      const matchIdx = assessment.questions.findIndex(q => e.target.value === 'All' || q.category === e.target.value);
                      if (matchIdx !== -1) setCurrentQuestionIndex(matchIdx);
                    }}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-slate-200 outline-none"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}

            </div>

          </div>
        ) : (
          /* SUBMITTED: Results, Topic Breakdown & Explanations */
          <div className="space-y-6">
            
            {/* Scorecard Hero */}
            <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 ${
              scoreData.isPassed 
                ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 border-emerald-300 shadow-sm' 
                : 'bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 border-rose-300 shadow-sm'
            }`}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white shadow-2xs">
                {scoreData.isPassed ? (
                  <span className="text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> PASSED · VERIFIED SKILL BADGE ISSUED
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" /> PASSING BENCHMARK: {assessment.passingScore}%
                  </span>
                )}
              </div>

              <div className="text-5xl sm:text-6xl font-extrabold font-display text-slate-900">
                {scoreData.scorePct}%
              </div>

              <p className="text-sm text-slate-700 max-w-xl mx-auto font-medium">
                {scoreData.isPassed
                  ? `Outstanding performance! You answered ${scoreData.correctCount} of ${scoreData.totalQuestions} questions correctly in ${Math.floor(scoreData.timeTaken / 60)}m ${scoreData.timeTaken % 60}s. Your official certified competency badge is now live on your profile.`
                  : `You answered ${scoreData.correctCount} of ${scoreData.totalQuestions} questions correctly. Review the domain performance and in-depth explanations below to retake the test.`}
              </p>
            </div>

            {/* Domain-wise Performance Breakdown */}
            {scoreData.categoryBreakdown && Object.keys(scoreData.categoryBreakdown).length > 1 && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-600" />
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    Domain-by-Domain Competency Breakdown
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(scoreData.categoryBreakdown).map(([cat, stats]) => {
                    const catPct = Math.round((stats.correct / stats.total) * 100);
                    return (
                      <div key={cat} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                          <span>{cat}</span>
                          <span className={catPct >= 60 ? 'text-emerald-600' : 'text-amber-600'}>{catPct}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${catPct >= 60 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${catPct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {stats.correct} of {stats.total} questions correct
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Answer Explanations Review */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-600" /> Question-by-Question Solution Guide
                </h4>
                <span className="text-xs text-slate-500">
                  {assessment.questions.length} Detailed Technical Explanations
                </span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {assessment.questions.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isCorrect = userAns === q.correctAnswer;
                  return (
                    <div key={q.id} className={`p-4 rounded-2xl border text-xs space-y-2 ${
                      isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                    }`}>
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-900 leading-snug">
                          {idx + 1}. {q.question}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}>
                          {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                        </span>
                      </div>

                      <div className="space-y-1 text-slate-700 pt-1">
                        <p><strong>Your Answer:</strong> {userAns !== undefined ? q.options[userAns] : 'Not answered'}</p>
                        {!isCorrect && (
                          <p className="text-emerald-700"><strong>Correct Answer:</strong> {q.options[q.correctAnswer]}</p>
                        )}
                        <p className="text-slate-600 italic pt-1 border-t border-slate-200/60">
                          💡 <strong>Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setMarkedForReview({});
                  setSubmitted(false);
                  setTimeLeft(assessment.timeLimitSeconds || 1800);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Examination
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20"
              >
                Done & Return to Dashboard
              </button>
            </div>

          </div>
        )}

        {/* Submit Confirmation Dialog */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
              <div className="flex items-center gap-3 text-amber-600">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-base font-bold text-slate-900">Confirm Exam Submission?</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                You have answered <strong>{totalAnswered} of {assessment.questions.length}</strong> questions.
                {assessment.questions.length - totalAnswered > 0 && (
                  <span className="text-rose-600 block mt-1 font-semibold">
                    You still have {assessment.questions.length - totalAnswered} unanswered questions.
                  </span>
                )}
              </p>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  Continue Test
                </button>
                <button
                  onClick={handleSubmitTest}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
                >
                  Yes, Submit Now
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};
