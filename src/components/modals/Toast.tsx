import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-sm w-11/12 animate-in fade-in slide-in-from-top duration-200">
      <div className="bg-[#181C1F]/95 backdrop-blur-md border border-[#D4FF3A]/30 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3">
        <CheckCircle2 className="w-4 h-4 text-[#D4FF3A] shrink-0" />
        <span className="text-xs font-medium text-slate-100">{toastMessage}</span>
      </div>
    </div>
  );
};
