import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';
import { traducirCodon, traducirARNm } from '../../data/codigoGenetico';
import { Button } from '../ui/Button';
import { AvatarCompanion } from '../avatar/AvatarCompanion';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/audioManager';
import { hablar } from '../../audio/vozManager';

const secuenciaEjemplo = 'CAA UAC GAA';

type TipoMutacion = 'silenciosa' | 'missense' | 'nonsense' | 'frameshift' | null;

function clasificarMutacion(original: string, mutado: string): { tipo: TipoMutacion; descripcion: string } {
  const originalLimpio = original.replace(/\s/g, '');
  const mutadoLimpio = mutado.replace(/\s/g, '');

  if (originalLimpio.length !== mutadoLimpio.length) {
    const diff = Math.abs(originalLimpio.length - mutadoLimpio.length);
    if (diff % 3 !== 0) {
      return { tipo: 'frameshift', descripcion: 'Cambio de marco de lectura: el número de bases insertadas/deleted no es múltiplo de 3.' };
    }
  }

  const codonesOriginales = originalLimpio.match(/.{3}/g) ?? [];
  const codonesMutados = mutadoLimpio.match(/.{3}/g) ?? [];
  const maxLen = Math.max(codonesOriginales.length, codonesMutados.length);

  let cambios = 0;
  let stopPrematuro = false;
  let mismoAminoacido = true;

  for (let i = 0; i < maxLen; i++) {
    const codonOri = codonesOriginales[i];
    const codonMut = codonesMutados[i];
    if (!codonOri || !codonMut) { cambios++; mismoAminoacido = false; continue; }
    if (codonOri !== codonMut) {
      cambios++;
      const aaOri = traducirCodon(codonOri);
      const aaMut = traducirCodon(codonMut);
      if (aaMut === 'STOP' && aaOri !== 'STOP') stopPrematuro = true;
      if (aaOri !== aaMut) mismoAminoacido = false;
    }
  }

  if (cambios === 0) return { tipo: null, descripcion: 'No hay cambios.' };
  if (stopPrematuro) return { tipo: 'nonsense', descripcion: 'Sin sentido (nonsense): aparece un STOP prematuro y la proteína queda truncada.' };
  if (mismoAminoacido) return { tipo: 'silenciosa', descripcion: 'Silenciosa: el aminoácido no cambia, gracias a la degeneración del código.' };
  return { tipo: 'missense', descripcion: 'Cambio de sentido (missense): un aminoácido se sustituye por otro.' };
}

export function MutationSimulator() {
  const { vozOn, vozURI, velocidadVoz, volumenMusica, reducirAnimaciones } = useGameStore();
  const [original] = useState(secuenciaEjemplo);
  const [mutada, setMutada] = useState(secuenciaEjemplo);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [prediccion, setPrediccion] = useState<TipoMutacion>(null);
  const [mostrarPrediccion, setMostrarPrediccion] = useState(false);

  const resultado = clasificarMutacion(original, mutada);
  const proteinOriginal = traducirARNm(original);
  const proteinMutada = traducirARNm(mutada);

  const decir = (texto: string) => {
    if (!vozOn) return;
    audioManager.bajarMusicaParaVoz();
    hablar(texto, { vozURI: vozURI || undefined, velocidad: velocidadVoz, onEnd: () => audioManager.restaurarMusica(volumenMusica) });
  };

  const analizar = () => {
    audioManager.tocarEfecto('clic');
    setMostrarResultado(true);
    decir(resultado.descripcion);
  };

  const verificarPrediccion = () => {
    audioManager.tocarEfecto('clic');
    setMostrarPrediccion(true);
    const correcto = prediccion === resultado.tipo;
    if (correcto) {
      audioManager.tocarEfecto('acierto');
      decir('¡Correcto! Ese es el tipo de mutación.');
    } else {
      audioManager.tocarEfecto('error');
      decir(`No es correcto. Es una mutación ${resultado.tipo}.`);
    }
  };

  const reiniciar = () => {
    setMutada(original);
    setMostrarResultado(false);
    setPrediccion(null);
    setMostrarPrediccion(false);
  };

  const codonesOriginales = original.split(' ');
  const codonesMutados = mutada.trim().split(/\s+/);

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 mb-2">Simulador de mutaciones</h2>
      <p className="text-sm text-slate-500 mb-4">Cambia bases del ARNm y observa qué tipo de mutación se produce.</p>

      {/* Secuencia original */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 mb-4">
        <p className="text-sm font-semibold text-slate-500 mb-2">ARNm original:</p>
        <div className="flex flex-wrap gap-2">
          {codonesOriginales.map((c, i) => (
            <span key={i} className="font-mono text-sm bg-slate-100 dark:bg-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-200">{c}</span>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-2">Proteína: {proteinOriginal.join(' – ')}</p>
      </div>

      {/* Editor */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 mb-4">
        <p className="text-sm font-semibold text-slate-500 mb-2">ARNm mutado (edita las bases):</p>
        <textarea
          value={mutada}
          onChange={e => { setMutada(e.target.value.toUpperCase()); setMostrarResultado(false); setMostrarPrediccion(false); }}
          className="w-full p-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-mono text-slate-700 dark:text-slate-200 focus:border-primary-500 outline-none min-h-[60px]"
          rows={2}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          <Button variant="primary" size="sm" onClick={analizar}>Analizar mutación</Button>
          <Button variant="ghost" size="sm" onClick={reiniciar}><span className="flex items-center gap-1"><RotateCcw size={14} /> Reiniciar</span></Button>
        </div>
      </div>

      {/* Reto Detective */}
      <div className="bg-accent-50 dark:bg-accent-900/20 rounded-2xl p-4 mb-4">
        <p className="text-sm font-bold text-accent-700 dark:text-accent-300 mb-2"><Sparkles size={16} className="inline mr-1" />Reto "Detective de Mutaciones"</p>
        <p className="text-xs text-slate-500 mb-2">Antes de analizar, predice el tipo de mutación:</p>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {(['silenciosa', 'missense', 'nonsense', 'frameshift'] as TipoMutacion[]).map(t => (
            <button
              key={t}
              onClick={() => setPrediccion(t)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                prediccion === t ? 'bg-accent-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {prediccion && !mostrarPrediccion && (
          <Button variant="accent" size="sm" onClick={verificarPrediccion}>Verificar predicción</Button>
        )}
        {mostrarPrediccion && (
          <p className={`text-sm font-semibold ${prediccion === resultado.tipo ? 'text-success-600' : 'text-error-600'}`}>
            {prediccion === resultado.tipo ? '¡Correcto! ' : 'Incorrecto. '}
            Es una mutación: <strong>{resultado.tipo}</strong>
          </p>
        )}
      </div>

      {/* Resultado */}
      {mostrarResultado && (
        <motion.div
          initial={reducirAnimaciones ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 mb-4"
        >
          <div className="flex gap-3 mb-3">
            <AvatarCompanion expresion="neutral" size={60} reducirAnimaciones={reducirAnimaciones} />
            <div>
              <p className="font-bold text-sm text-primary-700 dark:text-primary-300">Tipo de mutación: {resultado.tipo ?? 'Sin cambios'}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{resultado.descripcion}</p>
            </div>
          </div>

          {/* Comparación de proteínas */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
              <p className="text-xs font-bold text-slate-400 mb-1">Proteína original:</p>
              <div className="flex flex-wrap gap-1">
                {proteinOriginal.map((aa, i) => (
                  <span key={i} className="text-xs bg-slate-200 dark:bg-slate-600 rounded px-1.5 py-0.5 font-mono text-slate-700 dark:text-slate-200">{aa}</span>
                ))}
              </div>
            </div>
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-3">
              <p className="text-xs font-bold text-primary-400 mb-1">Proteína mutada:</p>
              <div className="flex flex-wrap gap-1">
                {proteinMutada.map((aa, i) => {
                  const cambiado = aa !== proteinOriginal[i];
                  return (
                    <span key={i} className={`text-xs rounded px-1.5 py-0.5 font-mono ${cambiado ? 'bg-error-200 dark:bg-error-800/50 text-error-700' : 'bg-primary-100 dark:bg-primary-800/30 text-primary-700 dark:text-primary-300'}`}>{aa}</span>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
