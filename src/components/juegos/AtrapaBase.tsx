import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { AvatarSVG } from '../avatar/AvatarSVG';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/audioManager';

export type ModoAtrapa = 'adn' | 'transcripcion' | 'anticodon';
const CFG: Record<ModoAtrapa, { molde: string[]; mapa: Record<string, string>; opciones: string[]; titulo: string; origen: string; destino: string }> = {
  adn:           { molde: ['A', 'T', 'C', 'G'], mapa: { A: 'T', T: 'A', C: 'G', G: 'C' }, opciones: ['A', 'T', 'C', 'G'], titulo: 'Completa la cadena complementaria de ADN', origen: 'Cadena molde', destino: 'Tu cadena' },
  transcripcion: { molde: ['A', 'T', 'C', 'G'], mapa: { A: 'U', T: 'A', C: 'G', G: 'C' }, opciones: ['A', 'U', 'C', 'G'], titulo: 'Transcribe: ADN molde → ARNm', origen: 'ADN molde', destino: 'ARNm' },
  anticodon:     { molde: ['A', 'U', 'C', 'G'], mapa: { A: 'U', U: 'A', C: 'G', G: 'C' }, opciones: ['A', 'U', 'C', 'G'], titulo: 'Forma el anticodón del ARNt', origen: 'Codón (ARNm)', destino: 'Anticodón' },
};
const COL = ['#4f46e5', '#0891b2', '#16a34a', '#d97706'];
interface Item { id: number; lane: number; y: number; l: string }

export function AtrapaBase({ modo, onFin }: { modo: ModoAtrapa; onFin: (ok: boolean) => void }) {
  const c = CFG[modo];
  const avatar = useGameStore(s => s.avatar);
  const largo = 6;
  const [molde] = useState(() => Array.from({ length: largo }, () => c.molde[Math.floor(Math.random() * 4)]));
  const [progreso, setProgreso] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [lane, setLane] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [flash, setFlash] = useState<'ok' | 'mal' | null>(null);
  const R = useRef({ lane: 1, progreso: 0, vidas: 3, items: [] as Item[], t: 0, id: 0, fin: false });

  const mover = (d: number) => { const n = Math.max(0, Math.min(3, R.current.lane + d)); R.current.lane = n; setLane(n); };

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') mover(-1); if (e.key === 'ArrowRight') mover(1); };
    window.addEventListener('keydown', h);
    const iv = setInterval(() => {
      const s = R.current; if (s.fin) return;
      s.t++;
      const vel = 1.5 + s.progreso * 0.25;
      if (s.t % 16 === 0) {
        const correcta = c.mapa[molde[s.progreso]];
        const l = Math.random() < 0.55 ? correcta : c.opciones[Math.floor(Math.random() * 4)];
        s.items.push({ id: s.id++, lane: Math.floor(Math.random() * 4), y: 0, l });
      }
      const quedan: Item[] = [];
      for (const it of s.items) {
        it.y += vel;
        if (it.y >= 82 && it.y < 100 && it.lane === s.lane) {
          if (it.l === c.mapa[molde[s.progreso]]) {
            s.progreso++; setProgreso(s.progreso); setFlash('ok'); audioManager.tocarEfecto('acierto');
            if (s.progreso >= largo) { s.fin = true; setTimeout(() => onFin(true), 500); }
          } else {
            s.vidas--; setVidas(s.vidas); setFlash('mal'); audioManager.tocarEfecto('error');
            if (s.vidas <= 0) { s.fin = true; setTimeout(() => onFin(false), 500); }
          }
          setTimeout(() => setFlash(null), 200);
          continue;
        }
        if (it.y < 100) quedan.push(it);
      }
      s.items = quedan; setItems([...quedan]);
    }, 80);
    return () => { clearInterval(iv); window.removeEventListener('keydown', h); };
  }, []);

  const fila = (letras: (string | null)[], color: string) => (
    <div className="flex gap-1 justify-center">
      {letras.map((l, i) => <span key={i} className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ background: l ? color : '#cbd5e1' }}>{l ?? '?'}</span>)}
    </div>
  );

  return (
    <div className="max-w-sm mx-auto">
      <p className="text-sm text-center font-semibold text-slate-600 dark:text-slate-300 mb-2">{c.titulo}</p>
      <p className="text-center text-xs text-slate-400">{c.origen}</p>
      {fila(molde, '#4f46e5')}
      <p className="text-center text-xs text-slate-400 mt-1">{c.destino}</p>
      {fila(molde.map((m, i) => (i < progreso ? c.mapa[m] : null)), '#16a34a')}
      <div className="flex justify-center gap-1 my-2">{[0, 1, 2].map(i => <Heart key={i} size={20} className={i < vidas ? 'fill-error-500 text-error-500' : 'text-slate-300'} />)}</div>

      <div className={`relative rounded-2xl overflow-hidden h-80 touch-none transition-colors ${flash === 'ok' ? 'bg-success-100' : flash === 'mal' ? 'bg-error-100' : 'bg-slate-100 dark:bg-slate-800'}`}
        onPointerDown={e => { const r = e.currentTarget.getBoundingClientRect(); const n = Math.min(3, Math.floor(((e.clientX - r.left) / r.width) * 4)); R.current.lane = n; setLane(n); }}>
        {[1, 2, 3].map(i => <div key={i} className="absolute top-0 bottom-0 border-l border-slate-300/50" style={{ left: `${i * 25}%` }} />)}
        {items.map(it => (
          <div key={it.id} className="absolute w-[25%] flex justify-center" style={{ left: `${it.lane * 25}%`, top: `${it.y}%` }}>
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow" style={{ background: COL[c.opciones.indexOf(it.l)] }}>{it.l}</span>
          </div>
        ))}
        <div className="absolute bottom-0 w-[25%] flex justify-center transition-all duration-100" style={{ left: `${lane * 25}%` }}>
          <AvatarSVG config={avatar} size={52} />
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-3">
        <button onClick={() => mover(-1)} className="w-16 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center active:scale-95" aria-label="Izquierda"><ArrowLeft /></button>
        <button onClick={() => mover(1)} className="w-16 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center active:scale-95" aria-label="Derecha"><ArrowRight /></button>
      </div>
      <p className="text-xs text-center text-slate-400 mt-1">Mueve a tu personaje y atrapa solo la base que empareja con la siguiente casilla.</p>
    </div>
  );
}
