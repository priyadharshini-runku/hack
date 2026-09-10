import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, 
  Compass, 
  BarChart3, 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  LayoutDashboard, 
  User, 
  Building2, 
  School, 
  ShieldCheck, 
  Menu, 
  X,
  FileCheck,
  Award,
  Users,
  CheckCircle,
  LogOut,
  ChevronDown
} from 'lucide-react';

export const Navbar = ({ activePage, setActivePage }) => {
  const { user, profile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Define nav links per role
  const getNavLinks = () => {
    switch (user.role) {
      case 'student':
        return [
          { id: 'student-dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'student-profile', label: 'My Skill Profile', icon: User },
          { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Compass },
          { id: 'assessment', label: 'Career Assessment', icon: Award, highlight: true },
          { id: 'learning-resources', label: 'Learning Hub', icon: BookOpen },
          { id: 'internships', label: 'Internships & Jobs', icon: Briefcase },
          { id: 'application-tracking', label: 'Applications & Reviews', icon: FileCheck },
          { id: 'industry-trends', label: 'Skill Trends', icon: TrendingUp },
        ];
      case 'college':
        return [
          { id: 'college-dashboard', label: 'College Overview', icon: School },
          { id: 'college-analytics', label: 'Skill Gap Analytics', icon: BarChart3, highlight: true },
          { id: 'workshops', label: 'Workshops & Training', icon: Award },
          { id: 'student-roster', label: 'Student Directory', icon: Users },
          { id: 'industry-trends', label: 'Industry Trends', icon: TrendingUp },
        ];
      case 'company':
        return [
          { id: 'company-dashboard', label: 'Recruiter Dashboard', icon: Building2 },
          { id: 'post-opportunity', label: 'Post Opportunity', icon: Briefcase, highlight: true },
          { id: 'student-search', label: 'Search Candidates', icon: Users },
          { id: 'company-applications', label: 'Manage Applicants', icon: FileCheck },
          { id: 'company-feedback', label: 'Internship Feedback', icon: Award },
          { id: 'industry-trends', label: 'Industry Trends', icon: TrendingUp },
        ];
      case 'admin':
        return [
          { id: 'admin-dashboard', label: 'Platform Admin', icon: ShieldCheck },
          { id: 'manage-resources', label: 'Learning Library', icon: BookOpen },
          { id: 'college-analytics', label: 'College Analytics', icon: BarChart3 },
          { id: 'industry-trends', label: 'Industry Trends', icon: TrendingUp },
        ];
      default:
        return [
          { id: 'landing', label: 'Home', icon: LayoutDashboard },
          { id: 'about', label: 'About Platform', icon: BookOpen },
          { id: 'skill-gap', label: 'Skill Assessment', icon: Compass },
          { id: 'learning-resources', label: 'Learning Resources', icon: BookOpen },
          { id: 'internships', label: 'Internships', icon: Briefcase },
          { id: 'industry-trends', label: 'Industry Trends', icon: TrendingUp },
        ];
    }
  };

  const navLinks = getNavLinks();

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  const roleColors = {
    student: 'bg-sky-50 text-sky-700 border-sky-200',
    college: 'bg-amber-50 text-amber-700 border-amber-200',
    company: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    admin: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => setActivePage(user.role === 'student' ? 'student-dashboard' : user.role === 'college' ? 'college-dashboard' : user.role === 'company' ? 'company-dashboard' : 'admin-dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
                  Skill<span className="text-brand-600">Bridge</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-brand-50 text-brand-700 rounded-md border border-brand-200">
                  Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">Academia · Industry · Placement</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs'
                      : item.highlight
                      ? 'text-brand-600 hover:bg-brand-50/60 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions & User Pill */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => setActivePage('login')}
              className="text-xs font-semibold px-3 py-1.5 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => setActivePage('register')}
              className="text-xs font-semibold px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg shadow-xs transition-colors"
            >
              Register
            </button>

            {/* Role Badge */}
            <div className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${roleColors[user.role]}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span className="capitalize">{user.role} View</span>
            </div>

            {/* Profile Avatar Pill */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300"
                />
                <span className="text-xs font-semibold text-slate-700 max-w-[110px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                    <p className="text-xs text-brand-600 font-medium">{user.role.toUpperCase()}</p>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => setActivePage('landing')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      Public Landing Page
                    </button>
                    <button
                      onClick={() => setActivePage('about')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      About SkillBridge
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => setActivePage('login')}
                      className="w-full text-left px-4 py-2 text-xs text-brand-600 hover:bg-brand-50 flex items-center gap-2 font-semibold"
                    >
                      <User className="w-3.5 h-3.5 text-brand-600" />
                      Sign In / Switch Role
                    </button>
                    <button
                      onClick={() => setActivePage('register')}
                      className="w-full text-left px-4 py-2 text-xs text-emerald-600 hover:bg-emerald-50 flex items-center gap-2 font-semibold"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Register New User
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="py-2 px-3 mb-2 bg-slate-50 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={user.avatar} className="w-8 h-8 rounded-full" alt="" />
              <div>
                <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role} Account</p>
              </div>
            </div>
          </div>

          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('login')}
              className="py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs text-center"
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavClick('register')}
              className="py-2 rounded-xl bg-brand-600 text-white font-semibold text-xs text-center"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
