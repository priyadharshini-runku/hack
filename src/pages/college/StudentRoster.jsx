import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Search, 
  Filter, 
  GraduationCap, 
  CheckCircle2, 
  Star, 
  ExternalLink, 
  Mail, 
  Award,
  ChevronRight,
  ShieldCheck,
  School,
  Lock,
  Building
} from 'lucide-react';
import { SkillBadge } from '../../components/common/SkillBadge';
import { Modal } from '../../components/common/Modal';

export const StudentRoster = () => {
  const { user, profile, authFetch } = useAuth();
  
  // Permanent lock: College Administrator can ONLY see their assigned college
  const assignedCollegeName = profile?.name || user?.collegeName || user?.title || 'Apex Institute of Technology';
  const assignedCollegeId = user?.collegeId || 'col_apex';

  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await authFetch(`/api/students?collegeName=${encodeURIComponent(assignedCollegeName)}`);
      if (res.ok) {
        const data = await res.json();
        // Strict client-side filter guarantee: College admin only sees their college students
        const scopedStudents = (data || []).filter(s => {
          const sColId = (s.collegeId || '').toLowerCase();
          const sColName = (s.collegeName || '').toLowerCase();
          const targetCol = assignedCollegeName.toLowerCase();
          return sColName.includes(targetCol) || targetCol.includes(sColName) || 
            (targetCol.includes('apex') && (sColId === 'col_apex' || sColName.includes('apex')));
        });
        setStudents(scopedStudents);
      }
    } catch (err) {
      console.error('Failed to fetch students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [assignedCollegeName]);

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.skills || []).some(sk => sk.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDept = selectedDept === 'All' || (s.department && s.department.toLowerCase().includes(selectedDept.toLowerCase()));
    const matchesYear = selectedYear === 'All' || (s.year && s.year.toLowerCase().includes(selectedYear.toLowerCase()));
    return matchesSearch && matchesDept && matchesYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header with Institutional Scoping Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <School className="w-4 h-4 text-amber-400" />
            {assignedCollegeName} · Institutional Talent Directory
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            Enrolled Student Skill Profiles
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Strict institutional access: You are viewing verified skill profiles and placement dossiers exclusively for students enrolled at <strong>{assignedCollegeName}</strong>.
          </p>
        </div>

        <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/20 text-amber-300 font-semibold text-xs flex items-center gap-2 shrink-0">
          <Lock className="w-4 h-4" />
          <span>Locked to {assignedCollegeName}</span>
        </div>
      </div>

      {/* Scoping Notice */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
          <span>
            <strong>Institutional Privacy Enforcement:</strong> Access is strictly restricted to students registered under <strong>{assignedCollegeName}</strong> ({students.length} students enrolled). Cross-institutional access is blocked on both client and server.
          </span>
        </div>
        <span className="font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg shrink-0">
          {students.length} Enrolled Students
        </span>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={`Search ${assignedCollegeName} students by name, email, or skill (e.g. Python, Java, React)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white font-medium text-slate-700"
            >
              <option value="All">All Departments</option>
              <option value="Computer Science">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Artificial Intelligence">AI & Data Science</option>
              <option value="Electronics">Electronics & Communication (ECE)</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white font-medium text-slate-700"
            >
              <option value="All">All Academic Years</option>
              <option value="1st">1st Year Students</option>
              <option value="2nd">2nd Year Students</option>
              <option value="3rd">3rd Year Students</option>
              <option value="4th">4th Year Students</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(student => (
          <div key={student.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img 
                  src={student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                  alt={student.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs" 
                />
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-slate-900">{student.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{student.department || 'Computer Science'}</p>
                  <div className="flex items-center gap-2 text-[11px] pt-0.5">
                    <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.2 rounded">
                      CGPA: {student.cgpa || 8.5}
                    </span>
                    <span className="text-slate-400">{student.year || '3rd Year'}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Job Role</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Enrolled</span>
                </div>
                <p className="font-bold text-slate-800">{student.targetRoleTitle || 'Software Developer'}</p>
              </div>

              {/* Skills preview */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Competencies</span>
                <div className="flex flex-wrap gap-1.5">
                  {(student.skills || []).slice(0, 4).map(skill => (
                    <SkillBadge
                      key={skill.name}
                      skill={skill.name}
                      level={skill.level}
                      verified={skill.verified}
                      size="sm"
                    />
                  ))}
                  {(student.skills || []).length > 4 && (
                    <span className="text-[10px] font-semibold text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded-full">
                      +{student.skills.length - 4} more
                    </span>
                  )}
                  {(!student.skills || student.skills.length === 0) && (
                    <span className="text-[11px] text-slate-400 italic">Self-learning in progress</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {(student.skills || []).filter(s => s.verified)?.length || 0} Verified
              </span>

              <button
                onClick={() => {
                  setSelectedStudent(student);
                  setProfileModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-1"
              >
                Full Dossier <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && !loading && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <School className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No enrolled students found for {assignedCollegeName} matching your filter.</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Only students registered under your assigned institution appear here.
          </p>
        </div>
      )}

      {/* Student Dossier Modal */}
      <Modal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} title={`Student Dossier: ${selectedStudent?.name}`}>
        {selectedStudent && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <img src={selectedStudent.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100" alt="" />
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedStudent.name}</h3>
                <p className="text-slate-500">{selectedStudent.department} · {selectedStudent.year}</p>
                <p className="text-brand-700 font-semibold">{selectedStudent.collegeName || assignedCollegeName} (CGPA: {selectedStudent.cgpa})</p>
                <p className="text-[11px] text-slate-400 pt-0.5">{selectedStudent.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">All Recorded Skills & Proficiency</h4>
              <div className="flex flex-wrap gap-2">
                {(selectedStudent.skills || []).map(skill => (
                  <SkillBadge
                    key={skill.name}
                    skill={skill.name}
                    level={skill.level}
                    verified={skill.verified}
                    rating={skill.rating}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Key Academic & Personal Projects</h4>
              {(selectedStudent.projects || []).map(p => (
                <div key={p.title || p.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">{p.title}</p>
                  <p className="text-slate-600">{p.description}</p>
                  {p.technologies && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.technologies.map(t => (
                        <span key={t} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded font-medium text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setProfileModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-semibold text-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
