import { useState, useEffect, useCallback } from 'react';
import {
  Home, Map, BookOpen, Gamepad2, Trophy, ShoppingBag,
  AlertCircle, User, Settings as SettingsIcon, Volume2, VolumeX, Coins,
} from 'lucide-react';
import { useGameStore, xpParaRango } from './store/gameStore';
import { audioManager } from './audio/audioManager';
import { initVoces, cancelarVoz } from './audio/vozManager';

import { Onboarding } from './pages/Onboarding';
import { Settings } from './pages/Settings';

import { LevelMap } from './components/game/LevelMap';
import { Shop } from './components/game/Shop';
import { Achievements } from './components/game/Achievements';
import { ErrorReview } from './components/game/ErrorReview';
import { Profile } from './components/game/Profile';
import { MiniGamesHub } from './components/game/MiniGamesHub';

import { LevelIntro } from './components/study/LevelIntro';
import { StudyGuide } from './components/study/StudyGuide';

import { Quiz } from './components/game/Quiz';
import { ResultsScreen } from './components/game/ResultsScreen';

import { DNATranslator } from './components/minigames/DNATranslator';
import { RibosomeAction } from './components/minigames/RibosomeAction';
import { MutationSimulator } from './components/minigames/MutationSimulator';
import { RanCycleBuilder } from './components/minigames/RanCycleBuilder';
import { ChromosomeID } from './components/minigames/ChromosomeID';

import { JuegoNivel } from './components/juegos/JuegoNivel';
import { AvatarCreator } from './components/avatar/AvatarCreator';
import { AvatarCompanion } from './components/avatar/AvatarCompanion';

type Pagina =
  | 'inicio' | 'mapa' | 'guia' | 'minijuegos' | 'logros'
  | 'tienda' | 'errores' | 'perfil' | 'ajustes'
  | 'nivel-intro' | 'nivel-quiz' | 'nivel-resultado' | 'nivel-juego'
  | 'editar-avatar'
  | 'minijuego-dna' | 'minijuego-ribosoma' | 'minijuego-mutacion'
  | 'minijuego-ran' | 'minijuego-cromosomas';

export default function App() {
  const {
    onboardingCompleto, modoOscuro, musicaOn, volumenMusica,
    volumenEfectos, monedas, xp, vozOn,
  } = useGameStore();

  const [pagina, setPagina] = useState<Pagina>('inicio');
  const [nivelActual, setNivelActual] = useState(1);
  const [resultadosQuiz, setResultadosQuiz] = useState({ aciertos: 0, total: 0 });
  const [interaccionInicial, setInteraccionInicial] = useState(false);
  const [companionVisible, setCompanionVisible] = useState(false);

  // Inicializar audio y voces
  useEffect(() => {
    initVoces();
    audioManager.setVolumenMusica(volumenMusica);
    audioManager.setVolumenEfectos(volumenEfectos);
  }, []);

  // Aplicar modo oscuro
  useEffect(() => {
    if (modoOscuro) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [modoOscuro]);

  // Iniciar música tras primera interacción
  useEffect(() => {
    if (!interaccionInicial && onboardingCompleto) {
      const handler = () => {
        setInteraccionInicial(true);
        audioManager.init();
        audioManager.resume();
        if (musicaOn) {
          audioManager.iniciarMusica('menu', volumenMusica);
        }
      };
      window.addEventListener('click', handler, { once: true });
      window.addEventListener('touchstart', handler, { once: true });
      return () => {
        window.removeEventListener('click', handler);
        window.removeEventListener('touchstart', handler);
      };
    }
  }, [interaccionInicial, onboardingCompleto, musicaOn, volumenMusica]);

  // Cambiar música según página
  useEffect(() => {
    if (!interaccionInicial || !musicaOn) return;
    if (pagina === 'nivel-quiz') {
      audioManager.iniciarMusica('juego', volumenMusica);
    } else if (pagina === 'nivel-resultado') {
      audioManager.iniciarMusica('resultados', volumenMusica);
    } else {
      audioManager.iniciarMusica('menu', volumenMusica);
    }
  }, [pagina, interaccionInicial, musicaOn, volumenMusica]);

  // Cancelar voz al cambiar de página
  useEffect(() => {
    cancelarVoz();
  }, [pagina]);

  // Mostrar companion flotante
  useEffect(() => {
    if (onboardingCompleto && pagina !== 'nivel-quiz' && pagina !== 'nivel-intro' && pagina !== 'nivel-resultado' && pagina !== 'nivel-juego' && pagina !== 'editar-avatar') {
      setCompanionVisible(true);
    } else {
      setCompanionVisible(false);
    }
  }, [pagina, onboardingCompleto]);

  const navegar = useCallback((p: Pagina) => {
    audioManager.tocarEfecto('clic');
    setPagina(p);
  }, []);

  const iniciarNivel = (nivel: number) => {
    setNivelActual(nivel);
    setPagina('nivel-intro');
  };

  const jugarNivel = () => {
    setPagina('nivel-quiz');
  };

  const verGuiaNivel = () => {
    setPagina('guia');
  };

  const completarQuiz = (aciertos: number, total: number) => {
    setResultadosQuiz({ aciertos, total });
    setPagina('nivel-resultado');
  };

  // Tras el quiz de cada tema viene un mini-juego; al superarlo se pasa al siguiente tema
  const irAlJuego = () => { audioManager.tocarEfecto('clic'); setPagina('nivel-juego'); };

  const siguienteNivel = () => {
    const siguiente = nivelActual + 1;
    if (siguiente <= 13) {
      iniciarNivel(siguiente);
    } else {
      navegar('mapa');
    }
  };

  const toggleMusica = () => {
    const store = useGameStore.getState();
    if (musicaOn) {
      audioManager.detenerMusica();
      store.setMusicaOn(false);
    } else {
      audioManager.reanudarMusica(volumenMusica);
      audioManager.iniciarMusica('menu', volumenMusica);
      store.setMusicaOn(true);
    }
  };

  if (!onboardingCompleto) {
    return <Onboarding />;
  }

  const rango = xpParaRango(xp);

  const navItems: { id: Pagina; icon: React.ReactNode; label: string }[] = [
    { id: 'inicio', icon: <Home size={20} />, label: 'Inicio' },
    { id: 'mapa', icon: <Map size={20} />, label: 'Niveles' },
    { id: 'guia', icon: <BookOpen size={20} />, label: 'Guía' },
    { id: 'minijuegos', icon: <Gamepad2 size={20} />, label: 'Juegos' },
    { id: 'logros', icon: <Trophy size={20} />, label: 'Logros' },
  ];

  const navItemsSecundarios: { id: Pagina; icon: React.ReactNode; label: string }[] = [
    { id: 'tienda', icon: <ShoppingBag size={20} />, label: 'Tienda' },
    { id: 'errores', icon: <AlertCircle size={20} />, label: 'Errores' },
    { id: 'perfil', icon: <User size={20} />, label: 'Perfil' },
    { id: 'ajustes', icon: <SettingsIcon size={20} />, label: 'Ajustes' },
  ];

  const esPaginaNivel = pagina === 'nivel-intro' || pagina === 'nivel-quiz' || pagina === 'nivel-resultado' || pagina === 'nivel-juego';
  const esPaginaMinijuego = pagina.startsWith('minijuego-') && pagina !== 'minijuegos';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Top bar */}
      {!esPaginaNivel && !esPaginaMinijuego && pagina !== 'editar-avatar' && (
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-800/90 backdrop-blur border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧬</span>
              <span className="font-display font-bold text-sm text-primary-700 dark:text-primary-300 hidden sm:block">
                Núcleo, ADN y Proteínas
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-warning-50 dark:bg-warning-900/20 rounded-full px-2.5 py-1">
                <Coins size={16} className="text-warning-500" />
                <span className="text-sm font-bold text-warning-600">{monedas}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 bg-primary-50 dark:bg-primary-900/20 rounded-full px-2.5 py-1">
                <span className="text-xs font-bold text-primary-600">{rango}</span>
                <span className="text-[10px] text-slate-400">{xp} XP</span>
              </div>
              <button
                onClick={toggleMusica}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                aria-label={musicaOn ? 'Silenciar música' : 'Activar música'}
              >
                {musicaOn ? <Volume2 size={20} className="text-primary-500" /> : <VolumeX size={20} className="text-slate-400" />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Contenido */}
      <main className="relative">
        {pagina === 'inicio' && <HomePage onNavegar={navegar} onNivel={iniciarNivel} />}
        {pagina === 'mapa' && <LevelMap onNivelClick={iniciarNivel} />}
        {pagina === 'guia' && <StudyGuide />}
        {pagina === 'minijuegos' && <MiniGamesHub onSelect={(g) => navegar(`minijuego-${g}` as Pagina)} onBack={() => navegar('inicio')} />}
        {pagina === 'logros' && <Achievements />}
        {pagina === 'tienda' && <Shop />}
        {pagina === 'errores' && <ErrorReview onJugarNivel={iniciarNivel} />}
        {pagina === 'perfil' && <Profile onEditarAvatar={() => navegar('editar-avatar')} />}
        {pagina === 'ajustes' && <Settings />}

        {pagina === 'nivel-intro' && (
          <LevelIntro nivel={nivelActual} onJugar={jugarNivel} onVerGuia={verGuiaNivel} />
        )}
        {pagina === 'nivel-quiz' && (
          <Quiz nivel={nivelActual} onCompletar={completarQuiz} />
        )}
        {pagina === 'nivel-juego' && (
          <JuegoNivel key={nivelActual} nivel={nivelActual} onTerminar={siguienteNivel} />
        )}
        {pagina === 'nivel-resultado' && (
          <ResultsScreen
            nivel={nivelActual}
            aciertos={resultadosQuiz.aciertos}
            total={resultadosQuiz.total}
            onReintentar={() => setPagina('nivel-quiz')}
            onSiguiente={irAlJuego}
            onInicio={() => navegar('mapa')}
          />
        )}

        {pagina === 'editar-avatar' && (
          <div className="max-w-4xl mx-auto p-4 pt-8">
            <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 mb-4 text-center">Editar avatar</h2>
            <AvatarCreator onConfirm={() => navegar('perfil')} />
          </div>
        )}

        {pagina === 'minijuego-dna' && <DNATranslator />}
        {pagina === 'minijuego-ribosoma' && <RibosomeAction />}
        {pagina === 'minijuego-mutacion' && <MutationSimulator />}
        {pagina === 'minijuego-ran' && <RanCycleBuilder />}
        {pagina === 'minijuego-cromosomas' && <ChromosomeID />}
      </main>

      {/* Companion flotante */}
      {companionVisible && (
        <div className="fixed bottom-20 right-2 z-30 pointer-events-none">
          <div className="animate-float">
            <AvatarCompanion size={70} reducirAnimaciones={useGameStore.getState().reducirAnimaciones} />
          </div>
        </div>
      )}

      {/* Bottom nav */}
      {!esPaginaNivel && !esPaginaMinijuego && pagina !== 'editar-avatar' && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <div className="max-w-4xl mx-auto flex items-center justify-around px-2 py-1">
            {navItems.map(item => (
              <NavButton
                key={item.id}
                icon={item.icon}
                label={item.label}
                activo={pagina === item.id}
                onClick={() => navegar(item.id)}
              />
            ))}
          </div>
          <div className="max-w-4xl mx-auto flex items-center justify-around px-2 py-0.5 border-t border-slate-100 dark:border-slate-700">
            {navItemsSecundarios.map(item => (
              <NavButton
                key={item.id}
                icon={item.icon}
                label={item.label}
                activo={pagina === item.id}
                onClick={() => navegar(item.id)}
                small
              />
            ))}
          </div>
        </nav>
      )}

      {/* Back button for mini-games */}
      {esPaginaMinijuego && (
        <div className="fixed top-4 left-4 z-40">
          <button
            onClick={() => navegar('minijuegos')}
            className="flex items-center gap-1 bg-white dark:bg-slate-800 shadow-md rounded-full px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            ← Volver
          </button>
        </div>
      )}
    </div>
  );
}

function NavButton({ icon, label, activo, onClick, small }: {
  icon: React.ReactNode;
  label: string;
  activo: boolean;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 ${small ? 'py-1' : 'py-1.5'} px-2 rounded-lg transition-colors min-w-[55px] ${
        activo ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500'
      }`}
    >
      {icon}
      <span className={`text-[10px] font-semibold ${small ? 'text-[9px]' : ''}`}>{label}</span>
    </button>
  );
}

function HomePage({ onNavegar, onNivel }: { onNavegar: (p: Pagina) => void; onNivel: (n: number) => void }) {
  const { nombre, estrellasPorNivel, rachaActual } = useGameStore();
  const totalEstrellas = Object.values(estrellasPorNivel).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 pt-6 pb-24">
      <h1 className="text-2xl font-display font-bold text-primary-700 dark:text-primary-300 mb-1">
        ¡Hola, {nombre || 'estudiante'}! 👋
      </h1>
      {rachaActual > 0 && (
        <p className="text-sm text-warning-500 font-semibold mb-1">🔥 Racha: {rachaActual} aciertos seguidos</p>
      )}
      <p className="text-sm text-slate-400 mb-4">¿Qué quieres hacer hoy?</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <HomeCard icon="🗺️" label="Mapa de niveles" desc={`${totalEstrellas} ⭐`} onClick={() => onNavegar('mapa')} />
        <HomeCard icon="📖" label="Guía de estudio" desc="Aprende y repasa" onClick={() => onNavegar('guia')} />
        <HomeCard icon="🎮" label="Mini-juegos" desc="5 juegos" onClick={() => onNavegar('minijuegos')} />
        <HomeCard icon="🏆" label="Logros" desc="Desbloquea" onClick={() => onNavegar('logros')} />
        <HomeCard icon="⚠️" label="Repaso de errores" desc="Mejora" onClick={() => onNavegar('errores')} />
        <HomeCard icon="🛒" label="Tienda" desc="Personaliza" onClick={() => onNavegar('tienda')} />
      </div>

      {/* Continuar jugando */}
      {Object.keys(estrellasPorNivel).length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-bold text-slate-500 mb-2">Continúa tu aventura</h2>
          <button
            onClick={() => {
              const siguiente = Array.from({ length: 13 }, (_, i) => i + 1).find(n => (estrellasPorNivel[n] ?? 0) === 0);
              onNivel(siguiente ?? 1);
            }}
            className="w-full bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-2xl p-4 font-bold text-left hover:shadow-lg transition-shadow flex items-center justify-between"
          >
            <span>▶ Continuar</span>
            <span className="text-sm opacity-80">Siguiente nivel →</span>
          </button>
        </div>
      )}
    </div>
  );
}

function HomeCard({ icon, label, desc, onClick }: { icon: string; label: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 text-left hover:shadow-lg hover:border-primary-300 border-2 border-transparent transition-all"
    >
      <div className="text-2xl mb-1">{icon}</div>
      <p className="font-bold text-sm text-slate-700 dark:text-slate-200">{label}</p>
      <p className="text-xs text-slate-400">{desc}</p>
    </button>
  );
}
