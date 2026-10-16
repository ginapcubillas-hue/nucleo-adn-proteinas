import { useState } from 'react';
import codigoGenetico, { basesSegunda, basesTercera, codonesStop, getTipoAminoacido, coloresTipo, etiquetasTipo, traducirCodon } from '../../data/codigoGenetico';
import { useGameStore } from '../../store/gameStore';
import { hablar } from '../../audio/vozManager';
import { audioManager } from '../../audio/audioManager';

export function GeneticCodeTable() {
  const { vozOn, vozURI, velocidadVoz, volumenMusica } = useGameStore();
  const [mostrarTipo, setMostrarTipo] = useState(false);
  const [codonSeleccionado, setCodonSeleccionado] = useState<string | null>(null);

  const basesPrimera = ['U', 'C', 'A', 'G'];

  const handleClick = (codon: string) => {
    audioManager.tocarEfecto('clic');
    setCodonSeleccionado(codon);
    if (vozOn) {
      const aa = traducirCodon(codon);
      const texto = aa === 'STOP'
        ? `${codon} es un codón de parada.`
        : `${codon} codifica el aminoácido ${aa}.`;
      audioManager.bajarMusicaParaVoz();
      hablar(texto, { vozURI: vozURI || undefined, velocidad: velocidadVoz, onEnd: () => audioManager.restaurarMusica(volumenMusica) });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-3 md:p-5 overflow-x-auto">
      <h3 className="font-display font-bold text-primary-700 dark:text-primary-300 mb-2">Tabla del Código Genético</h3>

      <button
        onClick={() => { audioManager.tocarEfecto('clic'); setMostrarTipo(!mostrarTipo); }}
        className="text-xs font-semibold bg-slate-100 dark:bg-slate-700 rounded-full px-3 py-1 mb-3 text-slate-600 dark:text-slate-300"
      >
        {mostrarTipo ? 'Ocultar agrupación química' : 'Mostrar agrupación química'}
      </button>

      <table className="w-full border-collapse text-xs md:text-sm">
        <thead>
          <tr>
            <th className="bg-primary-800 text-white p-2 rounded-tl-lg">
              <span className="text-[10px] block opacity-70">1.ª \ 2.ª</span>
            </th>
            {basesSegunda.map(b => (
              <th key={b} className="bg-primary-800 text-white p-2 font-bold">{b}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {basesPrimera.map((b1, rowIdx) => (
            <tr key={b1}>
              <td className={`bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-bold p-2 text-center ${rowIdx === 3 ? 'rounded-bl-lg' : ''}`}>
                {b1}
              </td>
              {basesSegunda.map(b2 => (
                <td key={b2} className="border border-slate-200 dark:border-slate-600 p-1">
                  <div className="flex flex-col gap-0.5">
                    {basesTercera.map(b3 => {
                      const codon = b1 + b2 + b3;
                      const aa = codigoGenetico[codon];
                      const isStop = codonesStop.includes(codon);
                      const isInicio = codon === 'AUG';
                      const tipo = getTipoAminoacido(aa);
                      const bgColor = mostrarTipo ? coloresTipo[tipo] : isStop || isInicio ? '#dc2626' : '';
                      const textColor = mostrarTipo ? 'white' : isStop || isInicio ? '#dc2626' : '';
                      return (
                        <button
                          key={b3}
                          onClick={() => handleClick(codon)}
                          className={`rounded px-1 py-0.5 text-left transition-all ${codonSeleccionado === codon ? 'ring-2 ring-accent-400' : ''} ${!mostrarTipo && !isStop && !isInicio ? 'hover:bg-primary-50 dark:hover:bg-primary-900/20' : ''}`}
                          style={mostrarTipo || isStop || isInicio ? { backgroundColor: bgColor, color: textColor } : {}}
                          title={`${codon} → ${aa}`}
                        >
                          <span className="font-mono font-bold text-[11px]">{codon}</span>
                          <span className="ml-1 text-[10px]">
                            {isInicio ? 'Met (inicio)' : aa}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Leyenda */}
      {mostrarTipo && (
        <div className="flex flex-wrap gap-2 mt-3">
          {Object.entries(coloresTipo).map(([tipo, color]) => (
            <div key={tipo} className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
              <span className="text-slate-600 dark:text-slate-300">{etiquetasTipo[tipo as keyof typeof etiquetasTipo]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
