import React from 'react';
import { WifiOff } from 'lucide-react';

interface OfflineBannerProps {
  isOnline: boolean;
  lang: 'es' | 'en';
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline, lang }) => {
  if (isOnline) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="bg-amber-500/15 border-b border-amber-500/30 text-amber-200 px-4 py-2.5 text-xs flex items-center justify-center gap-2.5 shadow-sm"
    >
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span className="font-manrope leading-snug">
        {lang === 'es'
          ? 'Estás sin conexión a internet. Puedes seguir navegando tus vídeos guardados; la generación en la nube se reanudará cuando vuelvas a conectarte.'
          : 'You are currently offline. You can browse saved videos; cloud rendering will resume once reconnected.'}
      </span>
    </aside>
  );
};
