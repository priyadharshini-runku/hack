import React from 'react';
import { 
  GraduationCap, 
  School, 
  Building2, 
  Compass, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Repeat
} from 'lucide-react';

export const AboutPage = ({ setActivePage }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in duration-300 bg-[#102A38] text-[#D3C3B9]">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D4D55] text-[#D3C3B9] text-xs font-bold border border-[#B58863]/30">
          <Sparkles className="w-4 h-4 text-[#B58863]" />
          The Vision Behind SkillBridge
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#D3C3B9] font-display tracking-tight">
          Closing the Great Campus–Industry Divide
        </h1>
        <p className="text-[#A79E9C] text-base sm:text-lg leading-relaxed">
          Traditional higher education often leaves students guessing what skills employers need, while colleges lack real-time visibility into modern tech stacks. SkillBridge builds a continuous, verified feedback loop connecting Students, Colleges, and Industry.
        </p>
      </div>

      {/* The Core Flywheel Architecture */}
      <div className="bg-[#161616] text-[#D3C3B9] rounded-3xl p-8 sm:p-12 space-y-8 border border-[#3D4D55]">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B58863]">Continuous 360° Flywheel</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#D3C3B9]">How the Ecosystem Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          
          <div className="bg-[#102A38] rounded-2xl p-6 border border-[#3D4D55] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#3D4D55] text-[#D3C3B9] flex items-center justify-center font-bold text-xl">
              🎓
            </div>
            <h3 className="text-lg font-bold text-[#D3C3B9] font-display">1. Student Empowerment</h3>
            <p className="text-xs text-[#A79E9C] leading-relaxed">
              Students build verified profiles, run live gap analyses against dream roles (e.g. Software Dev 62% match), and complete free, high-yield learning modules from YouTube and official docs.
            </p>
          </div>

          <div className="bg-[#102A38] rounded-2xl p-6 border border-[#3D4D55] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#3D4D55] text-[#D3C3B9] flex items-center justify-center font-bold text-xl">
              🏛️
            </div>
            <h3 className="text-lg font-bold text-[#D3C3B9] font-display">2. Institution Intelligence</h3>
            <p className="text-xs text-[#A79E9C] leading-relaxed">
              Colleges track department-level gap matrices (e.g. 71% lacking React). Automated triggers recommend specialized bootcamps, updating student readiness and driving placement rates higher.
            </p>
          </div>

          <div className="bg-[#102A38] rounded-2xl p-6 border border-[#3D4D55] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#3D4D55] text-[#D3C3B9] flex items-center justify-center font-bold text-xl">
              🏢
            </div>
            <h3 className="text-lg font-bold text-[#D3C3B9] font-display">3. Industry Verification</h3>
            <p className="text-xs text-[#A79E9C] leading-relaxed">
              Employers post openings with weighted skill criteria, recruit pre-verified candidates, and submit 7-factor structured feedback that auto-verifies skills and closes the loop.
            </p>
          </div>

        </div>
      </div>

      {/* 4 Pillars of Trust */}
      <div className="bg-[#161616] rounded-3xl p-8 sm:p-12 border border-[#3D4D55] shadow-sm space-y-8">
        <h2 className="text-2xl font-bold text-[#D3C3B9] font-display text-center">
          Our Guiding Engineering Principles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#102A38] border border-[#3D4D55] space-y-2">
            <h4 className="font-bold text-[#D3C3B9] text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B58863]" />
              100% Free Open-Access Curriculums
            </h4>
            <p className="text-xs text-[#A79E9C] leading-relaxed">
              We believe quality technical education should never be gated behind paywalls. Every recommended resource comes from community-acclaimed YouTube instructors, freeCodeCamp, GeeksforGeeks, and official documentation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#102A38] border border-[#3D4D55] space-y-2">
            <h4 className="font-bold text-[#D3C3B9] text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B58863]" />
              Verifiable Industry Endorsements
            </h4>
            <p className="text-xs text-[#A79E9C] leading-relaxed">
              Self-reported skills only go so far. When a student completes an internship, structured ratings from verified hiring managers provide trusted signals for future industry employers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#102A38] border border-[#3D4D55] space-y-2">
            <h4 className="font-bold text-[#D3C3B9] text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B58863]" />
              Weighted Skill Match Algorithms
            </h4>
            <p className="text-xs text-[#A79E9C] leading-relaxed">
              Not all skills carry equal weight. High-impact competencies like Data Structures & Algorithms carry 20% impact compared to ancillary tools, providing realistic placement indicators.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#102A38] border border-[#3D4D55] space-y-2">
            <h4 className="font-bold text-[#D3C3B9] text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B58863]" />
              Data-Driven Curriculum Upgrades
            </h4>
            <p className="text-xs text-[#A79E9C] leading-relaxed">
              Colleges no longer need to wait for multi-year syllabus revisions. Real-time gap analytics allow institutions to host 3-day bootcamps to bridge sudden industry demand shifts immediately.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
