import { useState, useMemo } from 'react';
import { Shuffle, Check } from 'lucide-react';
import { AvatarSVG } from './AvatarSVG';
import { catalogoAvatar, avatarDefault, type AvatarConfig } from '../../data/avatarCatalog';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/audioManager';

interface AvatarCreatorProps {
  onConfirm?: () => void;
}

export function AvatarCreator({ onConfirm }: AvatarCreatorProps) {
  const { avatar, setAvatar, itemsComprados } = useGameStore();
  const [config, setConfig] = useState<AvatarConfig>({ ...avatarDefault, ...avatar });
  const [categoriaActiva, setCategoriaActiva] = useState(0);
  const [colorActivo, setColorActivo] = useState<Record<string, string>>({
    ropa: config.ropaColor,
    calzado: config.calzadoColor,
    accesorios: config.accesorioColor,
  });

  const categoria = catalogoAvatar[categoriaActiva];

  const actualizar = (key: string, valor: string) => {
    audioManager.tocarEfecto('clic');
    const nuevoConfig = { ...config, [key]: valor } as AvatarConfig;
    // Al elegir una prenda/calzado, usa su primer color para que el cambio se note
    const op = catalogoAvatar.find(c => c.key === key)?.opciones.find(o => o.id === valor);
    if (op?.colores?.length) {
      if (key === 'ropa') nuevoConfig.ropaColor = op.colores[0];
      if (key === 'pantalon') nuevoConfig.pantalonColor = op.colores[0];
      if (key === 'calzado') nuevoConfig.calzadoColor = op.colores[0];
      if (key === 'accesorios') nuevoConfig.accesorioColor = op.colores[0];
    }
    setConfig(nuevoConfig);
  };

  const actualizarColor = (key: 'ropaColor' | 'pantalonColor' | 'calzadoColor' | 'accesorioColor', color: string) => {
    audioManager.tocarEfecto('clic');
    setConfig({ ...config, [key]: color });
  };

  const aleatorio = () => {
    audioManager.tocarEfecto('clic');
    const nuevo: AvatarConfig = { ...config };
    for (const cat of catalogoAvatar) {
      const opcionesGratis = cat.opciones.filter(o => o.gratis);
      if (opcionesGratis.length > 0) {
        const random = opcionesGratis[Math.floor(Math.random() * opcionesGratis.length)];
        nuevo[cat.key as keyof AvatarConfig] = random.id as any;
        if (random.colores && random.colores.length > 0) {
          if (cat.key === 'ropa') nuevo.ropaColor = random.colores[Math.floor(Math.random() * random.colores.length)];
          if (cat.key === 'pantalon') nuevo.pantalonColor = random.colores[Math.floor(Math.random() * random.colores.length)];
          if (cat.key === 'calzado') nuevo.calzadoColor = random.colores[Math.floor(Math.random() * random.colores.length)];
          if (cat.key === 'accesorios') nuevo.accesorioColor = random.colores[0];
        }
      }
    }
    // Mantener piel aleatoria
    const pielIdx = Math.floor(Math.random() * 10);
    nuevo.piel = `piel_${pielIdx}`;
    setConfig(nuevo);
  };

  const confirmar = () => {
    audioManager.tocarEfecto('clic');
    setAvatar(config);
    onConfirm?.();
  };

  const itemComprado = (catKey: string, itemId: string) =>
    itemsComprados.some(i => i.categoria === catKey && i.itemId === itemId);

  const coloresParaCategoria = useMemo(() => {
    const cat = categoria;
    const opcionActual = cat.opciones.find(o => o.id === (config as any)[cat.key]);
    return opcionActual?.colores ?? [];
  }, [categoria, config]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Vista previa */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-gradient-to-b from-primary-50 to-accent-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 shadow-lg">
            <AvatarSVG config={config} size={200} />
          </div>
          <button
            onClick={aleatorio}
            className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
          >
            <Shuffle size={18} /> Aleatorio
          </button>
        </div>

        {/* Controles */}
        <div className="flex flex-col gap-3">
          {/* Tabs de categoría */}
          <div className="flex flex-wrap gap-2">
            {catalogoAvatar.map((cat, i) => (
              <button
                key={cat.key}
                onClick={() => { setCategoriaActiva(i); audioManager.tocarEfecto('clic'); }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  i === categoriaActiva
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Opciones */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow min-h-[200px]">
            <div className="flex flex-wrap gap-2">
              {categoria.opciones.map(op => {
                const bloqueado = !op.gratis && !itemComprado(categoria.key, op.id);
                const seleccionado = (config as any)[categoria.key] === op.id;
                return (
                  <button
                    key={op.id}
                    disabled={bloqueado}
                    onClick={() => actualizar(categoria.key, op.id)}
                    className={`relative text-sm font-medium px-3 py-2 rounded-xl border-2 transition-all ${
                      seleccionado
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'border-slate-200 dark:border-slate-600 hover:border-primary-300 text-slate-600 dark:text-slate-300'
                    } ${bloqueado ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {op.label}
                    {bloqueado && <span className="ml-1 text-xs">🔒 {op.precio}</span>}
                    {seleccionado && <Check size={14} className="inline ml-1" />}
                  </button>
                );
              })}
            </div>

            {/* Colores */}
            {coloresParaCategoria.length > 1 && categoria.key !== 'piel' && (
              <div className="mt-4">
                <p className="text-xs text-slate-500 mb-2 font-semibold">Color:</p>
                <div className="flex flex-wrap gap-2">
                  {coloresParaCategoria.map(c => {
                    const colorKey =
                      categoria.key === 'ropa' ? 'ropaColor' :
                      categoria.key === 'pantalon' ? 'pantalonColor' :
                      categoria.key === 'calzado' ? 'calzadoColor' :
                      categoria.key === 'accesorios' ? 'accesorioColor' : null;
                    if (!colorKey) return null;
                    const seleccionado = (config as any)[colorKey] === c;
                    return (
                      <button
                        key={c}
                        onClick={() => actualizarColor(colorKey, c)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${seleccionado ? 'border-primary-500 scale-110 ring-2 ring-primary-200' : 'border-slate-300'}`}
                        style={{ backgroundColor: c }}
                        aria-label={`Color ${c}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tonos de piel */}
            {categoria.key === 'piel' && (
              <div className="mt-4">
                <p className="text-xs text-slate-500 mb-2 font-semibold">Tonos de piel:</p>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 10 }, (_, i) => {
                    const id = `piel_${i}`;
                    const seleccionado = config.piel === id;
                    return (
                      <button
                        key={id}
                        onClick={() => actualizar('piel', id)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${seleccionado ? 'border-primary-500 scale-110 ring-2 ring-primary-200' : 'border-slate-300'}`}
                        style={{ backgroundColor: ['#FFE0BD','#FFD0A8','#F8C39B','#E8B58A','#D4A373','#C68863','#A56B47','#8B5A2B','#6B4423','#3E2723'][i] }}
                        aria-label={`Tono de piel ${i + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Botón confirmar */}
          {onConfirm && (
            <button
              onClick={confirmar}
              className="flex items-center justify-center gap-2 bg-success-500 hover:bg-success-600 text-white font-bold py-3 px-6 rounded-2xl transition-colors text-lg"
            >
              <Check size={20} /> ¡Listo!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
