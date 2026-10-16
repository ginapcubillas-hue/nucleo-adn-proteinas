import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { avatarDefault, type AvatarConfig } from '../data/avatarCatalog';

export type Rango = 'Estudiante' | 'Residente' | 'Doctor/a' | 'Investigador/a';

export interface ItemComprado {
  categoria: string;
  itemId: string;
}

export interface EstadoJuego {
  // Perfil
  nombre: string;
  apodo: string;
  avatar: AvatarConfig;
  itemsComprados: ItemComprado[];

  // Progreso
  xp: number;
  monedas: number;
  estrellasPorNivel: Record<number, number>;
  nivelesCompletados: number;
  mejorMarcaPorNivel: Record<number, number>;

  // Estadísticas
  rachaActual: number;
  rachaMaxima: number;
  totalAciertos: number;
  ultimaVisita: string;
  rachaDias: number;

  // Preguntas falladas
  preguntasFalladas: string[];

  // Logros
  logrosDesbloqueados: string[];

  // Ajustes
  modoOscuro: boolean;
  musicaOn: boolean;
  volumenMusica: number;
  volumenEfectos: number;
  vozOn: boolean;
  velocidadVoz: number;
  vozURI: string;
  reducirAnimaciones: boolean;
  temporizador: boolean;

  // Onboarding
  onboardingCompleto: boolean;

  // Acciones
  setPerfil: (nombre: string, apodo: string) => void;
  setAvatar: (avatar: AvatarConfig) => void;
  comprarItem: (categoria: string, itemId: string, precio: number) => void;
  completarNivel: (nivel: number, estrellas: number, aciertos: number, total: number) => void;
  ganarMonedas: (n: number) => void;
  sumarAciertos: (n: number) => void;
  romperRacha: () => void;
  marcarPreguntaFallada: (id: string) => void;
  desmarcarPreguntaFallada: (id: string) => void;
  desbloquearLogro: (id: string) => void;
  toggleModoOscuro: () => void;
  setMusicaOn: (on: boolean) => void;
  setVolumenMusica: (v: number) => void;
  setVolumenEfectos: (v: number) => void;
  setVozOn: (on: boolean) => void;
  setVelocidadVoz: (v: number) => void;
  setVozURI: (uri: string) => void;
  setReducirAnimaciones: (on: boolean) => void;
  setTemporizador: (on: boolean) => void;
  setOnboardingCompleto: () => void;
  resetProgreso: () => void;
}

function getRango(xp: number): Rango {
  if (xp >= 3000) return 'Investigador/a';
  if (xp >= 1500) return 'Doctor/a';
  if (xp >= 500) return 'Residente';
  return 'Estudiante';
}

export function calcularEstrellas(aciertos: number, total: number): number {
  const pct = total > 0 ? aciertos / total : 0;
  if (pct >= 0.9) return 3;
  if (pct >= 0.6) return 2;
  if (pct >= 0.4) return 1;
  return 0;
}

export function xpParaRango(xp: number): Rango {
  return getRango(xp);
}

export const useGameStore = create<EstadoJuego>()(
  persist(
    (set, get) => ({
      nombre: '',
      apodo: '',
      avatar: { ...avatarDefault },
      itemsComprados: [],

      xp: 0,
      monedas: 0,
      estrellasPorNivel: {},
      nivelesCompletados: 0,
      mejorMarcaPorNivel: {},

      rachaActual: 0,
      rachaMaxima: 0,
      totalAciertos: 0,
      ultimaVisita: '',
      rachaDias: 0,

      preguntasFalladas: [],
      logrosDesbloqueados: [],

      modoOscuro: false,
      musicaOn: true,
      volumenMusica: 0.3,
      volumenEfectos: 0.5,
      vozOn: true,
      velocidadVoz: 1,
      vozURI: '',
      reducirAnimaciones: false,
      temporizador: true,

      onboardingCompleto: false,

      setPerfil: (nombre, apodo) => set({ nombre, apodo }),
      setAvatar: (avatar) => set({ avatar }),
      comprarItem: (categoria, itemId, precio) => {
        const state = get();
        if (state.monedas < precio) return;
        set({
          monedas: state.monedas - precio,
          itemsComprados: [...state.itemsComprados, { categoria, itemId }],
        });
      },
      completarNivel: (nivel, estrellas, aciertos, total) => {
        const state = get();
        const yaCompletado = state.estrellasPorNivel[nivel] !== undefined;
        const mejoresEstrellas = Math.max(estrellas, state.estrellasPorNivel[nivel] ?? 0);
        const mejorMarca = Math.max(aciertos, state.mejorMarcaPorNivel[nivel] ?? 0);
        const xpGanada = estrellas * 50 + aciertos * 10;
        const monedasGanadas = estrellas * 20 + aciertos * 2;
        const nuevosNiveles = yaCompletado ? state.nivelesCompletados : state.nivelesCompletados + 1;
        set({
          xp: state.xp + xpGanada,
          monedas: state.monedas + monedasGanadas,
          estrellasPorNivel: { ...state.estrellasPorNivel, [nivel]: mejoresEstrellas },
          mejorMarcaPorNivel: { ...state.mejorMarcaPorNivel, [nivel]: mejorMarca },
          nivelesCompletados: nuevosNiveles,
        });
      },
      ganarMonedas: (n) => set({ monedas: get().monedas + n }),
      sumarAciertos: (n) => {
        const state = get();
        const nuevaRacha = state.rachaActual + n;
        set({
          totalAciertos: state.totalAciertos + n,
          rachaActual: nuevaRacha,
          rachaMaxima: Math.max(state.rachaMaxima, nuevaRacha),
        });
      },
      romperRacha: () => set({ rachaActual: 0 }),
      marcarPreguntaFallada: (id) => {
        const state = get();
        if (!state.preguntasFalladas.includes(id)) {
          set({ preguntasFalladas: [...state.preguntasFalladas, id] });
        }
      },
      desmarcarPreguntaFallada: (id) => {
        const state = get();
        set({ preguntasFalladas: state.preguntasFalladas.filter(p => p !== id) });
      },
      desbloquearLogro: (id) => {
        const state = get();
        if (!state.logrosDesbloqueados.includes(id)) {
          set({ logrosDesbloqueados: [...state.logrosDesbloqueados, id] });
        }
      },
      toggleModoOscuro: () => set({ modoOscuro: !get().modoOscuro }),
      setMusicaOn: (on) => set({ musicaOn: on }),
      setVolumenMusica: (v) => set({ volumenMusica: v }),
      setVolumenEfectos: (v) => set({ volumenEfectos: v }),
      setVozOn: (on) => set({ vozOn: on }),
      setVelocidadVoz: (v) => set({ velocidadVoz: v }),
      setVozURI: (uri) => set({ vozURI: uri }),
      setReducirAnimaciones: (on) => set({ reducirAnimaciones: on }),
      setTemporizador: (on) => set({ temporizador: on }),
      setOnboardingCompleto: () => set({ onboardingCompleto: true }),
      resetProgreso: () => set({
        xp: 0,
        monedas: 0,
        estrellasPorNivel: {},
        nivelesCompletados: 0,
        mejorMarcaPorNivel: {},
        rachaActual: 0,
        rachaMaxima: 0,
        totalAciertos: 0,
        preguntasFalladas: [],
        logrosDesbloqueados: [],
      }),
    }),
    { name: 'biologia-juego' },
  ),
);
