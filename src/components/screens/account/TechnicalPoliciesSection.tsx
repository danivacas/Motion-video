import React, { useState } from 'react';
import { HardDrive, Trash2, ShieldCheck, X } from 'lucide-react';
import { translations } from '../../../utils/translations';

interface TechnicalPoliciesSectionProps {
  onClearCache: () => void;
  lang: 'es' | 'en';
  t: typeof translations.es;
}

export const TechnicalPoliciesSection: React.FC<TechnicalPoliciesSectionProps> = ({
  onClearCache,
  lang,
  t,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmClear = () => {
    onClearCache();
    setShowConfirm(false);
  };

  return (
    <div className="space-y-4">
      {/* Storage and Privacy policies */}
      <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-3 shadow-md">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-[#D4FF3A]" />
          <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
            {t.technicalPolicies}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-manrope">
          {t.policyStorageDesc}
        </p>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
          <div className="bg-[#12181F] p-2.5 rounded-xl border border-white/5 space-y-0.5">
            <span className="text-slate-500 block text-[9px] uppercase">Almacenamiento</span>
            <span className="text-white font-semibold">IndexedDB Local</span>
          </div>
          <div className="bg-[#12181F] p-2.5 rounded-xl border border-white/5 space-y-0.5">
            <span className="text-slate-500 block text-[9px] uppercase">Recurrencia</span>
            <span className="text-[#D4FF3A] font-semibold">0€ / Sin Suscripción</span>
          </div>
        </div>
      </div>

      {/* Verified environment & cache management */}
      <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4FF3A]" />
            <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
              {t.verifiedProduction}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">{t.buildVer}</span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed font-manrope">
          {t.policyNoSubsDesc}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400">{t.allocatedCache}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 text-red-400 border border-red-500/20 text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t.clearLocalCache}</span>
          </button>
        </div>
      </div>

      {/* Confirmation Dialog with thumb-friendly targets */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181C1F] border border-white/15 rounded-2xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-white text-base">
                {lang === 'es' ? '¿Limpiar Caché Local?' : 'Clear Local Cache?'}
              </h3>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-manrope">
              {lang === 'es'
                ? 'Se eliminarán los archivos temporales de vídeo y metraje en caché. Tus proyectos y clave API se mantendrán.'
                : 'Temporary video renders and cached footage will be deleted. Your projects and API key will remain safe.'}
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white border border-white/10 cursor-pointer active:scale-95"
              >
                {lang === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleConfirmClear}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-heading font-bold text-xs cursor-pointer active:scale-95"
              >
                {lang === 'es' ? 'Sí, Limpiar' : 'Yes, Clear'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
