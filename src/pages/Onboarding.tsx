import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { AvatarCreator } from '../components/avatar/AvatarCreator';
import { Button } from '../components/ui/Button';
import { audioManager } from '../audio/audioManager';
import { AvatarSVG } from '../components/avatar/AvatarSVG';
import { initVoces } from '../audio/vozManager';

type Fase = 'bienvenida' | 'nombre' | 'avatar' | 'listo';

export function Onboarding() {
  const { setPerfil, setAvatar, avatar, setOnboardingCompleto, vozOn } = useGameStore();
  const [fase, setFase] = useState<Fase>('bienvenida');
  const [nombre, setNombre] = useState('');
  const [apodo, setApodo] = useState('');

  useEffect(() => {
    initVoces();
  }, []);

  const avanzar = (siguiente: Fase) => {
    audioManager.tocarEfecto('clic');
    setFase(siguiente);
  };

  const finalizar = () => {
    audioManager.tocarEfecto('nivel');
    setPerfil(nombre.trim() || 'Estudiante', apodo.trim() || 'Bio');
    setOnboardingCompleto();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-primary-50 via-accent-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-2xl w-full">
        {fase === 'bienvenida' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <AvatarSVG config={avatar} size={180} />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-700 dark:text-primary-300 mb-3">
              Núcleo, ADN y Proteínas
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">Aventura de Biología Celular</p>
            <p className="text-sm text-slate-400 mb-8">¡Aprende jugando con tu avatar personalizado!</p>
            <Button variant="primary" size="lg" onClick={() => avanzar('nombre')}>
              <span className="flex items-center gap-2">Comenzar <ArrowRight size={20} /></span>
            </Button>
          </motion.div>
        )}

        {fase === 'nombre' && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 md:p-8"
          >
            <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 mb-4">¿Cómo te llamas?</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-slate-500">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  maxLength={30}
                  className="w-full mt-1 p-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:border-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500">Apodo</label>
                <input
                  type="text"
                  value={apodo}
                  onChange={e => setApodo(e.target.value)}
                  placeholder="Un apodo divertido"
                  maxLength={20}
                  className="w-full mt-1 p-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:border-primary-500 outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="primary" size="lg" onClick={() => avanzar('avatar')}>
                <span className="flex items-center gap-2">Siguiente <ArrowRight size={20} /></span>
              </Button>
            </div>
          </motion.div>
        )}

        {fase === 'avatar' && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 mb-4 text-center">Crea tu avatar</h2>
            <AvatarCreator onConfirm={() => avanzar('listo')} />
          </motion.div>
        )}

        {fase === 'listo' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8"
          >
            <div className="flex justify-center mb-4">
              <AvatarSVG config={avatar} size={180} />
            </div>
            <h2 className="text-2xl font-display font-bold text-primary-700 dark:text-primary-300 mb-2">
              ¡Listo, {nombre || 'estudiante'}!
            </h2>
            <p className="text-slate-500 mb-6">Tu avatar está preparado para la aventura.</p>
            <Button variant="success" size="lg" onClick={finalizar}>
              <span className="flex items-center gap-2">¡Empezar a jugar! <ArrowRight size={20} /></span>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
