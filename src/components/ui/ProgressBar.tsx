interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  label?: string;
  height?: string;
}

export function ProgressBar({ value, max, color = '#4f46e5', label, height = 'h-3' }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>{label}</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className={`w-full ${height} bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden`}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
