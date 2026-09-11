import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ExternalLink, 
  Clock, 
  Star, 
  Video, 
  Globe, 
  Code, 
  CheckCircle2, 
  Sparkles,
  Award,
  ShieldCheck,
  Check,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Terminal,
  Cpu,
  Coffee,
  Network,
  Database,
  Layers,
  GitBranch,
  Server,
  Boxes,
  Brain,
  Bot,
  Cloud,
  Shield,
  FileText,
  Compass,
  CheckSquare,
  Zap,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { COURSE_CATEGORIES, LEARNING_COURSES } from '../../data/learningHubCourses';
import { LearningAssessmentEngine } from '../../components/learning/LearningAssessmentEngine';
import { computeClientSkillGap } from '../../data/careerRoles';

export const LearningResources = () => {
  const { user, profile, showToast } = useAuth();
  const student = profile || user;

  // View state: 'catalog' | 'course' | 'assessment'
  const [view, setView] = useState('catalog');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Search & Filter state for catalog
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Course view active learning path tab: 'beginner' | 'intermediate' | 'advanced'
  const [activePathTab, setActivePathTab] = useState('beginner');

  // Compute skill gap to highlight industry-demanded courses
  const gapAnalysis = useMemo(() => {
    return computeClientSkillGap(student, student.targetRoleId || 'role_swe');
  }, [student]);

  const missingCourseIds = useMemo(() => {
    const ids = new Set();
    (gapAnalysis.skillsNeed || []).forEach(item => {
      if (item.learningHub?.courseId) {
        ids.add(item.learningHub.courseId.toLowerCase());
      }
    });
    return ids;
  }, [gapAnalysis]);

  // Read active course or start assessment from navigation / sessionStorage
  useEffect(() => {
    try {
      const activeCourseId = sessionStorage.getItem('skillbridge_active_course_id');
      const startAssessment = sessionStorage.getItem('skillbridge_start_assessment');
      if (activeCourseId) {
        const found = LEARNING_COURSES.find(c => c.id.toLowerCase() === activeCourseId.toLowerCase());
        if (found) {
          setSelectedCourse(found);
          if (startAssessment === 'true') {
            setView('assessment');
            sessionStorage.removeItem('skillbridge_start_assessment');
          } else {
            setView('course');
          }
        }
        sessionStorage.removeItem('skillbridge_active_course_id');
      }
    } catch (err) {
      console.warn('Error reading course navigation handshake:', err);
    }
  }, []);

  // Track completed resources in local storage
  const [completedResources, setCompletedResources] = useState(() => {
    try {
      const saved = localStorage.getItem('skillbridge_completed_resources');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleResourceCompleted = (resourceTitle) => {
    setCompletedResources((prev) => {
      const updated = { ...prev, [resourceTitle]: !prev[resourceTitle] };
      try {
        localStorage.setItem('skillbridge_completed_resources', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, selectedCourse]);

  // Dynamic Course Icon Renderer
  const renderCourseIcon = (iconName, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Terminal': return <Terminal className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Coffee': return <Coffee className={className} />;
      case 'Code': return <Code className={className} />;
      case 'Network': return <Network className={className} />;
      case 'Database': return <Database className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'GitBranch': return <GitBranch className={className} />;
      case 'Server': return <Server className={className} />;
      case 'Boxes': return <Boxes className={className} />;
      case 'Brain': return <Brain className={className} />;
      case 'Bot': return <Bot className={className} />;
      case 'Cloud': return <Cloud className={className} />;
      case 'Shield': return <Shield className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  // Dynamic Resource Type Icon Renderer
  const renderResourceTypeIcon = (type) => {
    const t = type.toLowerCase();
    if (t.includes('youtube') || t.includes('video')) {
      return <Video className="w-4 h-4 text-[#B58863] shrink-0" />;
    }
    if (t.includes('doc') || t.includes('reference')) {
      return <FileText className="w-4 h-4 text-[#D3C3B9] shrink-0" />;
    }
    if (t.includes('practice') || t.includes('lab') || t.includes('problem')) {
      return <Code className="w-4 h-4 text-[#B58863] shrink-0" />;
    }
    return <Compass className="w-4 h-4 text-[#D3C3B9] shrink-0" />;
  };

  // Filter courses based on search & category
  const filteredCourses = LEARNING_COURSES.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      c.name.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.topics.some((t) => t.toLowerCase().includes(q));

    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handler to open Course details
  const handleOpenCourse = (course) => {
    setSelectedCourse(course);
    setActivePathTab('beginner');
    setView('course');
  };

  // Handler to start Assessment directly
  const handleStartAssessment = (course) => {
    setSelectedCourse(course);
    setView('assessment');
  };

  // =========================================================================
  // VIEW 3: ACTIVE ASSESSMENT OR RESULTS
  // =========================================================================
  if (view === 'assessment' && selectedCourse) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <LearningAssessmentEngine
          course={selectedCourse}
          onBackToCourse={() => setView('course')}
          onBrowseAll={() => setView('catalog')}
        />
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: COURSE LEARNING PAGE (Free resources, learning path, topics)
  // =========================================================================
  if (view === 'course' && selectedCourse) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300 pb-16">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#A79E9C]">
          <button
            onClick={() => setView('catalog')}
            className="hover:text-[#B58863] text-[#D3C3B9] flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#B58863]" /> All Courses
          </button>
          <span>/</span>
          <span className="text-[#A79E9C]">{selectedCourse.category}</span>
          <span>/</span>
          <span className="text-[#D3C3B9] font-bold">{selectedCourse.name}</span>
        </div>

        {/* Course Header Banner */}
        <div className="bg-[#161616] rounded-3xl p-6 sm:p-10 text-[#D3C3B9] shadow-xl relative overflow-hidden border border-[#3D4D55]">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-[#B58863]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A38] text-[#B58863] text-xs font-semibold border border-[#3D4D55]">
                {renderCourseIcon(selectedCourse.icon, "w-4 h-4")}
                {selectedCourse.category}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#D3C3B9]">
                {selectedCourse.name}
              </h1>

              <p className="text-base sm:text-lg font-medium text-[#B58863]">
                {selectedCourse.tagline}
              </p>

              <p className="text-[#A79E9C] text-xs sm:text-sm leading-relaxed max-w-2xl">
                {selectedCourse.description}
              </p>
            </div>

            {/* Quick Assessment CTA Card */}
            <div className="bg-[#102A38] p-6 rounded-2xl border border-[#3D4D55] w-full lg:w-80 shrink-0 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#B58863]/20 border border-[#B58863]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#B58863]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#D3C3B9] text-sm">30-Minute Assessment</h3>
                  <p className="text-xs text-[#A79E9C]">30 Questions · Medium to Hard</p>
                </div>
              </div>

              <div className="text-xs text-[#A79E9C] space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#B58863]" /> 30:00 Countdown Timer
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#B58863]" /> Know Your Skill Strength
                </div>
              </div>

              <button
                onClick={() => handleStartAssessment(selectedCourse)}
                className="w-full py-3 px-4 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
              >
                <Zap className="w-4 h-4" />
                Take 30-Minute Assessment
              </button>
            </div>
          </div>
        </div>

        {/* 3-Step Flow Notification Banner */}
        <div className="bg-[#102A38] border border-[#3D4D55] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#D3C3B9]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#B58863] text-[#161616] font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
              3-Step
            </span>
            <span>
              <strong>1. Learn Topics</strong> via free curated resources &rarr;{' '}
              <strong>2. Take 30-Min Assessment</strong> &rarr;{' '}
              <strong>3. Discover Skill Strength</strong> (Beginner &rarr; Developing &rarr; Intermediate &rarr; Strong &rarr; Excellent).
            </span>
          </div>
          <button
            onClick={() => handleStartAssessment(selectedCourse)}
            className="px-4 py-2 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-xs shrink-0 flex items-center gap-1 transition-colors"
          >
            Start Assessment Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Learning Path & Core Topics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (7 cols): Beginner to Advanced Learning Path */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#3D4D55]">
                <div>
                  <h2 className="text-xl font-bold text-[#D3C3B9] flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#B58863]" />
                    Structured Learning Path
                  </h2>
                  <p className="text-xs text-[#A79E9C]">
                    Step-by-step progression from foundational concepts to production-grade engineering.
                  </p>
                </div>
              </div>

              {/* Learning Path Tabs */}
              <div className="flex items-center p-1 bg-[#102A38] rounded-xl border border-[#3D4D55]">
                {[
                  { id: 'beginner', label: '1. Beginner' },
                  { id: 'intermediate', label: '2. Intermediate' },
                  { id: 'advanced', label: '3. Advanced' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePathTab(tab.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      activePathTab === tab.id
                        ? 'bg-[#B58863] text-[#161616] shadow-xs'
                        : 'text-[#A79E9C] hover:text-[#D3C3B9]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Active Tab Learning Steps */}
              <div className="space-y-3 pt-1">
                {selectedCourse.learningPath[activePathTab]?.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#102A38] border border-[#3D4D55] flex items-start gap-3.5 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#3D4D55] text-[#D3C3B9] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#A79E9C]/30">
                      {idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm text-[#D3C3B9] font-medium leading-relaxed">
                      {step}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column (5 cols): Important Core Topics to Learn */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-6">
              
              <div className="pb-4 border-b border-[#3D4D55]">
                <h2 className="text-xl font-bold text-[#D3C3B9] flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-[#B58863]" />
                  Important Topics to Learn
                </h2>
                <p className="text-xs text-[#A79E9C]">
                  Key syllabus competencies tested in the 30-minute assessment.
                </p>
              </div>

              <div className="space-y-2.5">
                {selectedCourse.topics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#102A38] border border-[#3D4D55] flex items-start gap-3 text-xs sm:text-sm text-[#D3C3B9]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B58863] shrink-0 mt-0.5" />
                    <span className="font-medium leading-snug">{topic}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Free Learning Resources Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A38] text-[#B58863] text-xs font-semibold border border-[#3D4D55] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                100% Free & Verified Content
              </div>
              <h2 className="text-2xl font-extrabold text-[#D3C3B9]">
                Curated Free Learning Resources
              </h2>
              <p className="text-xs sm:text-sm text-[#A79E9C]">
                Study from official docs, full video tutorials, and interactive coding platforms.
              </p>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedCourse.resources.map((res, idx) => {
              const isDone = !!completedResources[res.title];

              return (
                <div
                  key={idx}
                  className={`bg-[#161616] rounded-3xl border p-6 shadow-sm hover:border-[#B58863] transition-all flex flex-col justify-between space-y-4 ${
                    isDone ? 'border-[#B58863] ring-1 ring-[#B58863]/30 bg-[#161616]' : 'border-[#3D4D55]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D3C3B9] bg-[#102A38] px-2.5 py-1 rounded-lg border border-[#3D4D55]">
                        {renderResourceTypeIcon(res.type)}
                        <span>{res.type}</span>
                      </div>
                      <span className="text-xs font-medium text-[#A79E9C]">
                        {res.provider}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#D3C3B9] leading-snug">
                      {res.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A79E9C] leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-4 border-t border-[#3D4D55] flex items-center justify-between gap-3">
                    <button
                      onClick={() => toggleResourceCompleted(res.title)}
                      className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors border ${
                        isDone
                          ? 'bg-[#B58863]/20 border-[#B58863] text-[#B58863]'
                          : 'text-[#A79E9C] border-[#3D4D55] hover:bg-[#102A38] hover:text-[#D3C3B9]'
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${isDone ? 'text-[#B58863]' : 'text-[#A79E9C]'}`} />
                      {isDone ? 'Finished' : 'Mark as Studied'}
                    </button>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm group"
                    >
                      Open Resource
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Prominent Assessment Banner */}
        <div className="bg-[#161616] rounded-3xl p-6 sm:p-10 text-[#D3C3B9] shadow-xl border border-[#3D4D55] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#D3C3B9]">
              Ready to Prove Your {selectedCourse.name} Mastery?
            </h3>
            <p className="text-[#A79E9C] text-xs sm:text-sm leading-relaxed">
              Take the 30-minute, 30-question technical assessment. Experience code output questions, conceptual puzzles, and debugging problems to know your Skill Strength level (Beginner &rarr; Developing &rarr; Intermediate &rarr; Strong &rarr; Excellent).
            </p>
          </div>

          <button
            onClick={() => handleStartAssessment(selectedCourse)}
            className="px-8 py-4 rounded-2xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-black text-sm sm:text-base flex items-center gap-2 transition-all shadow-xl active:scale-95 shrink-0"
          >
            <Zap className="w-5 h-5 text-[#161616]" />
            Take 30-Minute Assessment
          </button>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 1: COURSES CATALOG VIEW (Default)
  // =========================================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* Hero Banner with 3-Step Overview */}
      <div className="bg-[#161616] rounded-3xl p-6 sm:p-10 text-[#D3C3B9] shadow-xl relative overflow-hidden border border-[#3D4D55]">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-[#B58863]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A38] text-[#B58863] text-xs font-semibold border border-[#3D4D55]">
            <Sparkles className="w-3.5 h-3.5" />
            SkillBridge Learning Hub · 20 Engineering Courses
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#D3C3B9]">
            Learn Free Resources & Prove Your Skill Strength
          </h1>

          <p className="text-[#A79E9C] text-sm sm:text-base leading-relaxed">
            Access curated free tutorials, video playlists, and official documentation across 20 core engineering subjects. Complete each course and take a rigorous <strong className="text-[#D3C3B9]">30-minute, 30-question assessment</strong> to determine your verified skill strength.
          </p>

          {/* 3-Step Cards inside Hero */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="bg-[#102A38] border border-[#3D4D55] p-3.5 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#3D4D55] text-[#B58863] flex items-center justify-center font-bold text-xs shrink-0 border border-[#A79E9C]/30">
                1
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#D3C3B9]">Learn Free</p>
                <p className="text-[#A79E9C]">Playlists, Docs & Platforms</p>
              </div>
            </div>

            <div className="bg-[#102A38] border border-[#3D4D55] p-3.5 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#3D4D55] text-[#B58863] flex items-center justify-center font-bold text-xs shrink-0 border border-[#A79E9C]/30">
                2
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#D3C3B9]">30-Min Test</p>
                <p className="text-[#A79E9C]">30 Randomized Questions</p>
              </div>
            </div>

            <div className="bg-[#102A38] border border-[#3D4D55] p-3.5 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#B58863] text-[#161616] flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#D3C3B9]">Skill Strength</p>
                <p className="text-[#A79E9C]">Beginner &rarr; Excellent Tier</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#161616] rounded-2xl p-4 sm:p-6 border border-[#3D4D55] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="w-full sm:flex-1 relative">
            <Search className="w-4 h-4 text-[#A79E9C] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search courses (e.g. C, Python, SQL, DSA, VLSI, Networks, AI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
            />
          </div>

          {/* Result Count */}
          <span className="text-xs font-bold text-[#A79E9C] whitespace-nowrap">
            Showing {filteredCourses.length} of {LEARNING_COURSES.length} Courses
          </span>

        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-[#A79E9C] whitespace-nowrap flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#B58863]" /> Category:
          </span>
          {COURSE_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === category
                  ? 'bg-[#B58863] text-[#161616] border-[#B58863] shadow-xs'
                  : 'bg-[#102A38] text-[#D3C3B9] border-[#3D4D55] hover:bg-[#3D4D55]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Industry Benchmark Gap Recommendations Banner */}
      {missingCourseIds.size > 0 && (
        <div className="p-5 rounded-2xl bg-[#161616] border border-[#3D4D55] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#102A38] text-[#B58863] flex items-center justify-center shrink-0 border border-[#3D4D55]">
              <Target className="w-5 h-5 text-[#B58863]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-2">
                Industry Target Benchmark Recommendations ({missingCourseIds.size} Courses)
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#B58863]/20 text-[#B58863] border border-[#B58863]/30">
                  {gapAnalysis?.targetRole?.title || 'Target Role'}
                </span>
              </h3>
              <p className="text-xs text-[#A79E9C] mt-0.5">
                These courses directly address the skill gaps identified in your profile for your target Industry role. Complete them and take the 30-min test to become placement ready!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Courses Grid (20 Courses) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isIndustryGap = missingCourseIds.has(course.id.toLowerCase());
          return (
            <div
              key={course.id}
              className={`bg-[#161616] rounded-3xl border p-6 shadow-sm hover:border-[#B58863] transition-all flex flex-col justify-between space-y-5 group ${
                isIndustryGap 
                  ? 'border-[#B58863] ring-1 ring-[#B58863]/30 bg-[#161616]' 
                  : 'border-[#3D4D55]'
              }`}
            >
              <div className="space-y-3.5">
                
                {/* Header: Icon & Category */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border group-hover:scale-105 transition-transform ${
                    isIndustryGap ? 'bg-[#102A38] text-[#B58863] border-[#B58863]/40' : 'bg-[#102A38] text-[#B58863] border-[#3D4D55]'
                  }`}>
                    {renderCourseIcon(course.icon, "w-6 h-6")}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isIndustryGap && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#B58863]/20 text-[#B58863] border border-[#B58863]/30">
                        ⚡ Role Gap
                      </span>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#102A38] text-[#A79E9C] border border-[#3D4D55]">
                      {course.category}
                    </span>
                  </div>
                </div>

              {/* Course Title & Tagline */}
              <div>
                <h2 className="text-lg font-bold text-[#D3C3B9] group-hover:text-[#B58863] transition-colors">
                  {course.name}
                </h2>
                <p className="text-xs font-semibold text-[#B58863] mt-0.5 line-clamp-1">
                  {course.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-[#A79E9C] leading-relaxed line-clamp-2">
                {course.description}
              </p>

              {/* Core Topics Tags Preview */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {course.topics.slice(0, 3).map((topic, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium bg-[#102A38] text-[#A79E9C] px-2 py-0.5 rounded-md border border-[#3D4D55]"
                  >
                    {topic}
                  </span>
                ))}
                {course.topics.length > 3 && (
                  <span className="text-[10px] font-medium bg-[#102A38] text-[#A79E9C] px-1.5 py-0.5 rounded-md border border-[#3D4D55]">
                    +{course.topics.length - 3} more
                  </span>
                )}
              </div>

            </div>

            {/* Bottom Meta & Actions */}
            <div className="pt-4 border-t border-[#3D4D55] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#A79E9C] font-medium">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#B58863]" />
                  {course.resources.length} Free Resources
                </span>
                <span className="flex items-center gap-1 text-[#D3C3B9] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#B58863]" />
                  30m Assessment
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenCourse(course)}
                  className="py-2.5 px-3 rounded-xl border border-[#3D4D55] hover:bg-[#102A38] text-[#D3C3B9] font-bold text-xs flex items-center justify-center gap-1 transition-all"
                >
                  Explore Course
                </button>

                <button
                  onClick={() => handleStartAssessment(course)}
                  className="py-2.5 px-3 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-sm"
                >
                  <Zap className="w-3.5 h-3.5 text-[#161616]" />
                  Take 30m Test
                </button>
              </div>
            </div>

          </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="bg-[#161616] rounded-3xl p-12 text-center border border-[#3D4D55] space-y-3">
          <BookOpen className="w-10 h-10 text-[#A79E9C] mx-auto" />
          <h3 className="text-base font-bold text-[#D3C3B9]">No courses match your search</h3>
          <p className="text-xs text-[#A79E9C]">
            Try adjusting your search terms or selecting 'All' categories.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="text-xs font-bold text-[#B58863] hover:underline pt-2"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
export default LearningResources;
