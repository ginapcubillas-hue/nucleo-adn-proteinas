import type { AventuraCfg, PreguntaNPC } from '../components/juegos/Aventura';
import type { ItemClasif } from '../components/juegos/Clasificar';
import type { ModoAtrapa } from '../components/juegos/AtrapaBase';

export type JuegoNivel =
  | { tipo: 'aventura'; titulo: string; cfg: AventuraCfg }
  | { tipo: 'memoria'; titulo: string; pares: [string, string][] }
  | { tipo: 'ordenar'; titulo: string; pasos: string[] }
  | { tipo: 'atrapa'; titulo: string; modo: ModoAtrapa }
  | { tipo: 'musical'; titulo: string; preguntas: PreguntaNPC[] }
  | { tipo: 'clasificar'; titulo: string; cats: [string, string]; items: ItemClasif[] };

const q = (q: string, ops: string[], ok: number, pista: string): PreguntaNPC => ({ q, ops, ok, pista });

export const juegosPorNivel: Record<number, JuegoNivel> = {
  1: {
    tipo: 'aventura', titulo: 'Aventura: ¡Encuentra el núcleo!',
    cfg: {
      mision: 'Encuentra el núcleo de la célula', item: '🔵', itemNombre: 'el núcleo',
      npcA: { emoji: '🧑‍🔬', nombre: 'Lía', texto: 'Yo no tengo el núcleo, pero Ana, la citóloga del fondo (a la derecha), lo guarda. Cuidado: antes de dártelo te hará preguntas.' },
      npcB: { emoji: '👩‍🔬', nombre: 'Ana', intro: 'Así que buscas el núcleo. Demuéstrame que lo conoces.', preguntas: [
        q('¿Quién descubrió el núcleo y en qué año?', ['Robert Brown, 1831', 'Robert Hooke, 1665', 'Rudolf Virchow, 1855', 'Van Leeuwenhoek, 1674'], 0, 'Fue un botánico escocés en 1831.'),
        q('¿Qué forma tiene el núcleo del monocito?', ['Multilobulado', 'Arriñonado', 'Redondeado', 'Alargado'], 1, 'Piensa en un riñón.'),
        q('El neutrófilo se llama también polimorfonuclear porque su núcleo es…', ['Arriñonado', 'Ausente', 'Multilobulado', 'Doble y redondo'], 2, 'Tiene varios lóbulos.'),
      ] },
    },
  },
  2: {
    tipo: 'memoria', titulo: 'Memoria: la envoltura nuclear',
    pares: [
      ['Membrana nuclear externa', 'Continúa con el retículo endoplásmico rugoso'],
      ['Lámina nuclear', 'Red de láminas (filamentos intermedios) bajo la membrana interna'],
      ['Espacio perinuclear', 'Espacio entre las dos membranas'],
      ['Poro nuclear', 'Canal para el paso de moléculas'],
    ],
  },
  3: {
    tipo: 'aventura', titulo: 'Aventura: ¡Lleva la carga al poro!',
    cfg: {
      mision: 'Consigue la proteína con la señal de importación', item: '📦', itemNombre: 'la proteína con NLS',
      npcA: { emoji: '🧑‍🏫', nombre: 'Ramiro', texto: 'La proteína que buscas la tiene Nora, junto al poro (a la derecha). Ella te pedirá que demuestres cómo funciona el transporte.' },
      npcB: { emoji: '👩‍🏫', nombre: 'Nora', intro: 'Para pasar por el poro hay que saber cómo se transporta. A ver…', preguntas: [
        q('¿Qué secuencia de la proteína reconoce la importina?', ['NLS (señal de localización nuclear)', 'Un intrón', 'La caja TATA', 'El codón de inicio'], 0, 'Su nombre empieza por N de nuclear.'),
        q('¿Qué forma de Ran predomina dentro del núcleo?', ['Ran-GDP', 'Ran-GTP', 'Ran sin nucleótido', 'Ran-ATP'], 1, 'Ran-GTP libera la carga dentro del núcleo.'),
        q('¿Qué enzima hidroliza Ran-GTP a Ran-GDP en el citoplasma?', ['Ran-GAP', 'Ran-GEF', 'Helicasa', 'ARN polimerasa'], 0, 'GAP = proteína activadora de GTPasa.'),
      ] },
    },
  },
  4: {
    tipo: 'memoria', titulo: 'Memoria: nucleoplasma y nucléolo',
    pares: [
      ['Nucléolo', 'Sintetiza ARNr y ensambla subunidades ribosomales'],
      ['Nucleoplasma', 'Medio interno del núcleo donde está la cromatina'],
      ['ARNr', 'Componente principal de los ribosomas'],
      ['Subunidades ribosomales', 'Se ensamblan en el nucléolo y salen al citoplasma'],
    ],
  },
  5: {
    tipo: 'aventura', titulo: 'Aventura: ¡Encuentra la cromatina!',
    cfg: {
      mision: 'Recupera la muestra de cromatina', item: '🧬', itemNombre: 'la muestra de cromatina',
      npcA: { emoji: '🧑‍🎓', nombre: 'Beto', texto: 'La muestra la tiene la doctora Vera, al otro lado del laberinto (a la derecha). Prepárate para sus preguntas.' },
      npcB: { emoji: '👩‍⚕️', nombre: 'Dra. Vera', intro: 'La cromatina es mi tesoro. ¿La conoces?', preguntas: [
        q('¿Cómo es la eucromatina?', ['Laxa y activa en transcripción', 'Muy compacta e inactiva', 'Exclusiva del nucléolo', 'Sin ADN'], 0, 'Eu = "verdadera": es la zona activa.'),
        q('¿Cómo es la heterocromatina?', ['Laxa y activa', 'Condensada y poco activa', 'Solo ARN', 'Es una membrana'], 1, 'Se ve más oscura al microscopio.'),
        q('El nucleosoma está formado por ADN enrollado sobre…', ['Un octámero de histonas', 'Ribosomas', 'Lamininas', 'Un nucléolo'], 0, 'Son 8 proteínas básicas.'),
      ] },
    },
  },
  6: {
    tipo: 'ordenar', titulo: 'Ordena el empaquetamiento del ADN',
    pasos: ['Doble hélice (2 nm)', 'Nucleosoma (11 nm)', 'Fibra de 30 nm', 'Asas y dominios (300 nm)', 'Sección condensada (700 nm)', 'Cromosoma metafásico (1400 nm)'],
  },
  7: {
    tipo: 'musical', titulo: 'Laboratorio musical: Watson y Crick',
    preguntas: [
      q('¿Con qué base se aparea la adenina (A) en el ADN?', ['Timina (T)', 'Citosina (C)', 'Guanina (G)', 'Uracilo (U)'], 0, 'A–T.'),
      q('¿Con qué base se aparea la citosina (C)?', ['Adenina (A)', 'Timina (T)', 'Guanina (G)', 'Uracilo (U)'], 2, 'C–G.'),
      q('¿Cuántos puentes de hidrógeno unen C con G?', ['2', '3', '1', '4'], 1, 'Más que A–T, por eso C–G es más estable.'),
      q('¿Cómo están orientadas las dos cadenas del ADN?', ['Antiparalelas', 'Paralelas', 'Sin orientación', 'Cruzadas en X'], 0, 'Una va 5′→3′ y la otra 3′→5′.'),
    ],
  },
  8: { tipo: 'atrapa', titulo: 'Atrapa la base: transcripción', modo: 'transcripcion' },
  9: { tipo: 'atrapa', titulo: 'Atrapa la base: anticodón del ARNt', modo: 'anticodon' },
  10: {
    tipo: 'ordenar', titulo: 'Ordena las etapas de la traducción',
    pasos: ['Activación del ARNt', 'Iniciación', 'Elongación', 'Terminación'],
  },
  11: {
    tipo: 'clasificar', titulo: 'Clasifica: procariota o eucariota', cats: ['Procariota', 'Eucariota'],
    items: [
      { txt: 'ADN circular en el nucleoide', cat: 0, porque: 'No tienen núcleo: su ADN está en el nucleoide.' },
      { txt: 'Núcleo rodeado por envoltura', cat: 1, porque: 'Eucariota significa "núcleo verdadero".' },
      { txt: 'Ribosomas 70S', cat: 0, porque: 'Los procariotas tienen ribosomas 70S (los eucariotas, 80S).' },
      { txt: 'Ribosomas 80S en el citoplasma', cat: 1, porque: 'Los 80S son eucariotas.' },
      { txt: 'Transcripción y traducción casi simultáneas', cat: 0, porque: 'Sin núcleo, el ARNm se traduce mientras se transcribe.' },
      { txt: 'Intrones y splicing', cat: 1, porque: 'El procesamiento del ARNm ocurre en eucariotas.' },
      { txt: 'Elongación con EF1α y EF2', cat: 1, porque: 'EF-Tu y EF-G son los factores procariotas.' },
      { txt: 'Elongación con EF-Tu y EF-G', cat: 0, porque: 'EF1α y EF2 son los eucariotas.' },
    ],
  },
  12: {
    tipo: 'clasificar', titulo: 'Clasifica la mutación', cats: ['Cambia la proteína', 'No la cambia'],
    items: [
      { txt: 'Mutación silenciosa (el nuevo codón codifica el mismo aminoácido)', cat: 1, porque: 'El código es degenerado: varios codones dan el mismo aminoácido.' },
      { txt: 'Mutación de cambio de sentido (se cambia un aminoácido)', cat: 0, porque: 'Cambia un aminoácido en la proteína.' },
      { txt: 'Mutación sin sentido (aparece un codón de parada)', cat: 0, porque: 'La proteína se corta antes de tiempo.' },
      { txt: 'Deleción de 1 base (cambio del marco de lectura)', cat: 0, porque: 'Desplaza la lectura de todos los codones siguientes.' },
      { txt: 'UUU → UUC (ambos codifican Phe)', cat: 1, porque: 'Mismo aminoácido: mutación silenciosa.' },
      { txt: 'GAG → GUG (Glu → Val)', cat: 0, porque: 'Cambia el aminoácido; es la mutación de la anemia falciforme.' },
    ],
  },
  13: {
    tipo: 'memoria', titulo: 'Memoria: mutaciones cromosómicas',
    pares: [
      ['Deleción', 'Se pierde un segmento del cromosoma'],
      ['Duplicación', 'Un segmento se repite'],
      ['Inversión', 'Un segmento gira 180° y se reinserta'],
      ['Translocación', 'Un segmento pasa a otro cromosoma'],
    ],
  },
};
