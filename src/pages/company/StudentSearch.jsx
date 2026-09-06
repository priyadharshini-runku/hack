import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  Star, 
  ExternalLink, 
  ChevronRight, 
  Briefcase, 
  Award,
  Sparkles,
  School,
  GraduationCap,
  Building,
  ShieldCheck,
  Send
} from 'lucide-react';
import { SkillBadge } from '../../components/common/SkillBadge';
import { Modal } from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import { INDIAN_COLLEGES, ALL_ENGINEERING_DEPARTMENTS } from '../../data/indianInstitutions';
import confetti from 'canvas-confetti';

export const StudentSearch = () => {
  const { authFetch, showToast } = useAuth();
  const [students, setStudents] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState('All');
  const [searchSkill, setSearchSkill] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [minCGPA, setMinCGPA] = useState(0);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shortlistedMap, setShortlistedMap] = useState({});

  useEffect(() => {
    const fetchTalentPool = async () => {
      try {
        const [studentsRes, oppsRes] = await Promise.all([
          authFetch('/api/students'),
          authFetch('/api/opportunities')
        ]);
        if (studentsRes.ok) setStudents(await studentsRes.json());
        if (oppsRes.ok) setOpportunities(await oppsRes.json());
      } catch (err) {
        console.error('Failed to fetch candidate pool:', err);
      }
    };
    fetchTalentPool();
  }, []);

  const handleShortlist = (student) => {
    setShortlistedMap({ ...shortlistedMap, [student.id]: true });
    confetti({ particleCount: 35, spread: 50 });
    showToast(`Shortlisted ${student.name} for technical interview rounds!`, 'success');
  };

  const selectedOpp = opportunities.find(o => o.id === selectedOpportunityId);

  const filtered = students.filter(s => {
    const sSkills = (s.skills || []).map(sk => sk.name.toLowerCase());
    const matchesSkill = !searchSkill || sSkills.some(sk => sk.includes(searchSkill.toLowerCase()));
    const matchesCollege = selectedCollege === 'All' || (s.collegeName && s.collegeName.toLowerCase().includes(selectedCollege.toLowerCase()));
    const matchesDept = selectedDept === 'All' || (s.department && s.department.toLowerCase().includes(selectedDept.toLowerCase()));
    const matchesCGPA = (s.cgpa || 0) >= minCGPA;
    const matchesVerified = !onlyVerified || (s.skills || []).some(sk => sk.verified);

    // If matching against a specific posted opportunity
    if (selectedOpp && selectedOpp.requiredSkills) {
      const oppSkills = selectedOpp.requiredSkills.map(sk => sk.name.toLowerCase());
      const hasAnyReq = oppSkills.some(req => sSkills.some(sk => sk.includes(req) || req.includes(sk)));
      if (!hasAnyReq) return false;
    }

    return matchesSkill && matchesCollege && matchesDept && matchesCGPA && matchesVerified;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <Users className="w-4 h-4" />
            Cross-Institutional Talent Search Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            Industry Talent Scouting & Skill Match
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Search, filter, and identify top technical talent across all registered engineering colleges in India. Match candidate competencies directly against your active job roles.
          </p>
        </div>

        <div className="bg-emerald-500/15 border border-emerald-500/30 px-4 py-2.5 rounded-2xl text-emerald-300 font-semibold text-xs flex items-center gap-2 shrink-0">
          <ShieldCheck className="w-4 h-4" />
          <span>All Indian Colleges Accessible</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        
        {/* Match against active job role */}
        <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-teal-950 font-bold">
            <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Match Candidates Against Posted Opportunity:</span>
          </div>
          <select
            value={selectedOpportunityId}
            onChange={(e) => setSelectedOpportunityId(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-teal-300 bg-white font-semibold text-slate-800 text-xs outline-none w-full sm:w-80"
          >
            <option value="All">All Candidates (No specific role filter)</option>
            {opportunities.map(opp => (
              <option key={opp.id} value={opp.id}>
                {opp.title} ({opp.requiredSkills?.map(s => s.name).join(', ')})
              </option>
            ))}
          </select>
        </div>

        {/* Multi-criteria filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by skill (e.g. Java, Python, React, SQL)..."
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
            />
          </div>

          <div className="lg:col-span-3">
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-medium text-slate-700"
            >
              <option value="All">All Registered Colleges</option>
              <option value="Apex Institute">Apex Institute of Technology</option>
              <option value="IIT Bombay">IIT Bombay</option>
              <option value="Anna University">Anna University</option>
              <option value="BITS Pilani">BITS Pilani</option>
              <option value="Delhi Technological">DTU Delhi</option>
              <option value="NIT Trichy">NIT Trichy</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-medium text-slate-700"
            >
              <option value="All">All Branches</option>
              <option value="Computer Science">Computer Science (CSE)</option>
              <option value="Information Technology">Information Technology (IT)</option>
              <option value="Artificial Intelligence">AI & Data Science</option>
              <option value="Electronics">Electronics (ECE)</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={minCGPA}
              onChange={(e) => setMinCGPA(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-medium text-slate-700"
            >
              <option value="0">All CGPA</option>
              <option value="8.0">Min 8.0 CGPA</option>
              <option value="8.5">Min 8.5 CGPA</option>
              <option value="9.0">Min 9.0 CGPA</option>
            </select>
          </div>

        </div>
      </div>

      {/* Results Count & Candidates Grid */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing <strong>{filtered.length}</strong> matching candidates</span>
        <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-semibold">
          <input
            type="checkbox"
            checked={onlyVerified}
            onChange={(e) => setOnlyVerified(e.target.checked)}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span>Only show verified test badges</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(student => {
          const isShortlisted = shortlistedMap[student.id];
          const verifiedCount = (student.skills || []).filter(s => s.verified).length;

          return (
            <div key={student.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs" 
                    alt="" 
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 truncate">{student.name}</h3>
                    <p className="text-xs text-slate-500 font-medium truncate">{student.department || 'Engineering'}</p>
                    <div className="flex items-center gap-2 pt-0.5 text-xs">
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded text-[11px]">
                        CGPA: {student.cgpa || 8.5}
                      </span>
                      <span className="text-slate-400 text-[11px] truncate">{student.collegeName}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Job Role</span>
                  <p className="font-bold text-slate-800">{student.targetRoleTitle || 'Software Developer'}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Technical Competencies</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(student.skills || []).slice(0, 4).map(s => (
                      <SkillBadge
                        key={s.name}
                        skill={s.name}
                        level={s.level}
                        verified={s.verified}
                        size="sm"
                      />
                    ))}
                    {(student.skills || []).length > 4 && (
                      <span className="text-[10px] font-semibold text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded-full">
                        +{student.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setSelectedStudent(student);
                    setModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1"
                >
                  Full Profile <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleShortlist(student)}
                  disabled={isShortlisted}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs ${
                    isShortlisted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  }`}
                >
                  {isShortlisted ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Shortlisted
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Shortlist
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <Users className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No candidates match your current filter criteria.</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try broadening your skill keywords, lowering the CGPA threshold, or selecting "All Registered Colleges".
          </p>
        </div>
      )}

      {/* Candidate Profile Dossier Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Candidate Profile: ${selectedStudent?.name}`}>
        {selectedStudent && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <img src={selectedStudent.avatar} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100" alt="" />
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedStudent.name}</h3>
                <p className="text-slate-500">{selectedStudent.department} · {selectedStudent.year}</p>
                <p className="text-emerald-700 font-semibold">{selectedStudent.collegeName} (CGPA: {selectedStudent.cgpa})</p>
                <p className="text-[11px] text-slate-400 pt-0.5">{selectedStudent.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">All Verified Skills & Ratings</h4>
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
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Key Technical Projects</h4>
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

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleShortlist(selectedStudent);
                  setModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20"
              >
                Shortlist Candidate
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
