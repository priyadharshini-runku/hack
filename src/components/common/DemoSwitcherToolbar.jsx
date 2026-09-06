import React from 'react';
import { useAuth, DEMO_PERSONAS } from '../../context/AuthContext';
import { Sparkles, RefreshCw, UserCheck, School, Building2, ShieldCheck, ChevronRight } from 'lucide-react';

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
      case 'student': return <UserCheck className="w-3.5 h-3.5 text-sky-400" />;
      case 'college': return <School className="w-3.5 h-3.5 text-amber-400" />;
      case 'company': return <Building2 className="w-3.5 h-3.5 text-emerald-400" />;
      case 'admin': return <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />;
      default: return null;
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800 shadow-inner flex flex-wrap items-center justify-between gap-2 z-40 relative">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-semibold border border-brand-500/30">
          <Sparkles className="w-3 h-3 text-brand-400" />
          HACKATHON DEMO MODE
        </span>
        <span className="hidden sm:inline text-slate-400">Switch Persona:</span>
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
                  ? 'bg-brand-600 text-white shadow-sm ring-2 ring-brand-400/40 font-semibold' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
              }`}
            >
              {getRoleIcon(p.role)}
              <span>{p.name.split(' ')[0]}</span>
              <span className="opacity-70 text-[10px] hidden md:inline">({p.badge})</span>
            </button>
          );
        })}

        <button
          onClick={handleResetData}
          className="ml-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-rose-950/50 hover:text-rose-300 text-slate-400 border border-slate-700/60 transition-colors"
          title="Reset all demo state to fresh default"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden lg:inline">Reset Seed</span>
        </button>
      </div>
    </div>
  );
};
