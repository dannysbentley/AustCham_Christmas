import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export function Button({ className = '', isLoading, children, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-full bg-gradient-to-r from-festiveRed to-festiveGold px-6 py-3 font-semibold text-white shadow-lg shadow-festiveRed/30 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {isLoading ? 'Working…' : children}
    </button>
  );
}
