import { useEffect, useState, useCallback } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { AvatarSVG } from '../avatar/AvatarSVG';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/audioManager';

export interface PreguntaNPC { q: string; ops: string[]; ok: number; pista: string }
export interface AventuraCfg {
  mision: string;
  item: string; itemNombre: string;
  npcA: { emoji: string; nombre: string; texto: string };
  npcB: { emoji: string; nombre: string; intro: string; preguntas: PreguntaNPC[] };
}

// # pared · . camino · P inicio · A personaje 1 · B personaje 2
const MAPA = [
  '###########',
  '#P..#.....#',
  '#.#.#.###.#',
  '#.#...#...#',
  '#.#####.#.#',
  '#...A...#.#',
  '###.###.#B#',
  '#.....#...#',
  '###########',
];
const CELDA = 30;

export function Aventura({ cfg, onFin }: { cfg: AventuraCfg; onFin: (ok: boolean) => void }) {
  const avatar = useGameStore(s => s.avatar);
  const inicio = (() => {
    for (let r = 0; r < MAPA.length; r++) { const c = MAPA[r].indexOf('P'); if (c >= 0) return { r, c }; }
    return { r: 1, c: 1 };
  })();
  const [pos, setPos] = useState(inicio);
  const [dialogo, setDialogo] = useState<null | 'A' | 'B' | 'Bantes'>(null);
  const [vioA, setVioA] = useState(false);
  const [idx, setIdx] = useState(0);
  const [pista, setPista] = useState('');
  const [mochila, setMochila] = useState(false);

  const mover = useCallback((dr: number, dc: number) => {
    if (dialogo || mochila) return;
    const r = pos.r + dr, c = pos.c + dc;
    const t = MAPA[r]?.[c];
    if (!t || t === '#') return;
    if (t === 'A') { setDialogo('A'); setVioA(true); audioManager.tocarEfecto('clic'); return; }
    if (t === 'B') { setDialogo(vioA ? 'B' : 'Bantes'); audioManager.tocarEfecto('clic'); return; }
    setPos({ r, c });
  }, [pos, dialogo, mochila, vioA]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const m: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
      if (m[e.key]) { e.preventDefault(); mover(...m[e.key]); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [mover]);

  const responder = (i: number) => {
    const p = cfg.npcB.preguntas[idx];
    if (i === p.ok) {
      audioManager.tocarEfecto('acierto'); setPista('');
      if (idx + 1 >= cfg.npcB.preguntas.length) { setMochila(true); setDialogo(null); audioManager.tocarEfecto('desbloqueo'); }
      else setIdx(idx + 1);
    } else { audioManager.tocarEfecto('error'); setPista(p.pista); }
  };

  const btn = 'w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center active:scale-95 shadow-md';
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-center font-semibold text-slate-600 dark:text-slate-300">🎯 {cfg.mision}</p>
      <div className="text-sm bg-warning-50 dark:bg-warning-900/20 rounded-full px-3 py-1">🎒 Mochila: {mochila ? `${cfg.item} ${cfg.itemNombre}` : 'vacía'}</div>

      <div className="relative rounded-2xl overflow-hidden shadow-lg bg-slate-200 dark:bg-slate-700"
        style={{ width: CELDA * MAPA[0].length, height: CELDA * MAPA.length }}>
        {MAPA.map((fila, r) => fila.split('').map((t, c) => (
          <div key={`${r}-${c}`} className="absolute flex items-center justify-center"
            style={{ left: c * CELDA, top: r * CELDA, width: CELDA, height: CELDA,
              background: t === '#' ? '#312e81' : '#e0e7ff', borderRadius: t === '#' ? 6 : 0, fontSize: 20 }}>
            {t === 'A' && cfg.npcA.emoji}
            {t === 'B' && (mochila ? '😊' : cfg.npcB.emoji)}
          </div>
        )))}
        <div className="absolute transition-all duration-150 pointer-events-none"
          style={{ left: pos.c * CELDA + 1, top: pos.r * CELDA, width: CELDA - 2 }}>
          <AvatarSVG config={avatar} size={CELDA - 2} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 touch-none">
        <span /><button className={btn} onClick={() => mover(-1, 0)} aria-label="Arriba"><ArrowUp /></button><span />
        <button className={btn} onClick={() => mover(0, -1)} aria-label="Izquierda"><ArrowLeft /></button>
        <button className={btn} onClick={() => mover(1, 0)} aria-label="Abajo"><ArrowDown /></button>
        <button className={btn} onClick={() => mover(0, 1)} aria-label="Derecha"><ArrowRight /></button>
      </div>
      <p className="text-xs text-slate-400">Usa los botones o las flechas del teclado. Camina hacia un personaje para hablar con él.</p>

      {mochila && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-sm text-center shadow-2xl">
            <div className="text-5xl mb-2">{cfg.item}</div>
            <p className="font-bold text-primary-700 dark:text-primary-300 mb-1">¡Conseguiste: {cfg.itemNombre}!</p>
            <p className="text-sm text-slate-500 mb-4">Se guardó en tu mochila.</p>
            <button onClick={() => onFin(true)} className="bg-success-500 text-white font-bold rounded-2xl px-6 py-3">Continuar</button>
          </div>
        </div>
      )}

      {dialogo && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 max-w-md w-full shadow-2xl">
            {dialogo === 'A' && (<>
              <p className="font-bold mb-1">{cfg.npcA.emoji} {cfg.npcA.nombre}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{cfg.npcA.texto}</p>
              <button onClick={() => setDialogo(null)} className="bg-primary-600 text-white font-bold rounded-xl px-4 py-2">Entendido</button>
            </>)}
            {dialogo === 'Bantes' && (<>
              <p className="font-bold mb-1">{cfg.npcB.emoji} {cfg.npcB.nombre}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Todavía no sé qué buscas. Primero habla con {cfg.npcA.emoji} {cfg.npcA.nombre}.</p>
              <button onClick={() => setDialogo(null)} className="bg-primary-600 text-white font-bold rounded-xl px-4 py-2">Ok</button>
            </>)}
            {dialogo === 'B' && (<>
              <p className="font-bold mb-1">{cfg.npcB.emoji} {cfg.npcB.nombre}</p>
              {idx === 0 && !pista && <p className="text-sm text-slate-500 mb-2">{cfg.npcB.intro}</p>}
              <p className="text-xs text-slate-400 mb-1">Pregunta {idx + 1} de {cfg.npcB.preguntas.length}</p>
              <p className="font-semibold text-slate-700 dark:text-slate-100 mb-3">{cfg.npcB.preguntas[idx].q}</p>
              <div className="flex flex-col gap-2">
                {cfg.npcB.preguntas[idx].ops.map((o, i) => (
                  <button key={o} onClick={() => responder(i)} className="text-left border-2 border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 text-sm hover:border-primary-400">{o}</button>
                ))}
              </div>
              {pista && <p className="mt-3 text-sm text-error-600">💡 {pista}</p>}
            </>)}
          </div>
        </div>
      )}
    </div>
  );
}
