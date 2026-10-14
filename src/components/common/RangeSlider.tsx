import React from 'react';

interface RangeSliderProps {
  icon: React.ReactNode;
  title: string;
  valueDisplay: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  labels?: {
    start: string;
    mid?: string;
    end: string;
  };
  quickPresets?: number[];
  presetUnit?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  icon,
  title,
  valueDisplay,
  min,
  max,
  step = 1,
  value,
  onChange,
  labels,
  quickPresets,
  presetUnit = '',
}) => {
  return (
    <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-3 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-xs font-medium text-slate-200">{title}</span>
        </div>
        <span className="font-mono text-xs font-bold text-[#D4FF3A]">
          {valueDisplay}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-[#262A2E] rounded-lg appearance-none cursor-pointer accent-[#D4FF3A]"
      />

      {labels && (
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
          <span>{labels.start}</span>
          {labels.mid && <span className="text-slate-300 font-semibold">{labels.mid}</span>}
          <span>{labels.end}</span>
        </div>
      )}

      {quickPresets && quickPresets.length > 0 && (
        <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/5 overflow-x-auto scrollbar-none">
          {quickPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition cursor-pointer ${
                value === preset
                  ? 'bg-[#D4FF3A] text-[#0B0F12] font-bold shadow-sm'
                  : 'bg-[#12181F] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {preset}{presetUnit}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
