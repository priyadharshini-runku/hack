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
        return 'bg-[#B58863] text-[#161616] border-[#B58863] font-bold';
      case 'Shortlisted':
      case 'Technical Interview':
        return 'bg-[#102A38] text-[#B58863] border-[#B58863]/40 font-bold';
      case 'Rejected':
        return 'bg-[#102A38] text-[#A79E9C] border-[#3D4D55]';
      default:
        return 'bg-[#102A38] text-[#D3C3B9] border-[#3D4D55]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 text-[#D3C3B9] shadow-xl border border-[#3D4D55] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A38] text-[#B58863] text-xs font-semibold border border-[#3D4D55]">
            <FileCheck className="w-4 h-4 text-[#B58863]" />
            Transparent Application Pipeline
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#D3C3B9]">
            Application Status & Verified Feedback
          </h1>
          <p className="text-[#A79E9C] text-sm max-w-2xl">
            Track your recruitment stages in real time. Completed internships provide structured feedback that dynamically updates your verified skill ratings.
          </p>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-[#D3C3B9] flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#B58863]" />
          Active & Past Applications ({applications.length})
        </h2>

        {applications.map(app => (
          <div key={app.id} className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#3D4D55]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#102A38] text-[#B58863] border border-[#3D4D55] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#D3C3B9]">{app.studentName} Application</h3>
                  <p className="text-xs text-[#A79E9C]">Applied on {new Date(app.appliedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(app.status)}`}>
                  {app.status}
                </span>
                <span className="text-xs font-semibold text-[#D3C3B9] bg-[#102A38] border border-[#3D4D55] px-2.5 py-1 rounded-lg">
                  {app.matchScore}% Skill Match
                </span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">Hiring Pipeline Progress</h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {['Applied', 'Shortlisted', 'Technical Interview', 'Hired'].map((step, idx) => {
                  const isCompleted = app.timeline.some(t => t.status === step) || (app.status === 'Hired' && idx <= 3);
                  return (
                    <div 
                      key={step} 
                      className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                        isCompleted ? 'bg-[#102A38] border-[#B58863]/50 text-[#D3C3B9] font-medium' : 'bg-[#102A38]/40 border-[#3D4D55] text-[#A79E9C]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCompleted ? 'bg-[#B58863] text-[#161616]' : 'bg-[#3D4D55] text-[#D3C3B9]'
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
            <div className="bg-[#102A38] rounded-2xl p-4 border border-[#3D4D55] space-y-2">
              <h5 className="text-[11px] font-bold text-[#A79E9C] uppercase tracking-wider">Activity History</h5>
              <div className="space-y-2">
                {app.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between text-xs text-[#D3C3B9]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B58863]" />
                      <strong className="text-[#B58863]">{item.status}:</strong> <span>{item.note}</span>
                    </div>
                    <span className="text-[10px] text-[#A79E9C]">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ==================== VERIFIED COMPANY FEEDBACK REVIEWS ==================== */}
      <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#3D4D55]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#102A38] text-[#B58863] border border-[#3D4D55] text-xs font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B58863]" />
              Verified Industry Endorsements
            </div>
            <h2 className="text-xl font-bold text-[#D3C3B9]">
              Completed Internship Structured Reviews ({feedbacks.length})
            </h2>
            <p className="text-xs text-[#A79E9C]">
              Evaluated across 7 performance metrics by verified industry engineering managers.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {feedbacks.map(fb => (
            <div key={fb.id} className="p-6 rounded-2xl bg-[#102A38] border border-[#3D4D55] space-y-5">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#3D4D55] text-[#D3C3B9] border border-[#A79E9C]/30 flex items-center justify-center font-bold text-lg">
                    🏢
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#D3C3B9]">{fb.companyName}</h3>
                    <p className="text-xs text-[#A79E9C]">{fb.reviewerName} · {fb.reviewerTitle}</p>
                    <p className="text-[11px] text-[#A79E9C]">{fb.internshipDuration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#161616] border border-[#3D4D55] px-3.5 py-1.5 rounded-xl">
                  <Star className="w-4 h-4 fill-[#B58863] text-[#B58863]" />
                  <span className="text-sm font-extrabold text-[#B58863]">{fb.overallRating} / 5.0</span>
                  <span className="text-xs text-[#A79E9C] font-medium">(Outstanding)</span>
                </div>
              </div>

              {/* 7 Metric Ratings Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {Object.entries(fb.ratings).map(([key, val]) => (
                  <div key={key} className="bg-[#161616] p-2.5 rounded-xl border border-[#3D4D55] text-center space-y-1">
                    <span className="text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider block truncate">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-sm font-extrabold text-[#D3C3B9]">{val} / 5</span>
                  </div>
                ))}
              </div>

              {/* Qualitative Review */}
              <div className="p-4 bg-[#161616] rounded-xl border border-[#3D4D55] space-y-2">
                <span className="text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider">Manager Commentary</span>
                <p className="text-xs text-[#D3C3B9] leading-relaxed italic">
                  “{fb.qualitativeFeedback}”
                </p>
              </div>

              {/* Key strengths & verified badges added */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#A79E9C]">Verified Skills Boosted:</span>
                  {fb.verifiedSkillsAdded?.map(s => (
                    <span key={s.name} className="text-xs px-2.5 py-0.5 rounded-full bg-[#161616] text-[#B58863] font-bold border border-[#B58863]/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#B58863]" /> {s.name} ({s.rating}★)
                    </span>
                  ))}
                </div>

                <div className="text-xs text-[#B58863] font-bold flex items-center gap-1">
                  ✓ Recommended for Direct Hire
                </div>
              </div>

            </div>
          ))}

          {feedbacks.length === 0 && (
            <div className="p-8 text-center text-[#A79E9C] text-xs italic">
              No completed internship reviews yet. Reviews will automatically populate and verify your skills upon internship completion!
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
