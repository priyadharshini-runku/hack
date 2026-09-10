import React, { useState, useEffect } from 'react';
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

export const LearningResources = () => {
  const { user, profile, showToast } = useAuth();

  // View state: 'catalog' | 'course' | 'assessment'
  const [view, setView] = useState('catalog');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Search & Filter state for catalog
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Course view active learning path tab: 'beginner' | 'intermediate' | 'advanced'
  const [activePathTab, setActivePathTab] = useState('beginner');

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
      return <Video className="w-4 h-4 text-rose-600 shrink-0" />;
    }
    if (t.includes('doc') || t.includes('reference')) {
      return <FileText className="w-4 h-4 text-sky-600 shrink-0" />;
    }
    if (t.includes('practice') || t.includes('lab') || t.includes('problem')) {
      return <Code className="w-4 h-4 text-purple-600 shrink-0" />;
    }
    return <Compass className="w-4 h-4 text-emerald-600 shrink-0" />;
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
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            onClick={() => setView('catalog')}
            className="hover:text-indigo-600 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Courses
          </button>
          <span>/</span>
          <span className="text-slate-400">{selectedCourse.category}</span>
          <span>/</span>
          <span className="text-slate-900 font-bold">{selectedCourse.name}</span>
        </div>

        {/* Course Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                {renderCourseIcon(selectedCourse.icon, "w-4 h-4")}
                {selectedCourse.category}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
                {selectedCourse.name}
              </h1>

              <p className="text-base sm:text-lg font-medium text-indigo-200">
                {selectedCourse.tagline}
              </p>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                {selectedCourse.description}
              </p>
            </div>

            {/* Quick Assessment CTA Card */}
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/15 w-full lg:w-80 shrink-0 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm">30-Minute Assessment</h3>
                  <p className="text-xs text-slate-300">30 Questions · Medium to Hard</p>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-300" /> 30:00 Countdown Timer
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-indigo-300" /> Know Your Skill Strength
                </div>
              </div>

              <button
                onClick={() => handleStartAssessment(selectedCourse)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/30 active:scale-[0.98]"
              >
                <Zap className="w-4 h-4" />
                Take 30-Minute Assessment
              </button>
            </div>
          </div>
        </div>

        {/* 3-Step Flow Notification Banner */}
        <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-indigo-950">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
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
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 flex items-center gap-1 transition-colors"
          >
            Start Assessment Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Learning Path & Core Topics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (7 cols): Beginner to Advanced Learning Path */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    Structured Learning Path
                  </h2>
                  <p className="text-xs text-slate-500">
                    Step-by-step progression from foundational concepts to production-grade engineering.
                  </p>
                </div>
              </div>

              {/* Learning Path Tabs */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                {[
                  { id: 'beginner', label: '1. Beginner', color: 'text-rose-700' },
                  { id: 'intermediate', label: '2. Intermediate', color: 'text-indigo-700' },
                  { id: 'advanced', label: '3. Advanced', color: 'text-purple-700' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePathTab(tab.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      activePathTab === tab.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
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
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                      {step}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column (5 cols): Important Core Topics to Learn */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                  Important Topics to Learn
                </h2>
                <p className="text-xs text-slate-500">
                  Key syllabus competencies tested in the 30-minute assessment.
                </p>
              </div>

              <div className="space-y-2.5">
                {selectedCourse.topics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs sm:text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                100% Free & Verified Content
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Curated Free Learning Resources
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
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
                  className={`bg-white rounded-3xl border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${
                    isDone ? 'border-emerald-300 ring-1 ring-emerald-200 bg-emerald-50/10' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {renderResourceTypeIcon(res.type)}
                        <span>{res.type}</span>
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        {res.provider}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {res.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => toggleResourceCompleted(res.title)}
                      className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${isDone ? 'text-emerald-700' : 'text-slate-400'}`} />
                      {isDone ? 'Finished' : 'Mark as Studied'}
                    </button>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm group"
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
        <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Ready to Prove Your {selectedCourse.name} Mastery?
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Take the 30-minute, 30-question technical assessment. Experience code output questions, conceptual puzzles, and debugging problems to know your Skill Strength level (Beginner &rarr; Developing &rarr; Intermediate &rarr; Strong &rarr; Excellent).
            </p>
          </div>

          <button
            onClick={() => handleStartAssessment(selectedCourse)}
            className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-emerald-950 font-black text-sm sm:text-base flex items-center gap-2 transition-all shadow-xl hover:shadow-2xl active:scale-95 shrink-0"
          >
            <Zap className="w-5 h-5 text-amber-500" />
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
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            SkillBridge Learning Hub · 20 Engineering Courses
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
            Learn Free Resources & Prove Your Skill Strength
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Access curated free tutorials, video playlists, and official documentation across 20 core engineering subjects. Complete each course and take a rigorous <strong>30-minute, 30-question assessment</strong> to determine your verified skill strength.
          </p>

          {/* 3-Step Cards inside Hero */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur-xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                1
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Learn Free</p>
                <p className="text-slate-400">Playlists, Docs & Platforms</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur-xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                2
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">30-Min Test</p>
                <p className="text-slate-400">30 Randomized Questions</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur-xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Skill Strength</p>
                <p className="text-slate-400">Beginner &rarr; Excellent Tier</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="w-full sm:flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search courses (e.g. C, Python, SQL, DSA, VLSI, Networks, AI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Result Count */}
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
            Showing {filteredCourses.length} of {LEARNING_COURSES.length} Courses
          </span>

        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {COURSE_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid (20 Courses) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group hover:border-indigo-300"
          >
            <div className="space-y-3.5">
              
              {/* Header: Icon & Category */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:scale-105 transition-transform">
                  {renderCourseIcon(course.icon, "w-6 h-6")}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  {course.category}
                </span>
              </div>

              {/* Course Title & Tagline */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {course.name}
                </h2>
                <p className="text-xs font-semibold text-indigo-700 mt-0.5 line-clamp-1">
                  {course.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {course.description}
              </p>

              {/* Core Topics Tags Preview */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {course.topics.slice(0, 3).map((topic, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100"
                  >
                    {topic}
                  </span>
                ))}
                {course.topics.length > 3 && (
                  <span className="text-[10px] font-medium bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded-md">
                    +{course.topics.length - 3} more
                  </span>
                )}
              </div>

            </div>

            {/* Bottom Meta & Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  {course.resources.length} Free Resources
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  30m Assessment
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenCourse(course)}
                  className="py-2.5 px-3 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-all"
                >
                  Explore Course
                </button>

                <button
                  onClick={() => handleStartAssessment(course)}
                  className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-sm shadow-indigo-600/20"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  Take 30m Test
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No courses match your search</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search terms or selecting 'All' categories.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="text-xs font-bold text-indigo-600 hover:underline pt-2"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
export default LearningResources;
