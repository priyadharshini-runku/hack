import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ToastContainer = () => {
  const { toast } = useAuth();
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-500 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-200 bg-white shadow-emerald-500/10',
    error: 'border-rose-200 bg-white shadow-rose-500/10',
    info: 'border-brand-200 bg-white shadow-brand-500/10'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl ${borderColors[toast.type || 'info']} max-w-md`}>
        {icons[toast.type || 'info']}
        <p className="text-sm font-medium text-slate-800">{toast.message}</p>
      </div>
    </div>
  );
};
