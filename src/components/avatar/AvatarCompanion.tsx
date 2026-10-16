import { motion, AnimatePresence } from 'framer-motion';
import { AvatarSVG } from './AvatarSVG';
import { useGameStore } from '../../store/gameStore';

interface AvatarCompanionProps {
  hablando?: boolean;
  expresion?: 'neutral' | 'feliz' | 'triste' | 'celebrar';
  size?: number;
  mostrarGlobo?: boolean;
  globoTexto?: string;
  reducirAnimaciones?: boolean;
}

export function AvatarCompanion({
  hablando = false,
  expresion = 'neutral',
  size = 120,
  mostrarGlobo = false,
  globoTexto = '',
  reducirAnimaciones = false,
}: AvatarCompanionProps) {
  const avatar = useGameStore(s => s.avatar);

  const animProps = reducirAnimaciones
    ? {}
    : expresion === 'celebrar'
      ? { animate: { y: [0, -10, 0], rotate: [0, 3, -3, 0] }, transition: { duration: 0.6, repeat: Infinity } }
      : hablando
        ? { animate: { y: [0, -3, 0] }, transition: { duration: 1.5, repeat: Infinity } }
        : { animate: { y: [0, -4, 0] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } };

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {mostrarGlobo && globoTexto && (
          <motion.div
            initial={reducirAnimaciones ? {} : { opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducirAnimaciones ? {} : { opacity: 0, y: 10, scale: 0.9 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full mb-2 max-w-xs"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm shadow-lg px-4 py-3 text-sm text-slate-700 dark:text-slate-200 border border-primary-100 dark:border-slate-700">
              {globoTexto}
              <div className="absolute bottom-0 left-6 translate-y-full">
                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white dark:border-t-slate-800" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div {...animProps}>
        <AvatarSVG config={avatar} hablando={hablando} expresion={expresion} size={size} />
      </motion.div>
    </div>
  );
}
