import { useMemo, useState } from 'react';
import { audioManager } from '../../audio/audioManager';

export interface ItemClasif { txt: string; cat: 0 | 1; porque: string }

export function Clasificar({ cats, items, onFin }: { cats: [string, string]; items: ItemClasif[]; onFin: (ok: boolean) => void }) {
  const lista = useMemo(() => [...items].sort(() => Math.random() - 0.5), [items]);
  const [i, setI] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [fb, setFb] = useState<null | { ok: boolean; porque: string }>(null);

  const elegir = (c: 0 | 1) => {
    if (fb) return;
    const it = lista[i]; const ok = it.cat === c;
    audioManager.tocarEfecto(ok ? 'acierto' : 'error');
    if (ok) setAciertos(a => a + 1);
    setFb({ ok, porque: it.porque });
  };
  const siguiente = () => {
    setFb(null);
    if (i + 1 >= lista.length) onFin(aciertos >= Math.ceil(lista.length * 0.7));
    else setI(i + 1);
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <p className="text-xs text-slate-400 mb-2">{i + 1} / {lista.length} · Aciertos: {aciertos}</p>
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-6 mb-4 min-h-[110px] flex items-center justify-center font-bold text-lg text-slate-700 dark:text-slate-100">
        {lista[i].txt}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {cats.map((c, k) => (
          <button key={c} onClick={() => elegir(k as 0 | 1)} disabled={!!fb}
            className={`rounded-2xl py-4 font-bold text-white shadow-md active:scale-95 ${k === 0 ? 'bg-primary-600' : 'bg-accent-600'}`}>{c}</button>
        ))}
      </div>
      {fb && (
        <div className={`mt-4 rounded-2xl p-3 text-sm ${fb.ok ? 'bg-success-50 text-success-800' : 'bg-error-50 text-error-800'}`}>
          <p className="font-bold">{fb.ok ? '¡Correcto!' : 'Casi…'}</p>
          <p>{fb.porque}</p>
          <button onClick={siguiente} className="mt-2 bg-primary-600 text-white font-bold rounded-xl px-4 py-1.5">Siguiente</button>
        </div>
      )}
    </div>
  );
}
