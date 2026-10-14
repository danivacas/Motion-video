import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';
import { Home, Video, LayoutGrid, Share2, ShieldCheck } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t } = useApp();

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'inicio',
      label: t.navInicio,
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'crear',
      label: t.navCrear,
      icon: <Video className="w-5 h-5" />,
    },
    {
      id: 'galeria',
      label: t.navGaleria,
      icon: <LayoutGrid className="w-5 h-5" />,
    },
    {
      id: 'instagram',
      label: t.navInstagram,
      icon: <Share2 className="w-5 h-5" />,
    },
    {
      id: 'cuenta',
      label: t.navCuenta,
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F12]/95 backdrop-blur-xl border-t border-white/[0.08] px-2 py-1 max-w-lg mx-auto sm:max-w-2xl md:max-w-3xl"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            activeTab === item.id || (activeTab === 'pipeline' && item.id === 'crear');
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`min-h-[52px] min-w-[56px] flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive
                  ? 'text-[#D4FF3A]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative mb-1">
                {item.icon}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D4FF3A] glow-citrus-sm" />
                )}
              </div>
              <span
                className={`text-[11px] tracking-tight leading-tight ${
                  isActive ? 'font-bold text-[#D4FF3A]' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
