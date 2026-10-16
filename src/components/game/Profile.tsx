import { Edit3, Star, Coins, Zap, Flame, Award } from 'lucide-react';
import { useGameStore, xpParaRango } from '../../store/gameStore';
import { AvatarSVG } from '../avatar/AvatarSVG';
import { Button } from '../ui/Button';
import { audioManager } from '../../audio/audioManager';

interface ProfileProps {
  onEditarAvatar: () => void;
}

export function Profile({ onEditarAvatar }: ProfileProps) {
  const { nombre, apodo, avatar, xp, monedas, estrellasPorNivel, nivelesCompletados, rachaMaxima, totalAciertos } = useGameStore();
  const rango = xpParaRango(xp);
  const totalEstrellas = Object.values(estrellasPorNivel).reduce((a, b) => a + b, 0);

  const xpNext = rango === 'Estudiante' ? 500 : rango === 'Residente' ? 1500 : rango === 'Doctor/a' ? 3000 : 5000;
  const xpPrev = rango === 'Estudiante' ? 0 : rango === 'Residente' ? 500 : rango === 'Doctor/a' ? 1500 : 3000;
  const pct = ((xp - xpPrev) / (xpNext - xpPrev)) * 100;

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 text-center">
        <div className="flex justify-center mb-3">
          <AvatarSVG config={avatar} size={150} />
        </div>
        <h2 className="text-xl font-display font-bold text-slate-700 dark:text-slate-200">{nombre}</h2>
        <p className="text-sm text-slate-400">"{apodo}"</p>
        <div className="inline-block mt-2 bg-primary-100 dark:bg-primary-900/30 rounded-full px-4 py-1">
          <span className="text-sm font-bold text-primary-700 dark:text-primary-300">{rango}</span>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{xpPrev} XP</span>
            <span>{xpNext} XP</span>
          </div>
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-400 to-accent-400 rounded-full" style={{ width: `${Math.min(100, pct)}%` }} />
          </div>
        </div>

        <Button variant="ghost" size="md" className="mt-4" onClick={() => { audioManager.tocarEfecto('clic'); onEditarAvatar(); }}>
          <span className="flex items-center gap-2"><Edit3 size={16} /> Editar avatar</span>
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        <StatCard icon={<Star className="fill-warning-400 text-warning-400" />} label="Estrellas" value={totalEstrellas} />
        <StatCard icon={<Coins className="text-warning-500" />} label="Monedas" value={monedas} />
        <StatCard icon={<Zap className="text-primary-500" />} label="XP total" value={xp} />
        <StatCard icon={<Award className="text-accent-500" />} label="Niveles" value={nivelesCompletados} />
        <StatCard icon={<Flame className="text-error-500" />} label="Mejor racha" value={rachaMaxima} />
        <StatCard icon={<Star className="text-success-500" />} label="Aciertos" value={totalAciertos} />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <p className="text-xl font-bold text-slate-700 dark:text-slate-200">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}
