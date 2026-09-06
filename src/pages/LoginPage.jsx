import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  Lock, 
  Mail, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  School, 
  Building2, 
  AlertCircle,
  Award,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { INDIAN_COLLEGES } from '../data/indianInstitutions';

export const LoginPage = ({ setActivePage }) => {
  const { loginWithCredentials, loginFaculty } = useAuth();
  
  const [email, setEmail] = useState('');
  const [facultyIdentifier, setFacultyIdentifier] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('Apex Institute of Technology');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [registeredCollegesList, setRegisteredCollegesList] = useState([]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch('/api/colleges');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setRegisteredCollegesList(data);
            setSelectedCollege(data[0].name);
          }
        }
      } catch (e) {
        console.warn('Backend colleges fetch note:', e);
      }
    };
    fetchColleges();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (role === 'college') {
      if (!facultyIdentifier.trim()) {
        setErrorMsg('Please enter your Faculty Official Email or Employee ID (e.g. FAC-1001).');
        return;
      }
      if (!selectedCollege) {
        setErrorMsg('Please select your registered college.');
        return;
      }
      if (!password) {
        setErrorMsg('Please enter your institution\'s shared Faculty Password.');
        return;
      }

      setSubmitting(true);
      const result = await loginFaculty(facultyIdentifier.trim(), selectedCollege, password);
      setSubmitting(false);

      if (result && result.success) {
        setActivePage('college-analytics');
      } else if (result && result.error) {
        setErrorMsg(result.error);
      }
      return;
    }

    // Student, Recruiter, Admin Login
    if (!email.trim() || !password) {
      setErrorMsg('Please enter both your registered email and account password.');
      return;
    }

    setSubmitting(true);
    const result = await loginWithCredentials(email.trim().toLowerCase(), password, role);
    setSubmitting(false);

    if (result && result.success) {
      if (role === 'student') {
        setActivePage('student-dashboard');
      } else if (role === 'company') {
        setActivePage('company-dashboard');
      } else {
        setActivePage('admin-dashboard');
      }
    } else if (result && result.error) {
      setErrorMsg(result.error);
    }
  };

  const handleQuickFillFaculty = (identifier, colName, sharedPwd) => {
    setRole('college');
    setFacultyIdentifier(identifier);
    setSelectedCollege(colName);
    setPassword(sharedPwd);
    setErrorMsg('');
  };

  const handleQuickFillRole = (demoEmail, demoRole) => {
    setRole(demoRole);
    setEmail(demoEmail);
    setPassword('password123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      <div className="max-w-lg w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        
        {/* Logo & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-md mx-auto">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Sign In to <span className="text-brand-600">SkillBridge</span>
          </h2>
          <p className="text-xs text-slate-500">
            {role === 'college' 
              ? 'Institutional Faculty Authentication with Single Shared Password' 
              : 'Secure password-authenticated access for Students, Colleges & Companies'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Secure Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Role selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Login Role
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'student', label: '🎓 Student' },
                { id: 'college', label: '🏛️ Faculty' },
                { id: 'company', label: '🏢 Recruiter' },
                { id: 'admin', label: '⚡ Admin' }
              ].map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setRole(r.id);
                    setErrorMsg('');
                  }}
                  className={`py-2 px-1.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    role === r.id
                      ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* COLLEGE FACULTY AUTHENTICATION FIELDS */}
          {role === 'college' ? (
            <div className="space-y-3.5 p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-amber-600" />
                  College Faculty Sign In
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
                  1 Password / College
                </span>
              </div>

              {/* Identifier: Email OR Faculty ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Faculty Email or Faculty ID / Employee ID
                </label>
                <div className="relative">
                  <Award className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. suresh.kumar@apex.edu OR FAC-1001"
                    value={facultyIdentifier}
                    onChange={(e) => setFacultyIdentifier(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium"
                    required
                  />
                </div>
              </div>

              {/* College Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Select Registered College
                </label>
                <div className="relative">
                  <select
                    value={selectedCollege}
                    onChange={(e) => setSelectedCollege(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 outline-none bg-white font-bold text-slate-900"
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
              </div>

              {/* Shared Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    College's Shared Faculty Password
                  </label>
                  <span className="text-[10px] text-amber-700 font-semibold">Institutional Key</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter college shared faculty password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium"
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
                <p className="text-[10px] text-slate-500 mt-1">
                  💡 All faculty from your college share this single password configured by Super Admin.
                </p>
              </div>
            </div>
          ) : (
            // STANDARD LOGIN FOR STUDENTS, RECRUITERS, ADMIN
            <div className="space-y-3.5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Account Password
                  </label>
                  <span className="text-[11px] text-slate-400">Secure SHA-256</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
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
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            {submitting ? 'Verifying...' : role === 'college' ? 'Authenticate Faculty Access' : 'Sign In with Password'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Testing Credentials Helper */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-700 text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              1-Click Demo Accounts:
            </span>
            <span className="text-[10px] text-brand-600 font-semibold">Click to prefill</span>
          </div>

          {role === 'college' ? (
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => handleQuickFillFaculty('suresh.kumar@apex.edu', 'Apex Institute of Technology', 'ApexFaculty#2026')}
                  className="p-2 bg-white hover:bg-amber-50 rounded-lg border border-amber-200 text-left font-medium"
                >
                  🏛️ <strong className="text-slate-800">Apex (Email):</strong> Dr. Suresh
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFillFaculty('FAC-1001', 'Apex Institute of Technology', 'ApexFaculty#2026')}
                  className="p-2 bg-white hover:bg-amber-50 rounded-lg border border-amber-200 text-left font-medium"
                >
                  🏛️ <strong className="text-slate-800">Apex (ID):</strong> FAC-1001
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => handleQuickFillFaculty('sunita.rao@iitb.ac.in', 'Indian Institute of Technology Bombay (IIT Bombay)', 'IITBFaculty#2026')}
                  className="p-2 bg-white hover:bg-amber-50 rounded-lg border border-slate-200 text-left font-medium"
                >
                  🏛️ <strong className="text-slate-800">IIT Bombay:</strong> Dr. Sunita
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFillFaculty('m.sundaram@annauniv.edu', 'Anna University (CEG Campus, Chennai)', 'AnnaFaculty#2026')}
                  className="p-2 bg-white hover:bg-amber-50 rounded-lg border border-slate-200 text-left font-medium"
                >
                  🏛️ <strong className="text-slate-800">Anna Univ:</strong> Prof. Sundaram
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickFillRole('rahul.sharma@apex.edu', 'student')}
                className="p-1.5 bg-white hover:bg-brand-50 rounded-lg border border-slate-200 text-left font-medium truncate"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickFillRole('recruiting@technova.io', 'company')}
                className="p-1.5 bg-white hover:bg-brand-50 rounded-lg border border-slate-200 text-left font-medium truncate"
              >
                🏢 Recruiter
              </button>
              <button
                type="button"
                onClick={() => handleQuickFillRole('admin@skillbridge.gov.in', 'admin')}
                className="p-1.5 bg-white hover:bg-brand-50 rounded-lg border border-slate-200 text-left font-medium truncate"
              >
                ⚡ Superadmin
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            {role === 'college' ? 'New faculty member?' : 'Don\'t have an account yet?'}{' '}
            <button onClick={() => setActivePage('register')} className="text-brand-600 font-bold hover:underline">
              {role === 'college' ? 'Register Faculty Profile' : 'Create Secure Account'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
