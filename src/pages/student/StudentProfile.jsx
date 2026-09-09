import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  School, 
  Award, 
  Briefcase, 
  FolderGit2, 
  FileCheck, 
  Plus, 
  Download, 
  CheckCircle2, 
  Star, 
  ExternalLink, 
  Trash2, 
  Edit3,
  Sparkles,
  Layers,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { SkillBadge } from '../../components/common/SkillBadge';
import { Modal } from '../../components/common/Modal';
import confetti from 'canvas-confetti';

export const StudentProfile = ({ setActivePage }) => {
  const { user, profile, authFetch, setUserSession, refreshProfile, showToast } = useAuth();
  const student = profile || user;

  const fileInputRef = useRef(null);

  // Modals state
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  // Form states
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate', category: 'Technical' });
  const [newProject, setNewProject] = useState({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '', credentialUrl: '' });

  // Photo upload from gallery / device
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, JPEG, WEBP)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target.result;
      
      // Update local state and AuthContext
      const updatedStudent = { ...student, avatar: dataUrl };
      const updatedUser = { ...user, avatar: dataUrl };
      setUserSession(updatedUser, updatedStudent);
      
      // Sync with backend
      try {
        await authFetch(`/api/students/${student.id}`, {
          method: 'PUT',
          body: JSON.stringify({ avatar: dataUrl })
        });
        showToast('🎉 Profile photo updated from gallery successfully!', 'success');
        confetti({ particleCount: 35, spread: 50 });
        refreshProfile();
      } catch (err) {
        showToast('Profile photo updated in session!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    try {
      const res = await authFetch(`/api/students/${student.id}/skills`, {
        method: 'POST',
        body: JSON.stringify(newSkill)
      });

      if (res.ok) {
        showToast(`Added ${newSkill.name} (${newSkill.level}) to your profile!`, 'success');
        confetti({ particleCount: 40, spread: 60 });
        setSkillModalOpen(false);
        setNewSkill({ name: '', level: 'Intermediate', category: 'Technical' });
        refreshProfile();
      }
    } catch (err) {
      showToast('Failed to add skill', 'error');
    }
  };

  const handleRemoveSkill = async (skillName) => {
    try {
      const res = await authFetch(`/api/students/${student.id}/skills/${encodeURIComponent(skillName)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        showToast(`Removed ${skillName}`, 'info');
        refreshProfile();
      }
    } catch (err) {
      showToast('Failed to remove skill', 'error');
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const payload = {
      ...newProject,
      technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      const res = await authFetch(`/api/students/${student.id}/projects`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast('Project added to portfolio!', 'success');
        setProjectModalOpen(false);
        setNewProject({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
        refreshProfile();
      }
    } catch (err) {
      showToast('Failed to add project', 'error');
    }
  };

  const handleAddCert = async (e) => {
    e.preventDefault();
    if (!newCert.title.trim()) return;

    try {
      const res = await authFetch(`/api/students/${student.id}/certifications`, {
        method: 'POST',
        body: JSON.stringify(newCert)
      });

      if (res.ok) {
        showToast('Certification added!', 'success');
        setCertModalOpen(false);
        setNewCert({ title: '', issuer: '', date: '', credentialUrl: '' });
        refreshProfile();
      }
    } catch (err) {
      showToast('Failed to add certification', 'error');
    }
  };

  const handlePrintResume = () => {
    window.print();
  };

  const technicalSkills = student.skills?.filter(s => s.category === 'Technical') || [];
  const softSkills = student.skills?.filter(s => s.category === 'Soft') || [];
  const toolSkills = student.skills?.filter(s => s.category === 'Tools') || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300 print:p-0">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden print:border-none print:shadow-none">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()} title="Click to upload profile photo from gallery">
              <img 
                src={student.avatar} 
                alt={student.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md print:w-20 print:h-20 group-hover:opacity-85 transition-opacity" 
              />
              <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold p-1 text-center">
                <Camera className="w-5 h-5 mb-0.5" />
                <span>Upload Photo</span>
              </div>
              <button 
                type="button"
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-md transition-all border-2 border-white"
                title="Upload Photo from Gallery"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">{student.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Profile
                </span>
              </div>

              <p className="text-slate-600 text-sm font-medium">
                {student.department || 'Engineering Department'} · {student.year || 'Academic Year'}
              </p>
              
              <p className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5">
                <span className="font-medium text-slate-700">{student.collegeName || 'Registered Institute'}</span>
                {student.collegeCode && (
                  <span className="px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 font-mono font-bold text-[11px] border border-brand-200">
                    [{student.collegeCode}]
                  </span>
                )}
                {student.district && (
                  <span className="text-slate-400">· 📍 {student.district}</span>
                )}
                {student.batch ? <span>({student.batch})</span> : ''}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                {student.cgpa && (
                  <span className="flex items-center gap-1 font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                    CGPA: {student.cgpa}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {student.email}
                </span>
                {student.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {student.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 print:hidden">
            <button
              onClick={handlePrintResume}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-slate-600" />
              Download / Print Resume
            </button>
            <button
              onClick={() => setSkillModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </button>
          </div>

        </div>

        {/* Bio & Target Role Banner */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-2 space-y-1">
            <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Professional Summary</span>
            <p className="text-slate-700 leading-relaxed">
              {student.bio || 'Enthusiastic undergraduate engineer passionate about building high-performance scalable systems and modern web technologies.'}
            </p>
          </div>
          <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Target Career Path</span>
            <p className="text-slate-800 font-bold text-sm text-brand-700">{student.targetRoleTitle || 'Software Developer'}</p>
            <p className="text-slate-500 text-[11px]">{student.preferredIndustry || (student.targetDomains && student.targetDomains.length > 0 ? student.targetDomains.join(' · ') : student.targetDomain) || 'Enterprise Software & Cloud'}</p>
          </div>
        </div>
      </div>

      {/* Grid: Skills Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" />
              Skills & Proficiency Mapping
            </h2>
            <p className="text-xs text-slate-500">Categorized by proficiency level (Beginner / Intermediate / Advanced)</p>
          </div>
          <button
            onClick={() => setSkillModalOpen(true)}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 print:hidden"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Skill
          </button>
        </div>

        {/* Technical Skills */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Technical Skills & Languages</h3>
          <div className="flex flex-wrap gap-2.5">
            {technicalSkills.map(skill => (
              <SkillBadge
                key={skill.name}
                skill={skill.name}
                level={skill.level}
                verified={skill.verified}
                rating={skill.rating}
                onRemove={() => handleRemoveSkill(skill.name)}
              />
            ))}
            {technicalSkills.length === 0 && (
              <p className="text-xs text-slate-400 italic">No technical skills added yet.</p>
            )}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Soft Skills & Leadership</h3>
          <div className="flex flex-wrap gap-2.5">
            {softSkills.map(skill => (
              <SkillBadge
                key={skill.name}
                skill={skill.name}
                level={skill.level}
                verified={skill.verified}
                rating={skill.rating}
                onRemove={() => handleRemoveSkill(skill.name)}
              />
            ))}
            {softSkills.length === 0 && (
              <p className="text-xs text-slate-400 italic">No soft skills added yet.</p>
            )}
          </div>
        </div>

        {/* Tools & Frameworks */}
        {toolSkills.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-2.5">
              {toolSkills.map(skill => (
                <SkillBadge
                  key={skill.name}
                  skill={skill.name}
                  level={skill.level}
                  verified={skill.verified}
                  rating={skill.rating}
                  onRemove={() => handleRemoveSkill(skill.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid: Projects & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Projects Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-brand-600" />
              Technical Projects ({student.projects?.length || 0})
            </h2>
            <button
              onClick={() => setProjectModalOpen(true)}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 print:hidden"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Project
            </button>
          </div>

          <div className="space-y-4">
            {student.projects?.map(proj => (
              <div key={proj.id || proj.title} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{proj.title}</h3>
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-brand-600 hover:underline flex items-center gap-1">
                      Code <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technologies?.map(tech => (
                    <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Achievements */}
        <div className="space-y-8">
          
          {/* Certifications */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Certifications ({student.certifications?.length || 0})
              </h2>
              <button
                onClick={() => setCertModalOpen(true)}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 print:hidden"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Cert
              </button>
            </div>

            <div className="space-y-3">
              {student.certifications?.map(cert => (
                <div key={cert.id || cert.title} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{cert.title}</h4>
                    <p className="text-[11px] text-slate-500">{cert.issuer} · {cert.date}</p>
                  </div>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-xs text-brand-600 hover:underline flex items-center gap-1">
                      Verify <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Internships & Verified Feedback */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" />
              Verified Internships
            </h2>

            {student.internships?.map(intern => (
              <div key={intern.id} className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900">{intern.role}</h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified by Company
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{intern.company} · {intern.duration}</p>
                <p className="text-xs text-slate-600">{intern.description}</p>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ==================== MODALS ==================== */}

      {/* Add Skill Modal */}
      <Modal isOpen={skillModalOpen} onClose={() => setSkillModalOpen(false)} title="Add Skill to Profile">
        <form onSubmit={handleAddSkill} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Skill Name</label>
            <input
              type="text"
              placeholder="e.g. React, Docker, Kubernetes, Communication"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Proficiency Level</label>
              <select
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white"
              >
                <option value="Beginner">Beginner (Fundamentals)</option>
                <option value="Intermediate">Intermediate (Project Ready)</option>
                <option value="Advanced">Advanced (Production Mastery)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Category</label>
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white"
              >
                <option value="Technical">Technical</option>
                <option value="Soft">Soft Skill</option>
                <option value="Tools">Tools & Platforms</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setSkillModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20"
            >
              Save Skill
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Project Modal */}
      <Modal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} title="Add Technical Project">
        <form onSubmit={handleAddProject} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Project Title</label>
            <input
              type="text"
              placeholder="e.g. Distributed Task Queue Engine"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Technologies Used (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Java, Spring Boot, Redis, Docker"
              value={newProject.technologies}
              onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Explain architecture, key features, and problem solved..."
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">GitHub Repo URL</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Live Demo URL</label>
              <input
                type="url"
                placeholder="https://demo.app/..."
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setProjectModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20"
            >
              Add Project
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Certification Modal */}
      <Modal isOpen={certModalOpen} onClose={() => setCertModalOpen(false)} title="Add Certification">
        <form onSubmit={handleAddCert} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Certificate Name</label>
            <input
              type="text"
              placeholder="e.g. AWS Certified Solutions Architect"
              value={newCert.title}
              onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Issuing Authority</label>
              <input
                type="text"
                placeholder="e.g. Amazon Web Services / Oracle"
                value={newCert.issuer}
                onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Issue Date</label>
              <input
                type="text"
                placeholder="e.g. Nov 2025"
                value={newCert.date}
                onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Credential URL</label>
            <input
              type="url"
              placeholder="https://verify.credly.com/..."
              value={newCert.credentialUrl}
              onChange={(e) => setNewCert({ ...newCert, credentialUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setCertModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20"
            >
              Add Certification
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
