import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Repeat, BookOpen, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { getIntro } from '../../data/intros';
import { getNivel } from '../../data/niveles';
import { useGameStore } from '../../store/gameStore';
import { AvatarCompanion } from '../avatar/AvatarCompanion';
import { Button } from '../ui/Button';
import { hablar, cancelarVoz } from '../../audio/vozManager';
import { audioManager } from '../../audio/audioManager';

interface LevelIntroProps {
  nivel: number;
  onJugar: () => void;
  onVerGuia: () => void;
}

export function LevelIntro({ nivel, onJugar, onVerGuia }: LevelIntroProps) {
  const intro = getIntro(nivel);
  const nivelMeta = getNivel(nivel);
  const { vozOn, velocidadVoz, vozURI, reducirAnimaciones, volumenMusica } = useGameStore();
  const [hablandoState, setHablandoState] = useState(false);
  const [pausado, setPausado] = useState(false);
  const inicioRef = useRef(false);

  const leerTexto = () => {
    if (!vozOn || !intro) return;
    cancelarVoz();
    setHablandoState(true);
    setPausado(false);
    audioManager.bajarMusicaParaVoz();
    hablar(intro.texto, {
      vozURI: vozURI || undefined,
      velocidad: velocidadVoz,
      onEnd: () => {
        setHablandoState(false);
        audioManager.restaurarMusica(volumenMusica);
      },
    });
  };

  useEffect(() => {
    if (inicioRef.current) return;
    inicioRef.current = true;
    const timer = setTimeout(() => leerTexto(), 500);
    return () => {
      clearTimeout(timer);
      cancelarVoz();
      audioManager.restaurarMusica(volumenMusica);
    };
  }, []);

  const togglePausa = () => {
    if (pausado) {
      cancelarVoz();
      setHablandoState(false);
      setPausado(false);
      audioManager.restaurarMusica(volumenMusica);
    } else {
      cancelarVoz();
      setHablandoState(false);
      setPausado(true);
      audioManager.restaurarMusica(volumenMusica);
    }
  };

  const repetir = () => {
    setPausado(false);
    leerTexto();
  };

  if (!intro || !nivelMeta) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={reducirAnimaciones ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-4">
          <span className="text-4xl">{nivelMeta.icono}</span>
          <h2 className="text-2xl font-display font-bold text-primary-700 dark:text-primary-300 mt-2">
            {intro.titulo}
          </h2>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <AvatarCompanion
                hablando={hablandoState}
                expresion="neutral"
                size={140}
                reducirAnimaciones={reducirAnimaciones}
              />
            </div>

            {/* Texto */}
            <div className="flex-1">
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
                {intro.texto}
              </p>

              {/* Controles de voz */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={togglePausa}
                  className="flex items-center gap-1 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg px-3 py-1.5 text-slate-600 dark:text-slate-300 transition-colors"
                  aria-label={pausado ? 'Reanudar narración' : 'Pausar narración'}
                >
                  {pausado ? <Play size={16} /> : <Pause size={16} />}
                  {pausado ? 'Reanudar' : 'Pausar'}
                </button>
                <button
                  onClick={repetir}
                  className="flex items-center gap-1 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg px-3 py-1.5 text-slate-600 dark:text-slate-300 transition-colors"
                  aria-label="Repetir narración"
                >
                  <Repeat size={16} /> Repetir
                </button>
                {vozOn ? <Volume2 size={20} className="text-success-500 mt-1" /> : <VolumeX size={20} className="text-slate-400 mt-1" />}
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button variant="ghost" size="md" onClick={() => { cancelarVoz(); audioManager.restaurarMusica(volumenMusica); onVerGuia(); }}>
              <span className="flex items-center gap-2"><BookOpen size={18} /> Ver guía completa</span>
            </Button>
            <div className="flex-1" />
            <Button variant="primary" size="lg" onClick={() => { audioManager.tocarEfecto('clic'); cancelarVoz(); audioManager.restaurarMusica(volumenMusica); onJugar(); }}>
              <span className="flex items-center gap-2">¡Jugar! <ChevronRight size={20} /></span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
