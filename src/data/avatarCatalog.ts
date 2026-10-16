export interface OpcionCatalogo {
  id: string;
  label: string;
  colores?: string[];
  gratis: boolean;
  precio?: number;
}

export interface CategoriaAvatar {
  key: string;
  label: string;
  opciones: OpcionCatalogo[];
}

export const tonosPiel: string[] = [
  '#FFE0BD', '#FFD0A8', '#F8C39B', '#E8B58A',
  '#D4A373', '#C68863', '#A56B47', '#8B5A2B',
  '#6B4423', '#3E2723',
];

export const catalogoAvatar: CategoriaAvatar[] = [
  {
    key: 'cuerpo',
    label: 'Cuerpo',
    opciones: [
      { id: 'hombre', label: 'Hombre', gratis: true },
      { id: 'mujer', label: 'Mujer', gratis: true },
      { id: 'neutro', label: 'Neutro', gratis: true },
    ],
  },
  {
    key: 'piel',
    label: 'Piel',
    opciones: tonosPiel.map((c, i) => ({
      id: `piel_${i}`,
      label: `Tono ${i + 1}`,
      colores: [c],
      gratis: true,
    })),
  },
  {
    key: 'cabelloLongitud',
    label: 'Longitud cabello',
    opciones: [
      { id: 'calvo', label: 'Calvo', gratis: true },
      { id: 'rapado', label: 'Rapado', gratis: true },
      { id: 'corto', label: 'Corto', gratis: true },
      { id: 'medio', label: 'Medio', gratis: true },
      { id: 'largo', label: 'Largo', gratis: true },
      { id: 'muyLargo', label: 'Muy largo', gratis: false, precio: 50 },
    ],
  },
  {
    key: 'cabelloPeinado',
    label: 'Peinado',
    opciones: [
      { id: 'suelto', label: 'Suelto', gratis: true },
      { id: 'cola', label: 'Cola de caballo', gratis: true },
      { id: 'mono', label: 'Moño', gratis: true },
      { id: 'trenzas', label: 'Trenzas', gratis: false, precio: 80 },
      { id: 'coletas', label: 'Coletas', gratis: true },
      { id: 'afro', label: 'Afro', gratis: false, precio: 80 },
      { id: 'flequillo', label: 'Flequillo', gratis: true },
      { id: 'undercut', label: 'Undercut', gratis: false, precio: 100 },
    ],
  },
  {
    key: 'cabelloTextura',
    label: 'Textura cabello',
    opciones: [
      { id: 'lacio', label: 'Lacio', gratis: true },
      { id: 'ondulado', label: 'Ondulado', gratis: true },
      { id: 'rizado', label: 'Rizado', gratis: true },
      { id: 'crespo', label: 'Crespo', gratis: false, precio: 60 },
    ],
  },
  {
    key: 'cabelloColor',
    label: 'Color cabello',
    opciones: [
      { id: 'negro', label: 'Negro', colores: ['#1a1a1a'], gratis: true },
      { id: 'castanio', label: 'Castaño', colores: ['#5D3A1A'], gratis: true },
      { id: 'rubio', label: 'Rubio', colores: ['#E8C34A'], gratis: true },
      { id: 'pelirrojo', label: 'Pelirrojo', colores: ['#C0392B'], gratis: true },
      { id: 'canoso', label: 'Canoso', colores: ['#B0B0B0'], gratis: true },
      { id: 'azul', label: 'Azul', colores: ['#3B82F6'], gratis: false, precio: 50 },
      { id: 'rosa', label: 'Rosado', colores: ['#EC4899'], gratis: false, precio: 50 },
      { id: 'violeta', label: 'Violeta', colores: ['#8B5CF6'], gratis: false, precio: 50 },
      { id: 'verde', label: 'Verde', colores: ['#22C55E'], gratis: false, precio: 50 },
    ],
  },
  {
    key: 'ojosColor',
    label: 'Color de ojos',
    opciones: [
      { id: 'marron', label: 'Marrón', colores: ['#6B4423'], gratis: true },
      { id: 'negro', label: 'Negro', colores: ['#1a1a1a'], gratis: true },
      { id: 'miel', label: 'Miel', colores: ['#D4A017'], gratis: true },
      { id: 'verde', label: 'Verde', colores: ['#22C55E'], gratis: true },
      { id: 'azul', label: 'Azul', colores: ['#3B82F6'], gratis: true },
      { id: 'gris', label: 'Gris', colores: ['#7F8C8D'], gratis: false, precio: 40 },
      { id: 'violeta', label: 'Violeta', colores: ['#8B5CF6'], gratis: false, precio: 60 },
    ],
  },
  {
    key: 'ojosTamano',
    label: 'Tamaño de ojos',
    opciones: [
      { id: 'pequeno', label: 'Pequeño', gratis: true },
      { id: 'mediano', label: 'Mediano', gratis: true },
      { id: 'grande', label: 'Grande', gratis: true },
    ],
  },
  {
    key: 'ropa',
    label: 'Ropa',
    opciones: [
      { id: 'camiseta', label: 'Camiseta', colores: ['#4f46e5', '#0891b2', '#22c55e', '#f59e0b', '#ef4444'], gratis: true },
      { id: 'camisa', label: 'Camisa', colores: ['#3b82f6', '#06b6d4', '#10b981'], gratis: true },
      { id: 'bata', label: 'Bata de laboratorio', colores: ['#f8fafc'], gratis: true },
      { id: 'scrubs', label: 'Uniforme médico', colores: ['#0d9488', '#5b21b6', '#be123c'], gratis: true },
      { id: 'hoodie', label: 'Hoodie', colores: ['#6366f1', '#ec4899', '#14b8a6'], gratis: true },
      { id: 'vestido', label: 'Vestido', colores: ['#ec4899', '#8b5cf6', '#06b6d4'], gratis: true },
      { id: 'blusa', label: 'Blusa', colores: ['#f59e0b', '#10b981', '#6366f1'], gratis: true },
    ],
  },
  {
    key: 'pantalon',
    label: 'Pantalón',
    opciones: [
      { id: 'jeans', label: 'Jeans', colores: ['#1e3a8a', '#3b82f6', '#475569'], gratis: true },
      { id: 'largo', label: 'Pantalón largo', colores: ['#374151', '#78350f', '#0f172a'], gratis: true },
      { id: 'short', label: 'Short', colores: ['#0ea5e9', '#f59e0b', '#374151'], gratis: true },
      { id: 'falda', label: 'Falda', colores: ['#ec4899', '#8b5cf6', '#0d9488'], gratis: true },
    ],
  },
  {
    key: 'calzado',
    label: 'Calzado',
    opciones: [
      { id: 'tenis', label: 'Tenis', colores: ['#1e293b', '#ef4444', '#3b82f6'], gratis: true },
      { id: 'formales', label: 'Zapatos formales', colores: ['#3E2723', '#111827'], gratis: true },
      { id: 'botas', label: 'Botas', colores: ['#5D4037', '#1e293b'], gratis: true },
      { id: 'sandalias', label: 'Sandalias', colores: ['#8B4513', '#f59e0b'], gratis: true },
      { id: 'crocs', label: 'Crocs', colores: ['#22c55e', '#f59e0b', '#ec4899'], gratis: true },
      { id: 'lab', label: 'Zapatillas de laboratorio', colores: ['#f8fafc'], gratis: false, precio: 60 },
    ],
  },
  {
    key: 'accesorios',
    label: 'Accesorios',
    opciones: [
      { id: 'ninguno', label: 'Ninguno', gratis: true },
      { id: 'gafas_redondas', label: 'Gafas redondas', colores: ['#1a1a1a'], gratis: true },
      { id: 'gafas_cuadradas', label: 'Gafas cuadradas', colores: ['#1a1a1a'], gratis: true },
      { id: 'gafas_sol', label: 'Gafas de sol', colores: ['#1a1a1a'], gratis: false, precio: 40 },
      { id: 'mascarilla', label: 'Mascarilla', colores: ['#3b82f6', '#22c55e', '#f8fafc'], gratis: true },
      { id: 'gorro_quirurgico', label: 'Gorro quirúrgico', colores: ['#22c55e', '#3b82f6'], gratis: false, precio: 50 },
      { id: 'gorra', label: 'Gorra', colores: ['#1e3a8a', '#dc2626'], gratis: false, precio: 40 },
      { id: 'estetoscopio', label: 'Estetoscopio', colores: ['#0d9488'], gratis: false, precio: 100 },
      { id: 'audifonos', label: 'Audífonos', colores: ['#1a1a1a'], gratis: false, precio: 60 },
      { id: 'microscopio_mascota', label: 'Microscopio mascota', colores: ['#475569'], gratis: false, precio: 200 },
    ],
  },
];

export const avatarDefault = {
  cuerpo: 'hombre',
  piel: 'piel_3',
  cabelloLongitud: 'corto',
  cabelloPeinado: 'suelto',
  cabelloTextura: 'lacio',
  cabelloColor: 'castanio',
  ojosColor: 'marron',
  ojosTamano: 'mediano',
  ropa: 'camiseta',
  ropaColor: '#4f46e5',
  pantalon: 'jeans',
  pantalonColor: '#1e3a8a',
  calzado: 'tenis',
  calzadoColor: '#1e293b',
  accesorios: 'ninguno',
  accesorioColor: '#1a1a1a',
};

export type AvatarConfig = typeof avatarDefault;
