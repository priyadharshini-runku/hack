import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Compass, 
  Target, 
  BookOpen, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  FileText,
  Clock,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ProgressBar } from '../../components/common/ProgressBar';
import { SkillBadge } from '../../components/common/SkillBadge';
import { SkillAssessmentModal } from './SkillAssessmentModal';
import { computeClientSkillGap } from '../../data/careerRoles';

export const StudentDashboard = ({ setActivePage }) => {
  const { user, profile, authFetch, refreshProfile } = useAuth();
  const student = profile || user;

  const [gapData, setGapData] = useState(() => computeClientSkillGap(student, student.targetRoleId || 'role_swe'));
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [examModalOpen, setExamModalOpen] = useState(false);
  const [activeTestSkill, setActiveTestSkill] = useState('Grand Exam');

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Set initial resilient client fallback immediately
      const clientFallback = computeClientSkillGap(student, student.targetRoleId || 'role_swe');
      setGapData(clientFallback);

      try {
        setLoading(true);
        const [gapRes, appRes] = await Promise.all([
          authFetch(`/api/gap-analysis/${user.id}`),
          authFetch(`/api/applications?studentId=${user.id}`)
        ]);

        if (gapRes.ok) {
          const gData = await gapRes.json();
          if (gData && (gData.skillsHave?.length > 0 || gData.skillsNeed?.length > 0)) {
            setGapData(gData);
          }
        }
        if (appRes.ok) {
          const aData = await appRes.json();
          if (Array.isArray(aData)) {
            setApplications(aData);
          }
        }
      } catch (err) {
        console.warn('Dashboard using client computation fallback:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user.id, student.skills?.length, student.targetRoleId]);

  const verifiedSkillsCount = (student.skills || []).filter(s => s.verified).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img 
              src={student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
              alt={student.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-md" 
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display">{student.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
                  {student.year || '3rd Year (6th Semester)'}
                </span>
              </div>
              <p className="text-brand-100 text-sm">
                {student.department || 'Computer Science & Engineering'} · {student.collegeName || 'Indian Institute of Technology Bombay'}
              </p>
              <div className="flex items-center gap-4 text-xs text-brand-200 pt-1">
                {student.cgpa && (
                  <>
                    <span>CGPA: <strong className="text-white">{student.cgpa}</strong></span>
                    <span>•</span>
                  </>
                )}
                <span>Target Benchmark: <strong className="text-white">{gapData?.targetRole?.title || student.targetRoleTitle || 'Software Developer'}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setActivePage('assessment')}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-slate-900" />
              Career Assessment
            </button>
            <button
              onClick={() => setActivePage('skill-gap')}
              className="px-4 py-2.5 rounded-xl bg-white text-brand-700 hover:bg-brand-50 font-semibold text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-brand-600" />
              Full Gap Report
            </button>
            <button
              onClick={() => setActivePage('student-profile')}
              className="px-4 py-2.5 rounded-xl bg-brand-800/60 hover:bg-brand-800/80 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Match Percentage Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Role Readiness</span>
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900 font-display">
              {gapData?.matchPercentage || 68}%
            </span>
            <span className="text-xs text-emerald-600 font-semibold">+14% this term</span>
          </div>
          <ProgressBar value={gapData?.matchPercentage || 68} />
          <p className="text-[11px] text-slate-500 mt-2 truncate">For {gapData?.targetRole?.title || 'Software Developer'}</p>
        </div>

        {/* Skills Mastered Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mastered Skills</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900 font-display">
              {student.skills?.length || 4}
            </span>
            <span className="text-xs text-slate-500">skills recorded</span>
          </div>
          <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {verifiedSkillsCount || 2} Industry Verified
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Endorsed by TechNova & Labs</p>
        </div>

        {/* Skill Gaps Identified */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Identified Gaps</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900 font-display">
              {gapData?.skillsNeed?.length || 3}
            </span>
            <span className="text-xs text-amber-600 font-semibold">Missing skills</span>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            {gapData?.skillsNeed?.slice(0, 2).map(s => s.skill).join(', ') || 'Data Structures, React'}
          </p>
          <button 
            onClick={() => setActivePage('learning-resources')} 
            className="text-[11px] text-brand-600 font-semibold hover:underline mt-2 inline-flex items-center gap-1"
          >
            Explore Free Courses <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Active Applications */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Applications</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900 font-display">
              {applications.length || 1}
            </span>
            <span className="text-xs text-sky-600 font-semibold">In Pipeline</span>
          </div>
          <div className="text-xs text-slate-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            1 Technical Interview Active
          </div>
          <button 
            onClick={() => setActivePage('application-tracking')} 
            className="text-[11px] text-brand-600 font-semibold hover:underline mt-2 inline-flex items-center gap-1"
          >
            Track Status <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Skill Gap Summary & Learning Path */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Skill Gap Analysis Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                  <Compass className="w-5 h-5 text-brand-600" />
                  Skill Gap Overview: {gapData?.targetRole?.title || 'Software Developer'}
                </h3>
                <p className="text-xs text-slate-500">Benchmark against 2026 hiring criteria</p>
              </div>
              <button
                onClick={() => setActivePage('skill-gap')}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                View Full Analysis <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Recommendation banner */}
            <div className="p-4 rounded-xl bg-brand-50/70 border border-brand-100 mb-6">
              <p className="text-xs text-brand-900 font-medium leading-relaxed">
                {gapData?.recommendationSummary || `You are 68% matched with the selected role. Master your missing competencies to boost your placement readiness.`}
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Skills You Have */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Skills You Have ({gapData?.skillsHave?.length || 0})
                </div>
                <div className="space-y-2">
                  {gapData?.skillsHave?.map(s => (
                    <div key={s.skill} className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-800">{s.skill}</span>
                        {s.verified && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-medium flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{s.studentLevel}</span>
                    </div>
                  ))}

                  {(!gapData?.skillsHave || gapData.skillsHave.length === 0) && (
                    <p className="text-xs text-slate-400 italic p-3 text-center">No matching skills yet.</p>
                  )}
                </div>
              </div>

              {/* Skills You Need */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Skills You Need ({gapData?.skillsNeed?.length || 0})
                </div>
                <div className="space-y-2">
                  {gapData?.skillsNeed?.map(s => (
                    <div key={s.skill} className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-800">{s.skill}</span>
                        <span className="text-[10px] text-amber-700 ml-2 font-medium">({s.priority} Priority)</span>
                      </div>
                      <button
                        onClick={() => setActivePage('learning-resources')}
                        className="text-[10px] font-bold text-brand-600 hover:text-brand-700 underline"
                      >
                        Learn Free
                      </button>
                    </div>
                  ))}

                  {(!gapData?.skillsNeed || gapData.skillsNeed.length === 0) && (
                    <p className="text-xs text-emerald-600 font-semibold p-3 text-center">All core requirements met!</p>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Recommended Next Steps */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              Recommended Free Learning Resources For Your Gaps
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                      YouTube Course
                    </span>
                    <span className="text-xs text-slate-400">14 Hours</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">
                    Data Structures & Algorithms in Java / Python
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">freeCodeCamp.org · Arrays, Trees, Graphs & Dynamic Programming</p>
                </div>
                <a
                  href="https://www.youtube.com/watch?v=RBSGKlAnoiM"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  Start Course <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-700">
                      Official Docs
                    </span>
                    <span className="text-xs text-slate-400">10 Hours</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">
                    React 18 Interactive Documentation & Sandboxes
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">React.dev · Components, Hooks, State & Modern UI Patterns</p>
                </div>
                <a
                  href="https://react.dev/learn"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  Start Reading <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Quick Actions, High Match Internships & College Workshops */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Action Shortcuts */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h4>
            
            <button
              onClick={() => setActivePage('assessment')}
              className="w-full text-left p-3 rounded-xl hover:bg-amber-50/70 border border-amber-200/80 bg-amber-50/30 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    Career Assessment
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold">New</span>
                  </p>
                  <p className="text-[10px] text-slate-500">Test skills & evaluate gaps</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 transition-colors" />
            </button>

            <button
              onClick={() => setActivePage('student-profile')}
              className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm">
                  +
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Add New Skills / Projects</p>
                  <p className="text-[10px] text-slate-500">Update proficiency levels</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActivePage('internships')}
              className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                  ⚡
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">High-Match Internships</p>
                  <p className="text-[10px] text-slate-500">Matched to your current skills</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActivePage('workshops')}
              className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                  🎓
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Upcoming College Workshops</p>
                  <p className="text-[10px] text-slate-500">React & DSA Bootcamps</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Verified Company Endorsement Snapshot */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 border border-slate-700 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Feedback
              </span>
              <span className="text-xs font-extrabold text-amber-400">4.5 / 5.0 ★</span>
            </div>

            <p className="text-xs text-slate-300 italic leading-relaxed">
              “Demonstrated strong technical curiosity and solid problem-solving foundation in practical team projects.”
            </p>

            <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>TechNova Industry Lab</span>
              <button 
                onClick={() => setActivePage('application-tracking')}
                className="text-brand-300 hover:text-white underline"
              >
                View Feedback
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Assessment Modal */}
      {examModalOpen && (
        <SkillAssessmentModal
          skillName={activeTestSkill}
          isOpen={examModalOpen}
          onClose={() => {
            setExamModalOpen(false);
            refreshProfile();
          }}
          onSkillVerified={() => {
            refreshProfile();
          }}
        />
      )}

    </div>
  );
};
