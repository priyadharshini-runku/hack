import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Clock, 
  Filter,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/common/Modal';
import confetti from 'canvas-confetti';

export const InternshipListings = ({ setActivePage }) => {
  const { user, profile, showToast } = useAuth();
  const student = profile || user;

  const [opportunities, setOpportunities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [appliedMap, setAppliedMap] = useState({});

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const [oppRes, appRes] = await Promise.all([
          fetch('/api/opportunities'),
          fetch(`/api/applications?studentId=${student.id}`)
        ]);

        if (oppRes.ok) {
          const data = await oppRes.json();
          setOpportunities(data);
        }
        if (appRes.ok) {
          const appData = await appRes.json();
          const map = {};
          appData.forEach(a => {
            map[a.opportunityId] = true;
          });
          setAppliedMap(map);
        }
      } catch (err) {
        console.error('Failed to fetch opportunities:', err);
      }
    };

    fetchOpportunities();
  }, [student.id]);

  // Calculate dynamic skill match for each opportunity against current student skills
  const calculateMatch = (opp) => {
    if (!student.skills) return { matchPct: 60, have: [], need: [] };

    const studentSkillsMap = new Map();
    student.skills.forEach(s => studentSkillsMap.set(s.name.toLowerCase(), s));

    const have = [];
    const need = [];

    opp.requiredSkills.forEach(req => {
      if (studentSkillsMap.has(req.name.toLowerCase())) {
        have.push(req.name);
      } else {
        need.push(req.name);
      }
    });

    const total = opp.requiredSkills.length || 1;
    const matchPct = Math.round((have.length / total) * 100);

    return { matchPct, have, need };
  };

  const handleApplyClick = (opp) => {
    setSelectedOpp(opp);
    setCoverNote(`I am excited to apply for the ${opp.title} role at ${opp.companyName}. My coursework at ${student.collegeName || 'Apex Institute'} and practical project portfolio directly align with your requirements.`);
    setApplyModalOpen(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!selectedOpp) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunityId: selectedOpp.id,
          studentId: student.id,
          coverNote,
          resumeUrl: student.resumeUrl || 'https://example.com/resumes/default.pdf'
        })
      });

      if (res.ok) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
        showToast(`Application submitted successfully to ${selectedOpp.companyName}!`, 'success');
        setAppliedMap({ ...appliedMap, [selectedOpp.id]: true });
        setApplyModalOpen(false);
      }
    } catch (err) {
      showToast('Failed to submit application', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.requiredSkills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'All' || opp.type.toLowerCase().includes(selectedType.toLowerCase());
    const matchesMode = selectedWorkMode === 'All' || opp.workMode.toLowerCase() === selectedWorkMode.toLowerCase();
    return matchesSearch && matchesType && matchesMode;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 text-[#D3C3B9] shadow-xl border border-[#3D4D55] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A38] text-[#B58863] text-xs font-semibold border border-[#3D4D55]">
            <Sparkles className="w-4 h-4 text-[#B58863]" />
            AI-Ranked Skill Compatibility
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#D3C3B9]">
            Internships & Placement Openings
          </h1>
          <p className="text-[#A79E9C] text-sm max-w-2xl">
            Explore verified opportunities with live skill match breakdowns. High match rates fast-track your profile for industry shortlisting.
          </p>
        </div>

        <button
          onClick={() => setActivePage('application-tracking')}
          className="px-4 py-2.5 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0"
        >
          View My Applications <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#161616] rounded-2xl p-4 sm:p-6 border border-[#3D4D55] shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#A79E9C] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by role, company, or required skill (e.g. Java, React, AWS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] font-medium text-[#D3C3B9]"
            >
              <option value="All" className="bg-[#102A38] text-[#D3C3B9]">All Opportunity Types</option>
              <option value="Internship" className="bg-[#102A38] text-[#D3C3B9]">Internships Only</option>
              <option value="Placement" className="bg-[#102A38] text-[#D3C3B9]">Full-Time Placements</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] font-medium text-[#D3C3B9]"
            >
              <option value="All" className="bg-[#102A38] text-[#D3C3B9]">All Work Modes</option>
              <option value="Remote" className="bg-[#102A38] text-[#D3C3B9]">Remote</option>
              <option value="Hybrid" className="bg-[#102A38] text-[#D3C3B9]">Hybrid</option>
              <option value="On-site" className="bg-[#102A38] text-[#D3C3B9]">On-site</option>
            </select>
          </div>

        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-6">
        {filtered.map(opp => {
          const { matchPct, have, need } = calculateMatch(opp);
          const isHighMatch = matchPct >= 75;
          const isApplied = appliedMap[opp.id];

          return (
            <div 
              key={opp.id}
              className={`bg-[#161616] rounded-3xl p-6 sm:p-8 border shadow-sm hover:border-[#B58863] transition-all ${
                isHighMatch ? 'border-[#B58863] ring-1 ring-[#B58863]/30' : 'border-[#3D4D55]'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                
                {/* Left details */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#102A38] text-[#B58863] border border-[#3D4D55]">
                      {opp.type}
                    </span>
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#102A38] text-[#D3C3B9] border border-[#3D4D55]">
                      {opp.workMode}
                    </span>
                    <span className="text-xs text-[#A79E9C] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#B58863]" />
                      Deadline: {opp.deadline}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img 
                      src={opp.companyLogo} 
                      alt={opp.companyName} 
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#3D4D55] bg-[#102A38]" 
                    />
                    <div>
                      <h2 className="text-lg font-bold text-[#D3C3B9]">{opp.title}</h2>
                      <p className="text-xs font-semibold text-[#B58863]">{opp.companyName} · {opp.location}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#A79E9C] leading-relaxed max-w-3xl">
                    {opp.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#D3C3B9] pt-1">
                    <span className="font-semibold text-[#B58863] bg-[#102A38] px-2.5 py-1 rounded-lg border border-[#3D4D55]">
                      Stipend: {opp.stipend}
                    </span>
                    <span>Duration: <strong className="text-[#D3C3B9]">{opp.duration}</strong></span>
                    <span>Eligibility: <strong className="text-[#D3C3B9]">{opp.eligibility}</strong></span>
                  </div>
                </div>

                {/* Right: Skill Match Card & Action */}
                <div className="w-full lg:w-80 bg-[#102A38] p-5 rounded-2xl border border-[#3D4D55] space-y-3 shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#A79E9C] uppercase tracking-wider">Skill Compatibility</span>
                    <span className={`text-sm font-extrabold px-2 py-0.5 rounded-md ${
                      isHighMatch ? 'bg-[#B58863] text-[#161616]' : matchPct >= 50 ? 'bg-[#3D4D55] text-[#D3C3B9]' : 'bg-[#161616] text-[#A79E9C]'
                    }`}>
                      {matchPct}% Match
                    </span>
                  </div>

                  {/* Skills Tagged Preview */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex flex-wrap gap-1">
                      {have.map(s => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-[#161616] text-[#B58863] border border-[#B58863]/40 font-medium">
                          ✓ {s}
                        </span>
                      ))}
                      {need.map(s => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-[#161616] text-[#A79E9C] border border-[#3D4D55] font-medium">
                          ⚠ {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#3D4D55]">
                    {isApplied ? (
                      <button
                        disabled
                        className="w-full py-2 px-4 rounded-xl bg-[#3D4D55] text-[#A79E9C] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed border border-[#3D4D55]"
                      >
                        <Check className="w-4 h-4 text-[#B58863]" />
                        Application Submitted
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApplyClick(opp)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        Apply Now <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Apply Modal */}
      <Modal isOpen={applyModalOpen} onClose={() => setApplyModalOpen(false)} title={`Apply to ${selectedOpp?.companyName}`}>
        <form onSubmit={handleSubmitApplication} className="space-y-4">
          <div className="p-4 rounded-xl bg-[#102A38] border border-[#3D4D55] space-y-1">
            <h4 className="text-xs font-bold text-[#D3C3B9]">{selectedOpp?.title}</h4>
            <p className="text-[11px] text-[#B58863]">{selectedOpp?.stipend} · {selectedOpp?.duration} · {selectedOpp?.location}</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
              Applicant Profile Details
            </label>
            <div className="p-3 bg-[#102A38] rounded-xl border border-[#3D4D55] text-xs space-y-1 text-[#D3C3B9]">
              <p><strong className="text-[#A79E9C]">Name:</strong> {student.name}</p>
              <p><strong className="text-[#A79E9C]">College:</strong> {student.collegeName || 'Apex Institute of Technology'} (CGPA: {student.cgpa})</p>
              <p><strong className="text-[#A79E9C]">Verified Skills:</strong> {student.skills?.map(s => s.name).join(', ')}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A79E9C] uppercase tracking-wider mb-1">
              Cover Note & Statement of Interest
            </label>
            <textarea
              rows={4}
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#3D4D55] text-sm focus:ring-2 focus:ring-[#B58863] outline-none bg-[#102A38] text-[#D3C3B9] placeholder:text-[#A79E9C] font-medium"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[#3D4D55]">
            <button
              type="button"
              onClick={() => setApplyModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A79E9C] hover:bg-[#102A38] hover:text-[#D3C3B9] border border-[#3D4D55]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#B58863] hover:bg-[#996f4c] text-[#161616] shadow-md"
            >
              {submitting ? 'Submitting...' : 'Confirm Application'}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
