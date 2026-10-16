import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Check, X, Heart, Lightbulb, SkipForward, Timer, ChevronDown, ChevronUp } from 'lucide-react';
import { Pregunta, getPreguntasPorNivelMixtas } from '../../data/preguntas';
import { useGameStore } from '../../store/gameStore';
import { AvatarCompanion } from '../avatar/AvatarCompanion';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { audioManager } from '../../audio/audioManager';
import { hablar, cancelarVoz } from '../../audio/vozManager';

interface QuizProps {
  nivel: number;
  onCompletar: (aciertos: number, total: number) => void;
  preguntasFalladasIds?: string[];
}

const frasesCelebro = [
  '¡Excelente!', '¡Eres un genio celular!', '¡Eso es, doctor/a!', '¡Muy bien!',
  '¡Correcto!', '¡Sigue así!', '¡Crack de la biología!',
];

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function Quiz({ nivel, onCompletar, preguntasFalladasIds }: QuizProps) {
  const {
    vozOn, velocidadVoz, vozURI, reducirAnimaciones, temporizador,
    volumenMusica, sumarAciertos, romperRacha, marcarPreguntaFallada,
    rachaActual,
  } = useGameStore();

  let preguntasIniciales: Pregunta[];
  if (preguntasFalladasIds && preguntasFalladasIds.length > 0) {
    const all = getPreguntasPorNivelMixtas(nivel, 99);
    preguntasIniciales = all.filter(p => preguntasFalladasIds.includes(p.id));
  } else {
    preguntasIniciales = getPreguntasPorNivelMixtas(nivel, 10);
  }

  const [preguntas] = useState<Pregunta[]>(preguntasIniciales);
  const [indiceActual, setIndiceActual] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [respondido, setRespondido] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | string | null>(null);
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [vidas, setVidas] = useState(3);
  const [pista5050, setPista5050] = useState(false);
  const [opcionesDescartadas, setOpcionesDescartadas] = useState<number[]>([]);
  const [tiempoRestante, setTiempoRestante] = useState(30);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [rachaLocal, setRachaLocal] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const pregunta = preguntas[indiceActual];
  const total = preguntas.length;

  const lanzarConfetti = useCallback(() => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#4f46e5', '#06b6d4', '#22c55e', '#f59e0b'] });
  }, []);

  const lanzarFuegos = useCallback(() => {
    confetti({ particleCount: 120, spread: 100, startVelocity: 45, origin: { x: 0.5, y: 0.5 }, colors: ['#4f46e5', '#06b6d4', '#22c55e', '#f59e0b', '#ec4899'] });
  }, []);

  const responder = useCallback((respuesta: number | string) => {
    if (respondido) return;
    setRespondido(true);
    setRespuestaSeleccionada(respuesta);

    let correcto = false;
    if (pregunta.tipo === 'opcion') {
      correcto = respuesta === pregunta.correcta;
    } else if (pregunta.tipo === 'vf') {
      correcto = respuesta === pregunta.correcta;
    } else if (pregunta.tipo === 'completar') {
      correcto = String(respuesta).trim().toLowerCase() === String(pregunta.correcta).trim().toLowerCase();
    }

    setEsCorrecto(correcto);
    setMostrarExplicacion(true);

    if (correcto) {
      const nuevosAciertos = aciertos + 1;
      setAciertos(nuevosAciertos);
      const nuevaRacha = rachaLocal + 1;
      setRachaLocal(nuevaRacha);
      sumarAciertos(1);
      audioManager.tocarEfecto('acierto');
      if (!reducirAnimaciones) lanzarConfetti();

      if (nuevaRacha === 3 || nuevaRacha === 5 || nuevaRacha === 10) {
        audioManager.tocarEfecto('racha');
        if (!reducirAnimaciones) lanzarFuegos();
      }

      if (vozOn) {
        const frase = frasesCelebro[Math.floor(Math.random() * frasesCelebro.length)];
        audioManager.bajarMusicaParaVoz();
        hablar(frase, { vozURI: vozURI || undefined, velocidad: velocidadVoz, onEnd: () => audioManager.restaurarMusica(volumenMusica) });
      }
    } else {
      setRachaLocal(0);
      romperRacha();
      setVidas(v => v - 1);
      marcarPreguntaFallada(pregunta.id);
      audioManager.tocarEfecto('error');

      if (vozOn) {
        const textoCompleto = `¡Casi! La respuesta era: ${pregunta.explicacion}`;
        audioManager.bajarMusicaParaVoz();
        hablar(textoCompleto, { vozURI: vozURI || undefined, velocidad: velocidadVoz, onEnd: () => audioManager.restaurarMusica(volumenMusica) });
      }
    }
  }, [respondido, pregunta, aciertos, rachaLocal, vozOn, vozURI, velocidadVoz, volumenMusica, sumarAciertos, romperRacha, marcarPreguntaFallada, reducirAnimaciones, lanzarConfetti, lanzarFuegos]);

  // Timer
  useEffect(() => {
    if (!temporizador || respondido || terminado) return;
    if (tiempoRestante <= 0) {
      responder(-1);
      return;
    }
    const timer = setTimeout(() => setTiempoRestante(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [tiempoRestante, temporizador, respondido, terminado, responder]);

  // Reset al cambiar de pregunta
  useEffect(() => {
    setRespondido(false);
    setRespuestaSeleccionada(null);
    setEsCorrecto(false);
    setPista5050(false);
    setOpcionesDescartadas([]);
    setTiempoRestante(30);
    setMostrarExplicacion(false);
  }, [indiceActual]);

  const siguiente = () => {
    cancelarVoz();
    audioManager.restaurarMusica(volumenMusica);
    if (vidas <= 1 && !esCorrecto) {
      setTerminado(true);
      onCompletar(aciertos, indiceActual + 1);
      return;
    }
    if (indiceActual + 1 >= total) {
      setTerminado(true);
      onCompletar(aciertos, total);
      return;
    }
    setIndiceActual(i => i + 1);
  };

  const usarPista5050 = () => {
    if (pista5050 || respondido || pregunta.tipo !== 'opcion' || !pregunta.opciones) return;
    setPista5050(true);
    audioManager.tocarEfecto('clic');
    const correcta = pregunta.correcta as number;
    const incorrectas = pregunta.opciones.map((_, i) => i).filter(i => i !== correcta);
    const descartar = shuffleArray(incorrectas).slice(0, 2);
    setOpcionesDescartadas(descartar);
  };

  const saltar = () => {
    if (respondido) return;
    audioManager.tocarEfecto('clic');
    setRespondido(true);
    setEsCorrecto(false);
    setMostrarExplicacion(true);
    setRespuestaSeleccionada(-2);
    marcarPreguntaFallada(pregunta.id);
  };

  if (terminado || !pregunta) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col p-4 max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }, (_, i) => (
            <Heart key={i} size={22} className={i < vidas ? 'fill-error-500 text-error-500' : 'text-slate-300 dark:text-slate-600'} />
          ))}
        </div>
        <div className="flex items-center gap-3">
          {temporizador && (
            <div className={`flex items-center gap-1 text-sm font-bold ${tiempoRestante <= 10 ? 'text-error-500' : 'text-slate-500'}`}>
              <Timer size={16} /> {tiempoRestante}s
            </div>
          )}
          <span className="text-sm font-semibold text-slate-500">
            {indiceActual + 1}/{total}
          </span>
        </div>
      </div>

      <ProgressBar value={indiceActual + (respondido ? 1 : 0)} max={total} />

      {/* Racha */}
      {rachaLocal >= 2 && (
        <div className="text-center mt-2">
          <span className="text-sm font-bold text-warning-500">🔥 Racha: {rachaLocal}</span>
        </div>
      )}

      {/* Pregunta */}
      <motion.div
        key={pregunta.id}
        initial={reducirAnimaciones ? {} : { opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-5 md:p-6 mt-4 flex-1"
      >
        <p className="text-lg md:text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
          {pregunta.enunciado}
        </p>

        {/* Opción múltiple */}
        {pregunta.tipo === 'opcion' && pregunta.opciones && (
          <div className="grid gap-2">
            {pregunta.opciones.map((op, i) => {
              const descartada = opcionesDescartadas.includes(i);
              const esRespuestaSeleccionada = respuestaSeleccionada === i;
              const esCorrecta = pregunta.correcta === i;
              return (
                <button
                  key={i}
                  disabled={respondido || descartada}
                  onClick={() => responder(i)}
                  className={`text-left p-3 rounded-xl border-2 font-medium transition-all ${
                    !respondido && !descartada
                      ? 'border-slate-200 dark:border-slate-600 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-700 dark:text-slate-200'
                      : esCorrecta
                        ? 'border-success-500 bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-300'
                        : esRespuestaSeleccionada
                          ? 'border-error-500 bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-300'
                          : 'border-slate-200 dark:border-slate-600 opacity-50 text-slate-500'
                  } ${descartada ? 'line-through opacity-30' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    {respondido && esCorrecta && <Check size={18} className="text-success-500" />}
                    {respondido && esRespuestaSeleccionada && !esCorrecta && <X size={18} className="text-error-500" />}
                    {op}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Verdadero/Falso */}
        {pregunta.tipo === 'vf' && (
          <div className="grid grid-cols-2 gap-3">
            {['Verdadero', 'Falso'].map(op => {
              const esRespuesta = respuestaSeleccionada === op;
              const esCorrecta = pregunta.correcta === op;
              return (
                <button
                  key={op}
                  disabled={respondido}
                  onClick={() => responder(op)}
                  className={`p-4 rounded-2xl border-2 font-bold text-lg transition-all ${
                    !respondido
                      ? op === 'Verdadero'
                        ? 'border-success-300 hover:border-success-500 hover:bg-success-50 text-success-700 dark:text-success-300'
                        : 'border-error-300 hover:border-error-500 hover:bg-error-50 text-error-700 dark:text-error-300'
                      : esCorrecta
                        ? 'border-success-500 bg-success-50 text-success-700'
                        : esRespuesta
                          ? 'border-error-500 bg-error-50 text-error-700'
                          : 'border-slate-200 opacity-50'
                  }`}
                >
                  {respondido && esCorrecta && <Check size={18} className="inline mr-1" />}
                  {respondido && esRespuesta && !esCorrecta && <X size={18} className="inline mr-1" />}
                  {op}
                </button>
              );
            })}
          </div>
        )}

        {/* Completar */}
        {pregunta.tipo === 'completar' && (
          <CompletarInput
            respondido={respondido}
            respuestaCorrecta={String(pregunta.correcta)}
            onResponder={responder}
            respuestaSeleccionada={String(respuestaSeleccionada ?? '')}
          />
        )}

        {/* Relacionar */}
        {pregunta.tipo === 'relacionar' && pregunta.relaciones && (
          <RelacionarPregunta
            relaciones={pregunta.relaciones}
            respondido={respondido}
            onResponder={(correcto) => responder(correcto ? 1 : 0)}
            reducirAnimaciones={reducirAnimaciones}
          />
        )}

        {/* Ordenar */}
        {pregunta.tipo === 'ordenar' && pregunta.ordenCorrecto && (
          <OrdenarPregunta
            ordenCorrecto={pregunta.ordenCorrecto}
            respondido={respondido}
            onResponder={(correcto) => responder(correcto ? 1 : 0)}
            reducirAnimaciones={reducirAnimaciones}
          />
        )}

        {/* Abierta */}
        {pregunta.tipo === 'abierta' && (
          <AbiertaPregunta
            respuestaModelo={pregunta.respuestaModelo ?? pregunta.explicacion}
            respondido={respondido}
            onRevelar={() => { setRespondido(true); setMostrarExplicacion(true); setEsCorrecto(true); setAciertos(a => a + 1); sumarAciertos(1); audioManager.tocarEfecto('acierto'); }}
          />
        )}

        {/* Comodines */}
        {!respondido && pregunta.tipo === 'opcion' && (
          <div className="flex gap-2 mt-4">
            {!pista5050 && (
              <button onClick={usarPista5050} className="flex items-center gap-1 text-xs bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 rounded-lg px-3 py-1.5 hover:bg-warning-200 transition-colors">
                <Lightbulb size={14} /> 50/50
              </button>
            )}
            <button onClick={saltar} className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg px-3 py-1.5 hover:bg-slate-200 transition-colors">
              <SkipForward size={14} /> Saltar
            </button>
          </div>
        )}

        {/* Explicación del avatar */}
        <AnimatePresence>
          {mostrarExplicacion && (
            <motion.div
              initial={reducirAnimaciones ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex gap-3 items-start bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-4"
            >
              <div className="flex-shrink-0">
                <AvatarCompanion
                  hablando={vozOn}
                  expresion={esCorrecto ? 'feliz' : 'neutral'}
                  size={70}
                  reducirAnimaciones={reducirAnimaciones}
                />
              </div>
              <div className="flex-1">
                {esCorrecto ? (
                  <p className="text-sm font-semibold text-success-700 dark:text-success-300">
                    {frasesCelebro[Math.floor(Math.random() * frasesCelebro.length)]}
                  </p>
                ) : respuestaSeleccionada === -2 ? (
                  <p className="text-sm font-semibold text-warning-600">Saltaste esta pregunta.</p>
                ) : (
                  <p className="text-sm font-semibold text-primary-700 dark:text-primary-300">¡Casi!</p>
                )}
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{pregunta.explicacion}</p>
                {pregunta.tipo === 'abierta' && pregunta.respuestaModelo && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 italic">{pregunta.respuestaModelo}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón siguiente */}
        {respondido && (
          <div className="mt-4 flex justify-end">
            <Button variant="primary" size="md" onClick={siguiente}>
              {indiceActual + 1 >= total ? 'Ver resultados' : 'Siguiente'}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// --- Sub-componentes ---

function CompletarInput({ respondido, respuestaCorrecta, onResponder, respuestaSeleccionada }: {
  respondido: boolean;
  respuestaCorrecta: string;
  onResponder: (v: string) => void;
  respuestaSeleccionada: string;
}) {
  const [valor, setValor] = useState('');
  return (
    <div>
      <input
        type="text"
        value={valor}
        disabled={respondido}
        onChange={e => setValor(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && !respondido && valor.trim()) onResponder(valor); }}
        placeholder="Escribe tu respuesta..."
        className={`w-full p-3 rounded-xl border-2 font-medium text-lg transition-all ${
          respondido
            ? valor.trim().toLowerCase() === respuestaCorrecta.trim().toLowerCase()
              ? 'border-success-500 bg-success-50 text-success-700'
              : 'border-error-500 bg-error-50 text-error-700'
            : 'border-slate-200 dark:border-slate-600 focus:border-primary-500 text-slate-700 dark:text-slate-200 dark:bg-slate-700'
        }`}
      />
      {respondido && (
        <p className="text-sm mt-2 text-slate-500">Respuesta correcta: <strong>{respuestaCorrecta}</strong></p>
      )}
      {!respondido && (
        <Button variant="primary" size="sm" className="mt-2" onClick={() => { if (valor.trim()) onResponder(valor); }}>
          Responder
        </Button>
      )}
    </div>
  );
}

function RelacionarPregunta({ relaciones, respondido, onResponder, reducirAnimaciones }: {
  relaciones: { izquierda: string; derecha: string }[];
  respondido: boolean;
  onResponder: (correcto: boolean) => void;
  reducirAnimaciones: boolean;
}) {
  const [parejas, setParejas] = useState<Record<string, string>>({});
  const [seleccionIzq, setSeleccionIzq] = useState<string | null>(null);

  const derechosShuffled = shuffleArray(relaciones.map(r => r.derecha));

  const emparejar = (derecha: string) => {
    if (!seleccionIzq || respondido) return;
    setParejas(p => ({ ...p, [seleccionIzq]: derecha }));
    setSeleccionIzq(null);
  };

  const verificar = () => {
    const correcto = relaciones.every(r => parejas[r.izquierda] === r.derecha);
    onResponder(correcto);
  };

  const todasParejadas = relaciones.every(r => parejas[r.izquierda]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {relaciones.map(r => (
            <button
              key={r.izquierda}
              disabled={respondido}
              onClick={() => setSeleccionIzq(r.izquierda)}
              className={`w-full text-left p-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                seleccionIzq === r.izquierda
                  ? 'border-primary-500 bg-primary-50'
                  : parejas[r.izquierda]
                    ? respondido
                      ? relaciones.find(rr => rr.izquierda === r.izquierda)?.derecha === parejas[r.izquierda]
                        ? 'border-success-500 bg-success-50'
                        : 'border-error-500 bg-error-50'
                      : 'border-accent-400 bg-accent-50'
                    : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
              } text-slate-700 dark:text-slate-200`}
            >
              {r.izquierda}
              {parejas[r.izquierda] && <span className="block text-xs text-slate-400 mt-1">→ {parejas[r.izquierda]}</span>}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {derechosShuffled.map(d => {
            const usada = Object.values(parejas).includes(d);
            return (
              <button
                key={d}
                disabled={respondido || usada}
                onClick={() => emparejar(d)}
                className={`w-full text-left p-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                  usada
                    ? 'border-slate-200 opacity-30'
                    : 'border-slate-200 dark:border-slate-600 hover:border-accent-400 text-slate-700 dark:text-slate-200'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
      {!respondido && todasParejadas && (
        <Button variant="primary" size="sm" className="mt-3" onClick={verificar}>Verificar</Button>
      )}
    </div>
  );
}

function OrdenarPregunta({ ordenCorrecto, respondido, onResponder, reducirAnimaciones }: {
  ordenCorrecto: string[];
  respondido: boolean;
  onResponder: (correcto: boolean) => void;
  reducirAnimaciones: boolean;
}) {
  const [items, setItems] = useState(() => shuffleArray(ordenCorrecto));
  const [arrastrando, setArrastrando] = useState<number | null>(null);

  const mover = (desde: number, hacia: number) => {
    if (respondido) return;
    const nuevos = [...items];
    const [item] = nuevos.splice(desde, 1);
    nuevos.splice(hacia, 0, item);
    setItems(nuevos);
  };

  const verificar = () => {
    const correcto = items.every((item, i) => item === ordenCorrecto[i]);
    onResponder(correcto);
  };

  return (
    <div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            draggable={!respondido}
            onDragStart={() => setArrastrando(i)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => { if (arrastrando !== null) mover(arrastrando, i); setArrastrando(null); }}
            className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium cursor-move transition-all ${
              respondido
                ? item === ordenCorrecto[i]
                  ? 'border-success-500 bg-success-50 text-success-700'
                  : 'border-error-500 bg-error-50 text-error-700'
                : 'border-slate-200 dark:border-slate-600 hover:border-primary-400 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold">{i + 1}</span>
            {item}
          </div>
        ))}
      </div>
      {!respondido && (
        <Button variant="primary" size="sm" className="mt-3" onClick={verificar}>Verificar orden</Button>
      )}
      {respondido && (
        <div className="mt-3 space-y-1">
          <p className="text-xs font-semibold text-slate-500">Orden correcto:</p>
          {ordenCorrecto.map((item, i) => (
            <p key={i} className="text-xs text-success-600">{i + 1}. {item}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function AbiertaPregunta({ respuestaModelo, respondido, onRevelar }: {
  respuestaModelo: string;
  respondido: boolean;
  onRevelar: () => void;
}) {
  const [mostrar, setMostrar] = useState(false);
  return (
    <div>
      <p className="text-sm text-slate-500 mb-2">Piensa tu respuesta y luego revélala:</p>
      {!respondido && (
        <Button variant="accent" size="md" onClick={() => { setMostrar(true); onRevelar(); }}>
          Ver respuesta modelo
        </Button>
      )}
      {respondido && (
        <div className="bg-accent-50 dark:bg-accent-900/20 rounded-xl p-4 mt-2">
          <p className="text-sm text-slate-700 dark:text-slate-200"><strong>Respuesta modelo:</strong> {respuestaModelo}</p>
        </div>
      )}
    </div>
  );
}
