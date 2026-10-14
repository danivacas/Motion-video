import { useState, useCallback } from 'react';
import { REFERENCE_PRESETS } from '../data/mockData';

export interface ReferenceImageItem {
  id: string;
  name: string;
  url: string;
  resolution: string;
  role: 'start' | 'keyframe' | 'end';
}

const DEFAULT_IMAGES: ReferenceImageItem[] = [
  {
    id: 'ref-1',
    name: 'seed_ref_01.jpg',
    url: REFERENCE_PRESETS[0].url,
    resolution: '768 × 1344 px',
    role: 'start',
  },
  {
    id: 'ref-2',
    name: 'concept_vision_02.png',
    url: REFERENCE_PRESETS[1].url,
    resolution: '1080 × 1920 px',
    role: 'end',
  },
];

export function useReferenceImages(onToast?: (msg: string) => void, lang: 'es' | 'en' = 'es') {
  const [images, setImages] = useState<ReferenceImageItem[]>(DEFAULT_IMAGES);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const currentImage = images[activeIndex] || images[0] || {
    id: 'empty',
    name: 'placeholder.jpg',
    url: REFERENCE_PRESETS[0].url,
    resolution: '1080 × 1920 px',
    role: 'start' as const,
  };

  const processFiles = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;
      const newItems: ReferenceImageItem[] = [];

      files.forEach((file, idx) => {
        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
          if (uploadEvent.target?.result) {
            newItems.push({
              id: `custom-${Date.now()}-${idx}`,
              name: file.name,
              url: uploadEvent.target.result as string,
              resolution: '1080 × 1920 px',
              role: images.length === 0 && idx === 0 ? 'start' : 'keyframe',
            });

            if (newItems.length === files.length) {
              setImages((prev) => [...prev, ...newItems]);
              setActiveIndex(images.length);
              onToast?.(
                lang === 'es'
                  ? `${files.length} imagen(es) añadida(s)`
                  : `${files.length} image(s) added`
              );
            }
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [images.length, lang, onToast]
  );

  const handleAddPreset = useCallback(() => {
    const nextPresetIdx = images.length % REFERENCE_PRESETS.length;
    const preset = REFERENCE_PRESETS[nextPresetIdx];
    const newImg: ReferenceImageItem = {
      id: `preset-${Date.now()}`,
      name: preset.name,
      url: preset.url,
      resolution: preset.resolution,
      role: images.length >= 2 ? 'end' : 'keyframe',
    };
    setImages((prev) => [...prev, newImg]);
    setActiveIndex(images.length);
    onToast?.(lang === 'es' ? 'Fotograma clave añadido' : 'Keyframe added');
  }, [images.length, lang, onToast]);

  const handleRemoveImage = useCallback(
    (indexToRemove: number) => {
      if (images.length <= 1) {
        onToast?.(
          lang === 'es'
            ? 'Debe haber al menos 1 imagen de referencia'
            : 'Must have at least 1 reference image'
        );
        return;
      }
      setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
      if (activeIndex >= indexToRemove && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
      onToast?.(lang === 'es' ? 'Imagen eliminada' : 'Image removed');
    },
    [images.length, activeIndex, lang, onToast]
  );

  const handleCycleRole = useCallback((idx: number) => {
    setImages((prev) =>
      prev.map((item, i) => {
        if (i !== idx) return item;
        const nextRole =
          item.role === 'start'
            ? 'keyframe'
            : item.role === 'keyframe'
            ? 'end'
            : 'start';
        return { ...item, role: nextRole };
      })
    );
  }, []);

  return {
    images,
    activeIndex,
    setActiveIndex,
    currentImage,
    isDragging,
    setIsDragging,
    processFiles,
    handleAddPreset,
    handleRemoveImage,
    handleCycleRole,
  };
}
