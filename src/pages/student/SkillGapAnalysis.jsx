import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Compass, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  ExternalLink, 
  Award, 
  Check, 
  Zap, 
  TrendingUp,
  Info,
  Clock,
  Video,
  Globe,
  Code,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { ProgressBar } from '../../components/common/ProgressBar';
import confetti from 'canvas-confetti';
import { SkillAssessmentModal } from './SkillAssessmentModal';
import { CAREER_ROLES, CURATED_LEARNING_RESOURCES, computeClientSkillGap } from '../../data/careerRoles';

export const SkillGapAnalysis = ({ setActivePage }) => {
  const { user, profile, authFetch, refreshProfile, showToast } = useAuth();
  const student = profile || user;

  const [jobRoles, setJobRoles] = useState(CAREER_ROLES);
  const [selectedRoleId, setSelectedRoleId] = useState(student.targetRoleId || 'role_swe');
  const [analysis, setAnalysis] = useState(() => computeClientSkillGap(student, student.targetRoleId || 'role_swe'));
  const [resources, setResources] = useState(CURATED_LEARNING_RESOURCES);
  const [loading, setLoading] = useState(false);
  const [activeTestSkill, setActiveTestSkill] = useState(null);

  // Load Job Roles from API if available, fallback to CAREER_ROLES
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await authFetch('/api/job-roles');
        if (res.ok) {
          const roles = await res.json();
          if (Array.isArray(roles) && roles.length > 0) {
            setJobRoles(roles);
          }
        }
      } catch (err) {
        console.warn('Using client career roles repository:', err.message);
      }
    };
    fetchRoles();
  }, []);

  // Run Gap Analysis
  useEffect(() => {
    const runAnalysis = async () => {
      const activeRoleId = selectedRoleId || 'role_swe';
      // Compute deterministic client analysis immediately so UI is never blank
      const clientFallback = computeClientSkillGap(student, activeRoleId);
      setAnalysis(clientFallback);

      try {
        setLoading(true);
        const [gapRes, resRes] = await Promise.all([
          authFetch(`/api/gap-analysis/${student.id}?targetRoleId=${activeRoleId}`),
          authFetch('/api/resources')
        ]);

        if (gapRes.ok) {
          const gapData = await gapRes.json();
          if (gapData && (gapData.skillsHave?.length > 0 || gapData.skillsNeed?.length > 0)) {
            setAnalysis(gapData);
          }
        }
        if (resRes.ok) {
          const allRes = await resRes.json();
          if (Array.isArray(allRes) && allRes.length > 0) {
            setResources(allRes);
          }
        }
      } catch (err) {
        console.warn('Using client skill gap engine:', err.message);
      } finally {
        setLoading(false);
      }
    };

    runAnalysis();
  }, [student.id, selectedRoleId, student.skills?.length]);

  // Handler to simulate learning a skill and update profile live
  const handleSimulateLearnSkill = async (skillName, level = 'Intermediate') => {
    try {
      const res = await fetch(`/api/students/${student.id}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: skillName,
          level,
          category: 'Technical',
          verified: false,
          rating: 3.8
        })
      });

      if (res.ok) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
        showToast(`🎉 Mastered ${skillName}! Your role match score has increased!`, 'success');
        refreshProfile();
      } else {
        // Local update fallback if offline
        const updatedSkills = [...(student.skills || []), { name: skillName, level, category: 'Technical', verified: false, rating: 4.0 }];
        student.skills = updatedSkills;
        setAnalysis(computeClientSkillGap(student, selectedRoleId));
        showToast(`🎉 Mastered ${skillName}! Your role match score has increased!`, 'success');
      }
    } catch (err) {
      showToast(`Mastered ${skillName}!`, 'success');
    }
  };

  const getPlatformIcon = (platform = '') => {
    if (platform.toLowerCase().includes('youtube')) return <Video className="w-4 h-4 text-rose-600" />;
    if (platform.toLowerCase().includes('docs') || platform.toLowerCase().includes('react')) return <Globe className="w-4 h-4 text-sky-600" />;
    return <Code className="w-4 h-4 text-emerald-600" />;
  };

  const currentRole = jobRoles.find(r => r.id === selectedRoleId) || CAREER_ROLES[0];

  const navigateToLearningHub = (courseId, startAssessment = false) => {
    if (courseId) {
      sessionStorage.setItem('skillbridge_active_course_id', courseId);
      if (startAssessment) {
        sessionStorage.setItem('skillbridge_start_assessment', 'true');
      } else {
        sessionStorage.removeItem('skillbridge_start_assessment');
      }
    }
    if (setActivePage) {
      setActivePage('learning-resources');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-700 via-sky-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-100 text-xs font-semibold backdrop-blur-xs">
            <Compass className="w-4 h-4 text-sky-300" />
            Flagship Intelligence Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            Interactive Skill Gap Analysis
          </h1>
          <p className="text-brand-100 text-sm max-w-2xl">
            Compare your verified competencies against live industry benchmarks, identify pinpoint deficits, and access curated free roadmaps to achieve placement readiness.
          </p>
        </div>

        {/* Role Selector Dropdown */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 w-full md:w-80 shrink-0">
          <label className="block text-xs font-bold text-brand-100 uppercase tracking-wider mb-2">
            Target Job Benchmark
          </label>
          <select
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 font-semibold text-sm shadow-md outline-none focus:ring-2 focus:ring-sky-400"
          >
            {jobRoles.map(role => (
              <option key={role.id} value={role.id}>
                {role.companyName ? `🏢 ${role.companyName} · ` : ''}{role.title} ({role.category || 'Industry Benchmark'})
              </option>
            ))}
          </select>
          <div className="flex items-center justify-between text-[11px] text-brand-200 mt-2">
            <span>Demand: {currentRole?.hiringDemand || 'High'}</span>
            <span>Avg: {currentRole?.avgStartingSalary || '₹9.2 LPA'}</span>
          </div>
        </div>
      </div>

      {/* Match Score & Recommendation Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Match Gauge */}
          <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-center flex flex-col items-center justify-center space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Current Skill Match Score
            </span>
            <div className="relative flex items-center justify-center my-2">
              <div className={`text-5xl font-extrabold font-display ${
                (analysis?.matchPercentage || 0) >= 75 ? 'text-emerald-600' : (analysis?.matchPercentage || 0) >= 50 ? 'text-amber-600' : 'text-rose-600'
              }`}>
                {analysis?.matchPercentage || 0}%
              </div>
            </div>
            <div className="w-full max-w-[220px]">
              <ProgressBar value={analysis?.matchPercentage || 0} showPercentage={false} height="h-3" />
            </div>
            <p className="text-[11px] text-slate-500 pt-1 font-medium">
              Based on weighted industry requirement matrix for <strong>{analysis?.targetRole?.title || currentRole.title}</strong>
            </p>
          </div>

          {/* Recommendation & Disclaimer */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-5 rounded-2xl bg-brand-50/80 border border-brand-200/80 space-y-2">
              <div className="flex items-center gap-2 text-brand-800 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
                Personalized Recommendation Summary
              </div>
              <p className="text-sm text-brand-950 font-medium leading-relaxed italic">
                «“{analysis?.recommendationSummary || `You are ${analysis?.matchPercentage}% matched with the selected ${analysis?.targetRole?.title} role.`}”»
              </p>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Placement Advisory Note:</strong> Skill match percentage serves as an estimated skill-readiness indicator based on published employer criteria and helps you target specific gaps before campus recruitment drives.
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Side-by-Side Comparison: Skills You Have vs Skills You Need */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Skills You Have */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Skills You Have ({analysis?.skillsHave?.length || 0})
                </h3>
                <p className="text-xs text-slate-500">Skills aligned with this role requirement</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ✓ Ready
            </span>
          </div>

          <div className="space-y-3">
            {analysis?.skillsHave?.map(item => (
              <div key={item.skill} className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">✓ {item.skill}</span>
                    {item.verified && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    Your Level: <strong className="text-slate-700">{item.studentLevel}</strong> · Target: <span className="text-slate-600">{item.requiredLevel}</span>
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                  {item.weight}% Impact
                </span>
              </div>
            ))}

            {(!analysis?.skillsHave || analysis.skillsHave.length === 0) && (
              <div className="p-8 text-center text-slate-500 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="font-semibold text-slate-700 mb-1">No matching skills recorded yet for this benchmark.</p>
                <p>Add your skills in your profile or pass our verified assessments below!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Skills You Need */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Skills You Need ({analysis?.skillsNeed?.length || 0})
                </h3>
                <p className="text-xs text-slate-500">Missing competencies to master</p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              ⚠ High Priority
            </span>
          </div>

          <div className="space-y-3">
            {analysis?.skillsNeed?.map(item => {
              const lh = item.learningHub;
              return (
                <div key={item.skill} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-900">⚠ {item.skill}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {item.priority} Priority
                        </span>
                        {lh && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                            Learning Hub Course Available
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{item.whyLearn}</p>
                    </div>
                    <span className="text-xs font-semibold text-amber-800 bg-white px-2 py-1 rounded-lg border border-amber-200 shadow-2xs shrink-0">
                      +{item.weight}% Match
                    </span>
                  </div>

                  {/* Direct Hub Link & YouTube Preview if mapped */}
                  {lh && (
                    <div className="p-2.5 bg-white/80 rounded-xl border border-amber-100 text-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 truncate">
                        <Video className="w-4 h-4 text-rose-600 shrink-0" />
                        <span className="font-semibold text-slate-800 truncate">{lh.courseName}</span>
                        <span className="text-slate-400 text-[11px] hidden sm:inline">({lh.category})</span>
                      </div>
                      {lh.youtubeUrl && (
                        <a
                          href={lh.youtubeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 shrink-0"
                        >
                          Watch on YouTube <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-amber-200/60 flex-wrap gap-2">
                    <span className="text-[11px] text-slate-500">Target Proficiency: <strong>{item.requiredLevel}</strong></span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => navigateToLearningHub(lh?.courseId, false)}
                        className="text-xs font-bold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors flex items-center gap-1 shadow-2xs"
                        title="Study free courses and tutorials for this skill in Learning Hub"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        Study in Hub
                      </button>
                      <button
                        onClick={() => {
                          if (lh?.courseId) {
                            navigateToLearningHub(lh.courseId, true);
                          } else {
                            setActiveTestSkill(item.skill);
                          }
                        }}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300 transition-colors flex items-center gap-1 shadow-2xs"
                        title="Take 30-minute, 30-question assessment in Learning Hub to earn a verified skill badge"
                      >
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        Take 30-Min Test (30Q)
                      </button>
                      <button
                        onClick={() => handleSimulateLearnSkill(item.skill, item.requiredLevel)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
                        title="Quickly mark as self-learned without formal test"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Self-Mark
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {(!analysis?.skillsNeed || analysis.skillsNeed.length === 0) && (
              <div className="p-8 text-center text-emerald-600 text-sm font-bold bg-emerald-50 rounded-2xl border border-emerald-200">
                🎉 Congratulations! You meet 100% of the core industry requirements for this role!
              </div>
            )}
          </div>
        </div>

      </div>



      {/* ==================== LEARNING RECOMMENDATION SYSTEM ==================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              100% Free Open-Access Curriculums
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Recommended Free Learning Resources for Missing Skills
            </h2>
            <p className="text-xs text-slate-500">
              Hand-picked YouTube tutorials, FreeCodeCamp certifications, GeeksforGeeks guides, and official docs.
            </p>
          </div>

          <button
            onClick={() => setActivePage('learning-resources')}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0"
          >
            Browse Full Library <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(analysis?.recommendedLearningHubResources?.length > 0 
            ? analysis.recommendedLearningHubResources 
            : resources
          )
            .slice(0, 6)
            .map(res => (
              <div key={res.id || res.title} className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200 hover:border-brand-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-100 text-brand-800">
                      {res.skill}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {res.estimatedHours || '4 Hours'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {res.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-200/60">
                    <span className="flex items-center gap-1 font-medium">
                      {getPlatformIcon(res.platform)}
                      {res.platform}
                    </span>
                    <span className="font-semibold text-amber-600">★ {res.rating || 4.8}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-medium text-slate-400">{res.level || 'All Levels'}</span>
                  <div className="flex items-center gap-1.5">
                    {res.courseId && (
                      <button
                        onClick={() => navigateToLearningHub(res.courseId, false)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-all border border-indigo-200"
                      >
                        Course Hub
                      </button>
                    )}
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1"
                    >
                      Start Learning <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>

      </div>
      
      {/* Skill Assessment Modal */}
      {activeTestSkill && (
        <SkillAssessmentModal
          skillName={activeTestSkill}
          isOpen={!!activeTestSkill}
          onClose={() => {
            setActiveTestSkill(null);
            refreshProfile();
          }}
          onTestPassed={({ skill, score }) => {
            showToast(`🏆 Verified Badge Earned! You scored ${score}% in ${skill}!`, 'success');
            refreshProfile();
          }}
        />
      )}

    </div>
  );
};
