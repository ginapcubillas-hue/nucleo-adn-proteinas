import { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { pasosImportacion } from '../../data/contenido';
import { Button } from '../ui/Button';
import { AvatarCompanion } from '../avatar/AvatarCompanion';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/audioManager';

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function RanCycleBuilder() {
  const { reducirAnimaciones } = useGameStore();
  const [items, setItems] = useState(() => shuffleArray(pasosImportacion));
  const [verificado, setVerificado] = useState(false);
  const [arrastrando, setArrastrando] = useState<number | null>(null);

  const mover = (desde: number, hacia: number) => {
    if (verificado) return;
    const nuevos = [...items];
    const [item] = nuevos.splice(desde, 1);
    nuevos.splice(hacia, 0, item);
    setItems(nuevos);
  };

  const verificar = () => {
    audioManager.tocarEfecto('clic');
    setVerificado(true);
    const correcto = items.every((item, i) => item.paso === pasosImportacion[i].paso);
    if (correcto) audioManager.tocarEfecto('acierto');
    else audioManager.tocarEfecto('error');
  };

  const reiniciar = () => {
    audioManager.tocarEfecto('clic');
    setItems(shuffleArray(pasosImportacion));
    setVerificado(false);
  };

  const todosCorrectos = verificado && items.every((item, i) => item.paso === pasosImportacion[i].paso);

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 mb-2">Constructor del ciclo de Ran</h2>
      <p className="text-sm text-slate-500 mb-4">Arrastra los pasos para ordenar el ciclo de importación correctamente.</p>

      <div className="space-y-2">
        {items.map((item, i) => {
          const posicionCorrecta = item.paso === pasosImportacion[i].paso;
          return (
            <div
              key={item.paso}
              draggable={!verificado}
              onDragStart={() => setArrastrando(i)}
              onDragOver={e => e.preventDefault()}
              onDrop={() => { if (arrastrando !== null) mover(arrastrando, i); setArrastrando(null); }}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 text-sm cursor-move transition-all ${
                verificado
                  ? posicionCorrecta
                    ? 'border-success-500 bg-success-50 dark:bg-success-900/20'
                    : 'border-error-500 bg-error-50 dark:bg-error-900/20'
                  : 'border-slate-200 dark:border-slate-600 hover:border-primary-400 bg-white dark:bg-slate-800'
              }`}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold">{i + 1}</span>
              <span className="flex-1 text-slate-700 dark:text-slate-200">{item.texto}</span>
              {verificado && (posicionCorrecta ? <Check size={18} className="text-success-500" /> : <X size={18} className="text-error-500" />)}
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-4">
        {!verificado ? (
          <Button variant="primary" size="md" onClick={verificar}>Verificar orden</Button>
        ) : (
          <>
            {todosCorrectos && (
              <div className="flex items-center gap-2">
                <AvatarCompanion expresion="celebrar" size={50} reducirAnimaciones={reducirAnimaciones} />
                <p className="text-success-600 font-bold text-sm">¡Perfecto!</p>
              </div>
            )}
            <Button variant="ghost" size="md" onClick={reiniciar}><span className="flex items-center gap-1"><RotateCcw size={16} /> Reiniciar</span></Button>
          </>
        )}
      </div>
    </div>
  );
}
