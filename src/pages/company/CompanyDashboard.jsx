import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  Briefcase, 
  Users, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  Clock,
  Sparkles,
  FileCheck,
  Search,
  Filter,
  Star,
  Check,
  X,
  Edit3,
  Sliders,
  Send,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Cpu,
  Code2,
  Wrench,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CompanyDashboard = ({ setActivePage }) => {
  const { user, authFetch, showToast } = useAuth();

  // Active section tab
  const [activeTab, setActiveTab] = useState('talent-match'); // 'talent-match' | 'requirements' | 'trends' | 'openings'

  // Categories & Roles state
  const [selectedCategory, setSelectedCategory] = useState('software'); // 'software' | 'hardware' | 'core'
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [activeSkills, setActiveSkills] = useState([]);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [loadingRoles, setLoadingRoles] = useState(false);

  // Add/Edit Role modal
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleForm, setRoleForm] = useState({ title: '', category: 'software', skillsStr: '' });

  // Candidates & Matching state
  const [candidates, setCandidates] = useState([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  // Multi-criteria filters
  const [filterSkill, setFilterSkill] = useState('');
  const [filterBranch, setFilterBranch] = useState('All');
  const [filterCollege, setFilterCollege] = useState('All');
  const [filterMinMatch, setFilterMinMatch] = useState(0);
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [filterReadiness, setFilterReadiness] = useState('All');

  // Industry Requirements form (8 Fields)
  const [reqForm, setReqForm] = useState({
    roleTitle: 'Full Stack Software Engineer',
    category: 'software',
    currentSkills: 'TypeScript, Next.js, Node.js, PostgreSQL, Docker',
    emergingSkills: 'AI Agents, Vector Databases (pgvector), WASM, LangChain',
    jobRoleRequirements: 'Minimum 70% skill compatibility, hands-on GitHub project repository, proficiency in relational schema design and RESTful APIs.',
    technologyTrends: 'Transition towards microservices, AI-augmented development, and edge serverless deployment.',
    preferredCertifications: 'AWS Certified Developer, CKA (Kubernetes), GitHub Actions Specialist',
    preferredTools: 'Docker, GitHub Actions, AWS ECS, Tailwind CSS, Prisma, Redis',
    lessRelevantSkills: 'Legacy PHP 5.x, AngularJS 1.x, jQuery, SVN',
    futureSkillRequirements: 'Autonomous Agents, Rust for Backend, WebAssembly Microservices, Distributed Vector Search',
    notes: 'Prioritize students with hands-on full stack project builds, solid git hygiene, and clear technical communication.'
  });
  const [submittedRequirements, setSubmittedRequirements] = useState([]);
  const [submittingReq, setSubmittingReq] = useState(false);

  // Industry Skill Trends
  const [trends, setTrends] = useState(null);
  const [loadingTrends, setLoadingTrends] = useState(false);

  // Recruitment Feedback Modal
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackTargetStudent, setFeedbackTargetStudent] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({
    studentId: '',
    studentName: '',
    role: '',
    status: 'Selected', // 'Selected' | 'Not Selected'
    technicalRating: 5,
    overallRating: 5,
    strongSkills: '',
    weakSkills: '',
    areasForImprovement: '',
    feedbackComments: ''
  });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  // Legacy openings
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);

  // Fetch Roles when category changes
  const fetchRoles = async (category = selectedCategory) => {
    try {
      setLoadingRoles(true);
      const res = await fetch(`/api/industry/roles?category=${category}`);
      if (res.ok) {
        const data = await res.json();
        setRoles(data);
        if (data.length > 0) {
          const first = data[0];
          setSelectedRoleId(first.id);
          setActiveSkills(first.requiredSkills || []);
        }
      }
    } catch (err) {
      console.error('Failed to load industry roles:', err);
    } finally {
      setLoadingRoles(false);
    }
  };

  useEffect(() => {
    fetchRoles(selectedCategory);
  }, [selectedCategory]);

  // When selected role changes, update activeSkills
  const handleRoleSelect = (roleId) => {
    setSelectedRoleId(roleId);
    const found = roles.find(r => r.id === roleId);
    if (found) {
      setActiveSkills(found.requiredSkills || []);
    }
  };

  // Live match candidates whenever role or activeSkills change
  const fetchCandidates = async () => {
    try {
      setLoadingCandidates(true);
      const res = await fetch('/api/industry/candidates/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleId: selectedRoleId,
          requiredSkills: activeSkills,
          minMatch: filterMinMatch,
          minScore: filterMinScore,
          branch: filterBranch,
          college: filterCollege,
          readiness: filterReadiness,
          skillQuery: filterSkill
        })
      });
      if (res.ok) {
        const data = await res.json();
        setCandidates(Array.isArray(data) ? data : (data.candidates || []));
      }
    } catch (err) {
      console.error('Failed to match candidates:', err);
    } finally {
      setLoadingCandidates(false);
    }
  };

  useEffect(() => {
    if (activeSkills.length > 0) {
      fetchCandidates();
    }
  }, [selectedRoleId, activeSkills, filterMinMatch, filterMinScore, filterBranch, filterCollege, filterReadiness, filterSkill]);

  // Load trends, requirements, openings
  const loadAuxiliaryData = async () => {
    try {
      setLoadingTrends(true);
      const [trendsRes, reqRes, oppRes, appRes] = await Promise.all([
        fetch('/api/industry/trends'),
        fetch('/api/industry/requirements'),
        fetch('/api/opportunities'),
        fetch('/api/applications')
      ]);
      if (trendsRes.ok) setTrends(await trendsRes.json());
      if (reqRes.ok) setSubmittedRequirements(await reqRes.json());
      if (oppRes.ok) setOpportunities(await oppRes.json());
      if (appRes.ok) setApplications(await appRes.json());
    } catch (err) {
      console.error('Auxiliary fetch error:', err);
    } finally {
      setLoadingTrends(false);
    }
  };

  useEffect(() => {
    loadAuxiliaryData();
  }, []);

  // Skill tag management
  const handleAddSkill = (e) => {
    if (e) e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (!trimmed) return;
    if (!activeSkills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setActiveSkills([...activeSkills, trimmed]);
      showToast(`Added requirement: ${trimmed}`, 'success');
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setActiveSkills(activeSkills.filter(s => s !== skillToRemove));
    showToast(`Removed requirement: ${skillToRemove}`, 'info');
  };

  // Add or update custom role
  const handleSaveRole = async (e) => {
    e.preventDefault();
    if (!roleForm.title.trim()) return;

    const parsedSkills = roleForm.skillsStr.split(',').map(s => s.trim()).filter(Boolean);
    const payload = {
      id: editingRole ? editingRole.id : undefined,
      category: roleForm.category,
      title: roleForm.title.trim(),
      requiredSkills: parsedSkills
    };

    try {
      const res = await fetch('/api/industry/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast(editingRole ? 'Role updated successfully!' : 'New industry role added!', 'success');
        setRoleModalOpen(false);
        setEditingRole(null);
        setRoleForm({ title: '', category: selectedCategory, skillsStr: '' });
        fetchRoles(selectedCategory);
      }
    } catch (err) {
      showToast('Failed to save role', 'error');
    }
  };

  // Submit Industry Requirements (All 8 Fields)
  const handleSubmitRequirement = async (e) => {
    e.preventDefault();
    try {
      setSubmittingReq(true);
      const res = await fetch('/api/industry/requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: reqForm.category,
          roleTitle: reqForm.roleTitle,
          currentSkills: reqForm.currentSkills.split(',').map(s => s.trim()).filter(Boolean),
          emergingSkills: reqForm.emergingSkills.split(',').map(s => s.trim()).filter(Boolean),
          jobRoleRequirements: reqForm.jobRoleRequirements,
          technologyTrends: reqForm.technologyTrends,
          preferredCertifications: reqForm.preferredCertifications.split(',').map(s => s.trim()).filter(Boolean),
          preferredTools: reqForm.preferredTools.split(',').map(s => s.trim()).filter(Boolean),
          lessRelevantSkills: reqForm.lessRelevantSkills.split(',').map(s => s.trim()).filter(Boolean),
          futureSkillRequirements: reqForm.futureSkillRequirements.split(',').map(s => s.trim()).filter(Boolean),
          notes: reqForm.notes,
          companyName: user?.companyName || user?.name || 'TechNova Solutions'
        })
      });

      if (res.ok) {
        const responseData = await res.json();
        const created = responseData.requirement || responseData;
        setSubmittedRequirements([created, ...submittedRequirements]);
        showToast('Industry requirements successfully published to campus partner institutions!', 'success');
        confetti({ particleCount: 50, spread: 60 });
        // Refresh trends dynamically from updated store
        loadAuxiliaryData();
      }
    } catch (err) {
      showToast('Failed to submit requirements', 'error');
    } finally {
      setSubmittingReq(false);
    }
  };

  // Open feedback modal for candidate
  const handleOpenFeedback = (candidate) => {
    const currentRole = roles.find(r => r.id === selectedRoleId)?.title || 'Software Developer';
    setFeedbackTargetStudent(candidate);
    setFeedbackForm({
      studentId: candidate.id,
      studentName: candidate.name,
      role: currentRole,
      status: 'Selected',
      technicalRating: 5,
      overallRating: 5,
      strongSkills: candidate.matchedSkills?.join(', ') || '',
      weakSkills: candidate.missingSkills?.slice(0, 3).join(', ') || '',
      areasForImprovement: candidate.missingSkills?.length ? `Focus on mastering ${candidate.missingSkills.slice(0, 2).join(' and ')} through practical hands-on labs.` : 'Continue practicing system design and end-to-end integration.',
      feedbackComments: `Exhibited solid competence during the ${currentRole} technical interview. Strong foundation in core fundamentals.`
    });
    setFeedbackModalOpen(true);
  };

  // Submit recruitment feedback
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      setSubmittingFeedback(true);
      const res = await fetch('/api/industry/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: feedbackForm.studentId,
          studentName: feedbackForm.studentName,
          companyName: user?.companyName || user?.title || 'TechNova Solutions',
          role: feedbackForm.role,
          recruitedRole: feedbackForm.role,
          status: feedbackForm.status,
          selected: feedbackForm.status === 'Selected',
          technicalRating: Number(feedbackForm.technicalRating),
          technicalPerformance: Number(feedbackForm.technicalRating),
          overallRating: Number(feedbackForm.overallRating),
          overallPerformance: Number(feedbackForm.overallRating),
          strongSkills: feedbackForm.strongSkills.split(',').map(s => s.trim()).filter(Boolean),
          weakSkills: feedbackForm.weakSkills.split(',').map(s => s.trim()).filter(Boolean),
          areasForImprovement: feedbackForm.areasForImprovement,
          comments: feedbackForm.feedbackComments,
          feedbackComments: feedbackForm.feedbackComments
        })
      });

      if (res.ok) {
        showToast(`Recruitment feedback recorded for ${feedbackForm.studentName}!`, 'success');
        confetti({ particleCount: 60, spread: 70 });
        setFeedbackModalOpen(false);
        // Refresh matching candidate list
        fetchCandidates();
      }
    } catch (err) {
      showToast('Failed to submit recruitment feedback', 'error');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  // Extract unique colleges from candidate pool for filter dropdown
  const uniqueColleges = useMemo(() => {
    const set = new Set(candidates.map(c => c.college).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [candidates]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* 1. INDUSTRY COMMAND CENTER BANNER                                         */}
      {/* ========================================================================= */}
      <div className="bg-[#3D4D55] border border-[#B58863]/30 rounded-3xl p-6 sm:p-8 text-[#D3C3B9] shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A38] text-[#B58863] text-xs font-bold border border-[#B58863]/40">
            <Building2 className="w-4 h-4 text-[#B58863]" />
            {user?.companyName || user?.name || 'TechNova Solutions'} · Industry Recruitment Command Center
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#D3C3B9] tracking-tight">
            Industry Talent Discovery & Skills Intelligence
          </h1>
          <p className="text-[#A79E9C] text-sm max-w-2xl leading-relaxed">
            Select employee categories, configure target roles and required skills, evaluate verified engineering candidates with live compatibility scoring, and shape academic curricula.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setActivePage('post-opportunity')}
            className="px-5 py-3 rounded-xl bg-[#B58863] text-[#161616] hover:bg-[#B58863]/90 font-bold text-xs shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#161616]" />
            Post Internship / Job
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className="px-4 py-3 rounded-xl bg-[#102A38] hover:bg-[#102A38]/80 text-[#D3C3B9] font-bold text-xs border border-[#A79E9C]/30 transition-all flex items-center gap-1.5"
          >
            <Edit3 className="w-4 h-4 text-[#B58863]" />
            Post Industry Demand Updates
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. OVERVIEW METRICS (Strict 6-Color Palette)                              */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-[#3D4D55] rounded-2xl p-5 border border-[#A79E9C]/30 shadow-md">
          <span className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">Eligible Matches</span>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-extrabold text-[#D3C3B9] font-display">{candidates.length}</span>
            <span className="text-xs text-[#B58863] font-bold">Verified Candidates</span>
          </div>
          <p className="text-xs text-[#A79E9C]">For active role: {roles.find(r => r.id === selectedRoleId)?.title || 'Engineering'}</p>
        </div>

        <div className="bg-[#3D4D55] rounded-2xl p-5 border border-[#A79E9C]/30 shadow-md">
          <span className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">High Readiness Cohort</span>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-extrabold text-[#B58863] font-display">
              {candidates.filter(c => c.readiness === 'High Readiness').length}
            </span>
            <span className="text-xs text-[#D3C3B9] font-semibold">Immediate Placement</span>
          </div>
          <p className="text-xs text-[#A79E9C]">≥ 80% Skill Match + Assessment</p>
        </div>

        <div className="bg-[#3D4D55] rounded-2xl p-5 border border-[#A79E9C]/30 shadow-md">
          <span className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">Active Openings</span>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-extrabold text-[#D3C3B9] font-display">{opportunities.length}</span>
            <span className="text-xs text-[#B58863] font-semibold">Campus Pipelines</span>
          </div>
          <p className="text-xs text-[#A79E9C]">{applications.length} Student Applicants Pending</p>
        </div>

        <div className="bg-[#3D4D55] rounded-2xl p-5 border border-[#A79E9C]/30 shadow-md">
          <span className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">Published Directives</span>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-extrabold text-[#B58863] font-display">{submittedRequirements.length}</span>
            <span className="text-xs text-[#D3C3B9] font-semibold">Institution Updates</span>
          </div>
          <p className="text-xs text-[#A79E9C]">Shared with AP Partner Colleges</p>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. NAVIGATION TABS                                                        */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#3D4D55] pb-3">
        {[
          { id: 'talent-match', label: '🎯 Talent Discovery & Candidate Matching', count: candidates.length },
          { id: 'requirements', label: '📢 Industry Requirements & Updates', count: submittedRequirements.length },
          { id: 'trends', label: '📊 Industry Skill Trends & Intelligence' },
          { id: 'openings', label: '💼 Active Openings & Applicants', count: opportunities.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#B58863] text-[#161616] shadow-md'
                : 'bg-[#3D4D55] text-[#D3C3B9] hover:bg-[#3D4D55]/80 border border-[#A79E9C]/20'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === tab.id ? 'bg-[#161616] text-[#B58863]' : 'bg-[#102A38] text-[#D3C3B9]'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TALENT DISCOVERY & CANDIDATE MATCHING                              */}
      {/* ========================================================================= */}
      {activeTab === 'talent-match' && (
        <div className="space-y-8">
          
          {/* A. EMPLOYEE CATEGORY SELECTION */}
          <div className="bg-[#3D4D55] rounded-3xl p-6 border border-[#A79E9C]/30 shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#102A38]/50">
              <div>
                <h3 className="text-base font-bold text-[#D3C3B9] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#B58863]" />
                  Step 1: Choose Employee Category
                </h3>
                <p className="text-xs text-[#A79E9C]">
                  Select the engineering sector to explore standardized roles and customize required competencies.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#B58863] bg-[#102A38] px-3 py-1 rounded-lg border border-[#B58863]/30">
                Category: {selectedCategory.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'software', label: 'Software / IT', icon: Code2, desc: 'Full Stack, Backend, Frontend, AI/ML, Cloud & DevOps' },
                { id: 'hardware', label: 'Hardware / Electronics', icon: Cpu, desc: 'VLSI, Embedded Systems, Semiconductor & Robotics' },
                { id: 'core', label: 'Core Engineering', icon: Wrench, desc: 'Mechanical, Electrical, Civil & Automobile' }
              ].map(cat => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#102A38] border-[#B58863] ring-2 ring-[#B58863]/40 shadow-lg'
                        : 'bg-[#102A38]/60 border-[#A79E9C]/20 hover:bg-[#102A38]/90 text-[#D3C3B9]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-[#B58863] text-[#161616]' : 'bg-[#3D4D55] text-[#D3C3B9]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#B58863] text-[#161616]">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#D3C3B9]">{cat.label}</h4>
                      <p className="text-[11px] text-[#A79E9C] leading-snug mt-1">{cat.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. TARGET ROLE SELECTION & SKILLS MANAGER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 5 Cols: Expandable & Editable Roles List */}
            <div className="lg:col-span-5 bg-[#3D4D55] rounded-3xl p-6 border border-[#A79E9C]/30 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#102A38]/50">
                <div>
                  <h3 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#B58863]" />
                    Step 2: Target Industry Roles ({roles.length})
                  </h3>
                  <p className="text-[11px] text-[#A79E9C]">Click to inspect or refine required skills</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingRole(null);
                    setRoleForm({ title: '', category: selectedCategory, skillsStr: '' });
                    setRoleModalOpen(true);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-[#B58863] text-[#161616] hover:bg-[#B58863]/90 text-[11px] font-bold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3 text-[#161616]" /> Add Role
                </button>
              </div>

              {loadingRoles ? (
                <div className="p-8 text-center text-xs text-[#A79E9C]">Loading industry roles...</div>
              ) : (
                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {roles.map(r => {
                    const isSelected = r.id === selectedRoleId;
                    return (
                      <div
                        key={r.id}
                        onClick={() => handleRoleSelect(r.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                          isSelected
                            ? 'bg-[#102A38] border-[#B58863] text-[#D3C3B9] shadow-sm'
                            : 'bg-[#102A38]/50 border-[#A79E9C]/20 hover:bg-[#102A38]/80 text-[#D3C3B9]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#D3C3B9] group-hover:text-[#B58863] transition-colors">
                              {r.title}
                            </span>
                            {isSelected && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-[#B58863] text-[#161616]">
                                SELECTED
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-[#A79E9C]">
                            {r.requiredSkills?.length || 0} Required Skills · {r.category.toUpperCase()}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingRole(r);
                              setRoleForm({
                                title: r.title,
                                category: r.category,
                                skillsStr: r.requiredSkills?.join(', ') || ''
                              });
                              setRoleModalOpen(true);
                            }}
                            className="p-1 rounded-md bg-[#3D4D55] text-[#A79E9C] hover:text-[#D3C3B9] transition-colors"
                            title="Edit Role & Standard Skills"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right 7 Cols: Required Skills Tag Manager */}
            <div className="lg:col-span-7 bg-[#3D4D55] rounded-3xl p-6 border border-[#A79E9C]/30 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#102A38]/50">
                <div>
                  <h3 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#B58863]" />
                    Step 3: Required Skills for {roles.find(r => r.id === selectedRoleId)?.title || 'Role'}
                  </h3>
                  <p className="text-[11px] text-[#A79E9C]">
                    Customize required skills live. Candidates will be dynamically ranked based on these competencies.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#B58863] bg-[#102A38] px-2.5 py-1 rounded-lg border border-[#B58863]/30">
                  {activeSkills.length} Skills
                </span>
              </div>

              {/* Skills Badges */}
              <div className="flex flex-wrap gap-2 min-h-[90px] p-3 rounded-2xl bg-[#102A38] border border-[#A79E9C]/30">
                {activeSkills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#3D4D55] text-[#D3C3B9] border border-[#B58863]/40 text-xs font-bold shadow-xs group"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-[#A79E9C] hover:text-[#B58863] p-0.5 rounded transition-colors"
                      title="Remove skill"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {activeSkills.length === 0 && (
                  <p className="text-xs text-[#A79E9C] self-center">No required skills specified yet. Add one below.</p>
                )}
              </div>

              {/* Add Skill Input */}
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add skill (e.g. Docker, SystemVerilog, Kubernetes, Spring Boot)..."
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#A79E9C]/40 bg-[#161616] text-[#D3C3B9] text-xs font-medium focus:ring-2 focus:ring-[#B58863] outline-none placeholder:text-[#A79E9C]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#B58863] text-[#161616] hover:bg-[#B58863]/90 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 text-[#161616]" /> Add Skill
                </button>
              </form>
            </div>

          </div>

          {/* C. MULTI-CRITERIA FILTERING TOOLBAR */}
          <div className="bg-[#3D4D55] rounded-3xl p-6 border border-[#A79E9C]/30 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#102A38]/50">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#B58863]" />
                <h3 className="text-sm font-bold text-[#D3C3B9]">
                  Step 4: Multi-Criteria Candidate Filters
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFilterSkill('');
                  setFilterBranch('All');
                  setFilterCollege('All');
                  setFilterMinMatch(0);
                  setFilterMinScore(0);
                  setFilterReadiness('All');
                }}
                className="text-xs font-bold text-[#B58863] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {/* 1. Skill keyword */}
              <div>
                <label className="block text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  Specific Skill
                </label>
                <input
                  type="text"
                  placeholder="e.g. Java, Python, React"
                  value={filterSkill}
                  onChange={(e) => setFilterSkill(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863] placeholder:text-[#A79E9C]"
                />
              </div>

              {/* 2. Branch */}
              <div>
                <label className="block text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  Branch / Dept
                </label>
                <select
                  value={filterBranch}
                  onChange={(e) => setFilterBranch(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                >
                  <option value="All">All Branches</option>
                  <option value="Computer Science">Computer Science (CSE)</option>
                  <option value="Electronics & Communication">Electronics (ECE)</option>
                  <option value="Electrical & Electronics">Electrical (EEE)</option>
                  <option value="Mechanical">Mechanical (ME)</option>
                  <option value="Civil">Civil (CE)</option>
                </select>
              </div>

              {/* 3. College */}
              <div>
                <label className="block text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  College / Institution
                </label>
                <select
                  value={filterCollege}
                  onChange={(e) => setFilterCollege(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                >
                  {uniqueColleges.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* 4. Min Match % */}
              <div>
                <label className="block text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  Min Match: {filterMinMatch}%
                </label>
                <select
                  value={filterMinMatch}
                  onChange={(e) => setFilterMinMatch(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                >
                  <option value={0}>Any Match %</option>
                  <option value={50}>≥ 50% Match</option>
                  <option value={70}>≥ 70% Match</option>
                  <option value={85}>≥ 85% High Match</option>
                </select>
              </div>

              {/* 5. Min Assessment Score */}
              <div>
                <label className="block text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  Min Assessment Score
                </label>
                <select
                  value={filterMinScore}
                  onChange={(e) => setFilterMinScore(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                >
                  <option value={0}>Any Score</option>
                  <option value={60}>≥ 60% Score</option>
                  <option value={75}>≥ 75% Score</option>
                  <option value={85}>≥ 85% Top Tier</option>
                </select>
              </div>

              {/* 6. Readiness Level */}
              <div>
                <label className="block text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  Readiness Level
                </label>
                <select
                  value={filterReadiness}
                  onChange={(e) => setFilterReadiness(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                >
                  <option value="All">All Readiness Levels</option>
                  <option value="High Readiness">High Readiness</option>
                  <option value="Moderate Match">Moderate Match</option>
                  <option value="Developing">Developing</option>
                </select>
              </div>
            </div>
          </div>

          {/* D. ELIGIBLE CANDIDATE MATCHES LIST */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#D3C3B9] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#B58863]" />
                  Eligible Student Candidates ({candidates.length})
                </h3>
                <p className="text-xs text-[#A79E9C]">
                  Ranked by verified skills possessed, SkillBridge assessment score, and readiness level.
                </p>
              </div>
            </div>

            {loadingCandidates ? (
              <div className="p-12 text-center text-xs text-[#A79E9C] bg-[#3D4D55] rounded-3xl border border-[#A79E9C]/30">
                Evaluating candidate skill compatibility...
              </div>
            ) : candidates.length === 0 ? (
              <div className="p-12 text-center space-y-3 bg-[#3D4D55] rounded-3xl border border-[#A79E9C]/30">
                <AlertCircle className="w-8 h-8 text-[#B58863] mx-auto" />
                <h4 className="text-sm font-bold text-[#D3C3B9]">No matching candidates found</h4>
                <p className="text-xs text-[#A79E9C]">
                  Try adjusting the filter sliders or adding flexible required skills.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {candidates.map(c => {
                  const readinessBg = 
                    c.readiness === 'High Readiness'
                      ? 'bg-[#B58863] text-[#161616]'
                      : c.readiness === 'Moderate Match'
                        ? 'bg-[#102A38] text-[#B58863] border border-[#B58863]/40'
                        : 'bg-[#102A38] text-[#A79E9C] border border-[#A79E9C]/30';

                  return (
                    <div
                      key={c.id}
                      className="bg-[#3D4D55] rounded-3xl p-6 border border-[#A79E9C]/30 hover:border-[#B58863]/60 shadow-md transition-all flex flex-col justify-between gap-4 group"
                    >
                      {/* Top Row: Avatar, Name, College, Readiness */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={c.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}
                              alt={c.name}
                              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#B58863]/40 shadow-xs"
                            />
                            <div>
                              <h4 className="text-sm font-bold text-[#D3C3B9] group-hover:text-[#B58863] transition-colors">
                                {c.name}
                              </h4>
                              <p className="text-[11px] text-[#A79E9C] flex items-center gap-1">
                                <GraduationCap className="w-3 h-3 text-[#B58863]" />
                                {c.department} · {c.college}
                              </p>
                            </div>
                          </div>

                          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${readinessBg}`}>
                            {c.readiness}
                          </span>
                        </div>

                        {/* Scores row: Match % and Assessment score */}
                        <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#102A38] border border-[#A79E9C]/20">
                          <div>
                            <span className="text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider block">
                              Skill Compatibility
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-xl font-extrabold text-[#B58863] font-display">
                                {c.matchPercentage}%
                              </span>
                              <span className="text-[10px] text-[#A79E9C]">({c.matchedSkills?.length}/{c.matchedSkills?.length + c.missingSkills?.length} Skills)</span>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider block">
                              Assessment Score
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-xl font-extrabold text-[#D3C3B9] font-display">
                                {c.assessmentScore}%
                              </span>
                              <span className="text-[10px] text-[#A79E9C]">Verified MCQ Exam</span>
                            </div>
                          </div>
                        </div>

                        {/* Possessed matching skills */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-[#D3C3B9] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B58863]" />
                            Possessed Matching Skills ({c.matchedSkills?.length || 0}):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {c.matchedSkills?.map(s => (
                              <span
                                key={s}
                                className="text-[10px] px-2 py-0.5 rounded-lg bg-[#102A38] text-[#B58863] border border-[#B58863]/40 font-semibold"
                              >
                                {s}
                              </span>
                            ))}
                            {(!c.matchedSkills || c.matchedSkills.length === 0) && (
                              <span className="text-[10px] text-[#A79E9C]">None yet</span>
                            )}
                          </div>
                        </div>

                        {/* Missing skills */}
                        {c.missingSkills?.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[11px] font-bold text-[#A79E9C]">
                              Missing Industry Skills ({c.missingSkills.length}):
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {c.missingSkills.map(s => (
                                <span
                                  key={s}
                                  className="text-[10px] px-2 py-0.5 rounded-lg bg-[#102A38]/50 text-[#A79E9C] border border-[#A79E9C]/20"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Certifications & Projects */}
                        <div className="pt-2 border-t border-[#102A38]/50 flex items-center justify-between text-[11px] text-[#A79E9C]">
                          <span>🏆 {c.certifications?.length || 0} Certifications</span>
                          <span>📁 {c.projects?.length || 0} Practical Projects</span>
                          <span>⭐ CGPA: {c.cgpa || '8.5'}</span>
                        </div>
                      </div>

                      {/* Bottom Actions */}
                      <div className="pt-3 border-t border-[#102A38]/60 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-[#A79E9C]">
                          {c.recruitmentHistory?.length ? `${c.recruitmentHistory.length} Past Interview Logs` : 'New Applicant'}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenFeedback(c)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#B58863] text-[#161616] hover:bg-[#B58863]/90 font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
                          >
                            <Star className="w-3.5 h-3.5 text-[#161616]" /> Evaluate & Submit Feedback
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INDUSTRY REQUIREMENTS & CURRICULA DIRECTIVES                       */}
      {/* ========================================================================= */}
      {activeTab === 'requirements' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form to submit requirement */}
          <div className="lg:col-span-7 bg-[#3D4D55] rounded-3xl p-6 sm:p-8 border border-[#A79E9C]/30 shadow-lg space-y-6">
            <div className="pb-4 border-b border-[#102A38]/50">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#102A38] text-[#B58863] text-xs font-bold mb-1 border border-[#B58863]/30">
                <Building2 className="w-3.5 h-3.5" />
                Shape Campus Curricula
              </div>
              <h3 className="text-lg font-bold text-[#D3C3B9] font-display">
                Publish Industry Skill Directives & Requirements
              </h3>
              <p className="text-xs text-[#A79E9C] leading-relaxed">
                Provide real-time talent needs, job-role requirements, tech trends, preferred certifications, and tools to help colleges update their curriculum and prepare industry-ready graduates.
              </p>
            </div>

            <form onSubmit={handleSubmitRequirement} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                    Employee Category
                  </label>
                  <select
                    value={reqForm.category}
                    onChange={(e) => setReqForm({ ...reqForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-bold text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  >
                    <option value="software">Software / IT</option>
                    <option value="hardware">Hardware / Electronics</option>
                    <option value="core">Core Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                    Target Job Role Title
                  </label>
                  <input
                    type="text"
                    value={reqForm.roleTitle}
                    onChange={(e) => setReqForm({ ...reqForm, roleTitle: e.target.value })}
                    placeholder="e.g. Full Stack Engineer, VLSI Physical Design"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                    required
                  />
                </div>
              </div>

              {/* 1. Current Required Skills */}
              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  1. Current Required Skills (Comma-separated)
                </label>
                <input
                  type="text"
                  value={reqForm.currentSkills}
                  onChange={(e) => setReqForm({ ...reqForm, currentSkills: e.target.value })}
                  placeholder="e.g. TypeScript, React 18, Node.js, PostgreSQL, Docker"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  required
                />
              </div>

              {/* 2. Emerging Skills */}
              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  2. Emerging Skills (Comma-separated)
                </label>
                <input
                  type="text"
                  value={reqForm.emergingSkills}
                  onChange={(e) => setReqForm({ ...reqForm, emergingSkills: e.target.value })}
                  placeholder="e.g. AI Agents, Vector Databases (pgvector), WASM, LangChain"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  required
                />
              </div>

              {/* 3. Job-Role Requirements */}
              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  3. Job-Role Requirements & Competency Benchmarks
                </label>
                <textarea
                  rows={2}
                  value={reqForm.jobRoleRequirements}
                  onChange={(e) => setReqForm({ ...reqForm, jobRoleRequirements: e.target.value })}
                  placeholder="e.g. Minimum 70% skill compatibility, hands-on GitHub repository, strong schema design..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  required
                />
              </div>

              {/* 4. Technology Trends */}
              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  4. Technology Trends & Industry Direction
                </label>
                <input
                  type="text"
                  value={reqForm.technologyTrends}
                  onChange={(e) => setReqForm({ ...reqForm, technologyTrends: e.target.value })}
                  placeholder="e.g. Transition towards microservices, AI-augmented development, edge serverless"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  required
                />
              </div>

              {/* 5 & 6. Preferred Certifications & Preferred Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                    5. Preferred Certifications
                  </label>
                  <input
                    type="text"
                    value={reqForm.preferredCertifications}
                    onChange={(e) => setReqForm({ ...reqForm, preferredCertifications: e.target.value })}
                    placeholder="e.g. AWS Solutions Architect, CKA, CompTIA Security+"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                    6. Preferred Tools & Technologies
                  </label>
                  <input
                    type="text"
                    value={reqForm.preferredTools}
                    onChange={(e) => setReqForm({ ...reqForm, preferredTools: e.target.value })}
                    placeholder="e.g. Docker, GitHub Actions, AWS, Tailwind, Redis"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  />
                </div>
              </div>

              {/* 7 & 8. Less-Relevant Skills & Future Skill Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                    7. Less-Relevant / Declining Skills
                  </label>
                  <input
                    type="text"
                    value={reqForm.lessRelevantSkills}
                    onChange={(e) => setReqForm({ ...reqForm, lessRelevantSkills: e.target.value })}
                    placeholder="e.g. Legacy PHP 5.x, AngularJS 1.x, SVN"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                    8. Future Skill Requirements
                  </label>
                  <input
                    type="text"
                    value={reqForm.futureSkillRequirements}
                    onChange={(e) => setReqForm({ ...reqForm, futureSkillRequirements: e.target.value })}
                    placeholder="e.g. Autonomous Agents, Rust Backend, WASM Microservices"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  Suggestions & Curricular Guidance for Future Students & Colleges
                </label>
                <textarea
                  rows={2}
                  value={reqForm.notes}
                  onChange={(e) => setReqForm({ ...reqForm, notes: e.target.value })}
                  placeholder="Share direct advice for academic deans and student project guidance..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                />
              </div>

              <button
                type="submit"
                disabled={submittingReq}
                className="w-full py-3 rounded-xl bg-[#B58863] text-[#161616] hover:bg-[#B58863]/90 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#161616]" />
                {submittingReq ? 'Publishing Directives...' : 'Publish Industry Requirements to Campus Network'}
              </button>
            </form>
          </div>

          {/* Published requirements list */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#B58863]" />
              Active Published Directives ({submittedRequirements.length})
            </h3>

            <div className="space-y-4 max-h-[720px] overflow-y-auto pr-1">
              {submittedRequirements.map(req => {
                const curSkills = req.currentSkills || req.highDemandSkills || [];
                const emSkills = req.emergingSkills || [];
                const certs = req.preferredCertifications || req.certifications || [];
                const tools = req.preferredTools || req.toolsAndTech || [];
                const lessSkills = req.lessRelevantSkills || req.decliningSkills || [];
                const futureSkills = req.futureSkillRequirements || req.futureRequirements || [];
                const jobReqs = req.jobRoleRequirements || req.recruitmentRequirements;
                const techTrends = req.technologyTrends;

                return (
                  <div
                    key={req.id}
                    className="p-5 rounded-2xl bg-[#3D4D55] border border-[#A79E9C]/30 space-y-3 shadow-md text-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#102A38]/50">
                      <div>
                        <h4 className="text-xs font-bold text-[#D3C3B9]">{req.roleTitle}</h4>
                        <p className="text-[10px] text-[#A79E9C]">{req.companyName} · {req.category?.toUpperCase()}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#102A38] text-[#B58863] border border-[#B58863]/30">
                        Live Directive
                      </span>
                    </div>

                    {/* 1. Current Required Skills */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#B58863] uppercase tracking-wider block">
                        1. Current Required Skills:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {curSkills.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-[#102A38] text-[#D3C3B9] border border-[#A79E9C]/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 2. Emerging Skills */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#D3C3B9] uppercase tracking-wider block">
                        2. Emerging Skills:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {emSkills.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-[#102A38] text-[#B58863] border border-[#B58863]/30">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 3. Job-Role Requirements */}
                    {jobReqs && (
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider block">
                          3. Job-Role Requirements:
                        </span>
                        <p className="text-[11px] text-[#D3C3B9] bg-[#102A38]/60 p-2 rounded-lg border border-[#A79E9C]/10">
                          {jobReqs}
                        </p>
                      </div>
                    )}

                    {/* 4. Technology Trends */}
                    {techTrends && (
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider block">
                          4. Technology Trends:
                        </span>
                        <p className="text-[11px] text-[#B58863] bg-[#102A38]/60 p-2 rounded-lg border border-[#A79E9C]/10">
                          {techTrends}
                        </p>
                      </div>
                    )}

                    {/* 5 & 6. Preferred Certifications & Tools */}
                    {certs.length > 0 && (
                      <p className="text-[11px] text-[#A79E9C]">
                        📜 <strong className="text-[#D3C3B9]">Certifications:</strong> {certs.join(', ')}
                      </p>
                    )}

                    {tools.length > 0 && (
                      <p className="text-[11px] text-[#A79E9C]">
                        🛠 <strong className="text-[#D3C3B9]">Preferred Tools:</strong> {tools.join(', ')}
                      </p>
                    )}

                    {/* 7. Less-Relevant Skills */}
                    {lessSkills.length > 0 && (
                      <p className="text-[11px] text-[#A79E9C]">
                        🔻 <strong className="text-[#D3C3B9]">Less-Relevant:</strong> <span className="line-through text-red-300/80">{lessSkills.join(', ')}</span>
                      </p>
                    )}

                    {/* 8. Future Skill Requirements */}
                    {futureSkills.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold text-[#B58863] uppercase tracking-wider block">
                          8. Future Skill Requirements:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {futureSkills.map(s => (
                            <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-[#3D4D55] text-[#D3C3B9] border border-[#B58863]/40">
                              🚀 {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {req.notes && (
                      <p className="text-[11px] text-[#D3C3B9] italic pt-1 border-t border-[#102A38]/30">
                        "{req.notes}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: INDUSTRY SKILL TRENDS & INTELLIGENCE                               */}
      {/* ========================================================================= */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          <div className="bg-[#3D4D55] rounded-3xl p-6 sm:p-8 border border-[#A79E9C]/30 shadow-lg space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#102A38] text-[#B58863] text-xs font-bold mb-1 border border-[#B58863]/30">
              <TrendingUp className="w-3.5 h-3.5" />
              Real-Time Dynamic Analytics
            </div>
            <h2 className="text-xl font-bold text-[#D3C3B9] font-display">
              SkillBridge Industry Skill Demand & Talent Intelligence
            </h2>
            <p className="text-xs text-[#A79E9C] max-w-3xl leading-relaxed">
              Dynamically derived from {trends?.totalStoredRequirements || submittedRequirements.length || 6} stored industry directives, {trends?.totalActiveRoles || roles.length || 18} role competency models, and {trends?.totalEvaluatedStudents || candidates.length || 4} student profiles in the database.
            </p>
          </div>

          {/* Top Row: Most Demanded Skills & Emerging Skills */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Most Demanded Skills */}
            <div className="bg-[#3D4D55] rounded-3xl p-6 border border-[#A79E9C]/30 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#102A38]/50">
                <div>
                  <h3 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#B58863]" />
                    1. Most Demanded Skills
                  </h3>
                  <p className="text-[11px] text-[#A79E9C]">Across industry roles & listings</p>
                </div>
                <span className="text-xs font-bold text-[#B58863]">Top Required</span>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {(trends?.mostDemandedSkills || [
                  { skill: 'Python', count: 18, demandLevel: 'Critical' },
                  { skill: 'Data Structures & Algorithms', count: 16, demandLevel: 'High' },
                  { skill: 'SQL', count: 14, demandLevel: 'High' },
                  { skill: 'Git', count: 13, demandLevel: 'Essential' },
                  { skill: 'Docker', count: 11, demandLevel: 'High' },
                  { skill: 'React', count: 10, demandLevel: 'High' }
                ]).map((item, idx) => (
                  <div key={item.skill} className="p-3 rounded-xl bg-[#102A38] border border-[#A79E9C]/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#3D4D55] text-[#B58863] font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-[#D3C3B9] block">{item.skill}</span>
                        {item.category && <span className="text-[10px] text-[#A79E9C]">{item.category}</span>}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#B58863] text-[#161616]">
                      {item.count || item.roleMentions || 1} Roles
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Emerging Skills */}
            <div className="bg-[#3D4D55] rounded-3xl p-6 border border-[#A79E9C]/30 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#102A38]/50">
                <div>
                  <h3 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#B58863]" />
                    2. Emerging Skills
                  </h3>
                  <p className="text-[11px] text-[#A79E9C]">Fastest-rising industry categories</p>
                </div>
                <span className="text-xs font-bold text-[#B58863]">Growth</span>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {(trends?.emergingSkills || [
                  { skill: 'Generative AI & LLMs', growth: '+140%', category: 'AI/ML' },
                  { skill: 'RISC-V Architecture', growth: '+85%', category: 'VLSI' },
                  { skill: 'Vector Databases', growth: '+110%', category: 'Data' },
                  { skill: 'Rust Systems Programming', growth: '+75%', category: 'Systems' },
                  { skill: 'WebAssembly (WASM)', growth: '+65%', category: 'Web' }
                ]).map(item => (
                  <div key={item.skill} className="p-3 rounded-xl bg-[#102A38] border border-[#A79E9C]/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#D3C3B9] block">{item.skill}</span>
                      <span className="text-[10px] text-[#A79E9C]">{item.category || item.demand || 'Emerging'}</span>
                    </div>
                    <span className="text-[11px] font-extrabold text-[#B58863] bg-[#3D4D55] px-2.5 py-1 rounded-lg border border-[#B58863]/30">
                      {item.growth || '+90% YoY'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Common Student Skill Gaps (Live Computed against database students) */}
            <div className="bg-[#3D4D55] rounded-3xl p-6 border border-[#A79E9C]/30 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#102A38]/50">
                <div>
                  <h3 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#B58863]" />
                    3. Common Student Skill Gaps
                  </h3>
                  <p className="text-[11px] text-[#A79E9C]">Computed from live student pool</p>
                </div>
                <span className="text-xs font-bold text-[#A79E9C]">Gap %</span>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {(trends?.commonStudentSkillGaps || trends?.commonlyLackingSkills || [
                  { skill: 'Docker & Containerization', gapPercentage: 75, recommendation: 'Conduct hands-on DevOps workshops' },
                  { skill: 'Cloud Architecture (AWS)', gapPercentage: 68, recommendation: 'Integrate cloud labs into 3rd year' },
                  { skill: 'Unit Testing & CI/CD', gapPercentage: 64, recommendation: 'Mandate automated tests in capstones' },
                  { skill: 'SystemVerilog / UVM', gapPercentage: 61, recommendation: 'VLSI lab tooling upgrade' }
                ]).map(item => (
                  <div key={item.skill} className="p-3 rounded-xl bg-[#102A38] border border-[#A79E9C]/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#D3C3B9]">{item.skill}</span>
                      <span className="text-[10px] font-extrabold text-[#B58863] bg-[#3D4D55] px-2 py-0.5 rounded">
                        {item.gapPercentage || item.lackPercentage || item.studentsLackingPercentage || 60}% Lacking
                      </span>
                    </div>
                    <p className="text-[10px] text-[#A79E9C] leading-snug">{item.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Row: Increasing-Demand Skills & Frequently Requested Skills */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 4. Increasing-Demand Skills */}
            <div className="bg-[#3D4D55] rounded-3xl p-6 border border-[#A79E9C]/30 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#102A38]/50">
                <div>
                  <h3 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#B58863]" />
                    4. Increasing-Demand Skills
                  </h3>
                  <p className="text-[11px] text-[#A79E9C]">Future skill specifications from industry partners</p>
                </div>
                <span className="text-xs font-bold text-[#B58863]">Future Needs</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(trends?.increasingDemandSkills || [
                  { skill: 'Full-Stack TypeScript (Next.js 14)', trend: 'Accelerating Demand', category: 'Software' },
                  { skill: 'Vector Databases (pgvector, Pinecone)', trend: 'Accelerating Demand', category: 'Data/AI' },
                  { skill: 'RISC-V Microarchitecture Design', trend: 'High Priority', category: 'Hardware' },
                  { skill: 'EV Powertrain & BMS Architecture', trend: 'High Priority', category: 'Core' }
                ]).map(item => (
                  <div key={item.skill} className="p-3 rounded-xl bg-[#102A38] border border-[#A79E9C]/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#D3C3B9] block">{item.skill}</span>
                      <span className="text-[10px] text-[#A79E9C]">{item.category || 'Industry Requirement'}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3D4D55] text-[#B58863] border border-[#B58863]/30">
                      {item.trend || 'Increasing'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Frequently Requested Skills */}
            <div className="bg-[#3D4D55] rounded-3xl p-6 border border-[#A79E9C]/30 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#102A38]/50">
                <div>
                  <h3 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#B58863]" />
                    5. Frequently Requested Skills
                  </h3>
                  <p className="text-[11px] text-[#A79E9C]">Repeatedly cited in recruitment directives</p>
                </div>
                <span className="text-xs font-bold text-[#B58863]">Recurrence</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(trends?.frequentlyRequestedSkills || [
                  { skill: 'Python', roleMentions: 18 },
                  { skill: 'DSA', roleMentions: 16 },
                  { skill: 'SQL', roleMentions: 14 },
                  { skill: 'Git', roleMentions: 13 },
                  { skill: 'Docker', roleMentions: 11 },
                  { skill: 'React', roleMentions: 10 }
                ]).map(item => (
                  <div key={item.skill} className="p-2.5 rounded-xl bg-[#102A38] border border-[#A79E9C]/20 text-center space-y-1">
                    <p className="text-xs font-bold text-[#D3C3B9] truncate">{item.skill}</p>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B58863]/20 text-[#B58863]">
                      {item.roleMentions || 1} citations
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Technology Trends & Industry Direction */}
          {trends?.technologyTrends?.length > 0 && (
            <div className="bg-[#3D4D55] rounded-3xl p-6 border border-[#A79E9C]/30 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#B58863]" />
                Technology Trends & Curricular Directives
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trends.technologyTrends.map((t, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#102A38] border border-[#A79E9C]/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#D3C3B9]">{t.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#3D4D55] text-[#B58863]">
                        {t.impact || 'High Impact'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A79E9C] leading-relaxed">{t.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ACTIVE OPENINGS & APPLICANTS (Preserving Existing Functionality)    */}
      {/* ========================================================================= */}
      {activeTab === 'openings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#3D4D55]">
              <h3 className="text-sm font-bold text-[#D3C3B9] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#B58863]" />
                Active Openings Posted by {user?.companyName || 'Company'} ({opportunities.length})
              </h3>
              <button
                onClick={() => setActivePage('post-opportunity')}
                className="text-xs font-bold text-[#B58863] hover:underline flex items-center gap-1"
              >
                + Post New Opening
              </button>
            </div>

            <div className="space-y-4">
              {opportunities.map(opp => (
                <div
                  key={opp.id}
                  className="p-5 rounded-2xl bg-[#3D4D55] border border-[#A79E9C]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#D3C3B9]">{opp.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#102A38] text-[#B58863] border border-[#B58863]/30">
                        {opp.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#A79E9C]">
                      {opp.stipend} · {opp.workMode} · {opp.duration}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {opp.requiredSkills?.map(s => (
                        <span key={s.name || s} className="text-[10px] px-2 py-0.5 rounded bg-[#102A38] text-[#D3C3B9] border border-[#A79E9C]/20">
                          {s.name || s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActivePage('company-applications')}
                    className="px-4 py-2 rounded-xl bg-[#102A38] hover:bg-[#102A38]/80 text-[#D3C3B9] font-bold text-xs border border-[#A79E9C]/30 transition-colors shrink-0"
                  >
                    View Pipeline
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#3D4D55] rounded-3xl p-6 border border-[#A79E9C]/30 shadow-lg space-y-4 h-fit">
            <h3 className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">
              Quick Industry Actions
            </h3>
            
            <button
              onClick={() => setActivePage('student-search')}
              className="w-full text-left p-3.5 rounded-2xl bg-[#102A38] hover:bg-[#102A38]/80 border border-[#A79E9C]/20 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#3D4D55] text-[#B58863] flex items-center justify-center font-bold text-sm">
                  🔍
                </div>
                <div>
                  <p className="text-xs font-bold text-[#D3C3B9]">Search Students by Skill</p>
                  <p className="text-[10px] text-[#A79E9C]">Filter by Java, Python, React, CGPA</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#B58863]" />
            </button>

            <button
              onClick={() => setActivePage('company-feedback')}
              className="w-full text-left p-3.5 rounded-2xl bg-[#102A38] hover:bg-[#102A38]/80 border border-[#A79E9C]/20 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#3D4D55] text-[#B58863] flex items-center justify-center font-bold text-sm">
                  ⭐
                </div>
                <div>
                  <p className="text-xs font-bold text-[#D3C3B9]">Submit Intern Feedback</p>
                  <p className="text-[10px] text-[#A79E9C]">Structured 8-factor evaluation</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#B58863]" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. ADD / EDIT ROLE MODAL                                                  */}
      {/* ========================================================================= */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#161616]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#3D4D55] border border-[#B58863]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl text-[#D3C3B9]">
            <div className="flex items-center justify-between pb-3 border-b border-[#102A38]/50">
              <h3 className="text-base font-bold text-[#D3C3B9]">
                {editingRole ? 'Edit Industry Role' : 'Add Custom Industry Role'}
              </h3>
              <button
                onClick={() => setRoleModalOpen(false)}
                className="text-[#A79E9C] hover:text-[#D3C3B9] p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRole} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  Role Category
                </label>
                <select
                  value={roleForm.category}
                  onChange={(e) => setRoleForm({ ...roleForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                >
                  <option value="software">Software / IT</option>
                  <option value="hardware">Hardware / Electronics</option>
                  <option value="core">Core Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  Role Title
                </label>
                <input
                  type="text"
                  value={roleForm.title}
                  onChange={(e) => setRoleForm({ ...roleForm, title: e.target.value })}
                  placeholder="e.g. AI Prompt Engineer, ASIC Verification Engineer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  Required Competencies (Comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={roleForm.skillsStr}
                  onChange={(e) => setRoleForm({ ...roleForm, skillsStr: e.target.value })}
                  placeholder="e.g. Python, PyTorch, LangChain, FastAPIs, Docker"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#102A38]/50">
                <button
                  type="button"
                  onClick={() => setRoleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#A79E9C] hover:bg-[#102A38]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#B58863] text-[#161616] hover:bg-[#B58863]/90 text-xs font-bold shadow-md"
                >
                  Save Industry Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. RECRUITMENT FEEDBACK MODAL (8 Factors, Non-Destructive)                 */}
      {/* ========================================================================= */}
      {feedbackModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#161616]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-[#3D4D55] border border-[#B58863]/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-[#D3C3B9] my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#102A38]/50">
              <div>
                <h3 className="text-base font-bold text-[#D3C3B9] flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#B58863]" />
                  Candidate Recruitment Evaluation & Feedback
                </h3>
                <p className="text-xs text-[#A79E9C]">
                  Evaluating candidate: <strong>{feedbackForm.studentName}</strong>
                </p>
              </div>
              <button
                onClick={() => setFeedbackModalOpen(false)}
                className="text-[#A79E9C] hover:text-[#D3C3B9] p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              {/* Factor 1: Student Name (Pre-filled) */}
              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  1. Student Name
                </label>
                <input
                  type="text"
                  value={feedbackForm.studentName}
                  disabled
                  className="w-full px-3.5 py-2 rounded-xl bg-[#102A38] border border-[#A79E9C]/30 text-xs font-bold text-[#D3C3B9] cursor-not-allowed opacity-90"
                />
              </div>

              {/* Factor 2: Role Interviewed for */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                    2. Role Interviewed For
                  </label>
                  <input
                    type="text"
                    value={feedbackForm.role}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                    required
                  />
                </div>

                {/* Factor 3: Selected / Not Selected */}
                <div>
                  <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                    3. Selection Status
                  </label>
                  <select
                    value={feedbackForm.status}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, status: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-bold text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  >
                    <option value="Selected">✅ Selected / Offered</option>
                    <option value="Not Selected">❌ Not Selected</option>
                  </select>
                </div>
              </div>

              {/* Factor 4 & 5: Technical Rating & Overall Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                    4. Technical Skill Rating (1 - 5)
                  </label>
                  <select
                    value={feedbackForm.technicalRating}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, technicalRating: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-bold text-[#B58863] outline-none focus:ring-2 focus:ring-[#B58863]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 - Exceptional Mastery</option>
                    <option value={4}>⭐⭐⭐⭐ 4 - Strong Foundation</option>
                    <option value={3}>⭐⭐⭐ 3 - Meets Core Requirements</option>
                    <option value={2}>⭐⭐ 2 - Developing Competence</option>
                    <option value={1}>⭐ 1 - Substantial Gaps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                    5. Overall Rating (1 - 5)
                  </label>
                  <select
                    value={feedbackForm.overallRating}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, overallRating: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-bold text-[#B58863] outline-none focus:ring-2 focus:ring-[#B58863]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 - Highly Recommended</option>
                    <option value={4}>⭐⭐⭐⭐ 4 - Recommended</option>
                    <option value={3}>⭐⭐⭐ 3 - Potential Fit</option>
                    <option value={2}>⭐⭐ 2 - Conditional</option>
                    <option value={1}>⭐ 1 - Not Recommended</option>
                  </select>
                </div>
              </div>

              {/* Factor 4: Strong skills demonstrated */}
              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  4. Strong Skills Demonstrated (Comma-separated)
                </label>
                <input
                  type="text"
                  value={feedbackForm.strongSkills}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, strongSkills: e.target.value })}
                  placeholder="e.g. Java, OOP Architecture, Clean Code, System Design"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  required
                />
              </div>

              {/* Factor 5: Weak skills */}
              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  5. Weak Skills / Identified Gaps (Comma-separated)
                </label>
                <input
                  type="text"
                  value={feedbackForm.weakSkills}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, weakSkills: e.target.value })}
                  placeholder="e.g. Docker, SQL Query Optimization, Unit Testing"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  required
                />
              </div>

              {/* Factor 6 & 7: Technical Performance & Overall Performance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                    6. Technical Performance (1 - 5)
                  </label>
                  <select
                    value={feedbackForm.technicalRating}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, technicalRating: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-bold text-[#B58863] outline-none focus:ring-2 focus:ring-[#B58863]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 - Exceptional Mastery</option>
                    <option value={4}>⭐⭐⭐⭐ 4 - Strong Foundation</option>
                    <option value={3}>⭐⭐⭐ 3 - Meets Core Requirements</option>
                    <option value={2}>⭐⭐ 2 - Developing Competence</option>
                    <option value={1}>⭐ 1 - Substantial Gaps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                    7. Overall Performance (1 - 5)
                  </label>
                  <select
                    value={feedbackForm.overallRating}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, overallRating: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-bold text-[#B58863] outline-none focus:ring-2 focus:ring-[#B58863]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 - Highly Recommended</option>
                    <option value={4}>⭐⭐⭐⭐ 4 - Recommended</option>
                    <option value={3}>⭐⭐⭐ 3 - Potential Fit</option>
                    <option value={2}>⭐⭐ 2 - Conditional</option>
                    <option value={1}>⭐ 1 - Not Recommended</option>
                  </select>
                </div>
              </div>

              {/* Factor 8: Areas for Improvement */}
              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  8. Areas for Improvement
                </label>
                <textarea
                  rows={2}
                  value={feedbackForm.areasForImprovement}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, areasForImprovement: e.target.value })}
                  placeholder="Specific focus areas for candidate's growth (e.g., containerization labs, system design patterns)..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                />
              </div>

              {/* Comments */}
              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  General Comments & Recommendations
                </label>
                <textarea
                  rows={2}
                  value={feedbackForm.feedbackComments}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, feedbackComments: e.target.value })}
                  placeholder="Constructive feedback to guide student's future preparation and career..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#161616] border border-[#A79E9C]/40 text-xs font-medium text-[#D3C3B9] outline-none focus:ring-2 focus:ring-[#B58863]"
                  required
                />
                <p className="text-[10px] text-[#A79E9C] mt-1">
                  🔒 Note: This feedback is recorded as verified industry evaluation evidence in the student's profile without altering baseline student data.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#102A38]/50">
                <button
                  type="button"
                  onClick={() => setFeedbackModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#A79E9C] hover:bg-[#102A38]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingFeedback}
                  className="px-5 py-2 rounded-xl bg-[#B58863] text-[#161616] hover:bg-[#B58863]/90 text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-[#161616]" />
                  {submittingFeedback ? 'Submitting...' : 'Submit Official Recruitment Feedback'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
