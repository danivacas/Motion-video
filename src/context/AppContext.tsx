import React, { createContext, useContext, useState, useEffect } from 'react';
import { GenerationItem, HiggsfieldModelInfo, Language, LicenseStatus, PipelineProgress, ProjectItem, TabType } from '../types';
import { INITIAL_GENERATIONS, INITIAL_PROJECTS, REFERENCE_PRESETS } from '../data/mockData';
import { HIGGSFIELD_MODELS } from '../data/modelsData';
import { translations } from '../utils/translations';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.es;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  generations: GenerationItem[];
  projects: ProjectItem[];
  pipeline: PipelineProgress;
  allModels: HiggsfieldModelInfo[];
  selectedModel: HiggsfieldModelInfo;
  setSelectedModel: (model: HiggsfieldModelInfo) => void;
  selectModelById: (id: string) => void;
  startGeneration: (params: {
    prompt: string;
    model: string;
    duration: number;
    aspectRatio: '16:9' | '9:16' | '1:1';
    resolution: string;
    motionLevel: number;
    referenceImage: string;
    simulatedAudio: boolean;
  }) => void;
  cancelGeneration: () => void;
  licenseStatus: LicenseStatus;
  setLicenseStatus: (status: LicenseStatus) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  activeVideoModal: GenerationItem | null;
  setActiveVideoModal: (item: GenerationItem | null) => void;
  selectedInstagramItem: GenerationItem;
  setSelectedInstagramItem: (item: GenerationItem) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearCache: () => void;
  addProject: (title: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('coastal_lang');
    return (saved === 'en' || saved === 'es') ? saved : 'es';
  });

  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [generations, setGenerations] = useState<GenerationItem[]>(INITIAL_GENERATIONS);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus>('active');
  const [apiKey, setApiKeyState] = useState<string>(() => {
    return localStorage.getItem('coastal_higgsfield_key') || 'hf_live_9a87d6e5c4b3a2f1_seedance25';
  });

  const [allModels] = useState<HiggsfieldModelInfo[]>(HIGGSFIELD_MODELS);
  const [selectedModel, setSelectedModel] = useState<HiggsfieldModelInfo>(HIGGSFIELD_MODELS[0]);

  const selectModelById = (id: string) => {
    const found = allModels.find((m) => m.id === id);
    if (found) {
      setSelectedModel(found);
      setActiveTab('crear');
      showToast(lang === 'es' ? `Modelo activado: ${found.name}` : `Model activated: ${found.name}`);
    }
  };

  const [selectedInstagramItem, setSelectedInstagramItem] = useState<GenerationItem>(INITIAL_GENERATIONS[2] || INITIAL_GENERATIONS[0]);
  const [activeVideoModal, setActiveVideoModal] = useState<GenerationItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active pipeline state
  const [pipeline, setPipeline] = useState<PipelineProgress>({
    isActive: true,
    step: 3,
    stepName: 'Sintetizando fotogramas',
    percentage: 68,
    currentFrame: 120,
    totalFrames: 176,
    remainingSeconds: 18,
    logs: [
      { id: '1', text: 'Procesando fotograma clave inicial...', status: 'completed' },
      { id: '2', text: 'Inyectando movimiento latente (vector curvatura)...', status: 'running' },
      { id: '3', text: 'Sintetizando textura costera y grano cinematográfico', status: 'pending' },
      { id: '4', text: 'Empaquetado MP4 H.264 High Profile (720p 60fps)', status: 'pending' },
    ],
    gpuInference: '82% • A100',
    apiLatency: '42ms',
    runCost: '0.35 CR',
    node: 'HF-EU-04',
    currentItem: INITIAL_GENERATIONS[2],
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('coastal_lang', newLang);
  };

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    localStorage.setItem('coastal_higgsfield_key', key);
    showToast(translations[lang].keySaved);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Pipeline execution timer simulation
  useEffect(() => {
    if (!pipeline.isActive) return;

    const interval = setInterval(() => {
      setPipeline((prev) => {
        if (!prev.isActive) return prev;
        if (prev.percentage >= 100) {
          // Completed
          return {
            ...prev,
            isActive: false,
            percentage: 100,
            remainingSeconds: 0,
            currentFrame: prev.totalFrames,
            logs: prev.logs.map(l => ({ ...l, status: 'completed' }))
          };
        }

        const nextPercent = Math.min(100, prev.percentage + 2);
        const nextFrames = Math.floor((nextPercent / 100) * prev.totalFrames);
        const nextRemaining = Math.max(0, Math.ceil(((100 - nextPercent) / 100) * 26));

        // update logs status
        const logs = [...prev.logs];
        if (nextPercent > 25 && logs[0].status !== 'completed') logs[0].status = 'completed';
        if (nextPercent > 25 && logs[1].status === 'pending') logs[1].status = 'running';
        if (nextPercent > 60 && logs[1].status !== 'completed') logs[1].status = 'completed';
        if (nextPercent > 60 && logs[2].status === 'pending') logs[2].status = 'running';
        if (nextPercent > 88 && logs[2].status !== 'completed') logs[2].status = 'completed';
        if (nextPercent > 88 && logs[3].status === 'pending') logs[3].status = 'running';
        if (nextPercent >= 100) logs[3].status = 'completed';

        let step = 1;
        let stepName = 'Procesando fotograma';
        if (nextPercent < 30) {
          step = 1;
          stepName = 'Preparando tensores latentes';
        } else if (nextPercent < 60) {
          step = 2;
          stepName = 'Inyectando movimiento latente';
        } else if (nextPercent < 88) {
          step = 3;
          stepName = 'Sintetizando fotogramas';
        } else {
          step = 4;
          stepName = 'Empaquetado MP4';
        }

        return {
          ...prev,
          percentage: nextPercent,
          currentFrame: nextFrames,
          remainingSeconds: nextRemaining,
          step,
          stepName,
          logs,
        };
      });
    }, 800);

    return () => clearInterval(interval);
  }, [pipeline.isActive]);

  const startGeneration = (params: {
    prompt: string;
    model: string;
    duration: number;
    aspectRatio: '16:9' | '9:16' | '1:1';
    resolution: string;
    motionLevel: number;
    referenceImage: string;
    simulatedAudio: boolean;
  }) => {
    const newItem: GenerationItem = {
      id: `gen-${Date.now()}`,
      title: `Coastal_Seed_${Math.floor(1000 + Math.random() * 9000)}`,
      model: params.model,
      duration: params.duration,
      aspectRatio: params.aspectRatio,
      resolution: params.resolution,
      fps: 60,
      prompt: params.prompt,
      thumbnail: params.referenceImage || REFERENCE_PRESETS[0].url,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      fileSizeMb: Number((10 + Math.random() * 6).toFixed(1)),
      createdAt: 'Justo ahora',
      isFavorite: false,
      tags: ['#Seedance25', '#CoastalMotion', '#NewRender'],
      motionLevel: params.motionLevel,
      simulatedAudio: params.simulatedAudio,
    };

    setGenerations((prev) => [newItem, ...prev]);
    setSelectedInstagramItem(newItem);

    const totalFrames = Math.max(120, Math.round(params.duration * 24));
    const runCost = `${(0.07 * params.duration).toFixed(2)} CR`;

    setPipeline({
      isActive: true,
      step: 1,
      stepName: 'Procesando fotograma clave inicial',
      percentage: 4,
      currentFrame: 6,
      totalFrames,
      remainingSeconds: Math.round(params.duration * 1.6),
      logs: [
        { id: '1', text: 'Procesando fotograma clave inicial...', status: 'running' },
        { id: '2', text: 'Inyectando movimiento latente (vector curvatura)...', status: 'pending' },
        { id: '3', text: 'Sintetizando textura costera y grano cinematográfico', status: 'pending' },
        { id: '4', text: `Empaquetado MP4 H.264 High Profile (${params.resolution})`, status: 'pending' },
      ],
      gpuInference: '88% • A100-SXM4',
      apiLatency: '38ms',
      runCost,
      node: 'HF-EU-04',
      currentItem: newItem,
    });

    setActiveTab('pipeline');
    showToast(lang === 'es' ? 'Renderizado iniciado en Higgsfield Cloud' : 'Render started on Higgsfield Cloud');
  };

  const cancelGeneration = () => {
    setPipeline((prev) => ({
      ...prev,
      isActive: false,
    }));
    showToast(lang === 'es' ? 'Render cancelado por el usuario' : 'Render cancelled by user');
  };

  const clearCache = () => {
    setGenerations(INITIAL_GENERATIONS.slice(0, 3));
    showToast(translations[lang].cacheClearedToast);
  };

  const addProject = (title: string) => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title,
      clipsCount: 1,
      rendersCount: 1,
      statusText: lang === 'es' ? 'Creado ahora' : 'Created now',
      thumbnail: REFERENCE_PRESETS[0].url,
      updatedAt: lang === 'es' ? 'Ahora' : 'Just now',
    };
    setProjects((prev) => [newProj, ...prev]);
    showToast(lang === 'es' ? 'Proyecto creado localmente' : 'Project created locally');
  };

  const t = translations[lang];

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        activeTab,
        setActiveTab,
        generations,
        projects,
        pipeline,
        allModels,
        selectedModel,
        setSelectedModel,
        selectModelById,
        startGeneration,
        cancelGeneration,
        licenseStatus,
        setLicenseStatus,
        apiKey,
        setApiKey,
        activeVideoModal,
        setActiveVideoModal,
        selectedInstagramItem,
        setSelectedInstagramItem,
        toastMessage,
        showToast,
        clearCache,
        addProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
