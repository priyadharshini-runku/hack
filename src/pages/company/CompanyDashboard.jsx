import React, { useState, useEffect } from 'react';
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
  FileCheck
} from 'lucide-react';

export const CompanyDashboard = ({ setActivePage }) => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [oppRes, appRes] = await Promise.all([
          fetch('/api/opportunities'),
          fetch('/api/applications')
        ]);
        if (oppRes.ok) setOpportunities(await oppRes.json());
        if (appRes.ok) setApplications(await appRes.json());
      } catch (err) {
        console.error('Failed to load company dashboard data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <Building2 className="w-4 h-4" />
            TechNova Solutions · Recruiter Command Center
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            Industry Talent Acquisition & Internship Portal
          </h1>
          <p className="text-emerald-100 text-sm max-w-2xl">
            Filter pre-verified students by required skill proficiency. Post internships, manage applicant pipelines, and provide structured feedback to shape future campus curricula.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActivePage('post-opportunity')}
            className="px-5 py-3 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            Post New Opening
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Postings</span>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-extrabold text-slate-900 font-display">{opportunities.length}</span>
            <span className="text-xs text-emerald-600 font-semibold">14 Open Seats</span>
          </div>
          <p className="text-xs text-slate-500">Backend, Frontend & DevOps roles</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Candidate Applications</span>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-extrabold text-brand-600 font-display">{applications.length}</span>
            <span className="text-xs text-brand-600 font-semibold">In Pipeline</span>
          </div>
          <p className="text-xs text-slate-500">Avg Skill Compatibility: 86%</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Interns</span>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-extrabold text-emerald-600 font-display">6</span>
            <span className="text-xs text-emerald-600 font-semibold">Onboarded</span>
          </div>
          <p className="text-xs text-slate-500">From Apex Institute & Partners</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Endorsements</span>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-extrabold text-amber-600 font-display">24</span>
            <span className="text-xs text-slate-500">Submitted</span>
          </div>
          <p className="text-xs text-slate-500">7-Factor Structured Feedback</p>
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Active Postings & Applicant Pipeline */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                Active Openings Posted by TechNova
              </h2>
              <button
                onClick={() => setActivePage('post-opportunity')}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                + Post Opening
              </button>
            </div>

            <div className="space-y-4">
              {opportunities.map(opp => (
                <div key={opp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{opp.title}</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {opp.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{opp.stipend} · {opp.workMode} · {opp.duration}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {opp.requiredSkills.map(s => (
                        <span key={s.name} className="text-[10px] px-1.5 py-0.2 rounded bg-white text-slate-700 border border-slate-200">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActivePage('company-applications')}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 shadow-2xs"
                    >
                      View Applicants
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Quick Actions & Feedback Trigger */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recruiter Actions</h3>
            
            <button
              onClick={() => setActivePage('student-search')}
              className="w-full text-left p-3.5 rounded-2xl hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                  🔍
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Search Students by Skill</p>
                  <p className="text-[10px] text-slate-500">Filter by Java, Python, React, CGPA</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActivePage('company-feedback')}
              className="w-full text-left p-3.5 rounded-2xl hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                  ⭐
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Submit Intern Feedback</p>
                  <p className="text-[10px] text-slate-500">7-factor rating & verified skills</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActivePage('company-applications')}
              className="w-full text-left p-3.5 rounded-2xl hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm">
                  📋
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Review Candidate Pipeline</p>
                  <p className="text-[10px] text-slate-500">Shortlist & release offers</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
