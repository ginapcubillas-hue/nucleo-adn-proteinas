export interface NivelMeta {
  id: number;
  mundo: number;
  titulo: string;
  icono: string;
  color: string;
}

export interface MundoMeta {
  id: number;
  nombre: string;
  color: string;
  niveles: NivelMeta[];
}

export const mundos: MundoMeta[] = [
  {
    id: 1,
    nombre: 'El Núcleo',
    color: '#4f46e5',
    niveles: [
      { id: 1, mundo: 1, titulo: 'Núcleo y morfología', icono: ' 🔬', color: '#4f46e5' },
      { id: 2, mundo: 1, titulo: 'Envoltura nuclear', icono: '🧫', color: '#4338ca' },
      { id: 3, mundo: 1, titulo: 'Poro y transporte', icono: '🔄', color: '#3730a3' },
      { id: 4, mundo: 1, titulo: 'Nucleoplasma y nucléolo', icono: '🔵', color: '#6366f1' },
      { id: 5, mundo: 1, titulo: 'Cromatina', icono: '🧬', color: '#818cf8' },
      { id: 6, mundo: 1, titulo: 'Del ADN al cromosoma', icono: '📐', color: '#4f46e5' },
      { id: 7, mundo: 1, titulo: 'ADN y Watson-Crick', icono: '🧪', color: '#4338ca' },
    ],
  },
  {
    id: 2,
    nombre: 'Del ARN a la proteína',
    color: '#0891b2',
    niveles: [
      { id: 8, mundo: 2, titulo: 'Código genético', icono: '📖', color: '#0891b2' },
      { id: 9, mundo: 2, titulo: 'ARN de transferencia', icono: '🌿', color: '#0e7490' },
      { id: 10, mundo: 2, titulo: 'Etapas de la traducción', icono: '⚙️', color: '#06b6d4' },
      { id: 11, mundo: 2, titulo: 'Procariotas vs. eucariotas', icono: '⚖️', color: '#155e75' },
    ],
  },
  {
    id: 3,
    nombre: 'Cuando el ADN cambia',
    color: '#dc2626',
    niveles: [
      { id: 12, mundo: 3, titulo: 'Mutaciones génicas', icono: '⚠️', color: '#dc2626' },
      { id: 13, mundo: 3, titulo: 'Mutaciones cromosómicas', icono: '🔬', color: '#b91c1c' },
    ],
  },
];

export const todosNiveles: NivelMeta[] = mundos.flatMap(m => m.niveles);

export function getNivel(id: number): NivelMeta | undefined {
  return todosNiveles.find(n => n.id === id);
}

export function getMundo(id: number): MundoMeta | undefined {
  return mundos.find(m => m.id === id);
}

export function nivelMundoDesbloqueado(
  nivelId: number,
  estrellasPorNivel: Record<number, number>,
): boolean {
  if (nivelId === 1) return true;
  const anterior = estrellasPorNivel[nivelId - 1];
  return anterior !== undefined && anterior >= 1;
}

export function mundoDesbloqueado(
  mundoId: number,
  estrellasPorNivel: Record<number, number>,
): boolean {
  if (mundoId === 1) return true;
  const nivelesMundoAnterior = mundos.find(m => m.id === mundoId - 1)?.niveles ?? [];
  return nivelesMundoAnterior.every(n => (estrellasPorNivel[n.id] ?? 0) >= 1);
}
