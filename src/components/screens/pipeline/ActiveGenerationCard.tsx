import React from 'react';
import { PipelineProgress, GenerationItem } from '../../../types';
import { RefreshCw, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface ActiveGenerationCardProps {
  pipeline: PipelineProgress;
  currentItem?: GenerationItem;
  onCancel: () => void;
  t: {
    synthesizingFrames: string;
    stepOf: string;
    remaining: string;
    latentInferenceLog: string;
    liveBadge: string;
    cancelRender: string;
  };
}

export const ActiveGenerationCard: React.FC<ActiveGenerationCardProps> = ({
  pipeline,
  currentItem,
  onCancel,
  t,
}) => {
  return (
    <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4FF3A] animate-ping" />
          <span className="font-mono text-xs font-bold tracking-wider text-slate-300 uppercase">
            {t.synthesizingFrames}
          </span>
        </div>
        <span className="font-mono text-xs font-semibold text-slate-300 bg-[#262A2E] px-2.5 py-0.5 rounded-md border border-white/5">
          {pipeline.currentFrame} / {pipeline.totalFrames} FTM
        </span>
      </div>

      {/* Frame Preview Canvas */}
      <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-black border border-white/10 flex items-center justify-center group">
        <img
          src={
            currentItem?.thumbnail ||
            'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80'
          }
          alt="Synthesizing frame"
          className="w-full h-full object-cover filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        {/* Glowing Spinner */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-[#D4FF3A]/30 flex items-center justify-center glow-citrus">
          <RefreshCw className="w-8 h-8 text-[#D4FF3A] animate-spin" />
        </div>

        {/* Scanning Line Animation */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4FF3A] to-transparent animate-pulse bottom-1" />
      </div>

      {/* Progress & Step */}
      <div className="space-y-2 pt-1">
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-3xl text-white tracking-tight">
              {pipeline.percentage}%
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#262A2E] text-[#D4FF3A] font-mono text-[11px] font-bold">
              {t.stepOf} {pipeline.step}/4
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>
              {t.remaining} 00:{pipeline.remainingSeconds.toString().padStart(2, '0')}s
            </span>
          </div>
        </div>

        <div className="w-full h-2 bg-[#262A2E] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D4FF3A] glow-citrus transition-all duration-500 ease-out"
            style={{ width: `${pipeline.percentage}%` }}
          />
        </div>
      </div>

      {/* Latent Inference Logs */}
      <div className="bg-[#12181F] border border-white/5 rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase font-bold">
            {t.latentInferenceLog}
          </span>
          <span className="text-[10px] font-mono font-bold text-[#D4FF3A] px-1.5 py-0.5 rounded bg-[#D4FF3A]/10">
            {t.liveBadge}
          </span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          {pipeline.logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2">
              {log.status === 'completed' && (
                <CheckCircle2 className="w-4 h-4 text-[#D4FF3A] shrink-0 mt-0.5" />
              )}
              {log.status === 'running' && (
                <RefreshCw className="w-4 h-4 text-[#D4FF3A] animate-spin shrink-0 mt-0.5" />
              )}
              {log.status === 'pending' && (
                <Clock className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              )}
              <span
                className={
                  log.status === 'completed'
                    ? 'line-through text-slate-500'
                    : log.status === 'running'
                    ? 'text-white font-medium'
                    : 'text-slate-500'
                }
              >
                {log.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Button */}
      <button
        type="button"
        onClick={onCancel}
        className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-xs font-mono text-slate-400 hover:text-red-400 flex items-center justify-center gap-1.5 transition cursor-pointer"
      >
        <XCircle className="w-3.5 h-3.5" />
        <span>{t.cancelRender}</span>
      </button>
    </div>
  );
};
