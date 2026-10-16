import { useEffect, useMemo, useRef, useState } from 'react';
import { PreguntaNPC } from './Aventura';

const NOTAS = [
  { n: 'Do', f: 261.63, c: '#ef4444' }, { n: 'Re', f: 293.66, c: '#f59e0b' },
  { n: 'Mi', f: 329.63, c: '#22c55e' }, { n: 'Sol', f: 392.0, c: '#3b82f6' },
];

export function LabMusical({ preguntas, onFin }: { preguntas: PreguntaNPC[]; onFin: (ok: boolean) => void }) {
  const ctx = useRef<AudioContext | null>(null);
  const [i, setI] = useState(0);
  const [melodia, setMelodia] = useState<number[]>([]);
  const [pista, setPista] = useState('');
  const [sonando, setSonando] = useState(false);

  // Orden aleatorio de las opciones; cada posición tiene su nota
  const ordenes = useMemo(() => preguntas.map(p => p.ops.map((_, k) => k).sort(() => Math.random() - 0.5)), [preguntas]);

  useEffect(() => () => { ctx.current?.close().catch(() => {}); ctx.current = null; }, []);

  const tocar = (freq: number, inicio = 0, dur = 0.35, tipo: OscillatorType = 'triangle') => {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    ctx.current ??= new AC();
    const c = ctx.current; if (c.state === 'suspended') c.resume().catch(() => {});
    const t = c.currentTime + inicio;
    const o = c.createOscillator(); const g = c.createGain();
    o.type = tipo; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.3, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
  };

  const elegir = (pos: number) => {
    if (sonando) return;
    const p = preguntas[i]; const op = ordenes[i][pos];
    const nota = NOTAS[pos];
    if (op === p.ok) {
      tocar(nota.f); setPista('');
      const nm = [...melodia, pos]; setMelodia(nm);
      if (i + 1 >= preguntas.length) {
        setSonando(true);
        nm.forEach((m, k) => tocar(NOTAS[m].f, 0.6 + k * 0.4, 0.4));
        setTimeout(() => onFin(true), 800 + nm.length * 400);
      } else setI(i + 1);
    } else { tocar(110, 0, 0.3, 'sawtooth'); setPista(p.pista); }
  };

  const p = preguntas[i];
  return (
    <div className="max-w-md mx-auto">
      <p className="text-sm text-center text-slate-500 mb-2">Cada respuesta correcta suma una nota a tu melodía. Al final suena completa 🎶</p>
      <div className="flex justify-center gap-1 mb-3 min-h-[28px]">
        {melodia.map((m, k) => <span key={k} className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: NOTAS[m].c }}>{NOTAS[m].n}</span>)}
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-4 mb-3">
        <p className="text-xs text-slate-400 mb-1">Pregunta {i + 1} de {preguntas.length}</p>
        <p className="font-semibold text-slate-700 dark:text-slate-100">{p.q}</p>
      </div>
      <div className="flex flex-col gap-2">
        {ordenes[i].map((op, pos) => (
          <button key={pos} onClick={() => elegir(pos)} disabled={sonando}
            className="flex items-center gap-3 text-left rounded-xl px-3 py-2 bg-white dark:bg-slate-800 shadow border-2 border-transparent hover:border-primary-300 active:scale-[0.98]">
            <span className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: NOTAS[pos].c }}>🎵 {NOTAS[pos].n}</span>
            <span className="text-sm">{p.ops[op]}</span>
          </button>
        ))}
      </div>
      {pista && <p className="mt-3 text-sm text-error-600 text-center">💡 {pista}</p>}
    </div>
  );
}
