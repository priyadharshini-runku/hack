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
  const { loginWithCredentials, loginInstitution } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (role === 'college') {
      if (!email.trim()) {
        setErrorMsg('Please enter your Registered Institution Email.');
        return;
      }
      if (!password) {
        setErrorMsg('Please enter your Institution Password.');
        return;
      }

      setSubmitting(true);
      const result = await loginInstitution(email.trim().toLowerCase(), password);
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

  const handleQuickFillInstitution = (instEmail, instPwd) => {
    setRole('college');
    setEmail(instEmail);
    setPassword(instPwd);
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
      <div className="max-w-lg w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl text-slate-900">
        
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
              ? 'Authorized Institution Administrator Access' 
              : 'Secure password-authenticated access for Students, Recruiters & Admin'}
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
                { id: 'college', label: '🏛️ Institution' },
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

          {/* INSTITUTION AUTHENTICATION FIELDS */}
          {role === 'college' ? (
            <div className="space-y-3.5 p-4 rounded-2xl bg-brand-50/50 border border-brand-200">
              <div className="flex items-center justify-between text-xs font-bold text-brand-900">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-brand-600" />
                  Institution Sign In
                </span>
                <span className="text-[10px] bg-brand-100 text-brand-800 px-2 py-0.5 rounded font-semibold">
                  Admin Provisioned
                </span>
              </div>

              {/* Registered Institution Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  REGISTERED INSTITUTION EMAIL
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="Enter institution email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium text-slate-900 placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Institution Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    INSTITUTION PASSWORD
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Secure SHA-256</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium text-slate-900 placeholder:text-slate-400 tracking-wider"
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
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium text-slate-900 placeholder:text-slate-400"
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
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium text-slate-900 placeholder:text-slate-400 tracking-wider"
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
            {submitting ? 'Verifying...' : role === 'college' ? 'Sign In as Institution' : 'Sign In with Password'}
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
                  onClick={() => handleQuickFillInstitution('apex.institution@gmail.com', 'ApexInst#2026')}
                  className="p-2 bg-white hover:bg-brand-50 rounded-lg border border-brand-200 text-left font-medium"
                >
                  🏛️ <strong className="text-slate-800">Apex (INST001):</strong> Apex Tech
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFillInstitution('iitb.institution@gmail.com', 'IITBInst#2026')}
                  className="p-2 bg-white hover:bg-brand-50 rounded-lg border border-brand-200 text-left font-medium"
                >
                  🏛️ <strong className="text-slate-800">IIT Bombay (INST002):</strong> IITB
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => handleQuickFillInstitution('anna.institution@gmail.com', 'AnnaInst#2026')}
                  className="p-2 bg-white hover:bg-brand-50 rounded-lg border border-slate-200 text-left font-medium"
                >
                  🏛️ <strong className="text-slate-800">Anna Univ (INST003):</strong> AU-CEG
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFillInstitution('bits.institution@gmail.com', 'BITSInst#2026')}
                  className="p-2 bg-white hover:bg-brand-50 rounded-lg border border-slate-200 text-left font-medium"
                >
                  🏛️ <strong className="text-slate-800">BITS Pilani (INST004):</strong> BITS
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

        {/* Footer: Do NOT show registration option for Institution */}
        {role !== 'college' ? (
          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              Don't have an account yet?{' '}
              <button onClick={() => setActivePage('register')} className="text-brand-600 font-bold hover:underline">
                Create Secure Account
              </button>
            </p>
          </div>
        ) : (
          <div className="text-center pt-2">
            <p className="text-xs text-slate-400">
              No self-registration. Institution accounts are provisioned exclusively by Platform Admin.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
