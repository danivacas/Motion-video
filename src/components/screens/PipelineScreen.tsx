import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, RefreshCw, CheckCircle2, Film } from 'lucide-react';
import { ScreenHeaderBadges } from '../common/ScreenHeaderBadges';
import { DiffusionEngineHeader } from './pipeline/DiffusionEngineHeader';
import { ActiveGenerationCard } from './pipeline/ActiveGenerationCard';
import { FinalResultCard } from './pipeline/FinalResultCard';
import { EmptyState } from '../common/EmptyState';

export const PipelineScreen: React.FC = () => {
  const {
    t,
    pipeline,
    cancelGeneration,
    setActiveTab,
    setSelectedInstagramItem,
    showToast,
    lang,
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'active' | 'final'>(
    pipeline.percentage >= 100 || !pipeline.isActive ? 'final' : 'active'
  );

  const currentItem = pipeline.currentItem;

  const handleSendToInstagram = () => {
    if (currentItem) {
      setSelectedInstagramItem(currentItem);
    }
    setActiveTab('instagram');
    showToast(
      lang === 'es'
        ? 'Metraje enviado a la pestaña Instagram listo para exportar'
        : 'Footage sent to Instagram tab ready for export'
    );
  };

  const handleDownload = () => {
    showToast(
      lang === 'es'
        ? 'Descargando renderizado en alta definición MP4...'
        : 'Downloading high-definition MP4 render...'
    );
  };

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* Top Status Badges */}
      <ScreenHeaderBadges
        leftText={pipeline.isActive ? t.pipelineActive : t.renderCompleted}
        rightText={pipeline.node}
        rightIcon={<Zap className="w-3.5 h-3.5 fill-current" />}
        isPulse={pipeline.isActive}
      />

      {/* Screen Title synchronized */}
      <div className="space-y-1">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
          {lang === 'es' ? 'Progreso de Generación' : 'Generation Progress'}
        </h1>
        <p className="text-xs text-slate-400 font-manrope leading-relaxed">
          {lang === 'es'
            ? 'Monitorea en tiempo real la síntesis neuronal y accede al resultado final en alta definición.'
            : 'Monitor neural synthesis in real-time and access the final high-definition clip.'}
        </p>
      </div>

      {!currentItem && !pipeline.isActive ? (
        <EmptyState
          icon={<Film className="w-6 h-6 text-[#D4FF3A]" />}
          title={
            lang === 'es'
              ? 'No hay ninguna generación en curso'
              : 'No active generation in progress'
          }
          description={
            lang === 'es'
              ? 'Inicia la creación de un nuevo vídeo desde la pestaña Crear para ver aquí su proceso de renderizado paso a paso.'
              : 'Start a new video from the Create tab to see its step-by-step rendering process here.'
          }
          actionLabel={lang === 'es' ? 'Ir a Crear' : 'Go to Create'}
          onAction={() => setActiveTab('crear')}
        />
      ) : (
        <>
          {/* Diffusion Engine Card */}
          <DiffusionEngineHeader
            modelName={currentItem?.model || 'Seedance 2.5 Image-to-Video'}
            pipeline={pipeline}
            t={t}
          />

          {/* Sub Tabs: Generación Activa vs Resultado Final with comfortable thumb sizing */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#181C1F] rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTabSub('active')}
              className={`min-h-[46px] flex items-center justify-center gap-2 py-2.5 rounded-xl font-heading font-semibold text-xs sm:text-sm transition cursor-pointer active:scale-95 ${
                activeTabSub === 'active'
                  ? 'bg-[#262A2E] text-white shadow-sm border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <RefreshCw
                className={`w-4 h-4 ${
                  pipeline.isActive ? 'animate-spin text-[#D4FF3A]' : ''
                }`}
              />
              <span>{t.tabActiveGen}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTabSub('final')}
              className={`min-h-[46px] flex items-center justify-center gap-2 py-2.5 rounded-xl font-heading font-semibold text-xs sm:text-sm transition cursor-pointer active:scale-95 ${
                activeTabSub === 'final'
                  ? 'bg-[#262A2E] text-[#D4FF3A] shadow-sm border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.tabFinalResult}</span>
            </button>
          </div>

          {/* Active Generation or Final Result Card */}
          {activeTabSub === 'active' ? (
            <ActiveGenerationCard
              pipeline={pipeline}
              currentItem={currentItem}
              onCancel={cancelGeneration}
              t={t}
            />
          ) : (
            <FinalResultCard
              currentItem={currentItem}
              onSendToInstagram={handleSendToInstagram}
              onDownload={handleDownload}
              t={t}
            />
          )}
        </>
      )}
    </div>
  );
};
