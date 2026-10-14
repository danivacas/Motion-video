import React from 'react';
import { Sliders, Sparkles, X } from 'lucide-react';

interface CinematicPromptInputProps {
  prompt: string;
  onChange: (value: string) => void;
  onOptimize: () => void;
  onClear: () => void;
  isOptimizing: boolean;
  title: string;
  optimizeLabel: string;
  optimizingLabel: string;
  clearLabel: string;
  estimatedTokensLabel: string;
  charactersLabel: string;
}

export const CinematicPromptInput: React.FC<CinematicPromptInputProps> = ({
  prompt,
  onChange,
  onOptimize,
  onClear,
  isOptimizing,
  title,
  optimizeLabel,
  optimizingLabel,
  clearLabel,
  estimatedTokensLabel,
  charactersLabel,
}) => {
  const estimatedTokens = Math.max(12, Math.floor(prompt.length / 4));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOptimize}
            disabled={isOptimizing}
            className="min-h-[36px] px-3 py-1.5 rounded-lg bg-[#262A2E] hover:bg-[#313539] flex items-center gap-1.5 text-xs font-mono font-semibold text-[#D4FF3A] border border-white/10 transition cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? optimizingLabel : optimizeLabel}</span>
          </button>
          <button
            type="button"
            onClick={onClear}
            className="min-h-[36px] px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white border border-white/5 transition cursor-pointer active:scale-95"
          >
            <X className="w-3.5 h-3.5" />
            <span>{clearLabel}</span>
          </button>
        </div>
      </div>

      <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-2 focus-within:border-[#D4FF3A]/60 transition shadow-inner">
        <textarea
          value={prompt}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          enterKeyHint="done"
          spellCheck={false}
          className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 font-manrope resize-none focus:outline-none leading-relaxed"
          placeholder="Ej: Vista aérea cinemática de un descapotable recorriendo la costa al atardecer, luz dorada sobre el mar turquesa, movimiento fluido de cámara a 60fps..."
        />
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF3A]" />
            {estimatedTokensLabel} ~{estimatedTokens}
          </span>
          <span>
            {prompt.length} / 1000 {charactersLabel}
          </span>
        </div>
      </div>
    </div>
  );
};
