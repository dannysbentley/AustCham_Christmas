import type { PropsWithChildren } from 'react';

interface FloatingCardProps extends PropsWithChildren {
  delay?: number;
  paused?: boolean;
  offset?: number;
}

export function FloatingCard({ children, delay = 0, paused = false, offset = 0 }: FloatingCardProps) {
  return (
    <div
      className="transition-transform will-change-transform"
      style={{
        animation: paused ? 'none' : `float 16s ease-in-out infinite`,
        animationDelay: `${delay}ms`,
        transform: `translateY(${Math.sin(offset) * 10}px)`
      }}
    >
      {children}
    </div>
  );
}
