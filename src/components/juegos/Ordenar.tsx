import { useMemo, useState } from 'react';
import { audioManager } from '../../audio/audioManager';

export function Ordenar({ pasos, onFin }: { pasos: string[]; onFin: (ok: boolean) => void }) {
  const mezclados = useMemo(() => [...pasos].sort(() => Math.random() - 0.5), [pasos]);
  const [puestos, setPuestos] = useState<string[]>([]);
  const [errores, setErrores] = useState(0);
  const [mal, setMal] = useState<string | null>(null);

  const elegir = (p: string) => {
    if (p === pasos[puestos.length]) {
      audioManager.tocarEfecto('acierto');
      const n = [...puestos, p]; setPuestos(n);
      if (n.length === pasos.length) setTimeout(() => onFin(true), 600);
    } else {
      audioManager.tocarEfecto('error'); setErrores(e => e + 1); setMal(p); setTimeout(() => setMal(null), 500);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <p className="text-sm text-center text-slate-500 mb-3">Toca los pasos en el orden correcto, del primero al último. Errores: {errores}</p>
      <ol className="space-y-1 mb-4">
        {pasos.map((_, i) => (
          <li key={i} className={`rounded-xl px-3 py-2 text-sm border-2 ${puestos[i] ? 'bg-success-50 border-success-400 text-success-800' : 'border-dashed border-slate-300 text-slate-300'}`}>
            {i + 1}. {puestos[i] ?? '…'}
          </li>
        ))}
      </ol>
      <div className="flex flex-col gap-2">
        {mezclados.filter(p => !puestos.includes(p)).map(p => (
          <button key={p} onClick={() => elegir(p)}
            className={`rounded-xl px-3 py-2 text-sm font-medium bg-white dark:bg-slate-800 shadow border-2 transition-all ${mal === p ? 'border-error-500 animate-wiggle' : 'border-transparent hover:border-primary-300'}`}>
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
