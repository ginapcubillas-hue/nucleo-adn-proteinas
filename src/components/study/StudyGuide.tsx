import { useState } from 'react';
import { BookOpen, Search, FlaskConical, Layers, GitBranch } from 'lucide-react';
import { contenido, getContenido } from '../../data/contenido';
import { getNivel } from '../../data/niveles';
import { Glossary } from './Glossary';
import { GeneticCodeTable } from './GeneticCodeTable';
import { RanCycleAnimation } from './RanCycleAnimation';
import { PackagingLadder } from './PackagingLadder';
import { comparativaProcEuc } from '../../data/contenido';

type Tab = 'temas' | 'codigo' | 'ran' | 'empaquetamiento' | 'comparativa' | 'glosario';

export function StudyGuide() {
  const [tab, setTab] = useState<Tab>('temas');
  const [nivelExpandido, setNivelExpandido] = useState<number | null>(null);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'temas', label: 'Temas', icon: <BookOpen size={16} /> },
    { id: 'codigo', label: 'Código genético', icon: <FlaskConical size={16} /> },
    { id: 'ran', label: 'Ciclo de Ran', icon: <GitBranch size={16} /> },
    { id: 'empaquetamiento', label: 'Empaquetamiento', icon: <Layers size={16} /> },
    { id: 'comparativa', label: 'Proc. vs Euc.', icon: <BookOpen size={16} /> },
    { id: 'glosario', label: 'Glosario', icon: <Search size={16} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20">
      <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300 mb-4">Guía de estudio</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              tab === t.id ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary-100'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      {tab === 'temas' && (
        <div className="space-y-2">
          {contenido.map(sec => {
            const nivelMeta = getNivel(sec.nivel);
            const expandido = nivelExpandido === sec.nivel;
            return (
              <div key={sec.nivel} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setNivelExpandido(expandido ? null : sec.nivel)}
                  className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">
                    {nivelMeta?.icono} {sec.titulo}
                  </span>
                  <span className="text-slate-400 text-xs">{expandido ? '▲' : '▼'}</span>
                </button>
                {expandido && (
                  <div className="px-4 pb-4">
                    <ul className="space-y-1.5">
                      {sec.puntos.map((p, i) => (
                        <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                          <span className="text-primary-400 mt-0.5">•</span> {p}
                        </li>
                      ))}
                    </ul>
                    {sec.discusion && sec.discusion.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-bold text-accent-600">Preguntas de discusión:</p>
                        {sec.discusion.map((d, i) => (
                          <details key={i} className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-2">
                            <summary className="text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer">{d.pregunta}</summary>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{d.respuesta}</p>
                          </details>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'codigo' && <GeneticCodeTable />}
      {tab === 'ran' && <RanCycleAnimation />}
      {tab === 'empaquetamiento' && <PackagingLadder />}

      {tab === 'comparativa' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 overflow-x-auto">
          <h3 className="font-display font-bold text-primary-700 dark:text-primary-300 mb-3">Procariotas vs. Eucariotas</h3>
          <table className="w-full text-xs md:text-sm border-collapse">
            <thead>
              <tr>
                <th className="bg-primary-700 text-white p-2 text-left rounded-tl-lg">Característica</th>
                <th className="bg-primary-700 text-white p-2 text-left">Procariota</th>
                <th className="bg-primary-700 text-white p-2 text-left rounded-tr-lg">Eucariota</th>
              </tr>
            </thead>
            <tbody>
              {comparativaProcEuc.map((fila, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-slate-50 dark:bg-slate-700/30' : ''}>
                  <td className="p-2 font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-slate-600">{fila.caracteristica}</td>
                  <td className="p-2 text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-slate-600">{fila.procariota}</td>
                  <td className="p-2 text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-slate-600">{fila.eucariota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'glosario' && <Glossary />}
    </div>
  );
}
