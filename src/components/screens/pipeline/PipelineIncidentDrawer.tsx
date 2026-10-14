import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface PipelineIncidentDrawerProps {
  t: {
    pipelineWarningTitle: string;
    pipelineWarningSub: string;
    pipelineWarningDetails: string;
    cloudInfraTitle: string;
    cloudInfraDesc: string;
  };
}

export const PipelineIncidentDrawer: React.FC<PipelineIncidentDrawerProps> = ({
  t,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Expandable warning */}
      <div className="bg-[#181C1F] border border-amber-500/20 rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-xs text-white">
                {t.pipelineWarningTitle}
              </h4>
              <p className="text-[11px] text-slate-400">{t.pipelineWarningSub}</p>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {isOpen && (
          <div className="p-4 pt-0 text-xs text-slate-400 font-manrope leading-relaxed border-t border-white/5 mt-2">
            {t.pipelineWarningDetails}
          </div>
        )}
      </div>

      {/* Cloud infrastructure note */}
      <div className="p-4 rounded-2xl bg-[#12181F] border border-white/5 space-y-1.5">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-[#D4FF3A]" />
          <h4 className="font-heading font-semibold text-xs text-white">
            {t.cloudInfraTitle}
          </h4>
        </div>
        <p className="text-[11px] text-slate-400 font-manrope leading-relaxed">
          {t.cloudInfraDesc}
        </p>
      </div>
    </div>
  );
};
