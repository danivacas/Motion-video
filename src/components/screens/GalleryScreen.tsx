import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderOpen,
  Play,
  Share2,
  Lightbulb,
  PlusCircle,
} from 'lucide-react';
import { GenerationItem } from '../../types';
import { ScreenHeaderBadges } from '../common/ScreenHeaderBadges';
import { EmptyState } from '../common/EmptyState';

export const GalleryScreen: React.FC = () => {
  const {
    t,
    generations,
    setActiveVideoModal,
    setSelectedInstagramItem,
    setActiveTab,
    showToast,
    lang,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | '9:16' | '16:9' | '1:1' | 'fav'>('all');

  const filtered = generations.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'fav') return item.isFavorite;
    return item.aspectRatio === activeFilter;
  });

  const handleSendToIg = (e: React.MouseEvent, item: GenerationItem) => {
    e.stopPropagation();
    setSelectedInstagramItem(item);
    setActiveTab('instagram');
    showToast(
      lang === 'es'
        ? 'Vídeo transferido a la pestaña Instagram con formato Reel'
        : 'Video transferred to Instagram tab formatted as Reel'
    );
  };

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* Top Header Badges */}
      <ScreenHeaderBadges
        leftText={lang === 'es' ? 'ALMACÉN DE METRAJE LOCAL' : 'LOCAL FOOTAGE VAULT'}
        rightText={`${generations.length} ${lang === 'es' ? 'secuencias' : 'clips'}`}
        rightIcon={<FolderOpen className="w-3.5 h-3.5 text-[#D4FF3A]" />}
        isPulse={false}
      />

      {/* Screen Title synchronized with Nav Button */}
      <div className="space-y-1">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
          {t.navGaleria}
        </h1>
        <p className="text-xs text-slate-400 font-manrope leading-relaxed">
          {t.localGalleryDesc}
        </p>
      </div>

      {/* Visual Onboarding Tip */}
      <div className="p-3.5 rounded-2xl bg-[#12181F] border border-[#D4FF3A]/20 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-[#D4FF3A]/10 text-[#D4FF3A] flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-heading font-semibold text-xs text-[#D4FF3A]">
            {lang === 'es' ? 'Cómo usar tu galería' : 'How to use your gallery'}
          </h4>
          <p className="text-[11px] text-slate-300 font-manrope leading-relaxed">
            {lang === 'es'
              ? 'Toca cualquier tarjeta para reproducir el vídeo a pantalla completa con sonido o usa el botón de compartir para enviarlo directamente a Instagram.'
              : 'Tap any video card to play full-screen with sound or tap the share button to send it directly to Instagram.'}
          </p>
        </div>
      </div>

      {/* Filter Tabs with thumb-friendly heights */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-mono transition shrink-0 cursor-pointer active:scale-95 ${
            activeFilter === 'all'
              ? 'bg-[#D4FF3A] text-[#0B0F12] font-bold shadow-md'
              : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          {t.filterAll}
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('9:16')}
          className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-mono transition shrink-0 cursor-pointer active:scale-95 ${
            activeFilter === '9:16'
              ? 'bg-[#D4FF3A] text-[#0B0F12] font-bold shadow-md'
              : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          {t.filter916}
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('16:9')}
          className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-mono transition shrink-0 cursor-pointer active:scale-95 ${
            activeFilter === '16:9'
              ? 'bg-[#D4FF3A] text-[#0B0F12] font-bold shadow-md'
              : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          {t.filter169}
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('1:1')}
          className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-mono transition shrink-0 cursor-pointer active:scale-95 ${
            activeFilter === '1:1'
              ? 'bg-[#D4FF3A] text-[#0B0F12] font-bold shadow-md'
              : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          {t.filter11}
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('fav')}
          className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-mono transition shrink-0 cursor-pointer active:scale-95 ${
            activeFilter === 'fav'
              ? 'bg-[#D4FF3A] text-[#0B0F12] font-bold shadow-md'
              : 'bg-[#181C1F] text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          ★ {lang === 'es' ? 'Favoritos' : 'Favorites'}
        </button>
      </div>

      {/* Grid of video tiles or Friendly Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<FolderOpen className="w-6 h-6 text-[#D4FF3A]" />}
          title={
            lang === 'es'
              ? 'No hay vídeos en este filtro'
              : 'No videos found in this category'
          }
          description={
            lang === 'es'
              ? 'Tus metrajes generados aparecerán aquí para que puedas reproducirlos, descargarlos o enviarlos a Instagram.'
              : 'Your rendered video clips will be saved here so you can preview, download, or publish them to Instagram.'
          }
          actionLabel={lang === 'es' ? 'Crear nuevo vídeo' : 'Create new video'}
          onAction={() => setActiveTab('crear')}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveVideoModal(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#181C1F] border border-white/10 aspect-[9/15] flex flex-col justify-between p-3 cursor-pointer shadow-lg hover:border-[#D4FF3A]/60 transition"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50" />

              {/* Top badges with thumb-accessible IG button */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#D4FF3A] border border-white/10 uppercase font-semibold">
                  {item.aspectRatio}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleSendToIg(e, item)}
                  title={lang === 'es' ? 'Enviar a Instagram Reels' : 'Send to Instagram Reels'}
                  aria-label="Instagram"
                  className="min-h-[44px] min-w-[44px] rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-slate-200 hover:text-[#D4FF3A] hover:bg-black/90 flex items-center justify-center transition active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom details with comfortable touch play icon */}
              <div className="relative z-10 space-y-1.5">
                <h4 className="font-heading font-semibold text-xs text-white truncate drop-shadow">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span>{item.duration}s • {item.resolution}</span>
                  <div className="min-h-[36px] min-w-[36px] rounded-full bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D4FF3A] group-hover:text-[#0B0F12] transition shadow-md">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Create Quick Button in lower area */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setActiveTab('crear')}
          className="w-full min-h-[50px] rounded-xl bg-[#181C1F] hover:bg-[#22272B] border border-white/10 text-white flex items-center justify-center gap-2 font-heading font-medium text-xs sm:text-sm transition cursor-pointer active:scale-98"
        >
          <PlusCircle className="w-4 h-4 text-[#D4FF3A]" />
          <span>{lang === 'es' ? 'Generar más clips cinematográficos' : 'Generate more cinematic clips'}</span>
        </button>
      </div>
    </div>
  );
};
