import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Volume2, VolumeX, Share2, Download, Check } from 'lucide-react';

export const VideoModal: React.FC = () => {
  const { activeVideoModal, setActiveVideoModal, setSelectedInstagramItem, setActiveTab, showToast, lang, t } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!activeVideoModal) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSendToInstagram = () => {
    setSelectedInstagramItem(activeVideoModal);
    setActiveVideoModal(null);
    setActiveTab('instagram');
    showToast(lang === 'es' ? 'Cargado en Preparación para Instagram' : 'Loaded into Instagram Preparation');
  };

  const handleDownload = () => {
    setDownloaded(true);
    showToast(lang === 'es' ? 'Descargando archivo MP4...' : 'Downloading MP4 file...');
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="relative bg-[#12181F] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header bar with thumb-friendly close button */}
        <div className="flex items-center justify-between p-3.5 border-b border-white/10 bg-[#181C1F]/60">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-[#D4FF3A] animate-pulse" />
            <h3 className="font-heading font-semibold text-sm text-white truncate">
              {activeVideoModal.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setActiveVideoModal(null)}
            aria-label={lang === 'es' ? 'Cerrar reproductor' : 'Close player'}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative bg-black flex items-center justify-center overflow-hidden aspect-[9/14] max-h-[58vh]">
          <video
            ref={videoRef}
            src={activeVideoModal.videoUrl}
            poster={activeVideoModal.thumbnail}
            autoPlay
            loop
            playsInline
            muted={isMuted}
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlay}
          />

          {/* Quick HUD Overlay */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-[#D4FF3A] border border-white/10 flex items-center gap-1.5">
            <span>{activeVideoModal.duration}s</span>
            <span>•</span>
            <span>{activeVideoModal.aspectRatio}</span>
            <span>•</span>
            <span>{activeVideoModal.resolution}</span>
            {activeVideoModal.simulatedAudio && (
              <>
                <span>•</span>
                <span className="text-white">Audio Simulado</span>
              </>
            )}
          </div>

          {/* Center Play/Pause button */}
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-transparent group"
          >
            {!isPlaying && (
              <div className="w-14 h-14 rounded-full bg-[#D4FF3A] text-[#0B0F12] flex items-center justify-center shadow-lg transform transition hover:scale-105 glow-citrus">
                <Play className="w-7 h-7 fill-current ml-0.5" />
              </div>
            )}
          </button>

          {/* Bottom audio control with thumb-friendly area */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            className="min-h-[44px] min-w-[44px] absolute bottom-3 right-3 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-md text-white border border-white/15 hover:bg-black/90 transition cursor-pointer active:scale-95"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-[#D4FF3A]" />}
          </button>
        </div>

        {/* Details & Actions in lower thumb zone */}
        <div className="p-3.5 space-y-3 bg-[#12181F] overflow-y-auto">
          <p className="text-xs text-slate-300 leading-relaxed bg-[#181C1F] p-3 rounded-xl border border-white/5 font-manrope">
            {activeVideoModal.prompt}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {activeVideoModal.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono bg-[#181C1F] text-slate-300 px-2.5 py-1 rounded-md border border-white/10">
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleSendToInstagram}
              className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#D4FF3A] hover:bg-[#bbf028] text-[#0B0F12] font-heading font-semibold text-xs sm:text-sm transition active:scale-95 glow-citrus-sm cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{t.sendToInstagram}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#1C2023] hover:bg-[#262A2E] text-white border border-white/10 font-heading font-medium text-xs sm:text-sm transition active:scale-95 cursor-pointer"
            >
              {downloaded ? <Check className="w-4 h-4 text-[#D4FF3A]" /> : <Download className="w-4 h-4 text-slate-300" />}
              <span>{downloaded ? t.copied : t.downloadMp4}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
