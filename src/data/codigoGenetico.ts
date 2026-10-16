const codigoGenetico: Record<string, string> = {
  UUU: 'Phe', UUC: 'Phe', UUA: 'Leu', UUG: 'Leu',
  UCU: 'Ser', UCC: 'Ser', UCA: 'Ser', UCG: 'Ser',
  UAU: 'Tyr', UAC: 'Tyr', UAA: 'STOP', UAG: 'STOP',
  UGU: 'Cys', UGC: 'Cys', UGA: 'STOP', UGG: 'Trp',
  CUU: 'Leu', CUC: 'Leu', CUA: 'Leu', CUG: 'Leu',
  CCU: 'Pro', CCC: 'Pro', CCA: 'Pro', CCG: 'Pro',
  CAU: 'His', CAC: 'His', CAA: 'Gln', CAG: 'Gln',
  CGU: 'Arg', CGC: 'Arg', CGA: 'Arg', CGG: 'Arg',
  AUU: 'Ile', AUC: 'Ile', AUA: 'Ile', AUG: 'Met',
  ACU: 'Thr', ACC: 'Thr', ACA: 'Thr', ACG: 'Thr',
  AAU: 'Asn', AAC: 'Asn', AAA: 'Lys', AAG: 'Lys',
  AGU: 'Ser', AGC: 'Ser', AGA: 'Arg', AGG: 'Arg',
  GUU: 'Val', GUC: 'Val', GUA: 'Val', GUG: 'Val',
  GCU: 'Ala', GCC: 'Ala', GCA: 'Ala', GCG: 'Ala',
  GAU: 'Asp', GAC: 'Asp', GAA: 'Glu', GAG: 'Glu',
  GGU: 'Gly', GGC: 'Gly', GGA: 'Gly', GGG: 'Gly',
};

export default codigoGenetico;

export const codonesStop = ['UAA', 'UAG', 'UGA'];
export const codonInicio = 'AUG';

export type TipoAminoacido =
  | 'acido' | 'basico' | 'polar' | 'hidrofobo' | 'stop' | 'inicio';

const clasificacion: Record<string, TipoAminoacido> = {
  Phe: 'hidrofobo', Leu: 'hidrofobo', Ile: 'hidrofobo', Met: 'inicio',
  Val: 'hidrofobo', Ala: 'hidrofobo', Gly: 'hidrofobo', Trp: 'hidrofobo',
  Pro: 'hidrofobo', Cys: 'polar', Tyr: 'polar', Ser: 'polar',
  Thr: 'polar', Asn: 'polar', Gln: 'polar',
  His: 'basico', Lys: 'basico', Arg: 'basico',
  Asp: 'acido', Glu: 'acido',
  STOP: 'stop',
};

export function getTipoAminoacido(aa: string): TipoAminoacido {
  return clasificacion[aa] ?? 'polar';
}

export const coloresTipo: Record<TipoAminoacido, string> = {
  acido: '#ef4444',
  basico: '#3b82f6',
  polar: '#22c55e',
  hidrofobo: '#f59e0b',
  stop: '#dc2626',
  inicio: '#8b5cf6',
};

export const etiquetasTipo: Record<TipoAminoacido, string> = {
  acido: 'Ácido',
  basico: 'Básico',
  polar: 'Polar sin carga',
  hidrofobo: 'Hidrofóbico',
  stop: 'Stop',
  inicio: 'Inicio',
};

export const basesSegunda = ['U', 'C', 'A', 'G'] as const;
export const basesTercera = ['U', 'C', 'A', 'G'] as const;

export function traducirCodon(codon: string): string {
  return codigoGenetico[codon.toUpperCase()] ?? '???';
}

export function transcribirADN(adn: string): string {
  const complementaria: Record<string, string> = { A: 'U', T: 'A', C: 'G', G: 'C' };
  return adn.replace(/\s/g, '').split('').map(b => complementaria[b] ?? '?').join('');
}

export function anticodonDe(codon: string): string {
  const complementaria: Record<string, string> = { A: 'U', U: 'A', C: 'G', G: 'C' };
  return codon.split('').map(b => complementaria[b] ?? '?').join('');
}

export function traducirARNm(arnm: string): string[] {
  const limpio = arnm.replace(/\s/g, '');
  const aminoacidos: string[] = [];
  for (let i = 0; i < limpio.length; i += 3) {
    const codon = limpio.slice(i, i + 3);
    if (codon.length === 3) {
      aminoacidos.push(traducirCodon(codon));
    }
  }
  return aminoacidos;
}
