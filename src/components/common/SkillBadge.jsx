import React from 'react';
import { CheckCircle2, Star, X } from 'lucide-react';

export const SkillBadge = ({ 
  skill, 
  level, 
  verified = false, 
  rating, 
  onRemove, 
  size = 'md',
  variant = 'default' 
}) => {
  const levelColors = {
    'Beginner': 'bg-sky-50 text-sky-700 border-sky-200',
    'Intermediate': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Advanced': 'bg-purple-50 text-purple-700 border-purple-200'
  };

  const badgeColor = level ? (levelColors[level] || 'bg-slate-100 text-slate-700 border-slate-200') : 'bg-brand-50 text-brand-700 border-brand-200';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium border rounded-full transition-all shadow-sm ${badgeColor} ${sizeClasses[size]}`}>
      {verified && (
        <span title="Verified by Company / Exam" className="text-emerald-600 flex items-center">
          <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-100" />
        </span>
      )}
      <span>{typeof skill === 'string' ? skill : skill.name}</span>
      {level && (
        <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 px-1 py-0.2 bg-white/60 rounded">
          {level}
        </span>
      )}
      {rating && (
        <span className="flex items-center text-amber-600 text-xs font-semibold">
          <Star className="w-3 h-3 fill-amber-400 text-amber-500 mr-0.5" />
          {rating}
        </span>
      )}
      {onRemove && (
        <button 
          onClick={onRemove}
          className="ml-0.5 text-slate-400 hover:text-rose-500 rounded-full p-0.5 hover:bg-rose-50 transition-colors"
          title="Remove skill"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
