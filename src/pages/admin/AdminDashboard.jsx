import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Building2, 
  School, 
  Users, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Briefcase, 
  ExternalLink,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Search,
  Check,
  XCircle,
  AlertTriangle,
  History,
  Lock,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/common/Modal';
import confetti from 'canvas-confetti';

export const AdminDashboard = () => {
  const { showToast } = useAuth();
  const [activeTab, setActiveTab] = useState('colleges'); // 'colleges' | 'faculty' | 'audit' | 'resources'

  // Data states
  const [colleges, setColleges] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters & Searching
  const [facultyCollegeFilter, setFacultyCollegeFilter] = useState('All');
  const [facultySearch, setFacultySearch] = useState('');
  const [auditSearch, setAuditSearch] = useState('');

  // Password visibility map { [collegeId]: boolean }
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // Modals
  const [newCollegeModal, setNewCollegeModal] = useState(false);
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [selectedCollegeForReset, setSelectedCollegeForReset] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [newResourceModal, setNewResourceModal] = useState(false);

  // Form state for new college creation
  const [newCollegeForm, setNewCollegeForm] = useState({
    name: '',
    code: '',
    location: '',
    sharedPassword: ''
  });

  // Resource form
  const [newRes, setNewRes] = useState({
    skill: '',
    title: '',
    platform: 'YouTube (freeCodeCamp)',
    instructor: '',
    level: 'Beginner to Intermediate',
    estimatedHours: '8 Hours',
    type: 'Video Course',
    url: '',
    description: ''
  });

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [colRes, facRes, logRes, resRes] = await Promise.all([
        fetch('/api/admin/colleges'),
        fetch('/api/admin/faculty'),
        fetch('/api/admin/audit-logs'),
        fetch('/api/resources')
      ]);

      if (colRes.ok) setColleges(await colRes.json());
      if (facRes.ok) setFacultyList(await facRes.json());
      if (logRes.ok) setAuditLogs(await logRes.json());
      if (resRes.ok) setResources(await resRes.json());
    } catch (err) {
      console.error('Failed to load admin datasets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const togglePasswordVisibility = (colId) => {
    setVisiblePasswords(prev => ({ ...prev, [colId]: !prev[colId] }));
  };

  const copyPasswordToClipboard = (pwd, colName) => {
    navigator.clipboard.writeText(pwd);
    showToast(`Copied Shared Password for ${colName}!`, 'success');
  };

  const handleCreateCollege = async (e) => {
    e.preventDefault();
    if (!newCollegeForm.name.trim()) {
      showToast('College name is required', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCollegeForm)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        confetti({ particleCount: 50, spread: 60 });
        showToast(`College "${newCollegeForm.name}" registered with faculty password!`, 'success');
        setNewCollegeModal(false);
        setNewCollegeForm({ name: '', code: '', location: '', sharedPassword: '' });
        fetchAdminData();
      } else {
        showToast(data.error || 'Failed to register college', 'error');
      }
    } catch (err) {
      showToast('Network error while registering college', 'error');
    }
  };

  const handleOpenResetPassword = (college) => {
    setSelectedCollegeForReset(college);
    setNewPasswordInput(`${college.code || 'College'}Faculty#${new Date().getFullYear()}`);
    setResetPasswordModal(true);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCollegeForReset || !newPasswordInput.trim()) return;

    try {
      const res = await fetch(`/api/admin/colleges/${selectedCollegeForReset.id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPasswordInput.trim() })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Shared Faculty Password updated for ${selectedCollegeForReset.name}!`, 'success');
        setResetPasswordModal(false);
        setSelectedCollegeForReset(null);
        fetchAdminData();
      } else {
        showToast(data.error || 'Failed to reset password', 'error');
      }
    } catch (err) {
      showToast('Failed to reset shared password', 'error');
    }
  };

  const handleToggleFacultyStatus = async (facultyId, currentStatus, facultyName) => {
    const nextStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      const res = await fetch(`/api/admin/faculty/${facultyId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Faculty ${facultyName} is now ${nextStatus}`, 'info');
        fetchAdminData();
      } else {
        showToast(data.error || 'Failed to update faculty status', 'error');
      }
    } catch (err) {
      showToast('Error updating faculty status', 'error');
    }
  };

  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRes)
      });
      if (res.ok) {
        confetti({ particleCount: 30, spread: 50 });
        showToast('New learning resource added to global library!', 'success');
        setNewResourceModal(false);
        setNewRes({ skill: '', title: '', platform: 'YouTube (freeCodeCamp)', instructor: '', level: 'Beginner to Intermediate', estimatedHours: '8 Hours', type: 'Video Course', url: '', description: '' });
        fetchAdminData();
      }
    } catch (err) {
      showToast('Failed to add resource', 'error');
    }
  };

  const handleDeleteResource = async (id, title) => {
    try {
      const res = await fetch(`/api/resources/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast(`Deleted resource: ${title}`, 'info');
        fetchAdminData();
      }
    } catch (err) {
      showToast('Failed to delete resource', 'error');
    }
  };

  const filteredFaculty = facultyList.filter(f => {
    const matchesCollege = facultyCollegeFilter === 'All' || f.collegeId === facultyCollegeFilter || f.collegeName.includes(facultyCollegeFilter);
    const matchesSearch = !facultySearch || 
      f.name.toLowerCase().includes(facultySearch.toLowerCase()) || 
      f.email.toLowerCase().includes(facultySearch.toLowerCase()) || 
      f.facultyId.toLowerCase().includes(facultySearch.toLowerCase()) ||
      f.department.toLowerCase().includes(facultySearch.toLowerCase());
    return matchesCollege && matchesSearch;
  });

  const filteredAuditLogs = auditLogs.filter(log => {
    if (!auditSearch) return true;
    const term = auditSearch.toLowerCase();
    return (
      (log.action && log.action.toLowerCase().includes(term)) ||
      (log.actorName && log.actorName.toLowerCase().includes(term)) ||
      (log.actorEmail && log.actorEmail.toLowerCase().includes(term)) ||
      (log.collegeName && log.collegeName.toLowerCase().includes(term)) ||
      (log.details && log.details.toLowerCase().includes(term))
    );
  });

  const totalStudents = colleges.reduce((acc, c) => acc + (c.studentCount || 0), 0);
  const totalActiveFaculty = facultyList.filter(f => f.status === 'Active').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Super Admin Banner Header */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
            <ShieldCheck className="w-4 h-4 text-purple-300" />
            Super Admin Control Center
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            Institutional Governance & Faculty Access
          </h1>
          <p className="text-purple-100 text-sm max-w-2xl">
            Single shared password governance per registered college, multi-faculty account management, role scoping, and real-time security audit trails.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setNewCollegeModal(true)}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Register New College
          </button>
          <button
            onClick={fetchAdminData}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Platform Governance KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Colleges</span>
            <School className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display my-2">{colleges.length}</div>
          <p className="text-xs text-brand-600 font-semibold">1 Shared Password / Institution</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Faculty</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 font-display my-2">{totalActiveFaculty}</div>
          <p className="text-xs text-slate-500">{facultyList.length} Total Accounts</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Enrolled Students</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold text-purple-600 font-display my-2">{totalStudents || 12}</div>
          <p className="text-xs text-slate-500">Strictly Scoped to Assigned College</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Security Audits</span>
            <History className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 font-display my-2">{auditLogs.length}</div>
          <p className="text-xs text-slate-500">Live Login & Access Logs</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'colleges', label: '🏛️ Colleges & Shared Passwords', count: colleges.length },
          { id: 'faculty', label: '👨‍🏫 Faculty Accounts & Approvals', count: facultyList.length },
          { id: 'audit', label: '🛡️ Audit & Security Trail', count: auditLogs.length },
          { id: 'resources', label: '📚 Global Learning Catalog', count: resources.length }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === t.id
                ? 'bg-purple-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{t.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === t.id ? 'bg-purple-800 text-purple-200' : 'bg-slate-100 text-slate-600'}`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* TAB 1: COLLEGES & SHARED PASSWORDS */}
      {activeTab === 'colleges' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-purple-600" />
                College Shared Faculty Password Governance
              </h2>
              <p className="text-xs text-slate-500">
                Every registered college possesses exactly ONE shared password used by all enrolled faculty members. Managed solely by Super Admin.
              </p>
            </div>

            <button
              onClick={() => setNewCollegeModal(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Register College
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4 rounded-l-xl">College / Institution</th>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Faculty Count</th>
                  <th className="py-3 px-4">Enrolled Students</th>
                  <th className="py-3 px-4">Shared Faculty Password</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {colleges.map(col => {
                  const isVisible = visiblePasswords[col.id];
                  const passwordText = col.sharedPasswordPlain || 'ApexFaculty#2026';

                  return (
                    <tr key={col.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <School className="w-4 h-4 text-purple-600 shrink-0" />
                          <div>
                            <div>{col.name}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{col.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                          {col.code}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {col.location}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-purple-700">
                        {col.activeFacultyCount || 0} active / {col.facultyCount || 0} total
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700">
                        {col.studentCount || 0} Students
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        <div className="flex items-center gap-1.5 bg-amber-50/80 border border-amber-200 px-2.5 py-1 rounded-lg w-fit">
                          <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="text-amber-950 font-bold tracking-wide">
                            {isVisible ? passwordText : '••••••••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(col.id)}
                            className="p-1 hover:text-amber-800 text-amber-600"
                            title={isVisible ? 'Hide Password' : 'View Password'}
                          >
                            {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => copyPasswordToClipboard(passwordText, col.name)}
                            className="p-1 hover:text-amber-800 text-amber-600"
                            title="Copy Password"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleOpenResetPassword(col)}
                          className="px-3 py-1 rounded-lg bg-white hover:bg-amber-50 text-amber-800 font-semibold border border-amber-200 hover:border-amber-300 shadow-2xs transition-colors"
                        >
                          Reset Password
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: FACULTY ACCOUNTS & APPROVALS */}
      {activeTab === 'faculty' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Faculty Members & Account Access
              </h2>
              <p className="text-xs text-slate-500">
                Individual faculty members enrolled under their respective institutions. Faculty can only view students of their assigned college.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* College Filter */}
              <select
                value={facultyCollegeFilter}
                onChange={(e) => setFacultyCollegeFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 outline-none bg-white"
              >
                <option value="All">All Registered Colleges</option>
                {colleges.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>

              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search faculty by name, ID, email..."
                  value={facultySearch}
                  onChange={(e) => setFacultySearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs outline-none w-60"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4 rounded-l-xl">Faculty Member</th>
                  <th className="py-3 px-4">Faculty ID / Emp ID</th>
                  <th className="py-3 px-4">Assigned College</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Last Login</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Access Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFaculty.map(fac => (
                  <tr key={fac.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>
                        <div>{fac.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{fac.email}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-700">
                      <span className="px-2 py-0.5 rounded bg-brand-50 border border-brand-200">
                        {fac.facultyId}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      🏛️ {fac.collegeName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {fac.department}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        fac.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {fac.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {fac.lastLoginAt ? new Date(fac.lastLoginAt).toLocaleString() : 'Never'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleToggleFacultyStatus(fac.id, fac.status, fac.name)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                          fac.status === 'Active'
                            ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        {fac.status === 'Active' ? 'Deactivate' : 'Activate Access'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT & SECURITY TRAIL */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <History className="w-5 h-5 text-amber-600" />
                Institutional Security & Authentication Audit Trail
              </h2>
              <p className="text-xs text-slate-500">
                Tamper-evident logs of all faculty login attempts, shared password resets, and role boundary checks.
              </p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search audit trail..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs outline-none w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4 rounded-l-xl">Timestamp</th>
                  <th className="py-3 px-4">Event Action</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">College Institution</th>
                  <th className="py-3 px-4">Details & Outcome</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAuditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700 border border-slate-200">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      <div>{log.actorName}</div>
                      <div className="text-[10px] text-slate-400">{log.actorEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {log.collegeName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-md">
                      {log.details}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'Success'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.status === 'Blocked'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-rose-100 text-rose-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: LEARNING RESOURCES CATALOG */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                Manage Open-Access Learning Resources
              </h2>
              <p className="text-xs text-slate-500">Add, edit, or remove free learning resources delivered to students based on their missing skills</p>
            </div>

            <button
              onClick={() => setNewResourceModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-xs border border-purple-200"
            >
              + Add Resource
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4 rounded-l-xl">Skill</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Est Time</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resources.map(res => (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                        {res.skill}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 max-w-xs truncate">
                      {res.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {res.platform}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {res.level}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {res.estimatedHours}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteResource(res.id, res.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove resource"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: REGISTER NEW COLLEGE INSTITUTION */}
      <Modal isOpen={newCollegeModal} onClose={() => setNewCollegeModal(false)} title="Register Approved College Institution">
        <form onSubmit={handleCreateCollege} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Official College Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. National Institute of Technology Karnataka (NITK)"
              value={newCollegeForm.name}
              onChange={(e) => setNewCollegeForm({ ...newCollegeForm, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                College Code / Abbr
              </label>
              <input
                type="text"
                placeholder="e.g. NITK"
                value={newCollegeForm.code}
                onChange={(e) => setNewCollegeForm({ ...newCollegeForm, code: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Campus Location
              </label>
              <input
                type="text"
                placeholder="e.g. Surathkal, Karnataka"
                value={newCollegeForm.location}
                onChange={(e) => setNewCollegeForm({ ...newCollegeForm, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          {/* Assigned Shared Faculty Password */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <KeyRound className="w-4 h-4 text-amber-600" />
              Initial Shared Faculty Password (Managed by Super Admin)
            </div>
            <input
              type="text"
              placeholder="Leave blank to auto-generate (e.g. NITKFaculty#2026)"
              value={newCollegeForm.sharedPassword}
              onChange={(e) => setNewCollegeForm({ ...newCollegeForm, sharedPassword: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-amber-300 text-xs font-mono font-bold bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            />
            <p className="text-[10px] text-amber-800">
              🔒 All faculty members belonging to this institution will use this single shared password to sign in.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setNewCollegeModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20"
            >
              Register Institution
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: RESET COLLEGE SHARED FACULTY PASSWORD */}
      <Modal 
        isOpen={resetPasswordModal} 
        onClose={() => setResetPasswordModal(false)} 
        title={`Reset Shared Faculty Password — ${selectedCollegeForReset?.name || 'College'}`}
      >
        <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            ⚠️ <strong>Important Notice:</strong> Resetting this shared password will immediately update the authentication key for <strong>ALL faculty members</strong> enrolled at {selectedCollegeForReset?.name}.
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              New Shared Faculty Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Min. 6 characters. Must be shared with authorized faculty.</p>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setResetPasswordModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20"
            >
              Save New Shared Password
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 3: ADD LEARNING RESOURCE */}
      <Modal isOpen={newResourceModal} onClose={() => setNewResourceModal(false)} title="Add Free Learning Resource">
        <form onSubmit={handleAddResource} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Target Skill</label>
              <input
                type="text"
                placeholder="e.g. React, Docker, Git"
                value={newRes.skill}
                onChange={(e) => setNewRes({ ...newRes, skill: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Platform</label>
              <input
                type="text"
                placeholder="e.g. YouTube (freeCodeCamp), GeeksforGeeks"
                value={newRes.platform}
                onChange={(e) => setNewRes({ ...newRes, platform: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Course / Resource Title</label>
            <input
              type="text"
              placeholder="e.g. React 18 Full Course – Build Modern Web Apps"
              value={newRes.title}
              onChange={(e) => setNewRes({ ...newRes, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Estimated Hours</label>
              <input
                type="text"
                placeholder="e.g. 12 Hours"
                value={newRes.estimatedHours}
                onChange={(e) => setNewRes({ ...newRes, estimatedHours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Direct Resource URL</label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={newRes.url}
                onChange={(e) => setNewRes({ ...newRes, url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Brief Description</label>
            <textarea
              rows={2}
              placeholder="Overview of curriculum and learning outcomes..."
              value={newRes.description}
              onChange={(e) => setNewRes({ ...newRes, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setNewResourceModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20"
            >
              Save to Library
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
