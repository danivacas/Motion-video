import React from 'react';
import { Mail, Copy, Check, LogOut } from 'lucide-react';
import { useClipboard } from '../../../hooks/useClipboard';

interface MagicLinkSectionProps {
  userEmail: string;
  onResendLink: () => void;
  onSignOut: () => void;
  showToast: (msg: string) => void;
  lang: 'es' | 'en';
  t: {
    magicLinkTitle: string;
    activeSession: string;
    loggedInAs: string;
    magicLinkNotice: string;
    resendLink: string;
    signOut: string;
  };
}

export const MagicLinkSection: React.FC<MagicLinkSectionProps> = ({
  userEmail,
  onResendLink,
  onSignOut,
  showToast,
  lang,
  t,
}) => {
  const { copied, copy } = useClipboard({
    onSuccess: () =>
      showToast(lang === 'es' ? 'Email copiado' : 'Email copied'),
  });

  return (
    <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#D4FF3A]" />
          <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
            {t.magicLinkTitle}
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#262A2E] text-[#D4FF3A] font-mono text-[11px] font-bold border border-white/10">
          {t.activeSession}
        </span>
      </div>

      {/* User Card */}
      <div className="bg-[#12181F] p-3 rounded-xl border border-white/5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Director Profile"
              className="w-10 h-10 rounded-full object-cover border border-white/10"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#D4FF3A] ring-2 ring-[#12181F]" />
          </div>
          <div className="overflow-hidden">
            <span className="text-[10px] text-slate-400 block font-manrope">
              {t.loggedInAs}
            </span>
            <span className="font-mono text-xs font-semibold text-white truncate block">
              {userEmail}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => copy(userEmail)}
          className="p-2 rounded-lg bg-[#262A2E] hover:bg-[#313539] text-slate-300 hover:text-white border border-white/10 transition cursor-pointer shrink-0"
          title="Copiar email"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-[#D4FF3A]" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed font-manrope">
        {t.magicLinkNotice}
      </p>

      <div className="flex items-center gap-2 pt-1 border-t border-white/5">
        <button
          type="button"
          onClick={onResendLink}
          className="flex-1 py-2 px-3 rounded-xl bg-[#262A2E] hover:bg-[#313539] border border-white/10 text-xs font-heading font-medium text-white transition active:scale-95 cursor-pointer text-center"
        >
          {t.resendLink}
        </button>
        <button
          type="button"
          onClick={onSignOut}
          className="py-2 px-3 rounded-xl bg-transparent hover:bg-white/5 border border-white/10 text-xs font-heading font-medium text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{t.signOut}</span>
        </button>
      </div>
    </div>
  );
};
