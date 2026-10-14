import React from 'react';
import { Volume2, Music } from 'lucide-react';

interface SimulatedAudioSectionProps {
  simulatedAudio: boolean;
  onToggleAudio: () => void;
  audioType: string;
  onSelectAudioType: (type: string) => void;
  audioPrompt: string;
  onChangeAudioPrompt: (prompt: string) => void;
  lang: 'es' | 'en';
}

export const SimulatedAudioSection: React.FC<SimulatedAudioSectionProps> = ({
  simulatedAudio,
  onToggleAudio,
  audioType,
  onSelectAudioType,
  audioPrompt,
  onChangeAudioPrompt,
  lang,
}) => {
  const audioPresets = [
    {
      id: 'cinematic_ambient',
      label: lang === 'es' ? 'Ambiente Marino' : 'Ocean Ambient',
      sub: 'Olas y Brisa',
      defaultPrompt:
        'Sonido ambiental de olas rompiendo en los acantilados y brisa marina suave.',
    },
    {
      id: 'engine_sfx',
      label: lang === 'es' ? 'Motor & SFX' : 'Engine & SFX',
      sub: 'Foley Mecánico',
      defaultPrompt:
        'Sonido de motor deportivo V8 acelerando en carretera de asfalto y cambio de marchas.',
    },
    {
      id: 'soundtrack',
      label: lang === 'es' ? 'Banda Sonora' : 'Soundtrack',
      sub: 'Cinemática',
      defaultPrompt:
        'Música orquestal cinemática con sintetizadores cálidos a 120 bpm.',
    },
    {
      id: 'voiceover',
      label: lang === 'es' ? 'Voz en Off' : 'Voiceover',
      sub: 'Narración IA',
      defaultPrompt:
        'Voz suave y elegante describiendo el viaje mediterráneo en tono documental.',
    },
  ];

  return (
    <div className="bg-[#181C1F] border border-white/10 rounded-2xl p-4 space-y-3.5 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#262A2E] text-[#D4FF3A] flex items-center justify-center shrink-0">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-heading font-semibold text-xs text-white uppercase tracking-wider">
                {lang === 'es' ? 'Audio Simulado' : 'Simulated Audio'}
              </h4>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#D4FF3A] text-[#0B0F12] font-bold">
                Higgsfield API
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {lang === 'es'
                ? 'Soporta cualquier tipo de audio: ambiente, música, efectos SFX o voz'
                : 'Supports any audio type: ambient, soundtrack, SFX or voiceover'}
            </p>
          </div>
        </div>

        {/* Toggle Switch with accessible touch area */}
        <button
          type="button"
          onClick={onToggleAudio}
          aria-label={lang === 'es' ? 'Activar o desactivar audio simulado' : 'Toggle simulated audio'}
          className="min-h-[44px] min-w-[48px] flex items-center justify-center -mr-2 cursor-pointer"
        >
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
              simulatedAudio ? 'bg-[#D4FF3A]' : 'bg-[#262A2E]'
            }`}
          >
            <div
              className={`bg-[#0B0F12] w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                simulatedAudio ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </div>
        </button>
      </div>

      {simulatedAudio ? (
        <div className="space-y-3 pt-2 border-t border-white/5 animate-in fade-in duration-200">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>
                {lang === 'es'
                  ? 'Tipo de audio simulado:'
                  : 'Simulated audio type:'}
              </span>
              <span className="text-[#D4FF3A]">100% Coherencia IA</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {audioPresets.map((preset) => {
                const isSelected = audioType === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      onSelectAudioType(preset.id);
                      onChangeAudioPrompt(preset.defaultPrompt);
                    }}
                    className={`min-h-[48px] p-2.5 rounded-xl text-left border transition cursor-pointer flex flex-col justify-between active:scale-95 ${
                      isSelected
                        ? 'bg-[#262A2E] border-[#D4FF3A] text-white ring-1 ring-[#D4FF3A]/20'
                        : 'bg-[#12181F] border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[11px] font-heading font-semibold truncate">
                      {preset.label}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 mt-0.5 truncate">
                      {preset.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>
                {lang === 'es'
                  ? 'Prompt de audio simulado (Cualquier estilo):'
                  : 'Simulated audio prompt (Any style):'}
              </span>
              <span className="text-slate-500">{audioPrompt.length}/200</span>
            </div>
            <input
              type="text"
              value={audioPrompt}
              onChange={(e) => onChangeAudioPrompt(e.target.value)}
              enterKeyHint="done"
              placeholder={
                lang === 'es'
                  ? 'Ej: Motor acelerando, sonido de olas mediterráneas y música suave...'
                  : 'E.g.: Engine revving, Mediterranean waves and subtle music...'
              }
              className="w-full bg-[#12181F] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 font-manrope focus:outline-none focus:border-[#D4FF3A]/50 transition"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 bg-[#12181F] p-2.5 rounded-xl border border-white/5">
            <span className="flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-[#D4FF3A]" />
              <span>Higgsfield Sound Engine (Multi-Modal)</span>
            </span>
            <span className="text-[#D4FF3A] font-semibold">Simulado Nativo</span>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-[#12181F] border border-white/5 text-[11px] font-mono text-slate-400">
          {lang === 'es'
            ? 'Audio simulado desactivado (El vídeo se renderizará en pista muda).'
            : 'Simulated audio disabled (Video will render with silent track).'}
        </div>
      )}
    </div>
  );
};
