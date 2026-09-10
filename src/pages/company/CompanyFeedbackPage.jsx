import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Award, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Send, 
  UserCheck, 
  ThumbsUp,
  Clock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CompanyFeedbackPage = ({ setActivePage }) => {
  const { showToast, refreshProfile } = useAuth();

  const [studentId, setStudentId] = useState('usr_student_1'); // Default to Rahul Sharma
  const [roleTitle, setRoleTitle] = useState('Backend Engineering Intern');
  const [duration, setDuration] = useState('June 2026 - August 2026 (3 Months)');
  
  // 7 Structured Feedback Categories
  const [ratings, setRatings] = useState({
    technicalSkills: 4.5,
    communication: 4.0,
    teamwork: 5.0,
    problemSolving: 4.5,
    timeManagement: 4.2,
    adaptability: 4.8,
    professionalism: 4.9
  });

  const [qualitativeFeedback, setQualitativeFeedback] = useState(
    'Demonstrated outstanding technical curiosity and code discipline. Successfully implemented Java REST endpoints, optimized SQL query plans, and worked effectively with our distributed team.'
  );

  const [verifiedSkills, setVerifiedSkills] = useState({
    Java: true,
    Python: true,
    SQL: true,
    Git: true,
    Teamwork: true
  });

  const [submitting, setSubmitting] = useState(false);

  const handleRatingChange = (category, value) => {
    setRatings({
      ...ratings,
      [category]: Number(value)
    });
  };

  const handleToggleVerifiedSkill = (skill) => {
    setVerifiedSkills({
      ...verifiedSkills,
      [skill]: !verifiedSkills[skill]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const verifiedSkillsList = Object.entries(verifiedSkills)
      .filter(([_, isChecked]) => isChecked)
      .map(([name]) => ({
        name,
        level: 'Advanced',
        rating: ratings.technicalSkills || 4.5
      }));

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          companyId: 'comp_technova',
          companyName: 'TechNova Solutions',
          reviewerName: 'Ananya Mehta (HR & Tech Lead)',
          reviewerTitle: 'Staff Engineering Lead',
          role: roleTitle,
          internshipDuration: duration,
          ratings,
          overallRating: 4.6,
          verifiedSkillsAdded: verifiedSkillsList,
          qualitativeFeedback,
          recommendForHire: true
        })
      });

      if (res.ok) {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
        showToast('Feedback submitted! Verified skills automatically updated on Rahul Sharma’s profile.', 'success');
        refreshProfile();
      }
    } catch (err) {
      showToast('Failed to submit feedback', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = [
    { key: 'technicalSkills', label: 'Technical Skills', desc: 'Code quality, architecture, algorithmic clarity' },
    { key: 'communication', label: 'Communication', desc: 'Clarity in standups, documentation, PR explanations' },
    { key: 'teamwork', label: 'Teamwork', desc: 'Collaboration, peer reviews, willingness to assist' },
    { key: 'problemSolving', label: 'Problem Solving', desc: 'Debugging complex defects, creative solutioning' },
    { key: 'timeManagement', label: 'Time Management', desc: 'Meeting sprint milestones, prioritizing tasks' },
    { key: 'adaptability', label: 'Adaptability', desc: 'Pivoting to new requirements, learning curves' },
    { key: 'professionalism', label: 'Professionalism', desc: 'Workplace ethics, reliability, meeting etiquette' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <Award className="w-4 h-4" />
            Closed-Loop Verification Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Submit Structured Internship Feedback
          </h1>
          <p className="text-emerald-100 text-xs max-w-2xl">
            After an internship is completed, submit structured ratings across 7 key industry dimensions. Your verified feedback dynamically upgrades the student's skill credentials.
          </p>
        </div>
      </div>

      {/* Main Feedback Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        
        {/* Candidate & Internship Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Target Student</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-medium"
            >
              <option value="usr_student_1">Rahul Sharma (Apex Institute - CS)</option>
              <option value="usr_student_2">Priya Patel (Apex Institute - IT)</option>
              <option value="usr_student_3">Amit Verma (Apex Institute - AI&DS)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Internship Title</label>
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Duration Completed</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
              required
            />
          </div>
        </div>

        {/* 7 Factor Rating Sliders / Buttons */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display">
              7 Structured Evaluation Dimensions
            </h3>
            <span className="text-xs text-slate-500">Scale: 1 (Poor) to 5 (Outstanding)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map(({ key, label, desc }) => (
              <div key={key} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{label}</span>
                  <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {ratings[key]} / 5.0 ★
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{desc}</p>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={ratings[key]}
                  onChange={(e) => handleRatingChange(key, e.target.value)}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Verified Skills Endorsements */}
        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Automatically Verify Skills on Student Profile
          </div>
          <p className="text-xs text-emerald-800">
            Select the skills this intern successfully demonstrated in production. Checked skills will receive the verified badge on their resume.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            {Object.keys(verifiedSkills).map(skill => (
              <label 
                key={skill}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                  verifiedSkills[skill]
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={verifiedSkills[skill]}
                  onChange={() => handleToggleVerifiedSkill(skill)}
                  className="hidden"
                />
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{skill} (Verified)</span>
              </label>
            ))}
          </div>
        </div>

        {/* Qualitative Written Commentary */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Qualitative Written Feedback & Recommendations
          </label>
          <textarea
            rows={4}
            value={qualitativeFeedback}
            onChange={(e) => setQualitativeFeedback(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
            required
          />
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
            <ThumbsUp className="w-4 h-4" />
            Candidate Recommended for Full-Time PPO
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {submitting ? 'Submitting & Verifying...' : 'Submit & Update Student Profile'}
          </button>
        </div>

      </form>

    </div>
  );
};
