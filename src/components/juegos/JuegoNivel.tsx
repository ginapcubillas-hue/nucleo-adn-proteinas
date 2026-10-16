import { useEffect, useState } from 'react';
import { juegosPorNivel } from '../../data/juegosNivel';
import { getNivel } from '../../data/niveles';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/audioManager';
import { Aventura } from './Aventura';
import { Memoria } from './Memoria';
import { Ordenar } from './Ordenar';
import { AtrapaBase } from './AtrapaBase';
import { LabMusical } from './LabMusical';
import { Clasificar } from './Clasificar';

/** Mini-juego que se juega después de cada tema. Hay que superarlo para pasar al siguiente. */
export function JuegoNivel({ nivel, onTerminar }: { nivel: number; onTerminar: () => void }) {
  const juego = juegosPorNivel[nivel];
  const [intento, setIntento] = useState(0);
  const [fallos, setFallos] = useState(0);
  const [resultado, setResultado] = useState<null | boolean>(null);
  const ganarMonedas = useGameStore(s => s.ganarMonedas);

  // Si un tema no tiene juego, se pasa directo (no se puede llamar durante el render)
  useEffect(() => { if (!juego) onTerminar(); }, [juego]);
  if (!juego) return null;

  const fin = (ok: boolean) => {
    if (ok) { ganarMonedas(20); audioManager.tocarEfecto('nivel'); }
    else setFallos(f => f + 1);
    setResultado(ok);
  };
  const reintentar = () => { setResultado(null); setIntento(i => i + 1); };

  return (
    <div className="min-h-screen p-4 pb-10 max-w-2xl mx-auto">
      <p className="text-xs text-center text-slate-400">Tema {nivel}: {getNivel(nivel)?.titulo}</p>
      <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 text-center mb-4">🎮 {juego.titulo}</h2>

      {resultado === null ? (
        <div key={intento}>
          {juego.tipo === 'aventura' && <Aventura cfg={juego.cfg} onFin={fin} />}
          {juego.tipo === 'memoria' && <Memoria pares={juego.pares} onFin={fin} />}
          {juego.tipo === 'ordenar' && <Ordenar pasos={juego.pasos} onFin={fin} />}
          {juego.tipo === 'atrapa' && <AtrapaBase modo={juego.modo} onFin={fin} />}
          {juego.tipo === 'musical' && <LabMusical preguntas={juego.preguntas} onFin={fin} />}
          {juego.tipo === 'clasificar' && <Clasificar cats={juego.cats} items={juego.items} onFin={fin} />}
        </div>
      ) : (
        <div className="max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 text-center">
          <div className="text-5xl mb-2">{resultado ? '🎉' : '💪'}</div>
          <p className="font-bold text-lg text-slate-700 dark:text-slate-100 mb-1">{resultado ? '¡Juego superado!' : '¡Casi lo logras!'}</p>
          <p className="text-sm text-slate-500 mb-4">{resultado ? '+20 monedas. Sigue con el siguiente tema.' : 'Inténtalo otra vez, ¡tú puedes!'}</p>
          <div className="flex flex-col gap-2">
            {resultado
              ? <button onClick={onTerminar} className="bg-success-500 text-white font-bold rounded-2xl py-3">Continuar</button>
              : <button onClick={reintentar} className="bg-primary-600 text-white font-bold rounded-2xl py-3">Intentar otra vez</button>}
            {!resultado && fallos >= 2 && (
              <button onClick={onTerminar} className="text-sm text-slate-400 underline">Saltar este juego</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
