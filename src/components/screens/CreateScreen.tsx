import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, KeyRound, Film, Check, Lightbulb, Loader2 } from 'lucide-react';
import { AspectRatio, ModelType } from '../../types';
import { useReferenceImages } from '../../hooks/useReferenceImages';
import { ScreenHeaderBadges } from '../common/ScreenHeaderBadges';
import { ModelDropdown } from '../common/ModelDropdown';
import { ModelSelectorModal } from '../modals/ModelSelectorModal';
import { ModeSelector } from './create/ModeSelector';
import { ReferenceImageManager } from './create/ReferenceImageManager';
import { CinematicPromptInput } from './create/CinematicPromptInput';
import { InferenceParamsSection } from './create/InferenceParamsSection';
import { SimulatedAudioSection } from './create/SimulatedAudioSection';

export const CreateScreen: React.FC = () => {
  const {
    t,
    startGeneration,
    showToast,
    lang,
    selectedModel,
    allModels,
  } = useApp();

  const [mode, setMode] = useState<ModelType>('seedance-i2v');
  const [showModelModal, setShowModelModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    images,
    activeIndex,
    currentImage,
    isDragging,
    setIsDragging,
    processFiles,
    handleAddPreset,
    handleRemoveImage,
    handleCycleRole,
    setActiveIndex,
  } = useReferenceImages(showToast, lang);

  const [prompt, setPrompt] = useState(
    'Una mujer conduce un Mercedes deportivo amarillo limón, con interior de piel blanca, por una carretera costera mediterránea. La cámara comienza dentro del vehículo y realiza un movimiento cinematográfico fluido hacia el exterior capturando los acantilados y el mar turquesa a 60fps.'
  );

  const [duration, setDuration] = useState<number>(8);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('720p');
  const [motionLevel, setMotionLevel] = useState<number>(6);

  const [simulatedAudio, setSimulatedAudio] = useState<boolean>(true);
  const [audioType, setAudioType] = useState<string>('cinematic_ambient');
  const [audioPrompt, setAudioPrompt] = useState<string>('');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimizePrompt = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setPrompt((prev) => {
        if (prev.includes('anamorphic lens')) return prev;
        return `${prev.trim()}, captured with anamorphic master prime lens, natural golden sunlight caustic reflections, photorealistic 8k render, hyper-smooth gimbal stabilization.`;
      });
      showToast(
        lang === 'es'
          ? 'Prompt optimizado con parámetros cinemáticos'
          : 'Prompt optimized with cinematic parameters'
      );
    }, 600);
  };

  const handleGenerate = () => {
    // Precise validation with clear, actionable error messages
    if (!prompt.trim()) {
      showToast(
        lang === 'es'
          ? 'Falta la descripción del vídeo. Escribe qué escena deseas ver (por ejemplo: "olas en la costa al atardecer") para continuar.'
          : 'Video description is missing. Please type what scene you want to see (e.g., "coastal waves at sunset") to proceed.'
      );
      return;
    }

    if (mode === 'seedance-i2v' && (!currentImage || !currentImage.url)) {
      showToast(
        lang === 'es'
          ? 'Falta la imagen de referencia. Selecciona una de las imágenes disponibles o sube una fotografía para animarla.'
          : 'Missing reference image. Please select an available image or upload a photograph to animate.'
      );
      return;
    }

    setIsSubmitting(true);

    const finalPrompt =
      simulatedAudio && audioPrompt.trim()
        ? `${prompt} [Audio: ${audioPrompt.trim()}]`
        : prompt;

    setTimeout(() => {
      startGeneration({
        prompt: finalPrompt,
        model: selectedModel.name,
        duration,
        aspectRatio,
        resolution,
        motionLevel,
        referenceImage: currentImage?.url || '',
        simulatedAudio,
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-32 pt-2">
      {/* Top Status Badges */}
      <ScreenHeaderBadges
        leftText={t.cloudOnline}
        rightText={t.directApiActive}
        rightIcon={<Zap className="w-3.5 h-3.5 fill-current" />}
      />

      {/* Screen Title synchronized with Nav Button */}
      <div className="space-y-1">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
          {t.navCrear}
        </h1>
        <p className="text-xs text-slate-400 font-manrope leading-relaxed">
          {lang === 'es'
            ? 'Configura tu escena cinematográfica y sintetiza vídeo a partir de texto o imágenes.'
            : 'Configure your cinematic scene and synthesize video from text or keyframe images.'}
        </p>
      </div>

      {/* Visual Onboarding Tip for first-time / non-expert users */}
      <div className="p-3.5 rounded-2xl bg-[#12181F] border border-[#D4FF3A]/20 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-[#D4FF3A]/10 text-[#D4FF3A] flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-heading font-semibold text-xs text-[#D4FF3A]">
            {lang === 'es' ? 'Consejo rápido de creación' : 'Quick Creation Tip'}
          </h4>
          <p className="text-[11px] text-slate-300 font-manrope leading-relaxed">
            {lang === 'es'
              ? 'Puedes animar fotos cargadas (modo Foto a Vídeo) o crear metrajes desde cero con solo describir la escena (modo Texto a Vídeo). Ajusta la barra de segundos según tu red social.'
              : 'You can animate loaded photos (Image-to-Video) or generate clips from scratch with a description (Text-to-Video). Adjust the duration slider for your target platform.'}
          </p>
        </div>
      </div>

      {/* Segmented Mode Control */}
      <ModeSelector
        mode={mode}
        onChange={setMode}
        imageToVideoLabel={t.imageToVideo}
        textToVideoLabel={t.textToVideo}
      />

      {/* Neural Engine Card with Reusable Model Dropdown */}
      <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
              {t.neuralEngine}
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#262A2E] text-[#D4FF3A] font-bold border border-white/5">
              {allModels.length} {lang === 'es' ? 'en API' : 'in API'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowModelModal(true)}
            className="min-h-[36px] px-3 py-1 rounded-full bg-[#262A2E] hover:bg-[#313539] text-[#D4FF3A] font-mono text-[11px] font-semibold border border-white/10 transition cursor-pointer"
          >
            {lang === 'es' ? 'Ver Catálogo Completo ↗' : 'View Full Catalog ↗'}
          </button>
        </div>

        <ModelDropdown
          onSelectModel={(m) => {
            if (m.supportsImageInput && !m.supportsTextInput) setMode('seedance-i2v');
            if (m.supportsTextInput && !m.supportsImageInput) setMode('seedance-t2v');
          }}
        />

        <div className="flex items-start gap-2 text-[11px] text-slate-300 font-manrope pt-1 border-t border-white/5">
          <div className="w-4 h-4 rounded-full bg-[#D4FF3A]/10 text-[#D4FF3A] flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-3 h-3" />
          </div>
          <p>
            {selectedModel.description} ({selectedModel.inferenceTime}, {selectedModel.resolution} nativo, {selectedModel.fps} FPS).
          </p>
        </div>
      </div>

      {/* Multi-Image Reference (Image-to-Video) */}
      {mode === 'seedance-i2v' && (
        <ReferenceImageManager
          images={images}
          activeIndex={activeIndex}
          currentImage={currentImage}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          onSelectImage={setActiveIndex}
          onProcessFiles={processFiles}
          onAddPreset={handleAddPreset}
          onRemoveImage={handleRemoveImage}
          onCycleRole={handleCycleRole}
          aspectRatio={aspectRatio}
          onToggleAspectRatio={() => {
            setAspectRatio((prev) =>
              prev === '16:9' ? '9:16' : prev === '9:16' ? '1:1' : '16:9'
            );
            showToast(`Relación: ${aspectRatio}`);
          }}
          lang={lang}
          baseFrameTitle={t.baseFrame}
          optimizedText={t.optimized}
          angleLockOkText={t.angleLockOk}
        />
      )}

      {/* Cinematic Prompt */}
      <CinematicPromptInput
        prompt={prompt}
        onChange={setPrompt}
        onOptimize={handleOptimizePrompt}
        onClear={() => setPrompt('')}
        isOptimizing={isOptimizing}
        title={t.cinematicPrompt}
        optimizeLabel={t.optimize}
        optimizingLabel={t.optimizing}
        clearLabel={t.clear}
        estimatedTokensLabel={t.estimatedTokens}
        charactersLabel={t.characters}
      />

      {/* Inference Parameters */}
      <InferenceParamsSection
        duration={duration}
        onDurationChange={setDuration}
        aspectRatio={aspectRatio}
        onAspectRatioChange={setAspectRatio}
        resolution={resolution}
        onResolutionChange={setResolution}
        motionLevel={motionLevel}
        onMotionLevelChange={setMotionLevel}
        lang={lang}
        t={t}
      />

      {/* Simulated Audio */}
      <SimulatedAudioSection
        simulatedAudio={simulatedAudio}
        onToggleAudio={() => setSimulatedAudio(!simulatedAudio)}
        audioType={audioType}
        onSelectAudioType={setAudioType}
        audioPrompt={audioPrompt}
        onChangeAudioPrompt={setAudioPrompt}
        lang={lang}
      />

      {/* Credit Notice */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#12181F] border border-white/5 text-xs text-slate-400 font-manrope">
        <KeyRound className="w-4 h-4 text-[#D4FF3A] shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">{t.creditNotice}</p>
      </div>

      {/* Primary Action Button - Located in comfortable thumb zone */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isSubmitting}
          className="w-full min-h-[56px] bg-[#D4FF3A] hover:bg-[#c2ed2c] active:bg-[#b0dc22] text-[#0B0F12] p-4 rounded-2xl flex items-center justify-between shadow-xl active:scale-[0.98] transition glow-citrus group cursor-pointer disabled:opacity-75"
        >
          <div className="flex items-center gap-3 overflow-hidden mr-2">
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 text-[#0B0F12] animate-spin shrink-0" />
            ) : (
              <Film className="w-6 h-6 text-[#0B0F12] shrink-0" />
            )}
            <span className="font-heading font-bold text-sm sm:text-base text-[#0B0F12] tracking-tight truncate">
              {isSubmitting
                ? lang === 'es'
                  ? 'Iniciando generación...'
                  : 'Starting generation...'
                : lang === 'es'
                ? `Generar con ${selectedModel.name}`
                : `Generate with ${selectedModel.name}`}
            </span>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-[#0B0F12] text-[#D4FF3A] font-mono text-xs font-bold shrink-0">
            {duration}s • {resolution}
          </span>
        </button>
      </div>

      {/* Full Catalog Modal */}
      <ModelSelectorModal
        isOpen={showModelModal}
        onClose={() => setShowModelModal(false)}
      />
    </div>
  );
};
