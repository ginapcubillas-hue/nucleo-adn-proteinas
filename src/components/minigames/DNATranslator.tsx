import { useState } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { transcribirADN, traducirARNm, anticodonDe } from '../../data/codigoGenetico';
import { AvatarCompanion } from '../avatar/AvatarCompanion';
import { Button } from '../ui/Button';
import { useGameStore } from '../../store/gameStore';
import { hablar } from '../../audio/vozManager';
import { audioManager } from '../../audio/audioManager';

type Fase = 'adn' | 'arnm' | 'aminoacidos' | 'anticodones' | 'resultado';

const secuenciaBase = 'TAC GGC GAT CCC AAA TAT CAT TAT ACT';

function generarSecuenciaAleatoria(): string {
  const bases = ['T', 'A', 'C', 'G'];
  const numCodones = 5 + Math.floor(Math.random() * 4);
  const codones: string[] = [];
  for (let i = 0; i < numCodones; i++) {
    codones.push(Array.from({ length: 3 }, () => bases[Math.floor(Math.random() * 4)]).join(''));
  }
  return codones.join(' ');
}

export function DNATranslator() {
  const { vozOn, vozURI, velocidadVoz, volumenMusica, reducirAnimaciones } = useGameStore();
  const [secuencia] = useState(() => Math.random() < 0.5 ? secuenciaBase : generarSecuenciaAleatoria());
  const [fase, setFase] = useState<Fase>('adn');
  const [arnmInput, setArnmInput] = useState('');
  const [arnmCorrecto, setArnmCorrecto] = useState('');
  const [aminoacidosInput, setAminoacidosInput] = useState<string[]>([]);
  const [anticodonesInput, setAnticodonesInput] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);

  const codonesADN = secuencia.split(' ');
  const codonesARNm = arnmCorrecto ? arnmCorrecto.match(/.{3}/g) ?? [] : [];

  const decir = (texto: string) => {
    if (!vozOn) return;
    audioManager.bajarMusicaParaVoz();
    hablar(texto, { vozURI: vozURI || undefined, velocidad: velocidadVoz, onEnd: () => audioManager.restaurarMusica(volumenMusica) });
  };

  const verificarARNm = () => {
    const correcto = transcribirADN(secuencia);
    const input = arnmInput.replace(/\s/g, '').toUpperCase();
    setArnmCorrecto(correcto);
    const ok = input === correcto;
    setEsCorrecto(ok);
    setMostrarFeedback(true);
    if (ok) {
      audioManager.tocarEfecto('acierto');
      setFeedback('¡Correcto! Ese es el ARNm.');
      decir('¡Correcto! Ese es el ARN mensajero.');
      setFase('arnm');
    } else {
      audioManager.tocarEfecto('error');
      setFeedback(`Casi. El ARNm correcto es: ${correcto.match(/.{3}/g)?.join(' ')}`);
      decir(`Casi. El ARN mensajero correcto es: ${correcto.match(/.{3}/g)?.join(' ')}`);
    }
  };

  const verificarAminoacidos = () => {
    const correctos = traducirARNm(arnmCorrecto);
    const ok = aminoacidosInput.length === correctos.length && aminoacidosInput.every((aa, i) => aa === correctos[i]);
    setEsCorrecto(ok);
    setMostrarFeedback(true);
    if (ok) {
      audioManager.tocarEfecto('acierto');
      setFeedback('¡Perfecto! Traducción correcta.');
      decir('¡Perfecto! La traducción es correcta.');
      setFase('anticodones');
    } else {
      audioManager.tocarEfecto('error');
      setFeedback(`La proteína correcta es: ${correctos.join(' – ')}`);
      decir(`La proteína correcta es: ${correctos.join(', ')}`);
    }
  };

  const verificarAnticodones = () => {
    const correctos = codonesARNm.map(c => anticodonDe(c));
    const ok = anticodonesInput.length === correctos.length && anticodonesInput.every((ac, i) => ac.toUpperCase() === correctos[i].toUpperCase());
    setEsCorrecto(ok);
    setMostrarFeedback(true);
    if (ok) {
      audioManager.tocarEfecto('acierto');
      setFeedback('¡Excelente! Todos los anticodones son correctos.');
      decir('¡Excelente! Todos los anticodones son correctos.');
      setFase('resultado');
    } else {
      audioManager.tocarEfecto('error');
      setFeedback(`Los anticodones correctos son: ${correctos.join(' – ')}`);
      decir(`Los anticodones correctos son: ${correctos.join(', ')}`);
    }
  };

  const aminoacidosCorrectos = traducirARNm(arnmCorrecto);
  const anticodonesCorrectos = codonesARNm.map(c => anticodonDe(c));

  return (
    <div className="max-w-3xl mx-auto p-4 pb-20">
      <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 mb-4">Traductor de ADN</h2>

      {/* ADN molde */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 mb-4">
        <p className="text-sm font-semibold text-slate-500 mb-2">ADN molde:</p>
        <div className="flex flex-wrap gap-2">
          {codonesADN.map((codon, i) => (
            <span key={i} className="font-mono text-sm bg-slate-100 dark:bg-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-200">{codon}</span>
          ))}
        </div>
      </div>

      {/* Fase ARNm */}
      {fase === 'adn' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 mb-4">
          <p className="text-sm font-semibold text-slate-500 mb-2">Escribe el ARNm (transcripción):</p>
          <input
            type="text"
            value={arnmInput}
            onChange={e => setArnmInput(e.target.value)}
            placeholder="Ej: AUG CCG..."
            className="w-full p-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-mono text-slate-700 dark:text-slate-200 focus:border-primary-500 outline-none"
          />
          <Button variant="primary" size="md" className="mt-3" onClick={verificarARNm}>Verificar ARNm</Button>
        </div>
      )}

      {/* ARNm mostrado */}
      {fase !== 'adn' && arnmCorrecto && (
        <div className="bg-success-50 dark:bg-success-900/20 rounded-2xl p-4 mb-4">
          <p className="text-sm font-semibold text-success-700 dark:text-success-300 mb-2">ARNm:</p>
          <div className="flex flex-wrap gap-2">
            {codonesARNm.map((codon, i) => (
              <span key={i} className="font-mono text-sm bg-success-100 dark:bg-success-800/40 rounded-lg px-2 py-1 text-success-700 dark:text-success-300">{codon}</span>
            ))}
          </div>
        </div>
      )}

      {/* Fase aminoácidos */}
      {(fase === 'arnm' || fase === 'aminoacidos' || fase === 'anticodones' || fase === 'resultado') && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 mb-4">
          <p className="text-sm font-semibold text-slate-500 mb-2">Traduce cada codón a aminoácido (usa la tabla del código genético):</p>
          <div className="space-y-2">
            {codonesARNm.map((codon, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-200 w-16 text-center">{codon}</span>
                <ArrowRight size={16} className="text-slate-400" />
                <input
                  type="text"
                  value={aminoacidosInput[i] ?? ''}
                  onChange={e => {
                    const nuevos = [...aminoacidosInput];
                    nuevos[i] = e.target.value;
                    setAminoacidosInput(nuevos);
                  }}
                  placeholder="Phe, Leu..."
                  className="w-24 p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 focus:border-primary-500 outline-none"
                />
                {(fase === 'anticodones' || fase === 'resultado') && (
                  <span className="text-sm font-bold text-success-600">{aminoacidosCorrectos[i]}</span>
                )}
              </div>
            ))}
          </div>
          {fase === 'arnm' && <Button variant="primary" size="md" className="mt-3" onClick={verificarAminoacidos}>Verificar aminoácidos</Button>}
        </div>
      )}

      {/* Fase anticodones */}
      {(fase === 'anticodones') && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 mb-4">
          <p className="text-sm font-semibold text-slate-500 mb-2">Escribe los anticodones del ARNt:</p>
          <div className="space-y-2">
            {codonesARNm.map((codon, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-200 w-16 text-center">{codon}</span>
                <ArrowRight size={16} className="text-slate-400" />
                <input
                  type="text"
                  value={anticodonesInput[i] ?? ''}
                  onChange={e => {
                    const nuevos = [...anticodonesInput];
                    nuevos[i] = e.target.value;
                    setAnticodonesInput(nuevos);
                  }}
                  placeholder="UAC..."
                  className="w-24 p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-sm font-mono text-slate-700 dark:text-slate-200 focus:border-primary-500 outline-none"
                />
                <span className="text-[10px] text-slate-400">No ARNt para STOP</span>
              </div>
            ))}
          </div>
          <Button variant="primary" size="md" className="mt-3" onClick={verificarAnticodones}>Verificar anticodones</Button>
        </div>
      )}

      {/* Feedback */}
      {mostrarFeedback && (
        <div className={`rounded-2xl p-4 mb-4 flex gap-3 ${esCorrecto ? 'bg-success-50 dark:bg-success-900/20' : 'bg-error-50 dark:bg-error-900/20'}`}>
          <AvatarCompanion expresion={esCorrecto ? 'feliz' : 'neutral'} size={60} reducirAnimaciones={reducirAnimaciones} />
          <div className="flex-1">
            <p className={`text-sm font-semibold ${esCorrecto ? 'text-success-700' : 'text-error-700'}`}>
              {esCorrecto ? <><Check size={16} className="inline" /> </> : <><X size={16} className="inline" /> </>}
              {feedback}
            </p>
            {!esCorrecto && (
              <Button variant="primary" size="sm" className="mt-2" onClick={() => setMostrarFeedback(false)}>Intentar de nuevo</Button>
            )}
          </div>
        </div>
      )}

      {/* Resultado final */}
      {fase === 'resultado' && (
        <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 rounded-2xl p-6 text-center">
          <AvatarCompanion expresion="celebrar" size={100} reducirAnimaciones={reducirAnimaciones} />
          <p className="font-display font-bold text-success-600 mt-2">¡Traducción completada!</p>
          <p className="text-sm text-slate-500 mt-2">Proteína: {aminoacidosCorrectos.join(' – ')}</p>
        </div>
      )}
    </div>
  );
}
