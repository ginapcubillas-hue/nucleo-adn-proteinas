import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { glosario } from '../../data/glosario';

export function Glossary() {
  const [busqueda, setBusqueda] = useState('');

  const resultados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return glosario.sort((a, b) => a.termino.localeCompare(b.termino));
    return glosario
      .filter(g => g.termino.toLowerCase().includes(q) || g.definicion.toLowerCase().includes(q))
      .sort((a, b) => a.termino.localeCompare(b.termino));
  }, [busqueda]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          placeholder="Buscar término..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:border-primary-500 outline-none"
        />
      </div>

      {resultados.length === 0 ? (
        <p className="text-center text-slate-400 py-8">No se encontraron resultados.</p>
      ) : (
        <div className="space-y-2">
          {resultados.map(g => (
            <div key={g.termino} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-primary-600 dark:text-primary-400 text-sm">{g.termino}</span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-700 rounded-full px-2 py-0.5 text-slate-400">Nivel {g.nivel}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{g.definicion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
