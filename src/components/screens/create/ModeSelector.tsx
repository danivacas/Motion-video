import React from 'react';
import { ModelType } from '../../../types';
import { Image as ImageIcon, Layers } from 'lucide-react';

interface ModeSelectorProps {
  mode: ModelType;
  onChange: (mode: ModelType) => void;
  imageToVideoLabel: string;
  textToVideoLabel: string;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  mode,
  onChange,
  imageToVideoLabel,
  textToVideoLabel,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-1 bg-[#181C1F] rounded-2xl border border-white/10">
      <button
        type="button"
        onClick={() => onChange('seedance-i2v')}
        className={`flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-semibold text-xs transition-all cursor-pointer ${
          mode === 'seedance-i2v'
            ? 'bg-[#D4FF3A] text-[#0B0F12] shadow-md glow-citrus-sm'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <ImageIcon className="w-4 h-4" />
        <span>{imageToVideoLabel}</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('seedance-t2v')}
        className={`flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-semibold text-xs transition-all cursor-pointer ${
          mode === 'seedance-t2v'
            ? 'bg-[#D4FF3A] text-[#0B0F12] shadow-md glow-citrus-sm'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Layers className="w-4 h-4" />
        <span>{textToVideoLabel}</span>
      </button>
    </div>
  );
};
