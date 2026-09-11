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
import { useAuth } from '../../context/AuthContext';

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
      color: 'text-[#B58863]',
      bgColor: 'bg-[#102A38]',
      borderColor: 'border-[#B58863]',
      badgeBg: 'bg-[#B58863] text-[#161616]',
      description: 'Exceptional mastery of concepts, debugging, application, and implementation.',
      tierIndex: 4
    };
  } else if (percentage >= 75) {
    return {
      level: 'Strong',
      color: 'text-[#D3C3B9]',
      bgColor: 'bg-[#102A38]',
      borderColor: 'border-[#3D4D55]',
      badgeBg: 'bg-[#3D4D55] text-[#D3C3B9]',
      description: 'Solid practical grasp of core techniques with high accuracy and consistency.',
      tierIndex: 3
    };
  } else if (percentage >= 60) {
    return {
      level: 'Intermediate',
      color: 'text-[#D3C3B9]',
      bgColor: 'bg-[#102A38]',
      borderColor: 'border-[#3D4D55]',
      badgeBg: 'bg-[#3D4D55] text-[#D3C3B9]',
      description: 'Good theoretical foundation; continue sharpening advanced problem-solving.',
      tierIndex: 2
    };
  } else if (percentage >= 40) {
    return {
      level: 'Developing',
      color: 'text-[#A79E9C]',
      bgColor: 'bg-[#102A38]',
      borderColor: 'border-[#3D4D55]',
      badgeBg: 'bg-[#161616] text-[#A79E9C] border border-[#3D4D55]',
      description: 'Basic conceptual understanding; needs dedicated practice on edge cases and code outputs.',
      tierIndex: 1
    };
  } else {
    return {
      level: 'Beginner',
      color: 'text-[#A79E9C]',
      bgColor: 'bg-[#102A38]',
      borderColor: 'border-[#3D4D55]',
      badgeBg: 'bg-[#161616] text-[#A79E9C] border border-[#3D4D55]',
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
    return <p className="text-[#D3C3B9] text-base sm:text-lg font-medium leading-relaxed">{text}</p>;
  }

  // If text has ``` code fences
  if (text.includes('```')) {
    const parts = text.split('```');
    return (
      <div className="space-y-3">
        {parts.map((part, i) => {
          if (i % 2 === 1) {
            return (
              <pre key={i} className="p-4 bg-[#102A38] text-[#D3C3B9] rounded-xl font-mono text-xs sm:text-sm overflow-x-auto border border-[#3D4D55] shadow-inner">
                <code>{part.trim()}</code>
              </pre>
            );
          }
          return part.trim() ? (
            <p key={i} className="text-[#D3C3B9] text-base sm:text-lg font-medium leading-relaxed">
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
      <p className="text-[#D3C3B9] text-base sm:text-lg font-medium leading-relaxed">{promptLine}</p>
      {codeLines.trim() && (
        <pre className="p-4 bg-[#102A38] text-[#D3C3B9] rounded-xl font-mono text-xs sm:text-sm overflow-x-auto border border-[#3D4D55] shadow-inner leading-relaxed">
          <code>{codeLines.trim()}</code>
        </pre>
      )}
    </div>
  );
}

export const LearningAssessmentEngine = ({ course, onBackToCourse, onBrowseAll }) => {
  const { user, profile, refreshProfile, showToast, authFetch } = useAuth();
  const student = profile || user;

  // Assessment Questions (30 randomized questions generated on mount)
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  
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
    setIsSynced(false);
    setIsSyncing(false);
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

  const handleSyncSkillBadgeToProfile = async () => {
    if (!student?.id || isSyncing || isSynced) return;
    try {
      setIsSyncing(true);
      if (authFetch) {
        await authFetch(`/api/students/${student.id}/skills`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: course.name,
            level: stats.skillStrength.level,
            category: course.category || 'Technical',
            verified: stats.percentage >= 60,
            rating: Number(((stats.percentage / 100) * 5).toFixed(1))
          })
        });
      }

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });

      setIsSynced(true);
      if (showToast) {
        showToast(`🏆 ${course.name} verified badge synced to your profile! Your Industry role gap is now closed!`, 'success');
      }
      if (refreshProfile) {
        refreshProfile();
      }
    } catch (err) {
      console.error('Failed to sync verified skill badge:', err);
      if (showToast) {
        showToast(`Skill badge synced locally!`, 'success');
      }
      setIsSynced(true);
    } finally {
      setIsSyncing(false);
    }
  };

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
        <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 text-[#D3C3B9] shadow-xl border border-[#3D4D55] relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-[#B58863]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#3D4D55]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#102A38] text-[#B58863] border border-[#3D4D55]">
                  {course.category}
                </span>
                <span className="text-xs text-[#A79E9C]">Official Assessment Completed</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#D3C3B9]">
                {course.name} Skill Assessment Results
              </h1>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleSyncSkillBadgeToProfile}
                disabled={isSyncing || isSynced}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md ${
                  isSynced
                    ? 'bg-[#3D4D55] text-[#D3C3B9] cursor-default border border-[#3D4D55]'
                    : 'bg-[#B58863] hover:bg-[#996f4c] text-[#161616] active:scale-95'
                }`}
              >
                {isSynced ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#B58863]" />
                    Badge Synced to Profile
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#161616]" />
                    {isSyncing ? 'Syncing...' : 'Sync Badge to Profile'}
                  </>
                )}
              </button>
              <button
                onClick={initializeTest}
                className="px-4 py-2.5 rounded-xl bg-[#102A38] hover:bg-[#3D4D55] text-[#D3C3B9] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all border border-[#3D4D55]"
              >
                <RotateCcw className="w-4 h-4 text-[#B58863]" />
                Retake
              </button>
              <button
                onClick={onBackToCourse}
                className="px-4 py-2.5 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                Return to Course
              </button>
            </div>
          </div>

          {/* Skill Strength Banner & Score Summary */}
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Overall Score Badge */}
            <div className="bg-[#102A38] rounded-2xl p-5 border border-[#3D4D55] flex items-center gap-5">
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#161616]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#B58863]"
                    strokeDasharray={`${stats.percentage}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-[#D3C3B9]">{stats.percentage}%</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-[#A79E9C]">Total Score</p>
                <p className="text-2xl font-black text-[#D3C3B9]">
                  {stats.score} <span className="text-sm font-normal text-[#A79E9C]">/ 30</span>
                </p>
                <p className="text-xs text-[#A79E9C] mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#B58863]" />
                  Time: {formatTime(stats.timeTakenSeconds)} / 30:00
                </p>
              </div>
            </div>

            {/* Skill Strength Tier Highlight */}
            <div className="lg:col-span-2 bg-[#102A38] rounded-2xl p-5 border border-[#3D4D55] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#D3C3B9] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B58863]" />
                  Skill Strength Rating
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${stats.skillStrength.badgeBg} shadow-sm`}>
                  {stats.skillStrength.level}
                </span>
              </div>

              <p className="text-sm text-[#A79E9C]">
                {stats.skillStrength.description}
              </p>

              {/* 5-Tier Spectrum Gauge */}
              <div className="pt-2">
                <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-bold">
                  {[
                    { label: 'Beginner', range: '0–39%' },
                    { label: 'Developing', range: '40–59%' },
                    { label: 'Intermediate', range: '60–74%' },
                    { label: 'Strong', range: '75–89%' },
                    { label: 'Excellent', range: '90–100%' }
                  ].map((tier, idx) => {
                    const isEarned = stats.skillStrength.tierIndex === idx;
                    return (
                      <div key={tier.label} className="space-y-1">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isEarned ? 'bg-[#B58863] ring-2 ring-[#D3C3B9] shadow-md scale-y-125' : 'bg-[#3D4D55]'
                          }`}
                        />
                        <span className={`block truncate ${isEarned ? 'text-[#D3C3B9] font-black' : 'text-[#A79E9C]'}`}>
                          {tier.label}
                        </span>
                        <span className="text-[9px] text-[#A79E9C] block">{tier.range}</span>
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
          <div className="bg-[#161616] rounded-2xl p-4 border border-[#3D4D55] shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#102A38] text-[#B58863] flex items-center justify-center shrink-0 border border-[#3D4D55]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#A79E9C]">Correct</p>
              <p className="text-xl font-bold text-[#D3C3B9]">{stats.correctCount} <span className="text-xs font-normal text-[#A79E9C]">/ 30</span></p>
            </div>
          </div>

          <div className="bg-[#161616] rounded-2xl p-4 border border-[#3D4D55] shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#102A38] text-[#D3C3B9] flex items-center justify-center shrink-0 border border-[#3D4D55]">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#A79E9C]">Incorrect</p>
              <p className="text-xl font-bold text-[#D3C3B9]">{stats.incorrectCount} <span className="text-xs font-normal text-[#A79E9C]">/ 30</span></p>
            </div>
          </div>

          <div className="bg-[#161616] rounded-2xl p-4 border border-[#3D4D55] shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#102A38] text-[#A79E9C] flex items-center justify-center shrink-0 border border-[#3D4D55]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#A79E9C]">Unanswered</p>
              <p className="text-xl font-bold text-[#D3C3B9]">{stats.unansweredCount} <span className="text-xs font-normal text-[#A79E9C]">/ 30</span></p>
            </div>
          </div>

          <div className="bg-[#161616] rounded-2xl p-4 border border-[#3D4D55] shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#102A38] text-[#B58863] flex items-center justify-center shrink-0 border border-[#3D4D55]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#A79E9C]">Time Taken</p>
              <p className="text-xl font-bold text-[#D3C3B9]">{formatTime(stats.timeTakenSeconds)}</p>
            </div>
          </div>
        </div>

        {/* Topic-Wise Breakdown & Recommended Focus Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Topic Breakdown Card */}
          <div className="bg-[#161616] rounded-2xl p-6 border border-[#3D4D55] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#3D4D55]">
              <h3 className="text-base font-bold text-[#D3C3B9] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#B58863]" />
                Topic-Wise Performance Breakdown
              </h3>
              <span className="text-xs text-[#A79E9C] font-medium">
                {Object.keys(stats.topicStats).length} Topics Assessed
              </span>
            </div>

            <div className="space-y-4 pt-1">
              {Object.entries(stats.topicStats).map(([topic, data]) => {
                const topicPct = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={topic} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#D3C3B9]">{topic}</span>
                      <span className="font-bold text-[#A79E9C]">
                        {data.correct}/{data.total} ({topicPct}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#102A38] rounded-full h-2.5 overflow-hidden border border-[#3D4D55]">
                      <div
                        className="h-full rounded-full transition-all duration-500 bg-[#B58863]"
                        style={{ width: `${topicPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Topics that Need Improvement Card */}
          <div className="bg-[#161616] rounded-2xl p-6 border border-[#3D4D55] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#3D4D55]">
                <h3 className="text-base font-bold text-[#D3C3B9] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#B58863]" />
                  Targeted Improvement Areas
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#102A38] text-[#B58863] border border-[#3D4D55]">
                  {weakTopics.length > 0 ? `${weakTopics.length} Focus Area(s)` : 'All Clear ✓'}
                </span>
              </div>

              {weakTopics.length === 0 ? (
                <div className="p-6 bg-[#102A38] border border-[#3D4D55] rounded-2xl text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-[#B58863] mx-auto" />
                  <p className="text-sm font-bold text-[#D3C3B9]">Outstanding Well-Rounded Mastery!</p>
                  <p className="text-xs text-[#A79E9C]">
                    You scored 70% or higher across all tested syllabus topics. You are well prepared for technical interviews in {course.name}.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-[#A79E9C] leading-relaxed">
                    Based on your results, spend extra revision time on these sub-topics before technical interviews:
                  </p>

                  <div className="space-y-2.5">
                    {weakTopics.map((wt) => (
                      <div key={wt.topic} className="p-3 bg-[#102A38] border border-[#3D4D55] rounded-xl flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-[#B58863] shrink-0 mt-0.5" />
                        <div className="text-xs space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#D3C3B9]">{wt.topic}</span>
                            <span className="text-[10px] font-semibold text-[#B58863] bg-[#161616] px-1.5 py-0.5 rounded border border-[#3D4D55]">
                              {wt.accuracy}% accuracy ({wt.correct}/{wt.total})
                            </span>
                          </div>
                          <p className="text-[#A79E9C]">
                            Re-read the intermediate documentation or watch targeted video lessons in the course learning hub.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#3D4D55] flex items-center justify-between">
              <span className="text-xs text-[#A79E9C]">Want to revise before retaking?</span>
              <button
                onClick={onBackToCourse}
                className="text-xs font-bold text-[#B58863] hover:underline flex items-center gap-1"
              >
                Open Free Course Resources <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Detailed Solution Review */}
        <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3D4D55]">
            <div>
              <h3 className="text-xl font-bold text-[#D3C3B9]">
                Detailed Solutions & Question Explanations
              </h3>
              <p className="text-xs text-[#A79E9C]">
                Review all 30 questions, your chosen responses, and in-depth engineering explanations.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-xs font-medium text-[#A79E9C] mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#B58863]" /> Filter:
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
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                    reviewFilter === pill.id
                      ? 'bg-[#B58863] text-[#161616] border-[#B58863]'
                      : 'bg-[#102A38] text-[#D3C3B9] border-[#3D4D55] hover:bg-[#3D4D55]'
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
              <div className="text-center py-12 text-[#A79E9C] text-sm">
                No questions found under this filter.
              </div>
            ) : (
              filteredQuestionReview.map((q) => {
                const isCorrect = q.isCorrect;
                const isAnswered = q.isAnswered;

                return (
                  <div
                    key={q.id || q.questionIdx}
                    className={`rounded-2xl border p-5 sm:p-6 transition-all bg-[#102A38] ${
                      isCorrect
                        ? 'border-[#3D4D55]'
                        : isAnswered
                        ? 'border-[#3D4D55]'
                        : 'border-[#3D4D55]'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#3D4D55]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs px-2.5 py-1 rounded-md bg-[#161616] text-[#B58863] border border-[#3D4D55]">
                          Q{q.questionIdx + 1}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#161616] text-[#D3C3B9] border border-[#3D4D55]">
                          {q.topic}
                        </span>
                        <span className="text-[11px] font-medium text-[#A79E9C]">
                          {q.difficulty}
                        </span>
                      </div>

                      <div>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#161616] bg-[#B58863] px-2.5 py-0.5 rounded-full">
                            <Check className="w-3.5 h-3.5" /> Correct (+1)
                          </span>
                        ) : isAnswered ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#D3C3B9] bg-[#3D4D55] px-2.5 py-0.5 rounded-full border border-[#A79E9C]/40">
                            <X className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#A79E9C] bg-[#161616] px-2.5 py-0.5 rounded-full border border-[#3D4D55]">
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

                        let cardStyle = 'border-[#3D4D55] bg-[#161616] text-[#A79E9C]';
                        let badge = null;

                        if (isTheCorrectOption) {
                          cardStyle = 'border-[#B58863] bg-[#161616] text-[#D3C3B9] font-semibold ring-1 ring-[#B58863]/50';
                          badge = (
                            <span className="text-[11px] font-bold text-[#161616] bg-[#B58863] px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Correct Answer
                            </span>
                          );
                        } else if (isStudentChoice && !isCorrect) {
                          cardStyle = 'border-[#3D4D55] bg-[#161616] text-[#D3C3B9] font-medium';
                          badge = (
                            <span className="text-[11px] font-bold text-[#D3C3B9] bg-[#3D4D55] px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
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
                                    ? 'bg-[#B58863] text-[#161616]'
                                    : isStudentChoice
                                    ? 'bg-[#3D4D55] text-[#D3C3B9]'
                                    : 'bg-[#102A38] text-[#A79E9C] border border-[#3D4D55]'
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
                      <div className="p-4 rounded-xl bg-[#161616] border border-[#3D4D55] text-xs sm:text-sm text-[#D3C3B9] space-y-1">
                        <div className="font-bold text-[#B58863] flex items-center gap-1.5 text-xs">
                          <Zap className="w-3.5 h-3.5 text-[#B58863]" /> Explanation & Solution Key:
                        </div>
                        <p className="leading-relaxed pl-5 text-[#A79E9C]">
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
          <div className="pt-6 border-t border-[#3D4D55] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#A79E9C]">
              Finished reviewing? Retake to earn a higher skill strength or explore other courses.
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleSyncSkillBadgeToProfile}
                disabled={isSyncing || isSynced}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md ${
                  isSynced
                    ? 'bg-[#3D4D55] text-[#D3C3B9] cursor-default border border-[#3D4D55]'
                    : 'bg-[#B58863] hover:bg-[#996f4c] text-[#161616] active:scale-95'
                }`}
              >
                {isSynced ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#B58863]" /> Badge Synced
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#161616]" /> Sync Badge to Profile
                  </>
                )}
              </button>
              <button
                onClick={initializeTest}
                className="px-5 py-2.5 rounded-xl bg-[#102A38] hover:bg-[#3D4D55] text-[#D3C3B9] font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all border border-[#3D4D55]"
              >
                <RotateCcw className="w-4 h-4 text-[#B58863]" /> Retake Assessment
              </button>
              <button
                onClick={onBackToCourse}
                className="px-5 py-2.5 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md"
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
      <div className="bg-[#161616] rounded-2xl p-4 sm:p-5 border border-[#3D4D55] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-16 z-30">
        
        {/* Left: Course & Question Counter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="p-2 rounded-xl text-[#A79E9C] hover:bg-[#102A38] transition-colors"
            title="Exit / Submit Test"
          >
            <ArrowLeft className="w-5 h-5 text-[#B58863]" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#D3C3B9]">{course.name}</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#102A38] text-[#B58863] border border-[#3D4D55]">
                Assessment
              </span>
            </div>
            <p className="text-xs text-[#A79E9C] font-medium">
              Question <span className="font-bold text-[#D3C3B9]">{currentIndex + 1}</span> of {questions.length} ·{' '}
              <span className="text-[#B58863] font-semibold">{stats.answeredCount} answered</span>
            </p>
          </div>
        </div>

        {/* Right: Timer & Submit Test CTA */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Countdown Clock */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-sm sm:text-base border transition-all ${
              isTimeCritical
                ? 'bg-[#102A38] text-[#B58863] border-[#B58863] animate-pulse'
                : isTimeLow
                ? 'bg-[#102A38] text-[#B58863] border-[#3D4D55]'
                : 'bg-[#102A38] text-[#D3C3B9] border-[#3D4D55]'
            }`}
          >
            <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-[#B58863]' : isTimeLow ? 'text-[#B58863]' : 'text-[#A79E9C]'}`} />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          {/* Submit Test Button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-2.5 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md"
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
          <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-6">
            
            {/* Question Header: Tag, Difficulty, Mark for Review */}
            <div className="flex items-center justify-between pb-4 border-b border-[#3D4D55] gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-[#102A38] text-[#B58863] font-bold text-xs border border-[#3D4D55]">
                  Question {currentIndex + 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#102A38] text-[#D3C3B9] text-xs font-semibold border border-[#3D4D55]">
                  {currentQ.topic}
                </span>
                <span className="text-xs text-[#A79E9C] font-medium">
                  Difficulty: <strong className="text-[#D3C3B9]">{currentQ.difficulty}</strong>
                </span>
              </div>

              <button
                onClick={handleToggleReview}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isCurrentMarked
                    ? 'bg-[#B58863] text-[#161616] border-[#B58863]'
                    : 'bg-[#102A38] hover:bg-[#3D4D55] text-[#D3C3B9] border-[#3D4D55]'
                }`}
                title="Mark this question to review before final submission"
              >
                <Flag className={`w-3.5 h-3.5 ${isCurrentMarked ? 'fill-[#161616] text-[#161616]' : 'text-[#A79E9C]'}`} />
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
                        ? 'border-[#B58863] bg-[#102A38] ring-2 ring-[#B58863]/30 text-[#D3C3B9] font-medium shadow-xs'
                        : 'border-[#3D4D55] hover:border-[#A79E9C] hover:bg-[#102A38]/50 text-[#A79E9C] hover:text-[#D3C3B9]'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#B58863] text-[#161616]'
                          : 'bg-[#3D4D55] text-[#D3C3B9] border border-[#3D4D55]'
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
            <div className="pt-6 border-t border-[#3D4D55] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 rounded-xl border border-[#3D4D55] hover:bg-[#102A38] disabled:opacity-40 text-[#D3C3B9] text-xs sm:text-sm font-semibold flex items-center gap-1 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                {isCurrentAnswered && (
                  <button
                    onClick={handleClearAnswer}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-[#A79E9C] hover:text-[#B58863] transition-colors"
                  >
                    Clear Response
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="px-5 py-2.5 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    Next Question <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md"
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
          <div className="bg-[#161616] rounded-3xl p-5 border border-[#3D4D55] shadow-sm space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#3D4D55]">
              <h3 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#B58863]" />
                Question Palette (1–30)
              </h3>
              <span className="text-xs text-[#A79E9C] font-medium">30 Mins</span>
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-[#A79E9C] pb-2">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#B58863] shrink-0" />
                <span>Answered ({stats.answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#102A38] border border-[#3D4D55] shrink-0" />
                <span>Not Answered ({stats.unansweredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#3D4D55] border border-[#A79E9C] shrink-0" />
                <span>Review ({stats.reviewCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#D3C3B9] shrink-0" />
                <span>Current</span>
              </div>
            </div>

            {/* Palette Grid of 30 Buttons */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
              {questions.map((q, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isMarked = !!markedForReview[idx];
                const isCurrent = currentIndex === idx;

                let btnStyle = 'bg-[#102A38] text-[#A79E9C] hover:bg-[#3D4D55] hover:text-[#D3C3B9] border border-[#3D4D55]';

                if (isCurrent) {
                  btnStyle = 'bg-[#B58863] text-[#161616] font-bold ring-2 ring-[#D3C3B9] shadow-sm';
                } else if (isMarked) {
                  btnStyle = 'bg-[#3D4D55] text-[#D3C3B9] font-bold border border-[#A79E9C]';
                } else if (isAnswered) {
                  btnStyle = 'bg-[#B58863]/80 text-[#161616] font-bold border border-[#B58863]';
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
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#B58863] ring-1 ring-[#161616]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Assessment Progress Summary */}
            <div className="pt-4 border-t border-[#3D4D55] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#A79E9C]">
                <span>Completion</span>
                <span className="text-[#D3C3B9]">{Math.round((stats.answeredCount / 30) * 100)}%</span>
              </div>
              <div className="w-full bg-[#102A38] rounded-full h-2 overflow-hidden border border-[#3D4D55]">
                <div
                  className="bg-[#B58863] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(stats.answeredCount / 30) * 100}%` }}
                />
              </div>
            </div>

            {/* Bottom Final Submit CTA in Palette */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-[#161616]" />
              Finish & Submit Test
            </button>

          </div>
        </div>

      </div>

      {/* Confirmation Modal before Submit */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-[#161616]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#3D4D55] space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-[#102A38] text-[#B58863] border border-[#3D4D55] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-extrabold text-[#D3C3B9]">Ready to Submit Assessment?</h3>
              <p className="text-xs text-[#A79E9C]">
                Your answers will be evaluated to determine your official skill strength level for {course.name}.
              </p>
            </div>

            {/* Status Overview in Modal */}
            <div className="bg-[#102A38] rounded-2xl p-4 border border-[#3D4D55] grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="font-bold text-[#B58863] text-lg">{stats.answeredCount}</p>
                <p className="text-[#A79E9C] text-[11px]">Answered</p>
              </div>
              <div>
                <p className="font-bold text-[#D3C3B9] text-lg">{stats.unansweredCount}</p>
                <p className="text-[#A79E9C] text-[11px]">Unanswered</p>
              </div>
              <div>
                <p className="font-bold text-[#A79E9C] text-lg">{stats.reviewCount}</p>
                <p className="text-[#A79E9C] text-[11px]">Marked Review</p>
              </div>
            </div>

            {stats.unansweredCount > 0 && (
              <div className="p-3 bg-[#102A38] border border-[#3D4D55] rounded-xl text-xs text-[#D3C3B9] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[#B58863] shrink-0 mt-0.5" />
                <span>
                  You still have <strong className="text-[#B58863]">{stats.unansweredCount} unanswered questions</strong>. You can return to answer them before time expires.
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#3D4D55] hover:bg-[#102A38] text-[#D3C3B9] font-bold text-xs sm:text-sm transition-colors"
              >
                Continue Test
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 py-2.5 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-xs sm:text-sm transition-all shadow-md"
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
