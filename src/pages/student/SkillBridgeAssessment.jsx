import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Target, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  BookOpen, 
  ShieldCheck, 
  Check, 
  BarChart3, 
  Code, 
  Cpu, 
  Brain, 
  Database, 
  Shield, 
  Zap, 
  Clock,
  Sparkles,
  LayoutDashboard,
  Compass
} from 'lucide-react';
import { 
  ASSESSMENT_CATEGORIES, 
  getCategoryForRole, 
  getQuestionsForCategory 
} from '../../data/careerAssessmentQuestions';
import { ProgressBar } from '../../components/common/ProgressBar';

export const SkillBridgeAssessment = ({ setActivePage }) => {
  const { user, profile } = useAuth();
  const student = profile || user || {};

  // Step flow: 'welcome' | 'test' | 'result'
  const [assessmentStep, setAssessmentStep] = useState('welcome');

  // Selected category ID
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => {
    const roleTitle = student.targetRoleTitle || '';
    return getCategoryForRole(roleTitle);
  });

  // Current question index in active test
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Stored answers: { [questionIndex]: optionIndex }
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Active questions for chosen category
  const activeQuestions = useMemo(() => {
    return getQuestionsForCategory(selectedCategoryId);
  }, [selectedCategoryId]);

  const activeCategory = useMemo(() => {
    return ASSESSMENT_CATEGORIES.find(c => c.id === selectedCategoryId) || ASSESSMENT_CATEGORIES[0];
  }, [selectedCategoryId]);

  // Target role title from profile or default for category
  const activeRoleTitle = student.targetRoleTitle || activeCategory.defaultRole;

  // Render category icon helper
  const renderCategoryIcon = (iconName, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Code': return <Code className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Brain': return <Brain className={className} />;
      case 'Database': return <Database className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Zap': return <Zap className={className} />;
      default: return <Target className={className} />;
    }
  };

  // Scroll to top on step or question change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [assessmentStep, currentQuestionIndex]);

  // Handle starting test
  const handleStartAssessment = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setAssessmentStep('test');
  };

  // Handle selecting an answer
  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  // Handle advancing to next question or submitting
  const handleNextQuestion = () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) return;

    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question reached -> submit
      setAssessmentStep('result');
    }
  };

  // Handle going back to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Handle retaking the assessment
  const handleRetakeAssessment = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setAssessmentStep('test');
  };

  // Result calculations
  const resultStats = useMemo(() => {
    if (assessmentStep !== 'result') return null;

    let correctCount = 0;
    const skillBreakdown = {};

    activeQuestions.forEach((q, idx) => {
      const chosen = selectedAnswers[idx];
      const isCorrect = chosen === q.correctAnswer;

      if (isCorrect) {
        correctCount += 1;
      }

      if (!skillBreakdown[q.skill]) {
        skillBreakdown[q.skill] = {
          skill: q.skill,
          total: 0,
          correct: 0,
          recommendedTopic: q.recommendedTopic,
          questions: []
        };
      }

      skillBreakdown[q.skill].total += 1;
      if (isCorrect) {
        skillBreakdown[q.skill].correct += 1;
      }
      skillBreakdown[q.skill].questions.push({
        question: q.question,
        chosen,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      });
    });

    const totalQuestions = activeQuestions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    // Group skills into Strong, Moderate, Needs Improvement
    const skillsEvaluated = Object.values(skillBreakdown).map(item => {
      const ratio = item.correct / item.total;
      let status = 'Needs Improvement';
      if (ratio === 1) {
        status = 'Strong';
      } else if (ratio >= 0.5) {
        status = 'Moderate';
      }

      return {
        ...item,
        ratio,
        percentage: Math.round(ratio * 100),
        status
      };
    });

    const strongSkills = skillsEvaluated.filter(s => s.status === 'Strong');
    const moderateSkills = skillsEvaluated.filter(s => s.status === 'Moderate');
    const needsImprovementSkills = skillsEvaluated.filter(s => s.status === 'Needs Improvement');

    // Identified skill gaps (Needs Improvement + Moderate)
    const skillGaps = [...needsImprovementSkills, ...moderateSkills];

    return {
      totalQuestions,
      correctCount,
      percentage,
      skillsEvaluated,
      strongSkills,
      moderateSkills,
      needsImprovementSkills,
      skillGaps
    };
  }, [assessmentStep, activeQuestions, selectedAnswers]);

  // =========================================================================
  // VIEW 1: ASSESSMENT WELCOME PAGE
  // =========================================================================
  if (assessmentStep === 'welcome') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-in fade-in duration-200">
        
        {/* Header Hero Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              SkillBridge Career Assessment
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              SkillBridge Assessment
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Evaluate your current technical readiness against industry benchmarks for your selected engineering career role. Discover your strengths, identify precise skill gaps, and receive targeted study topics.
            </p>
          </div>
        </div>

        {/* Career Role Selection & Overview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Target Career Role</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
                <Target className="w-5 h-5 text-brand-600" />
                {activeRoleTitle}
              </h2>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold self-start sm:self-auto flex items-center gap-1.5">
              {renderCategoryIcon(activeCategory.iconName, 'w-4 h-4 text-brand-600')}
              <span>Domain: {activeCategory.name}</span>
            </div>
          </div>

          {/* Assessment Category Switcher */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Assessment Category
              </label>
              <span className="text-[11px] text-slate-400">6 Industry Domains Available</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ASSESSMENT_CATEGORIES.map(cat => {
                const isSelected = selectedCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/30 text-brand-950 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {renderCategoryIcon(cat.iconName, 'w-4 h-4')}
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-brand-600 font-bold" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-snug">{cat.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{cat.defaultRole}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Assessment Details & Rules */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-600" /> Format
              </span>
              <p className="text-slate-600 leading-relaxed">
                {activeQuestions.length} Multiple Choice Questions, displayed one at a time.
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Answer Selection
              </span>
              <p className="text-slate-600 leading-relaxed">
                Selection is required to proceed. Answers remain saved when navigating.
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-indigo-600" /> Skill Gap Analysis
              </span>
              <p className="text-slate-600 leading-relaxed">
                Identifies Strong, Moderate, and Needs Improvement skills with study topics.
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setActivePage && setActivePage('student-dashboard')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-1 order-2 sm:order-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Dashboard
            </button>

            <button
              onClick={handleStartAssessment}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2 order-1 sm:order-2"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ASSESSMENT PAGE (One MCQ at a time, progress bar, 4 options)
  // =========================================================================
  if (assessmentStep === 'test') {
    const currentQ = activeQuestions[currentQuestionIndex];
    const totalQuestions = activeQuestions.length;
    const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
    const selectedOption = selectedAnswers[currentQuestionIndex];
    const isAnswerSelected = selectedOption !== undefined;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-in fade-in duration-200">
        
        {/* Top Assessment Navigation & Progress Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 border border-brand-200">
                {activeCategory.name}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Target: <strong>{activeRoleTitle}</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setAssessmentStep('welcome')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="font-semibold text-slate-500">
                {progressPercent}% Complete
              </span>
            </div>
            <ProgressBar value={progressPercent} />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* Skill Tag & Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
              Evaluated Skill: {currentQ.skill}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Single Choice (4 Options)
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h2>

            {currentQ.codeSnippet && (
              <pre className="p-4 bg-slate-900 text-emerald-300 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
                <code>{currentQ.codeSnippet}</code>
              </pre>
            )}
          </div>

          {/* 4 Answer Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedOption === optIdx;
              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`p-4 rounded-2xl border text-sm cursor-pointer transition-all flex items-center gap-3.5 ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/30 text-brand-950 font-semibold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="flex-1 leading-relaxed">{option}</span>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls: Previous & Next/Submit */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 disabled:opacity-35 disabled:hover:bg-transparent text-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-3">
              {!isAnswerSelected && (
                <span className="text-[11px] text-amber-600 font-medium hidden sm:inline-block">
                  Please select an answer to proceed
                </span>
              )}

              <button
                type="button"
                onClick={handleNextQuestion}
                disabled={!isAnswerSelected}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                  isAnswerSelected
                    ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{isLastQuestion ? 'Submit Assessment' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 3: RESULT PAGE (Score, Strong/Moderate/Needs Improvement, Skill Gap)
  // =========================================================================
  if (assessmentStep === 'result' && resultStats) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-in fade-in duration-200 pb-16">
        
        {/* Results Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Assessment Completed
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
                Assessment Results: {activeRoleTitle}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Domain: {activeCategory.name} · Evaluated across {resultStats.totalQuestions} technical benchmarks
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleRetakeAssessment}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all border border-white/10"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Assessment
              </button>
            </div>
          </div>

          {/* Score & Benchmark Highlight Row */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            
            {/* Total Score & Percentage Card */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-600/30 border border-brand-400/40 flex flex-col items-center justify-center shrink-0">
                <span className="text-xl font-black text-white">{resultStats.percentage}%</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Total Score</span>
                <span className="text-2xl font-black text-white">
                  {resultStats.correctCount} <span className="text-sm font-normal text-slate-400">/ {resultStats.totalQuestions}</span>
                </span>
              </div>
            </div>

            {/* Status Breakdown Summary */}
            <div className="sm:col-span-2 bg-white/5 rounded-2xl p-5 border border-white/10 grid grid-cols-3 gap-3 text-center">
              <div>
                <span className="text-emerald-400 font-black text-lg block">
                  {resultStats.strongSkills.length}
                </span>
                <span className="text-[11px] font-bold text-slate-300">Strong</span>
              </div>
              <div>
                <span className="text-amber-400 font-black text-lg block">
                  {resultStats.moderateSkills.length}
                </span>
                <span className="text-[11px] font-bold text-slate-300">Moderate</span>
              </div>
              <div>
                <span className="text-rose-400 font-black text-lg block">
                  {resultStats.needsImprovementSkills.length}
                </span>
                <span className="text-[11px] font-bold text-slate-300">Needs Improvement</span>
              </div>
            </div>

          </div>
        </div>

        {/* Skill Classification Cards */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brand-600" />
                Evaluated Skills Breakdown
              </h2>
              <p className="text-xs text-slate-500">
                Skills categorized as Strong, Moderate, or Needs Improvement
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {resultStats.skillsEvaluated.map((skillItem, idx) => {
              let badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
              let icon = <XCircle className="w-3.5 h-3.5 text-rose-600" />;

              if (skillItem.status === 'Strong') {
                badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
              } else if (skillItem.status === 'Moderate') {
                badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
                icon = <AlertCircle className="w-3.5 h-3.5 text-amber-600" />;
              }

              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{skillItem.skill}</span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${badgeStyle}`}>
                        {icon}
                        <span>{skillItem.status}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Score: {skillItem.correct} / {skillItem.total} correct ({skillItem.percentage}%)
                    </p>
                  </div>

                  <div className="w-full sm:w-44">
                    <ProgressBar value={skillItem.percentage} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill Gap Section: Missing & Weak Skills */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-600" />
                Identified Skill Gap Analysis
              </h2>
              <p className="text-xs text-slate-500">
                Skills requiring targeted reinforcement to meet 2026 hiring standards for {activeRoleTitle}
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {resultStats.skillGaps.length} Skill Gap(s) Detected
            </span>
          </div>

          {resultStats.skillGaps.length === 0 ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-900">Zero Critical Skill Gaps!</h3>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                You scored 100% across all evaluated competencies for {activeRoleTitle}. Your technical fundamentals align strongly with industry requirements.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                The following skills scored below benchmark criteria. Focus on mastering these concepts:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resultStats.skillGaps.map((gap, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-amber-200 bg-amber-50/30 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">{gap.skill}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                        {gap.status}
                      </span>
                    </div>

                    <div className="pt-1 border-t border-amber-200/60">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                        Recommended Study Topic:
                      </span>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5">
                        {gap.recommendedTopic}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommended Learning Topics & Navigation Actions */}
        <div className="bg-gradient-to-r from-brand-50 to-indigo-50/50 rounded-3xl p-6 sm:p-8 border border-brand-100 space-y-5">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600" />
              Next Step: Bridge Gaps in the Learning Hub
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore curated free tutorials, YouTube playlists, official documentation, and practice platforms tailored to your weak topics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActivePage && setActivePage('learning-resources')}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/20 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Free Courses in Learning Hub</span>
            </button>

            <button
              onClick={handleRetakeAssessment}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-300 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Assessment</span>
            </button>

            <button
              onClick={() => setActivePage && setActivePage('student-dashboard')}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </button>
          </div>
        </div>

      </div>
    );
  }

  return null;
};
export default SkillBridgeAssessment;
