import React from 'react';
import { Play, Pause } from 'lucide-react';
import { useShowreelPlayer } from '../../../hooks/useShowreelPlayer';

interface ShowreelPlayerProps {
  fpsShowreelTag: string;
}

function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const ShowreelPlayer: React.FC<ShowreelPlayerProps> = ({ fpsShowreelTag }) => {
  const { videoRef, isPlaying, currentTime, duration, togglePlay } = useShowreelPlayer();

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
      {/* Video Canvas Container */}
      <div className="relative aspect-[16/9] w-full bg-[#0B0F12] overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
          poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Central Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition cursor-pointer"
          aria-label="Reproducir Showreel"
        >
          <div className="w-14 h-14 rounded-full bg-[#D4FF3A] text-[#0B0F12] flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 active:scale-95 glow-citrus">
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </div>
        </button>

        {/* Tag 4K 60FPS HIGGSFIELD-MOTION */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none">
          <span className="px-3 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-widest text-slate-300 border border-white/10 uppercase">
            {fpsShowreelTag}
          </span>
        </div>

        {/* Bottom Timecode & Track */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-1.5">
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4FF3A] glow-citrus-sm transition-all duration-300"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="text-[#D4FF3A] font-semibold">{formatSeconds(currentTime)}</span>
            <span className="text-white font-medium tracking-wider">SHOWREEL_V2.5.mp4</span>
            <span>{formatSeconds(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
