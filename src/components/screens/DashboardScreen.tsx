import React from 'react';
import { useApp } from '../../context/AppContext';
import { Zap } from 'lucide-react';
import { ScreenHeaderBadges } from '../common/ScreenHeaderBadges';
import { ModelDropdown } from '../common/ModelDropdown';
import { ShowreelPlayer } from './dashboard/ShowreelPlayer';
import { QuickActionsSection } from './dashboard/QuickActionsSection';
import { RecentProjectsSection } from './dashboard/RecentProjectsSection';
import { RecentGenerationsSection } from './dashboard/RecentGenerationsSection';

export const DashboardScreen: React.FC = () => {
  const {
    t,
    setActiveTab,
    generations,
    projects,
    addProject,
    setActiveVideoModal,
    lang,
    allModels,
  } = useApp();

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* Top Status Badges */}
      <ScreenHeaderBadges
        leftText={t.visualAiStudio}
        rightText={t.higgsfieldVersion}
        rightIcon={<Zap className="w-3.5 h-3.5 fill-current" />}
      />

      {/* Screen Title synchronized with Nav Button */}
      <div className="space-y-1">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
          {t.creativeSpace}
        </h1>
        <p className="text-xs text-slate-400 font-manrope leading-relaxed">
          {t.storageNotice}
        </p>
      </div>

      {/* Showreel Player */}
      <ShowreelPlayer fpsShowreelTag={t.fpsShowreelTag} />

      {/* Quick Actions (Hero Create + IG + Gallery) in thumb reach zone */}
      <QuickActionsSection onNavigate={setActiveTab} t={t} />

      {/* Featured Models & Reusable Model Dropdown */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-base text-white">
              {t.featuredModels}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#181C1F] text-[#D4FF3A] font-mono text-[10px] font-bold border border-white/10">
              {allModels.length} {lang === 'es' ? 'en API' : 'in API'}
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-wider text-slate-400 font-semibold uppercase">
            {t.seedanceCore}
          </span>
        </div>

        <ModelDropdown onSelectModel={() => setActiveTab('crear')} />
      </div>

      {/* Recent Projects Section */}
      <RecentProjectsSection
        projects={projects}
        onAddProject={addProject}
        lang={lang}
        t={t}
      />

      {/* Recent Generations Grid */}
      <RecentGenerationsSection
        generations={generations}
        onSelectVideo={setActiveVideoModal}
        onNavigateGallery={() => setActiveTab('galeria')}
        lang={lang}
        t={t}
      />
    </div>
  );
};
