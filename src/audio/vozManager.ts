let vozActual: SpeechSynthesisUtterance | null = null;
let vocesDisponibles: SpeechSynthesisVoice[] = [];

export function initVoces(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([]);
      return;
    }
    const cargar = () => {
      vocesDisponibles = window.speechSynthesis.getVoices();
      resolve(vocesDisponibles);
    };
    const voces = window.speechSynthesis.getVoices();
    if (voces.length > 0) {
      vocesDisponibles = voces;
      resolve(voces);
    } else {
      window.speechSynthesis.onvoiceschanged = cargar;
      setTimeout(() => {
        if (vocesDisponibles.length === 0) {
          vocesDisponibles = window.speechSynthesis.getVoices();
          resolve(vocesDisponibles);
        }
      }, 1000);
    }
  });
}

export function getVoces(): SpeechSynthesisVoice[] {
  return vocesDisponibles;
}

export function getVocesEspanol(): SpeechSynthesisVoice[] {
  return vocesDisponibles.filter(v =>
    v.lang.startsWith('es') || v.lang.startsWith('es-') || v.name.toLowerCase().includes('spanish') || v.name.toLowerCase().includes('español')
  );
}

export function hablar(
  texto: string,
  opciones: { vozURI?: string; velocidad?: number; onEnd?: () => void } = {},
): void {
  if (!('speechSynthesis' in window)) {
    opciones.onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(texto);
  utter.lang = 'es-ES';
  utter.rate = opciones.velocidad ?? 1;
  utter.pitch = 1.1;
  utter.volume = 1;

  if (opciones.velocidad) utter.rate = opciones.velocidad;

  let vozSeleccionada: SpeechSynthesisVoice | undefined;
  if (opciones.velocidad !== undefined || opciones.vozURI) {
    if (opciones.vozURI) {
      vozSeleccionada = vocesDisponibles.find(v => v.voiceURI === opciones.vozURI);
    }
  }
  if (!vozSeleccionada) {
    const vocesEs = getVocesEspanol();
    vozSeleccionada = vocesEs[0] ?? vocesDisponibles.find(v => v.lang.startsWith('es'));
  }
  if (vozSeleccionada) utter.voice = vozSeleccionada;

  utter.onend = () => {
    vozActual = null;
    opciones.onEnd?.();
  };
  utter.onerror = () => {
    vozActual = null;
    opciones.onEnd?.();
  };

  vozActual = utter;
  window.speechSynthesis.speak(utter);
}

export function cancelarVoz(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    vozActual = null;
  }
}

export function estaHablando(): boolean {
  return 'speechSynthesis' in window && window.speechSynthesis.speaking;
}

export function soportaVoz(): boolean {
  return 'speechSynthesis' in window;
}
