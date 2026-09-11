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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300 bg-[#102A38] text-[#D3C3B9]">
      
      {/* Welcome Banner */}
      <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 text-[#D3C3B9] shadow-xl relative overflow-hidden border border-[#3D4D55]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img 
              src={student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
              alt={student.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-[#B58863] shadow-md" 
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#D3C3B9]">{student.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#3D4D55] text-xs font-semibold text-[#D3C3B9] border border-[#B58863]/30">
                  {student.year || '3rd Year (6th Semester)'}
                </span>
              </div>
              <p className="text-[#A79E9C] text-sm">
                {student.department || 'Computer Science & Engineering'} · {student.collegeName || 'Indian Institute of Technology Bombay'}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#A79E9C] pt-1">
                {student.cgpa && (
                  <>
                    <span>CGPA: <strong className="text-[#D3C3B9]">{student.cgpa}</strong></span>
                    <span>•</span>
                  </>
                )}
                <span>Target Benchmark: <strong className="text-[#B58863]">{gapData?.targetRole?.title || student.targetRoleTitle || 'Software Developer'}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setActivePage('assessment')}
              className="px-4 py-2.5 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-[#161616]" />
              Career Assessment
            </button>
            <button
              onClick={() => setActivePage('skill-gap')}
              className="px-4 py-2.5 rounded-xl bg-[#3D4D55] text-[#D3C3B9] hover:bg-[#3D4D55]/80 font-semibold text-sm border border-[#3D4D55] shadow-sm transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#B58863]" />
              Full Gap Report
            </button>
            <button
              onClick={() => setActivePage('student-profile')}
              className="px-4 py-2.5 rounded-xl bg-[#102A38] hover:bg-[#102A38]/80 text-[#D3C3B9] font-semibold text-sm border border-[#3D4D55] transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#A79E9C]" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Match Percentage Card */}
        <div className="bg-[#161616] rounded-2xl p-5 border border-[#3D4D55] shadow-sm hover:border-[#B58863]/50 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#A79E9C] uppercase tracking-wider">Role Readiness</span>
            <div className="p-2 rounded-xl bg-[#3D4D55] text-[#B58863]">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-[#B58863] font-display">
              {gapData?.matchPercentage || 68}%
            </span>
            <span className="text-xs text-[#D3C3B9] font-semibold">+14% this term</span>
          </div>
          <ProgressBar value={gapData?.matchPercentage || 68} />
          <p className="text-[11px] text-[#A79E9C] mt-2 truncate">For {gapData?.targetRole?.title || 'Software Developer'}</p>
        </div>

        {/* Skills Mastered Card */}
        <div className="bg-[#161616] rounded-2xl p-5 border border-[#3D4D55] shadow-sm hover:border-[#B58863]/50 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#A79E9C] uppercase tracking-wider">Mastered Skills</span>
            <div className="p-2 rounded-xl bg-[#3D4D55] text-[#B58863]">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-[#D3C3B9] font-display">
              {student.skills?.length || 4}
            </span>
            <span className="text-xs text-[#A79E9C]">skills recorded</span>
          </div>
          <div className="text-xs text-[#B58863] font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {verifiedSkillsCount || 2} Industry Verified
          </div>
          <p className="text-[11px] text-[#A79E9C] mt-2">Endorsed by TechNova & Labs</p>
        </div>

        {/* Skill Gaps Identified */}
        <div className="bg-[#161616] rounded-2xl p-5 border border-[#3D4D55] shadow-sm hover:border-[#B58863]/50 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#A79E9C] uppercase tracking-wider">Identified Gaps</span>
            <div className="p-2 rounded-xl bg-[#3D4D55] text-[#B58863]">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-[#D3C3B9] font-display">
              {gapData?.skillsNeed?.length || 3}
            </span>
            <span className="text-xs text-[#B58863] font-semibold">Missing skills</span>
          </div>
          <p className="text-xs text-[#A79E9C] leading-snug">
            {gapData?.skillsNeed?.slice(0, 2).map(s => s.skill).join(', ') || 'Data Structures, React'}
          </p>
          <button 
            onClick={() => setActivePage('learning-resources')} 
            className="text-[11px] text-[#B58863] font-semibold hover:underline mt-2 inline-flex items-center gap-1"
          >
            Explore Free Courses <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Active Applications */}
        <div className="bg-[#161616] rounded-2xl p-5 border border-[#3D4D55] shadow-sm hover:border-[#B58863]/50 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#A79E9C] uppercase tracking-wider">Applications</span>
            <div className="p-2 rounded-xl bg-[#3D4D55] text-[#B58863]">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-[#D3C3B9] font-display">
              {applications.length || 1}
            </span>
            <span className="text-xs text-[#B58863] font-semibold">In Pipeline</span>
          </div>
          <div className="text-xs text-[#D3C3B9] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B58863]" />
            1 Technical Interview Active
          </div>
          <button 
            onClick={() => setActivePage('application-tracking')} 
            className="text-[11px] text-[#B58863] font-semibold hover:underline mt-2 inline-flex items-center gap-1"
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
          <div className="bg-[#161616] rounded-2xl p-6 border border-[#3D4D55] shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#3D4D55]">
              <div>
                <h3 className="text-lg font-bold text-[#D3C3B9] font-display flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#B58863]" />
                  Skill Gap Overview: {gapData?.targetRole?.title || 'Software Developer'}
                </h3>
                <p className="text-xs text-[#A79E9C]">Benchmark against live industry criteria</p>
              </div>
              <button
                onClick={() => setActivePage('skill-gap')}
                className="text-xs font-semibold text-[#B58863] hover:underline flex items-center gap-1"
              >
                View Full Analysis <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Recommendation banner */}
            <div className="p-4 rounded-xl bg-[#3D4D55]/60 border border-[#B58863]/30 mb-6">
              <p className="text-xs text-[#D3C3B9] font-medium leading-relaxed">
                {gapData?.recommendationSummary || `You are 68% matched with the selected role. Master your missing competencies to boost your placement readiness.`}
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Skills You Have */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D3C3B9] uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#B58863]" />
                  Skills You Have ({gapData?.skillsHave?.length || 0})
                </div>
                <div className="space-y-2">
                  {gapData?.skillsHave?.map(s => (
                    <div key={s.skill} className="p-2.5 rounded-lg bg-[#102A38] border border-[#3D4D55] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#D3C3B9]">{s.skill}</span>
                        {s.verified && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-[#3D4D55] text-[#D3C3B9] border border-[#B58863]/30 rounded font-medium flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3 text-[#B58863]" /> Verified
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-[#A79E9C]">{s.studentLevel}</span>
                    </div>
                  ))}

                  {(!gapData?.skillsHave || gapData.skillsHave.length === 0) && (
                    <p className="text-xs text-[#A79E9C] italic p-3 text-center">No matching skills yet.</p>
                  )}
                </div>
              </div>

              {/* Skills You Need */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B58863] uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-[#B58863]" />
                  Skills You Need ({gapData?.skillsNeed?.length || 0})
                </div>
                <div className="space-y-2">
                  {gapData?.skillsNeed?.map(s => {
                    const lhCourseId = s.learningHub?.courseId;
                    return (
                      <div key={s.skill} className="p-2.5 rounded-lg bg-[#102A38] border border-[#3D4D55] flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-[#D3C3B9]">{s.skill}</span>
                          <span className="text-[10px] text-[#B58863] ml-2 font-medium">({s.priority} Priority)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (lhCourseId) {
                                sessionStorage.setItem('skillbridge_active_course_id', lhCourseId);
                                sessionStorage.removeItem('skillbridge_start_assessment');
                              }
                              setActivePage('learning-resources');
                            }}
                            className="text-[10px] font-bold text-[#B58863] hover:underline"
                          >
                            Learn Free
                          </button>
                          {lhCourseId && (
                            <button
                              onClick={() => {
                                sessionStorage.setItem('skillbridge_active_course_id', lhCourseId);
                                sessionStorage.setItem('skillbridge_start_assessment', 'true');
                                setActivePage('learning-resources');
                              }}
                              className="text-[10px] font-bold text-[#161616] bg-[#B58863] hover:bg-[#996f4c] px-2 py-0.5 rounded"
                            >
                              30m Test
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {(!gapData?.skillsNeed || gapData.skillsNeed.length === 0) && (
                    <p className="text-xs text-[#B58863] font-semibold p-3 text-center">All core requirements met!</p>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Recommended Next Steps */}
          <div className="bg-[#161616] rounded-2xl p-6 border border-[#3D4D55] shadow-sm">
            <h3 className="text-base font-bold text-[#D3C3B9] mb-4 font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B58863]" />
              Recommended Free Learning Resources For Your Gaps
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {((gapData?.recommendedLearningHubResources?.length > 0)
                ? gapData.recommendedLearningHubResources.slice(0, 2)
                : [
                    {
                      id: 'res_dsa',
                      title: 'Data Structures & Algorithms in Java / Python',
                      platform: 'YouTube (freeCodeCamp)',
                      estimatedHours: '14 Hours',
                      description: 'freeCodeCamp.org · Arrays, Trees, Graphs & Dynamic Programming',
                      url: 'https://www.youtube.com/watch?v=RBSGKlAnoiM',
                      courseId: 'dsa'
                    },
                    {
                      id: 'res_react',
                      title: 'React 18 Interactive Documentation & Sandboxes',
                      platform: 'Official Docs',
                      estimatedHours: '10 Hours',
                      description: 'React.dev · Components, Hooks, State & Modern UI Patterns',
                      url: 'https://react.dev/learn',
                      courseId: 'javascript'
                    }
                  ]
              ).map((res) => (
                <div key={res.title} className="p-4 rounded-xl bg-[#102A38] border border-[#3D4D55] hover:border-[#B58863]/60 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#3D4D55] text-[#D3C3B9]">
                        {res.platform || 'Free Resource'}
                      </span>
                      <span className="text-xs text-[#A79E9C]">{res.estimatedHours || '4 Hours'}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#D3C3B9] leading-snug">
                      {res.title}
                    </h4>
                    <p className="text-[11px] text-[#A79E9C] mt-1 line-clamp-2">{res.description}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#3D4D55] flex items-center justify-between gap-2">
                    {res.courseId && (
                      <button
                        onClick={() => {
                          sessionStorage.setItem('skillbridge_active_course_id', res.courseId);
                          sessionStorage.removeItem('skillbridge_start_assessment');
                          setActivePage('learning-resources');
                        }}
                        className="text-xs font-bold text-[#B58863] hover:underline"
                      >
                        Hub Course &rarr;
                      </button>
                    )}
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-[#D3C3B9] hover:text-[#B58863] flex items-center gap-1"
                    >
                      Start Learning <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Quick Actions, High Match Internships & College Workshops */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Action Shortcuts */}
          <div className="bg-[#161616] rounded-2xl p-5 border border-[#3D4D55] shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">Quick Actions</h4>
            
            <button
              onClick={() => setActivePage('assessment')}
              className="w-full text-left p-3 rounded-xl hover:bg-[#3D4D55]/50 border border-[#3D4D55] bg-[#102A38] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3D4D55] text-[#B58863] flex items-center justify-center font-bold text-sm">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#D3C3B9] flex items-center gap-1.5">
                    Career Assessment
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#B58863] text-[#161616] font-bold">New</span>
                  </p>
                  <p className="text-[10px] text-[#A79E9C]">Test skills & evaluate gaps</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#A79E9C] group-hover:text-[#B58863] transition-colors" />
            </button>

            <button
              onClick={() => setActivePage('student-profile')}
              className="w-full text-left p-3 rounded-xl hover:bg-[#3D4D55]/50 border border-[#3D4D55] bg-[#102A38] transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3D4D55] text-[#B58863] flex items-center justify-center font-bold text-sm">
                  +
                </div>
                <div>
                  <p className="text-xs font-bold text-[#D3C3B9]">Add New Skills / Projects</p>
                  <p className="text-[10px] text-[#A79E9C]">Update proficiency levels</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#A79E9C]" />
            </button>

            <button
              onClick={() => setActivePage('internships')}
              className="w-full text-left p-3 rounded-xl hover:bg-[#3D4D55]/50 border border-[#3D4D55] bg-[#102A38] transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3D4D55] text-[#B58863] flex items-center justify-center font-bold text-sm">
                  ⚡
                </div>
                <div>
                  <p className="text-xs font-bold text-[#D3C3B9]">High-Match Internships</p>
                  <p className="text-[10px] text-[#A79E9C]">Matched to your current skills</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#A79E9C]" />
            </button>

            <button
              onClick={() => setActivePage('workshops')}
              className="w-full text-left p-3 rounded-xl hover:bg-[#3D4D55]/50 border border-[#3D4D55] bg-[#102A38] transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3D4D55] text-[#B58863] flex items-center justify-center font-bold text-sm">
                  🎓
                </div>
                <div>
                  <p className="text-xs font-bold text-[#D3C3B9]">Upcoming Institution Workshops</p>
                  <p className="text-[10px] text-[#A79E9C]">React & DSA Bootcamps</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#A79E9C]" />
            </button>
          </div>

          {/* Verified Company Endorsement Snapshot */}
          <div className="bg-[#161616] text-[#D3C3B9] rounded-2xl p-5 border border-[#3D4D55] shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#B58863] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Feedback
              </span>
              <span className="text-xs font-extrabold text-[#B58863]">4.5 / 5.0 ★</span>
            </div>

            <p className="text-xs text-[#A79E9C] italic leading-relaxed">
              “Demonstrated strong technical curiosity and solid problem-solving foundation in practical team projects.”
            </p>

            <div className="pt-2 border-t border-[#3D4D55] flex items-center justify-between text-[11px] text-[#A79E9C]">
              <span>TechNova Industry Lab</span>
              <button 
                onClick={() => setActivePage('application-tracking')}
                className="text-[#B58863] hover:underline"
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
