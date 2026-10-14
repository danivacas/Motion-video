import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center space-y-3.5 my-4 shadow-md">
      <div className="w-12 h-12 rounded-2xl bg-[#262A2E] text-[#D4FF3A] flex items-center justify-center border border-white/10 shadow-inner">
        {icon}
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h3 className="font-heading font-semibold text-base sm:text-lg text-white">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 font-manrope leading-relaxed">
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#D4FF3A] hover:bg-[#c2ed2c] text-[#0B0F12] font-heading font-bold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
