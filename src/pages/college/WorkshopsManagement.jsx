import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Sparkles, 
  School,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/common/Modal';
import confetti from 'canvas-confetti';

export const WorkshopsManagement = () => {
  const { user, showToast } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [enrolledMap, setEnrolledMap] = useState({});

  const [newWorkshop, setNewWorkshop] = useState({
    title: '',
    targetSkill: '',
    department: 'Computer Science & Engineering',
    targetYear: '3rd Year & 4th Year',
    instructor: '',
    startDate: '2026-09-22',
    endDate: '2026-09-24',
    duration: '3 Days',
    location: 'AIT Main Auditorium & Virtual Stream',
    maxSeats: 150,
    reasonForOrganizing: 'Curriculum skill-gap intervention',
    description: ''
  });

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/workshops');
      if (res.ok) {
        const data = await res.json();
        setWorkshops(data);
      }
    } catch (err) {
      console.error('Failed to fetch workshops:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/workshops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collegeId: 'col_apex',
          ...newWorkshop
        })
      });

      if (res.ok) {
        confetti({ particleCount: 30, spread: 50 });
        showToast('Workshop scheduled successfully!', 'success');
        setModalOpen(false);
        fetchWorkshops();
      }
    } catch (err) {
      showToast('Failed to create workshop', 'error');
    }
  };

  const handleEnroll = (workshopId, title) => {
    setEnrolledMap({ ...enrolledMap, [workshopId]: true });
    confetti({ particleCount: 40, spread: 60 });
    showToast(`You have registered for ${title}!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
            <Award className="w-4 h-4" />
            Targeted Skill Bootcamps
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            College Workshops & Industry Training
          </h1>
          <p className="text-amber-100 text-sm max-w-2xl">
            Proactively eliminate student skill gaps through intensive instructor-led training organized directly in response to industry deficit data.
          </p>
        </div>

        {user.role === 'college' && (
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-white text-amber-900 hover:bg-amber-50 font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-600" />
            New Workshop
          </button>
        )}
      </div>

      {/* Workshop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map(ws => {
          const isEnrolled = enrolledMap[ws.id];
          return (
            <div key={ws.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    ws.status === 'Upcoming' ? 'bg-amber-100 text-amber-800' : ws.status === 'In Progress' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {ws.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{ws.duration}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-display">
                  {ws.title}
                </h3>

                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Gap Intervention:</span>
                  <p className="text-amber-950 font-medium">{ws.reasonForOrganizing}</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <p><strong>Target Skill:</strong> {ws.targetSkill}</p>
                  <p><strong>Department:</strong> {ws.department}</p>
                  <p><strong>Instructor:</strong> {ws.instructor}</p>
                  <p><strong>Dates:</strong> {ws.startDate} to {ws.endDate}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {ws.enrolledCount + (isEnrolled ? 1 : 0)} / {ws.maxSeats} Enrolled
                </span>

                {user.role === 'student' ? (
                  isEnrolled ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled
                    </span>
                  ) : (
                    <button
                      onClick={() => handleEnroll(ws.id, ws.title)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all"
                    >
                      Register Free
                    </button>
                  )
                ) : (
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
                    Active Session
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Workshop Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Data-Driven Training Bootcamp">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Bootcamp Title</label>
            <input
              type="text"
              placeholder="e.g. Modern React 18 & Component Patterns"
              value={newWorkshop.title}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Target Skill</label>
              <input
                type="text"
                placeholder="e.g. React"
                value={newWorkshop.targetSkill}
                onChange={(e) => setNewWorkshop({ ...newWorkshop, targetSkill: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Department</label>
              <select
                value={newWorkshop.department}
                onChange={(e) => setNewWorkshop({ ...newWorkshop, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900 font-medium"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="AI & Data Science">AI & Data Science</option>
                <option value="All Departments">All Departments</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Lead Instructor / Industry Guest</label>
              <input
                type="text"
                placeholder="e.g. Staff Architect at TechNova"
                value={newWorkshop.instructor}
                onChange={(e) => setNewWorkshop({ ...newWorkshop, instructor: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Duration</label>
              <input
                type="text"
                placeholder="e.g. 3 Days (18 Hours)"
                value={newWorkshop.duration}
                onChange={(e) => setNewWorkshop({ ...newWorkshop, duration: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Reason (Skill Gap Context)</label>
            <textarea
              rows={2}
              placeholder="e.g. College gap analytics detected 71% of CS students lacking React frameworks."
              value={newWorkshop.reasonForOrganizing}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, reasonForOrganizing: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 font-medium"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20"
            >
              Launch Workshop
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
