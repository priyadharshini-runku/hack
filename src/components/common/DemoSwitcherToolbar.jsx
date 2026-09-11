import React from 'react';
import { useAuth, DEMO_PERSONAS } from '../../context/AuthContext';
import { Sparkles, RefreshCw, UserCheck, School, Building2, ShieldCheck } from 'lucide-react';

export const DemoSwitcherToolbar = () => {
  const { user, switchPersona, showToast } = useAuth();

  const handleResetData = async () => {
    try {
      const res = await fetch('/api/system/reset', { method: 'POST' });
      if (res.ok) {
        showToast('Demo data successfully reset to initial seed values!', 'success');
        window.location.reload();
      }
    } catch (err) {
      showToast('Failed to reset demo data', 'error');
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'student': return <UserCheck className="w-3.5 h-3.5 text-cream" />;
      case 'college': return <School className="w-3.5 h-3.5 text-caramel" />;
      case 'company': return <Building2 className="w-3.5 h-3.5 text-caramel-light" />;
      case 'admin': return <ShieldCheck className="w-3.5 h-3.5 text-taupe-light" />;
      default: return null;
    }
  };

  return (
    <div className="bg-[#0a1a23] text-cream text-xs py-2 px-4 border-b border-[#3D4D55]/60 shadow-inner flex flex-wrap items-center justify-between gap-2 z-40 relative">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#B58863]/20 text-[#B58863] font-semibold border border-[#B58863]/30">
          <Sparkles className="w-3 h-3 text-[#B58863]" />
          HACKATHON DEMO MODE
        </span>
        <span className="hidden sm:inline text-[#A79E9C]">Switch Persona:</span>
      </div>

      <div className="flex items-center flex-wrap gap-1.5">
        {DEMO_PERSONAS.map(p => {
          const isActive = user.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => switchPersona(p.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all font-medium ${
                isActive 
                  ? 'bg-[#B58863] text-[#161616] shadow-sm ring-2 ring-[#B58863]/50 font-bold' 
                  : 'bg-[#3D4D55]/70 hover:bg-[#3D4D55] text-[#D3C3B9] border border-[#3D4D55]'
              }`}
            >
              {getRoleIcon(p.role)}
              <span>{p.name.split(' ')[0]}</span>
              <span className="opacity-75 text-[10px] hidden md:inline">({p.badge})</span>
            </button>
          );
        })}

        <button
          onClick={handleResetData}
          className="ml-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-[#3D4D55]/50 hover:bg-[#3D4D55] hover:text-white text-[#A79E9C] border border-[#3D4D55] transition-colors"
          title="Reset all demo state to fresh default"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden lg:inline">Reset Seed</span>
        </button>
      </div>
    </div>
  );
};
