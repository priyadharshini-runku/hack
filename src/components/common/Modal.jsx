import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <div className={`relative bg-[#161616] rounded-2xl shadow-2xl border border-[#3D4D55] w-full ${maxWidth} overflow-hidden transform transition-all z-10 my-8 text-[#D3C3B9]`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#3D4D55] bg-[#102A38]">
            <h3 className="text-lg font-semibold text-[#D3C3B9] font-display">{title}</h3>
            <button
              onClick={onClose}
              className="text-[#A79E9C] hover:text-[#D3C3B9] hover:bg-[#3D4D55] rounded-full p-1.5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
