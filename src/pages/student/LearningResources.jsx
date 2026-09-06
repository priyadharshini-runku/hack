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
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SkillAssessmentModal } from './SkillAssessmentModal';
import confetti from 'canvas-confetti';

export const LearningResources = () => {
  const { user, profile, refreshProfile, showToast } = useAuth();
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [completedMap, setCompletedMap] = useState({});
  
  // Assessment Test Modal State
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [activeTestSkill, setActiveTestSkill] = useState('React');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch('/api/resources');
        if (res.ok) {
          const data = await res.json();
          setResources(data);
        }
      } catch (err) {
        console.error('Failed to fetch resources:', err);
      }
    };
    fetchResources();
  }, []);

  const handleOpenAssessment = (skillName) => {
    setActiveTestSkill(skillName);
    setAssessmentModalOpen(true);
  };

  const handleToggleComplete = async (res) => {
    const isDone = completedMap[res.id];
    const nextState = !isDone;
    setCompletedMap({ ...completedMap, [res.id]: nextState });

    if (nextState) {
      confetti({ particleCount: 30, spread: 50 });
      showToast(`Finished "${res.title}"! Take the Skill Test to earn your verified badge.`, 'success');
      
      // Auto-boost student's skill in backend if logged in as student
      if (user.role === 'student') {
        try {
          await fetch(`/api/students/${user.id}/skills`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: res.skill,
              level: res.level.includes('Advanced') ? 'Advanced' : 'Intermediate',
              category: 'Technical',
              verified: false,
              rating: 4.0
            })
          });
          refreshProfile();
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const skillsList = ['All', ...Array.from(new Set(resources.map(r => r.skill)))];

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.platform.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = selectedSkill === 'All' || r.skill.toLowerCase() === selectedSkill.toLowerCase();
    const matchesLevel = selectedLevel === 'All' || r.level.toLowerCase().includes(selectedLevel.toLowerCase());
    return matchesSearch && matchesSkill && matchesLevel;
  });

  const getPlatformIcon = (platform) => {
    if (platform.toLowerCase().includes('youtube')) return <Video className="w-4 h-4 text-rose-600 shrink-0" />;
    if (platform.toLowerCase().includes('docs') || platform.toLowerCase().includes('react')) return <Globe className="w-4 h-4 text-sky-600 shrink-0" />;
    return <Code className="w-4 h-4 text-emerald-600 shrink-0" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <BookOpen className="w-4 h-4" />
            Watch Tutorials & Take 50-Question (30 Min) Skill Verification Tests
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            Open-Access Learning Hub & 50-Question Skill Assessments
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Learn from free YouTube courses and official documentation, then take our high-toughness <strong>50-question (30-minute) technical assessments</strong> to prove genuine mastery and earn verified skill badges.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl backdrop-blur-md border border-white/10">
          <ShieldCheck className="w-8 h-8 text-amber-400" />
          <div className="text-xs">
            <p className="font-bold text-white">50-Question Skill Test</p>
            <p className="text-slate-300">30 Mins · Score ≥60% for badge</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by skill (e.g. React, Git, Data Structures, Python, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          {/* Level Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium text-slate-700"
            >
              <option value="All">All Skill Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

        </div>

        {/* Skill Category Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Filter Skill:</span>
          {skillsList.map(skill => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedSkill === skill
                  ? 'bg-brand-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(res => {
          const isDone = completedMap[res.id];
          const isSkillVerified = profile?.skills?.some(s => s.name.toLowerCase() === res.skill.toLowerCase() && s.verified);

          return (
            <div 
              key={res.id} 
              className={`bg-white rounded-3xl border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${
                isSkillVerified ? 'border-emerald-300 ring-1 ring-emerald-200 bg-emerald-50/10' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                    {res.skill}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {res.estimatedHours}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {res.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 font-medium">
                    {getPlatformIcon(res.platform)}
                    {res.platform}
                  </span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    {res.rating}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Watch Video + Take Verification Assessment */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    Watch Tutorial <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => handleOpenAssessment(res.skill)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-2xs ${
                      isSkillVerified
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                    }`}
                    title="Take 50-Question 30-Minute Technical Assessment"
                  >
                    <Award className="w-3.5 h-3.5" />
                    {isSkillVerified ? 'Verified ✓ (50Q)' : 'Take 50Q Test (30m)'}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-slate-400">Level: {res.level}</span>
                  <button
                    onClick={() => handleToggleComplete(res)}
                    className={`text-[11px] font-semibold hover:underline flex items-center gap-1 ${
                      isDone ? 'text-emerald-600' : 'text-slate-500'
                    }`}
                  >
                    {isDone ? <Check className="w-3 h-3" /> : null}
                    {isDone ? 'Finished Learning' : 'Mark Completed'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Assessment Modal */}
      <SkillAssessmentModal
        isOpen={assessmentModalOpen}
        onClose={() => setAssessmentModalOpen(false)}
        skillName={activeTestSkill}
        onSkillVerified={() => {
          refreshProfile();
        }}
      />

    </div>
  );
};
