import React, { useState } from 'react';
import { 
  Briefcase, 
  Building2, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  X, 
  DollarSign, 
  Calendar,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

export const PostOpportunity = ({ setActivePage }) => {
  const { showToast } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    type: 'Internship',
    category: 'Software Engineering',
    workMode: 'Hybrid',
    location: 'Bangalore, India',
    stipend: '₹25,000 / month',
    duration: '6 Months',
    openings: 3,
    eligibility: 'B.Tech / M.Tech (CS, IT, AI-DS) with CGPA >= 7.5',
    deadline: '2026-10-30',
    description: '',
    requiredSkills: [
      { name: 'Java', level: 'Intermediate', isMandatory: true },
      { name: 'Python', level: 'Intermediate', isMandatory: true },
      { name: 'SQL', level: 'Intermediate', isMandatory: true }
    ],
    perks: ['Pre-Placement Offer (PPO) Opportunity', 'Mentorship by Staff Engineers', 'Flexible Hours']
  });

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');
  const [newSkillMandatory, setNewSkillMandatory] = useState(true);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    setFormData({
      ...formData,
      requiredSkills: [
        ...formData.requiredSkills,
        { name: newSkillName.trim(), level: newSkillLevel, isMandatory: newSkillMandatory }
      ]
    });
    setNewSkillName('');
  };

  const handleRemoveSkill = (name) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter(s => s.name !== name)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: 'comp_technova',
          companyName: 'TechNova Solutions',
          companyLogo: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=150&auto=format&fit=crop&q=80',
          ...formData
        })
      });

      if (res.ok) {
        confetti({ particleCount: 50, spread: 60 });
        showToast('Internship opening published live! Students can now see dynamic skill matches.', 'success');
        setActivePage('company-dashboard');
      }
    } catch (err) {
      showToast('Failed to post opportunity', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Briefcase className="w-4 h-4" />
            Employer Opportunity Publisher
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Post Internship or Placement Opening
          </h1>
          <p className="text-emerald-100 text-xs">
            Define role parameters and required skill weights. SkillBridge will dynamically match qualified candidates across partner campuses.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-slate-900">
        
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Opportunity Title</label>
          <input
            type="text"
            placeholder="e.g. Backend Microservices Engineer Intern"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 font-medium"
            >
              <option value="Internship">Internship</option>
              <option value="Full-Time Placement">Full-Time Placement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Work Mode</label>
            <select
              value={formData.workMode}
              onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 font-medium"
            >
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Stipend / CTC</label>
            <input
              type="text"
              placeholder="e.g. ₹25,000 / month"
              value={formData.stipend}
              onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Duration</label>
            <input
              type="text"
              placeholder="e.g. 6 Months"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Location</label>
            <input
              type="text"
              placeholder="e.g. Bangalore, India"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Application Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 font-medium"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Eligibility Criteria</label>
          <input
            type="text"
            placeholder="e.g. B.Tech / M.Tech CS, IT, AI-DS (Pre-final & Final Year, CGPA >= 7.5)"
            value={formData.eligibility}
            onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Role Description & Responsibilities</label>
          <textarea
            rows={3}
            placeholder="Describe candidate expectations, tech stack, and learning outcomes..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
            required
          />
        </div>

        {/* Required Skills Matrix */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Required Skills for Match Engine
          </label>
          
          <div className="flex flex-wrap gap-2">
            {formData.requiredSkills.map(s => (
              <span key={s.name} className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-2xs">
                <span>{s.name} ({s.level})</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(s.name)}
                  className="text-slate-400 hover:text-rose-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          {/* Add skill input row */}
          <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
            <input
              type="text"
              placeholder="Add skill requirement (e.g. Docker, Git, Spring Boot)"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
            />
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white font-semibold text-xs hover:bg-slate-900"
            >
              + Add Skill Requirement
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setActivePage('company-dashboard')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            Publish Opening
          </button>
        </div>

      </form>

    </div>
  );
};
