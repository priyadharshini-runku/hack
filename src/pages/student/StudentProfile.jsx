import React, { useState, useEffect, useRef } from 'react';
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
  const [industryFeedbacks, setIndustryFeedbacks] = useState([]);

  useEffect(() => {
    const fetchIndustryFeedbacks = async () => {
      try {
        const res = await authFetch(`/api/industry/feedback/student/${student.id}`);
        if (res.ok) {
          const data = await res.json();
          setIndustryFeedbacks(data);
        } else if (student.recruitmentHistory) {
          setIndustryFeedbacks(student.recruitmentHistory);
        }
      } catch (err) {
        if (student.recruitmentHistory) {
          setIndustryFeedbacks(student.recruitmentHistory);
        }
      }
    };
    if (student?.id) {
      fetchIndustryFeedbacks();
    }
  }, [student?.id, student?.recruitmentHistory]);

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
      <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm relative overflow-hidden print:border-none print:shadow-none">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()} title="Click to upload profile photo from gallery">
              <img 
                src={student.avatar} 
                alt={student.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[#3D4D55] shadow-md print:w-20 print:h-20 group-hover:opacity-85 transition-opacity" 
              />
              <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold p-1 text-center">
                <Camera className="w-5 h-5 mb-0.5" />
                <span>Upload Photo</span>
              </div>
              <button 
                type="button"
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#B58863] hover:bg-[#996f4c] text-[#161616] shadow-md transition-all border-2 border-[#161616]"
                title="Upload Photo from Gallery"
              >
                <Camera className="w-3.5 h-3.5 stroke-[2.5]" />
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
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#D3C3B9] font-display">{student.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#102A38] text-[#B58863] text-xs font-semibold border border-[#3D4D55] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Profile
                </span>
              </div>

              <p className="text-[#D3C3B9] text-sm font-medium">
                {student.department || 'Engineering Department'} · {student.year || 'Academic Year'}
              </p>
              
              <p className="text-xs text-[#A79E9C] flex flex-wrap items-center gap-1.5">
                <span className="font-medium text-[#D3C3B9]">{student.collegeName || 'Registered Institute'}</span>
                {student.collegeCode && (
                  <span className="px-1.5 py-0.5 rounded bg-[#102A38] text-[#B58863] font-mono font-bold text-[11px] border border-[#3D4D55]">
                    [{student.collegeCode}]
                  </span>
                )}
                {student.district && (
                  <span className="text-[#A79E9C]">· 📍 {student.district}</span>
                )}
                {student.batch ? <span>({student.batch})</span> : ''}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#A79E9C] pt-1">
                {student.cgpa && (
                  <span className="flex items-center gap-1 font-semibold text-[#161616] bg-[#B58863] px-2 py-0.5 rounded">
                    CGPA: {student.cgpa}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#A79E9C]" />
                  {student.email}
                </span>
                {student.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#A79E9C]" />
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
              className="px-4 py-2.5 rounded-xl bg-[#3D4D55] hover:bg-[#3D4D55]/80 text-[#D3C3B9] font-semibold text-xs transition-colors flex items-center gap-2 border border-[#3D4D55]"
            >
              <Download className="w-4 h-4 text-[#B58863]" />
              Download / Print Resume
            </button>
            <button
              onClick={() => setSkillModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Add Skill
            </button>
          </div>

        </div>

        {/* Bio & Target Role Banner */}
        <div className="mt-6 pt-6 border-t border-[#3D4D55] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-2 space-y-1">
            <span className="font-semibold text-[#A79E9C] uppercase tracking-wider text-[10px]">Professional Summary</span>
            <p className="text-[#D3C3B9] leading-relaxed">
              {student.bio || 'Enthusiastic undergraduate engineer passionate about building high-performance scalable systems and modern web technologies.'}
            </p>
          </div>
          <div className="space-y-1 bg-[#102A38] p-3 rounded-xl border border-[#3D4D55]">
            <span className="font-semibold text-[#A79E9C] uppercase tracking-wider text-[10px]">Target Career Path</span>
            <p className="text-[#B58863] font-bold text-sm">{student.targetRoleTitle || 'Software Developer'}</p>
            <p className="text-[#A79E9C] text-[11px]">{student.preferredIndustry || (student.targetDomains && student.targetDomains.length > 0 ? student.targetDomains.join(' · ') : student.targetDomain) || 'Enterprise Software & Cloud'}</p>
          </div>
        </div>
      </div>

      {/* Grid: Skills Section */}
      <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#3D4D55]">
          <div>
            <h2 className="text-lg font-bold text-[#D3C3B9] font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B58863]" />
              Skills & Proficiency Mapping
            </h2>
            <p className="text-xs text-[#A79E9C]">Categorized by proficiency level (Beginner / Intermediate / Advanced)</p>
          </div>
          <button
            onClick={() => setSkillModalOpen(true)}
            className="text-xs font-semibold text-[#B58863] hover:underline flex items-center gap-1 print:hidden"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Skill
          </button>
        </div>

        {/* Technical Skills */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">Technical Skills & Languages</h3>
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
              <p className="text-xs text-[#A79E9C] italic">No technical skills added yet.</p>
            )}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">Soft Skills & Leadership</h3>
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
              <p className="text-xs text-[#A79E9C] italic">No soft skills added yet.</p>
            )}
          </div>
        </div>

        {/* Tools & Frameworks */}
        {toolSkills.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">Tools & Technologies</h3>
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
        <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#3D4D55]">
            <h2 className="text-lg font-bold text-[#D3C3B9] font-display flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-[#B58863]" />
              Technical Projects ({student.projects?.length || 0})
            </h2>
            <button
              onClick={() => setProjectModalOpen(true)}
              className="text-xs font-semibold text-[#B58863] hover:underline flex items-center gap-1 print:hidden"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Project
            </button>
          </div>

          <div className="space-y-4">
            {student.projects?.map(proj => (
              <div key={proj.id || proj.title} className="p-4 rounded-2xl bg-[#102A38] border border-[#3D4D55] space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-bold text-[#D3C3B9]">{proj.title}</h3>
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-[#B58863] hover:underline flex items-center gap-1">
                      Code <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-[#A79E9C] leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technologies?.map(tech => (
                    <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-[#3D4D55] text-[#D3C3B9] border border-[#3D4D55] font-medium">
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
          <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#3D4D55]">
              <h2 className="text-lg font-bold text-[#D3C3B9] font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-[#B58863]" />
                Certifications ({student.certifications?.length || 0})
              </h2>
              <button
                onClick={() => setCertModalOpen(true)}
                className="text-xs font-semibold text-[#B58863] hover:underline flex items-center gap-1 print:hidden"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Cert
              </button>
            </div>

            <div className="space-y-3">
              {student.certifications?.map(cert => (
                <div key={cert.id || cert.title} className="p-3.5 rounded-xl bg-[#102A38] border border-[#3D4D55] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#D3C3B9]">{cert.title}</h4>
                    <p className="text-[11px] text-[#A79E9C]">{cert.issuer} · {cert.date}</p>
                  </div>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-xs text-[#B58863] hover:underline flex items-center gap-1">
                      Verify <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Internships & Verified Feedback */}
          <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#D3C3B9] font-display flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#B58863]" />
              Verified Internships
            </h2>

            {student.internships?.map(intern => (
              <div key={intern.id} className="p-4 rounded-2xl bg-[#102A38] border border-[#3D4D55] space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#D3C3B9]">{intern.role}</h3>
                  <span className="text-[10px] font-bold text-[#B58863] bg-[#3D4D55] px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#3D4D55]">
                    <CheckCircle2 className="w-3 h-3" /> Verified by Company
                  </span>
                </div>
                <p className="text-[11px] text-[#A79E9C] font-medium">{intern.company} · {intern.duration}</p>
                <p className="text-xs text-[#A79E9C]">{intern.description}</p>
              </div>
            ))}
          </div>

          {/* Industry Recruitment Feedback & Technical Endorsements */}
          <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#3D4D55]">
              <h2 className="text-lg font-bold text-[#D3C3B9] font-display flex items-center gap-2">
                <Star className="w-5 h-5 text-[#B58863]" />
                Industry Recruitment Feedback & Endorsements
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#102A38] text-[#B58863] border border-[#3D4D55]">
                Verified Evaluations
              </span>
            </div>

            {industryFeedbacks.length === 0 && (!student.recruitmentHistory || student.recruitmentHistory.length === 0) ? (
              <p className="text-xs text-[#A79E9C] py-2">
                No formal recruitment feedback submitted yet. Feedback submitted by industry partners during campus drives will appear here as verified supporting credentials.
              </p>
            ) : (
              <div className="space-y-4">
                {(industryFeedbacks.length > 0 ? industryFeedbacks : (student.recruitmentHistory || [])).map(fb => (
                  <div key={fb.id || fb.submittedAt} className="p-4 rounded-2xl bg-[#102A38] border border-[#3D4D55] space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-[#D3C3B9]">{fb.role}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            fb.status === 'Selected' ? 'bg-[#B58863] text-[#161616]' : 'bg-[#3D4D55] text-[#D3C3B9]'
                          }`}>
                            {fb.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#A79E9C] font-semibold">{fb.companyName}</p>
                      </div>

                      <div className="text-right flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-[#B58863] bg-[#161616] px-2 py-0.5 rounded-lg border border-[#3D4D55]">
                          {fb.technicalPerformance || fb.technicalRating || 5}/5 ★ Tech
                        </span>
                        <span className="text-xs font-extrabold text-[#D3C3B9] bg-[#3D4D55] px-2 py-0.5 rounded-lg border border-[#3D4D55]">
                          {fb.overallPerformance || fb.overallRating || 5}/5 ★ Overall
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider block">Strong Skills Demonstrated:</span>
                      <div className="flex flex-wrap gap-1">
                        {fb.strongSkills?.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-[#3D4D55] text-[#D3C3B9] border border-[#3D4D55] font-semibold">
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {fb.weakSkills?.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider block">Identified Skill Gaps:</span>
                        <div className="flex flex-wrap gap-1">
                          {fb.weakSkills.map(s => (
                            <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-[#161616] text-[#B58863] border border-[#3D4D55]">
                              ⚠ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {fb.areasForImprovement && (
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-[#A79E9C] uppercase tracking-wider block">Areas for Improvement:</span>
                        <p className="text-[11px] text-[#D3C3B9] bg-[#161616] p-2 rounded-lg border border-[#3D4D55]">
                          💡 {fb.areasForImprovement}
                        </p>
                      </div>
                    )}

                    {(fb.comments || fb.feedbackComments) && (
                      <p className="text-xs text-[#D3C3B9] italic bg-[#161616] p-2.5 rounded-xl border border-[#3D4D55] leading-relaxed">
                        "{fb.comments || fb.feedbackComments}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ==================== MODALS ==================== */}

      {/* Add Skill Modal */}
      <Modal isOpen={skillModalOpen} onClose={() => setSkillModalOpen(false)} title="Add Skill to Profile">
        <form onSubmit={handleAddSkill} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#D3C3B9] uppercase tracking-wider mb-1">Skill Name</label>
            <input
              type="text"
              placeholder="e.g. React, Docker, Kubernetes, Communication"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#D3C3B9] uppercase tracking-wider mb-1">Proficiency Level</label>
              <select
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] font-medium"
              >
                <option value="Beginner" className="bg-[#102A38] text-[#D3C3B9]">Beginner (Fundamentals)</option>
                <option value="Intermediate" className="bg-[#102A38] text-[#D3C3B9]">Intermediate (Project Ready)</option>
                <option value="Advanced" className="bg-[#102A38] text-[#D3C3B9]">Advanced (Production Mastery)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#D3C3B9] uppercase tracking-wider mb-1">Category</label>
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] font-medium"
              >
                <option value="Technical" className="bg-[#102A38] text-[#D3C3B9]">Technical</option>
                <option value="Soft" className="bg-[#102A38] text-[#D3C3B9]">Soft Skill</option>
                <option value="Tools" className="bg-[#102A38] text-[#D3C3B9]">Tools & Platforms</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setSkillModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A79E9C] hover:bg-[#3D4D55]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#B58863] hover:bg-[#996f4c] text-[#161616] shadow-md font-bold"
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
            <label className="block text-xs font-bold text-[#D3C3B9] uppercase tracking-wider mb-1">Project Title</label>
            <input
              type="text"
              placeholder="e.g. Distributed Task Queue Engine"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#D3C3B9] uppercase tracking-wider mb-1">Technologies Used (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Java, Spring Boot, Redis, Docker"
              value={newProject.technologies}
              onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#D3C3B9] uppercase tracking-wider mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Explain architecture, key features, and problem solved..."
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#D3C3B9] uppercase tracking-wider mb-1">GitHub Repo URL</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#D3C3B9] uppercase tracking-wider mb-1">Live Demo URL</label>
              <input
                type="url"
                placeholder="https://demo.app/..."
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setProjectModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A79E9C] hover:bg-[#3D4D55]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#B58863] hover:bg-[#996f4c] text-[#161616] shadow-md font-bold"
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
            <label className="block text-xs font-bold text-[#D3C3B9] uppercase tracking-wider mb-1">Certificate Name</label>
            <input
              type="text"
              placeholder="e.g. AWS Certified Solutions Architect"
              value={newCert.title}
              onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#D3C3B9] uppercase tracking-wider mb-1">Issuing Authority</label>
              <input
                type="text"
                placeholder="e.g. Amazon Web Services / Oracle"
                value={newCert.issuer}
                onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#D3C3B9] uppercase tracking-wider mb-1">Issue Date</label>
              <input
                type="text"
                placeholder="e.g. Nov 2025"
                value={newCert.date}
                onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#D3C3B9] uppercase tracking-wider mb-1">Credential URL</label>
            <input
              type="url"
              placeholder="https://verify.credly.com/..."
              value={newCert.credentialUrl}
              onChange={(e) => setNewCert({ ...newCert, credentialUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setCertModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A79E9C] hover:bg-[#3D4D55]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#B58863] hover:bg-[#996f4c] text-[#161616] shadow-md font-bold"
            >
              Add Certification
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
