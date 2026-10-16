export type TipoPregunta = 'opcion' | 'vf' | 'completar' | 'relacionar' | 'ordenar' | 'abierta';

export interface PreguntaRelacion {
  izquierda: string;
  derecha: string;
}

export interface Pregunta {
  id: string;
  nivel: number;
  tipo: TipoPregunta;
  enunciado: string;
  opciones?: string[];
  correcta?: number | string;
  relaciones?: PreguntaRelacion[];
  ordenCorrecto?: string[];
  respuestaModelo?: string;
  dificultad: 1 | 2 | 3;
  explicacion: string;
}

export const preguntas: Pregunta[] = [
  // NIVEL 1 - Núcleo y morfología
  { id: '1_1', nivel: 1, tipo: 'opcion', enunciado: '¿Quién descubrió el núcleo y en qué año?', opciones: ['Robert Brown, 1831', 'Robert Hooke, 1665', 'Rudolf Virchow, 1855', 'Antonie van Leeuwenhoek, 1674'], correcta: 0, dificultad: 1, explicacion: 'Robert Brown lo describió en 1831 observándolo al microscopio óptico.' },
  { id: '1_2', nivel: 1, tipo: 'opcion', enunciado: '¿Qué forma tiene el núcleo del monocito?', opciones: ['Arriñonado', 'Multilobulado', 'Redondeado', 'Alargado'], correcta: 0, dificultad: 1, explicacion: 'El monocito tiene núcleo en forma de riñón; el del neutrófilo es multilobulado.' },
  { id: '1_3', nivel: 1, tipo: 'vf', enunciado: 'El neutrófilo tiene núcleo multilobulado.', correcta: 'Verdadero', dificultad: 1, explicacion: 'Por eso también se le llama polimorfonuclear.' },
  { id: '1_4', nivel: 1, tipo: 'opcion', enunciado: 'La célula muscular esquelética se caracteriza por ser…', opciones: ['Multinucleada, con núcleos en la periferia', 'Sin núcleo', 'Uninucleada con núcleo central', 'Bimucleada'], correcta: 0, dificultad: 2, explicacion: 'Sus núcleos se desplazan a la periferia, junto a la membrana.' },
  { id: '1_5', nivel: 1, tipo: 'completar', enunciado: 'El diámetro promedio del núcleo es de aproximadamente ___ µm.', correcta: '6', dificultad: 1, explicacion: 'Unos 6 µm, aunque varía según el tipo celular.' },
  { id: '1_6', nivel: 1, tipo: 'opcion', enunciado: '¿Cuál NO es un componente del núcleo interfásico?', opciones: ['Aparato de Golgi', 'Carioteca', 'Nucleoplasma', 'Nucléolo'], correcta: 0, dificultad: 2, explicacion: 'Los cuatro componentes son carioteca, nucleoplasma, nucléolo y cromatina.' },
  { id: '1_7', nivel: 1, tipo: 'vf', enunciado: 'El núcleo es visible al microscopio óptico.', correcta: 'Verdadero', dificultad: 1, explicacion: 'Brown lo vio al microscopio óptico en 1831.' },
  { id: '1_8', nivel: 1, tipo: 'opcion', enunciado: '¿Qué forma tiene el núcleo de las células epiteliales de la vesícula biliar?', opciones: ['Redondeado u ovalado', 'Arriñonado', 'Multilobulado', 'Anillo'], correcta: 0, dificultad: 2, explicacion: 'Las epiteliales tienen núcleos redondeados u ovalados.' },
  { id: '1_9', nivel: 1, tipo: 'opcion', enunciado: '¿Qué significa que el neutrófilo sea polimorfonuclear?', opciones: ['Su núcleo tiene varios lóbulos', 'Tiene varios núcleos', 'No tiene núcleo', 'Su núcleo es redondo'], correcta: 0, dificultad: 2, explicacion: 'El núcleo del neutrófilo es multilobulado, por eso se llama polimorfonuclear.' },
  { id: '1_10', nivel: 1, tipo: 'vf', enunciado: 'La célula muscular esquelética tiene un solo núcleo central.', correcta: 'Falso', dificultad: 2, explicacion: 'Es multinucleada y los núcleos están en la periferia.' },
  { id: '1_11', nivel: 1, tipo: 'completar', enunciado: 'Los cuatro componentes del núcleo interfásico son carioteca, nucleoplasma, nucléolo y ___.', correcta: 'cromatina', dificultad: 2, explicacion: 'Cromatina es el cuarto componente del núcleo interfásico.' },
  { id: '1_12', nivel: 1, tipo: 'abierta', enunciado: '¿Por qué la heterocromatina se ubica en la periferia y no se expresa?', respuestaModelo: 'Es la zona más alejada de la maquinaria de transcripción activa; al estar condensada, el ADN no es accesible a las enzimas que lo leen.', dificultad: 3, explicacion: 'Es la zona más alejada de la maquinaria de transcripción activa; al estar condensada, el ADN no es accesible a las enzimas que lo leen.' },

  // NIVEL 2 - Envoltura nuclear
  { id: '2_1', nivel: 2, tipo: 'opcion', enunciado: 'La membrana nuclear externa es continua con…', opciones: ['El retículo endoplasmático rugoso', 'El aparato de Golgi', 'La membrana plasmática', 'Las mitocondrias'], correcta: 0, dificultad: 1, explicacion: 'Por eso puede tener ribosomas adheridos.' },
  { id: '2_2', nivel: 2, tipo: 'vf', enunciado: 'La lámina nuclear está formada por filamentos intermedios (láminas A, B y C).', correcta: 'Verdadero', dificultad: 2, explicacion: 'Da forma al núcleo y ancla la cromatina.' },
  { id: '2_3', nivel: 2, tipo: 'opcion', enunciado: 'Los complejos LINC conectan la envoltura nuclear con…', opciones: ['El citoesqueleto citoplasmático', 'El nucléolo', 'El RER liso', 'Las mitocondrias'], correcta: 0, dificultad: 2, explicacion: 'LINC es el puente entre el núcleo y el citoesqueleto.' },
  { id: '2_4', nivel: 2, tipo: 'opcion', enunciado: 'En el síndrome de Hutchinson-Gilford se produce una proteína truncada llamada…', opciones: ['Progerina', 'Lamina A', 'Distrofina', 'Colágeno'], correcta: 0, dificultad: 2, explicacion: 'La progerina deforma el núcleo y causa envejecimiento prematuro; la mutación está en LMNA.' },
  { id: '2_5', nivel: 2, tipo: 'vf', enunciado: 'Carioteca y envoltura nuclear son estructuras diferentes.', correcta: 'Falso', dificultad: 1, explicacion: 'Son sinónimos: nombran la misma estructura.' },
  { id: '2_6', nivel: 2, tipo: 'completar', enunciado: 'El espacio entre las dos membranas nucleares se llama espacio ___.', correcta: 'perinuclear', dificultad: 2, explicacion: 'También se le llama intermembranoso.' },
  { id: '2_7', nivel: 2, tipo: 'opcion', enunciado: '¿Qué membrana nuclear se asocia a la lámina y la cromatina?', opciones: ['La interna', 'La externa', 'Ambas por igual', 'Ninguna'], correcta: 0, dificultad: 2, explicacion: 'La membrana interna contacta con la lámina y la cromatina.' },
  { id: '2_8', nivel: 2, tipo: 'opcion', enunciado: '¿Qué mutación genética causa la progeria de Hutchinson-Gilford?', opciones: ['LMNA', 'LMNB', 'FMR1', 'DMD'], correcta: 0, dificultad: 3, explicacion: 'La mutación en LMNA produce progerina, que causa envejecimiento prematuro.' },
  { id: '2_9', nivel: 2, tipo: 'vf', enunciado: 'La membrana nuclear externa puede tener ribosomas adheridos.', correcta: 'Verdadero', dificultad: 2, explicacion: 'Porque es continua con el retículo endoplasmático rugoso.' },
  { id: '2_10', nivel: 2, tipo: 'opcion', enunciado: 'Las laminopatías incluyen todas EXCEPTO:', opciones: ['Diabetes tipo 1', 'Distrofia muscular', 'Lipodistrofia', 'Progeria'], correcta: 0, dificultad: 3, explicacion: 'Las laminopatías son distrofia muscular, lipodistrofia, neuropatías y progeria.' },
  { id: '2_11', nivel: 2, tipo: 'vf', enunciado: 'La lámina nuclear da forma y soporte al núcleo.', correcta: 'Verdadero', dificultad: 1, explicacion: 'Además ancla la cromatina.' },
  { id: '2_12', nivel: 2, tipo: 'completar', enunciado: 'Las láminas A, B y C son filamentos ___.', correcta: 'intermedios', dificultad: 2, explicacion: 'Son filamentos intermedios que forman la lámina nuclear.' },

  // NIVEL 3 - Poro y transporte
  { id: '3_1', nivel: 3, tipo: 'opcion', enunciado: 'Las moléculas que pasan por difusión pasiva son…', opciones: ['Pequeñas (por debajo de ~60 kDa)', 'Grandes (>60 kDa)', 'Solo proteínas', 'Solo ARN'], correcta: 0, dificultad: 1, explicacion: 'Las más grandes necesitan transporte activo.' },
  { id: '3_2', nivel: 3, tipo: 'opcion', enunciado: 'Las importinas…', opciones: ['Meten carga al núcleo', 'Sacan carga del núcleo', 'Degradan proteínas', 'Sintetizan ARN'], correcta: 0, dificultad: 1, explicacion: 'Las exportinas son las que sacan carga.' },
  { id: '3_3', nivel: 3, tipo: 'opcion', enunciado: '¿Qué forma de Ran abunda en el núcleo?', opciones: ['Ran-GTP', 'Ran-GDP', 'Ran-AMP', 'Ran-ADP'], correcta: 0, dificultad: 2, explicacion: 'Ran-GDP está en el citoplasma; ese gradiente da dirección al transporte.' },
  { id: '3_4', nivel: 3, tipo: 'ordenar', enunciado: 'Ordena la importación:', ordenCorrecto: ['Ran-GDP en citoplasma / Ran-GTP en núcleo', 'NLS forma complejo con importina α y β', 'El complejo atraviesa el poro', 'Ran-GTP se une a importina β y libera la carga', 'Ran-GTP/importina β sale al citoplasma', 'Ran-GAP hidroliza GTP→GDP'], dificultad: 3, explicacion: 'Recuerda: la carga entra, Ran-GTP la suelta y Ran-GAP reinicia el ciclo.' },
  { id: '3_5', nivel: 3, tipo: 'opcion', enunciado: '¿Qué proteína cambia GDP a GTP dentro del núcleo?', opciones: ['RCC1', 'Ran-GAP', 'Importina α', 'Exportina'], correcta: 0, dificultad: 3, explicacion: 'RCC1 mantiene alto el Ran-GTP nuclear.' },
  { id: '3_6', nivel: 3, tipo: 'relacionar', enunciado: 'Relaciona cada molécula con su dirección de transporte:', relaciones: [
    { izquierda: 'Histonas', derecha: 'Se importan' },
    { izquierda: 'ARNm', derecha: 'Se exporta' },
    { izquierda: 'Subunidades ribosomales', derecha: 'Se exportan' },
    { izquierda: 'Factores de empalme', derecha: 'Se importan' },
  ], dificultad: 2, explicacion: 'Lo que el núcleo necesita entra; lo que el citoplasma necesita sale.' },
  { id: '3_7', nivel: 3, tipo: 'opcion', enunciado: '¿Dónde hidroliza el GTP la Ran-GAP?', opciones: ['En el citoplasma', 'En el núcleo', 'En el poro', 'En el nucléolo'], correcta: 0, dificultad: 3, explicacion: 'Allí libera la importina β para reiniciar el ciclo.' },
  { id: '3_8', nivel: 3, tipo: 'opcion', enunciado: 'FG en las nucleoporinas significa…', opciones: ['Fenilalanina-Glicina', 'Fosfatasa-Guanina', 'Factor de Crecimiento', 'Fenilalanina-Glutamina'], correcta: 0, dificultad: 2, explicacion: 'Forman una malla hidrófoba en el conducto del poro.' },
  { id: '3_9', nivel: 3, tipo: 'vf', enunciado: 'El transporte activo requiere carioferinas.', correcta: 'Verdadero', dificultad: 1, explicacion: 'Las carioferinas (importinas y exportinas) median el transporte activo.' },
  { id: '3_10', nivel: 3, tipo: 'completar', enunciado: 'El tamaño aproximado del NPC es de ___ nm.', correcta: '120', dificultad: 3, explicacion: 'El NPC mide ~120 nm y ~125 000 kDa.' },
  { id: '3_11', nivel: 3, tipo: 'opcion', enunciado: '¿Qué se importa al núcleo?', opciones: ['Factores de transcripción', 'ARNm maduro', 'Subunidades ribosomales', 'ARNt'], correcta: 0, dificultad: 2, explicacion: 'Los factores de transcripción, histonas y polimerasas se importan; ARNm y ribosomas se exportan.' },
  { id: '3_12', nivel: 3, tipo: 'vf', enunciado: 'Si los poros nucleares se bloquean, la célula no puede importar factores ni exportar ARNm.', correcta: 'Verdadero', dificultad: 3, explicacion: 'El transporte por el NPC es esencial para la vida celular.' },

  // NIVEL 4 - Nucleoplasma y nucléolo
  { id: '4_1', nivel: 4, tipo: 'opcion', enunciado: '¿Dónde se transcriben los genes del ARNr?', opciones: ['Centro fibrilar (CF)', 'Componente granular (CG)', 'Cromatina periférica', 'Nucleoplasma'], correcta: 0, dificultad: 2, explicacion: 'Ahí se transcriben, no se traducen.' },
  { id: '4_2', nivel: 4, tipo: 'opcion', enunciado: 'El componente fibrilar denso (CFD) se encarga de…', opciones: ['El procesamiento inicial del ARNr', 'La transcripción del ADN', 'El ensamblaje de ribosomas', 'La exportación de ARNm'], correcta: 0, dificultad: 2, explicacion: 'Procesa por primera vez el ARNr recién transcrito.' },
  { id: '4_3', nivel: 4, tipo: 'opcion', enunciado: 'El ensamblaje de las subunidades ribosomales ocurre principalmente en…', opciones: ['El componente granular (CG)', 'El centro fibrilar', 'El nucleoplasma', 'El citoplasma'], correcta: 0, dificultad: 2, explicacion: 'Ahí el ARNr se une a las proteínas ribosomales importadas.' },
  { id: '4_4', nivel: 4, tipo: 'completar', enunciado: 'Las regiones que contienen los genes de ARNr se llaman ___ (siglas).', correcta: 'NOR', dificultad: 2, explicacion: 'NOR = regiones organizadoras nucleolares. El nucléolo se organiza alrededor de ellas.' },
  { id: '4_5', nivel: 4, tipo: 'opcion', enunciado: '¿Qué ARNr se sintetiza fuera del nucléolo?', opciones: ['5S', '18S', '28S', '5.8S'], correcta: 0, dificultad: 3, explicacion: 'El 5S se sintetiza fuera del nucléolo y luego llega para ensamblarse.' },
  { id: '4_6', nivel: 4, tipo: 'opcion', enunciado: 'La subunidad ribosomal pequeña contiene el ARNr…', opciones: ['18S', '28S', '5.8S', '5S'], correcta: 0, dificultad: 2, explicacion: 'La grande lleva 28S, 5.8S y 5S.' },
  { id: '4_7', nivel: 4, tipo: 'vf', enunciado: 'El nucléolo está rodeado por una membrana.', correcta: 'Falso', dificultad: 1, explicacion: 'Es una región densa sin membrana.' },
  { id: '4_8', nivel: 4, tipo: 'opcion', enunciado: '¿Dónde se sintetizan las proteínas ribosomales?', opciones: ['En el citoplasma', 'En el nucléolo', 'En el centro fibrilar', 'En la lámina'], correcta: 0, dificultad: 2, explicacion: 'Luego se importan al núcleo por los poros.' },
  { id: '4_9', nivel: 4, tipo: 'opcion', enunciado: '¿Qué significa S en 18S, 28S?', opciones: ['Svedberg (coeficiente de sedimentación)', 'Síntesis', 'Secuencia', 'Suspendido'], correcta: 0, dificultad: 2, explicacion: 'Solo identifica cada ARNr por su velocidad de sedimentación.' },
  { id: '4_10', nivel: 4, tipo: 'vf', enunciado: 'El nucleoplasma contiene agua, iones, nucleótidos, enzimas y factores de transcripción.', correcta: 'Verdadero', dificultad: 2, explicacion: 'También factores de empalme y una matriz proteica de sostén.' },
  { id: '4_11', nivel: 4, tipo: 'completar', enunciado: 'La subunidad ribosomal grande contiene los ARNr 28S, 5.8S y ___S.', correcta: '5', dificultad: 3, explicacion: 'La subunidad grande lleva 28S, 5.8S y 5S.' },
  { id: '4_12', nivel: 4, tipo: 'opcion', enunciado: 'El nucléolo es la fábrica de…', opciones: ['Ribosomas', 'Mitocondrias', 'Lisosomas', 'Peroxíferos'], correcta: 0, dificultad: 1, explicacion: 'Aquí se hace el ARNr y se ensamblan las subunidades ribosomales.' },

  // NIVEL 5 - Cromatina
  { id: '5_1', nivel: 5, tipo: 'opcion', enunciado: 'La eucromatina es…', opciones: ['Relajada y genéticamente activa', 'Compacta y silenciosa', 'Periférica y oscura', 'Siempre condensada'], correcta: 0, dificultad: 1, explicacion: 'Es clara y se ubica en la zona interna.' },
  { id: '5_2', nivel: 5, tipo: 'opcion', enunciado: 'La heterocromatina se localiza sobre todo en…', opciones: ['La periferia del núcleo', 'El centro del núcleo', 'El nucléolo', 'El citoplasma'], correcta: 0, dificultad: 1, explicacion: 'Es oscura, compacta y no se expresa.' },
  { id: '5_3', nivel: 5, tipo: 'vf', enunciado: 'En un núcleo muy activo predomina la heterocromatina.', correcta: 'Falso', dificultad: 1, explicacion: 'Predomina la eucromatina.' },
  { id: '5_4', nivel: 5, tipo: 'opcion', enunciado: 'El cromosoma X inactivo (corpúsculo de Barr) es un ejemplo de heterocromatina…', opciones: ['Facultativa', 'Constitutiva', 'Permanente', 'Transitoria'], correcta: 0, dificultad: 2, explicacion: 'Puede descondensarse según el desarrollo y el tipo celular.' },
  { id: '5_5', nivel: 5, tipo: 'opcion', enunciado: 'Telómeros y centrómeros son heterocromatina…', opciones: ['Constitutiva', 'Facultativa', 'Reversible', 'Ninguna'], correcta: 0, dificultad: 2, explicacion: 'Siempre está condensada y tiene ADN satélite.' },
  { id: '5_6', nivel: 5, tipo: 'opcion', enunciado: '¿Qué porcentaje de la heterocromatina es facultativa?', opciones: ['80-90%', '10-20%', '50%', '100%'], correcta: 0, dificultad: 3, explicacion: 'La constitutiva es el 10-20% restante.' },
  { id: '5_7', nivel: 5, tipo: 'vf', enunciado: 'La cromatina es ADN más proteínas.', correcta: 'Verdadero', dificultad: 1, explicacion: 'Incluye histonas y proteínas no histónicas.' },
  { id: '5_8', nivel: 5, tipo: 'completar', enunciado: 'La unidad de empaquetamiento de la cromatina se llama ___.', correcta: 'nucleosoma', dificultad: 2, explicacion: 'El nucleosoma es un octámero de histonas con ADN enrollado.' },
  { id: '5_9', nivel: 5, tipo: 'opcion', enunciado: 'La heterocromatina constitutiva representa el…', opciones: ['10-20%', '80-90%', '40-50%', '60-70%'], correcta: 0, dificultad: 3, explicacion: 'La facultativa es el 80-90% restante.' },
  { id: '5_10', nivel: 5, tipo: 'vf', enunciado: 'La eucromatina se ubica en la zona interna del núcleo.', correcta: 'Verdadero', dificultad: 2, explicacion: 'Es clara, relajada y genéticamente activa.' },
  { id: '5_11', nivel: 5, tipo: 'opcion', enunciado: '¿Qué tipo de cromatina contiene ADN satélite?', opciones: ['Heterocromatina constitutiva', 'Eucromatina', 'Heterocromatina facultativa', 'Nucleoplasma'], correcta: 0, dificultad: 3, explicacion: 'El ADN satélite está en telómeros y centrómeros (constitutiva).' },
  { id: '5_12', nivel: 5, tipo: 'abierta', enunciado: '¿Qué componentes tiene el nucleosoma?', respuestaModelo: 'Octámero de histonas (2 copias de H2A, H2B, H3 y H4), ADN enrollado ~1.8 vueltas (146 pb) y ADN de unión o "linker".', dificultad: 2, explicacion: 'Octámero de histonas (2 copias de H2A, H2B, H3 y H4), ADN enrollado ~1.8 vueltas (146 pb) y ADN de unión.' },

  // NIVEL 6 - Del ADN al cromosoma
  { id: '6_1', nivel: 6, tipo: 'opcion', enunciado: '¿Cuál es el diámetro del nucleosoma?', opciones: ['11 nm', '2 nm', '30 nm', '700 nm'], correcta: 0, dificultad: 2, explicacion: 'Es el "collar de cuentas".' },
  { id: '6_2', nivel: 6, tipo: 'opcion', enunciado: 'El octámero de histonas está formado por…', opciones: ['Dos copias de H2A, H2B, H3 y H4', 'Cuatro copias de H1', 'Una de cada histona', 'Solo H3 y H4'], correcta: 0, dificultad: 2, explicacion: 'Total: 8 histonas.' },
  { id: '6_3', nivel: 6, tipo: 'opcion', enunciado: 'La histona H1 se une…', opciones: ['Donde el ADN entra y sale del nucleosoma', 'Al centro del octámero', 'Al ARNm', 'Al nucléolo'], correcta: 0, dificultad: 3, explicacion: 'Ayuda a formar la fibra de 30 nm.' },
  { id: '6_4', nivel: 6, tipo: 'ordenar', enunciado: 'Ordena de menor a mayor compactación:', ordenCorrecto: ['Doble hélice (2 nm)', 'Nucleosoma (11 nm)', 'Fibra de 30 nm', 'Asas y dominios (300 nm)', 'Sección condensada (700 nm)', 'Cromosoma metafásico (1400 nm)'], dificultad: 3, explicacion: 'Cada nivel aumenta la compactación.' },
  { id: '6_5', nivel: 6, tipo: 'completar', enunciado: 'El cromosoma metafásico mide aproximadamente ___ nm.', correcta: '1400', dificultad: 2, explicacion: 'Es la máxima condensación, visible durante la división celular.' },
  { id: '6_6', nivel: 6, tipo: 'opcion', enunciado: '¿Cuántos pares de bases rodean el octámero?', opciones: ['146 pb (~1.8 vueltas)', '200 pb exactas', '60 pb', '1000 pb'], correcta: 0, dificultad: 3, explicacion: 'Los nucleosomas se unen por ADN de unión.' },
  { id: '6_7', nivel: 6, tipo: 'vf', enunciado: 'A mayor empaquetamiento, mayor expresión génica.', correcta: 'Falso', dificultad: 2, explicacion: 'Más compactado, menos accesible a la maquinaria de transcripción.' },
  { id: '6_8', nivel: 6, tipo: 'opcion', enunciado: '¿Qué nivel de empaquetamiento corresponde al "collar de cuentas"?', opciones: ['Nucleosoma (11 nm)', 'Doble hélice (2 nm)', 'Fibra de 30 nm', 'Cromosoma metafásico'], correcta: 0, dificultad: 2, explicacion: 'Los nucleosomas vistas al microscopio parecen cuentas de un collar.' },
  { id: '6_9', nivel: 6, tipo: 'vf', enunciado: 'La fibra de 30 nm requiere la histona H1.', correcta: 'Verdadero', dificultad: 3, explicacion: 'H1 estabiliza la fibra de 30 nm.' },
  { id: '6_10', nivel: 6, tipo: 'completar', enunciado: 'La doble hélice mide ___ nm de diámetro.', correcta: '2', dificultad: 1, explicacion: 'Es el primer nivel de empaquetamiento.' },
  { id: '6_11', nivel: 6, tipo: 'opcion', enunciado: 'Las asas y dominios de 300 nm corresponden al cromosoma…', opciones: ['Activo en interfase', 'Metafásico', 'En mitosis', 'En meiosis'], correcta: 0, dificultad: 3, explicacion: 'Es el estado del cromosoma activo durante la interfase.' },
  { id: '6_12', nivel: 6, tipo: 'vf', enunciado: 'El ADN de unión (linker) conecta nucleosomas adyacentes.', correcta: 'Verdadero', dificultad: 2, explicacion: 'Es el ADN entre un nucleosoma y el siguiente.' },

  // NIVEL 7 - ADN y Watson-Crick
  { id: '7_1', nivel: 7, tipo: 'opcion', enunciado: 'Las purinas son…', opciones: ['A y G', 'C y T', 'A y T', 'G y C'], correcta: 0, dificultad: 1, explicacion: 'Tienen dos anillos; C y T son pirimidinas, de un anillo.' },
  { id: '7_2', nivel: 7, tipo: 'opcion', enunciado: '¿Cuántos puentes de hidrógeno unen A–T?', opciones: ['2', '1', '3', '4'], correcta: 0, dificultad: 1, explicacion: 'G–C tiene 3.' },
  { id: '7_3', nivel: 7, tipo: 'opcion', enunciado: '¿Cuántos puentes unen G–C?', opciones: ['3', '2', '1', '4'], correcta: 0, dificultad: 1, explicacion: 'Por eso es un enlace más fuerte que A–T.' },
  { id: '7_4', nivel: 7, tipo: 'opcion', enunciado: '¿En qué año y revista se publicó el modelo de la doble hélice?', opciones: ['1953, Nature', '1962, Science', '1831, Nature', '1953, Cell'], correcta: 0, dificultad: 2, explicacion: 'Watson y Crick; el Nobel llegó en 1962 junto con Maurice Wilkins.' },
  { id: '7_5', nivel: 7, tipo: 'vf', enunciado: 'Las dos cadenas del ADN son antiparalelas.', correcta: 'Verdadero', dificultad: 2, explicacion: 'Una va 5′→3′ y la otra 3′→5′.' },
  { id: '7_6', nivel: 7, tipo: 'opcion', enunciado: 'La cadena complementaria de 5′-ATGC-3′ es…', opciones: ["3′-TACG-5′", "5′-TACG-3′", "3′-ATGC-5′", "5′-CGAT-3′"], correcta: 0, dificultad: 3, explicacion: 'A–T y G–C, en sentido contrario.' },
  { id: '7_7', nivel: 7, tipo: 'vf', enunciado: 'En el ADN las bases nitrogenadas quedan hacia el exterior.', correcta: 'Falso', dificultad: 2, explicacion: 'La columna de azúcar-fosfato queda afuera y las bases hacia el interior.' },
  { id: '7_8', nivel: 7, tipo: 'completar', enunciado: 'Los tres componentes de un nucleótido son fosfato, ___ y base nitrogenada.', correcta: 'desoxirribosa', dificultad: 2, explicacion: 'El azúcar del ADN es la desoxirribosa.' },
  { id: '7_9', nivel: 7, tipo: 'opcion', enunciado: 'Las pirimidinas son…', opciones: ['C y T', 'A y G', 'A y T', 'G y C'], correcta: 0, dificultad: 2, explicacion: 'Tienen un anillo; A y G son purinas de dos anillos.' },
  { id: '7_10', nivel: 7, tipo: 'vf', enunciado: 'La doble hélice del ADN gira a la derecha.', correcta: 'Verdadero', dificultad: 2, explicacion: 'Es una hélice dextrógira.' },
  { id: '7_11', nivel: 7, tipo: 'opcion', enunciado: '¿Quién recibió el Nobel de 1962 junto con Watson y Crick?', opciones: ['Maurice Wilkins', 'Rosalind Franklin', 'Robert Brown', 'Gregor Mendel'], correcta: 0, dificultad: 3, explicacion: 'Maurice Wilkins compartió el Nobel de 1962.' },
  { id: '7_12', nivel: 7, tipo: 'completar', enunciado: 'El azúcar del ADN se llama ___.', correcta: 'desoxirribosa', dificultad: 1, explicacion: 'La desoxirribosa es el azúcar característico del ADN.' },

  // NIVEL 8 - Código genético
  { id: '8_1', nivel: 8, tipo: 'opcion', enunciado: '¿Cuántos codones posibles hay en el código genético?', opciones: ['64', '20', '61', '16'], correcta: 0, dificultad: 1, explicacion: 'Cuatro bases en tres posiciones: 4 × 4 × 4 = 64.' },
  { id: '8_2', nivel: 8, tipo: 'vf', enunciado: 'AUG es el codón de inicio y codifica metionina.', correcta: 'Verdadero', dificultad: 1, explicacion: 'AUG marca dónde empieza la proteína y pone Met.' },
  { id: '8_3', nivel: 8, tipo: 'opcion', enunciado: '¿Cuáles son los codones de término (STOP)?', opciones: ['UAA, UAG y UGA', 'AUG, UAA, UAG', 'UGG, UGA, UAA', 'UAA, UAG, UGG'], correcta: 0, dificultad: 2, explicacion: 'No tienen aminoácido ni ARNt que los reconozca.' },
  { id: '8_4', nivel: 8, tipo: 'opcion', enunciado: '¿Qué aminoácidos tienen un único codón?', opciones: ['Met (AUG) y Trp (UGG)', 'Leu y Ser', 'Arg y Gly', 'Solo Met'], correcta: 0, dificultad: 3, explicacion: 'Todos los demás tienen dos o más codones.' },
  { id: '8_5', nivel: 8, tipo: 'opcion', enunciado: 'Que el código sea "degenerado" significa que…', opciones: ['Varios codones distintos codifican el mismo aminoácido', 'Un codón codifica varios aminoácidos', 'El código cambia entre especies', 'Los codones se solapan'], correcta: 0, dificultad: 2, explicacion: 'Esos codones se llaman sinónimos.' },
  { id: '8_6', nivel: 8, tipo: 'completar', enunciado: 'El codón UGC codifica el aminoácido ___ (abreviatura de 3 letras).', correcta: 'Cys', dificultad: 2, explicacion: 'Primera U, segunda G, tercera C → cisteína.' },
  { id: '8_7', nivel: 8, tipo: 'opcion', enunciado: 'Que el código sea "no superpuesto" significa que…', opciones: ['Los tripletes se leen consecutivos, sin compartir nucleótidos', 'Los codones se solapan', 'Cada base pertenece a un solo codón y a varios', 'El código tiene errores'], correcta: 0, dificultad: 2, explicacion: 'Se lee de tres en tres, sin solaparse.' },
  { id: '8_8', nivel: 8, tipo: 'vf', enunciado: 'El código genético es idéntico en absolutamente todos los seres vivos.', correcta: 'Falso', dificultad: 2, explicacion: 'Es casi universal; hay pocas excepciones, por ejemplo en bacterias y mitocondrias.' },
  { id: '8_9', nivel: 8, tipo: 'opcion', enunciado: 'El codón CUA codifica…', opciones: ['Leu (leucina)', 'Pro (prolina)', 'Ile (isoleucina)', 'Val (valina)'], correcta: 0, dificultad: 2, explicacion: 'Todos los CUN son leucina.' },
  { id: '8_10', nivel: 8, tipo: 'opcion', enunciado: '¿Por qué un cambio de base suele alterar poco la proteína?', opciones: ['Porque los codones y aminoácidos con propiedades parecidas están agrupados', 'Porque el ADN se repara siempre', 'Porque las mutaciones no existen', 'Porque el código no es degenerado'], correcta: 0, dificultad: 3, explicacion: 'Así el cambio tiende a sustituir por un aminoácido similar.' },
  { id: '8_11', nivel: 8, tipo: 'completar', enunciado: 'El codón AUG codifica el aminoácido ___ (abreviatura de 3 letras).', correcta: 'Met', dificultad: 1, explicacion: 'AUG es inicio y codifica metionina.' },
  { id: '8_12', nivel: 8, tipo: 'vf', enunciado: 'Los codones se leen siempre en dirección 5′→3′.', correcta: 'Verdadero', dificultad: 2, explicacion: 'La lectura del ARNm es siempre 5′→3′.' },

  // NIVEL 9 - ARN de transferencia
  { id: '9_1', nivel: 9, tipo: 'opcion', enunciado: '¿Qué forma adopta el ARNt al plegarse?', opciones: ['De trébol', 'De doble hélice', 'De espiral', 'De anillo'], correcta: 0, dificultad: 1, explicacion: 'Se pliega por apareamiento interno de sus bases.' },
  { id: '9_2', nivel: 9, tipo: 'opcion', enunciado: 'El extremo 3′ del brazo aceptor termina en la secuencia…', opciones: ['CCA', 'AUG', 'UGC', 'AAA'], correcta: 0, dificultad: 2, explicacion: 'Ahí se engancha el aminoácido formando el aminoacil-ARNt.' },
  { id: '9_3', nivel: 9, tipo: 'opcion', enunciado: '¿Qué brazo expone el anticodón?', opciones: ['El brazo del anticodón', 'El brazo D', 'El brazo T', 'El brazo aceptor'], correcta: 0, dificultad: 1, explicacion: 'Se aparea de forma complementaria y antiparalela con el codón.' },
  { id: '9_4', nivel: 9, tipo: 'opcion', enunciado: 'El brazo D contiene la base modificada…', opciones: ['Dihidrouridina', 'Inosina', 'Ribotimidina', 'Seudouridina'], correcta: 0, dificultad: 3, explicacion: 'Ayuda a que la aminoacil-ARNt sintetasa reconozca al ARNt.' },
  { id: '9_5', nivel: 9, tipo: 'opcion', enunciado: 'El brazo T contiene…', opciones: ['Ribotimidina y pseudouridina', 'Dihidrouridina', 'Inosina', 'Metilguanosina'], correcta: 0, dificultad: 3, explicacion: 'Interviene en el acoplamiento del ARNt al ribosoma.' },
  { id: '9_6', nivel: 9, tipo: 'opcion', enunciado: '¿Qué brazo es el de mayor variabilidad (4 a 21 nucleótidos)?', opciones: ['El brazo variable (V)', 'El brazo D', 'El brazo T', 'El brazo aceptor'], correcta: 0, dificultad: 3, explicacion: 'Está entre el brazo del anticodón y el brazo T.' },
  { id: '9_7', nivel: 9, tipo: 'vf', enunciado: 'Existe un ARNt distinto para cada uno de los 64 codones.', correcta: 'Falso', dificultad: 2, explicacion: 'Por el bamboleo, un mismo ARNt lee varios codones sinónimos.' },
  { id: '9_8', nivel: 9, tipo: 'opcion', enunciado: 'La hipótesis del bamboleo se refiere a la flexibilidad en…', opciones: ['La tercera base del codón', 'La primera base del codón', 'El aminoácido', 'La secuencia CCA'], correcta: 0, dificultad: 2, explicacion: 'Las dos primeras son más firmes.' },
  { id: '9_9', nivel: 9, tipo: 'relacionar', enunciado: 'Relaciona cada brazo con su función:', relaciones: [
    { izquierda: 'Brazo aceptor', derecha: 'Une el aminoácido' },
    { izquierda: 'Brazo del anticodón', derecha: 'Reconoce el codón' },
    { izquierda: 'Brazo D', derecha: 'Reconocimiento por la sintetasa' },
    { izquierda: 'Brazo T', derecha: 'Acoplamiento al ribosoma' },
  ], dificultad: 2, explicacion: 'Cada brazo tiene su trabajo.' },
  { id: '9_10', nivel: 9, tipo: 'opcion', enunciado: 'Un mismo ARNt-Lys puede leer los codones…', opciones: ['AAA y AAG', 'AAA y AAC', 'AAG y AAC', 'AAA y AAU'], correcta: 0, dificultad: 3, explicacion: 'Ejemplo clásico de bamboleo.' },
  { id: '9_11', nivel: 9, tipo: 'opcion', enunciado: '¿Cuál es una base modificada del ARNt?', opciones: ['Inosina', 'Timina', 'Citosina', 'Adenina'], correcta: 0, dificultad: 2, explicacion: 'También hay seudouridina, dihidrouridina y metilguanosina.' },
  { id: '9_12', nivel: 9, tipo: 'vf', enunciado: 'El apareamiento codón-anticodón es complementario y antiparalelo.', correcta: 'Verdadero', dificultad: 2, explicacion: 'El anticodón lee el codón en sentido opuesto, de forma complementaria.' },

  // NIVEL 10 - Etapas de la traducción
  { id: '10_1', nivel: 10, tipo: 'ordenar', enunciado: 'Ordena las etapas de la traducción:', ordenCorrecto: ['Activación del ARNt', 'Iniciación', 'Elongación', 'Terminación'], dificultad: 1, explicacion: 'Primero se prepara el ARNt, luego se arma el ribosoma, se alarga la cadena y se termina.' },
  { id: '10_2', nivel: 10, tipo: 'opcion', enunciado: '¿Qué enzima une el aminoácido a su ARNt?', opciones: ['Aminoacil-ARNt sintetasa', 'Peptidil transferasa', 'ARN polimerasa', 'Helicasa'], correcta: 0, dificultad: 2, explicacion: 'Lo hace con gasto de ATP.' },
  { id: '10_3', nivel: 10, tipo: 'opcion', enunciado: 'El intermedio que se forma al activar el aminoácido con ATP es el…', opciones: ['Aminoacil-AMP', 'Aminoacil-GTP', 'Aminoacil-ADP', 'Pirofosfato'], correcta: 0, dificultad: 3, explicacion: 'Libera un pirofosfato; luego el aminoácido pasa al OH del extremo 3′ del ARNt.' },
  { id: '10_4', nivel: 10, tipo: 'opcion', enunciado: '¿En qué sitio del ribosoma se ubica el ARNt iniciador?', opciones: ['Sitio P', 'Sitio A', 'Sitio E', 'Sitio A y P'], correcta: 0, dificultad: 2, explicacion: 'Los siguientes aa-ARNt entran por el sitio A.' },
  { id: '10_5', nivel: 10, tipo: 'relacionar', enunciado: 'Relaciona cada sitio con su significado:', relaciones: [
    { izquierda: 'Sitio E', derecha: 'Salida' },
    { izquierda: 'Sitio P', derecha: 'Peptidil' },
    { izquierda: 'Sitio A', derecha: 'Aminoacil' },
  ], dificultad: 2, explicacion: 'E de salida, P de peptidil, A de aminoacil.' },
  { id: '10_6', nivel: 10, tipo: 'opcion', enunciado: '¿Qué actividad forma el enlace peptídico?', opciones: ['La peptidil transferasa (actividad del ARNr)', 'La aminoacil-ARNt sintetasa', 'La ARN polimerasa', 'La helicasa'], correcta: 0, dificultad: 3, explicacion: 'El ARNr es quien cataliza (es una ribozima).' },
  { id: '10_7', nivel: 10, tipo: 'ordenar', enunciado: 'Ordena la elongación:', ordenCorrecto: ['Entra un aa-ARNt al sitio A', 'Se forma el enlace peptídico', 'Translocación del ribosoma un codón', 'El ARNt vacío sale por el sitio E'], dificultad: 3, explicacion: 'Entra, une, avanza y expulsa.' },
  { id: '10_8', nivel: 10, tipo: 'opcion', enunciado: '¿Por qué el codón STOP termina la traducción?', opciones: ['No existe ARNt que lo reconozca; lo reconocen factores de liberación', 'El ribosoma se destruye', 'El ARNm se degrada', 'El codón STOP codifica agua'], correcta: 0, dificultad: 2, explicacion: 'La cadena se transfiere a una molécula de agua y se libera la proteína.' },
  { id: '10_9', nivel: 10, tipo: 'opcion', enunciado: 'Un ARNm tiene 3748 codones; ¿cuántos aminoácidos tiene la proteína?', opciones: ['3747', '3748', '3746', '3749'], correcta: 0, dificultad: 3, explicacion: 'El último codón es STOP y no codifica aminoácido.' },
  { id: '10_10', nivel: 10, tipo: 'opcion', enunciado: 'En procariotas, ¿qué factor lleva el aa-ARNt al sitio A?', opciones: ['EF-Tu-GTP', 'EF-G-GTP', 'IF2-GTP', 'eIF2-GTP'], correcta: 0, dificultad: 3, explicacion: 'EF-G-GTP es el que hace la translocación.' },
  { id: '10_11', nivel: 10, tipo: 'completar', enunciado: 'ADN molde TAC GGC GAT → ARNm ___ / CCG / CUA.', correcta: 'AUG', dificultad: 2, explicacion: 'TAC es complementario a AUG, el codón de inicio.' },
  { id: '10_12', nivel: 10, tipo: 'opcion', enunciado: 'La proteína de TAC GGC GAT CCC AAA TAT CAT TAT ACT es…', opciones: ['Met–Pro–Leu–Gly–Phe–Ile–Val–Ile (STOP al final)', 'Met–Pro–Leu–Gly–Phe–Ile–Val–Ile–STOP (9 aminoácidos)', 'Solo Met–Pro–Leu', 'Met–Gly–Ile–Pro–Leu'], correcta: 0, dificultad: 3, explicacion: 'Son 9 codones, pero 8 aminoácidos, porque UGA es STOP.' },

  // NIVEL 11 - Procariotas vs eucariotas
  { id: '11_1', nivel: 11, tipo: 'opcion', enunciado: 'El ribosoma procariota es…', opciones: ['70S (30S + 50S)', '80S (40S + 60S)', '60S (30S + 30S)', '90S'], correcta: 0, dificultad: 1, explicacion: 'El eucariota es 80S (40S + 60S).' },
  { id: '11_2', nivel: 11, tipo: 'opcion', enunciado: 'El aminoácido inicial en procariotas es…', opciones: ['Formilmetionina (fMet)', 'Metionina (Met)', 'Glicina', 'Valina'], correcta: 0, dificultad: 2, explicacion: 'En eucariotas es metionina.' },
  { id: '11_3', nivel: 11, tipo: 'opcion', enunciado: '¿Qué secuencia reconocen los eucariotas para iniciar la traducción?', opciones: ['Kozak (ACCAUGC)', 'Shine-Dalgarno', 'TATA box', 'Secuencia NLS'], correcta: 0, dificultad: 3, explicacion: 'La 40S rastrea el ARNm hasta encontrarla.' },
  { id: '11_4', nivel: 11, tipo: 'opcion', enunciado: '¿Qué reconoce la caperuza 5′ (m7Gppp) del ARNm eucariota?', opciones: ['eIF4F', 'IF1', 'EF-Tu', 'RF'], correcta: 0, dificultad: 3, explicacion: 'Los procariotas no tienen caperuza.' },
  { id: '11_5', nivel: 11, tipo: 'opcion', enunciado: 'Los factores de elongación procariotas son…', opciones: ['EF-Tu y EF-G', 'EF1α y EF2', 'IF1 e IF2', 'eRF1 y eRF3'], correcta: 0, dificultad: 2, explicacion: 'En eucariotas son EF1α y EF2.' },
  { id: '11_6', nivel: 11, tipo: 'opcion', enunciado: 'Los factores de terminación eucariotas son…', opciones: ['eRF1 y eRF3', 'RF y RRF', 'EF-G y RRF', 'IF3'], correcta: 0, dificultad: 2, explicacion: 'En procariotas: RF, EF-G y RRF.' },
  { id: '11_7', nivel: 11, tipo: 'vf', enunciado: 'En procariotas el ARNm puede traducirse mientras se transcribe.', correcta: 'Verdadero', dificultad: 2, explicacion: 'No tienen núcleo.' },
  { id: '11_8', nivel: 11, tipo: 'vf', enunciado: 'En eucariotas el ARNm se traduce dentro del núcleo.', correcta: 'Falso', dificultad: 2, explicacion: 'El ARNm maduro sale del núcleo antes de traducirse.' },
  { id: '11_9', nivel: 11, tipo: 'relacionar', enunciado: 'Relaciona cada elemento con su tipo de célula:', relaciones: [
    { izquierda: 'fMet', derecha: 'Procariota' },
    { izquierda: 'Met', derecha: 'Eucariota' },
    { izquierda: 'IF2-GTP', derecha: 'Procariota' },
    { izquierda: 'eIF2-GTP', derecha: 'Eucariota' },
  ], dificultad: 2, explicacion: 'Misma función, distinto nombre.' },
  { id: '11_10', nivel: 11, tipo: 'opcion', enunciado: '¿Qué factores favorecen la unión de la 30S al ARNm en procariotas?', opciones: ['IF1 e IF3', 'eIF2 y eIF3', 'EF-Tu y EF-G', 'eRF1 y eRF3'], correcta: 0, dificultad: 3, explicacion: 'IF2-GTP trae el fMet-ARNt (anticodón UAC).' },
  { id: '11_11', nivel: 11, tipo: 'opcion', enunciado: '¿Qué subunidades forman el ribosoma eucariota?', opciones: ['40S y 60S', '30S y 50S', '20S y 40S', '30S y 60S'], correcta: 0, dificultad: 1, explicacion: 'Juntas forman el 80S.' },
  { id: '11_12', nivel: 11, tipo: 'vf', enunciado: 'Los procariotas no tienen caperuza en su ARNm.', correcta: 'Verdadero', dificultad: 2, explicacion: 'Los procariotas se anclan a la 30S por complementariedad ARNr–ARNm.' },

  // NIVEL 12 - Mutaciones génicas
  { id: '12_1', nivel: 12, tipo: 'opcion', enunciado: 'UAC (Tyr) cambia a UAU. Esta mutación es…', opciones: ['Silenciosa', 'De cambio de sentido', 'Sin sentido', 'De marco de lectura'], correcta: 0, dificultad: 2, explicacion: 'UAU también codifica Tyr, gracias a la degeneración.' },
  { id: '12_2', nivel: 12, tipo: 'opcion', enunciado: 'UAC (Tyr) cambia a UCC (Ser). Esta mutación es…', opciones: ['De cambio de sentido (missense)', 'Silenciosa', 'Sin sentido', 'De marco'], correcta: 0, dificultad: 2, explicacion: 'Cambia un aminoácido por otro.' },
  { id: '12_3', nivel: 12, tipo: 'opcion', enunciado: 'UAC (Tyr) cambia a UAG. Esta mutación es…', opciones: ['Sin sentido (nonsense)', 'Silenciosa', 'De cambio de sentido', 'Beneficiosa'], correcta: 0, dificultad: 2, explicacion: 'Aparece un STOP prematuro y la proteína queda truncada.' },
  { id: '12_4', nivel: 12, tipo: 'opcion', enunciado: 'La sustitución de un solo par de nucleótidos se llama…', opciones: ['Mutación puntual', 'Translocación', 'Inversión', 'Aneuploidía'], correcta: 0, dificultad: 2, explicacion: 'Por ejemplo, un par A–T cambiado a T–A.' },
  { id: '12_5', nivel: 12, tipo: 'vf', enunciado: 'La deleción de 1 nucleótido desplaza el marco de lectura.', correcta: 'Verdadero', dificultad: 2, explicacion: 'El ribosoma lee de tres en tres y todos los codones siguientes cambian.' },
  { id: '12_6', nivel: 12, tipo: 'vf', enunciado: 'La inserción de 3 nucleótidos desplaza el marco de lectura.', correcta: 'Falso', dificultad: 2, explicacion: 'Si son múltiplos de tres, solo se añade un aminoácido.' },
  { id: '12_7', nivel: 12, tipo: 'opcion', enunciado: 'El cambio de Glu por Val en la hemoglobina causa…', opciones: ['Anemia falciforme', 'Fibrosis quística', 'Progeria', 'Cri-du-chat'], correcta: 0, dificultad: 2, explicacion: 'Un solo aminoácido cambiado altera la función.' },
  { id: '12_8', nivel: 12, tipo: 'vf', enunciado: 'Las mutaciones silenciosas suelen ocurrir en la tercera base del codón.', correcta: 'Verdadero', dificultad: 3, explicacion: 'Ahí es donde el código tiene más sinónimos.' },
  { id: '12_9', nivel: 12, tipo: 'opcion', enunciado: 'Una mutación germinal…', opciones: ['Pasa a la siguiente generación', 'Solo afecta al individuo', 'Siempre es letal', 'No se hereda'], correcta: 0, dificultad: 2, explicacion: 'La somática afecta al individuo.' },
  { id: '12_10', nivel: 12, tipo: 'opcion', enunciado: 'Una mutación inducida es la que ocurre…', opciones: ['En presencia de un mutágeno', 'De forma natural', 'Solo en el laboratorio', 'En la meiosis'], correcta: 0, dificultad: 2, explicacion: 'Las espontáneas ocurren de forma natural.' },
  { id: '12_11', nivel: 12, tipo: 'opcion', enunciado: 'La fibrosis quística es un ejemplo de mutación de…', opciones: ['Pérdida de función', 'Ganancia de función', 'Hipermórfica', 'Silenciosa'], correcta: 0, dificultad: 3, explicacion: 'La proteína no transporta bien el cloro.' },
  { id: '12_12', nivel: 12, tipo: 'opcion', enunciado: 'Un gen que controla la división celular muta y la activa sin control: es una mutación de…', opciones: ['Ganancia de función', 'Pérdida de función', 'Hipomórfica', 'Silenciosa'], correcta: 0, dificultad: 3, explicacion: 'Puede contribuir al cáncer.' },

  // NIVEL 13 - Mutaciones cromosómicas
  { id: '13_1', nivel: 13, tipo: 'relacionar', enunciado: 'Relaciona cada mutación estructural con su descripción:', relaciones: [
    { izquierda: 'Deleción', derecha: 'Pierde un segmento' },
    { izquierda: 'Duplicación', derecha: 'Repite un segmento' },
    { izquierda: 'Inversión', derecha: 'Un segmento gira 180°' },
    { izquierda: 'Translocación', derecha: 'Intercambio entre cromosomas distintos' },
  ], dificultad: 2, explicacion: 'Cuatro mutaciones estructurales.' },
  { id: '13_2', nivel: 13, tipo: 'opcion', enunciado: 'Monosomía es…', opciones: ['2n − 1', '2n + 1', '3n', '2n'], correcta: 0, dificultad: 2, explicacion: 'Trisomía es 2n + 1.' },
  { id: '13_3', nivel: 13, tipo: 'opcion', enunciado: 'Triploidía es…', opciones: ['3n', '2n + 1', '4n', '2n − 1'], correcta: 0, dificultad: 2, explicacion: 'Es un tipo de poliploidía (euploidía).' },
  { id: '13_4', nivel: 13, tipo: 'opcion', enunciado: 'La aneuploidía se refiere a…', opciones: ['Pérdida o ganancia de uno o varios cromosomas', 'Múltiplos exactos de n', 'Intercambio de segmentos', 'Giro de un segmento'], correcta: 0, dificultad: 2, explicacion: 'Por ejemplo, 2n ± x.' },
  { id: '13_5', nivel: 13, tipo: 'opcion', enunciado: 'El síndrome de cri-du-chat se debe a…', opciones: ['Deleción del brazo corto del cromosoma 5 (5p)', 'Translocación t(9;22)', 'Trisomía 21', 'Duplicación del cromosoma 15'], correcta: 0, dificultad: 2, explicacion: 'Es una monosomía parcial.' },
  { id: '13_6', nivel: 13, tipo: 'opcion', enunciado: 'El llanto agudo del cri-du-chat se debe a…', opciones: ['Una malformación de la laringe', 'Un problema cardíaco', 'Un defecto del oído', 'Un problema neurológico'], correcta: 0, dificultad: 2, explicacion: 'Se atenúa y desaparece hacia los 2 años.' },
  { id: '13_7', nivel: 13, tipo: 'opcion', enunciado: 'El cromosoma Filadelfia es la translocación…', opciones: ['t(9;22), que fusiona BCR y ABL', 't(8;14)', 't(15;17)', 't(11;22)'], correcta: 0, dificultad: 2, explicacion: 'Se asocia con leucemia mielógena crónica.' },
  { id: '13_8', nivel: 13, tipo: 'vf', enunciado: 'En la inversión se intercambian segmentos entre dos cromosomas distintos.', correcta: 'Falso', dificultad: 2, explicacion: 'Eso es la translocación; la inversión ocurre dentro del mismo cromosoma.' },
  { id: '13_9', nivel: 13, tipo: 'opcion', enunciado: 'Autopoliploidía es tener…', opciones: ['Múltiplos del mismo genoma', 'Múltiplos de genomas diferentes', 'Un solo juego cromosómico', 'Cromosomas extra de otra especie'], correcta: 0, dificultad: 3, explicacion: 'La alopoliploidía (anfidiploidía) combina genomas diferentes.' },
  { id: '13_10', nivel: 13, tipo: 'opcion', enunciado: 'La euploidía son…', opciones: ['Múltiplos de n', 'Cromosomas faltantes', 'Intercambios entre cromosomas', 'Mutaciones de un solo nucleótido'], correcta: 0, dificultad: 2, explicacion: 'Diploidía 2n, triploidía 3n, tetraploidía 4n…' },
  { id: '13_11', nivel: 13, tipo: 'opcion', enunciado: '¿Qué disminuye en una deleción?', opciones: ['El número de genes', 'El tamaño del ARNm', 'El número de ribosomas', 'La condensación'], correcta: 0, dificultad: 2, explicacion: 'En la duplicación aumenta.' },
  { id: '13_12', nivel: 13, tipo: 'vf', enunciado: 'En la deleción se pierde el cromosoma completo.', correcta: 'Falso', dificultad: 1, explicacion: 'Solo se pierde un segmento.' },
];

export function getPreguntasPorNivel(nivel: number): Pregunta[] {
  return preguntas.filter(p => p.nivel === nivel);
}

export function getPreguntasPorNivelMixtas(nivel: number, cantidad: number = 10): Pregunta[] {
  const todas = getPreguntasPorNivel(nivel);
  const shuffled = [...todas].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(cantidad, todas.length));
}
