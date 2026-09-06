import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  Building2, 
  Star, 
  ExternalLink, 
  Award, 
  MessageSquare, 
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const ApplicationTracking = () => {
  const { user, profile } = useAuth();
  const student = profile || user;

  const [applications, setApplications] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [appRes, fbRes] = await Promise.all([
          fetch(`/api/applications?studentId=${student.id}`),
          fetch(`/api/feedback/student/${student.id}`)
        ]);

        if (appRes.ok) {
          const appData = await appRes.json();
          setApplications(appData);
        }
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          setFeedbacks(fbData);
        }
      } catch (err) {
        console.error('Failed to fetch tracking data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [student.id]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Hired':
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Shortlisted':
      case 'Technical Interview':
        return 'bg-brand-100 text-brand-800 border-brand-300';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
            <FileCheck className="w-4 h-4" />
            Transparent Application Pipeline
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            Application Status & Verified Feedback
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Track your recruitment stages in real time. Completed internships provide structured feedback that dynamically updates your verified skill ratings.
          </p>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-600" />
          Active & Past Applications ({applications.length})
        </h2>

        {applications.map(app => (
          <div key={app.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{app.studentName} Application</h3>
                  <p className="text-xs text-slate-500">Applied on {new Date(app.appliedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(app.status)}`}>
                  {app.status}
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {app.matchScore}% Skill Match
                </span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hiring Pipeline Progress</h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {['Applied', 'Shortlisted', 'Technical Interview', 'Hired'].map((step, idx) => {
                  const isCompleted = app.timeline.some(t => t.status === step) || (app.status === 'Hired' && idx <= 3);
                  return (
                    <div 
                      key={step} 
                      className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                        isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium' : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                      }`}>
                        {idx + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Log Details */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
              <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Activity History</h5>
              <div className="space-y-2">
                {app.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      <strong>{item.status}:</strong> <span>{item.note}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ==================== VERIFIED COMPANY FEEDBACK REVIEWS ==================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Industry Endorsements
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Completed Internship Structured Reviews ({feedbacks.length})
            </h2>
            <p className="text-xs text-slate-500">
              Evaluated across 7 performance metrics by verified industry engineering managers.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {feedbacks.map(fb => (
            <div key={fb.id} className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/20 border border-slate-200 space-y-5">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg">
                    🏢
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{fb.companyName}</h3>
                    <p className="text-xs text-slate-500">{fb.reviewerName} · {fb.reviewerTitle}</p>
                    <p className="text-[11px] text-slate-400">{fb.internshipDuration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-xl">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="text-sm font-extrabold text-amber-900">{fb.overallRating} / 5.0</span>
                  <span className="text-xs text-amber-700 font-medium">(Outstanding)</span>
                </div>
              </div>

              {/* 7 Metric Ratings Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {Object.entries(fb.ratings).map(([key, val]) => (
                  <div key={key} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block truncate">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-sm font-extrabold text-slate-800">{val} / 5</span>
                  </div>
                ))}
              </div>

              {/* Qualitative Review */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Manager Commentary</span>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  “{fb.qualitativeFeedback}”
                </p>
              </div>

              {/* Key strengths & verified badges added */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Verified Skills Boosted:</span>
                  {fb.verifiedSkillsAdded?.map(s => (
                    <span key={s.name} className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {s.name} ({s.rating}★)
                    </span>
                  ))}
                </div>

                <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  ✓ Recommended for Direct Hire
                </div>
              </div>

            </div>
          ))}

          {feedbacks.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs italic">
              No completed internship reviews yet. Reviews will automatically populate and verify your skills upon internship completion!
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
