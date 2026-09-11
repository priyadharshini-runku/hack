import React, { useState, useEffect } from 'react';
import { 
  FileCheck, 
  Users, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Star, 
  Download, 
  MessageSquare, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

export const ApplicationManagement = ({ setActivePage }) => {
  const { showToast } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/applications');
      if (res.ok) setApplications(await res.json());
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      const res = await fetch(`/api/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          note: `Industry talent team moved candidate to ${newStatus}`
        })
      });

      if (res.ok) {
        if (newStatus === 'Hired' || newStatus === 'Shortlisted') {
          confetti({ particleCount: 40, spread: 60 });
        }
        showToast(`Candidate status updated to "${newStatus}"!`, 'success');
        fetchApplications();
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <FileCheck className="w-4 h-4" />
            Industry Candidate Pipeline
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            Application Pipeline & Stage Management
          </h1>
          <p className="text-emerald-100 text-sm max-w-2xl">
            Review incoming candidate portfolios, inspect skill match scores, advance applicants through interview stages, and issue offers.
          </p>
        </div>
      </div>

      {/* Applications Pipeline Grid */}
      <div className="space-y-6">
        {applications.map(app => (
          <div key={app.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <img src={app.studentAvatar} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100" alt="" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{app.studentName}</h3>
                  <p className="text-xs text-slate-500">{app.studentDepartment} (CGPA: {app.studentCGPA})</p>
                  <p className="text-[11px] text-slate-400">Applied on {new Date(app.appliedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                  {app.matchScore}% Skill Match
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-100 text-slate-700">
                  {app.status}
                </span>
              </div>
            </div>

            {/* Cover statement */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Candidate Statement of Interest</span>
              <p className="text-slate-700 leading-relaxed italic">
                “{app.coverNote || 'Looking forward to contributing backend microservices engineering skills to the TechNova team.'}”
              </p>
            </div>

            {/* Pipeline Stage Transitions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Move Stage:</span>
                {['Applied', 'Shortlisted', 'Technical Interview', 'Hired'].map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(app.id, st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      app.status === st
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {app.status === 'Hired' && (
                <button
                  onClick={() => setActivePage('company-feedback')}
                  className="px-4 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 transition-colors flex items-center gap-1.5"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  Submit Internship Feedback
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
