import React from 'react';
import { Cpu } from 'lucide-react';
import { PipelineProgress } from '../../../types';

interface DiffusionEngineHeaderProps {
  modelName: string;
  pipeline: PipelineProgress;
  t: {
    diffusionEngine: string;
    fps24: string;
    gpuInference: string;
    apiLatency: string;
    runCost: string;
  };
}

export const DiffusionEngineHeader: React.FC<DiffusionEngineHeaderProps> = ({
  modelName,
  pipeline,
  t,
}) => {
  return (
    <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase font-bold">
            {t.diffusionEngine}
          </span>
          <h2 className="font-heading font-bold text-base text-white">
            {modelName}
          </h2>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-[#262A2E] text-[#D4FF3A] font-mono text-[11px] font-bold border border-white/10 flex items-center gap-1">
          <Cpu className="w-3 h-3 text-[#D4FF3A]" />
          {t.fps24}
        </span>
      </div>

      {/* 3 Metrics Row */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 font-mono text-center">
        <div className="bg-[#12181F] p-2.5 rounded-xl border border-white/5">
          <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
            {t.gpuInference}
          </span>
          <span className="text-xs font-bold text-slate-200 mt-1 block">
            {pipeline.gpuInference}
          </span>
        </div>

        <div className="bg-[#12181F] p-2.5 rounded-xl border border-white/5">
          <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
            {t.apiLatency}
          </span>
          <span className="text-xs font-bold text-slate-200 mt-1 block">
            {pipeline.apiLatency}
          </span>
        </div>

        <div className="bg-[#12181F] p-2.5 rounded-xl border border-white/5">
          <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
            {t.runCost}
          </span>
          <span className="text-xs font-bold text-[#D4FF3A] mt-1 block">
            {pipeline.runCost}
          </span>
        </div>
      </div>
    </div>
  );
};
