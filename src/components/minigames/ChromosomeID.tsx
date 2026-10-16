import { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { AvatarCompanion } from '../avatar/AvatarCompanion';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/audioManager';
import { hablar } from '../../audio/vozManager';

type TipoMutacion = 'deleción' | 'duplicación' | 'inversión' | 'translocación';

interface CasoCromosoma {
  tipo: TipoMutacion;
  descripcion: string;
  svg: React.ReactNode;
}

const casos: CasoCromosoma[] = [
  {
    tipo: 'deleción',
    descripcion: 'Un segmento del cromosoma se pierde.',
    svg: (
      <svg viewBox="0 0 200 60" className="w-full max-w-xs">
        <rect x="10" y="20" width="180" height="20" rx="10" fill="#4f46e5" />
        <rect x="80" y="20" width="30" height="20" fill="white" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
        <text x="95" y="55" textAnchor="middle" fill="#ef4444" fontSize="10">¿?</text>
        <text x="100" y="15" textAnchor="middle" fill="#4f46e5" fontSize="10">A B C D E F</text>
        <text x="95" y="55" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">X</text>
      </svg>
    ),
  },
  {
    tipo: 'duplicación',
    descripcion: 'Un segmento se repite.',
    svg: (
      <svg viewBox="0 0 200 60" className="w-full max-w-xs">
        <rect x="10" y="20" width="180" height="20" rx="10" fill="#4f46e5" />
        <rect x="80" y="18" width="30" height="24" fill="#22c55e" opacity="0.5" stroke="#22c55e" strokeWidth="2" />
        <rect x="110" y="18" width="30" height="24" fill="#22c55e" opacity="0.5" stroke="#22c55e" strokeWidth="2" />
        <text x="100" y="15" textAnchor="middle" fill="#4f46e5" fontSize="10">A B C C D E F</text>
      </svg>
    ),
  },
  {
    tipo: 'inversión',
    descripcion: 'Un segmento gira 180° dentro del mismo cromosoma.',
    svg: (
      <svg viewBox="0 0 200 60" className="w-full max-w-xs">
        <rect x="10" y="20" width="180" height="20" rx="10" fill="#4f46e5" />
        <rect x="80" y="20" width="40" height="20" fill="#f59e0b" opacity="0.4" stroke="#f59e0b" strokeWidth="2" />
        <text x="100" y="35" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">← inv</text>
        <text x="100" y="15" textAnchor="middle" fill="#4f46e5" fontSize="10">A B C D E F</text>
      </svg>
    ),
  },
  {
    tipo: 'translocación',
    descripcion: 'Intercambio entre cromosomas distintos.',
    svg: (
      <svg viewBox="0 0 200 80" className="w-full max-w-xs">
        <rect x="10" y="15" width="80" height="15" rx="7" fill="#4f46e5" />
        <rect x="110" y="15" width="80" height="15" rx="7" fill="#06b6d4" />
        <rect x="60" y="13" width="30" height="19" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="2" />
        <rect x="110" y="13" width="30" height="19" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="2" />
        <path d="M 75 30 Q 85 45 125 13" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3" markerEnd="url(#arrowT)" />
        <text x="100" y="65" textAnchor="middle" fill="#475569" fontSize="9">Crom 1 ↔ Crom 2</text>
        <defs><marker id="arrowT" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#ef4444" /></marker></defs>
      </svg>
    ),
  },
];

const tiposOpciones: TipoMutacion[] = ['deleción', 'duplicación', 'inversión', 'translocación'];

export function ChromosomeID() {
  const { vozOn, vozURI, velocidadVoz, volumenMusica, reducirAnimaciones } = useGameStore();
  const [indice, setIndice] = useState(() => Math.floor(Math.random() * casos.length));
  const [seleccion, setSeleccion] = useState<TipoMutacion | null>(null);
  const [verificado, setVerificado] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [intentos, setIntentos] = useState(0);

  const caso = casos[indice];
  const esCorrecto = seleccion === caso.tipo;

  const decir = (texto: string) => {
    if (!vozOn) return;
    audioManager.bajarMusicaParaVoz();
    hablar(texto, { vozURI: vozURI || undefined, velocidad: velocidadVoz, onEnd: () => audioManager.restaurarMusica(volumenMusica) });
  };

  const verificar = () => {
    if (!seleccion) return;
    audioManager.tocarEfecto('clic');
    setVerificado(true);
    setIntentos(i => i + 1);
    if (esCorrecto) {
      setAciertos(a => a + 1);
      audioManager.tocarEfecto('acierto');
      decir(`¡Correcto! Es una ${caso.tipo}.`);
    } else {
      audioManager.tocarEfecto('error');
      decir(`No. Es una ${caso.tipo}.`);
    }
  };

  const siguiente = () => {
    audioManager.tocarEfecto('clic');
    setIndice(Math.floor(Math.random() * casos.length));
    setSeleccion(null);
    setVerificado(false);
  };

  const reiniciar = () => {
    setIndice(Math.floor(Math.random() * casos.length));
    setSeleccion(null);
    setVerificado(false);
    setAciertos(0);
    setIntentos(0);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 mb-2">Cromosomas locos</h2>
      <p className="text-sm text-slate-500 mb-4">Identifica el tipo de mutación cromosómica que se muestra.</p>

      {/* Marcador */}
      <div className="text-sm text-slate-500 mb-3">Aciertos: {aciertos}/{intentos}</div>

      {/* Diagrama */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-4 flex justify-center">
        {caso.svg}
      </div>

      {/* Opciones */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {tiposOpciones.map(t => (
          <button
            key={t}
            disabled={verificado}
            onClick={() => setSeleccion(t)}
            className={`p-3 rounded-xl border-2 font-semibold text-sm capitalize transition-all ${
              !verificado
                ? seleccion === t
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'border-slate-200 dark:border-slate-600 hover:border-primary-300 text-slate-700 dark:text-slate-200'
                : t === caso.tipo
                  ? 'border-success-500 bg-success-50 text-success-700'
                  : seleccion === t
                    ? 'border-error-500 bg-error-50 text-error-700'
                    : 'border-slate-200 opacity-50'
            }`}
          >
            {verificado && t === caso.tipo && <Check size={14} className="inline mr-1" />}
            {verificado && seleccion === t && t !== caso.tipo && <X size={14} className="inline mr-1" />}
            {t}
          </button>
        ))}
      </div>

      {/* Acciones */}
      <div className="flex gap-2">
        {!verificado ? (
          <Button variant="primary" size="md" onClick={verificar} disabled={!seleccion}>Verificar</Button>
        ) : (
          <>
            <div className="flex items-center gap-2 flex-1">
              <AvatarCompanion expresion={esCorrecto ? 'feliz' : 'neutral'} size={45} reducirAnimaciones={reducirAnimaciones} />
              <p className="text-sm text-slate-600 dark:text-slate-300">{caso.descripcion}</p>
            </div>
            <Button variant="success" size="md" onClick={siguiente}>Siguiente</Button>
            <Button variant="ghost" size="md" onClick={reiniciar}><RotateCcw size={16} /></Button>
          </>
        )}
      </div>
    </div>
  );
}
