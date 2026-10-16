import { Lock, Check, Coins } from 'lucide-react';
import { catalogoAvatar, type AvatarConfig } from '../../data/avatarCatalog';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/audioManager';

export function Shop() {
  const { monedas, itemsComprados, comprarItem, avatar, setAvatar } = useGameStore();

  const itemComprado = (cat: string, id: string) =>
    itemsComprados.some(i => i.categoria === cat && i.itemId === id);

  const equipar = (cat: string, id: string) => {
    audioManager.tocarEfecto('clic');
    const nuevoAvatar = { ...avatar, [cat]: id } as AvatarConfig;
    const opcion = catalogoAvatar.find(c => c.key === cat)?.opciones.find(o => o.id === id);
    if (opcion?.colores) {
      if (cat === 'ropa') nuevoAvatar.ropaColor = opcion.colores[0];
      if (cat === 'calzado') nuevoAvatar.calzadoColor = opcion.colores[0];
      if (cat === 'accesorios') nuevoAvatar.accesorioColor = opcion.colores[0];
    }
    setAvatar(nuevoAvatar);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 pb-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-bold text-primary-700 dark:text-primary-300">Tienda</h2>
        <div className="flex items-center gap-1 bg-warning-50 dark:bg-warning-900/20 rounded-full px-3 py-1">
          <Coins size={18} className="text-warning-500" />
          <span className="font-bold text-warning-600">{monedas}</span>
        </div>
      </div>

      {catalogoAvatar.map(cat => {
        const dePago = cat.opciones.filter(o => !o.gratis);
        if (dePago.length === 0) return null;
        return (
          <div key={cat.key} className="mb-6">
            <h3 className="text-sm font-bold text-slate-500 mb-2">{cat.label}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {dePago.map(op => {
                const comprado = itemComprado(cat.key, op.id);
                const equipado = (avatar as any)[cat.key] === op.id;
                const puedeComprar = monedas >= (op.precio ?? 0);
                return (
                  <div
                    key={op.id}
                    className={`rounded-xl border-2 p-3 text-center transition-all ${
                      equipado
                        ? 'border-success-500 bg-success-50 dark:bg-success-900/20'
                        : comprado
                          ? 'border-primary-300 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{op.label}</p>
                    {equipado ? (
                      <div className="flex items-center justify-center gap-1 text-success-600 text-sm font-bold">
                        <Check size={16} /> Equipado
                      </div>
                    ) : comprado ? (
                      <button
                        onClick={() => equipar(cat.key, op.id)}
                        className="text-sm font-bold text-primary-600 hover:text-primary-700"
                      >
                        Equipar
                      </button>
                    ) : (
                      <button
                        disabled={!puedeComprar}
                        onClick={() => { audioManager.tocarEfecto('monedas'); comprarItem(cat.key, op.id, op.precio ?? 0); }}
                        className={`flex items-center justify-center gap-1 text-sm font-bold rounded-lg px-2 py-1 ${
                          puedeComprar
                            ? 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 hover:bg-warning-200'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {puedeComprar ? <Coins size={14} /> : <Lock size={14} />} {op.precio}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
