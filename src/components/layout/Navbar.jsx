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
  ChevronDown,
  Sparkles
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
          { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Compass, highlight: true },
          { id: 'learning-resources', label: 'Learning Hub', icon: BookOpen },
          { id: 'internships', label: 'Internships & Jobs', icon: Briefcase },
          { id: 'application-tracking', label: 'Applications & Reviews', icon: FileCheck },
          { id: 'industry-trends', label: 'Skill Trends', icon: TrendingUp },
        ];
      case 'college':
        return [
          { id: 'college-dashboard', label: 'Institution Overview', icon: School },
          { id: 'college-analytics', label: 'Skill Gap Analytics', icon: BarChart3, highlight: true },
          { id: 'workshops', label: 'Workshops & Training', icon: Award },
          { id: 'student-roster', label: 'Student Directory', icon: Users },
          { id: 'industry-trends', label: 'Industry Trends', icon: TrendingUp },
        ];
      case 'company':
        return [
          { id: 'company-dashboard', label: 'Industry Dashboard', icon: Building2 },
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

  return (
    <header className="sticky top-0 z-30 bg-[#102A38]/95 backdrop-blur-md border-b border-[#3D4D55] text-[#D3C3B9] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div
            onClick={() => setActivePage(user.role === 'student' ? 'student-dashboard' : user.role === 'college' ? 'college-dashboard' : user.role === 'company' ? 'company-dashboard' : 'admin-dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#B58863] flex items-center justify-center text-[#161616] shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-[#D3C3B9] font-display">
                  Skill<span className="text-[#B58863]">Bridge</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-[#3D4D55] text-[#D3C3B9] rounded-md border border-[#B58863]/30">
                  Portal
                </span>
              </div>
              <p className="text-[10px] text-[#A79E9C] font-medium tracking-wide">Academia · Industry · Placement</p>
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
                      ? 'bg-[#3D4D55] text-[#D3C3B9] font-semibold border-b-2 border-[#B58863]'
                      : item.highlight
                      ? 'text-[#B58863] hover:bg-[#3D4D55]/60 font-semibold'
                      : 'text-[#A79E9C] hover:text-[#D3C3B9] hover:bg-[#3D4D55]/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#B58863]' : 'text-[#A79E9C]'}`} />
                  <span>{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B58863] animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions & User Pill */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => setActivePage('login')}
              className="text-xs font-semibold px-3 py-1.5 text-[#D3C3B9] hover:text-[#B58863] hover:bg-[#3D4D55]/60 rounded-lg transition-colors border border-[#3D4D55]"
            >
              Sign In
            </button>
            <button
              onClick={() => setActivePage('register')}
              className="text-xs font-bold px-3 py-1.5 bg-[#B58863] hover:bg-[#996f4c] text-[#161616] rounded-lg shadow-xs transition-colors"
            >
              Register
            </button>

            {/* Role Badge */}
            <div className="px-2.5 py-1 rounded-full text-xs font-semibold border border-[#B58863]/40 bg-[#3D4D55] text-[#D3C3B9] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B58863] animate-pulse" />
              <span>
                {user.role === 'college'
                  ? `Institution (${user.institutionId || 'INST'})`
                  : user.role === 'company'
                  ? 'Industry View'
                  : user.role === 'admin'
                  ? 'Admin View'
                  : 'Student View'}
              </span>
            </div>

            {/* Profile Avatar Pill */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#3D4D55] border border-[#3D4D55] transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-[#B58863]"
                />
                <span className="text-xs font-semibold text-[#D3C3B9] max-w-[110px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#A79E9C]" />
              </button>

              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-[#102A38] rounded-xl shadow-xl border border-[#3D4D55] py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-[#3D4D55]">
                    <p className="text-xs text-[#A79E9C]">Signed in as</p>
                    <p className="text-sm font-semibold text-[#D3C3B9] truncate">{user.name}</p>
                    <p className="text-xs text-[#B58863] font-medium">
                      {user.role === 'college'
                        ? `INSTITUTION (${user.institutionId || 'INST001'})`
                        : user.role === 'company'
                        ? 'INDUSTRY'
                        : user.role.toUpperCase()}
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => setActivePage('landing')}
                      className="w-full text-left px-4 py-2 text-xs text-[#D3C3B9] hover:bg-[#3D4D55] flex items-center gap-2"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-[#A79E9C]" />
                      Public Landing Page
                    </button>
                    <button
                      onClick={() => setActivePage('about')}
                      className="w-full text-left px-4 py-2 text-xs text-[#D3C3B9] hover:bg-[#3D4D55] flex items-center gap-2"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#A79E9C]" />
                      About SkillBridge
                    </button>
                    <div className="border-t border-[#3D4D55] my-1"></div>
                    <button
                      onClick={() => setActivePage('login')}
                      className="w-full text-left px-4 py-2 text-xs text-[#B58863] hover:bg-[#3D4D55] flex items-center gap-2 font-semibold"
                    >
                      <User className="w-3.5 h-3.5 text-[#B58863]" />
                      Sign In / Switch Role
                    </button>
                    <button
                      onClick={() => setActivePage('register')}
                      className="w-full text-left px-4 py-2 text-xs text-[#D3C3B9] hover:bg-[#3D4D55] flex items-center gap-2 font-semibold"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#B58863]" />
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
              className="p-2 rounded-lg text-[#D3C3B9] hover:bg-[#3D4D55]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#3D4D55] bg-[#102A38] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="py-2 px-3 mb-2 bg-[#3D4D55]/60 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={user.avatar} className="w-8 h-8 rounded-full ring-1 ring-[#B58863]" alt="" />
              <div>
                <p className="text-sm font-semibold text-[#D3C3B9]">{user.name}</p>
                <p className="text-xs text-[#A79E9C] capitalize">
                  {user.role === 'company' ? 'Industry Account' : `${user.role} Account`}
                </p>
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
                    ? 'bg-[#3D4D55] text-[#D3C3B9] font-bold border-l-4 border-[#B58863]'
                    : 'text-[#D3C3B9] hover:bg-[#3D4D55]/60'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#B58863]' : 'text-[#A79E9C]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-[#3D4D55]">
            <button
              onClick={() => handleNavClick('login')}
              className="py-2 rounded-xl bg-[#3D4D55] text-[#D3C3B9] font-semibold text-xs text-center border border-[#3D4D55]"
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavClick('register')}
              className="py-2 rounded-xl bg-[#B58863] text-[#161616] font-bold text-xs text-center"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
