import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, ArrowRight } from 'lucide-react';
import { pasosImportacion, pasosExportacion } from '../../data/contenido';
import { Button } from '../ui/Button';
import { audioManager } from '../../audio/audioManager';

export function RanCycleAnimation() {
  const [modo, setModo] = useState<'importacion' | 'exportacion'>('importacion');
  const [paso, setPaso] = useState(0);
  const pasos = modo === 'importacion' ? pasosImportacion : pasosExportacion;
  const pasoActual = pasos[paso];

  const cambiarModo = (m: 'importacion' | 'exportacion') => {
    audioManager.tocarEfecto('clic');
    setModo(m);
    setPaso(0);
  };

  const siguiente = () => {
    audioManager.tocarEfecto('clic');
    if (paso < pasos.length - 1) setPaso(paso + 1);
  };

  const anterior = () => {
    audioManager.tocarEfecto('clic');
    if (paso > 0) setPaso(paso - 1);
  };

  const reiniciar = () => {
    audioManager.tocarEfecto('clic');
    setPaso(0);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5">
      <h3 className="font-display font-bold text-primary-700 dark:text-primary-300 mb-3">Ciclo de Ran</h3>

      {/* Selector */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => cambiarModo('importacion')}
          className={`text-sm font-semibold px-3 py-1.5 rounded-full ${modo === 'importacion' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'}`}
        >
          Importación
        </button>
        <button
          onClick={() => cambiarModo('exportacion')}
          className={`text-sm font-semibold px-3 py-1.5 rounded-full ${modo === 'exportacion' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'}`}
        >
          Exportación
        </button>
      </div>

      {/* Diagrama SVG */}
      <div className="relative bg-gradient-to-b from-primary-50 to-accent-50 dark:from-slate-700 dark:to-slate-900 rounded-xl p-4 mb-4">
        <svg viewBox="0 0 300 200" className="w-full">
          {/* Núcleo */}
          <ellipse cx="150" cy="60" rx="100" ry="45" fill="#4f46e5" opacity="0.15" stroke="#4f46e5" strokeWidth="2" />
          <text x="150" y="40" textAnchor="middle" fill="#4f46e5" fontSize="14" fontWeight="bold">Núcleo</text>
          {/* Citoplasma */}
          <rect x="20" y="120" width="260" height="60" rx="10" fill="#06b6d4" opacity="0.1" stroke="#06b6d4" strokeWidth="2" />
          <text x="150" y="185" textAnchor="middle" fill="#06b6d4" fontSize="12">Citoplasma</text>
          {/* Poro */}
          <circle cx="150" cy="105" r="8" fill="#6366f1" />
          <text x="165" y="108" fill="#6366f1" fontSize="9">Poro</text>

          {/* Ran-GTP en núcleo */}
          {pasoActual && !pasoActual.cito && (
            <g>
              <circle cx="100" cy="60" r="10" fill="#22c55e" opacity="0.8" />
              <text x="100" y="64" textAnchor="middle" fill="white" fontSize="7">GTP</text>
            </g>
          )}
          {/* Ran-GDP en citoplasma */}
          {pasoActual?.cito && (
            <g>
              <circle cx="100" cy="150" r="10" fill="#f59e0b" opacity="0.8" />
              <text x="100" y="154" textAnchor="middle" fill="white" fontSize="7">GDP</text>
            </g>
          )}

          {/* Flechas de transporte */}
          {modo === 'importacion' && (
            <g>
              <path d="M 200 150 Q 190 110 200 65" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="215" y="110" fill="#22c55e" fontSize="8">Carga →</text>
            </g>
          )}
          {modo === 'exportacion' && (
            <g>
              <path d="M 200 65 Q 210 110 200 150" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="215" y="110" fill="#ef4444" fontSize="8">→ Carga</text>
            </g>
          )}

          {/* Defs */}
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={modo === 'importacion' ? '#22c55e' : '#ef4444'} />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Paso actual */}
      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 min-h-[80px]">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">
            {paso + 1}
          </span>
          <span className="text-xs text-slate-400">Paso {paso + 1} de {pasos.length}</span>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-200">{pasoActual?.texto}</p>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between mt-4">
        <Button size="sm" variant="ghost" onClick={anterior} disabled={paso === 0}>
          <span className="flex items-center gap-1"><ChevronLeft size={16} /> Anterior</span>
        </Button>
        <button onClick={reiniciar} className="text-slate-400 hover:text-primary-500" aria-label="Reiniciar">
          <RotateCcw size={18} />
        </button>
        <Button size="sm" variant="primary" onClick={siguiente} disabled={paso === pasos.length - 1}>
          <span className="flex items-center gap-1">Siguiente <ChevronRight size={16} /></span>
        </Button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center gap-1.5 mt-3">
        {pasos.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${i === paso ? 'bg-primary-500 w-6' : i < paso ? 'bg-success-400' : 'bg-slate-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
