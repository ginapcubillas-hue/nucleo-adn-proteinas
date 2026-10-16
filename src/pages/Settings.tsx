import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Zap, Mic, MicOff, Gauge, Clock, Eye, Palette, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { Button } from '../components/ui/Button';
import { audioManager } from '../audio/audioManager';
import { initVoces, getVocesEspanol, soportaVoz } from '../audio/vozManager';

export function Settings() {
  const {
    modoOscuro, toggleModoOscuro,
    musicaOn, setMusicaOn,
    volumenMusica, setVolumenMusica,
    volumenEfectos, setVolumenEfectos,
    vozOn, setVozOn,
    velocidadVoz, setVelocidadVoz,
    vozURI, setVozURI,
    reducirAnimaciones, setReducirAnimaciones,
    temporizador, setTemporizador,
    resetProgreso,
  } = useGameStore();

  const [voces, setVoces] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    initVoces().then(() => setVoces(getVocesEspanol()));
  }, []);

  const handleVolumenMusica = (v: number) => {
    setVolumenMusica(v);
    audioManager.setVolumenMusica(v);
  };

  const handleVolumenEfectos = (v: number) => {
    setVolumenEfectos(v);
    audioManager.setVolumenEfectos(v);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20 space-y-4">
      <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 mb-4">Ajustes</h2>

      {/* Apariencia */}
      <Section title="Apariencia" icon={<Palette size={18} />}>
        <ToggleRow
          icon={modoOscuro ? <Eye size={18} /> : <Eye size={18} />}
          label="Modo oscuro"
          value={modoOscuro}
          onChange={toggleModoOscuro}
        />
        <ToggleRow
          icon={<Zap size={18} />}
          label="Reducir animaciones"
          value={reducirAnimaciones}
          onChange={() => setReducirAnimaciones(!reducirAnimaciones)}
        />
      </Section>

      {/* Audio */}
      <Section title="Audio" icon={<Music size={18} />}>
        <ToggleRow
          icon={musicaOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          label="Música de fondo"
          value={musicaOn}
          onChange={() => {
            const nuevo = !musicaOn;
            setMusicaOn(nuevo);
            if (nuevo) audioManager.reanudarMusica(volumenMusica);
            else audioManager.detenerMusica();
          }}
        />
        <SliderRow
          icon={<Music size={16} />}
          label="Volumen música"
          value={volumenMusica}
          min={0}
          max={1}
          step={0.05}
          onChange={handleVolumenMusica}
        />
        <SliderRow
          icon={<Zap size={16} />}
          label="Volumen efectos"
          value={volumenEfectos}
          min={0}
          max={1}
          step={0.05}
          onChange={handleVolumenEfectos}
        />
      </Section>

      {/* Voz */}
      <Section title="Voz del avatar" icon={vozOn ? <Mic size={18} /> : <MicOff size={18} />}>
        {!soportaVoz() ? (
          <p className="text-sm text-slate-400">Tu navegador no soporta la Web Speech API. La app funciona normal solo con texto.</p>
        ) : (
          <>
            <ToggleRow
              icon={vozOn ? <Mic size={18} /> : <MicOff size={18} />}
              label="Voz del avatar"
              value={vozOn}
              onChange={() => setVozOn(!vozOn)}
            />
            {vozOn && (
              <>
                {voces.length > 0 && (
                  <div className="py-2">
                    <label className="text-sm text-slate-500 block mb-1">Voz:</label>
                    <select
                      value={vozURI}
                      onChange={e => setVozURI(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                    >
                      <option value="">Automática (español)</option>
                      {voces.map(v => (
                        <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
                      ))}
                    </select>
                  </div>
                )}
                <SliderRow
                  icon={<Gauge size={16} />}
                  label="Velocidad de voz"
                  value={velocidadVoz}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onChange={v => setVelocidadVoz(v)}
                  formatValue={v => `${v.toFixed(1)}x`}
                />
              </>
            )}
          </>
        )}
      </Section>

      {/* Juego */}
      <Section title="Juego" icon={<Clock size={18} />}>
        <ToggleRow
          icon={<Clock size={18} />}
          label="Temporizador en preguntas"
          value={temporizador}
          onChange={() => setTemporizador(!temporizador)}
        />
      </Section>

      {/* Reset */}
      <Section title="Datos" icon={<RotateCcw size={18} />}>
        <Button variant="error" size="md" onClick={() => {
          if (confirm('¿Seguro que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
            audioManager.tocarEfecto('error');
            resetProgreso();
          }
        }}>
          <span className="flex items-center gap-2"><RotateCcw size={16} /> Reiniciar progreso</span>
        </Button>
      </Section>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
      <h3 className="text-sm font-bold text-slate-500 mb-3 flex items-center gap-2">{icon} {title}</h3>
      {children}
    </div>
  );
}

function ToggleRow({ icon, label, value, onChange }: { icon: React.ReactNode; label: string; value: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">{icon} {label}</span>
      <button
        onClick={() => { audioManager.tocarEfecto('clic'); onChange(); }}
        className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-success-500' : 'bg-slate-300 dark:bg-slate-600'}`}
        role="switch"
        aria-checked={value}
      >
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}

function SliderRow({ icon, label, value, min, max, step, onChange, formatValue }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  formatValue?: (v: number) => string;
}) {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-1">
        <span className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">{icon} {label}</span>
        <span className="text-xs text-slate-400">{formatValue ? formatValue(value) : Math.round(value * 100)}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full accent-primary-500"
      />
    </div>
  );
}
