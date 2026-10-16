export interface SeccionContenido {
  nivel: number;
  titulo: string;
  puntos: string[];
  discusion?: { pregunta: string; respuesta: string }[];
}

export const contenido: SeccionContenido[] = [
  {
    nivel: 1,
    titulo: 'Núcleo y morfología',
    puntos: [
      'Descubierto por Robert Brown en 1831; visible al microscopio óptico.',
      'Diámetro ~6 µm; forma y número varían según el tipo celular.',
      'Epiteliales (vesícula biliar): redondeados u ovalados; monocito: arriñonado; neutrófilo: multilobulado; muscular esquelética: multinucleada con núcleos periféricos.',
      'Componentes del núcleo interfásico: carioteca/envoltura nuclear, nucleoplasma, nucléolo y cromatina.',
    ],
    discusion: [
      {
        pregunta: '¿Por qué la heterocromatina se ubica en la periferia y no se expresa?',
        respuesta: 'Es la zona más alejada de la maquinaria de transcripción activa; al estar condensada, el ADN no es accesible a las enzimas que lo leen.',
      },
      {
        pregunta: '¿Qué componentes tiene el nucleosoma?',
        respuesta: 'Octámero de histonas (2 copias de H2A, H2B, H3 y H4), ADN enrollado ~1.8 vueltas (146 pb) y ADN de unión o "linker".',
      },
      {
        pregunta: '¿Diferencia entre carioteca y envoltura nuclear?',
        respuesta: 'Ninguna, son sinónimos.',
      },
    ],
  },
  {
    nivel: 2,
    titulo: 'Envoltura nuclear',
    puntos: [
      'Doble membrana con espacio perinuclear; la externa es continua con el RER y puede tener ribosomas.',
      'La interna se asocia a la lámina y la cromatina; los complejos LINC conectan con el citoesqueleto.',
      'Lámina nuclear: filamentos intermedios (láminas A, B y C) que dan forma, soporte y anclaje a la cromatina.',
      'Laminopatías (mutaciones en LMNA): distrofia muscular, lipodistrofia, neuropatías y progeria de Hutchinson-Gilford (progerina).',
      'Carioteca y envoltura nuclear son sinónimos.',
    ],
  },
  {
    nivel: 3,
    titulo: 'Poro nuclear y transporte',
    puntos: [
      'NPC de ~120 nm y ~125 000 kDa, formado por nucleoporinas.',
      'Partes: filamentos citoplásmicos, anillo citoplásmico, anillo nuclear, andamiaje central, conducto central y canasta nuclear.',
      'Nucleoporinas con dominios FG (fenilalanina-glicina) forman una malla hidrófoba.',
      'Difusión pasiva: moléculas pequeñas (corte ~60 kDa). Transporte activo: macromoléculas >60 kDa mediante carioferinas.',
      'Importinas meten; exportinas sacan. Se importan: proteínas para ribosomas, factores de transcripción, de empalme, histonas, ADN y ARN polimerasas. Se exportan: subunidades ribosomales, ARNm, ARNt.',
      'Ran-GTP abunda en el núcleo y Ran-GDP en el citoplasma → da direccionalidad.',
      'RCC1 cambia GDP→GTP dentro del núcleo; Ran-GAP hidroliza GTP→GDP en el citoplasma.',
    ],
  },
  {
    nivel: 4,
    titulo: 'Nucleoplasma y nucléolo',
    puntos: [
      'Nucleoplasma: medio acuoso con agua, iones, nucleótidos, enzimas, factores de transcripción y de empalme, y una matriz proteica de sostén.',
      'Nucléolo: región densa sin membrana donde se sintetiza el ARNr y se ensamblan las subunidades ribosomales.',
      'Organizado alrededor de las NOR (regiones organizadoras nucleolares, con los genes de ARNr).',
      'Centro fibrilar (CF): genes de ARNr, se transcriben, no se traducen.',
      'Componente fibrilar denso (CFD): procesamiento inicial del ARNr.',
      'Componente granular (CG): procesamiento final y ensamblaje de subunidades.',
      'Nucléolo procesa los ARNr 28S, 18S y 5.8S; el 5S se sintetiza fuera del nucléolo.',
      'Proteínas ribosomales se sintetizan en el citoplasma y se importan; subunidades grande (28S, 5.8S, 5S) y pequeña (18S) se exportan.',
      'S = Svedberg (coeficiente de sedimentación).',
    ],
  },
  {
    nivel: 5,
    titulo: 'Cromatina',
    puntos: [
      'ADN + proteínas (histonas y no histónicas).',
      'Nucleosoma = unidad de empaquetamiento (octámero de histonas con ADN enrollado).',
      'Eucromatina: menos condensada, se expresa, zona interna, clara.',
      'Heterocromatina: más condensada, no se expresa, periférica, oscura.',
      'Un núcleo muy activo tiene predominio de eucromatina.',
      'Heterocromatina facultativa (80-90%): puede descondensarse (ej. X inactivo/corpúsculo de Barr).',
      'Heterocromatina constitutiva (10-20%): siempre condensada, ADN satélite (ej. telómeros y centrómeros).',
    ],
  },
  {
    nivel: 6,
    titulo: 'Del ADN al cromosoma',
    puntos: [
      '1. Doble hélice 2 nm.',
      '2. Nucleosoma "collar de cuentas" 11 nm (~1.8 vueltas, 146 pb, octámero 2×H2A, H2B, H3, H4, ADN de unión).',
      '3. Fibra de cromatina 30 nm (con histona H1).',
      '4. Asas y dominios 300 nm (cromosoma activo en interfase).',
      '5. Sección condensada 700 nm.',
      '6. Cromosoma metafásico 1400 nm.',
      'Idea clave: a mayor empaquetamiento, menor accesibilidad a la maquinaria de transcripción y menor expresión génica.',
    ],
  },
  {
    nivel: 7,
    titulo: 'ADN y Watson-Crick',
    puntos: [
      'Polímero de nucleótidos (fosfato + desoxirribosa + base nitrogenada).',
      'Bases A, T, C, G (A y G purinas de dos anillos; C y T pirimidinas de un anillo).',
      'Columna de azúcar-fosfato con bases hacia el interior.',
      'Puentes de hidrógeno: A–T (2) y G–C (3).',
      'Modelo de Watson y Crick: Nature, 1953; Nobel 1962 (con Maurice Wilkins).',
      'Doble hélice antiparalela (5′→3′ y 3′→5′), giro a la derecha.',
      'La complementariedad sugiere el mecanismo de copia.',
    ],
  },
  {
    nivel: 8,
    titulo: 'Código genético',
    puntos: [
      'Conjunto de reglas que define cómo una secuencia de nucleótidos del ARNm se traduce en aminoácidos.',
      'Cada triplete del ARNm es un codón; el triplete complementario del ARNt es el anticodón.',
      'Casi universal, no superpuesto, degenerado.',
      'Codones STOP: UAA, UAG, UGA. Codón de inicio: AUG (Met).',
      'Solo Met (AUG) y Trp (UGG) tienen un único codón.',
      '4 × 4 × 4 = 64 codones posibles. Se leen siempre 5′→3′.',
      'Agrupado por similitud química: un cambio de base tiene menos probabilidad de alterar radicalmente la proteína.',
    ],
  },
  {
    nivel: 9,
    titulo: 'ARN de transferencia (ARNt)',
    puntos: [
      'Molécula adaptadora: conecta el lenguaje de los nucleótidos con el de los aminoácidos.',
      'Forma de trébol con tres brazos y un extremo libre.',
      'Brazo aceptor: extremo 3′, secuencia CCA; ahí se engancha el aminoácido.',
      'Brazo D: dihidrouridina; reconocimiento por la aminoacil-ARNt sintetasa.',
      'Brazo T: ribotimidina y pseudouridina; acoplamiento al ribosoma.',
      'Brazo del anticodón: expone el anticodón que se aparea con el codón del ARNm.',
      'Brazo variable (V): mayor variabilidad (4 a 21 nucleótidos).',
      'Bases modificadas: seudouridina (ψ), ribotimidina (T), dihidrouridina (D), inosina (I), metilinosina (mI), metilguanosina (meG, me2G).',
      'Hipótesis del bamboleo (wobble): la tercera base del codón es flexible; un mismo ARNt puede reconocer más de un codón sinónimo.',
    ],
  },
  {
    nivel: 10,
    titulo: 'Etapas de la traducción',
    puntos: [
      'Etapa 1 - Activación del ARNt: aminoacil-ARNt sintetasa une aminoácido a ARNt con gasto de ATP. Intermedio: aminoacil-AMP.',
      'Etapa 2 - Iniciación: subunidad pequeña se une al AUG, entra ARNt iniciador, se une subunidad grande. ARNt iniciador en sitio P.',
      'Etapa 3 - Elongación: aa-ARNt entra al sitio A, peptidil transferasa forma enlace peptídico, translocación, ARNt vacío sale por E.',
      'Sitios: E = salida, P = peptidil, A = aminoacil.',
      'Etapa 4 - Terminación: codón STOP en sitio A; factor de liberación transfiere cadena al agua; subunidades se separan.',
      'Procariotas: EF-Tu-GTP lleva aa-ARNt, EF-G-GTP transloca. Eucariotas: EF1α y EF2.',
      'La peptidil transferasa es actividad del ARNr (ribozima).',
    ],
    discusion: [
      {
        pregunta: '¿Cómo reconoce la célula dónde iniciar y finalizar la síntesis de una proteína?',
        respuesta: 'El inicio lo marca AUG (Met), reconocido por el ARNt iniciador: en procariotas por complementariedad ARNr–ARNm en la 30S y en eucariotas por el rastreo hasta la secuencia Kozak. El final lo marcan los codones STOP, reconocidos por factores de liberación (RF o eRF1/eRF3).',
      },
      {
        pregunta: '¿Qué consecuencias tendría el cambio de un aminoácido?',
        respuesta: 'Puede alterar la estructura y función de la proteína según su posición y cuán distinto sea el nuevo aminoácido. Ejemplo: Glu por Val en la hemoglobina de la anemia falciforme.',
      },
      {
        pregunta: '¿Habrá alguna mutación "silenciosa"?',
        respuesta: 'Sí. Por la degeneración del código, una sustitución (sobre todo en la tercera base) puede dar un codón sinónimo y la proteína no cambia; por ejemplo UAC → UAU, ambos Tyr.',
      },
      {
        pregunta: '¿Cuántos aminoácidos tendría una proteína sintetizada a partir de un ARNm de 3748 codones?',
        respuesta: '3747, porque el último codón es STOP y no codifica aminoácido.',
      },
    ],
  },
  {
    nivel: 11,
    titulo: 'Procariotas vs. eucariotas',
    puntos: [
      'Ribosoma: 70S (30S + 50S) | 80S (40S + 60S).',
      'Aminoácido inicial: formilmetionina (fMet) | metionina (Met).',
      'Factores de iniciación: IF1, IF2, IF3 | eIF (eIF2, eIF3, eIF4F, eIF5…).',
      'Reconocimiento del inicio: complementariedad ARNr–ARNm | secuencia Kozak (ACCAUGC).',
      'Elongación: EF-Tu y EF-G | EF1α y EF2.',
      'Terminación: RF, EF-G y RRF | eRF1 y eRF3.',
      'Localización: sin núcleo, traducción mientras se transcribe | ARNm maduro sale del núcleo antes.',
      'Extremos del ARNm: sin caperuza | caperuza 5′ (m7Gppp) reconocida por eIF4F.',
      'Reciclaje: RRF y EF-G liberan 50S, IF3 se une a 30S | 40S y 60S con eIF3 y eIF6.',
    ],
  },
  {
    nivel: 12,
    titulo: 'Mutaciones génicas',
    puntos: [
      'Mutación: cambio heredable en la secuencia del genoma.',
      'Clasificación por localización: génicas / cromosómicas. Por origen: espontáneas / inducidas. Por estirpe: somática / germinal. Por efecto: deletéreas / letales. Por expresión: condicionales / no condicionales. Por cambio bioquímico: pérdida de función, hipomórfica, hipermórfica, ganancia de función.',
      'Sustitución de un nucleótido: silenciosa, cambio de sentido (missense), sin sentido (nonsense).',
      'Inserciones/deleciones que no son múltiplos de tres → desplazan el marco de lectura.',
      'Mutación puntual: sustitución de un solo par de nucleótidos.',
      'Ejemplo: anemia falciforme, cambio de Glu por Val en la hemoglobina.',
      'Ejemplo: fibrosis quística, pérdida de función (la proteína no transporta bien el cloro).',
      'Ejemplo: ganancia de función, un gen que controla la división celular muta y la activa sin control → cáncer.',
    ],
    discusion: [
      {
        pregunta: '¿Qué consecuencias tienen las mutaciones?',
        respuesta: 'Van desde ninguna (silenciosas) hasta pérdida o ganancia de función, cambio del marco de lectura o proteínas truncadas. A escala cromosómica, síndromes como cri-du-chat o neoplasias como la leucemia mielógena crónica. Las germinales se heredan; las somáticas afectan al individuo.',
      },
      {
        pregunta: '¿Por qué el código es casi universal y degenerado?',
        respuesta: 'Casi universal porque es igual en casi todos los seres vivos con pocas excepciones; degenerado porque varios codones codifican el mismo aminoácido.',
      },
    ],
  },
  {
    nivel: 13,
    titulo: 'Mutaciones cromosómicas',
    puntos: [
      'Afectan segmentos grandes de ADN; pueden ser estructurales o numéricas.',
      'Estructurales: deleción (pierde segmento), duplicación (repite segmento), inversión (gira 180° dentro del mismo cromosoma), translocación (intercambio entre cromosomas distintos).',
      'Numéricas: haploidía, poliploidía (3n, 4n, 5n…), aneuploidía (2n ± x).',
      'Monosomía 2n−1; trisomía 2n+1; tetrasomía 2n+2…',
      'Euploidía = múltiplos de n; diploidía 2n; triploidía 3n; tetraploidía 4n.',
      'Autopoliploidía = múltiplos del mismo genoma; alopoliploidía (anfidiploidía) = múltiplos de genomas diferentes.',
      'Cri-du-chat: deleción 5p, llanto agudo, rasgos faciales característicos, retraso del desarrollo.',
      'Cromosoma Filadelfia: t(9;22), fusión BCR::ABL, leucemia mielógena crónica.',
    ],
  },
];

export function getContenido(nivel: number): SeccionContenido | undefined {
  return contenido.find(c => c.nivel === nivel);
}

export interface ComparativaFila {
  caracteristica: string;
  procariota: string;
  eucariota: string;
}

export const comparativaProcEuc: ComparativaFila[] = [
  { caracteristica: 'Ribosoma', procariota: '70S (30S + 50S)', eucariota: '80S (40S + 60S)' },
  { caracteristica: 'Aminoácido inicial', procariota: 'Formilmetionina (fMet)', eucariota: 'Metionina (Met)' },
  { caracteristica: 'Factores de iniciación', procariota: 'IF1, IF2, IF3', eucariota: 'eIF (eIF2, eIF3, eIF4F, eIF5…)' },
  { caracteristica: 'Reconocimiento del inicio', procariota: '30S se une al AUG por complementariedad ARNr–ARNm', eucariota: 'Rastreo del ARNm hasta la secuencia Kozak (ACCAUGC)' },
  { caracteristica: 'Elongación', procariota: 'EF-Tu y EF-G', eucariota: 'EF1α y EF2 (translocasa)' },
  { caracteristica: 'Terminación', procariota: 'RF, EF-G y RRF', eucariota: 'eRF1 y eRF3' },
  { caracteristica: 'Localización', procariota: 'Sin núcleo, el ARNm se traduce mientras se transcribe', eucariota: 'El ARNm maduro sale del núcleo antes de traducirse' },
  { caracteristica: 'ARNt iniciador', procariota: 'IF2-GTP lleva fMet-ARNt', eucariota: 'eIF2-GTP lleva Met-ARNt a la 40S' },
  { caracteristica: 'Extremos del ARNm', procariota: 'Sin caperuza, se ancla a la 30S por complementariedad', eucariota: 'Caperuza 5′ (m7Gppp) reconocida por eIF4F' },
  { caracteristica: 'Reciclaje de subunidades', procariota: 'RRF y EF-G liberan la 50S, IF3 se une a la 30S', eucariota: '40S y 60S se reciclan con eIF3 y eIF6' },
];

export interface PasoRan {
  paso: number;
  texto: string;
  cito: boolean;
}

export const pasosImportacion: PasoRan[] = [
  { paso: 1, texto: 'Ran-GDP abunda en el citoplasma y Ran-GTP en el núcleo, lo que da direccionalidad.', cito: true },
  { paso: 2, texto: 'La proteína con señal NLS forma un complejo con importina α e importina β.', cito: true },
  { paso: 3, texto: 'El complejo atraviesa el poro.', cito: true },
  { paso: 4, texto: 'En el núcleo, Ran-GTP se une a importina β y libera importina α y la carga.', cito: false },
  { paso: 5, texto: 'El complejo Ran-GTP/importina β sale al citoplasma.', cito: true },
  { paso: 6, texto: 'Ran-GAP hidroliza GTP→GDP, libera importina β y el ciclo se reinicia.', cito: true },
];

export const pasosExportacion: PasoRan[] = [
  { paso: 1, texto: 'En el núcleo, la exportina (Crm1) reconoce la señal NES y se une a Ran-GTP.', cito: false },
  { paso: 2, texto: 'El complejo cruza el poro interactuando con las FG-nucleoporinas.', cito: true },
  { paso: 3, texto: 'En el citoplasma, Ran-GAP hidroliza el GTP y el complejo se disocia.', cito: true },
  { paso: 4, texto: 'Ran-GDP y la exportina regresan al núcleo.', cito: false },
];

export interface NivelEmpaquetamiento {
  nivel: number;
  nombre: string;
  tamano: string;
}

export const nivelesEmpaquetamiento: NivelEmpaquetamiento[] = [
  { nivel: 1, nombre: 'Doble hélice', tamano: '2 nm' },
  { nivel: 2, nombre: 'Nucleosoma (collar de cuentas)', tamano: '11 nm' },
  { nivel: 3, nombre: 'Fibra de cromatina', tamano: '30 nm' },
  { nivel: 4, nombre: 'Asas y dominios', tamano: '300 nm' },
  { nivel: 5, nombre: 'Sección condensada', tamano: '700 nm' },
  { nivel: 6, nombre: 'Cromosoma metafásico', tamano: '1400 nm' },
];
