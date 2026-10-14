import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ChevronDown, Check } from 'lucide-react';
import { HiggsfieldModelInfo } from '../../types';

interface ModelDropdownProps {
  onSelectModel?: (model: HiggsfieldModelInfo) => void;
  showPopularQuickButtons?: boolean;
}

export const ModelDropdown: React.FC<ModelDropdownProps> = ({
  onSelectModel,
  showPopularQuickButtons = true,
}) => {
  const { allModels, selectedModel, setSelectedModel, selectModelById, lang, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (m: HiggsfieldModelInfo) => {
    setSelectedModel(m);
    setIsOpen(false);
    onSelectModel?.(m);
    showToast(lang === 'es' ? `Modelo activado: ${m.name}` : `Activated model: ${m.name}`);
  };

  const handleSelectPopular = (id: string) => {
    selectModelById(id);
    const m = allModels.find((mod) => mod.id === id);
    if (m && onSelectModel) {
      onSelectModel(m);
    }
  };

  return (
    <div className="space-y-3">
      {/* Dropdown Trigger & Floating Menu */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-[#12181F] border border-white/10 hover:border-[#D4FF3A]/50 transition cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#262A2E] text-[#D4FF3A] flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-semibold text-sm text-white truncate">
                  {selectedModel.name}
                </h4>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#D4FF3A] text-[#0B0F12] font-bold shrink-0">
                  {selectedModel.badge}
                </span>
              </div>
              <p className="font-mono text-[11px] text-slate-400 truncate mt-0.5">
                {selectedModel.tagline} • {selectedModel.costPerRun}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
              {selectedModel.inferenceTime}
            </span>
            <div className="w-6 h-6 rounded-lg bg-[#262A2E] flex items-center justify-center text-slate-400 group-hover:text-white">
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#D4FF3A]' : ''
                }`}
              />
            </div>
          </div>
        </button>

        {/* Dropdown Menu Popover */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1.5 z-40 bg-[#12181F]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl max-h-80 overflow-y-auto p-2 space-y-1 animate-in fade-in slide-in-from-top-1">
            <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center justify-between border-b border-white/5 mb-1">
              <span>{lang === 'es' ? 'Modelos autorizados en API' : 'Authorized API Models'}</span>
              <span className="text-[#D4FF3A]">{allModels.length} disponibles</span>
            </div>

            {allModels.map((m) => {
              const isCurrent = m.id === selectedModel.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelect(m)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 transition cursor-pointer ${
                    isCurrent
                      ? 'bg-[#181C1F] border border-[#D4FF3A]/50 text-white'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isCurrent ? 'bg-[#D4FF3A]' : 'bg-slate-600'
                      }`}
                    />
                    <div className="overflow-hidden">
                      <div className="font-heading font-semibold text-white truncate text-xs flex items-center gap-1.5">
                        <span>{m.name}</span>
                        <span className="px-1 py-0.2 rounded text-[8px] font-mono bg-white/10 text-slate-300">
                          {m.badge}
                        </span>
                      </div>
                      <div className="font-mono text-[10px] text-slate-400 truncate">
                        {m.categoryLabel} • {m.inferenceTime} • {m.resolution}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[10px] text-[#D4FF3A] font-bold">
                      {m.costPerRun}
                    </span>
                    {isCurrent && (
                      <Check className="w-3.5 h-3.5 text-[#D4FF3A] stroke-[3]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Popular Models Quick Buttons */}
      {showPopularQuickButtons && (
        <div className="pt-1 border-t border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
            <span>{lang === 'es' ? 'Modelos más populares:' : 'Most popular models:'}</span>
            <span className="text-[#D4FF3A] font-semibold">Seedance 2.5 Core</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleSelectPopular('seedance-2.5-i2v')}
              className={`p-2 rounded-xl text-left border transition cursor-pointer flex flex-col justify-between ${
                selectedModel.id === 'seedance-2.5-i2v'
                  ? 'bg-[#181C1F] border-[#D4FF3A] ring-1 ring-[#D4FF3A]/30 text-white'
                  : 'bg-[#12181F] border-white/10 hover:border-white/20 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-heading font-semibold text-white truncate">
                  Seedance 2.5 I2V
                </span>
                <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-[#D4FF3A] text-[#0B0F12] font-bold">
                  Popular
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                Foto a Vídeo • ~14s
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPopular('seedance-2.5-t2v')}
              className={`p-2 rounded-xl text-left border transition cursor-pointer flex flex-col justify-between ${
                selectedModel.id === 'seedance-2.5-t2v'
                  ? 'bg-[#181C1F] border-[#D4FF3A] ring-1 ring-[#D4FF3A]/30 text-white'
                  : 'bg-[#12181F] border-white/10 hover:border-white/20 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-heading font-semibold text-white truncate">
                  Seedance 2.5 T2V
                </span>
                <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-[#262A2E] text-slate-300 font-semibold border border-white/10">
                  Cinema
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                Texto a Vídeo • ~22s
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
