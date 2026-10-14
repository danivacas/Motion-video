import React from 'react';
import { ShoppingCart, CheckCircle2, Clock, XCircle, BadgeDollarSign } from 'lucide-react';
import { LicenseStatus } from '../../../types';
import { translations } from '../../../utils/translations';

interface LicenseSectionProps {
  licenseStatus: LicenseStatus;
  onChangeLicenseStatus: (status: LicenseStatus) => void;
  onOpenStore: () => void;
  lang: 'es' | 'en';
  t: typeof translations.es;
}

export const LicenseSection: React.FC<LicenseSectionProps> = ({
  licenseStatus,
  onChangeLicenseStatus,
  onOpenStore,
  lang,
  t,
}) => {
  return (
    <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BadgeDollarSign className="w-4 h-4 text-[#D4FF3A]" />
          <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
            {t.softwareOwnership}
          </span>
        </div>

        {/* Dynamic Badge */}
        {licenseStatus === 'active' && (
          <span className="px-2.5 py-0.5 rounded-full bg-[#D4FF3A]/10 text-[#D4FF3A] font-mono text-[11px] font-bold border border-[#D4FF3A]/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{t.stateActive}</span>
          </span>
        )}
        {licenseStatus === 'pending' && (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 font-mono text-[11px] font-bold border border-amber-400/30 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{t.statePending}</span>
          </span>
        )}
        {licenseStatus === 'cancelled' && (
          <span className="px-2.5 py-0.5 rounded-full bg-red-400/10 text-red-400 font-mono text-[11px] font-bold border border-red-400/30 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            <span>{t.stateCancelled}</span>
          </span>
        )}
      </div>

      <div>
        <h3 className="font-heading font-semibold text-sm text-white">
          {t.licenseStudioTitle}
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed font-manrope">
          {t.licenseStudioDesc}
        </p>
      </div>

      {/* Simulator buttons */}
      <div className="space-y-1.5 pt-2 border-t border-white/5">
        <span className="text-[10px] font-mono text-slate-400 uppercase">
          {lang === 'es' ? 'Simular estado de licencia comercial:' : 'Simulate commercial license state:'}
        </span>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onChangeLicenseStatus('active')}
            className={`py-1.5 px-2 rounded-xl text-xs font-mono transition cursor-pointer flex items-center justify-center gap-1 ${
              licenseStatus === 'active'
                ? 'bg-[#D4FF3A] text-[#0B0F12] font-bold'
                : 'bg-[#12181F] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>{t.stateActive}</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeLicenseStatus('pending')}
            className={`py-1.5 px-2 rounded-xl text-xs font-mono transition cursor-pointer flex items-center justify-center gap-1 ${
              licenseStatus === 'pending'
                ? 'bg-amber-400 text-[#0B0F12] font-bold'
                : 'bg-[#12181F] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>{t.statePending}</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeLicenseStatus('cancelled')}
            className={`py-1.5 px-2 rounded-xl text-xs font-mono transition cursor-pointer flex items-center justify-center gap-1 ${
              licenseStatus === 'cancelled'
                ? 'bg-red-400 text-white font-bold'
                : 'bg-[#12181F] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <XCircle className="w-3 h-3" />
            <span>{t.stateCancelled}</span>
          </button>
        </div>
      </div>

      {/* Buy Lifetime License CTA */}
      <button
        type="button"
        onClick={onOpenStore}
        className="w-full py-3 px-4 rounded-xl bg-[#262A2E] hover:bg-[#313539] border border-white/10 text-xs font-heading font-semibold text-white flex items-center justify-between transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-[#D4FF3A]" />
          <span>{t.buyLifetimeLicense}</span>
        </div>
        <span className="font-mono text-[11px] text-[#D4FF3A]">
          {t.priceEur}
        </span>
      </button>
    </div>
  );
};
