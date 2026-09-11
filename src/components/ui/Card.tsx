import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden ${
        hoverEffect ? 'hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
