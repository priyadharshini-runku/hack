import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  Flag, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  BookOpen, 
  Sparkles, 
  Check, 
  X, 
  Layers, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Zap,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateAssessmentQuestions } from '../../data/learningHubQuestions';

/**
 * Calculates Skill Strength based on assessment percentage:
 * 0–39%: Beginner
 * 40–59%: Developing
 * 60–74%: Intermediate
 * 75–89%: Strong
 * 90–100%: Excellent
 */
export function getSkillStrength(percentage) {
  if (percentage >= 90) {
    return {
      level: 'Excellent',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300',
      badgeBg: 'bg-purple-600',
      description: 'Exceptional mastery of concepts, debugging, application, and implementation.',
      tierIndex: 4
    };
  } else if (percentage >= 75) {
    return {
      level: 'Strong',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300',
      badgeBg: 'bg-emerald-600',
      description: 'Solid practical grasp of core techniques with high accuracy and consistency.',
      tierIndex: 3
    };
  } else if (percentage >= 60) {
    return {
      level: 'Intermediate',
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-300',
      badgeBg: 'bg-sky-600',
      description: 'Good theoretical foundation; continue sharpening advanced problem-solving.',
      tierIndex: 2
    };
  } else if (percentage >= 40) {
    return {
      level: 'Developing',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300',
      badgeBg: 'bg-amber-600',
      description: 'Basic conceptual understanding; needs dedicated practice on edge cases and code outputs.',
      tierIndex: 1
    };
  } else {
    return {
      level: 'Beginner',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-300',
      badgeBg: 'bg-rose-600',
      description: 'Initial learning phase; review fundamentals, study learning path resources, and re-test.',
      tierIndex: 0
    };
  }
}

/**
 * Helper to render code/text with formatted code blocks
 */
function FormattedQuestionText({ text }) {
  if (!text) return null;

  // Check if text has code block or multiple lines with code-like syntax
  const hasCode = text.includes('```') || 
                  (text.includes('\n') && (text.includes(';') || text.includes('{') || text.includes('def ') || text.includes('SELECT') || text.includes('int ')));

  if (!hasCode) {
    return <p className="text-slate-900 text-base sm:text-lg font-medium leading-relaxed">{text}</p>;
  }

  // If text has ``` code fences
  if (text.includes('```')) {
    const parts = text.split('```');
    return (
      <div className="space-y-3">
        {parts.map((part, i) => {
          if (i % 2 === 1) {
            return (
              <pre key={i} className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 shadow-inner">
                <code>{part.trim()}</code>
              </pre>
            );
          }
          return part.trim() ? (
            <p key={i} className="text-slate-900 text-base sm:text-lg font-medium leading-relaxed">
              {part.trim()}
            </p>
          ) : null;
        })}
      </div>
    );
  }

  // Split by first newline if starting with a prompt and followed by code
  const lines = text.split('\n');
  const promptLine = lines[0];
  const codeLines = lines.slice(1).join('\n');

  return (
    <div className="space-y-3">
      <p className="text-slate-900 text-base sm:text-lg font-medium leading-relaxed">{promptLine}</p>
      {codeLines.trim() && (
        <pre className="p-4 bg-slate-900 text-emerald-300 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 shadow-inner leading-relaxed">
          <code>{codeLines.trim()}</code>
        </pre>
      )}
    </div>
  );
}

export const LearningAssessmentEngine = ({ course, onBackToCourse, onBrowseAll }) => {
  // Assessment Questions (30 randomized questions generated on mount)
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  
  // Timer: 30 minutes = 1800 seconds
  const TOTAL_TIME = 1800;
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  // Solution review filter: 'all' | 'correct' | 'incorrect' | 'unanswered'
  const [reviewFilter, setReviewFilter] = useState('all');

  const timerRef = useRef(null);

  // Initialize or reset questions
  const initializeTest = () => {
    const generated = generateAssessmentQuestions(course.id, 30);
    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setMarkedForReview({});
    setTimeRemaining(TOTAL_TIME);
    setIsSubmitted(false);
    setShowSubmitModal(false);
    setReviewFilter('all');
  };

  useEffect(() => {
    initializeTest();
  }, [course.id]);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || questions.length === 0) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isSubmitted, questions]);

  // Auto-submit when timer reaches 0
  const handleAutoSubmit = () => {
    setIsSubmitted(true);
    setShowSubmitModal(false);
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
  };

  // Manual submit test
  const handleConfirmSubmit = () => {
    setIsSubmitted(true);
    setShowSubmitModal(false);
    confetti({ particleCount: 70, spread: 90, origin: { y: 0.6 } });
  };

  // Answer selection
  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  // Clear answer
  const handleClearAnswer = () => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[currentIndex];
      return next;
    });
  };

  // Toggle Mark for Review
  const handleToggleReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  // Format MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Stats calculation
  const stats = useMemo(() => {
    if (questions.length === 0) return { answeredCount: 0, unansweredCount: 30, reviewCount: 0 };
    const answeredCount = Object.keys(selectedAnswers).length;
    const unansweredCount = questions.length - answeredCount;
    const reviewCount = Object.values(markedForReview).filter(Boolean).length;

    let correctCount = 0;
    let incorrectCount = 0;
    const topicStats = {};

    questions.forEach((q, idx) => {
      const chosen = selectedAnswers[idx];
      const isAnswered = chosen !== undefined;
      const isCorrect = isAnswered && chosen === q.correctAnswer;

      if (isAnswered) {
        if (isCorrect) correctCount++;
        else incorrectCount++;
      }

      // Topic aggregation
      const topic = q.topic || 'General Concepts';
      if (!topicStats[topic]) {
        topicStats[topic] = { total: 0, correct: 0, questions: [] };
      }
      topicStats[topic].total += 1;
      if (isCorrect) {
        topicStats[topic].correct += 1;
      }
      topicStats[topic].questions.push({ ...q, questionIdx: idx, isCorrect, isAnswered, chosen });
    });

    const score = correctCount;
    const percentage = Math.round((correctCount / questions.length) * 100);
    const timeTakenSeconds = TOTAL_TIME - timeRemaining;
    const skillStrength = getSkillStrength(percentage);

    return {
      answeredCount,
      unansweredCount,
      reviewCount,
      correctCount,
      incorrectCount,
      score,
      percentage,
      timeTakenSeconds,
      skillStrength,
      topicStats
    };
  }, [questions, selectedAnswers, markedForReview, isSubmitted, timeRemaining]);

  if (questions.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isCurrentAnswered = selectedAnswers[currentIndex] !== undefined;
  const isCurrentMarked = !!markedForReview[currentIndex];

  // =========================================================================
  // VIEW: POST-TEST RESULTS & SKILL STRENGTH SCREEN
  // =========================================================================
  if (isSubmitted) {
    const weakTopics = Object.entries(stats.topicStats)
      .map(([topic, data]) => ({
        topic,
        accuracy: Math.round((data.correct / data.total) * 100),
        total: data.total,
        correct: data.correct
      }))
      .filter((t) => t.accuracy < 70);

    const filteredQuestionReview = questions
      .map((q, idx) => {
        const chosen = selectedAnswers[idx];
        const isAnswered = chosen !== undefined;
        const isCorrect = isAnswered && chosen === q.correctAnswer;
        return { ...q, questionIdx: idx, chosen, isAnswered, isCorrect };
      })
      .filter((q) => {
        if (reviewFilter === 'correct') return q.isCorrect;
        if (reviewFilter === 'incorrect') return q.isAnswered && !q.isCorrect;
        if (reviewFilter === 'unanswered') return !q.isAnswered;
        return true;
      });

    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16">
        
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {course.category}
                </span>
                <span className="text-xs text-slate-400">Official Assessment Completed</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
                {course.name} Skill Assessment Results
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={initializeTest}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all border border-white/10"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Assessment
              </button>
              <button
                onClick={onBackToCourse}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-900/40"
              >
                <BookOpen className="w-4 h-4" />
                Return to Course
              </button>
            </div>
          </div>

          {/* Skill Strength Banner & Score Summary */}
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Overall Score Badge */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10 flex items-center gap-5">
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={stats.percentage >= 60 ? "text-emerald-400" : "text-amber-400"}
                    strokeDasharray={`${stats.percentage}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-white">{stats.percentage}%</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">Total Score</p>
                <p className="text-2xl font-black text-white">
                  {stats.score} <span className="text-sm font-normal text-slate-400">/ 30</span>
                </p>
                <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Time: {formatTime(stats.timeTakenSeconds)} / 30:00
                </p>
              </div>
            </div>

            {/* Skill Strength Tier Highlight */}
            <div className="lg:col-span-2 bg-gradient-to-r from-indigo-900/60 to-purple-900/50 rounded-2xl p-5 border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Skill Strength Rating
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white ${stats.skillStrength.badgeBg} shadow-sm`}>
                  {stats.skillStrength.level}
                </span>
              </div>

              <p className="text-sm text-slate-200">
                {stats.skillStrength.description}
              </p>

              {/* 5-Tier Spectrum Gauge */}
              <div className="pt-2">
                <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-bold">
                  {[
                    { label: 'Beginner', range: '0–39%', color: 'bg-rose-500' },
                    { label: 'Developing', range: '40–59%', color: 'bg-amber-500' },
                    { label: 'Intermediate', range: '60–74%', color: 'bg-sky-500' },
                    { label: 'Strong', range: '75–89%', color: 'bg-emerald-500' },
                    { label: 'Excellent', range: '90–100%', color: 'bg-purple-500' }
                  ].map((tier, idx) => {
                    const isEarned = stats.skillStrength.tierIndex === idx;
                    return (
                      <div key={tier.label} className="space-y-1">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isEarned ? `${tier.color} ring-2 ring-white shadow-md scale-y-125` : 'bg-white/20'
                          }`}
                        />
                        <span className={`block truncate ${isEarned ? 'text-white font-black' : 'text-slate-400'}`}>
                          {tier.label}
                        </span>
                        <span className="text-[9px] text-slate-400 block">{tier.range}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Correct</p>
              <p className="text-xl font-bold text-slate-900">{stats.correctCount} <span className="text-xs font-normal text-slate-400">/ 30</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Incorrect</p>
              <p className="text-xl font-bold text-slate-900">{stats.incorrectCount} <span className="text-xs font-normal text-slate-400">/ 30</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Unanswered</p>
              <p className="text-xl font-bold text-slate-900">{stats.unansweredCount} <span className="text-xs font-normal text-slate-400">/ 30</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Time Taken</p>
              <p className="text-xl font-bold text-slate-900">{formatTime(stats.timeTakenSeconds)}</p>
            </div>
          </div>
        </div>

        {/* Topic-Wise Breakdown & Recommended Focus Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Topic Breakdown Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Topic-Wise Performance Breakdown
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {Object.keys(stats.topicStats).length} Topics Assessed
              </span>
            </div>

            <div className="space-y-4 pt-1">
              {Object.entries(stats.topicStats).map(([topic, data]) => {
                const topicPct = Math.round((data.correct / data.total) * 100);
                const isPass = topicPct >= 70;
                return (
                  <div key={topic} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{topic}</span>
                      <span className="font-bold text-slate-600">
                        {data.correct}/{data.total} ({topicPct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isPass ? 'bg-emerald-500' : topicPct >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${topicPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Topics that Need Improvement Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  Targeted Improvement Areas
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  {weakTopics.length > 0 ? `${weakTopics.length} Focus Area(s)` : 'All Clear ✓'}
                </span>
              </div>

              {weakTopics.length === 0 ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-sm font-bold text-emerald-900">Outstanding Well-Rounded Mastery!</p>
                  <p className="text-xs text-emerald-700">
                    You scored 70% or higher across all tested syllabus topics. You are well prepared for technical interviews in {course.name}.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Based on your results, spend extra revision time on these sub-topics before technical interviews:
                  </p>

                  <div className="space-y-2.5">
                    {weakTopics.map((wt) => (
                      <div key={wt.topic} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{wt.topic}</span>
                            <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                              {wt.accuracy}% accuracy ({wt.correct}/{wt.total})
                            </span>
                          </div>
                          <p className="text-slate-500">
                            Re-read the intermediate documentation or watch targeted video lessons in the course learning hub.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Want to revise before retaking?</span>
              <button
                onClick={onBackToCourse}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1"
              >
                Open Free Course Resources <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Detailed Solution Review */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Detailed Solutions & Question Explanations
              </h3>
              <p className="text-xs text-slate-500">
                Review all 30 questions, your chosen responses, and in-depth engineering explanations.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-xs font-medium text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {[
                { id: 'all', label: `All (30)` },
                { id: 'correct', label: `Correct (${stats.correctCount})` },
                { id: 'incorrect', label: `Incorrect (${stats.incorrectCount})` },
                { id: 'unanswered', label: `Skipped (${stats.unansweredCount})` }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setReviewFilter(pill.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    reviewFilter === pill.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Solution Cards */}
          <div className="space-y-6">
            {filteredQuestionReview.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No questions found under this filter.
              </div>
            ) : (
              filteredQuestionReview.map((q) => {
                const isCorrect = q.isCorrect;
                const isAnswered = q.isAnswered;

                return (
                  <div
                    key={q.id || q.questionIdx}
                    className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/10'
                        : isAnswered
                        ? 'border-rose-200 bg-rose-50/10'
                        : 'border-slate-200 bg-slate-50/30'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                          Q{q.questionIdx + 1}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {q.topic}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500">
                          {q.difficulty}
                        </span>
                      </div>

                      <div>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                            <Check className="w-3.5 h-3.5" /> Correct (+1)
                          </span>
                        ) : isAnswered ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                            <X className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-200 px-2.5 py-0.5 rounded-full">
                            Skipped / Unanswered
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question Content */}
                    <div className="mb-5">
                      <FormattedQuestionText text={q.question} />
                    </div>

                    {/* Options List */}
                    <div className="space-y-2 mb-5">
                      {q.options.map((opt, optIdx) => {
                        const isStudentChoice = q.chosen === optIdx;
                        const isTheCorrectOption = q.correctAnswer === optIdx;

                        let cardStyle = 'border-slate-200 bg-white text-slate-700';
                        let badge = null;

                        if (isTheCorrectOption) {
                          cardStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                          badge = (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-200/80 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Correct Answer
                            </span>
                          );
                        } else if (isStudentChoice && !isCorrect) {
                          cardStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-medium ring-1 ring-rose-300';
                          badge = (
                            <span className="text-[11px] font-bold text-rose-700 bg-rose-200/80 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                              <X className="w-3 h-3" /> Your Answer
                            </span>
                          );
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${cardStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                  isTheCorrectOption
                                    ? 'bg-emerald-600 text-white'
                                    : isStudentChoice
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                            {badge}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    {q.explanation && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-indigo-700">
                          <Zap className="w-3.5 h-3.5 text-amber-500" /> Explanation & Solution Key:
                        </div>
                        <p className="leading-relaxed pl-5 text-slate-600">
                          {q.explanation}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Finished reviewing? Retake to earn a higher skill strength or explore other courses.
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={initializeTest}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm"
              >
                <RotateCcw className="w-4 h-4" /> Retake Assessment
              </button>
              <button
                onClick={onBackToCourse}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
              >
                <BookOpen className="w-4 h-4" /> Back to Course Resources
              </button>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW: ACTIVE 30-MINUTE ASSESSMENT TAKING INTERFACE
  // =========================================================================
  const isTimeLow = timeRemaining <= 300; // Under 5 minutes
  const isTimeCritical = timeRemaining <= 60; // Under 1 minute

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300 pb-16">
      
      {/* Top Test Navigation Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-16 z-30">
        
        {/* Left: Course & Question Counter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
            title="Exit / Submit Test"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">{course.name}</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                Assessment
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Question <span className="font-bold text-slate-900">{currentIndex + 1}</span> of {questions.length} ·{' '}
              <span className="text-emerald-600 font-semibold">{stats.answeredCount} answered</span>
            </p>
          </div>
        </div>

        {/* Right: Timer & Submit Test CTA */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Countdown Clock */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-sm sm:text-base border transition-all ${
              isTimeCritical
                ? 'bg-rose-50 text-rose-600 border-rose-300 animate-pulse'
                : isTimeLow
                ? 'bg-amber-50 text-amber-700 border-amber-300'
                : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-rose-600' : isTimeLow ? 'text-amber-500' : 'text-slate-500'}`} />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          {/* Submit Test Button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
          >
            <CheckCircle2 className="w-4 h-4" />
            Submit Assessment
          </button>

        </div>
      </div>

      {/* Main Assessment Container (Grid: Question Area + Question Palette) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Question Area (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Question Header: Tag, Difficulty, Mark for Review */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-100">
                  Question {currentIndex + 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {currentQ.topic}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Difficulty: <strong className="text-slate-700">{currentQ.difficulty}</strong>
                </span>
              </div>

              <button
                onClick={handleToggleReview}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isCurrentMarked
                    ? 'bg-amber-100 text-amber-800 border border-amber-300 ring-2 ring-amber-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="Mark this question to review before final submission"
              >
                <Flag className={`w-3.5 h-3.5 ${isCurrentMarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                {isCurrentMarked ? 'Marked for Review' : 'Mark for Review'}
              </button>
            </div>

            {/* Question Content */}
            <div className="min-h-[90px] py-1">
              <FormattedQuestionText text={currentQ.question} />
            </div>

            {/* 4 Options Radio Cards */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentIndex] === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-2xl border text-sm sm:text-base cursor-pointer transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/30 text-indigo-950 font-medium shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-800'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="flex-1 leading-relaxed">{option}</span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Controls Bar */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent text-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-1 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                {isCurrentAnswered && (
                  <button
                    onClick={handleClearAnswer}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    Clear Response
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    Next Question <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
                  >
                    Review & Submit <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Question Palette Sidebar (4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                Question Palette (1–30)
              </h3>
              <span className="text-xs text-slate-400 font-medium">30 Mins</span>
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-emerald-500 shrink-0" />
                <span>Answered ({stats.answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300 shrink-0" />
                <span>Not Answered ({stats.unansweredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-amber-400 shrink-0" />
                <span>Review ({stats.reviewCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-indigo-600 shrink-0" />
                <span>Current</span>
              </div>
            </div>

            {/* Palette Grid of 30 Buttons */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
              {questions.map((q, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isMarked = !!markedForReview[idx];
                const isCurrent = currentIndex === idx;

                let btnStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200';

                if (isCurrent) {
                  btnStyle = 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400 shadow-sm';
                } else if (isMarked) {
                  btnStyle = 'bg-amber-400 text-amber-950 font-bold border border-amber-500';
                } else if (isAnswered) {
                  btnStyle = 'bg-emerald-500 text-white font-semibold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl text-xs flex items-center justify-center relative transition-all ${btnStyle}`}
                    title={`Question ${idx + 1}${isAnswered ? ' (Answered)' : ''}${isMarked ? ' (Marked for review)' : ''}`}
                  >
                    {idx + 1}
                    {isMarked && !isCurrent && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-600 ring-1 ring-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Assessment Progress Summary */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Completion</span>
                <span>{Math.round((stats.answeredCount / 30) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(stats.answeredCount / 30) * 100}%` }}
                />
              </div>
            </div>

            {/* Bottom Final Submit CTA in Palette */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Finish & Submit Test
            </button>

          </div>
        </div>

      </div>

      {/* Confirmation Modal before Submit */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900">Ready to Submit Assessment?</h3>
              <p className="text-xs text-slate-500">
                Your answers will be evaluated to determine your official skill strength level for {course.name}.
              </p>
            </div>

            {/* Status Overview in Modal */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="font-bold text-emerald-600 text-lg">{stats.answeredCount}</p>
                <p className="text-slate-500 text-[11px]">Answered</p>
              </div>
              <div>
                <p className="font-bold text-rose-500 text-lg">{stats.unansweredCount}</p>
                <p className="text-slate-500 text-[11px]">Unanswered</p>
              </div>
              <div>
                <p className="font-bold text-amber-500 text-lg">{stats.reviewCount}</p>
                <p className="text-slate-500 text-[11px]">Marked Review</p>
              </div>
            </div>

            {stats.unansweredCount > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  You still have <strong>{stats.unansweredCount} unanswered questions</strong>. You can return to answer them before time expires.
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
              >
                Continue Test
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
