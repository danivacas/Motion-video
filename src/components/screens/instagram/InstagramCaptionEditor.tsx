import React from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { useClipboard } from '../../../hooks/useClipboard';

interface InstagramCaptionEditorProps {
  caption: string;
  onChangeCaption: (text: string) => void;
  suggestedHashtags: string[];
  onAddHashtag: (tag: string) => void;
  showToast: (msg: string) => void;
  lang: 'es' | 'en';
  t: {
    postCopyTitle: string;
    suggestedHashtags: string;
    characters: string;
    textCopied: string;
  };
}

export const InstagramCaptionEditor: React.FC<InstagramCaptionEditorProps> = ({
  caption,
  onChangeCaption,
  suggestedHashtags,
  onAddHashtag,
  showToast,
  lang,
  t,
}) => {
  const { copied, copy } = useClipboard({
    onSuccess: () => showToast(t.textCopied),
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
            {t.postCopyTitle}
          </span>
        </div>
        <button
          type="button"
          onClick={() => copy(caption)}
          className="min-h-[36px] px-3 py-1 rounded-lg bg-[#262A2E] hover:bg-[#313539] active:scale-95 flex items-center gap-1.5 text-xs font-mono text-[#D4FF3A] border border-white/10 transition cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? (lang === 'es' ? '¡Copiado!' : 'Copied!') : (lang === 'es' ? 'Copiar Texto' : 'Copy Text')}</span>
        </button>
      </div>

      <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-2 focus-within:border-[#D4FF3A]/60 transition shadow-inner">
        <textarea
          value={caption}
          onChange={(e) => onChangeCaption(e.target.value)}
          rows={4}
          enterKeyHint="done"
          className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 font-manrope resize-none focus:outline-none leading-relaxed"
          placeholder="Ej: Nuevo metraje cinematográfico frente a las olas doradas del Mediterráneo 🌊⚡ Creado con Seedance 2.5 #CoastalMotion #AIvideo..."
        />
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
          <span className="text-[#D4FF3A]">Formato Reel Optimizado</span>
          <span>
            {caption.length} / 2200 {t.characters}
          </span>
        </div>
      </div>

      {/* Suggested Hashtags with comfortable touch targets */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
          {t.suggestedHashtags}:
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedHashtags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onAddHashtag(tag)}
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-[#181C1F] hover:bg-[#262A2E] active:scale-95 text-[#D4FF3A] border border-white/10 hover:border-white/20 text-xs font-mono transition cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
