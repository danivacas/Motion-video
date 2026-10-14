import React from 'react';
import { Film, ArrowRight, Share2, FolderOpen, ChevronRight } from 'lucide-react';
import { TabType } from '../../../types';

interface QuickActionsSectionProps {
  onNavigate: (tab: TabType) => void;
  t: {
    quickActions: string;
    gpuOptimal: string;
    newAiCreation: string;
    newAiCreationDesc: string;
    prepareForIg: string;
    prepareForIgDesc: string;
    localGallery: string;
    localGalleryDesc: string;
  };
}

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  onNavigate,
  t,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
          {t.quickActions}
        </span>
        <span className="font-mono text-xs font-semibold text-[#D4FF3A]">
          {t.gpuOptimal}
        </span>
      </div>

      {/* Hero Button */}
      <button
        type="button"
        onClick={() => onNavigate('crear')}
        className="w-full bg-[#D4FF3A] hover:bg-[#c2ed2c] text-[#0B0F12] p-4 rounded-2xl flex items-center justify-between shadow-lg active:scale-[0.99] transition glow-citrus-sm text-left group cursor-pointer"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-black/10 flex items-center justify-center shrink-0">
            <Film className="w-6 h-6 text-[#0B0F12]" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base text-[#0B0F12] tracking-tight">
              {t.newAiCreation}
            </h2>
            <p className="text-xs text-[#0B0F12]/80 font-medium">
              {t.newAiCreationDesc}
            </p>
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#0B0F12]/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-5 h-5 text-[#0B0F12]" />
        </div>
      </button>

      {/* Two Columns */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onNavigate('instagram')}
          className="bg-[#181C1F] hover:bg-[#202529] border border-white/5 hover:border-white/20 p-3.5 rounded-2xl flex flex-col justify-between text-left transition group cursor-pointer"
        >
          <div className="flex items-center justify-between w-full mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#262A2E] flex items-center justify-center text-slate-200">
              <Share2 className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-sm text-white leading-tight">
              {t.prepareForIg}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {t.prepareForIgDesc}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('galeria')}
          className="bg-[#181C1F] hover:bg-[#202529] border border-white/5 hover:border-white/20 p-3.5 rounded-2xl flex flex-col justify-between text-left transition group cursor-pointer"
        >
          <div className="flex items-center justify-between w-full mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#262A2E] flex items-center justify-center text-slate-200">
              <FolderOpen className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-sm text-white leading-tight">
              {t.localGallery}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {t.localGalleryDesc}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
