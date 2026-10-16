import { motion } from 'framer-motion';
import { nivelesEmpaquetamiento } from '../../data/contenido';

export function PackagingLadder() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5">
      <h3 className="font-display font-bold text-primary-700 dark:text-primary-300 mb-4">Escalera de empaquetamiento del ADN</h3>
      <div className="space-y-2">
        {nivelesEmpaquetamiento.map((nivel, i) => (
          <motion.div
            key={nivel.nivel}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div
              className="flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{
                width: `${30 + i * 8}px`,
                height: `${30 + i * 8}px`,
                borderRadius: '50%',
                backgroundColor: `hsl(${240 + i * 15}, 70%, ${60 - i * 5}%)`,
              }}
            >
              {nivel.nivel}
            </div>
            <div className="flex-1 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
              <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">{nivel.nombre}</p>
              <p className="text-xs text-slate-400">{nivel.tamano}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-4 text-center">
        A mayor empaquetamiento, menor accesibilidad a la maquinaria de transcripción.
      </p>
    </div>
  );
}
