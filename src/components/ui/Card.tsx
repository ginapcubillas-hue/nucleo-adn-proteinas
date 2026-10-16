import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
}

export function Card({ children, className = '', onClick, noPadding = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-md ${noPadding ? '' : 'p-5'} ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
