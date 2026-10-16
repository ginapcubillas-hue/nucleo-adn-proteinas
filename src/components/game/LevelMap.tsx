import { motion } from 'framer-motion';
import { Lock, Star, CheckCircle } from 'lucide-react';
import { mundos, nivelMundoDesbloqueado, mundoDesbloqueado } from '../../data/niveles';
import { useGameStore } from '../../store/gameStore';
import { Stars } from '../ui/Stars';
import { audioManager } from '../../audio/audioManager';

interface LevelMapProps {
  onNivelClick: (nivel: number) => void;
}

export function LevelMap({ onNivelClick }: LevelMapProps) {
  const { estrellasPorNivel, reducirAnimaciones } = useGameStore();

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      {mundos.map((mundo) => {
        const desbloqueado = mundoDesbloqueado(mundo.id, estrellasPorNivel);
        return (
          <div key={mundo.id} className="mb-8">
            <h3 className={`text-lg font-display font-bold mb-4 ${desbloqueado ? '' : 'opacity-40'}`}
              style={{ color: mundo.color }}>
              Mundo {mundo.id}: {mundo.nombre}
              {!desbloqueado && <Lock size={16} className="inline ml-2 text-slate-400" />}
            </h3>

            {!desbloqueado && (
              <p className="text-sm text-slate-400 mb-3">Completa el mundo anterior para desbloquear.</p>
            )}

            {/* Camino de niveles */}
            <div className="relative">
              {/* Línea conectora */}
              <div
                className={`absolute left-6 top-0 bottom-0 w-1 ${desbloqueado ? '' : 'opacity-30'}`}
                style={{ background: `linear-gradient(to bottom, ${mundo.color}66, ${mundo.color}22)` }}
              />

              <div className="space-y-3">
                {mundo.niveles.map((nivel, i) => {
                  const desbloq = nivelMundoDesbloqueado(nivel.id, estrellasPorNivel);
                  const estrellas = estrellasPorNivel[nivel.id] ?? 0;
                  const completado = estrellas > 0;

                  return (
                    <motion.button
                      key={nivel.id}
                      disabled={!desbloq || !desbloqueado}
                      onClick={() => { audioManager.tocarEfecto('clic'); onNivelClick(nivel.id); }}
                      initial={reducirAnimaciones ? {} : { opacity: 0, x: -20 }}
                      animate={{ opacity: desbloqueado ? 1 : 0.4, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`relative flex items-center gap-3 w-full text-left p-3 pl-14 rounded-2xl border-2 transition-all ${
                        desbloq && desbloqueado
                          ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:border-primary-400 hover:shadow-md cursor-pointer'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                      }`}
                    >
                      {/* Círculo del nivel */}
                      <div
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${completado ? 'text-white' : desbloq ? 'text-white' : 'text-slate-400'}`}
                        style={{ backgroundColor: desbloq ? (completado ? mundo.color : `${mundo.color}88`) : '#cbd5e1' }}
                      >
                        {completado ? <CheckCircle size={16} /> : !desbloq ? <Lock size={12} /> : nivel.id}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm ${desbloq ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'}`}>
                          <span className="mr-1">{nivel.icono}</span>{nivel.titulo}
                        </p>
                        {completado && (
                          <div className="mt-1"><Stars count={estrellas} size={14} /></div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
