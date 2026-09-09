import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  School, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Building2, 
  Target, 
  BookOpen, 
  Award, 
  Plus, 
  Check, 
  Search, 
  ShieldCheck, 
  Camera, 
  Upload, 
  Image as ImageIcon,
  Layers,
  X,
  Briefcase
} from 'lucide-react';
import { 
  ALL_ENGINEERING_DEPARTMENTS, 
  ALL_ACADEMIC_YEARS_AND_SEMESTERS 
} from '../data/indianInstitutions';
import { 
  INDUSTRY_DOMAINS,
  getDefaultDomainsForBranch,
  getAvailableRoles,
  getPrioritizedSkills,
  getAllEngineeringSkills
} from '../data/registrationCareerData';
import { APCollegeSelector } from '../components/common/APCollegeSelector';
import { AP_ENGINEERING_COLLEGES } from '../data/apColleges';
import confetti from 'canvas-confetti';

export const RegisterPage = ({ setActivePage }) => {
  const { registerUserAccount, registerFaculty, showToast } = useAuth();
  
  const fileInputRef = useRef(null);
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [customAvatar, setCustomAvatar] = useState(null);
  
  // Colleges list from backend / data
  const [registeredCollegesList, setRegisteredCollegesList] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedCollege, setSelectedCollege] = useState(AP_ENGINEERING_COLLEGES[0].name);
  const [selectedCollegeCode, setSelectedCollegeCode] = useState(AP_ENGINEERING_COLLEGES[0].code);
  const [customCollege, setCustomCollege] = useState('');
  const [customCode, setCustomCode] = useState('');
  
  // Existing Engineering Branch Selection
  const [department, setDepartment] = useState(ALL_ENGINEERING_DEPARTMENTS[0]);
  
  // Student details
  const [year, setYear] = useState(ALL_ACADEMIC_YEARS_AND_SEMESTERS[4]); // 3rd Year — 5th Semester
  const [cgpa, setCgpa] = useState('');
  
  // Target Career Role & Known Skills State
  const [selectedDomains, setSelectedDomains] = useState(() => getDefaultDomainsForBranch(ALL_ENGINEERING_DEPARTMENTS[0]));
  const [targetRoleId, setTargetRoleId] = useState('role_swe');
  const [targetRoleTitle, setTargetRoleTitle] = useState('Software Developer');
  const [selectedSkills, setSelectedSkills] = useState([]); // Must start EMPTY: no auto-marked skills
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [customSkillInput, setCustomSkillInput] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch approved registered colleges from backend
  useEffect(() => {
    const fetchRegisteredColleges = async () => {
      try {
        const res = await fetch('/api/colleges');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setRegisteredCollegesList(data);
            if (role === 'college') {
              setSelectedCollege(data[0].name);
            }
          }
        }
      } catch (err) {
        console.warn('Backend colleges fetch note:', err);
      }
    };
    fetchRegisteredColleges();
  }, [role]);

  // Synchronize recommended domains whenever the student's branch changes
  useEffect(() => {
    if (role === 'student') {
      const defaults = getDefaultDomainsForBranch(department);
      setSelectedDomains(defaults);
    }
  }, [department, role]);

  // Compute available roles dynamically from existing branch + selected domains
  const availableRoles = useMemo(() => {
    return getAvailableRoles(department, selectedDomains);
  }, [department, selectedDomains]);

  // Ensure targetRoleId remains valid within the filtered availableRoles
  useEffect(() => {
    if (availableRoles.length > 0) {
      const exists = availableRoles.some(r => r.id === targetRoleId);
      if (!exists) {
        setTargetRoleId(availableRoles[0].id);
        setTargetRoleTitle(availableRoles[0].title);
      }
    }
  }, [availableRoles, targetRoleId]);

  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, JPEG, WEBP)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCustomAvatar(event.target.result);
      showToast('Profile photo selected!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const toggleDomain = (domain) => {
    if (selectedDomains.includes(domain)) {
      if (selectedDomains.length === 1) {
        showToast('Please keep at least one industry domain selected.', 'info');
        return;
      }
      setSelectedDomains(selectedDomains.filter(d => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const handleSelectRole = (roleId) => {
    const found = availableRoles.find(r => r.id === roleId);
    if (found) {
      setTargetRoleId(found.id);
      setTargetRoleTitle(found.title);
    }
  };

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e) => {
    if (e) e.preventDefault();
    if (!customSkillInput.trim()) return;
    const trimmed = customSkillInput.trim();
    if (!selectedSkills.includes(trimmed)) {
      setSelectedSkills([...selectedSkills, trimmed]);
      showToast(`Added custom skill: ${trimmed}`, 'success');
    }
    setCustomSkillInput('');
  };

  // Skills library calculations
  const prioritizedSkills = useMemo(() => {
    return getPrioritizedSkills(targetRoleId, department, selectedDomains);
  }, [targetRoleId, department, selectedDomains]);

  const allSkillsList = useMemo(() => {
    return getAllEngineeringSkills();
  }, []);

  const displayedSkills = useMemo(() => {
    if (skillSearchQuery.trim()) {
      const q = skillSearchQuery.toLowerCase().trim();
      return allSkillsList.filter(s => s.toLowerCase().includes(q));
    }
    if (showAllSkills) {
      return allSkillsList;
    }
    return prioritizedSkills;
  }, [skillSearchQuery, showAllSkills, allSkillsList, prioritizedSkills]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!email.trim()) {
      setErrorMsg('Please enter your official email address.');
      return;
    }

    // Faculty Registration Flow (Shared Institutional Password Policy)
    if (role === 'college') {
      if (!facultyId.trim()) {
        setErrorMsg('Please enter your Faculty ID / Employee ID (e.g. FAC-1001).');
        return;
      }
      if (!selectedCollege) {
        setErrorMsg('Please select your registered college institution.');
        return;
      }

      setSubmitting(true);
      const facultyPayload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        facultyId: facultyId.trim().toUpperCase(),
        collegeName: selectedCollege,
        department,
        phone: phone.trim() || undefined,
        avatar: customAvatar || undefined
      };

      try {
        const result = await registerFaculty(facultyPayload);
        setSubmitting(false);

        if (result && result.success) {
          confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
          showToast(`Faculty registered! Sign in using ${selectedCollege}'s shared faculty password.`, 'success');
          setActivePage('login');
        } else if (result && result.error) {
          setErrorMsg(result.error);
        }
      } catch (err) {
        setSubmitting(false);
        setErrorMsg('Faculty registration failed. Please try again.');
      }
      return;
    }

    // Student & Recruiter Password Validation
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long for account security.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-type your password carefully.');
      return;
    }

    // Student Specific Field Validations (Industry Domain, Role, Known Skills)
    if (role === 'student') {
      if (!selectedDomains || selectedDomains.length === 0) {
        setErrorMsg('Please select at least one Target Industry Domain.');
        return;
      }
      if (!targetRoleTitle || !targetRoleTitle.trim()) {
        setErrorMsg('Please select a Target Industry Role.');
        return;
      }
      if (!selectedSkills || selectedSkills.length === 0) {
        setErrorMsg('Please select at least one Known Skill that you possess.');
        return;
      }
    }

    setSubmitting(true);

    const isCustom = selectedCollegeCode === 'OTHER' || 
      selectedCollege === 'Other / Custom Engineering College in Andhra Pradesh' || 
      selectedCollege === 'Other / Custom Institution';

    const finalCollege = isCustom 
      ? (customCollege.trim() || 'Custom Engineering Institution') 
      : selectedCollege;

    const finalCollegeCode = isCustom 
      ? (customCode.trim() || 'CUSTOM') 
      : (selectedCollegeCode || '');

    const finalDistrict = selectedDistrict !== 'All Districts' ? selectedDistrict : undefined;
    const parsedCGPA = parseFloat(cgpa) > 0 ? parseFloat(cgpa) : 8.5;

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
      avatar: customAvatar || undefined,
      collegeName: finalCollege,
      collegeCode: finalCollegeCode,
      district: finalDistrict,
      department,
      year,
      cgpa: parsedCGPA,
      targetDomains: selectedDomains,
      targetDomain: selectedDomains[0] || 'Software / IT',
      targetRoleId,
      targetRoleTitle,
      initialSkills: selectedSkills.map(s => ({
        name: s,
        level: 'Intermediate',
        category: (s === 'Communication & STAR' || s === 'Team Collaboration' || s === 'Problem Solving' || s === 'Time Management') 
          ? 'Soft' 
          : (s.includes('Git') || s.includes('Docker') || s.includes('Linux') || s.includes('AWS')) 
            ? 'Tools' 
            : 'Technical',
        verified: false,
        rating: 3.8
      }))
    };

    try {
      const result = await registerUserAccount(payload);
      setSubmitting(false);

      if (result && result.success) {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
        if (role === 'student') {
          setActivePage('student-dashboard');
        } else if (role === 'admin') {
          setActivePage('admin-dashboard');
        } else {
          setActivePage('company-dashboard');
        }
      } else if (result && result.error) {
        setErrorMsg(result.error);
      }
    } catch (err) {
      setSubmitting(false);
      setErrorMsg('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-md mx-auto">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Secure Registration · <span className="text-brand-600">SkillBridge</span>
          </h2>
          <p className="text-xs text-slate-500">
            Create a password-protected verified account to securely manage your skills and placement data.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          
          {/* Role selector tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Your Stakeholder Role
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'student', label: '🎓 Student' },
                { id: 'college', label: '🏛️ Faculty' },
                { id: 'company', label: '🏢 Recruiter' },
                { id: 'admin', label: '⚡ Super Admin' }
              ].map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setRole(r.id);
                    setErrorMsg('');
                  }}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    role === r.id
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm ring-2 ring-brand-400/40'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Photo from Gallery / Device */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <img 
                  src={customAvatar || (role === 'student' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' : role === 'admin' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80')} 
                  alt="Avatar Preview" 
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-300 shadow-xs group-hover:opacity-85 transition-opacity"
                />
                <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Camera className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800">Profile Photo (Photos / Gallery)</h4>
                <p className="text-[11px] text-slate-500">Upload your own photo or use default portrait</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                className="hidden" 
                onChange={handleAvatarSelect} 
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5 text-brand-600" />
                {customAvatar ? 'Change Photo' : 'Upload From Gallery'}
              </button>
              {customAvatar && (
                <button
                  type="button"
                  onClick={() => setCustomAvatar(null)}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Full Name & Official Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {role === 'student' ? 'Student Full Name' : role === 'college' ? 'Faculty Full Name' : role === 'admin' ? 'Super Admin Name' : 'Recruiter Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder={role === 'college' ? 'e.g. Dr. Suresh Kumar (Professor)' : role === 'admin' ? 'e.g. Platform Administrator' : 'e.g. Aryan Gupta'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {role === 'college' ? 'Faculty Official Email' : role === 'admin' ? 'Super Admin Official Email' : 'Official Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder={role === 'college' ? 'suresh.kumar@apex.edu' : role === 'admin' ? 'admin@skillbridge.gov.in' : 'aryan.gupta@college.edu'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* College Faculty Specific Fields: Faculty ID / Employee ID & Phone */}
          {role === 'college' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Faculty ID / Employee ID <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Award className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. FAC-1001 or EMP-889"
                    value={facultyId}
                    onChange={(e) => setFacultyId(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none font-semibold uppercase"
                    required
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Unique identifier provided by your institution</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Password & Security Fields OR Institutional Shared Password Policy Banner */}
          {role === 'college' ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Institutional Shared Password Policy
              </div>
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                🏛️ <strong>One Shared Password Per College:</strong> All faculty members belonging to <strong>{selectedCollege}</strong> authenticate using your institution's single shared Faculty Password (managed securely by the Super Admin).
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-amber-800 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Individual faculty do NOT create separate passwords. Use your Email/ID + College Password at login.</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {role === 'admin' ? 'Super Admin Account Security' : 'Account Security & Password Protection'}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Create Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                      required
                    />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                🔒 Your password secures your administrative privileges, governance tools, and audit monitoring access.
              </p>
            </div>
          )}

          {/* Institutional / Academic Dropdown Selection (Only for Student and College) */}
          {role === 'admin' ? (
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-900 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                Super Admin Privilege Scope
              </div>
              <p className="text-xs text-purple-950 font-medium leading-relaxed">
                ⚡ As a <strong>Platform Super Admin</strong>, you will possess global authority to:
              </p>
              <ul className="text-[11px] text-purple-900 space-y-1 list-disc list-inside">
                <li>Register new colleges and configure their single shared faculty passwords.</li>
                <li>Reset college faculty passwords and activate/deactivate faculty accounts.</li>
                <li>Audit real-time system login events and cross-college data access.</li>
                <li>Curate and manage open-access learning roadmaps for all students.</li>
              </ul>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <School className="w-4 h-4 text-brand-600" />
                {role === 'student' ? 'Engineering College & Department (Andhra Pradesh)' : role === 'college' ? 'Assigned Registered College & Department' : 'Institutional Details'}
              </div>

              {/* Colleges Selection */}
              {role === 'college' ? (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Select Your Registered College Institution
                    </label>
                    <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">Approved Colleges Only</span>
                  </div>

                  <select
                    value={selectedCollege}
                    onChange={(e) => setSelectedCollege(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none bg-white font-bold text-slate-900"
                  >
                    {(registeredCollegesList.length > 0 ? registeredCollegesList : [
                      { name: 'Apex Institute of Technology' },
                      { name: 'Indian Institute of Technology Bombay (IIT Bombay)' },
                      { name: 'Anna University (CEG Campus, Chennai)' },
                      { name: 'BITS Pilani (Pilani Campus)' }
                    ]).map(col => (
                      <option key={col.id || col.name} value={col.name}>
                        🏛️ {col.name} {col.code ? `(${col.code})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <APCollegeSelector
                  selectedDistrict={selectedDistrict}
                  onDistrictChange={setSelectedDistrict}
                  selectedCollege={selectedCollege}
                  selectedCollegeCode={selectedCollegeCode}
                  onCollegeSelect={(col) => {
                    setSelectedCollege(col.name);
                    setSelectedCollegeCode(col.code);
                    if (col.district && col.district !== 'Other' && selectedDistrict === 'All Districts') {
                      setSelectedDistrict(col.district);
                    }
                  }}
                  customCollege={customCollege}
                  onCustomCollegeChange={setCustomCollege}
                  customCode={customCode}
                  onCustomCodeChange={setCustomCode}
                  required={true}
                />
              )}

              {/* Engineering Departments Dropdown (Existing Branch Selection) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {role === 'college' ? 'Faculty Department' : 'Engineering Department / Branch'}
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium text-slate-800"
                >
                  {ALL_ENGINEERING_DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {role === 'student' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">Academic Year & Current Semester</label>
                      <span className="text-[10px] text-brand-600 font-semibold">Semesters 1 to 8</span>
                    </div>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium text-slate-800"
                    >
                      {ALL_ACADEMIC_YEARS_AND_SEMESTERS.map(yr => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current CGPA (e.g. 8.75)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="Enter your CGPA (e.g. 8.5)"
                      value={cgpa}
                      onChange={(e) => setCgpa(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Student Specific: Target Career Role & Known Skills Setup */}
          {role === 'student' && (
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200">
              
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Target Career Role & Known Skills
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Personalize your career track and tell us which skills you already have
                    </p>
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 flex items-center gap-1.5 self-start sm:self-auto">
                  <span>Selected Branch:</span>
                  <strong className="truncate max-w-[180px]">{department.split('(')[0].trim()}</strong>
                </div>
              </div>

              {/* 1. TARGET INDUSTRY DOMAIN */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    1. Target Industry Domain(s) <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-medium">Multiple selections allowed</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Select the engineering and technology sectors you want to target for placements and internships:
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {INDUSTRY_DOMAINS.map((domain) => {
                    const isSelected = selectedDomains.includes(domain);
                    return (
                      <button
                        key={domain}
                        type="button"
                        onClick={() => toggleDomain(domain)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-brand-600 text-white border-brand-600 shadow-xs ring-1 ring-brand-400/40'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{domain}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. TARGET INDUSTRY ROLE */}
              <div className="space-y-2 pt-2 border-t border-slate-200/80">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    2. Target Industry Role <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-brand-700 font-bold bg-brand-50 px-2 py-0.5 rounded">
                    {availableRoles.length} Roles for {department.split('(')[0].trim()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Choose your primary target role for benchmark evaluation and skill gap recommendations:
                </p>

                <select
                  value={targetRoleId}
                  onChange={(e) => handleSelectRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none bg-white font-bold text-slate-900 shadow-2xs"
                >
                  {availableRoles.map((r) => (
                    <option key={r.id} value={r.id}>
                      🎯 {r.title} ({r.category})
                    </option>
                  ))}
                </select>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600">
                    Active Target: <strong className="text-slate-900">{targetRoleTitle}</strong>
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                    Industry Benchmark Connected
                  </span>
                </div>
              </div>

              {/* 3. KNOWN SKILLS */}
              <div className="space-y-3 pt-2 border-t border-slate-200/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    3. Known Skills <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedSkills.length > 0 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {selectedSkills.length} Selected
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  Select the technical and engineering skills you <strong>already possess</strong>. Only explicitly chosen skills will be marked as known.
                </p>

                {/* Skill Search & View All Controls */}
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="relative flex-1 w-full">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search skills (e.g. Python, Verilog, AutoCAD, DSA, SQL, PLC)..."
                      value={skillSearchQuery}
                      onChange={(e) => setSkillSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium"
                    />
                    {skillSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setSkillSearchQuery('')}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowAllSkills(!showAllSkills);
                      setSkillSearchQuery('');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all whitespace-nowrap flex items-center gap-1.5 w-full sm:w-auto justify-center ${
                      showAllSkills
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    {showAllSkills ? 'Show Recommended Skills' : `View All Engineering Skills (${allSkillsList.length})`}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                  <span>
                    {skillSearchQuery.trim()
                      ? `Found ${displayedSkills.length} skill(s) matching "${skillSearchQuery}"`
                      : showAllSkills
                      ? `Viewing all ${displayedSkills.length} engineering skills across disciplines`
                      : `Showing ${displayedSkills.length} skills recommended for ${targetRoleTitle}`}
                  </span>
                  {!showAllSkills && !skillSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setShowAllSkills(true)}
                      className="text-brand-600 hover:underline font-semibold"
                    >
                      Browse cross-disciplinary skills &rarr;
                    </button>
                  )}
                </div>

                {/* Skill Toggle Chips Grid */}
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-3 bg-white rounded-2xl border border-slate-200 shadow-inner">
                  {displayedSkills.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-slate-400" />}
                        {skill}
                      </button>
                    );
                  })}

                  {displayedSkills.length === 0 && (
                    <div className="text-center py-6 w-full text-slate-400 text-xs">
                      No matching skill found. Add it as a custom skill below!
                    </div>
                  )}
                </div>

                {/* Selected Skills Review Strip */}
                {selectedSkills.length > 0 && (
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-emerald-900 block">
                      Your Selected Known Skills ({selectedSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-800 text-[11px] font-semibold"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          {skill}
                          <button
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className="text-slate-400 hover:text-rose-600 ml-0.5"
                            title="Remove"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Skill Input */}
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add other skill (e.g. ROS, Verilog-A, OpenFOAM)..."
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomSkill(e);
                      }
                    }}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSkill}
                    disabled={!customSkillInput.trim()}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            {submitting 
              ? 'Registering Account...' 
              : role === 'college' 
                ? 'Register College Faculty Account' 
                : role === 'admin'
                  ? 'Register Platform Super Admin Account'
                  : 'Create Secure Account & Launch'}
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Already registered?{' '}
            <button onClick={() => setActivePage('login')} className="text-brand-600 font-bold hover:underline">
              Sign In with Password
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
