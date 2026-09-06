import React from 'react';

export const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  label, 
  showPercentage = true, 
  height = 'h-2.5',
  colorScheme = 'auto', // 'auto', 'brand', 'emerald', 'amber', 'rose'
  sublabel
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  let barColor = 'bg-brand-500';
  if (colorScheme === 'auto') {
    if (percentage >= 75) barColor = 'bg-emerald-500';
    else if (percentage >= 50) barColor = 'bg-amber-500';
    else barColor = 'bg-rose-500';
  } else if (colorScheme === 'brand') {
    barColor = 'bg-brand-600';
  } else if (colorScheme === 'emerald') {
    barColor = 'bg-emerald-500';
  } else if (colorScheme === 'amber') {
    barColor = 'bg-amber-500';
  } else if (colorScheme === 'rose') {
    barColor = 'bg-rose-500';
  }

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5 text-sm">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {showPercentage && <span className="font-semibold text-slate-900">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height}`}>
        <div 
          className={`${height} ${barColor} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {sublabel && (
        <p className="text-xs text-slate-500 mt-1">{sublabel}</p>
      )}
    </div>
  );
};
