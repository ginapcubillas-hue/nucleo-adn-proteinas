import { Star } from 'lucide-react';

interface StarsProps {
  count: number;
  max?: number;
  size?: number;
  animated?: boolean;
}

export function Stars({ count, max = 3, size = 24, animated = false }: StarsProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={i < count ? 'fill-warning-400 text-warning-400' : 'text-slate-300 dark:text-slate-600'}
          style={animated && i < count ? { animation: `pop 0.3s ease-out ${i * 0.15}s both` } : undefined}
        />
      ))}
    </div>
  );
}
