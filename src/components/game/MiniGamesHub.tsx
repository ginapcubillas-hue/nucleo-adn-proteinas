import { Gamepad2, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { audioManager } from '../../audio/audioManager';

interface MiniGamesHubProps {
  onSelect: (game: string) => void;
  onBack: () => void;
}

const juegos = [
  { id: 'dna-translator', nombre: 'Traductor de ADN', descripcion: 'Transcribe ADN a ARNm, traduce a aminoácidos y escribe anticodones.', icono: '🧬' },
  { id: 'ribosome-action', nombre: 'Ribosoma en acción', descripcion: 'Arrastra aa-ARNt al sitio A, forma enlaces peptídicos y transloca.', icono: '⚙️' },
  { id: 'mutation-simulator', nombre: 'Simulador de mutaciones', descripcion: 'Cambia bases del ARNm y clasifica la mutación resultante.', icono: '⚠️' },
  { id: 'ran-builder', nombre: 'Constructor del ciclo de Ran', descripcion: 'Ordena los pasos del ciclo de importación de Ran.', icono: '🔄' },
  { id: 'chromosome-id', nombre: 'Cromosomas locos', descripcion: 'Identifica visualmente deleción, duplicación, inversión y translocación.', icono: '🔬' },
];

export function MiniGamesHub({ onSelect, onBack }: MiniGamesHubProps) {
  return (
    <div className="max-w-3xl mx-auto p-4 pb-20">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => { audioManager.tocarEfecto('clic'); onBack(); }} className="text-slate-400 hover:text-primary-500">
          <ArrowLeft size={22} />
        </button>
        <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 flex items-center gap-2">
          <Gamepad2 size={22} /> Mini-juegos
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {juegos.map(j => (
          <button
            key={j.id}
            onClick={() => { audioManager.tocarEfecto('clic'); onSelect(j.id); }}
            className="text-left bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 hover:shadow-lg hover:border-primary-300 border-2 border-transparent transition-all"
          >
            <div className="text-3xl mb-2">{j.icono}</div>
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-1">{j.nombre}</h3>
            <p className="text-xs text-slate-400">{j.descripcion}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
