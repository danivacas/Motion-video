import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  showBack?: boolean;
  backTitle?: string;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showBack, backTitle, onBack }) => {
  const { lang, setLang, setActiveTab, activeTab, t } = useApp();

  // Determine screen title matching the button label that opened it
  const getScreenTitle = () => {
    if (backTitle) return backTitle;
    switch (activeTab) {
      case 'crear':
        return t.navCrear;
      case 'galeria':
        return t.navGaleria;
      case 'instagram':
        return t.navInstagram;
      case 'cuenta':
        return t.navCuenta;
      case 'pipeline':
        return lang === 'es' ? 'Progreso de Generación' : 'Generation Progress';
      default:
        return '';
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else if (activeTab === 'pipeline') {
      setActiveTab('crear');
    } else {
      setActiveTab('inicio');
    }
  };

  const isNonHomeScreen = showBack ?? (activeTab !== 'inicio');
  const screenTitle = getScreenTitle();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F12]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between">
      {/* Left side: either Back button with matching screen title, or Logo branding on Home */}
      <div className="flex items-center gap-2">
        {isNonHomeScreen ? (
          <button
            type="button"
            onClick={handleBackClick}
            className="min-h-[44px] flex items-center gap-2 px-2.5 py-1.5 -ml-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] text-white border border-white/10 transition cursor-pointer"
            aria-label={lang === 'es' ? 'Volver a la pantalla anterior' : 'Go back to previous screen'}
          >
            <ArrowLeft className="w-5 h-5 text-[#D4FF3A] shrink-0" />
            <span className="font-heading font-semibold text-xs sm:text-sm text-slate-300">
              {lang === 'es' ? 'Atrás' : 'Back'}
            </span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="font-heading font-bold text-sm sm:text-base text-white truncate max-w-[140px] sm:max-w-xs">
              {screenTitle}
            </span>
          </button>
        ) : (
          <div
            onClick={() => setActiveTab('inicio')}
            className="min-h-[44px] flex items-center gap-2.5 cursor-pointer group py-1"
          >
            {/* Custom stylized Coastal Motion Studio mark */}
            <div className="relative w-8 h-8 rounded-lg bg-[#181C1F] border border-white/10 flex items-center justify-center p-1.5 overflow-hidden shadow-inner group-hover:border-[#D4FF3A]/40 transition">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#D4FF3A]">
                <path
                  d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M7 14C8.5 11 11 10.5 13 12C15 13.5 17 13 18 11.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="18" r="1.5" fill="#D4FF3A" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm tracking-tight text-white leading-tight">
                Coastal Motion
              </span>
              <span className="font-mono text-[9px] tracking-wider text-slate-400 uppercase font-semibold">
                STUDIO 2.5
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Right side: Language Switcher and Profile Avatar */}
      <div className="flex items-center gap-2">
        {/* Bilingual Switcher: ES / EN with comfortable thumb targets */}
        <div className="flex items-center bg-[#181C1F] p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setLang('es')}
            className={`min-h-[36px] min-w-[36px] px-2.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              lang === 'es'
                ? 'bg-[#D4FF3A] text-[#0B0F12] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ES
          </button>
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`min-h-[36px] min-w-[36px] px-2.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              lang === 'en'
                ? 'bg-[#D4FF3A] text-[#0B0F12] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>

        {/* User Avatar with comfortable thumb area */}
        <button
          type="button"
          onClick={() => setActiveTab('cuenta')}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center p-1 rounded-xl hover:bg-white/5 active:scale-95 transition cursor-pointer"
          title={lang === 'es' ? 'Cuenta y Credenciales' : 'Account & Credentials'}
          aria-label={t.navCuenta}
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Director Profile"
              className="w-8 h-8 rounded-full object-cover border border-white/20"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#D4FF3A] border-2 border-[#0B0F12]" />
          </div>
        </button>
      </div>
    </header>
  );
};
