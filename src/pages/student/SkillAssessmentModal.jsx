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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#161616] text-[#D3C3B9] border border-[#3D4D55] shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#B58863]/20 text-[#B58863] border border-[#B58863]/40 uppercase tracking-wider">
                {assessment.questions.length}-Question Technical Benchmark
              </span>
              <span className="text-xs text-[#A79E9C]">
                Passing Criteria: <strong className="text-[#D3C3B9]">{assessment.passingScore}%</strong>
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#D3C3B9]">
              {assessment.subtitle || assessment.title}
            </h2>
          </div>

          {/* Live Timer */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-sm font-extrabold border backdrop-blur-md ${
              timeLeft < 300 
                ? 'bg-[#161616] text-[#B58863] border-[#B58863] animate-pulse' 
                : 'bg-[#102A38] text-[#D3C3B9] border-[#3D4D55]'
            }`}>
              <Clock className="w-4 h-4 text-[#B58863]" />
              <span>{formatTime(timeLeft)}</span>
              <span className="text-[10px] uppercase font-sans text-[#A79E9C]">Remaining</span>
            </div>

            {!submitted && (
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="px-4 py-2 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
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
            <div className="lg:col-span-8 space-y-5 bg-[#161616] p-6 rounded-3xl border border-[#3D4D55] shadow-sm">
              
              {/* Question Meta & Review Flag */}
              <div className="flex items-center justify-between pb-3 border-b border-[#3D4D55]/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#102A38] text-[#B58863] border border-[#3D4D55]">
                    Question #{currentQuestionIndex + 1} of {assessment.questions.length}
                  </span>
                  {currentQ.category && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#102A38] text-[#D3C3B9] border border-[#3D4D55]">
                      {currentQ.category}
                    </span>
                  )}
                  {currentQ.difficulty && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B58863]/20 text-[#B58863] border border-[#B58863]/30">
                      {currentQ.difficulty}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleToggleReview(currentQuestionIndex)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    markedForReview[currentQuestionIndex]
                      ? 'bg-[#B58863] border-[#B58863] text-[#161616] ring-2 ring-[#B58863]/40'
                      : 'bg-[#102A38] hover:bg-[#3D4D55] border-[#3D4D55] text-[#D3C3B9]'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${markedForReview[currentQuestionIndex] ? 'text-[#161616] fill-[#161616]' : 'text-[#A79E9C]'}`} />
                  {markedForReview[currentQuestionIndex] ? 'Marked for Review' : 'Mark for Review'}
                </button>
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-2xl bg-[#102A38] border border-[#3D4D55]">
                <h3 className="text-base sm:text-lg font-bold text-[#D3C3B9] leading-relaxed">
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
                          ? 'bg-[#102A38] border-[#B58863] text-[#D3C3B9] font-bold shadow-xs ring-2 ring-[#B58863]/30'
                          : 'bg-[#102A38]/50 hover:bg-[#102A38] border-[#3D4D55] text-[#A79E9C] hover:text-[#D3C3B9]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-colors ${
                          isSelected ? 'bg-[#B58863] text-[#161616] shadow-xs' : 'bg-[#3D4D55] text-[#D3C3B9] group-hover:bg-[#B58863] group-hover:text-[#161616]'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span className="leading-snug">{option}</span>
                      </div>

                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-[#B58863] shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#3D4D55]/60">
                <button
                  onClick={() => handleClearResponse(currentQuestionIndex)}
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#A79E9C] hover:text-[#B58863] disabled:opacity-30 transition-colors"
                >
                  Clear Response
                </button>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="px-4 py-2 rounded-xl border border-[#3D4D55] text-[#D3C3B9] disabled:opacity-30 text-xs font-bold flex items-center gap-1.5 hover:bg-[#102A38] transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  <button
                    disabled={currentQuestionIndex === assessment.questions.length - 1}
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="px-5 py-2 rounded-xl bg-[#B58863] hover:bg-[#996f4c] disabled:opacity-30 text-[#161616] text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: 50-Question Navigation Grid & Live Stats (4 cols) */}
            <div className="lg:col-span-4 space-y-4 bg-[#161616] p-5 rounded-3xl border border-[#3D4D55]">
              
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#D3C3B9] uppercase tracking-wider flex items-center gap-1.5">
                  <ListOrdered className="w-4 h-4 text-[#B58863]" /> Question Palette
                </h4>
                <span className="text-xs font-semibold text-[#A79E9C]">
                  {totalAnswered} / {assessment.questions.length} Answered
                </span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold bg-[#102A38] p-2.5 rounded-xl border border-[#3D4D55] text-[#D3C3B9]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#B58863]"></span>
                  <span>Answered ({totalAnswered})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#3D4D55] border border-[#A79E9C]"></span>
                  <span>Review ({totalMarked})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#102A38] border border-[#3D4D55]"></span>
                  <span>Left ({assessment.questions.length - totalAnswered})</span>
                </div>
              </div>

              {/* 50-Question Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 gap-1.5 max-h-72 overflow-y-auto p-1.5 bg-[#102A38] rounded-2xl border border-[#3D4D55]">
                {assessment.questions.map((q, idx) => {
                  const isCurrent = currentQuestionIndex === idx;
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  const isMarked = markedForReview[idx];

                  let btnStyle = 'bg-[#161616] text-[#A79E9C] hover:bg-[#3D4D55] hover:text-[#D3C3B9] border-[#3D4D55]';
                  if (isAnswered) {
                    btnStyle = 'bg-[#B58863] text-[#161616] hover:bg-[#996f4c] border-[#B58863] font-bold shadow-2xs';
                  }
                  if (isMarked) {
                    btnStyle = 'bg-[#3D4D55] text-[#D3C3B9] hover:bg-[#3D4D55]/80 border-[#A79E9C] shadow-2xs font-extrabold';
                  }
                  if (isCurrent) {
                    btnStyle += ' ring-2 ring-[#D3C3B9] ring-offset-1 ring-offset-[#102A38] font-extrabold scale-105';
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
                <div className="space-y-2 pt-2 border-t border-[#3D4D55]">
                  <span className="text-[11px] font-bold text-[#A79E9C] uppercase tracking-wider flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5 text-[#B58863]" /> Filter by Domain
                  </span>
                  <select
                    value={activeCategoryFilter}
                    onChange={(e) => {
                      setActiveCategoryFilter(e.target.value);
                      const matchIdx = assessment.questions.findIndex(q => e.target.value === 'All' || q.category === e.target.value);
                      if (matchIdx !== -1) setCurrentQuestionIndex(matchIdx);
                    }}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-[#102A38] text-[#D3C3B9] border border-[#3D4D55] outline-none focus:ring-2 focus:ring-[#B58863]"
                  >
                    {categories.map(c => (
                      <option key={c} value={c} className="bg-[#102A38] text-[#D3C3B9]">{c}</option>
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
            <div className="p-6 sm:p-8 rounded-3xl border border-[#3D4D55] text-center space-y-4 bg-[#161616] shadow-sm">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#102A38] border border-[#3D4D55]">
                {scoreData.isPassed ? (
                  <span className="text-[#B58863] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B58863]" /> PASSED · VERIFIED SKILL BADGE ISSUED
                  </span>
                ) : (
                  <span className="text-[#D3C3B9] flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-[#B58863]" /> PASSING BENCHMARK: {assessment.passingScore}%
                  </span>
                )}
              </div>

              <div className="text-5xl sm:text-6xl font-extrabold text-[#B58863]">
                {scoreData.scorePct}%
              </div>

              <p className="text-sm text-[#A79E9C] max-w-xl mx-auto font-medium">
                {scoreData.isPassed
                  ? `Outstanding performance! You answered ${scoreData.correctCount} of ${scoreData.totalQuestions} questions correctly in ${Math.floor(scoreData.timeTaken / 60)}m ${scoreData.timeTaken % 60}s. Your official certified competency badge is now live on your profile.`
                  : `You answered ${scoreData.correctCount} of ${scoreData.totalQuestions} questions correctly. Review the domain performance and in-depth explanations below to retake the test.`}
              </p>
            </div>

            {/* Domain-wise Performance Breakdown */}
            {scoreData.categoryBreakdown && Object.keys(scoreData.categoryBreakdown).length > 1 && (
              <div className="bg-[#161616] p-6 rounded-3xl border border-[#3D4D55] shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#B58863]" />
                  <h4 className="text-sm font-bold text-[#D3C3B9]">
                    Domain-by-Domain Competency Breakdown
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(scoreData.categoryBreakdown).map(([cat, stats]) => {
                    const catPct = Math.round((stats.correct / stats.total) * 100);
                    return (
                      <div key={cat} className="p-4 rounded-2xl bg-[#102A38] border border-[#3D4D55] space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-[#D3C3B9]">
                          <span>{cat}</span>
                          <span className="text-[#B58863]">{catPct}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#3D4D55] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all bg-[#B58863]"
                            style={{ width: `${catPct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-[#A79E9C]">
                          {stats.correct} of {stats.total} questions correct
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Answer Explanations Review */}
            <div className="bg-[#161616] p-6 rounded-3xl border border-[#3D4D55] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#B58863]" /> Question-by-Question Solution Guide
                </h4>
                <span className="text-xs text-[#A79E9C]">
                  {assessment.questions.length} Detailed Technical Explanations
                </span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {assessment.questions.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isCorrect = userAns === q.correctAnswer;
                  return (
                    <div key={q.id} className={`p-4 rounded-2xl border text-xs space-y-2 ${
                      isCorrect ? 'bg-[#102A38] border-[#3D4D55]' : 'bg-[#102A38]/70 border-[#3D4D55]'
                    }`}>
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-[#D3C3B9] leading-snug">
                          {idx + 1}. {q.question}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          isCorrect ? 'bg-[#B58863]/20 text-[#B58863] border border-[#B58863]/40' : 'bg-[#3D4D55] text-[#D3C3B9] border border-[#3D4D55]'
                        }`}>
                          {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                        </span>
                      </div>

                      <div className="space-y-1 text-[#D3C3B9] pt-1">
                        <p><strong className="text-[#A79E9C]">Your Answer:</strong> {userAns !== undefined ? q.options[userAns] : 'Not answered'}</p>
                        {!isCorrect && (
                          <p className="text-[#B58863]"><strong className="text-[#A79E9C]">Correct Answer:</strong> {q.options[q.correctAnswer]}</p>
                        )}
                        <p className="text-[#A79E9C] italic pt-1 border-t border-[#3D4D55]">
                          💡 <strong className="text-[#D3C3B9]">Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#3D4D55]">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setMarkedForReview({});
                  setSubmitted(false);
                  setTimeLeft(assessment.timeLimitSeconds || 1800);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#3D4D55] hover:bg-[#3D4D55]/80 text-[#D3C3B9] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#3D4D55]"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#B58863]" /> Retake Examination
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] text-xs font-bold shadow-md"
              >
                Done & Return to Dashboard
              </button>
            </div>

          </div>
        )}

        {/* Submit Confirmation Dialog */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 bg-[#161616]/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-[#161616] rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#3D4D55] space-y-4 animate-in zoom-in-95">
              <div className="flex items-center gap-3 text-[#B58863]">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-base font-bold text-[#D3C3B9]">Confirm Exam Submission?</h3>
              </div>
              <p className="text-xs text-[#A79E9C] leading-relaxed">
                You have answered <strong className="text-[#D3C3B9]">{totalAnswered} of {assessment.questions.length}</strong> questions.
                {assessment.questions.length - totalAnswered > 0 && (
                  <span className="text-[#B58863] block mt-1 font-semibold">
                    You still have {assessment.questions.length - totalAnswered} unanswered questions.
                  </span>
                )}
              </p>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#3D4D55]">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="px-4 py-2 rounded-xl border border-[#3D4D55] text-[#D3C3B9] text-xs font-bold hover:bg-[#102A38]"
                >
                  Continue Test
                </button>
                <button
                  onClick={handleSubmitTest}
                  className="px-5 py-2 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] text-xs font-bold shadow-md"
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
