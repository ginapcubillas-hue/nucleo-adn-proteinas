export interface IntroNivel {
  nivel: number;
  titulo: string;
  texto: string;
}

export const intros: IntroNivel[] = [
  {
    nivel: 1,
    titulo: 'Núcleo y morfología',
    texto:
      'El núcleo es el centro de control de la célula. Lo descubrió Robert Brown en 1831 y mide unos 6 micrómetros. Su forma cambia según la célula: redondo en las epiteliales, arriñonado en el monocito, multilobulado en el neutrófilo, y en el músculo esquelético hay muchos núcleos pegados a la periferia.',
  },
  {
    nivel: 2,
    titulo: 'Envoltura nuclear',
    texto:
      'El núcleo está rodeado por una doble membrana llamada envoltura nuclear o carioteca; son lo mismo. La membrana externa se continúa con el retículo endoplasmático rugoso. Por dentro hay una malla de filamentos intermedios, la lámina, que da forma al núcleo. Si falla el gen LMNA aparecen las laminopatías, como la progeria.',
  },
  {
    nivel: 3,
    titulo: 'Poro y transporte',
    texto:
      'Todo lo que entra o sale del núcleo pasa por los poros nucleares. Lo pequeño pasa solo, pero lo grande necesita carioferinas: las importinas meten y las exportinas sacan. Una proteína llamada Ran, en forma GTP o GDP, le da la dirección al transporte.',
  },
  {
    nivel: 4,
    titulo: 'Nucleoplasma y nucléolo',
    texto:
      'El nucleoplasma es el medio acuoso donde flotan la cromatina y el nucléolo. El nucléolo no tiene membrana y es la fábrica de ribosomas: aquí se hace el ARN ribosomal y se ensamblan las subunidades, que luego salen al citoplasma.',
  },
  {
    nivel: 5,
    titulo: 'Cromatina',
    texto:
      'La cromatina es ADN más proteínas. Hay dos tipos: la eucromatina, suelta, clara y activa, y la heterocromatina, compacta, oscura y silenciosa. Si el núcleo trabaja mucho, predomina la eucromatina.',
  },
  {
    nivel: 6,
    titulo: 'Del ADN al cromosoma',
    texto:
      'El ADN mide metros, pero cabe en un núcleo diminuto porque se empaqueta por niveles. Primero se enrolla en histonas formando nucleosomas, luego fibras de 30 nanómetros, asas, y finalmente el cromosoma metafásico. Mientras más compacto, menos se expresa.',
  },
  {
    nivel: 7,
    titulo: 'ADN y Watson-Crick',
    texto:
      'El ADN es una doble hélice de nucleótidos. Las bases A-T se unen con 2 puentes de hidrógeno y G-C con 3. Las dos cadenas son antiparalelas. Watson y Crick publicaron este modelo en Nature en 1953.',
  },
  {
    nivel: 8,
    titulo: 'Código genético',
    texto:
      'El código genético es el diccionario que traduce codones, tripletes de ARNm, en aminoácidos. Hay 64 codones: AUG es el inicio y UAA, UAG y UGA son los de parada. Es casi universal y degenerado, porque varios codones dan el mismo aminoácido.',
  },
  {
    nivel: 9,
    titulo: 'ARN de transferencia',
    texto:
      'El ARNt es el traductor. En un extremo lleva un aminoácido y en el otro un anticodón que reconoce el codón del ARNm. Tiene forma de trébol con varios brazos. Y gracias al bamboleo, un mismo ARNt puede leer varios codones sinónimos.',
  },
  {
    nivel: 10,
    titulo: 'Etapas de la traducción',
    texto:
      'La traducción tiene cuatro etapas: activación del ARNt, iniciación, elongación y terminación. El ribosoma lee el ARNm de tres en tres, el aminoácido entra por el sitio A, se forma el enlace peptídico y el ribosoma avanza hasta encontrar un codón de parada.',
  },
  {
    nivel: 11,
    titulo: 'Procariotas vs. eucariotas',
    texto:
      'Procariotas y eucariotas traducen de forma parecida, pero con diferencias clave. El ribosoma procariota es 70S y el eucariota 80S. Empiezan con fMet o con Met, usan factores IF o eIF, y los eucariotas buscan la secuencia Kozak.',
  },
  {
    nivel: 12,
    titulo: 'Mutaciones génicas',
    texto:
      'Una mutación es un cambio en el ADN. Si cambia una sola base puede ser silenciosa, de cambio de sentido o sin sentido. Y si se inserta o se borra un número de bases que no es múltiplo de tres, se corre todo el marco de lectura.',
  },
  {
    nivel: 13,
    titulo: 'Mutaciones cromosómicas',
    texto:
      'Las mutaciones cromosómicas afectan pedazos grandes: deleción, duplicación, inversión y translocación. También puede cambiar el número de cromosomas, como en la monosomía y la trisomía. Ejemplos clínicos: el cri-du-chat y el cromosoma Filadelfia.',
  },
];

export function getIntro(nivel: number): IntroNivel | undefined {
  return intros.find(i => i.nivel === nivel);
}
