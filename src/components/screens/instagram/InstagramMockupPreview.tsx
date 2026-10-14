import React, { useState } from 'react';
import { GenerationItem } from '../../../types';
import { Heart, MessageCircle, Send, Music } from 'lucide-react';

interface InstagramMockupPreviewProps {
  item: GenerationItem;
  caption: string;
}

export const InstagramMockupPreview: React.FC<InstagramMockupPreviewProps> = ({
  item,
  caption,
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[9/14] bg-black border border-white/10 shadow-2xl mx-auto max-w-sm">
      <video
        src={item.videoUrl}
        poster={item.thumbnail}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Top Gradient */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

      {/* Right Side Social Actions */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 z-10">
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center gap-1 transition active:scale-90 cursor-pointer"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition ${
              liked
                ? 'bg-rose-500/20 text-rose-500'
                : 'bg-black/40 text-white hover:text-rose-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current text-rose-500' : ''}`} />
          </div>
          <span className="text-[10px] font-mono text-white">
            {liked ? '1.4k' : '1.3k'}
          </span>
        </button>

        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono text-white">84</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
            <Send className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono text-white">312</span>
        </div>
      </div>

      {/* Bottom Overlay Info */}
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
            alt="User profile"
            className="w-8 h-8 rounded-full object-cover border border-white/20"
          />
          <span className="font-heading font-bold text-xs text-white">
            coastalmotion.studio
          </span>
          <span className="px-1.5 py-0.2 rounded bg-white/20 text-[9px] font-mono text-white">
            Siguiendo
          </span>
        </div>

        <p className="text-xs text-slate-200 line-clamp-2 font-manrope leading-relaxed">
          {caption}
        </p>

        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-300">
          <Music className="w-3 h-3 text-[#D4FF3A]" />
          <span className="truncate">Audio original • Coastal Motion Studio v2.5</span>
        </div>
      </div>
    </div>
  );
};
