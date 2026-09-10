import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DemoSwitcherToolbar } from './components/common/DemoSwitcherToolbar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfile } from './pages/student/StudentProfile';
import { SkillGapAnalysis } from './pages/student/SkillGapAnalysis';
import { SkillBridgeAssessment } from './pages/student/SkillBridgeAssessment';
import { LearningResources } from './pages/student/LearningResources';
import { InternshipListings } from './pages/student/InternshipListings';
import { ApplicationTracking } from './pages/student/ApplicationTracking';

// College Pages
import { CollegeSkillAnalytics } from './pages/college/CollegeSkillAnalytics';
import { WorkshopsManagement } from './pages/college/WorkshopsManagement';
import { StudentRoster } from './pages/college/StudentRoster';

// Company Pages
import { CompanyDashboard } from './pages/company/CompanyDashboard';
import { PostOpportunity } from './pages/company/PostOpportunity';
import { StudentSearch } from './pages/company/StudentSearch';
import { ApplicationManagement } from './pages/company/ApplicationManagement';
import { CompanyFeedbackPage } from './pages/company/CompanyFeedbackPage';

// Shared Pages
import { IndustryTrends } from './pages/IndustryTrends';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function AppContent() {
  const { user } = useAuth();
  
  // Default to student-dashboard if student, college-analytics if college, company-dashboard if company, admin-dashboard if admin
  const getDefaultPage = () => {
    switch (user?.role) {
      case 'college': return 'college-analytics';
      case 'company': return 'company-dashboard';
      case 'admin': return 'admin-dashboard';
      default: return 'landing';
    }
  };

  const [activePage, setActivePage] = useState('landing');

  const renderActivePage = () => {
    switch (activePage) {
      // Public / Marketing
      case 'landing':
        return <LandingPage setActivePage={setActivePage} />;
      case 'about':
        return <AboutPage setActivePage={setActivePage} />;
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'register':
        return <RegisterPage setActivePage={setActivePage} />;

      // Student
      case 'student-dashboard':
        return <StudentDashboard setActivePage={setActivePage} />;
      case 'student-profile':
        return <StudentProfile setActivePage={setActivePage} />;
      case 'skill-gap':
        return <SkillGapAnalysis setActivePage={setActivePage} />;
      case 'assessment':
      case 'career-assessment':
        return <SkillBridgeAssessment setActivePage={setActivePage} />;
      case 'learning-resources':
      case 'manage-resources':
        return <LearningResources />;
      case 'internships':
        return <InternshipListings setActivePage={setActivePage} />;
      case 'application-tracking':
        return <ApplicationTracking />;

      // College
      case 'college-dashboard':
      case 'college-analytics':
        return <CollegeSkillAnalytics setActivePage={setActivePage} />;
      case 'workshops':
        return <WorkshopsManagement />;
      case 'student-roster':
        return <StudentRoster />;

      // Company
      case 'company-dashboard':
        return <CompanyDashboard setActivePage={setActivePage} />;
      case 'post-opportunity':
        return <PostOpportunity setActivePage={setActivePage} />;
      case 'student-search':
        return <StudentSearch />;
      case 'company-applications':
        return <ApplicationManagement setActivePage={setActivePage} />;
      case 'company-feedback':
        return <CompanyFeedbackPage setActivePage={setActivePage} />;

      // Industry Trends & Admin
      case 'industry-trends':
        return <IndustryTrends setActivePage={setActivePage} />;
      case 'admin-dashboard':
        return <AdminDashboard />;

      default:
        return <LandingPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
      {/* 1-Click Persona Switcher for Hackathon Judges */}
      <DemoSwitcherToolbar />

      {/* Responsive Role-Aware Navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page View */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Universal Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
