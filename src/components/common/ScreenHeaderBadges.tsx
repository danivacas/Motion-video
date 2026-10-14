import React from 'react';

interface ScreenHeaderBadgesProps {
  leftText: string;
  rightText: string;
  rightIcon?: React.ReactNode;
  isPulse?: boolean;
}

export const ScreenHeaderBadges: React.FC<ScreenHeaderBadgesProps> = ({
  leftText,
  rightText,
  rightIcon,
  isPulse = true,
}) => {
  return (
    <div className="flex items-center justify-between text-[11px] font-mono">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#181C1F] border border-white/10 text-slate-300">
        <span
          className={`w-2 h-2 rounded-full bg-[#D4FF3A] glow-citrus-sm ${
            isPulse ? 'animate-pulse' : ''
          }`}
        />
        <span className="font-semibold tracking-wider">{leftText}</span>
      </div>
      <div className="inline-flex items-center gap-1 text-[#D4FF3A] font-semibold">
        {rightIcon}
        <span>{rightText}</span>
      </div>
    </div>
  );
};
