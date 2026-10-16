import type { AvatarConfig } from '../../data/avatarCatalog';
import { tonosPiel } from '../../data/avatarCatalog';

function getTonolPiel(idx: number): string {
  return tonosPiel[idx] ?? tonosPiel[3];
}

function getCabelloColor(config: AvatarConfig): string {
  const colores: Record<string, string> = {
    negro: '#1a1a1a', castanio: '#5D3A1A', rubio: '#E8C34A',
    pelirrojo: '#C0392B', canoso: '#B0B0B0', azul: '#3B82F6',
    rosa: '#EC4899', violeta: '#8B5CF6', verde: '#22C55E',
  };
  return colores[config.cabelloColor] ?? '#5D3A1A';
}

function getOjosColor(config: AvatarConfig): string {
  const colores: Record<string, string> = {
    marron: '#6B4423', negro: '#1a1a1a', miel: '#D4A017',
    verde: '#22C55E', azul: '#3B82F6', gris: '#7F8C8D', violeta: '#8B5CF6',
  };
  return colores[config.ojosColor] ?? '#6B4423';
}

function getOjosRadio(config: AvatarConfig): number {
  if (config.ojosTamano === 'pequeno') return 4;
  if (config.ojosTamano === 'grande') return 9;
  return 6.5;
}

interface AvatarSVGProps {
  config: AvatarConfig;
  hablando?: boolean;
  expresion?: 'neutral' | 'feliz' | 'triste' | 'celebrar';
  size?: number;
}

export function AvatarSVG({ config, hablando = false, expresion = 'neutral', size = 200 }: AvatarSVGProps) {
  const pielIdx = parseInt(config.piel.split('_')[1] ?? '3');
  const piel = getTonolPiel(pielIdx);
  const cabelloColor = getCabelloColor(config);
  const ojosColor = getOjosColor(config);
  const ojosR = getOjosRadio(config);
  const esHombre = config.cuerpo === 'hombre';
  const esMujer = config.cuerpo === 'mujer';
  const esNeutro = config.cuerpo === 'neutro';
  const hombroAncho = esHombre ? 55 : esMujer ? 42 : 48;
  const cinturaAncho = esHombre ? 48 : esMujer ? 38 : 44;
  const tieneCabello = config.cabelloLongitud !== 'calvo' && config.cabelloLongitud !== 'rapado';
  const cabelloLargo = config.cabelloLongitud === 'largo' || config.cabelloLongitud === 'muyLargo';
  const esAfro = config.cabelloPeinado === 'afro';
  const esTrenzas = config.cabelloPeinado === 'trenzas';
  const esCola = config.cabelloPeinado === 'cola';
  const esMono = config.cabelloPeinado === 'mono';
  const esColetas = config.cabelloPeinado === 'coletas';
  const esFlequillo = config.cabelloPeinado === 'flequillo';
  const esOndulado = config.cabelloTextura === 'ondulado';
  const esRizado = config.cabelloTextura === 'rizado' || config.cabelloTextura === 'crespo';

  const pantalon = config.pantalon ?? 'jeans';
  const pantalonColor = config.pantalonColor ?? '#1e3a8a';
  const bocaY = expresion === 'feliz' || expresion === 'celebrar' ? 66 : 68;
  const bocaPath = hablando
    ? 'M -8 67 Q 0 73 8 67'
    : expresion === 'feliz' || expresion === 'celebrar'
      ? 'M -9 65 Q 0 74 9 65'
      : expresion === 'triste'
        ? 'M -8 70 Q 0 65 8 70'
        : 'M -7 68 Q 0 71 7 68';

  const brazoRot = expresion === 'celebrar' ? -25 : 0;
  const brazoRotDer = expresion === 'celebrar' ? 25 : 0;

  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={size * 1.1}
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
      aria-label="Avatar personalizable"
    >
      {/* Cuerpo / ropa */}
      <g>
        {/* Piernas */}
        {(() => {
          const piernaL = 82, piernaR = 104, ancho = 14;
          const larga = pantalon === 'jeans' || pantalon === 'largo';
          const finPantalon = larga ? 192 : pantalon === 'short' ? 180 : 172;
          const cubreVestido = config.ropa === 'vestido';
          return (
            <>
              {/* Piel de las piernas */}
              <rect x={piernaL} y="160" width={ancho} height="36" fill={piel} />
              <rect x={piernaR} y="160" width={ancho} height="36" fill={piel} />
              {/* Pantalón */}
              {!cubreVestido && pantalon === 'falda' ? (
                <path d="M 66 156 L 134 156 L 142 176 L 58 176 Z" fill={pantalonColor} />
              ) : !cubreVestido ? (
                <>
                  <rect x={piernaL - 1} y="156" width={ancho + 2} height={finPantalon - 156} rx="2" fill={pantalonColor} />
                  <rect x={piernaR - 1} y="156" width={ancho + 2} height={finPantalon - 156} rx="2" fill={pantalonColor} />
                  <rect x="82" y="154" width="36" height="10" fill={pantalonColor} />
                  {larga && <line x1="100" y1="162" x2="100" y2="192" stroke="#000" strokeWidth="0.8" opacity="0.15" />}
                </>
              ) : null}
              {cubreVestido && (
                <path d={`M 60 156 L 140 156 L 148 178 L 52 178 Z`} fill={config.ropaColor} />
              )}
            </>
          );
        })()}

        {/* Calzado (se dibuja encima de las piernas, cambia de estilo y color) */}
        {(() => {
          const c = config.calzadoColor;
          const pies = [{ x: 87, d: -1 }, { x: 113, d: 1 }];
          return pies.map((f, i) => {
            const cx = f.x + f.d * 3;
            switch (config.calzado) {
              case 'formales':
                return (
                  <g key={i}>
                    <ellipse cx={cx} cy="197" rx="14" ry="6" fill={c} />
                    <ellipse cx={cx - f.d * 2} cy="195" rx="5" ry="1.6" fill="#fff" opacity="0.35" />
                    <rect x={cx - 14} y="201" width="28" height="2.5" rx="1" fill="#1a1a1a" />
                  </g>
                );
              case 'botas':
                return (
                  <g key={i}>
                    <rect x={f.x - 8} y="178" width="16" height="20" rx="3" fill={c} />
                    <ellipse cx={cx} cy="198" rx="15" ry="6.5" fill={c} />
                    <rect x={cx - 15} y="201" width="30" height="3.5" rx="1.5" fill="#1a1a1a" />
                    <rect x={f.x - 8} y="178" width="16" height="3" rx="1.5" fill="#000" opacity="0.2" />
                  </g>
                );
              case 'sandalias':
                return (
                  <g key={i}>
                    <ellipse cx={cx} cy="199" rx="14" ry="4.5" fill={c} />
                    <ellipse cx={cx} cy="196" rx="11" ry="4" fill={piel} />
                    <path d={`M ${cx - 9} 196 L ${cx + 9} 196`} stroke={c} strokeWidth="2.5" />
                    <path d={`M ${cx - 5} 192 L ${cx + 5} 198`} stroke={c} strokeWidth="2" />
                  </g>
                );
              case 'crocs':
                return (
                  <g key={i}>
                    <ellipse cx={cx} cy="196" rx="15" ry="8" fill={c} />
                    <circle cx={cx - 5} cy="195" r="1.3" fill="#000" opacity="0.3" />
                    <circle cx={cx} cy="193" r="1.3" fill="#000" opacity="0.3" />
                    <circle cx={cx + 5} cy="195" r="1.3" fill="#000" opacity="0.3" />
                  </g>
                );
              case 'lab':
                return (
                  <g key={i}>
                    <ellipse cx={cx} cy="196" rx="14" ry="7" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                    <rect x={cx - 14} y="200" width="28" height="3" rx="1.5" fill="#38bdf8" />
                  </g>
                );
              default: /* tenis */
                return (
                  <g key={i}>
                    <ellipse cx={cx} cy="196" rx="15" ry="7.5" fill={c} />
                    <rect x={cx - 15} y="200" width="30" height="3.5" rx="1.7" fill="#f8fafc" />
                    <path d={`M ${cx - 6} 192 L ${cx + 6} 197`} stroke="#fff" strokeWidth="1.6" opacity="0.8" />
                    <path d={`M ${cx - 3} 190 L ${cx + 9} 195`} stroke="#fff" strokeWidth="1.6" opacity="0.8" />
                  </g>
                );
            }
          });
        })()}

        {/* Cuello */}
        <rect x="92" y="82" width="16" height="18" fill={piel} />

        {/* Hoodie: capucha detrás del cuello */}
        {config.ropa === 'hoodie' && (
          <path d="M 80 98 Q 100 86 120 98 L 124 108 Q 100 100 76 108 Z" fill={config.ropaColor} />
        )}

        {/* Torso */}
        <path d={`M ${100 - hombroAncho} 100 L ${100 + hombroAncho} 100 L ${100 + cinturaAncho} 160 L ${100 - cinturaAncho} 160 Z`}
          fill={config.ropa === 'bata' ? '#f8fafc' : config.ropaColor}
          stroke={config.ropa === 'bata' ? '#cbd5e1' : 'none'} strokeWidth="1" />

        {/* Detalles por tipo de ropa */}
        {config.ropa === 'bata' && (
          <>
            <path d="M 100 100 L 100 160" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M 88 100 L 100 126 L 112 100" fill="#93c5fd" opacity="0.6" />
            <rect x={100 - cinturaAncho + 6} y="135" width="14" height="14" rx="2" fill="none" stroke="#cbd5e1" />
          </>
        )}
        {config.ropa === 'camisa' && (
          <>
            <path d="M 90 100 L 100 114 L 110 100 L 104 98 L 100 104 L 96 98 Z" fill="#fff" />
            <line x1="100" y1="114" x2="100" y2="160" stroke="#fff" strokeWidth="1.2" opacity="0.6" />
            {[122, 134, 146].map(y => <circle key={y} cx="100" cy={y} r="1.4" fill="#fff" />)}
          </>
        )}
        {config.ropa === 'hoodie' && (
          <>
            <path d="M 90 100 Q 100 112 110 100" fill={piel} />
            <path d="M 94 106 L 93 124 M 106 106 L 107 124" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
            <path d={`M ${100 - cinturaAncho + 4} 140 L ${100 + cinturaAncho - 4} 140 L ${100 + cinturaAncho - 8} 158 L ${100 - cinturaAncho + 8} 158 Z`} fill="#000" opacity="0.12" />
          </>
        )}
        {config.ropa === 'scrubs' && (
          <>
            <path d="M 88 100 L 100 120 L 112 100 Z" fill={piel} />
            <rect x={100 + cinturaAncho - 20} y="136" width="12" height="12" rx="2" fill="#000" opacity="0.12" />
          </>
        )}
        {config.ropa === 'blusa' && (
          <>
            <path d="M 88 100 Q 100 118 112 100 Z" fill={piel} />
            <path d="M 88 100 Q 100 118 112 100" fill="none" stroke="#fff" strokeWidth="2" opacity="0.8" />
          </>
        )}
        {config.ropa === 'vestido' && (
          <>
            <path d="M 88 100 Q 100 114 112 100 Z" fill={piel} />
            <rect x={100 - cinturaAncho} y="150" width={cinturaAncho * 2} height="5" fill="#fff" opacity="0.35" />
          </>
        )}
        {(config.ropa === 'camiseta' || !config.ropa) && (
          <path d="M 88 100 Q 100 110 112 100 Z" fill={piel} />
        )}

        {/* Brazos: mangas cortas o largas según la prenda */}
        {(() => {
          const manga = config.ropa === 'camisa' || config.ropa === 'hoodie' || config.ropa === 'bata' ? 55 : 28;
          const colorManga = config.ropa === 'bata' ? '#f8fafc' : config.ropaColor;
          return [
            { x: 100 - hombroAncho - 3, rot: brazoRot, ox: 100 - hombroAncho + 5 },
            { x: 100 + hombroAncho - 9, rot: brazoRotDer, ox: 100 + hombroAncho - 5 },
          ].map((b, i) => (
            <g key={i} style={{ transformOrigin: `${b.ox}px 105px`, transform: `rotate(${b.rot}deg)` }}>
              <rect x={b.x + 1} y="120" width="10" height="45" rx="5" fill={piel} />
              <rect x={b.x} y="102" width="12" height={manga} rx="6" fill={colorManga} stroke={config.ropa === 'bata' ? '#cbd5e1' : 'none'} strokeWidth="0.8" />
            </g>
          ));
        })()}
      </g>

      {/* Cabello largo detrás */}
      {tieneCabello && cabelloLargo && (
        <g>
          {esRizado ? (
            <>
              <circle cx="55" cy="60" r="14" fill={cabelloColor} />
              <circle cx="145" cy="60" r="14" fill={cabelloColor} />
              <circle cx="50" cy="85" r="12" fill={cabelloColor} />
              <circle cx="150" cy="85" r="12" fill={cabelloColor} />
              <circle cx="55" cy="110" r="11" fill={cabelloColor} />
              <circle cx="145" cy="110" r="11" fill={cabelloColor} />
            </>
          ) : (
            <>
              <path d="M 55 50 Q 40 90 50 130 L 60 130 Q 55 90 70 55 Z" fill={cabelloColor} />
              <path d="M 145 50 Q 160 90 150 130 L 140 130 Q 145 90 130 55 Z" fill={cabelloColor} />
            </>
          )}
          {config.cabelloLongitud === 'muyLargo' && (
            <path d="M 55 120 Q 45 150 55 175 L 65 175 Q 58 150 68 125 Z" fill={cabelloColor} opacity="0.9" />
          )}
          {config.cabelloLongitud === 'muyLargo' && (
            <path d="M 145 120 Q 155 150 145 175 L 135 175 Q 142 150 132 125 Z" fill={cabelloColor} opacity="0.9" />
          )}
        </g>
      )}

      {/* Cola de caballo: sale de la parte alta-trasera y cuelga hacia atrás */}
      {tieneCabello && esCola && (
        <g>
          <path d="M 124 28 Q 162 30 160 70 Q 158 100 146 112 Q 146 84 140 66 Q 134 46 118 36 Z" fill={cabelloColor} />
          <path d="M 150 80 Q 156 95 148 108" fill="none" stroke="#000" strokeWidth="1" opacity="0.15" />
        </g>
      )}

      {/* Cabeza */}
      <ellipse cx="100" cy="55" rx="32" ry="38" fill={piel} />

      {/* Orejas */}
      <ellipse cx="68" cy="58" rx="6" ry="9" fill={piel} />
      <ellipse cx="132" cy="58" rx="6" ry="9" fill={piel} />

      {/* Cabello superior */}
      {tieneCabello && (
        <g>
          {esAfro ? (
            <>
              <circle cx="100" cy="25" r="30" fill={cabelloColor} />
              <circle cx="75" cy="30" r="18" fill={cabelloColor} />
              <circle cx="125" cy="30" r="18" fill={cabelloColor} />
              <circle cx="85" cy="18" r="16" fill={cabelloColor} />
              <circle cx="115" cy="18" r="16" fill={cabelloColor} />
            </>
          ) : esTrenzas ? (
            <>
              <path d="M 68 35 Q 100 12 132 35 L 132 45 Q 100 25 68 45 Z" fill={cabelloColor} />
              <rect x="62" y="40" width="8" height="30" rx="4" fill={cabelloColor} />
              <rect x="74" y="42" width="8" height="35" rx="4" fill={cabelloColor} />
              <rect x="118" y="42" width="8" height="35" rx="4" fill={cabelloColor} />
              <rect x="130" y="40" width="8" height="30" rx="4" fill={cabelloColor} />
            </>
          ) : esCola ? (
            <>
              <path d="M 70 30 Q 100 15 130 30 L 130 50 Q 100 35 70 50 Z" fill={cabelloColor} />
              <circle cx="128" cy="30" r="4.5" fill="#ef4444" />
            </>
          ) : esMono ? (
            <>
              <path d="M 70 30 Q 100 15 130 30 L 130 50 Q 100 35 70 50 Z" fill={cabelloColor} />
              <circle cx="100" cy="25" r="14" fill={cabelloColor} />
            </>
          ) : esColetas ? (
            <>
              <path d="M 70 30 Q 100 15 130 30 L 130 50 Q 100 35 70 50 Z" fill={cabelloColor} />
              <ellipse cx="60" cy="50" rx="10" ry="18" fill={cabelloColor} />
              <ellipse cx="140" cy="50" rx="10" ry="18" fill={cabelloColor} />
            </>
          ) : esOndulado ? (
            <path d="M 68 32 Q 80 18 100 20 Q 120 18 132 32 Q 135 45 130 50 Q 115 38 100 38 Q 85 38 70 50 Q 65 45 68 32 Z" fill={cabelloColor} />
          ) : esRizado ? (
            <>
              <circle cx="80" cy="28" r="12" fill={cabelloColor} />
              <circle cx="100" cy="22" r="14" fill={cabelloColor} />
              <circle cx="120" cy="28" r="12" fill={cabelloColor} />
              <circle cx="70" cy="38" r="10" fill={cabelloColor} />
              <circle cx="130" cy="38" r="10" fill={cabelloColor} />
            </>
          ) : config.cabelloLongitud === 'corto' ? (
            <path d="M 68 30 Q 100 12 132 30 L 132 48 Q 100 30 68 48 Z" fill={cabelloColor} />
          ) : config.cabelloLongitud === 'medio' ? (
            <>
              <path d="M 68 30 Q 100 12 132 30 L 132 55 Q 100 35 68 55 Z" fill={cabelloColor} />
            </>
          ) : (
            <path d="M 65 30 Q 100 10 135 30 L 135 60 Q 100 38 65 60 Z" fill={cabelloColor} />
          )}
          {esFlequillo && (
            <path d="M 72 32 Q 100 28 128 32 L 128 42 Q 100 38 72 42 Z" fill={cabelloColor} />
          )}
        </g>
      )}

      {/* Cejas */}
      <rect x="82" y="44" width="12" height="3" rx="1.5" fill={cabelloColor} opacity="0.7" />
      <rect x="106" y="44" width="12" height="3" rx="1.5" fill={cabelloColor} opacity="0.7" />

      {/* Ojos */}
      <g className={hablando ? '' : ''}>
        {/* Blanco del ojo */}
        <ellipse cx="88" cy="55" rx={ojosR + 2} ry={ojosR + 1} fill="white" />
        <ellipse cx="112" cy="55" rx={ojosR + 2} ry={ojosR + 1} fill="white" />
        {/* Iris */}
        <circle cx="88" cy="55" r={ojosR} fill={ojosColor} />
        <circle cx="112" cy="55" r={ojosR} fill={ojosColor} />
        {/* Pupila */}
        <circle cx="88" cy="55" r={ojosR * 0.4} fill="#000" />
        <circle cx="112" cy="55" r={ojosR * 0.4} fill="#000" />
        {/* Brillo */}
        <circle cx={88 + ojosR * 0.3} cy={55 - ojosR * 0.3} r={ojosR * 0.25} fill="white" />
        <circle cx={112 + ojosR * 0.3} cy={55 - ojosR * 0.3} r={ojosR * 0.25} fill="white" />
        {/* Parpado (animación blink) */}
        <rect x="80" y="50" width="16" height={hablando ? 0 : 2} fill={piel} className="animate-blink" style={{ transformOrigin: '88px 55px' }} />
        <rect x="104" y="50" width="16" height={hablando ? 0 : 2} fill={piel} className="animate-blink" style={{ transformOrigin: '112px 55px' }} />
      </g>

      {/* Nariz */}
      <path d="M 97 58 Q 95 65 100 67 Q 105 65 103 58" fill="none" stroke="#000" strokeWidth="1.5" opacity="0.18" strokeLinecap="round" />

      {/* Boca */}
      <path d={bocaPath} transform="translate(100 0)" fill={hablando ? '#7F1D1D' : 'none'} stroke="#B03A2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Rubor */}
      {expresion === 'feliz' || expresion === 'celebrar' ? (
        <>
          <circle cx="78" cy="66" r="5" fill="#FF6B6B" opacity="0.3" />
          <circle cx="122" cy="66" r="5" fill="#FF6B6B" opacity="0.3" />
        </>
      ) : null}

      {/* Accesorios */}
      {config.accesorios === 'gafas_redondas' && (
        <>
          <circle cx="88" cy="55" r={ojosR + 4} fill="none" stroke="#1a1a1a" strokeWidth="2" />
          <circle cx="112" cy="55" r={ojosR + 4} fill="none" stroke="#1a1a1a" strokeWidth="2" />
          <line x1="95" y1="55" x2="105" y2="55" stroke="#1a1a1a" strokeWidth="2" />
        </>
      )}
      {config.accesorios === 'gafas_cuadradas' && (
        <>
          <rect x={88 - ojosR - 4} y={55 - ojosR - 3} width={(ojosR + 4) * 2} height={(ojosR + 3) * 2} rx="2" fill="none" stroke="#1a1a1a" strokeWidth="2" />
          <rect x={112 - ojosR - 4} y={55 - ojosR - 3} width={(ojosR + 4) * 2} height={(ojosR + 3) * 2} rx="2" fill="none" stroke="#1a1a1a" strokeWidth="2" />
          <line x1="95" y1="55" x2="105" y2="55" stroke="#1a1a1a" strokeWidth="2" />
        </>
      )}
      {config.accesorios === 'gafas_sol' && (
        <>
          <rect x={88 - ojosR - 4} y={55 - ojosR - 3} width={(ojosR + 4) * 2} height={(ojosR + 3) * 2} rx="3" fill="#1a1a1a" opacity="0.8" />
          <rect x={112 - ojosR - 4} y={55 - ojosR - 3} width={(ojosR + 4) * 2} height={(ojosR + 3) * 2} rx="3" fill="#1a1a1a" opacity="0.8" />
          <line x1="95" y1="55" x2="105" y2="55" stroke="#1a1a1a" strokeWidth="2" />
        </>
      )}
      {config.accesorios === 'mascarilla' && (
        <path d="M 75 62 Q 100 58 125 62 L 125 78 Q 100 82 75 78 Z" fill={config.accesorioColor} opacity="0.85" />
      )}
      {config.accesorios === 'gorro_quirurgico' && (
        <path d="M 68 30 Q 100 10 132 30 L 132 38 Q 100 25 68 38 Z" fill={config.accesorioColor} />
      )}
      {config.accesorios === 'gorra' && (
        <>
          <path d="M 65 35 Q 100 18 135 35 L 135 42 Q 100 30 65 42 Z" fill={config.accesorioColor} />
          <ellipse cx="110" cy="40" rx="25" ry="5" fill={config.accesorioColor} />
        </>
      )}
      {config.accesorios === 'estetoscopio' && (
        <>
          <path d="M 85 100 Q 75 120 80 135" fill="none" stroke="#0d9488" strokeWidth="2.5" />
          <path d="M 115 100 Q 125 120 120 135" fill="none" stroke="#0d9488" strokeWidth="2.5" />
          <circle cx="100" cy="138" r="8" fill="#0d9488" />
          <circle cx="100" cy="138" r="5" fill="#115e59" />
        </>
      )}
      {config.accesorios === 'audifonos' && (
        <>
          <path d="M 68 55 Q 60 40 100 35 Q 140 40 132 55" fill="none" stroke="#1a1a1a" strokeWidth="3" />
          <ellipse cx="66" cy="58" rx="6" ry="9" fill="#1a1a1a" />
          <ellipse cx="134" cy="58" rx="6" ry="9" fill="#1a1a1a" />
        </>
      )}
      {config.accesorios === 'microscopio_mascota' && (
        <g transform="translate(140, 140)">
          <rect x="-8" y="0" width="16" height="20" rx="2" fill="#475569" />
          <circle cx="0" cy="-5" r="6" fill="#64748b" />
          <rect x="-3" y="-15" width="6" height="12" fill="#475569" />
          <circle cx="0" cy="-18" r="4" fill="#94a3b8" />
        </g>
      )}
    </svg>
  );
}
