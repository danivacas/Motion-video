import React, { useRef } from 'react';
import { Plus, Trash2, Check, Crop } from 'lucide-react';
import { ReferenceImageItem } from '../../../hooks/useReferenceImages';
import { AspectRatio } from '../../../types';

interface ReferenceImageManagerProps {
  images: ReferenceImageItem[];
  activeIndex: number;
  currentImage: ReferenceImageItem;
  isDragging: boolean;
  setIsDragging: (val: boolean) => void;
  onSelectImage: (index: number) => void;
  onProcessFiles: (files: File[]) => void;
  onAddPreset: () => void;
  onRemoveImage: (index: number) => void;
  onCycleRole: (index: number) => void;
  aspectRatio: AspectRatio;
  onToggleAspectRatio: () => void;
  lang: 'es' | 'en';
  baseFrameTitle: string;
  optimizedText: string;
  angleLockOkText: string;
}

export const ReferenceImageManager: React.FC<ReferenceImageManagerProps> = ({
  images,
  activeIndex,
  currentImage,
  isDragging,
  setIsDragging,
  onSelectImage,
  onProcessFiles,
  onAddPreset,
  onRemoveImage,
  onCycleRole,
  onToggleAspectRatio,
  lang,
  baseFrameTitle,
  optimizedText,
  angleLockOkText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onProcessFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const imageFiles = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith('image/')
      );
      if (imageFiles.length > 0) {
        onProcessFiles(imageFiles);
      }
    }
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
          {baseFrameTitle}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-[#D4FF3A]">
            {images.length} {images.length === 1 ? 'Cargada' : 'Cargadas'}
          </span>
          <button
            type="button"
            onClick={onAddPreset}
            className="min-h-[36px] px-3 py-1.5 rounded-lg bg-[#262A2E] text-xs font-mono text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 text-[#D4FF3A]" />
            <span>+ Preset</span>
          </button>
        </div>
      </div>

      {/* Main Container with Drag-and-Drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`bg-[#181C1F] border rounded-2xl overflow-hidden p-3.5 space-y-3 transition-colors ${
          isDragging
            ? 'border-[#D4FF3A] bg-[#D4FF3A]/5 ring-2 ring-[#D4FF3A]/20'
            : 'border-white/10'
        }`}
      >
        {/* Active Image Box */}
        <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-black group border border-white/10">
          <img
            src={currentImage.url}
            alt={currentImage.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          />

          {isDragging && (
            <div className="absolute inset-0 bg-[#0B0F12]/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-20">
              <div className="w-12 h-12 rounded-full bg-[#D4FF3A] text-[#0B0F12] flex items-center justify-center font-bold">
                <Plus className="w-6 h-6 stroke-[3]" />
              </div>
              <span className="font-heading font-bold text-sm text-[#D4FF3A]">
                {lang === 'es' ? 'Suelta aquí tus fotos para el vídeo' : 'Drop your photos here for video'}
              </span>
            </div>
          )}

          {/* Top overlay pills with comfortable touch targets */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
            <div className="px-2.5 py-1.5 rounded-lg bg-black/75 backdrop-blur-md text-[11px] font-mono text-slate-200 border border-white/10 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#D4FF3A]" />
              <span className="truncate max-w-[130px]">{currentImage.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onCycleRole(activeIndex)}
                title="Cambiar rol de fotograma"
                className="min-h-[36px] px-2.5 py-1.5 rounded-lg bg-black/75 backdrop-blur-md text-[11px] font-mono font-medium text-[#D4FF3A] border border-white/15 hover:bg-[#D4FF3A] hover:text-[#0B0F12] transition cursor-pointer active:scale-95"
              >
                {currentImage.role === 'start'
                  ? '● Inicio'
                  : currentImage.role === 'keyframe'
                  ? '◆ Clave'
                  : '■ Fin'}
              </button>

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveImage(activeIndex)}
                  title="Eliminar esta foto"
                  className="min-h-[36px] min-w-[36px] p-2 rounded-lg bg-black/75 backdrop-blur-md text-slate-400 hover:text-red-400 border border-white/15 flex items-center justify-center transition cursor-pointer active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Bottom metadata tags */}
          <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/10">
              {currentImage.resolution} {optimizedText}
            </span>
            <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#D4FF3A] font-semibold border border-white/10">
              {angleLockOkText}
            </span>
          </div>
        </div>

        {/* Thumbnails strip */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-0.5">
            <span>{lang === 'es' ? 'Secuencia de fotogramas cargados:' : 'Loaded keyframe sequence:'}</span>
            <span className="text-[#D4FF3A] font-semibold">
              Activo: #{activeIndex + 1} de {images.length}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {images.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => onSelectImage(idx)}
                className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 cursor-pointer border transition-all ${
                  activeIndex === idx
                    ? 'border-[#D4FF3A] ring-2 ring-[#D4FF3A]/30 scale-102'
                    : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                <span className="absolute top-1 left-1 px-1 rounded bg-black/70 text-[9px] font-mono text-white font-bold">
                  #{idx + 1}
                </span>
                <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-mono text-center text-[#D4FF3A] truncate px-0.5">
                  {img.role === 'start' ? 'Inicio' : img.role === 'end' ? 'Fin' : 'Clave'}
                </span>
              </div>
            ))}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-xl border-2 border-dashed border-white/15 hover:border-[#D4FF3A]/60 bg-[#12181F] flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-white shrink-0 transition cursor-pointer"
              title="Añadir más fotos"
            >
              <Plus className="w-4 h-4 text-[#D4FF3A]" />
              <span className="text-[9px] font-mono">+ Foto</span>
            </button>
          </div>
        </div>

        {/* Upload & Crop Buttons with thumb-friendly touch targets */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="min-h-[46px] flex-1 py-2.5 px-3 rounded-xl bg-[#262A2E] hover:bg-[#313539] border border-white/10 text-xs font-heading font-medium text-white flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D4FF3A]" />
            <span>{lang === 'es' ? 'Cargar Fotos (Arrastrar o Pulsar)' : 'Upload Photos (Drop or Tap)'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleAspectRatio}
            className="min-h-[46px] min-w-[46px] p-2.5 rounded-xl bg-[#262A2E] hover:bg-[#313539] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95"
            title="Ajustar encuadre"
          >
            <Crop className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
