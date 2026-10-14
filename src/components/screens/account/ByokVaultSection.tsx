import React, { useState } from 'react';
import { KeyRound, Eye, EyeOff, ShieldCheck, ExternalLink, Check, Save } from 'lucide-react';
import { translations } from '../../../utils/translations';

interface ByokVaultSectionProps {
  apiKey: string;
  onSaveKey: (key: string) => void;
  showToast: (msg: string) => void;
  lang: 'es' | 'en';
  t: typeof translations.es;
}

export const ByokVaultSection: React.FC<ByokVaultSectionProps> = ({
  apiKey,
  onSaveKey,
  showToast,
  lang,
  t,
}) => {
  const [showKey, setShowKey] = useState(false);
  const [keyInput, setKeyInput] = useState(apiKey);
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  const handleSave = () => {
    onSaveKey(keyInput.trim());
    setIsSavedRecently(true);
    showToast(
      lang === 'es'
        ? 'Clave API guardada y cifrada en almacenamiento local'
        : 'API key saved and encrypted in local storage'
    );
    setTimeout(() => setIsSavedRecently(false), 2000);
  };

  return (
    <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-[#D4FF3A]" />
          <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
            {t.generativeEngine}
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#12181F] text-[#D4FF3A] font-mono text-[11px] font-bold border border-white/5">
          {apiKey.trim() ? t.endpointReady : lang === 'es' ? 'Sin Clave' : 'No Key'}
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed font-manrope">
        {t.connectApiKey}
      </p>

      {/* Input key with proper formatting example and thumb-friendly controls */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
          {t.apiConnection}
        </label>
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="done"
            placeholder="Ej: hf_live_9a87d6e5c4b3a2f1_seedance25"
            className="w-full min-h-[46px] bg-[#12181F] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#D4FF3A]/60 transition pr-12"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="min-h-[44px] min-w-[44px] absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer"
            title={showKey ? t.hideKey : t.showKey}
            aria-label={showKey ? t.hideKey : t.showKey}
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Save button with clear visual feedback */}
        <button
          type="button"
          onClick={handleSave}
          className={`w-full min-h-[44px] rounded-xl font-heading font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 ${
            isSavedRecently
              ? 'bg-[#D4FF3A] text-[#0B0F12]'
              : 'bg-[#262A2E] hover:bg-[#313539] text-white border border-white/10'
          }`}
        >
          {isSavedRecently ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span className="font-bold">{lang === 'es' ? '¡Clave Guardada!' : 'Key Saved!'}</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-[#D4FF3A]" />
              <span>{lang === 'es' ? 'Guardar Clave Localmente' : 'Save Key Locally'}</span>
            </>
          )}
        </button>
      </div>

      {/* Encryption card */}
      <div className="p-3 bg-[#12181F] rounded-xl border border-white/5 space-y-1">
        <div className="flex items-center gap-1.5 text-slate-300 font-medium text-xs">
          <ShieldCheck className="w-4 h-4 text-[#D4FF3A]" />
          <span>{t.e2eEncryptionTitle}</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed font-manrope">
          {t.e2eEncryptionDesc}
        </p>
      </div>

      <a
        href="https://higgsfield.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-mono text-[#D4FF3A] hover:underline flex items-center gap-1.5 transition pt-1"
      >
        <span>{t.higgsfieldConsole}</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
