import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-md',
  accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-md',
  success: 'bg-success-500 hover:bg-success-600 text-white shadow-md',
  warning: 'bg-warning-500 hover:bg-warning-600 text-white shadow-md',
  error: 'bg-error-500 hover:bg-error-600 text-white shadow-md',
  ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200',
};

const sizeStyles: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 rounded-lg',
  md: 'text-base px-4 py-2.5 rounded-xl',
  lg: 'text-lg px-6 py-3.5 rounded-2xl',
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`font-bold transition-all duration-200 active:scale-95 ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed active:scale-100' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
