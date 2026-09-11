import React from 'react';
import { GraduationCap, Heart, Sparkles, ExternalLink, Shield } from 'lucide-react';

export const Footer = ({ setActivePage }) => {
  return (
    <footer className="bg-[#161616] text-[#D3C3B9] pt-12 pb-8 border-t border-[#3D4D55] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#B58863] flex items-center justify-center text-[#102A38] shadow-md">
                <GraduationCap className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#D3C3B9] font-display">
                Skill<span className="text-[#B58863]">Bridge</span>
              </span>
            </div>
            <p className="text-xs text-[#A79E9C] leading-relaxed">
              Transforming academic talent into high-impact industry careers through dynamic skill-gap mapping, tailored open-access learning, and verified feedback loops.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#B58863] bg-[#102A38] border border-[#3D4D55] px-3 py-1.5 rounded-lg w-fit">
              <span className="w-2 h-2 rounded-full bg-[#B58863] animate-pulse" />
              Continuous Academia-Industry Ecosystem
            </div>
          </div>

          {/* Col 2: For Students */}
          <div>
            <h4 className="text-sm font-semibold text-[#D3C3B9] uppercase tracking-wider mb-3">For Students</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('skill-gap')} className="text-[#A79E9C] hover:text-[#B58863] transition-colors">
                  AI Skill Gap Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('learning-resources')} className="text-[#A79E9C] hover:text-[#B58863] transition-colors">
                  Free Curated Learning Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('internships')} className="text-[#A79E9C] hover:text-[#B58863] transition-colors">
                  High-Match Internships
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('student-profile')} className="text-[#A79E9C] hover:text-[#B58863] transition-colors">
                  Verified Skill Profile & Resume
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Colleges & Industry */}
          <div>
            <h4 className="text-sm font-semibold text-[#D3C3B9] uppercase tracking-wider mb-3">Colleges & Industry</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('college-analytics')} className="text-[#A79E9C] hover:text-[#B58863] transition-colors">
                  Department Skill Gap Analytics
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('workshops')} className="text-[#A79E9C] hover:text-[#B58863] transition-colors">
                  Targeted Training Workshops
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('student-search')} className="text-[#A79E9C] hover:text-[#B58863] transition-colors">
                  Skill-Filtered Candidate Search
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('company-feedback')} className="text-[#A79E9C] hover:text-[#B58863] transition-colors">
                  7-Factor Internship Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div>
            <h4 className="text-sm font-semibold text-[#D3C3B9] uppercase tracking-wider mb-3">Platform & Trends</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('industry-trends')} className="text-[#A79E9C] hover:text-[#B58863] transition-colors">
                  2026 Industry Skill Trends
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="text-[#A79E9C] hover:text-[#B58863] transition-colors">
                  Ecosystem Architecture
                </button>
              </li>
              <li>
                <span className="text-[#A79E9C]/70">Curated Free Resources: YouTube, FreeCodeCamp, GeeksforGeeks, W3Schools, Docs</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-[#3D4D55] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A79E9C] gap-4">
          <p>© 2026 SkillBridge Platform. Built for Next-Gen Academia-Industry Synergy.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#D3C3B9]">
              <Shield className="w-3.5 h-3.5 text-[#B58863]" />
              Role-Based Access Verified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
