import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lightbulb } from 'lucide-react';
import { ScreenHeaderBadges } from '../common/ScreenHeaderBadges';
import { MagicLinkSection } from './account/MagicLinkSection';
import { LicenseSection } from './account/LicenseSection';
import { ByokVaultSection } from './account/ByokVaultSection';
import { TechnicalPoliciesSection } from './account/TechnicalPoliciesSection';

export const AccountScreen: React.FC = () => {
  const {
    t,
    licenseStatus,
    setLicenseStatus,
    apiKey,
    setApiKey,
    showToast,
    clearCache,
    lang,
  } = useApp();

  const userEmail = 'director@coastalmotion.studio';

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* Top Status Badges */}
      <ScreenHeaderBadges
        leftText={t.settingsEnv}
        rightText={t.byokVault}
        rightIcon={<ShieldCheck className="w-3.5 h-3.5 text-[#D4FF3A]" />}
      />

      {/* Screen Title synchronized with Nav Button */}
      <div className="space-y-1">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
          {t.navCuenta}
        </h1>
        <p className="text-xs text-slate-400 font-manrope leading-relaxed">
          {t.accountSubtitle}
        </p>
      </div>

      {/* Visual Onboarding Tip */}
      <div className="p-3.5 rounded-2xl bg-[#12181F] border border-[#D4FF3A]/20 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-[#D4FF3A]/10 text-[#D4FF3A] flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-heading font-semibold text-xs text-[#D4FF3A]">
            {lang === 'es' ? 'Privacidad y Credenciales' : 'Privacy & Credentials'}
          </h4>
          <p className="text-[11px] text-slate-300 font-manrope leading-relaxed">
            {lang === 'es'
              ? 'Tus metrajes y claves se cifran y guardan exclusivamente en tu navegador. Puedes guardar tu clave de Higgsfield para conectar con los servidores neuronales.'
              : 'Your renders and keys are encrypted and saved exclusively in your local browser. Save your Higgsfield key to connect to neural servers.'}
          </p>
        </div>
      </div>

      {/* Section 1: Magic Link Access */}
      <MagicLinkSection
        userEmail={userEmail}
        onResendLink={() => showToast(t.linkResentToast)}
        onSignOut={() =>
          showToast(
            lang === 'es'
              ? 'Sesión local en modo demostración'
              : 'Local session in demo mode'
          )
        }
        showToast={showToast}
        lang={lang}
        t={t}
      />

      {/* Section 2: Software License */}
      <LicenseSection
        licenseStatus={licenseStatus}
        onChangeLicenseStatus={(status) => {
          setLicenseStatus(status);
          showToast(
            lang === 'es'
              ? `Estado actualizado a ${status}`
              : `Status updated to ${status}`
          );
        }}
        onOpenStore={() =>
          showToast(
            lang === 'es'
              ? 'Redirigiendo a pasarela segura Stripe...'
              : 'Redirecting to secure Stripe checkout...'
          )
        }
        lang={lang}
        t={t}
      />

      {/* Section 3: BYOK Vault */}
      <ByokVaultSection
        apiKey={apiKey}
        onSaveKey={setApiKey}
        showToast={showToast}
        lang={lang}
        t={t}
      />

      {/* Section 4: Technical Policies & Environment */}
      <TechnicalPoliciesSection
        onClearCache={clearCache}
        lang={lang}
        t={t}
      />
    </div>
  );
};
