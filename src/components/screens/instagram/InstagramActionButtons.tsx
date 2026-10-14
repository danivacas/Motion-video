import React from 'react';
import { Share2, Download, ExternalLink, Check, Loader2 } from 'lucide-react';

interface InstagramActionButtonsProps {
  onShare: () => void;
  onDownloadBatch: () => void;
  isDownloading: boolean;
  t: {
    shareFilesBtn: string;
    downloadBatchBtn: string;
    openInstagramBtn: string;
  };
}

export const InstagramActionButtons: React.FC<InstagramActionButtonsProps> = ({
  onShare,
  onDownloadBatch,
  isDownloading,
  t,
}) => {
  return (
    <div className="space-y-2.5 pt-2">
      {/* Primary Action Button - Located in thumb zone */}
      <button
        type="button"
        onClick={onShare}
        className="w-full min-h-[52px] bg-[#D4FF3A] hover:bg-[#c2ed2c] active:bg-[#b0dc22] text-[#0B0F12] p-3.5 rounded-2xl flex items-center justify-center gap-2 font-heading font-bold text-sm sm:text-base shadow-lg active:scale-[0.98] transition glow-citrus-sm cursor-pointer"
      >
        <Share2 className="w-5 h-5 text-[#0B0F12]" />
        <span>{t.shareFilesBtn}</span>
      </button>

      {/* Secondary Actions with comfortable touch targets */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={onDownloadBatch}
          disabled={isDownloading}
          className="min-h-[48px] py-3 px-3 rounded-xl bg-[#262A2E] hover:bg-[#313539] active:bg-[#3a3f44] border border-white/10 text-xs font-heading font-medium text-white flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 disabled:opacity-75"
        >
          {isDownloading ? (
            <>
              <Check className="w-4 h-4 text-[#D4FF3A]" />
              <span className="text-[#D4FF3A]">Listo en portapapeles</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-slate-300" />
              <span>{t.downloadBatchBtn}</span>
            </>
          )}
        </button>

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[48px] py-3 px-3 rounded-xl bg-[#1C2023] hover:bg-[#262A2E] active:bg-[#313539] border border-white/10 text-xs font-heading font-medium text-white flex items-center justify-center gap-2 transition cursor-pointer active:scale-95"
        >
          <ExternalLink className="w-4 h-4 text-[#D4FF3A]" />
          <span>{t.openInstagramBtn}</span>
        </a>
      </div>
    </div>
  );
};
