export type Language = 'es' | 'en';

export type TabType = 'inicio' | 'crear' | 'galeria' | 'instagram' | 'cuenta' | 'pipeline';

export type ModelType = string;

export type AspectRatio = '16:9' | '9:16' | '1:1';

export type LicenseStatus = 'active' | 'pending' | 'cancelled';

export type ModelCategory = 'all' | 'seedance' | 'higgsfield-native' | 'video-partners' | 'image-gen';

export interface HiggsfieldModelInfo {
  id: string;
  name: string;
  tagline: string;
  category: 'seedance' | 'higgsfield-native' | 'video-partners' | 'image-gen';
  categoryLabel: string;
  badge: string;
  badgeType: 'lime' | 'slate' | 'amber' | 'cyan' | 'purple';
  type: 'video' | 'image' | 'motion';
  description: string;
  inferenceTime: string;
  resolution: string;
  maxDuration: string;
  endpoint: string;
  costPerRun: string;
  fps: number;
  supportsImageInput: boolean;
  supportsTextInput: boolean;
  supportsAudio: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  clipsCount: number;
  rendersCount: number;
  statusText: string;
  thumbnail: string;
  updatedAt: string;
}

export interface GenerationItem {
  id: string;
  title: string;
  model: string;
  duration: number; // in seconds
  aspectRatio: AspectRatio;
  resolution: string;
  fps: number;
  prompt: string;
  thumbnail: string;
  videoUrl: string;
  fileSizeMb: number;
  createdAt: string;
  isFavorite?: boolean;
  tags: string[];
  motionLevel: number;
  simulatedAudio: boolean;
}

export interface PipelineProgress {
  isActive: boolean;
  step: number; // 1 to 4
  stepName: string;
  percentage: number;
  currentFrame: number;
  totalFrames: number;
  remainingSeconds: number;
  logs: { id: string; text: string; status: 'completed' | 'running' | 'pending' }[];
  gpuInference: string;
  apiLatency: string;
  runCost: string;
  node: string;
  currentItem?: GenerationItem;
}
