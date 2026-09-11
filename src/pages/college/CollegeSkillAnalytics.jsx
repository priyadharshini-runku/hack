import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  BarChart3, 
  School, 
  Users, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  Sparkles, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  ArrowRight,
  PieChart as PieIcon,
  Layers,
  Search,
  Lock,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { Modal } from '../../components/common/Modal';
import { SkillBadge } from '../../components/common/SkillBadge';
import confetti from 'canvas-confetti';

export const CollegeSkillAnalytics = ({ setActivePage }) => {
  const { user, profile, authFetch, showToast } = useAuth();
  
  // Permanent lock: Institution Administrator belongs to ONE assigned institution
  const assignedInstId = user?.institutionId || 'INST001';
  const assignedCollegeName = profile?.name || user?.collegeName || user?.title || 'Apex Institute of Technology';
  const assignedCollegeId = user?.collegeId || 'col_apex';

  const [analytics, setAnalytics] = useState(null);
  const [students, setStudents] = useState([]);
  const [industryInsights, setIndustryInsights] = useState(null);
  const [activeTab, setActiveTab] = useState('skill-gaps'); // 'skill-gaps' | 'branch-wise' | 'year-wise' | 'common-skills' | 'industry-intelligence'
  const [selectedDept, setSelectedDept] = useState('All');
  const [workshopModalOpen, setWorkshopModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dossierModalOpen, setDossierModalOpen] = useState(false);

  const [workshopData, setWorkshopData] = useState({
    title: 'Full-Stack React & Next.js Industry Intensive',
    targetSkill: 'React',
    department: 'Computer Science & Engineering',
    targetYear: '3rd Year & 4th Year',
    instructor: 'Arjun Nambiar (Senior Frontend Architect at TechNova)',
    startDate: '2026-09-18',
    endDate: '2026-09-20',
    duration: '3 Days (18 Hours)',
    maxSeats: 150,
    reasonForOrganizing: `Institution analytics detected a high percentage of students lacking modern React frameworks.`,
    description: 'Hands-on practical bootcamp covering Modern React 18, State Management, API integration, and deploying live production apps.'
  });

  const fetchCollegeData = async () => {
    try {
      const [analyticsRes, studentsRes, insightsRes] = await Promise.all([
        authFetch('/api/college/analytics'),
        authFetch('/api/students'),
        authFetch('/api/college/industry-insights')
      ]);

      if (analyticsRes.ok) {
        const data = await analyticsRes.json();
        setAnalytics(data);
        if (data.recommendedWorkshop) {
          setWorkshopData(prev => ({
            ...prev,
            title: data.recommendedWorkshop.title || prev.title,
            targetSkill: data.recommendedWorkshop.targetSkill || prev.targetSkill,
            reasonForOrganizing: data.recommendedWorkshop.recommendationText || prev.reasonForOrganizing
          }));
        }
      }

      if (studentsRes.ok) {
        const studentList = await studentsRes.json();
        setStudents(studentList || []);
      }

      if (insightsRes && insightsRes.ok) {
        const insightsData = await insightsRes.json();
        setIndustryInsights(insightsData);
      }
    } catch (err) {
      console.error('Failed to fetch college analytics:', err);
    }
  };

  useEffect(() => {
    fetchCollegeData();
  }, [assignedCollegeName, assignedInstId]);

  const handleCreateWorkshop = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch('/api/workshops', {
        method: 'POST',
        body: JSON.stringify({
          collegeName: assignedCollegeName,
          collegeId: assignedCollegeId,
          institutionId: assignedInstId,
          ...workshopData
        })
      });

      if (res.ok) {
        confetti({ particleCount: 50, spread: 60 });
        showToast(`Workshop for ${assignedCollegeName} scheduled successfully!`, 'success');
        setWorkshopModalOpen(false);
        setActivePage('workshops');
      }
    } catch (err) {
      showToast('Failed to create workshop', 'error');
    }
  };

  const totalEnrolled = analytics?.totalStudentsEnrolled ?? students.length;

  const barData = analytics?.topSkillGaps?.map(g => ({
    skill: g.skill,
    lackingPct: g.studentsLackingPct,
    count: g.count,
    suggestedWorkshop: g.suggestedWorkshop
  })) || [];

  const pieData = analytics?.readinessCohort || [
    { name: 'Placement Ready (≥75%)', value: 76.8, color: '#10b981' },
    { name: 'Moderate Match (50-74%)', value: 16.4, color: '#f59e0b' },
    { name: 'Needs Intervention (<50%)', value: 6.8, color: '#ef4444' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner - Locked to Assigned Institution */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
            <School className="w-4 h-4 text-amber-200" />
            {assignedCollegeName} · Institution ID: {assignedInstId}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            Institution Skill Gap & Placement Analytics
          </h1>
          <p className="text-amber-100 text-sm max-w-2xl">
            Real-time cohort intelligence identifying student skill gaps, branch-wise readiness, and automated workshop recommendations exclusively for <strong>{assignedCollegeName} (ID: {assignedInstId})</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/15 px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
            <Lock className="w-3.5 h-3.5 text-amber-200" />
            <span>Locked to ID: {assignedInstId}</span>
          </div>
          <button
            onClick={() => setWorkshopModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-white text-amber-900 hover:bg-amber-50 font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-600" />
            Schedule Workshop
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Enrolled Students</span>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-extrabold text-slate-900 font-display">
              {totalEnrolled}
            </span>
            <span className="text-xs text-emerald-600 font-semibold">{analytics?.overview?.profileCompletionRate || '94.5%'} Active</span>
          </div>
          <p className="text-xs text-slate-500 truncate">{assignedCollegeName}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Skill Match Score</span>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-extrabold text-brand-600 font-display">
              {analytics?.overview?.averageSkillMatch || 71.2}%
            </span>
            <span className="text-xs text-emerald-600 font-semibold">+8.4% this semester</span>
          </div>
          <p className="text-xs text-slate-500">Benchmark across 5 target roles</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Placement Readiness</span>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-extrabold text-emerald-600 font-display">
              {analytics?.overview?.placementReadinessRate || '76.8%'}
            </span>
            <span className="text-xs text-emerald-600 font-semibold">Ready for Drive</span>
          </div>
          <p className="text-xs text-slate-500">Industry-ready candidate pool</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Skill Credentials</span>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-extrabold text-purple-600 font-display">
              {analytics?.overview?.verifiedSkillsIssued || (totalEnrolled * 3) || 12}
            </span>
            <span className="text-xs text-slate-500">Credentials</span>
          </div>
          <p className="text-xs text-slate-500">Evaluated in 50Q assessments</p>
        </div>

      </div>

      {/* ==================== ACTIONABLE SUGGESTION BANNER ==================== */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
              Automated Workshop Recommendation for {assignedCollegeName}
            </span>
            <h3 className="text-base font-bold text-amber-950 font-display">
              «“{analytics?.recommendedWorkshop?.recommendationText || `College analytics detected a high percentage of ${assignedCollegeName} students lacking React skills. Consider conducting a Full-Stack React workshop.`}”»
            </h3>
            <p className="text-xs text-amber-800/90">
              Top skill deficit: <strong>{analytics?.recommendedWorkshop?.targetSkill || 'React & Modern Frontend'}</strong> ({analytics?.recommendedWorkshop?.lackingPct || 71}% cohort deficit).
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (analytics?.recommendedWorkshop) {
              setWorkshopData({
                ...workshopData,
                title: analytics.recommendedWorkshop.title || 'React & Frontend Industry Intensive',
                targetSkill: analytics.recommendedWorkshop.targetSkill || 'React',
                reasonForOrganizing: analytics.recommendedWorkshop.recommendationText
              });
            }
            setWorkshopModalOpen(true);
          }}
          className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/25 transition-all flex items-center gap-2 shrink-0"
        >
          Conduct Recommended Workshop <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Analytics Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('skill-gaps')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'skill-gaps' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Top Skill Deficits
        </button>

        <button
          onClick={() => setActiveTab('common-skills')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'common-skills' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          Most Common Skills
        </button>

        <button
          onClick={() => setActiveTab('branch-wise')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'branch-wise' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          Branch-Wise Analysis
        </button>

        <button
          onClick={() => setActiveTab('year-wise')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'year-wise' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Year-Wise Progression
        </button>

        <button
          onClick={() => setActiveTab('industry-intelligence')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'industry-intelligence' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Industry Demands & Alignment
        </button>
      </div>

      {/* TAB 1: Skill Gap Visual Charts */}
      {activeTab === 'skill-gaps' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left 7 Cols: Skill Gap % Bar Chart */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-600" />
                  Missing / Required Industry Skills (% Lacking)
                </h3>
                <p className="text-xs text-slate-500">Calculated specifically for <strong>{assignedCollegeName}</strong></p>
              </div>
              <span className="text-xs font-semibold text-slate-500">{totalEnrolled} Students Analyzed</span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="skill" tick={{ fontSize: 10, fill: '#64748b' }} interval={0} angle={-20} textAnchor="end" />
                  <YAxis unit="%" tick={{ fontSize: 11, fill: '#64748b' }} domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value, name) => [`${value}% (${Math.round((value / 100) * totalEnrolled)} Students)`, 'Lacking Skill']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="lackingPct" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right 5 Cols: Readiness Pie Distribution */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <PieIcon className="w-5 h-5 text-emerald-600" />
                  Placement Readiness Distribution
                </h3>
                <p className="text-xs text-slate-500">Cohort breakdown across {assignedCollegeName}</p>
              </div>
            </div>

            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || '#10b981'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Cohort Share']} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Most Common Student Skills */}
      {activeTab === 'common-skills' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Most Common Student Skills Possessed in {assignedCollegeName}
            </h3>
            <p className="text-xs text-slate-500">
              Ranked by total enrolled student proficiencies and verified endorsements across all engineering branches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(analytics?.mostCommonSkills || []).map((item, idx) => (
              <div key={item.skill} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{item.skill}</h4>
                  </div>
                  <p className="text-xs text-slate-500">{item.studentsCount} students proficient</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-emerald-600 font-display">{item.percentage}%</span>
                  <p className="text-[10px] text-slate-400 font-semibold">Cohort Share</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Branch-Wise Skill Analysis */}
      {activeTab === 'branch-wise' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              Branch-Wise Skill Gap & Placement Readiness Analysis
            </h3>
            <p className="text-xs text-slate-500">
              Comparative metrics across Engineering departments at {assignedCollegeName}.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4 rounded-l-xl">Engineering Branch</th>
                  <th className="py-3 px-4">Students</th>
                  <th className="py-3 px-4">Avg CGPA</th>
                  <th className="py-3 px-4">Placement Ready %</th>
                  <th className="py-3 px-4">Top Strength</th>
                  <th className="py-3 px-4 rounded-r-xl">Top Deficit Gap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(analytics?.branchWiseAnalysis || []).map(branch => (
                  <tr key={branch.branch} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">
                      {branch.branch} ({branch.short})
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600">
                      {branch.studentCount} enrolled
                    </td>
                    <td className="py-3.5 px-4 font-bold text-amber-800">
                      {branch.avgCGPA}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        branch.readinessPct >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {branch.readinessPct}% Ready
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-700 font-semibold">
                      ✓ {branch.topPossessedSkill}
                    </td>
                    <td className="py-3.5 px-4 text-rose-600 font-semibold">
                      ⚠ {branch.topDeficitSkill}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Year-Wise Skill Analysis */}
      {activeTab === 'year-wise' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              Year-Wise Academic Progression & Readiness Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Skill development and readiness progression from 1st year foundations to final year campus placement drives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(analytics?.yearWiseAnalysis || []).map((cohort) => (
              <div key={cohort.year} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-100 text-brand-800">
                  {cohort.status}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{cohort.year}</h4>
                <p className="text-xs text-slate-500">Focus: {cohort.targetStage}</p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">{cohort.studentCount} Students</span>
                  <span className="text-sm font-extrabold text-emerald-600 font-display">{cohort.readinessPct}% Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Aggregated Industry Demands & Curricula Alignment */}
      {activeTab === 'industry-intelligence' && (
        <div className="space-y-6">
          
          {/* Institutional Data Isolation & Overview Banner */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Verified Multi-Tenant Institutional Isolation
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Aggregated Industry Demands & Campus Alignment Matrix
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              This intelligence dashboard aggregates verified skill requirements, tools, and certifications posted by tech and core engineering companies statewide. Student gap percentages reflect only the <strong>{students.length} enrolled students at {assignedCollegeName}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. High Demand Skills & Student Cohort Gap */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  High-Demand Industry Skills
                </h4>
                <p className="text-[11px] text-slate-500">
                  Top requested by tech and core employers
                </p>
              </div>

              <div className="space-y-3">
                {(industryInsights?.highDemandSkillsFromIndustry || [
                  { skill: 'Python', roleCount: 18, studentsProficientPct: 85, lackingPct: 15 },
                  { skill: 'DSA', roleCount: 16, studentsProficientPct: 70, lackingPct: 30 },
                  { skill: 'SQL', roleCount: 14, studentsProficientPct: 65, lackingPct: 35 },
                  { skill: 'Docker', roleCount: 11, studentsProficientPct: 28, lackingPct: 72 },
                  { skill: 'React', roleCount: 10, studentsProficientPct: 45, lackingPct: 55 }
                ]).map(item => (
                  <div key={item.skill} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{item.skill}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {item.roleCount || 12} Roles Require
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{item.studentsProficientPct}% Students Proficient</span>
                      <span className="text-rose-600 font-bold">{item.lackingPct}% Lack Skill</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${item.studentsProficientPct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Emerging Technology Trends for Hackathons */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Emerging Technology Directives
                </h4>
                <p className="text-[11px] text-slate-500">
                  Ideal for guest lectures and student hackathons
                </p>
              </div>

              <div className="space-y-3">
                {(industryInsights?.emergingTechnologies || [
                  'AI Agents & LLM Fine-Tuning',
                  'Vector Databases (Milvus, Pinecone)',
                  'RISC-V Architecture & Verilog HDL',
                  'WebAssembly (WASM) for High-Performance Web',
                  'Cloud Native Kubernetes & GitOps'
                ]).map((tech, idx) => (
                  <div key={tech} className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{tech}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      High Growth
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setWorkshopModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Plan Training Bootcamp / Hackathon
                </button>
              </div>
            </div>

            {/* 3. Critical Curricula Intervention Recommendations */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Curricula Action Priorities
                </h4>
                <p className="text-[11px] text-slate-500">
                  Deficits to address in departmental academic boards
                </p>
              </div>

              <div className="space-y-3">
                {(industryInsights?.criticalCurriculaGaps || [
                  { skill: 'Docker & Containerization', gapPercentage: 72, targetDept: 'CSE & IT', action: 'Introduce containerized lab environments in 3rd Year.' },
                  { skill: 'SystemVerilog / UVM', gapPercentage: 61, targetDept: 'ECE & VLSI', action: 'Schedule FPGA / EDA verification guest lecture series.' },
                  { skill: 'Cloud Architecture (AWS)', gapPercentage: 68, targetDept: 'All Branches', action: 'Provide student cloud sandbox access.' }
                ]).map(gap => (
                  <div key={gap.skill} className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{gap.skill}</span>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                        {gap.gapPercentage}% Lacking
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Department: {gap.targetDept}</p>
                    <p className="text-xs text-slate-700 leading-snug">{gap.action}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Recent Industry Requirements Directives */}
          {industryInsights?.recentIndustryRequirements?.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Recent Directives Submitted by Verified Industry Partners
                </h4>
                <p className="text-xs text-slate-500">
                  Real-time talent inputs directly submitted by tech industry partners and engineering leads.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industryInsights.recentIndustryRequirements.map(req => (
                  <div key={req.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-900">{req.roleTitle}</h5>
                      <span className="text-[10px] font-semibold text-slate-500">{req.companyName}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {req.highDemandSkills?.map(s => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                    {req.notes && (
                      <p className="text-xs text-slate-600 italic">"{req.notes}"</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ==================== ENROLLED STUDENTS OF ASSIGNED COLLEGE ==================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-1 border border-amber-200">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              🔒 Strictly Scoped to {assignedCollegeName}
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Enrolled Students Talent Directory ({students.length})
            </h3>
            <p className="text-xs text-slate-500">
              Institutional privacy: You have authorized access to view skill dossiers for students enrolled at <strong>{assignedCollegeName}</strong>.
            </p>
          </div>

          <button
            onClick={() => setActivePage('student-roster')}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0"
          >
            View Full Student Roster <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.slice(0, 6).map(st => (
            <div key={st.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img 
                  src={st.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-white shadow-2xs shrink-0" 
                  alt="" 
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{st.name}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{st.department || 'Engineering'}</p>
                  <p className="text-[10px] text-amber-700 font-semibold">CGPA: {st.cgpa || 8.5} · {st.year || '3rd Year'}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedStudent(st);
                  setDossierModalOpen(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-[11px] hover:bg-slate-100 shrink-0"
              >
                Dossier
              </button>
            </div>
          ))}

          {students.length === 0 && (
            <div className="col-span-full p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
              No students currently registered under <strong>{assignedCollegeName}</strong>. As soon as students select this institution during registration, their profiles and skill gap metrics will populate here automatically.
            </div>
          )}
        </div>
      </div>

      {/* Student Dossier Modal */}
      <Modal isOpen={dossierModalOpen} onClose={() => setDossierModalOpen(false)} title={`Student Dossier: ${selectedStudent?.name}`}>
        {selectedStudent && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <img src={selectedStudent.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100" alt="" />
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedStudent.name}</h3>
                <p className="text-slate-500">{selectedStudent.department} · {selectedStudent.year}</p>
                <p className="text-brand-700 font-semibold">{selectedStudent.collegeName || assignedCollegeName} (CGPA: {selectedStudent.cgpa})</p>
                <p className="text-[11px] text-slate-400 pt-0.5">{selectedStudent.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">All Recorded Skills & Proficiency</h4>
              <div className="flex flex-wrap gap-2">
                {(selectedStudent.skills || []).map(skill => (
                  <SkillBadge
                    key={skill.name}
                    skill={skill.name}
                    level={skill.level}
                    verified={skill.verified}
                    rating={skill.rating}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Key Academic & Personal Projects</h4>
              {(selectedStudent.projects || []).map(p => (
                <div key={p.title || p.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">{p.title}</p>
                  <p className="text-slate-600">{p.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setDossierModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-semibold text-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Schedule Workshop Modal */}
      <Modal isOpen={workshopModalOpen} onClose={() => setWorkshopModalOpen(false)} title={`Schedule Targeted Workshop for ${assignedCollegeName}`}>
        <form onSubmit={handleCreateWorkshop} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Workshop Title</label>
            <input
              type="text"
              value={workshopData.title}
              onChange={(e) => setWorkshopData({ ...workshopData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Target Skill Gap</label>
              <input
                type="text"
                value={workshopData.targetSkill}
                onChange={(e) => setWorkshopData({ ...workshopData, targetSkill: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Target Department</label>
              <select
                value={workshopData.department}
                onChange={(e) => setWorkshopData({ ...workshopData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900 font-medium"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                <option value="All Departments">All Departments</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Industry Guest Instructor</label>
              <input
                type="text"
                value={workshopData.instructor}
                onChange={(e) => setWorkshopData({ ...workshopData, instructor: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Duration & Dates</label>
              <input
                type="text"
                value={workshopData.duration}
                onChange={(e) => setWorkshopData({ ...workshopData, duration: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Data-Driven Justification</label>
            <textarea
              rows={2}
              value={workshopData.reasonForOrganizing}
              onChange={(e) => setWorkshopData({ ...workshopData, reasonForOrganizing: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setWorkshopModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20"
            >
              Launch Workshop
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
