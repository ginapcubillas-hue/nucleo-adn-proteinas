import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Coins, Star as StarIcon, Home, RotateCcw, ChevronRight } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { AvatarCompanion } from '../avatar/AvatarCompanion';
import { Button } from '../ui/Button';
import { Stars } from '../ui/Stars';
import { calcularEstrellas, xpParaRango } from '../../store/gameStore';
import { audioManager } from '../../audio/audioManager';
import { getNivel } from '../../data/niveles';

interface ResultsScreenProps {
  nivel: number;
  aciertos: number;
  total: number;
  onReintentar: () => void;
  onSiguiente: () => void;
  onInicio: () => void;
}

export function ResultsScreen({ nivel, aciertos, total, onReintentar, onSiguiente, onInicio }: ResultsScreenProps) {
  const { completarNivel, monedas, xp, reducirAnimaciones, volumenMusica } = useGameStore();
  const estrellas = calcularEstrellas(aciertos, total);
  const yaProcesado = useRef(false);
  const nivelMeta = getNivel(nivel);
  const rango = xpParaRango(xp);

  useEffect(() => {
    if (yaProcesado.current) return;
    yaProcesado.current = true;
    completarNivel(nivel, estrellas, aciertos, total);

    if (estrellas >= 1) {
      audioManager.tocarEfecto('nivel');
      if (!reducirAnimaciones) {
        setTimeout(() => confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 }, colors: ['#4f46e5','#06b6d4','#22c55e','#f59e0b'] }), 200);
      }
      if (estrellas === 3) {
        setTimeout(() => audioManager.tocarEfecto('fanfarria'), 500);
        if (!reducirAnimaciones) {
          setTimeout(() => confetti({ particleCount: 150, spread: 100, startVelocity: 45, origin: { y: 0.6 } }), 600);
        }
      }
    }
  }, []);

  const xpGanada = estrellas * 50 + aciertos * 10;
  const monedasGanadas = estrellas * 20 + aciertos * 2;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={reducirAnimaciones ? {} : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 text-center"
      >
        {/* Avatar con trofeo */}
        <div className="relative inline-block mb-4">
          <AvatarCompanion
            expresion={estrellas >= 1 ? 'celebrar' : 'triste'}
            size={130}
            reducirAnimaciones={reducirAnimaciones}
          />
          {estrellas >= 1 && (
            <motion.div
              initial={reducirAnimaciones ? {} : { y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-2 -right-2"
            >
              <Trophy size={36} className="text-warning-400 fill-warning-400" />
            </motion.div>
          )}
        </div>

        <h2 className="text-2xl font-display font-bold text-primary-700 dark:text-primary-300 mb-1">
          {nivelMeta?.titulo ?? `Nivel ${nivel}`}
        </h2>
        <p className="text-slate-500 mb-4">
          {aciertos} de {total} correctas
        </p>

        {/* Estrellas */}
        <div className="flex justify-center mb-6">
          <Stars count={estrellas} size={40} animated={!reducirAnimaciones} />
        </div>

        {/* Recompensas */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-warning-50 dark:bg-warning-900/20 rounded-2xl p-3">
            <div className="flex items-center justify-center gap-1 text-warning-600 dark:text-warning-400">
              <Coins size={20} />
              <span className="text-xl font-bold">+{monedasGanadas}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Monedas</p>
          </div>
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-3">
            <div className="flex items-center justify-center gap-1 text-primary-600 dark:text-primary-400">
              <StarIcon size={20} className="fill-primary-500" />
              <span className="text-xl font-bold">+{xpGanada}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">XP · {rango}</p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-2">
          {estrellas >= 1 && (
            <Button variant="success" size="lg" onClick={() => { audioManager.tocarEfecto('clic'); onSiguiente(); }}>
              <span className="flex items-center justify-center gap-2">Continuar <ChevronRight size={20} /></span>
            </Button>
          )}
          <div className="flex gap-2">
            <Button variant="ghost" size="md" onClick={() => { audioManager.tocarEfecto('clic'); onReintentar(); }}>
              <span className="flex items-center gap-2"><RotateCcw size={18} /> Reintentar</span>
            </Button>
            <Button variant="ghost" size="md" onClick={() => { audioManager.tocarEfecto('clic'); onInicio(); }}>
              <span className="flex items-center gap-2"><Home size={18} /> Inicio</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
