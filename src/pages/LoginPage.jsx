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

    // Student, Industry, Admin Login
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
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#102A38] text-[#D3C3B9] animate-in fade-in duration-300">
      <div className="max-w-lg w-full space-y-6 bg-[#3D4D55] p-8 sm:p-10 rounded-3xl border border-[#3D4D55]/80 shadow-2xl">
        
        {/* Logo & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#B58863] flex items-center justify-center text-[#161616] shadow-md mx-auto">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#D3C3B9] font-display">
            Sign In to <span className="text-[#B58863]">SkillBridge</span>
          </h2>
          <p className="text-xs text-[#A79E9C]">
            {role === 'college' 
              ? 'Authorized Institution Administrator Access' 
              : 'Secure password-authenticated access for Students, Industry & Admin'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-[#102A38] border border-[#B58863]/50 text-[#D3C3B9] text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#B58863] shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Secure Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Role selection */}
          <div>
            <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1.5">
              Select Login Role
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'student', label: '🎓 Student' },
                { id: 'college', label: '🏛️ Institution' },
                { id: 'company', label: '🏢 Industry' },
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
                      ? 'bg-[#B58863] text-[#161616] border-[#B58863] shadow-xs'
                      : 'bg-[#102A38] text-[#D3C3B9] border-[#3D4D55] hover:bg-[#102A38]/70'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* INSTITUTION AUTHENTICATION FIELDS */}
          {role === 'college' ? (
            <div className="space-y-3.5 p-4 rounded-2xl bg-[#102A38] border border-[#B58863]/30">
              <div className="flex items-center justify-between text-xs font-bold text-[#D3C3B9]">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#B58863]" />
                  Institution Sign In
                </span>
                <span className="text-[10px] bg-[#3D4D55] text-[#B58863] px-2 py-0.5 rounded font-semibold border border-[#B58863]/30">
                  Admin Provisioned
                </span>
              </div>

              {/* Registered Institution Email */}
              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  REGISTERED INSTITUTION EMAIL
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A79E9C] absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="Enter institution email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863]/40 focus:border-[#B58863] outline-none bg-[#102A38] font-medium text-[#D3C3B9] placeholder:text-[#A79E9C]"
                    required
                  />
                </div>
              </div>

              {/* Institution Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">
                    INSTITUTION PASSWORD
                  </label>
                  <span className="text-[10px] text-[#A79E9C] font-medium">Secure SHA-256</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#A79E9C] absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863]/40 focus:border-[#B58863] outline-none bg-[#102A38] font-medium text-[#D3C3B9] placeholder:text-[#A79E9C] tracking-wider"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#A79E9C] hover:text-[#D3C3B9]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // STANDARD LOGIN FOR STUDENTS, INDUSTRY, ADMIN
            <div className="space-y-3.5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A79E9C] absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863]/40 focus:border-[#B58863] outline-none bg-[#102A38] font-medium text-[#D3C3B9] placeholder:text-[#A79E9C]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">
                    Account Password
                  </label>
                  <span className="text-[11px] text-[#A79E9C]">Secure SHA-256</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#A79E9C] absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863]/40 focus:border-[#B58863] outline-none bg-[#102A38] font-medium text-[#D3C3B9] placeholder:text-[#A79E9C] tracking-wider"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#A79E9C] hover:text-[#D3C3B9]"
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
            className="w-full py-3 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting 
              ? 'Verifying...' 
              : role === 'college' 
              ? 'Sign In as Institution' 
              : role === 'company'
              ? 'Sign In as Industry'
              : 'Sign In with Password'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Testing Credentials Helper */}
        <div className="p-3.5 rounded-2xl bg-[#102A38] border border-[#3D4D55] text-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-[#D3C3B9] text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B58863]" />
              1-Click Demo Accounts:
            </span>
            <span className="text-[10px] text-[#B58863] font-semibold">Click to prefill</span>
          </div>

          {role === 'college' ? (
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => handleQuickFillInstitution('apex.institution@gmail.com', 'ApexInst#2026')}
                  className="p-2 bg-[#3D4D55] hover:bg-[#3D4D55]/80 rounded-lg border border-[#3D4D55] text-left font-medium text-[#D3C3B9]"
                >
                  🏛️ <strong className="text-white">Apex (INST001):</strong> Apex Tech
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFillInstitution('iitb.institution@gmail.com', 'IITBInst#2026')}
                  className="p-2 bg-[#3D4D55] hover:bg-[#3D4D55]/80 rounded-lg border border-[#3D4D55] text-left font-medium text-[#D3C3B9]"
                >
                  🏛️ <strong className="text-white">IIT Bombay (INST002):</strong> IITB
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => handleQuickFillInstitution('anna.institution@gmail.com', 'AnnaInst#2026')}
                  className="p-2 bg-[#3D4D55] hover:bg-[#3D4D55]/80 rounded-lg border border-[#3D4D55] text-left font-medium text-[#D3C3B9]"
                >
                  🏛️ <strong className="text-white">Anna Univ (INST003):</strong> AU-CEG
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFillInstitution('bits.institution@gmail.com', 'BITSInst#2026')}
                  className="p-2 bg-[#3D4D55] hover:bg-[#3D4D55]/80 rounded-lg border border-[#3D4D55] text-left font-medium text-[#D3C3B9]"
                >
                  🏛️ <strong className="text-white">BITS Pilani (INST004):</strong> BITS
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickFillRole('rahul.sharma@apex.edu', 'student')}
                className="p-1.5 bg-[#3D4D55] hover:bg-[#3D4D55]/80 rounded-lg border border-[#3D4D55] text-left font-medium text-[#D3C3B9] truncate"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickFillRole('recruiting@technova.io', 'company')}
                className="p-1.5 bg-[#3D4D55] hover:bg-[#3D4D55]/80 rounded-lg border border-[#3D4D55] text-left font-medium text-[#D3C3B9] truncate"
              >
                🏢 Industry
              </button>
              <button
                type="button"
                onClick={() => handleQuickFillRole('admin@skillbridge.gov.in', 'admin')}
                className="p-1.5 bg-[#3D4D55] hover:bg-[#3D4D55]/80 rounded-lg border border-[#3D4D55] text-left font-medium text-[#D3C3B9] truncate"
              >
                ⚡ Superadmin
              </button>
            </div>
          )}
        </div>

        {/* Footer: Do NOT show registration option for Institution */}
        {role !== 'college' ? (
          <div className="text-center pt-2">
            <p className="text-xs text-[#A79E9C]">
              Don't have an account yet?{' '}
              <button onClick={() => setActivePage('register')} className="text-[#B58863] font-bold hover:underline">
                Create Secure Account
              </button>
            </p>
          </div>
        ) : (
          <div className="text-center pt-2">
            <p className="text-xs text-[#A79E9C]">
              No self-registration. Institution accounts are provisioned exclusively by Platform Admin.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
