import React, { useState } from 'react';
import { GenerationItem } from '../../../types';
import { Play } from 'lucide-react';

interface RecentGenerationsSectionProps {
  generations: GenerationItem[];
  onSelectVideo: (item: GenerationItem) => void;
  onNavigateGallery: () => void;
  lang: 'es' | 'en';
  t: {
    recentGenerations: string;
    viewAll: string;
    filterAll: string;
    filter916: string;
    filter169: string;
    filter11: string;
  };
}

export const RecentGenerationsSection: React.FC<RecentGenerationsSectionProps> = ({
  generations,
  onSelectVideo,
  onNavigateGallery,
  t,
}) => {
  const [filterRatio, setFilterRatio] = useState<string>('all');

  const filtered = generations.filter((item) => {
    if (filterRatio === 'all') return true;
    return item.aspectRatio === filterRatio;
  });

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <span className="font-heading font-bold text-base text-white">
          {t.recentGenerations}
        </span>
        <button
          type="button"
          onClick={onNavigateGallery}
          className="text-xs font-mono text-slate-400 hover:text-white transition cursor-pointer"
        >
          {t.viewAll} ↗
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setFilterRatio('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition cursor-pointer whitespace-nowrap ${
            filterRatio === 'all'
              ? 'bg-[#D4FF3A] text-[#0B0F12] font-semibold'
              : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          {t.filterAll}
        </button>
        <button
          type="button"
          onClick={() => setFilterRatio('9:16')}
          className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition cursor-pointer whitespace-nowrap ${
            filterRatio === '9:16'
              ? 'bg-[#D4FF3A] text-[#0B0F12] font-semibold'
              : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          {t.filter916}
        </button>
        <button
          type="button"
          onClick={() => setFilterRatio('16:9')}
          className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition cursor-pointer whitespace-nowrap ${
            filterRatio === '16:9'
              ? 'bg-[#D4FF3A] text-[#0B0F12] font-semibold'
              : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          {t.filter169}
        </button>
        <button
          type="button"
          onClick={() => setFilterRatio('1:1')}
          className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition cursor-pointer whitespace-nowrap ${
            filterRatio === '1:1'
              ? 'bg-[#D4FF3A] text-[#0B0F12] font-semibold'
              : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          {t.filter11}
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectVideo(item)}
            className="group relative bg-[#181C1F] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden cursor-pointer shadow-md transition flex flex-col"
          >
            <div
              className={`relative bg-black w-full overflow-hidden ${
                item.aspectRatio === '9:16'
                  ? 'aspect-[9/14]'
                  : item.aspectRatio === '16:9'
                  ? 'aspect-[16/10]'
                  : 'aspect-square'
              }`}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-[#D4FF3A] border border-white/10 flex items-center justify-center transform transition group-hover:scale-110 glow-citrus-sm">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>

              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-200 border border-white/10">
                {item.duration}s • {item.resolution}
              </div>

              <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono text-[#D4FF3A] border border-white/10">
                {item.aspectRatio}
              </div>
            </div>

            <div className="p-2.5 space-y-1">
              <h4 className="font-heading font-semibold text-xs text-white truncate">
                {item.title}
              </h4>
              <p className="font-mono text-[10px] text-slate-400 truncate">
                {item.model}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
