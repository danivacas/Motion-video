import React from 'react';
import { HardDrive } from 'lucide-react';

interface DeviceSecurityNoticeProps {
  title: string;
  description: string;
}

export const DeviceSecurityNotice: React.FC<DeviceSecurityNoticeProps> = ({
  title,
  description,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-[#12181F] border border-white/5 space-y-2">
      <div className="flex items-center gap-2 text-slate-300">
        <HardDrive className="w-4 h-4 text-[#D4FF3A]" />
        <h4 className="font-heading font-semibold text-xs text-white">
          {title}
        </h4>
      </div>
      <p className="text-[11px] text-slate-400 font-manrope leading-relaxed">
        {description}
      </p>
    </div>
  );
};
