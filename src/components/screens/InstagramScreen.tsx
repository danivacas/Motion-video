import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Film, Layers, Lightbulb } from 'lucide-react';
import { ScreenHeaderBadges } from '../common/ScreenHeaderBadges';
import { InstagramMockupPreview } from './instagram/InstagramMockupPreview';
import { InstagramCaptionEditor } from './instagram/InstagramCaptionEditor';
import { InstagramActionButtons } from './instagram/InstagramActionButtons';

export const InstagramScreen: React.FC = () => {
  const { selectedInstagramItem, showToast, lang, t } = useApp();

  const [format, setFormat] = useState<'reel' | 'carousel'>('reel');
  const [downloadBatchState, setDownloadBatchState] = useState(false);

  const [caption, setCaption] = useState(
    `Escape mediterráneo con el nuevo prototipo. Luz dorada y curvas perfectas. 🌊⚡ Creado con Seedance 2.5 en Coastal Motion. #CoastalMotion #AIvideo #MercedesLovers #Filmmaking`
  );

  const suggestedHashtags = [
    '#CarDesign',
    '#LuxuryLifestyle',
    '#CGIart',
    '#GenerativeMotion',
    '#HiggsfieldAI',
    '#Cinematography',
  ];

  const handleAddHashtag = (tag: string) => {
    if (caption.includes(tag)) return;
    setCaption((prev) => `${prev.trim()} ${tag}`);
    showToast(`${tag} añadido al pie`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedInstagramItem.title,
          text: caption,
          url: window.location.href,
        });
        showToast(
          lang === 'es' ? 'Menú de compartir activado' : 'Native share activated'
        );
      } catch {
        // User cancelled or unsupported
      }
    } else {
      try {
        await navigator.clipboard.writeText(caption);
        showToast(
          lang === 'es'
            ? 'Texto copiado en el portapapeles. Guarda el vídeo para subirlo a Instagram.'
            : 'Caption copied to clipboard. Save video to upload to Instagram.'
        );
      } catch {
        showToast(caption);
      }
    }
  };

  const handleDownloadBatch = () => {
    setDownloadBatchState(true);
    try {
      navigator.clipboard.writeText(caption);
    } catch {
      // fallback
    }
    showToast(
      lang === 'es'
        ? 'Descargando metraje MP4 y pie copiado al portapapeles'
        : 'Downloading MP4 footage & caption copied to clipboard'
    );
    setTimeout(() => setDownloadBatchState(false), 2500);
  };

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* Top Status Badges */}
      <ScreenHeaderBadges
        leftText={t.manualPublishingIg}
        rightText={t.directPipeline}
        rightIcon={<ShieldCheck className="w-3.5 h-3.5 text-[#D4FF3A]" />}
      />

      {/* Screen Title synchronized with Nav Button */}
      <div className="space-y-1">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
          {t.navInstagram}
        </h1>
        <p className="text-xs text-slate-400 font-manrope leading-relaxed">
          {t.localPublicationNoticeDesc}
        </p>
      </div>

      {/* Visual Onboarding Tip */}
      <div className="p-3.5 rounded-2xl bg-[#12181F] border border-[#D4FF3A]/20 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-[#D4FF3A]/10 text-[#D4FF3A] flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-heading font-semibold text-xs text-[#D4FF3A]">
            {lang === 'es' ? 'Publicación optimizada' : 'Optimized Publishing'}
          </h4>
          <p className="text-[11px] text-slate-300 font-manrope leading-relaxed">
            {lang === 'es'
              ? 'Tu vídeo ha sido adaptado automáticamente a encuadre vertical (9:16) para Reels. Pulsa "Compartir" o copia el texto y descarga el archivo para publicarlo directamente.'
              : 'Your video has been automatically formatted for vertical 9:16 Reels. Tap "Share" or copy the text and download to publish directly.'}
          </p>
        </div>
      </div>

      {/* Format Selector with thumb-friendly heights */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
            {t.selectFormat}
          </span>
          <span className="font-mono text-[#D4FF3A] font-semibold">{t.higgsfieldRig}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setFormat('reel')}
            className={`min-h-[54px] p-3 rounded-xl border flex items-center gap-2.5 transition cursor-pointer active:scale-95 ${
              format === 'reel'
                ? 'bg-[#181C1F] border-[#D4FF3A] text-white shadow-md'
                : 'bg-[#12181F] border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Film className={`w-5 h-5 ${format === 'reel' ? 'text-[#D4FF3A]' : ''}`} />
            <div className="text-left">
              <span className="font-heading font-semibold text-xs block">
                {t.formatReel}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                1080 × 1920 • 60 FPS
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setFormat('carousel')}
            className={`min-h-[54px] p-3 rounded-xl border flex items-center gap-2.5 transition cursor-pointer active:scale-95 ${
              format === 'carousel'
                ? 'bg-[#181C1F] border-[#D4FF3A] text-white shadow-md'
                : 'bg-[#12181F] border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className={`w-5 h-5 ${format === 'carousel' ? 'text-[#D4FF3A]' : ''}`} />
            <div className="text-left">
              <span className="font-heading font-semibold text-xs block">
                {t.formatCarousel}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                1080 × 1350 • Portada
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mockup Preview */}
      <InstagramMockupPreview item={selectedInstagramItem} caption={caption} />

      {/* Caption Editor & Hashtags */}
      <InstagramCaptionEditor
        caption={caption}
        onChangeCaption={setCaption}
        suggestedHashtags={suggestedHashtags}
        onAddHashtag={handleAddHashtag}
        showToast={showToast}
        lang={lang}
        t={t}
      />

      {/* Action Buttons in lower thumb zone */}
      <InstagramActionButtons
        onShare={handleShare}
        onDownloadBatch={handleDownloadBatch}
        isDownloading={downloadBatchState}
        t={t}
      />

      <p className="text-[11px] font-mono text-center text-slate-500 pt-1">
        {t.unsupportedShareNotice}
      </p>
    </div>
  );
};
