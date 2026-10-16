import { AlertCircle, Trash2 } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { preguntas } from '../../data/preguntas';
import { getNivel } from '../../data/niveles';
import { audioManager } from '../../audio/audioManager';
import { Button } from '../ui/Button';

interface ErrorReviewProps {
  onJugarNivel: (nivel: number) => void;
}

export function ErrorReview({ onJugarNivel }: ErrorReviewProps) {
  const { preguntasFalladas, desmarcarPreguntaFallada } = useGameStore();
  const falladas = preguntas.filter(p => preguntasFalladas.includes(p.id));
  const nivelesFallados = [...new Set(falladas.map(p => p.nivel))].sort((a, b) => a - b);

  return (
    <div className="max-w-3xl mx-auto p-4 pb-20">
      <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 mb-2">Repaso de errores</h2>
      <p className="text-sm text-slate-500 mb-4">
        Aquí están las preguntas que has fallado. ¡Repásalas para mejorar!
      </p>

      {falladas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400">¡No tienes preguntas falladas! ¡Sigue así!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {nivelesFallados.map(nivelId => {
            const nivelMeta = getNivel(nivelId);
            const preguntasNivel = falladas.filter(p => p.nivel === nivelId);
            return (
              <div key={nivelId} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">
                    {nivelMeta?.icono} {nivelMeta?.titulo}
                  </h3>
                  <Button size="sm" variant="primary" onClick={() => { audioManager.tocarEfecto('clic'); onJugarNivel(nivelId); }}>
                    Repasar
                  </Button>
                </div>
                <div className="space-y-2">
                  {preguntasNivel.map(p => (
                    <div key={p.id} className="flex items-start gap-2 bg-error-50 dark:bg-error-900/20 rounded-xl p-3">
                      <AlertCircle size={16} className="text-error-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 dark:text-slate-200">{p.enunciado}</p>
                        <p className="text-xs text-slate-400 mt-1">{p.explicacion}</p>
                      </div>
                      <button
                        onClick={() => { audioManager.tocarEfecto('clic'); desmarcarPreguntaFallada(p.id); }}
                        className="text-slate-400 hover:text-error-500 flex-shrink-0"
                        aria-label="Quitar de errores"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
