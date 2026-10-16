export interface TerminoGlosario {
  termino: string;
  definicion: string;
  nivel: number;
}

export const glosario: TerminoGlosario[] = [
  { termino: 'NLS', definicion: 'Secuencia de localización nuclear. Señal que marca una proteína para ser importada al núcleo.', nivel: 3 },
  { termino: 'NES', definicion: 'Secuencia de exportación nuclear. Señal que marca una proteína para ser exportada del núcleo.', nivel: 3 },
  { termino: 'NPC', definicion: 'Complejo del poro nuclear. Estructura de ~120 nm formada por nucleoporinas que regula el transporte entre el núcleo y el citoplasma.', nivel: 3 },
  { termino: 'FG', definicion: 'Fenilalanina-glicina. Dominios de las nucleoporinas que forman una malla hidrófoba en el conducto del poro.', nivel: 3 },
  { termino: 'NOR', definicion: 'Regiones organizadoras nucleolares. Contienen los genes del ARNr y organizan el nucléolo.', nivel: 4 },
  { termino: 'LINC', definicion: 'Complejos que conectan la envoltura nuclear con el citoesqueleto citoplasmático.', nivel: 2 },
  { termino: 'Carioferinas', definicion: 'Familia de proteínas de transporte nuclear. Las importinas meten carga al núcleo y las exportinas la sacan.', nivel: 3 },
  { termino: 'Svedberg', definicion: 'Coeficiente de sedimentación (S). Unidad que identifica a cada ARNr por su velocidad de sedimentación en centrifugación.', nivel: 4 },
  { termino: 'Progerina', definicion: 'Proteína truncada por mutación en LMNA que deforma el núcleo y causa envejecimiento prematuro (progeria de Hutchinson-Gilford).', nivel: 2 },
  { termino: 'Codón', definicion: 'Triplete de nucleótidos del ARNm que codifica un aminoácido o una señal de parada.', nivel: 8 },
  { termino: 'Anticodón', definicion: 'Triplete de nucleótidos del ARNt que reconoce al codón complementario del ARNm.', nivel: 9 },
  { termino: 'ARNt', definicion: 'ARN de transferencia. Molécula adaptadora que conecta codones con aminoácidos.', nivel: 9 },
  { termino: 'Aminoacil-ARNt sintetasa', definicion: 'Enzima que une cada aminoácido a su ARNt con gasto de ATP.', nivel: 10 },
  { termino: 'Sitios E/P/A', definicion: 'Sitios del ribosoma: E (salida), P (peptidil) y A (aminoacil).', nivel: 10 },
  { termino: 'Kozak', definicion: 'Secuencia consenso 5′-ACCAUGC-3′ que los eucariotas reconocen para iniciar la traducción.', nivel: 11 },
  { termino: 'Caperuza', definicion: 'Modificación 5′ (m7Gppp) del ARNm eucariota, reconocida por eIF4F.', nivel: 11 },
  { termino: 'Bamboleo', definicion: 'Hipótesis del wobble: la tercera base del codón se aparea de forma flexible, permitiendo que un ARNt lea varios codones sinónimos.', nivel: 9 },
  { termino: 'Missense', definicion: 'Mutación de cambio de sentido: un aminoácido se sustituye por otro.', nivel: 12 },
  { termino: 'Nonsense', definicion: 'Mutación sin sentido: aparece un codón STOP prematuro y la proteína queda truncada.', nivel: 12 },
  { termino: 'Marco de lectura', definicion: 'Forma en que el ribosoma lee el ARNm de tres en tres. Las inserciones/deleciones que no son múltiplos de tres lo desplazan.', nivel: 12 },
  { termino: 'Aneuploidía', definicion: 'Pérdida o ganancia de uno o varios cromosomas (2n ± x).', nivel: 13 },
  { termino: 'Eucromatina', definicion: 'Cromatina relajada, genéticamente activa, ubicada en la zona interna del núcleo.', nivel: 5 },
  { termino: 'Heterocromatina', definicion: 'Cromatina compacta, no expresada, ubicada en la periferia del núcleo.', nivel: 5 },
  { termino: 'Nucleosoma', definicion: 'Unidad de empaquetamiento: octámero de histonas con ADN enrollado (~1.8 vueltas, 146 pb).', nivel: 6 },
  { termino: 'Translocación', definicion: 'Intercambio de segmentos entre cromosomas distintos (no homólogos).', nivel: 13 },
  { termino: 'Cromosoma Filadelfia', definicion: 'Translocación t(9;22) que fusiona BCR y ABL, asociada a leucemia mielógena crónica.', nivel: 13 },
  { termino: 'Cri-du-chat', definicion: 'Síndrome por deleción del brazo corto del cromosoma 5 (5p). El llanto es agudo, similar al maullido de un gato.', nivel: 13 },
  { termino: 'Ran-GTP', definicion: 'Forma activa de Ran, abundante en el núcleo. Da direccionalidad al transporte nuclear.', nivel: 3 },
  { termino: 'Ran-GDP', definicion: 'Forma inactiva de Ran, abundante en el citoplasma.', nivel: 3 },
  { termino: 'RCC1', definicion: 'Proteína que cambia GDP por GTP en Ran dentro del núcleo.', nivel: 3 },
  { termino: 'Ran-GAP', definicion: 'Proteína que hidroliza GTP a GDP en Ran en el citoplasma.', nivel: 3 },
];
