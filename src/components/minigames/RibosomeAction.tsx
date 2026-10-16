import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { traducirCodon, anticodonDe, codonesStop } from '../../data/codigoGenetico';
import { Button } from '../ui/Button';
import { AvatarCompanion } from '../avatar/AvatarCompanion';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/audioManager';
import { hablar } from '../../audio/vozManager';

function generarARNm(): string {
  const bases = ['A', 'U', 'C', 'G'];
  const codones: string[] = ['AUG'];
  const numCodones = 4 + Math.floor(Math.random() * 4);
  for (let i = 0; i < numCodones; i++) {
    codones.push(Array.from({ length: 3 }, () => bases[Math.floor(Math.random() * 4)]).join(''));
  }
  codones.push(codonesStop[Math.floor(Math.random() * 3)]);
  return codones.join('');
}

export function RibosomeAction() {
  const { vozOn, vozURI, velocidadVoz, volumenMusica, reducirAnimaciones } = useGameStore();
  const [arnm] = useState(generarARNm);
  const [posicion, setPosicion] = useState(0);
  const [cadena, setCadena] = useState<string[]>([]);
  const [sitioA, setSitioA] = useState<string | null>(null);
  const [sitioP, setSitioP] = useState<string | null>(null);
  const [sitioE, setSitioE] = useState<string | null>(null);
  const [completado, setCompletado] = useState(false);
  const [paso, setPaso] = useState<'esperando' | 'unido' | 'translocado'>('esperando');

  const codones = arnm.match(/.{3}/g) ?? [];
  const codonActual = codones[posicion];
  const aaActual = codonActual ? traducirCodon(codonActual) : '';
  const anticodonActual = codonActual ? anticodonDe(codonActual) : '';
  const esStop = codonActual ? codonesStop.includes(codonActual) : false;

  const decir = (texto: string) => {
    if (!vozOn) return;
    audioManager.bajarMusicaParaVoz();
    hablar(texto, { vozURI: vozURI || undefined, velocidad: velocidadVoz, onEnd: () => audioManager.restaurarMusica(volumenMusica) });
  };

  const entrarARNt = () => {
    if (esStop || paso !== 'esperando') return;
    audioManager.tocarEfecto('clic');
    setSitioA(aaActual);
    setPaso('unido');
    decir(`ARNt con anticodón ${anticodonActual} entra al sitio A.`);
  };

  const formarEnlace = () => {
    if (paso !== 'unido') return;
    audioManager.tocarEfecto('acierto');
    if (sitioP) {
      setCadena([...cadena, sitioP]);
    }
    setSitioP(sitioA);
    setSitioA(null);
    setSitioE(sitioP);
    setPaso('translocado');
    decir('Enlace peptídico formado. El ribosoma se transloca.');
  };

  const translocar = () => {
    if (paso !== 'translocado') return;
    audioManager.tocarEfecto('clic');
    setSitioE(null);
    setPosicion(p => p + 1);
    setPaso('esperando');
  };

  const terminar = () => {
    audioManager.tocarEfecto('nivel');
    if (sitioP) setCadena([...cadena, sitioP]);
    setCompletado(true);
    decir('¡Traducción terminada! La proteína se libera.');
  };

  const reiniciar = () => {
    audioManager.tocarEfecto('clic');
    window.location.reload();
  };

  if (completado) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center pt-12">
        <AvatarCompanion expresion="celebrar" size={120} reducirAnimaciones={reducirAnimaciones} />
        <h2 className="text-xl font-display font-bold text-success-600 mt-4">¡Proteína completada!</h2>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 mt-4">
          <p className="text-sm text-slate-500 mb-2">Cadena peptídica:</p>
          <div className="flex flex-wrap justify-center gap-1">
            {cadena.map((aa, i) => (
              <span key={i} className="bg-primary-100 dark:bg-primary-900/30 rounded-lg px-2 py-1 text-sm font-mono text-primary-700 dark:text-primary-300">
                {aa}
              </span>
            ))}
          </div>
        </div>
        <Button variant="primary" size="lg" className="mt-4" onClick={reiniciar}>
          <span className="flex items-center gap-2"><RotateCcw size={18} /> Jugar de nuevo</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 mb-4">Ribosoma en acción</h2>

      {/* ARNm */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 mb-4 overflow-x-auto">
        <div className="flex gap-1 justify-center min-w-fit">
          {codones.map((c, i) => (
            <span
              key={i}
              className={`font-mono text-xs px-2 py-1 rounded ${
                i === posicion
                  ? 'bg-warning-400 text-white font-bold scale-110'
                  : i < posicion
                    ? 'bg-success-100 dark:bg-success-800/30 text-success-600'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
              } transition-all`}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Ribosoma */}
      <div className="bg-gradient-to-b from-primary-100 to-accent-50 dark:from-slate-700 dark:to-slate-800 rounded-3xl p-6 shadow-lg">
        <div className="flex justify-around items-end mb-4">
          {/* Sitio E */}
          <SitioRibosoma label="E" sublabel="Salida" contenido={sitioE} color="#94a3b8" />
          {/* Sitio P */}
          <SitioRibosoma label="P" sublabel="Peptidil" contenido={sitioP} color="#4f46e5" />
          {/* Sitio A */}
          <SitioRibosoma label="A" sublabel="Aminoacil" contenido={sitioA} color="#06b6d4" />
        </div>

        {/* Codón actual */}
        <div className="text-center mb-4">
          <p className="text-xs text-slate-400">Codón en el sitio A:</p>
          <p className={`font-mono text-2xl font-bold ${esStop ? 'text-error-500' : 'text-primary-600'}`}>{codonActual}</p>
          {esStop ? (
            <p className="text-sm text-error-500 font-bold mt-1">¡STOP! No hay ARNt para este codón.</p>
          ) : (
            <p className="text-xs text-slate-500 mt-1">→ {aaActual} (anticodón: {anticodonActual})</p>
          )}
        </div>

        {/* Acciones */}
        <div className="flex flex-col gap-2 items-center">
          {esStop ? (
            <Button variant="error" size="lg" onClick={terminar}>Terminar traducción</Button>
          ) : paso === 'esperando' ? (
            <Button variant="primary" size="lg" onClick={entrarARNt}>
              <span className="flex items-center gap-2">Entrar aa-ARNt al sitio A <ArrowRight size={18} /></span>
            </Button>
          ) : paso === 'unido' ? (
            <Button variant="success" size="lg" onClick={formarEnlace}>Formar enlace peptídico</Button>
          ) : (
            <Button variant="accent" size="lg" onClick={translocar}>Translocar ribosoma</Button>
          )}
        </div>
      </div>

      {/* Cadena peptídica */}
      {cadena.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 mt-4">
          <p className="text-xs text-slate-400 mb-1">Cadena en formación:</p>
          <div className="flex flex-wrap gap-1">
            {cadena.map((aa, i) => (
              <span key={i} className="bg-primary-100 dark:bg-primary-900/30 rounded px-2 py-0.5 text-xs font-mono text-primary-700 dark:text-primary-300">
                {aa}
              </span>
            ))}
            {sitioP && <span className="bg-warning-100 dark:bg-warning-900/30 rounded px-2 py-0.5 text-xs font-mono text-warning-700">{sitioP}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function SitioRibosoma({ label, sublabel, contenido, color }: { label: string; sublabel: string; contenido: string | null; color: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold transition-all ${contenido ? 'scale-105' : 'opacity-50'}`}
        style={{ borderColor: color, backgroundColor: contenido ? `${color}22` : 'transparent', color }}
      >
        {contenido ?? label}
      </div>
      <p className="text-xs font-bold mt-1" style={{ color }}>{label}</p>
      <p className="text-[10px] text-slate-400">{sublabel}</p>
    </div>
  );
}
