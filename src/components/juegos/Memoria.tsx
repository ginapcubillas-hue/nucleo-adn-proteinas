import { useMemo, useState } from 'react';
import { audioManager } from '../../audio/audioManager';

export function Memoria({ pares, onFin }: { pares: [string, string][]; onFin: (ok: boolean) => void }) {
  const cartas = useMemo(() => pares.flatMap(([a, b], i) => [
    { id: `${i}a`, par: i, txt: a, term: true }, { id: `${i}b`, par: i, txt: b, term: false },
  ]).sort(() => Math.random() - 0.5), [pares]);
  const [abiertas, setAbiertas] = useState<string[]>([]);
  const [hechas, setHechas] = useState<number[]>([]);
  const [intentos, setIntentos] = useState(0);

  const tocar = (id: string) => {
    const carta = cartas.find(c => c.id === id)!;
    if (abiertas.length >= 2 || abiertas.includes(id) || hechas.includes(carta.par)) return;
    const nuevas = [...abiertas, id];
    setAbiertas(nuevas);
    if (nuevas.length === 2) {
      setIntentos(n => n + 1);
      const [x, y] = nuevas.map(i => cartas.find(c => c.id === i)!);
      if (x.par === y.par) {
        audioManager.tocarEfecto('acierto');
        const nh = [...hechas, x.par];
        setTimeout(() => { setHechas(nh); setAbiertas([]); if (nh.length === pares.length) setTimeout(() => onFin(true), 500); }, 500);
      } else {
        audioManager.tocarEfecto('error');
        setTimeout(() => setAbiertas([]), 900);
      }
    } else audioManager.tocarEfecto('clic');
  };

  return (
    <div>
      <p className="text-sm text-center text-slate-500 mb-3">Une cada término con su descripción. Intentos: {intentos}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {cartas.map(c => {
          const visible = abiertas.includes(c.id) || hechas.includes(c.par);
          return (
            <button key={c.id} onClick={() => tocar(c.id)}
              className={`min-h-[84px] rounded-2xl p-2 text-xs font-semibold transition-all ${
                hechas.includes(c.par) ? 'bg-success-100 text-success-800 border-2 border-success-400'
                : visible ? (c.term ? 'bg-primary-100 text-primary-800' : 'bg-accent-100 text-accent-800') + ' border-2 border-primary-300'
                : 'bg-primary-600 text-white text-2xl'}`}>
              {visible ? c.txt : '🧬'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
