import React, { useState } from 'react';
import { GenerationItem } from '../../../types';
import { Play, Pause, Share2, Download } from 'lucide-react';

interface FinalResultCardProps {
  currentItem?: GenerationItem;
  onSendToInstagram: () => void;
  onDownload: () => void;
  t: {
    sendToInstagram: string;
    downloadMp4: string;
  };
}

export const FinalResultCard: React.FC<FinalResultCardProps> = ({
  currentItem,
  onSendToInstagram,
  onDownload,
  t,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-4 shadow-xl">
      <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-black border border-white/10 group">
        <video
          src={
            currentItem?.videoUrl ||
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
          }
          poster={currentItem?.thumbnail}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition cursor-pointer"
        >
          {!isPlaying && (
            <div className="w-12 h-12 rounded-full bg-[#D4FF3A] text-[#0B0F12] flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
          )}
        </button>

        <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-[#D4FF3A] border border-white/10">
          Render 100% Completado • 1080p 60fps
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={onSendToInstagram}
          className="py-3 px-3 rounded-xl bg-[#D4FF3A] hover:bg-[#c2ed2c] text-[#0B0F12] font-heading font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 glow-citrus-sm cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{t.sendToInstagram}</span>
        </button>

        <button
          type="button"
          onClick={onDownload}
          className="py-3 px-3 rounded-xl bg-[#262A2E] hover:bg-[#313539] border border-white/10 text-xs font-heading font-medium text-white flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{t.downloadMp4}</span>
        </button>
      </div>
    </div>
  );
};
