export interface Logro {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  condicion: (estado: {
    estrellasPorNivel: Record<number, number>;
    rachaActual: number;
    rachaMaxima: number;
    totalAciertos: number;
    monedas: number;
    nivelesCompletados: number;
  }) => boolean;
}

export const logros: Logro[] = [
  {
    id: 'primer_paso',
    nombre: 'Primer paso',
    descripcion: 'Completa tu primer nivel',
    icono: '🎓',
    condicion: (e) => e.nivelesCompletados >= 1,
  },
  {
    id: 'maestro_poro',
    nombre: 'Maestro del Poro',
    descripcion: 'Consigue 3 estrellas en el nivel de Poro y transporte',
    icono: '🚪',
    condicion: (e) => (e.estrellasPorNivel[3] ?? 0) >= 3,
  },
  {
    id: 'rey_nucleolo',
    nombre: 'Rey del Nucléolo',
    descripcion: 'Consigue 3 estrellas en Nucleoplasma y nucléolo',
    icono: '👑',
    condicion: (e) => (e.estrellasPorNivel[4] ?? 0) >= 3,
  },
  {
    id: 'racha_10',
    nombre: 'Racha de 10',
    descripcion: 'Responde 10 preguntas seguidas correctamente',
    icono: '🔥',
    condicion: (e) => e.rachaMaxima >= 10,
  },
  {
    id: 'maestro_ribosoma',
    nombre: 'Maestro del Ribosoma',
    descripcion: 'Consigue 3 estrellas en Etapas de la traducción',
    icono: '⚙️',
    condicion: (e) => (e.estrellasPorNivel[10] ?? 0) >= 3,
  },
  {
    id: 'detective_mutaciones',
    nombre: 'Detective de Mutaciones',
    descripcion: 'Consigue 3 estrellas en Mutaciones génicas',
    icono: '🔍',
    condicion: (e) => (e.estrellasPorNivel[12] ?? 0) >= 3,
  },
  {
    id: 'traductor_experto',
    nombre: 'Traductor Experto',
    descripcion: 'Consigue 3 estrellas en Código genético',
    icono: '📖',
    condicion: (e) => (e.estrellasPorNivel[8] ?? 0) >= 3,
  },
  {
    id: 'mundo_1_completo',
    nombre: 'Conquistador del Núcleo',
    descripcion: 'Completa todos los niveles del Mundo 1',
    icono: '🏛️',
    condicion: (e) => [1,2,3,4,5,6,7].every(n => (e.estrellasPorNivel[n] ?? 0) >= 1),
  },
  {
    id: 'mundo_2_completo',
    nombre: 'Maestro del ARN',
    descripcion: 'Completa todos los niveles del Mundo 2',
    icono: '🧬',
    condicion: (e) => [8,9,10,11].every(n => (e.estrellasPorNivel[n] ?? 0) >= 1),
  },
  {
    id: 'mundo_3_completo',
    nombre: 'Guardián del Genoma',
    descripcion: 'Completa todos los niveles del Mundo 3',
    icono: '🛡️',
    condicion: (e) => [12,13].every(n => (e.estrellasPorNivel[n] ?? 0) >= 1),
  },
  {
    id: 'ricos',
    nombre: 'Cofre lleno',
    descripcion: 'Acumula 500 monedas',
    icono: '💰',
    condicion: (e) => e.monedas >= 500,
  },
  {
    id: '100_aciertos',
    nombre: 'Centenario',
    descripcion: 'Responde 100 preguntas correctamente',
    icono: '💯',
    condicion: (e) => e.totalAciertos >= 100,
  },
];
