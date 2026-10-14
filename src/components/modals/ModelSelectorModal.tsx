import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Search, Check, Sparkles, Film, Cpu, Zap, Layers, Camera, Image as ImageIcon } from 'lucide-react';
import { HiggsfieldModelInfo, ModelCategory } from '../../types';

interface ModelSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelSelectorModal: React.FC<ModelSelectorModalProps> = ({ isOpen, onClose }) => {
  const { allModels, selectedModel, setSelectedModel, showToast, lang } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ModelCategory>('all');

  if (!isOpen) return null;

  const filteredModels = allModels.filter((model) => {
    const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory;
    const matchesSearch =
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBadgeClass = (type: HiggsfieldModelInfo['badgeType']) => {
    switch (type) {
      case 'lime':
        return 'bg-[#D4FF3A] text-[#0B0F12] font-bold';
      case 'amber':
        return 'bg-amber-400 text-[#0B0F12] font-bold';
      case 'cyan':
        return 'bg-cyan-400 text-[#0B0F12] font-bold';
      case 'purple':
        return 'bg-purple-400 text-[#0B0F12] font-bold';
      case 'slate':
      default:
        return 'bg-[#313539] text-slate-200 border border-white/10';
    }
  };

  const handleSelect = (model: HiggsfieldModelInfo) => {
    setSelectedModel(model);
    showToast(lang === 'es' ? `Modelo activado: ${model.name}` : `Model activated: ${model.name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="relative bg-[#12181F] border border-white/10 rounded-2xl w-full max-w-lg max-h-[88vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-[#181C1F]/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#262A2E] text-[#D4FF3A] flex items-center justify-center">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-white">
                {lang === 'es' ? 'Catálogo de Modelos Higgsfield API' : 'Higgsfield API Models Catalog'}
              </h2>
              <p className="font-mono text-[11px] text-slate-400">
                {lang === 'es' ? '16 motores disponibles bajo tu API Key' : '16 engines available on your API Key'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Tabs */}
        <div className="p-4 space-y-3 bg-[#181C1F]/40 border-b border-white/5">
          {/* Search box */}
          <div className="flex items-center gap-2 bg-[#12181F] border border-white/10 rounded-xl px-3 py-2 text-xs focus-within:border-[#D4FF3A]/50 transition">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'es' ? 'Buscar Seedance, Kling, Wan, Soul, Veo, Flux...' : 'Search Seedance, Kling, Wan, Soul, Veo, Flux...'}
              className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#D4FF3A] text-[#0B0F12] font-bold'
                  : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {lang === 'es' ? 'Todos (16)' : 'All (16)'}
            </button>
            <button
              onClick={() => setSelectedCategory('seedance')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition shrink-0 ${
                selectedCategory === 'seedance'
                  ? 'bg-[#D4FF3A] text-[#0B0F12] font-bold'
                  : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Seedance Core (4)
            </button>
            <button
              onClick={() => setSelectedCategory('higgsfield-native')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition shrink-0 ${
                selectedCategory === 'higgsfield-native'
                  ? 'bg-[#D4FF3A] text-[#0B0F12] font-bold'
                  : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Higgsfield SOUL & DoP (4)
            </button>
            <button
              onClick={() => setSelectedCategory('video-partners')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition shrink-0 ${
                selectedCategory === 'video-partners'
                  ? 'bg-[#D4FF3A] text-[#0B0F12] font-bold'
                  : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Video Partners (6)
            </button>
            <button
              onClick={() => setSelectedCategory('image-gen')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition shrink-0 ${
                selectedCategory === 'image-gen'
                  ? 'bg-[#D4FF3A] text-[#0B0F12] font-bold'
                  : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Fotogramas & Keyframes (3)
            </button>
          </div>
        </div>

        {/* Model Cards List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredModels.map((model) => {
            const isSelected = selectedModel.id === model.id;
            return (
              <div
                key={model.id}
                onClick={() => handleSelect(model)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer group ${
                  isSelected
                    ? 'bg-[#181C1F] border-[#D4FF3A] shadow-md ring-1 ring-[#D4FF3A]/30'
                    : 'bg-[#181C1F]/60 border-white/5 hover:border-white/20 hover:bg-[#181C1F]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#262A2E] text-[#D4FF3A] flex items-center justify-center shrink-0 mt-0.5">
                      {model.type === 'video' ? (
                        <Film className="w-4 h-4" />
                      ) : model.type === 'motion' ? (
                        <Camera className="w-4 h-4" />
                      ) : (
                        <ImageIcon className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-semibold text-sm text-white">
                          {model.name}
                        </h4>
                        <span className={`px-2 py-0.2 rounded-full text-[9px] font-mono ${getBadgeClass(model.badgeType)}`}>
                          {model.badge}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-slate-400 mt-0.5">
                        {model.tagline}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#D4FF3A] text-[#0B0F12] flex items-center justify-center shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-300 font-manrope leading-relaxed mt-2.5">
                  {model.description}
                </p>

                {/* Specs metadata */}
                <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/5 text-[10px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300">{model.inferenceTime}</span>
                    <span>•</span>
                    <span>{model.resolution}</span>
                    <span>•</span>
                    <span className="text-[#D4FF3A] font-semibold">{model.costPerRun}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#12181F] text-slate-400 border border-white/5 uppercase">
                    {model.categoryLabel}
                  </span>
                </div>
              </div>
            );
          })}

          {filteredModels.length === 0 && (
            <div className="p-8 text-center text-slate-500 font-manrope text-xs">
              {lang === 'es' ? 'No se encontraron modelos con ese término de búsqueda.' : 'No models found matching that search term.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
