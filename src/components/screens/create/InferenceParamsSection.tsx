import React from 'react';
import { AspectRatio } from '../../../types';
import { Clock, Film, Lock } from 'lucide-react';
import { RangeSlider } from '../../common/RangeSlider';

interface InferenceParamsSectionProps {
  duration: number;
  onDurationChange: (val: number) => void;
  aspectRatio: AspectRatio;
  onAspectRatioChange: (val: AspectRatio) => void;
  resolution: '720p' | '1080p';
  onResolutionChange: (val: '720p' | '1080p') => void;
  motionLevel: number;
  onMotionLevelChange: (val: number) => void;
  lang: 'es' | 'en';
  t: {
    inferenceParams: string;
    seedanceSpec: string;
    aspectRatio: string;
    exportRes: string;
    optimalPerformance: string;
    dynamicMotion: string;
    motionLevel: string;
    motionLabel1: string;
    motionLabel6: string;
    motionLabel10: string;
  };
}

export const InferenceParamsSection: React.FC<InferenceParamsSectionProps> = ({
  duration,
  onDurationChange,
  aspectRatio,
  onAspectRatioChange,
  resolution,
  onResolutionChange,
  motionLevel,
  onMotionLevelChange,
  lang,
  t,
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
          {t.inferenceParams}
        </span>
        <span className="font-mono text-xs font-semibold text-slate-400">
          {t.seedanceSpec}
        </span>
      </div>

      {/* Duración Slider 5s a 30s */}
      <RangeSlider
        icon={<Clock className="w-4 h-4 text-[#D4FF3A]" />}
        title={lang === 'es' ? 'Duración del Vídeo / Reel' : 'Video / Reel Duration'}
        valueDisplay={`${duration}s / 30s`}
        min={5}
        max={30}
        step={1}
        value={duration}
        onChange={onDurationChange}
        labels={{
          start: `5s: ${lang === 'es' ? 'Micro-Clip' : 'Short Clip'}`,
          mid: `15s: ${lang === 'es' ? 'Reel Estándar' : 'Standard Reel'}`,
          end: `30s: ${lang === 'es' ? 'Cinemática Max' : 'Max Cinema'}`,
        }}
        quickPresets={[5, 8, 10, 15, 20, 30]}
        presetUnit="s"
      />

      {/* Relación de Aspecto */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-medium">{t.aspectRatio}</span>
          <span className="font-mono text-slate-400">
            {aspectRatio === '16:9'
              ? 'Cine Horizontal'
              : aspectRatio === '9:16'
              ? 'Vertical Reels'
              : 'Cuadrado 1:1'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onAspectRatioChange('16:9')}
            className={`py-2.5 px-2 rounded-xl text-xs font-mono transition flex flex-col items-center gap-1 cursor-pointer ${
              aspectRatio === '16:9'
                ? 'bg-[#262A2E] text-[#D4FF3A] border-2 border-[#D4FF3A]'
                : 'bg-[#181C1F] text-slate-400 border border-white/10 hover:text-white'
            }`}
          >
            <div className="w-5 h-3 border border-current rounded-sm" />
            <span className="font-bold text-[11px]">16:9</span>
            <span className="text-[9px] text-slate-400">Horizontal</span>
          </button>

          <button
            type="button"
            onClick={() => onAspectRatioChange('9:16')}
            className={`py-2.5 px-2 rounded-xl text-xs font-mono transition flex flex-col items-center gap-1 cursor-pointer ${
              aspectRatio === '9:16'
                ? 'bg-[#262A2E] text-[#D4FF3A] border-2 border-[#D4FF3A]'
                : 'bg-[#181C1F] text-slate-400 border border-white/10 hover:text-white'
            }`}
          >
            <div className="w-3 h-5 border border-current rounded-sm" />
            <span className="font-bold text-[11px]">9:16</span>
            <span className="text-[9px] text-slate-400">Reel/Story</span>
          </button>

          <button
            type="button"
            onClick={() => onAspectRatioChange('1:1')}
            className={`py-2.5 px-2 rounded-xl text-xs font-mono transition flex flex-col items-center gap-1 cursor-pointer ${
              aspectRatio === '1:1'
                ? 'bg-[#262A2E] text-[#D4FF3A] border-2 border-[#D4FF3A]'
                : 'bg-[#181C1F] text-slate-400 border border-white/10 hover:text-white'
            }`}
          >
            <div className="w-4 h-4 border border-current rounded-sm" />
            <span className="font-bold text-[11px]">1:1</span>
            <span className="text-[9px] text-slate-400">Cuadrado</span>
          </button>
        </div>
      </div>

      {/* Resolución de Exportación */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-medium">{t.exportRes}</span>
          <span className="font-mono text-[#D4FF3A] font-semibold">
            {t.optimalPerformance}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onResolutionChange('720p')}
            className={`py-2.5 px-3 rounded-xl font-heading text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
              resolution === '720p'
                ? 'bg-[#D4FF3A] text-[#0B0F12]'
                : 'bg-[#181C1F] text-slate-400 border border-white/10'
            }`}
          >
            <span>720p</span>
            <span className="text-[10px] font-mono font-bold uppercase">
              Recomendado
            </span>
          </button>

          <button
            type="button"
            onClick={() => onResolutionChange('1080p')}
            className={`py-2.5 px-3 rounded-xl font-heading text-xs flex items-center justify-between transition cursor-pointer ${
              resolution === '1080p'
                ? 'bg-[#D4FF3A] text-[#0B0F12] font-semibold'
                : 'bg-[#181C1F] text-slate-400 border border-white/10'
            }`}
          >
            <span>1080p Full HD</span>
            <Lock className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Intensidad de Movimiento Dinámico */}
      <RangeSlider
        icon={<Film className="w-4 h-4 text-[#D4FF3A]" />}
        title={t.dynamicMotion}
        valueDisplay={`${t.motionLevel} ${motionLevel} / 10`}
        min={1}
        max={10}
        step={1}
        value={motionLevel}
        onChange={onMotionLevelChange}
        labels={{
          start: t.motionLabel1,
          mid: t.motionLabel6,
          end: t.motionLabel10,
        }}
      />
    </div>
  );
};
