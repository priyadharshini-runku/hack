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
    <div className="space-y-20 pb-16">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 border-b border-slate-200/60">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold border border-brand-200 shadow-xs">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>Continuous Academia–Industry Skill Mapping</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.15]">
                Bridge the Gap Between <br className="hidden sm:inline" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-600">
                  Campus Skills
                </span> & Industry Needs.
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
                Discover your skill gaps, learn what modern industry demands with free curated resources, find high-match internships, and become 100% placement-ready.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => handleQuickDemo('student', 'usr_student_1', 'skill-gap')}
                  className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center gap-2 hover:scale-[1.02]"
                >
                  <Target className="w-4 h-4" />
                  Analyze Your Skill Gap
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleQuickDemo('student', 'usr_student_1', 'internships')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-300 shadow-sm transition-all flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-brand-600" />
                  Explore Opportunities
                </button>
              </div>

              {/* Quick Persona Launchers */}
              <div className="pt-4 border-t border-slate-200/80">
                <p className="text-xs font-medium text-slate-500 mb-2">Instant 1-Click Role Exploration for Judges & Evaluators:</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <button 
                    onClick={() => handleQuickDemo('student', 'usr_student_1', 'student-dashboard')}
                    className="text-xs px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-lg font-medium flex items-center gap-1.5 transition-colors"
                  >
                    🎓 Student Portal
                  </button>
                  <button 
                    onClick={() => handleQuickDemo('college', 'usr_college_1', 'college-analytics')}
                    className="text-xs px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg font-medium flex items-center gap-1.5 transition-colors"
                  >
                    🏛️ College Analytics
                  </button>
                  <button 
                    onClick={() => handleQuickDemo('company', 'usr_company_1', 'company-dashboard')}
                    className="text-xs px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg font-medium flex items-center gap-1.5 transition-colors"
                  >
                    🏢 Industry Recruiter
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Live Interactive Skill Match Calculator Preview Widget */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-slate-500 ml-2">Live Gap Engine Demo</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                    Interactive
                  </span>
                </div>

                {/* Role Selector */}
                <div className="space-y-3 mb-5">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Select Target Job Role:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {Object.keys(sampleRoles).map(role => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`text-xs p-2 rounded-lg font-medium transition-all text-center truncate ${
                          selectedRole === role
                            ? 'bg-brand-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {role.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Match Percentage Display */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">Current Skill Match</span>
                    <span className={`text-2xl font-extrabold ${matchPercentage >= 75 ? 'text-emerald-600' : matchPercentage >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                      {matchPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        matchPercentage >= 75 ? 'bg-emerald-500' : matchPercentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${matchPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    «“You are {matchPercentage}% matched with the {selectedRole} role. {skillsNeed.length > 0 ? `Learn ${skillsNeed.slice(0, 2).join(', ')} to boost readiness.”` : 'Profile fully aligned!'}»
                  </p>
                </div>

                {/* Skills Breakdown */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Skills You Have ({skillsHave.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsHave.map(s => (
                        <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium flex items-center gap-1">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
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
                          className="text-xs px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-medium hover:bg-amber-100 flex items-center gap-1 group transition-colors"
                          title="Click to learn/add this skill to test live update"
                        >
                          <span className="text-amber-500 group-hover:hidden">⚠</span>
                          <span className="text-emerald-600 hidden group-hover:inline">+</span>
                          {s}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">💡 Click any missing skill above to simulate learning it!</p>
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
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">
            A Unified Ecosystem for Academia & Industry
          </h2>
          <p className="text-slate-600">
            SkillBridge replaces guesswork with verifiable data, continuous feedback loops, and open-access learning paths.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: For Students */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                🎓
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">For Students</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Discover your target role requirements, identify real-time skill gaps, access free curated YouTube and documentation tracks, and land high-match internships.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Dynamic Skill Gap Match % Engine
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Free YouTube, FreeCodeCamp & GFG links
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Company-verified skill credentials
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => handleQuickDemo('student', 'usr_student_1', 'student-dashboard')}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                Launch Student Portal <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: For Colleges */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                🏛️
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">For Colleges</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gain deep department-wise skill analytics. Identify cohort weaknesses and organize targeted bootcamps that directly boost student placement outcomes.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Department & Batch Skill Gap Charts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Automated Workshop Recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Placement readiness tracking
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => handleQuickDemo('college', 'usr_college_1', 'college-analytics')}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                Launch College Analytics <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: For Industry */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                🏢
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">For Industry</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Filter pre-assessed students by verifiable skills and CGPA. Post opportunities, manage pipelines, and submit structured feedback that updates student profiles.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Skill-weighted candidate matching
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  7-Factor Structured Feedback System
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Direct talent pipeline to colleges
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => handleQuickDemo('company', 'usr_company_1', 'company-dashboard')}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                Launch Recruiter Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== THE CONTINUOUS WORKFLOW LOOP ==================== */}
      <section className="bg-slate-900 text-white py-16 rounded-3xl max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-400">Continuous Feedback Architecture</span>
          <h2 className="text-3xl font-extrabold font-display">The SkillBridge Closed Loop</h2>
          <p className="text-slate-400 text-sm">
            How Industry demands, Student learning, College training, and Verified feedback form a self-reinforcing flywheel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 relative">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center mb-4 text-sm">
              01
            </div>
            <h4 className="font-bold text-base mb-2">Industry Defines Requirements</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Companies specify skills & weights (e.g. Java, Python, Docker, Git) required for modern engineering roles.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 relative">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center mb-4 text-sm">
              02
            </div>
            <h4 className="font-bold text-base mb-2">Gap Calculation & Free Learning</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              SkillBridge compares student proficiency with target role benchmark and prescribes free YouTube, Docs, and GFG modules.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 relative">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4 text-sm">
              03
            </div>
            <h4 className="font-bold text-base mb-2">Colleges Run Targeted Bootcamps</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aggregated analytics highlight cohort weaknesses (e.g., 71% lacking React), prompting colleges to schedule specialized workshops.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 relative">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mb-4 text-sm">
              04
            </div>
            <h4 className="font-bold text-base mb-2">Verified Feedback Closes Loop</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              After internships, companies submit structured 7-factor reviews that automatically verify skills on student profiles in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== STATS & CTA ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Ready to eliminate your skill gap today?
            </h3>
            <p className="text-brand-100 text-sm leading-relaxed">
              Join students from leading colleges who are mastering in-demand industry skills and securing dream placements.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleQuickDemo('student', 'usr_student_1', 'skill-gap')}
              className="px-6 py-3 rounded-xl bg-white text-brand-700 font-bold text-sm shadow-md hover:bg-brand-50 transition-all"
            >
              Start Free Skill Assessment
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
