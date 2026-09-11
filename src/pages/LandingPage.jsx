import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Briefcase, 
  School, 
  Building2, 
  TrendingUp, 
  Users, 
  Award,
  Zap,
  Target,
  BarChart3,
  Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SkillBadge } from '../components/common/SkillBadge';
import confetti from 'canvas-confetti';

export const LandingPage = ({ setActivePage }) => {
  const { switchPersona, showToast } = useAuth();
  
  // Interactive Live Skill Gap Demo on Hero
  const [selectedRole, setSelectedRole] = useState('Software Developer');
  const [testSkills, setTestSkills] = useState(['Java', 'Python', 'SQL']);
  const [newSkillInput, setNewSkillInput] = useState('');

  const sampleRoles = {
    'Software Developer': {
      required: ['Java', 'Python', 'SQL', 'Data Structures', 'Git', 'React', 'Communication'],
      weights: { 'Java': 15, 'Python': 15, 'SQL': 15, 'Data Structures': 20, 'Git': 15, 'React': 10, 'Communication': 10 }
    },
    'Frontend Developer': {
      required: ['JavaScript', 'React', 'HTML/CSS', 'TypeScript', 'Git', 'Tailwind CSS'],
      weights: { 'JavaScript': 25, 'React': 25, 'HTML/CSS': 15, 'TypeScript': 15, 'Git': 10, 'Tailwind CSS': 10 }
    },
    'AI/ML Engineer': {
      required: ['Python', 'Data Structures', 'Machine Learning', 'PyTorch', 'SQL', 'Docker'],
      weights: { 'Python': 25, 'Data Structures': 15, 'Machine Learning': 25, 'PyTorch': 15, 'SQL': 10, 'Docker': 10 }
    }
  };

  const currentRoleData = sampleRoles[selectedRole] || sampleRoles['Software Developer'];
  const skillsHave = currentRoleData.required.filter(s => testSkills.some(ts => ts.toLowerCase() === s.toLowerCase()));
  const skillsNeed = currentRoleData.required.filter(s => !testSkills.some(ts => ts.toLowerCase() === s.toLowerCase()));
  
  const totalWeight = Object.values(currentRoleData.weights).reduce((a, b) => a + b, 0);
  const earnedWeight = skillsHave.reduce((acc, s) => acc + (currentRoleData.weights[s] || 0), 0);
  const matchPercentage = Math.round((earnedWeight / totalWeight) * 100);

  const handleAddTestSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (!testSkills.includes(newSkillInput.trim())) {
      setTestSkills([...testSkills, newSkillInput.trim()]);
      setNewSkillInput('');
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    }
  };

  const handleQuickDemo = (role, personaId, page) => {
    switchPersona(personaId);
    setActivePage(page);
  };

  return (
    <div className="space-y-20 pb-16 bg-[#102A38] text-[#D3C3B9]">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-[#102A38] border-b border-[#3D4D55]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D4D55] text-[#D3C3B9] text-xs font-semibold border border-[#B58863]/30 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#B58863]" />
                <span>Continuous Academia–Industry Skill Mapping</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#D3C3B9] tracking-tight font-display leading-[1.15]">
                Bridge the Gap Between <br className="hidden sm:inline" />
                <span className="text-[#B58863]">
                  Campus Skills
                </span> & Industry Needs.
              </h1>

              <p className="text-lg sm:text-xl text-[#A79E9C] max-w-2xl leading-relaxed">
                Discover your skill gaps, learn what modern industry demands with free curated resources, find high-match internships, and become 100% placement-ready.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => handleQuickDemo('student', 'usr_student_1', 'skill-gap')}
                  className="px-6 py-3.5 rounded-xl bg-[#B58863] hover:bg-[#996f4c] text-[#161616] font-bold text-sm shadow-lg shadow-[#B58863]/20 transition-all flex items-center gap-2 hover:scale-[1.02]"
                >
                  <Target className="w-4 h-4 text-[#161616]" />
                  Analyze Your Skill Gap
                  <ArrowRight className="w-4 h-4 text-[#161616]" />
                </button>

                <button
                  onClick={() => handleQuickDemo('student', 'usr_student_1', 'internships')}
                  className="px-6 py-3.5 rounded-xl bg-[#3D4D55] hover:bg-[#3D4D55]/80 text-[#D3C3B9] font-semibold text-sm border border-[#3D4D55] shadow-sm transition-all flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-[#B58863]" />
                  Explore Opportunities
                </button>
              </div>

              {/* Quick Persona Launchers */}
              <div className="pt-4 border-t border-[#3D4D55]/60">
                <p className="text-xs font-medium text-[#A79E9C] mb-2">Instant 1-Click Role Exploration for Judges & Evaluators:</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <button 
                    onClick={() => handleQuickDemo('student', 'usr_student_1', 'student-dashboard')}
                    className="text-xs px-3 py-1.5 bg-[#3D4D55] hover:bg-[#3D4D55]/80 text-[#D3C3B9] border border-[#3D4D55] rounded-lg font-medium flex items-center gap-1.5 transition-colors"
                  >
                    🎓 Student Portal
                  </button>
                  <button 
                    onClick={() => handleQuickDemo('college', 'usr_college_1', 'college-analytics')}
                    className="text-xs px-3 py-1.5 bg-[#3D4D55] hover:bg-[#3D4D55]/80 text-[#D3C3B9] border border-[#3D4D55] rounded-lg font-medium flex items-center gap-1.5 transition-colors"
                  >
                    🏛️ Institution Analytics
                  </button>
                  <button 
                    onClick={() => handleQuickDemo('company', 'usr_company_1', 'company-dashboard')}
                    className="text-xs px-3 py-1.5 bg-[#3D4D55] hover:bg-[#3D4D55]/80 text-[#D3C3B9] border border-[#3D4D55] rounded-lg font-medium flex items-center gap-1.5 transition-colors"
                  >
                    🏢 Industry Partner
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Live Interactive Skill Match Calculator Preview Widget */}
            <div className="lg:col-span-5">
              <div className="bg-[#161616] rounded-2xl shadow-xl border border-[#3D4D55] p-6 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#3D4D55]/80">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#B58863]" />
                    <div className="w-3 h-3 rounded-full bg-[#A79E9C]" />
                    <div className="w-3 h-3 rounded-full bg-[#3D4D55]" />
                    <span className="text-xs font-semibold text-[#A79E9C] ml-2">Live Gap Engine Demo</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#3D4D55] text-[#D3C3B9] border border-[#B58863]/30">
                    Interactive
                  </span>
                </div>

                {/* Role Selector */}
                <div className="space-y-3 mb-5">
                  <label className="text-xs font-semibold text-[#A79E9C] uppercase tracking-wider">Select Target Job Role:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {Object.keys(sampleRoles).map(role => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`text-xs p-2 rounded-lg font-medium transition-all text-center truncate ${
                          selectedRole === role
                            ? 'bg-[#B58863] text-[#161616] font-bold shadow-sm'
                            : 'bg-[#3D4D55] text-[#D3C3B9] hover:bg-[#3D4D55]/80'
                        }`}
                      >
                        {role.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Match Percentage Display */}
                <div className="p-4 rounded-xl bg-[#3D4D55]/50 border border-[#3D4D55] mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#D3C3B9]">Current Skill Match</span>
                    <span className="text-2xl font-extrabold text-[#B58863]">
                      {matchPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-[#102A38] rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="h-2.5 rounded-full transition-all duration-500 bg-[#B58863]"
                      style={{ width: `${matchPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#A79E9C] mt-2 italic">
                    «“You are {matchPercentage}% matched with the {selectedRole} role. {skillsNeed.length > 0 ? `Learn ${skillsNeed.slice(0, 2).join(', ')} to boost readiness.”` : 'Profile fully aligned!'}»
                  </p>
                </div>

                {/* Skills Breakdown */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D3C3B9] mb-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B58863]" />
                      <span>Skills You Have ({skillsHave.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsHave.map(s => (
                        <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-[#3D4D55] text-[#D3C3B9] border border-[#3D4D55] font-medium flex items-center gap-1">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A79E9C] mb-2">
                      <AlertTriangle className="w-4 h-4 text-[#B58863]" />
                      <span>Skills You Need ({skillsNeed.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsNeed.map(s => (
                        <button
                          key={s}
                          onClick={() => {
                            setTestSkills([...testSkills, s]);
                            confetti({ particleCount: 25, spread: 50 });
                          }}
                          className="text-xs px-2.5 py-1 rounded-md bg-[#102A38] text-[#D3C3B9] border border-[#3D4D55] font-medium hover:border-[#B58863] flex items-center gap-1 group transition-colors"
                          title="Click to learn/add this skill to test live update"
                        >
                          <span className="text-[#B58863] group-hover:hidden">⚠</span>
                          <span className="text-[#B58863] hidden group-hover:inline">+</span>
                          {s}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-[#A79E9C] mt-1">💡 Click any missing skill above to simulate learning it!</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 3 MAJOR SECTIONS ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold text-[#D3C3B9] font-display">
            A Unified Ecosystem for Academia & Industry
          </h2>
          <p className="text-[#A79E9C]">
            SkillBridge replaces guesswork with verifiable data, continuous feedback loops, and open-access learning paths.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: For Students */}
          <div className="bg-[#161616] rounded-2xl p-8 border border-[#3D4D55] shadow-md hover:border-[#B58863]/50 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#3D4D55] text-[#D3C3B9] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                🎓
              </div>
              <h3 className="text-xl font-bold text-[#D3C3B9] font-display">For Students</h3>
              <p className="text-[#A79E9C] text-sm leading-relaxed">
                Discover your target role requirements, identify real-time skill gaps, access free curated YouTube and documentation tracks, and land high-match internships.
              </p>
              <ul className="space-y-2 text-xs text-[#D3C3B9] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B58863] shrink-0" />
                  Dynamic Skill Gap Match % Engine
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B58863] shrink-0" />
                  Free YouTube, FreeCodeCamp & GFG links
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B58863] shrink-0" />
                  Company-verified skill credentials
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#3D4D55]">
              <button
                onClick={() => handleQuickDemo('student', 'usr_student_1', 'student-dashboard')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#3D4D55] hover:bg-[#3D4D55]/80 text-[#D3C3B9] font-semibold text-sm transition-colors flex items-center justify-center gap-2 border border-[#3D4D55]"
              >
                Launch Student Portal <ArrowRight className="w-4 h-4 text-[#B58863]" />
              </button>
            </div>
          </div>

          {/* Card 2: For Colleges */}
          <div className="bg-[#161616] rounded-2xl p-8 border border-[#3D4D55] shadow-md hover:border-[#B58863]/50 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#3D4D55] text-[#D3C3B9] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                🏛️
              </div>
              <h3 className="text-xl font-bold text-[#D3C3B9] font-display">For Institutions</h3>
              <p className="text-[#A79E9C] text-sm leading-relaxed">
                Gain deep department-wise skill analytics. Identify cohort weaknesses and organize targeted bootcamps that directly boost student placement outcomes.
              </p>
              <ul className="space-y-2 text-xs text-[#D3C3B9] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B58863] shrink-0" />
                  Department & Batch Skill Gap Charts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B58863] shrink-0" />
                  Automated Workshop Recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B58863] shrink-0" />
                  Placement readiness tracking
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#3D4D55]">
              <button
                onClick={() => handleQuickDemo('college', 'usr_college_1', 'college-analytics')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#3D4D55] hover:bg-[#3D4D55]/80 text-[#D3C3B9] font-semibold text-sm transition-colors flex items-center justify-center gap-2 border border-[#3D4D55]"
              >
                Launch Institution Analytics <ArrowRight className="w-4 h-4 text-[#B58863]" />
              </button>
            </div>
          </div>

          {/* Card 3: For Industry */}
          <div className="bg-[#161616] rounded-2xl p-8 border border-[#3D4D55] shadow-md hover:border-[#B58863]/50 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#3D4D55] text-[#D3C3B9] flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                🏢
              </div>
              <h3 className="text-xl font-bold text-[#D3C3B9] font-display">For Industry</h3>
              <p className="text-[#A79E9C] text-sm leading-relaxed">
                Filter pre-assessed students by verifiable skills and CGPA. Post opportunities, manage pipelines, and submit structured feedback that updates student profiles.
              </p>
              <ul className="space-y-2 text-xs text-[#D3C3B9] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B58863] shrink-0" />
                  Skill-weighted candidate matching
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B58863] shrink-0" />
                  7-Factor Structured Feedback System
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B58863] shrink-0" />
                  Direct talent pipeline to colleges
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#3D4D55]">
              <button
                onClick={() => handleQuickDemo('company', 'usr_company_1', 'company-dashboard')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#3D4D55] hover:bg-[#3D4D55]/80 text-[#D3C3B9] font-semibold text-sm transition-colors flex items-center justify-center gap-2 border border-[#3D4D55]"
              >
                Launch Industry Dashboard <ArrowRight className="w-4 h-4 text-[#B58863]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== THE CONTINUOUS WORKFLOW LOOP ==================== */}
      <section className="bg-[#161616] text-[#D3C3B9] py-16 rounded-3xl max-w-7xl mx-auto px-6 sm:px-10 border border-[#3D4D55]">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B58863]">Continuous Feedback Architecture</span>
          <h2 className="text-3xl font-extrabold font-display text-[#D3C3B9]">The SkillBridge Closed Loop</h2>
          <p className="text-[#A79E9C] text-sm">
            How Industry demands, Student learning, College training, and Verified feedback form a self-reinforcing flywheel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#102A38] p-6 rounded-2xl border border-[#3D4D55] relative">
            <div className="w-8 h-8 rounded-full bg-[#3D4D55] text-[#B58863] font-bold flex items-center justify-center mb-4 text-sm border border-[#B58863]/30">
              01
            </div>
            <h4 className="font-bold text-base mb-2 text-[#D3C3B9]">Industry Defines Requirements</h4>
            <p className="text-xs text-[#A79E9C] leading-relaxed">
              Companies specify skills & weights (e.g. Java, Python, Docker, Git) required for modern engineering roles.
            </p>
          </div>

          <div className="bg-[#102A38] p-6 rounded-2xl border border-[#3D4D55] relative">
            <div className="w-8 h-8 rounded-full bg-[#3D4D55] text-[#B58863] font-bold flex items-center justify-center mb-4 text-sm border border-[#B58863]/30">
              02
            </div>
            <h4 className="font-bold text-base mb-2 text-[#D3C3B9]">Gap Calculation & Free Learning</h4>
            <p className="text-xs text-[#A79E9C] leading-relaxed">
              SkillBridge compares student proficiency with target role benchmark and prescribes free YouTube, Docs, and GFG modules.
            </p>
          </div>

          <div className="bg-[#102A38] p-6 rounded-2xl border border-[#3D4D55] relative">
            <div className="w-8 h-8 rounded-full bg-[#3D4D55] text-[#B58863] font-bold flex items-center justify-center mb-4 text-sm border border-[#B58863]/30">
              03
            </div>
            <h4 className="font-bold text-base mb-2 text-[#D3C3B9]">Institutions Run Targeted Bootcamps</h4>
            <p className="text-xs text-[#A79E9C] leading-relaxed">
              Aggregated analytics highlight cohort weaknesses (e.g., 71% lacking React), prompting colleges to schedule specialized workshops.
            </p>
          </div>

          <div className="bg-[#102A38] p-6 rounded-2xl border border-[#3D4D55] relative">
            <div className="w-8 h-8 rounded-full bg-[#3D4D55] text-[#B58863] font-bold flex items-center justify-center mb-4 text-sm border border-[#B58863]/30">
              04
            </div>
            <h4 className="font-bold text-base mb-2 text-[#D3C3B9]">Verified Feedback Closes Loop</h4>
            <p className="text-xs text-[#A79E9C] leading-relaxed">
              After internships, companies submit structured 7-factor reviews that automatically verify skills on student profiles in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== STATS & CTA ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#161616] rounded-3xl p-8 sm:p-12 text-[#D3C3B9] shadow-xl border border-[#3D4D55] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#D3C3B9]">
              Ready to eliminate your skill gap today?
            </h3>
            <p className="text-[#A79E9C] text-sm leading-relaxed">
              Join students from leading colleges who are mastering in-demand industry skills and securing dream placements.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleQuickDemo('student', 'usr_student_1', 'skill-gap')}
              className="px-6 py-3 rounded-xl bg-[#B58863] text-[#161616] font-bold text-sm shadow-md hover:bg-[#996f4c] transition-all"
            >
              Start Free Skill Assessment
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
