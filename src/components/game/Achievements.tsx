import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { logros } from '../../data/logros';
import { useGameStore } from '../../store/gameStore';

export function Achievements() {
  const { estrellasPorNivel, rachaMaxima, totalAciertos, monedas, nivelesCompletados, logrosDesbloqueados, reducirAnimaciones } = useGameStore();

  const estadoLogros = logros.map(l => ({
    ...l,
    desbloqueado: l.condicion({ estrellasPorNivel, rachaActual: 0, rachaMaxima, totalAciertos, monedas, nivelesCompletados }),
  }));

  return (
    <div className="max-w-3xl mx-auto p-4 pb-20">
      <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 mb-4">Logros</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {estadoLogros.map((l, i) => (
          <motion.div
            key={l.id}
            initial={reducirAnimaciones ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-2xl p-4 border-2 flex items-center gap-3 ${
              l.desbloqueado
                ? 'border-warning-300 bg-warning-50 dark:bg-warning-900/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
            }`}
          >
            <div className={`text-3xl ${l.desbloqueado ? '' : 'grayscale opacity-40'}`}>
              {l.desbloqueado ? l.icono : <Lock size={28} className="text-slate-400" />}
            </div>
            <div>
              <p className={`font-bold text-sm ${l.desbloqueado ? 'text-warning-700 dark:text-warning-300' : 'text-slate-500'}`}>
                {l.nombre}
              </p>
              <p className="text-xs text-slate-400">{l.descripcion}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
