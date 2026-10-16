let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let musicaGain: GainNode | null = null;
let efectosGain: GainNode | null = null;
let intervaloMusica: ReturnType<typeof setInterval> | null = null;
let pistaActual: 'menu' | 'juego' | 'resultados' | null = null;
let musicaIniciada = false;

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);

    musicaGain = ctx.createGain();
    musicaGain.gain.value = 0.3;
    musicaGain.connect(masterGain);

    efectosGain = ctx.createGain();
    efectosGain.gain.value = 0.5;
    efectosGain.connect(masterGain);
  }
  return ctx;
}

export const audioManager = {
  init() {
    getCtx();
  },

  resume() {
    const c = getCtx();
    if (c.state === 'suspended') c.resume();
  },

  setVolumenMusica(v: number) {
    if (musicaGain) musicaGain.gain.value = v;
  },

  setVolumenEfectos(v: number) {
    if (efectosGain) efectosGain.gain.value = v;
  },

  bajarMusicaParaVoz() {
    if (musicaGain && ctx) {
      musicaGain.gain.linearRampToValueAtTime(
        musicaGain.gain.value * 0.15,
        ctx.currentTime + 0.3,
      );
    }
  },

  restaurarMusica(volumen: number) {
    if (musicaGain && ctx) {
      musicaGain.gain.linearRampToValueAtTime(volumen, ctx.currentTime + 0.3);
    }
  },

  tocarEfecto(tipo: string) {
    const c = getCtx();
    if (!efectosGain) return;
    const ahora = c.currentTime;

    switch (tipo) {
      case 'clic': {
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.frequency.value = 600;
        osc.type = 'sine';
        g.gain.setValueAtTime(0.15, ahora);
        g.gain.exponentialRampToValueAtTime(0.001, ahora + 0.08);
        osc.connect(g); g.connect(efectosGain);
        osc.start(ahora); osc.stop(ahora + 0.08);
        break;
      }
      case 'acierto': {
        [523, 659, 784].forEach((freq, i) => {
          const osc = c.createOscillator();
          const g = c.createGain();
          osc.frequency.value = freq;
          osc.type = 'sine';
          g.gain.setValueAtTime(0, ahora + i * 0.08);
          g.gain.linearRampToValueAtTime(0.2, ahora + i * 0.08 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.001, ahora + i * 0.08 + 0.3);
          osc.connect(g); g.connect(efectosGain!);
          osc.start(ahora + i * 0.08); osc.stop(ahora + i * 0.08 + 0.3);
        });
        break;
      }
      case 'error': {
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.frequency.setValueAtTime(440, ahora);
        osc.frequency.linearRampToValueAtTime(330, ahora + 0.2);
        osc.type = 'sine';
        g.gain.setValueAtTime(0.12, ahora);
        g.gain.exponentialRampToValueAtTime(0.001, ahora + 0.3);
        osc.connect(g); g.connect(efectosGain);
        osc.start(ahora); osc.stop(ahora + 0.3);
        break;
      }
      case 'racha': {
        [523, 659, 784, 1047].forEach((freq, i) => {
          const osc = c.createOscillator();
          const g = c.createGain();
          osc.frequency.value = freq;
          osc.type = 'triangle';
          g.gain.setValueAtTime(0, ahora + i * 0.1);
          g.gain.linearRampToValueAtTime(0.18, ahora + i * 0.1 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.001, ahora + i * 0.1 + 0.4);
          osc.connect(g); g.connect(efectosGain!);
          osc.start(ahora + i * 0.1); osc.stop(ahora + i * 0.1 + 0.4);
        });
        break;
      }
      case 'nivel': {
        [392, 523, 659, 784, 1047].forEach((freq, i) => {
          const osc = c.createOscillator();
          const g = c.createGain();
          osc.frequency.value = freq;
          osc.type = 'triangle';
          g.gain.setValueAtTime(0, ahora + i * 0.12);
          g.gain.linearRampToValueAtTime(0.2, ahora + i * 0.12 + 0.03);
          g.gain.exponentialRampToValueAtTime(0.001, ahora + i * 0.12 + 0.5);
          osc.connect(g); g.connect(efectosGain!);
          osc.start(ahora + i * 0.12); osc.stop(ahora + i * 0.12 + 0.5);
        });
        break;
      }
      case 'monedas': {
        [988, 1319].forEach((freq, i) => {
          const osc = c.createOscillator();
          const g = c.createGain();
          osc.frequency.value = freq;
          osc.type = 'square';
          g.gain.setValueAtTime(0, ahora + i * 0.06);
          g.gain.linearRampToValueAtTime(0.1, ahora + i * 0.06 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.001, ahora + i * 0.06 + 0.15);
          osc.connect(g); g.connect(efectosGain!);
          osc.start(ahora + i * 0.06); osc.stop(ahora + i * 0.06 + 0.15);
        });
        break;
      }
      case 'desbloqueo': {
        [659, 784, 988, 1319].forEach((freq, i) => {
          const osc = c.createOscillator();
          const g = c.createGain();
          osc.frequency.value = freq;
          osc.type = 'sine';
          g.gain.setValueAtTime(0, ahora + i * 0.08);
          g.gain.linearRampToValueAtTime(0.15, ahora + i * 0.08 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.001, ahora + i * 0.08 + 0.3);
          osc.connect(g); g.connect(efectosGain!);
          osc.start(ahora + i * 0.08); osc.stop(ahora + i * 0.08 + 0.3);
        });
        break;
      }
      case 'fanfarria': {
        [523, 523, 523, 587, 523, 784].forEach((freq, i) => {
          const osc = c.createOscillator();
          const g = c.createGain();
          osc.frequency.value = freq;
          osc.type = 'triangle';
          const t = ahora + i * 0.15;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.18, t + 0.03);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          osc.connect(g); g.connect(efectosGain!);
          osc.start(t); osc.stop(t + 0.35);
        });
        break;
      }
      case 'aplausos': {
        for (let i = 0; i < 12; i++) {
          const noise = c.createBufferSource();
          const buffer = c.createBuffer(1, 4410, 44100);
          const data = buffer.getChannelData(0);
          for (let j = 0; j < 4410; j++) data[j] = (Math.random() * 2 - 1) * 0.5;
          noise.buffer = buffer;
          const g = c.createGain();
          const t = ahora + i * 0.04 + Math.random() * 0.02;
          g.gain.setValueAtTime(0.08, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
          noise.connect(g); g.connect(efectosGain!);
          noise.start(t); noise.stop(t + 0.08);
        }
        break;
      }
    }
  },

  iniciarMusica(pista: 'menu' | 'juego' | 'resultados', volumen: number) {
    if (!musicaIniciada) {
      musicaIniciada = true;
    }
    if (pistaActual === pista) return;
    pistaActual = pista;
    if (intervaloMusica) clearInterval(intervaloMusica);
    this._reproducirMusica(pista, volumen);
    intervaloMusica = setInterval(() => this._reproducirMusica(pista, volumen), 8000);
  },

  _reproducirMusica(pista: string, volumen: number) {
    const c = getCtx();
    if (!musicaGain) return;
    const ahora = c.currentTime;

    let acordes: number[][] = [];
    let tipoOnda: OscillatorType = 'sine';
    let duracion = 4;

    if (pista === 'menu') {
      acordes = [[262, 330, 392], [294, 370, 440], [330, 415, 494], [294, 370, 440]];
      tipoOnda = 'sine';
      duracion = 4;
    } else if (pista === 'juego') {
      acordes = [[220, 277, 330], [247, 311, 370], [262, 330, 392], [247, 311, 370]];
      tipoOnda = 'triangle';
      duracion = 3;
    } else {
      acordes = [[262, 330, 392, 523], [294, 370, 440, 554], [330, 415, 494, 587], [294, 370, 440, 554]];
      tipoOnda = 'sine';
      duracion = 5;
    }

    if (musicaGain.gain.value < 0.01) return;

    acordes.forEach((acorde, i) => {
      const t = ahora + (i * duracion) / acordes.length;
      acorde.forEach(freq => {
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.frequency.value = freq;
        osc.type = tipoOnda;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(volumen * 0.08, t + 0.3);
        g.gain.linearRampToValueAtTime(volumen * 0.04, t + duracion / acordes.length - 0.3);
        g.gain.linearRampToValueAtTime(0, t + duracion / acordes.length);
        osc.connect(g); g.connect(musicaGain!);
        osc.start(t); osc.stop(t + duracion / acordes.length);
      });
    });
  },

  detenerMusica() {
    if (intervaloMusica) {
      clearInterval(intervaloMusica);
      intervaloMusica = null;
    }
    pistaActual = null;
    if (musicaGain && ctx) {
      musicaGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    }
  },

  reanudarMusica(volumen: number) {
    if (musicaGain && ctx) {
      musicaGain.gain.linearRampToValueAtTime(volumen, ctx.currentTime + 0.5);
    }
  },
};
