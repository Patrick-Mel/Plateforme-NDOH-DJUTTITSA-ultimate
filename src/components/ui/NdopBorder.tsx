import React from 'react';

interface NdopBorderProps {
  className?: string;
  variant?: 'gold' | 'emerald' | 'subtle';
  height?: number;
}

export const NdopBorder: React.FC<NdopBorderProps> = ({
  className = '',
  variant = 'gold',
  height = 16,
}) => {
  const strokeColor =
    variant === 'gold'
      ? '#f59e0b'
      : variant === 'emerald'
      ? '#10b981'
      : '#94a3b8';

  return (
    <div className={`w-full overflow-hidden flex items-center justify-center my-2 opacity-85 select-none ${className}`}>
      <svg
        className="w-full"
        height={height}
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="ndop-pattern-strip" width="60" height="24" patternUnits="userSpaceOnUse">
            {/* Losange central Ndop */}
            <polygon points="30,2 58,12 30,22 2,12" fill="none" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" />
            <polygon points="30,6 50,12 30,18 10,12" fill="none" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" />
            {/* Chevrons royaux */}
            <path d="M0,12 L15,2 L30,12 L45,2 L60,12" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.5" />
            <path d="M0,12 L15,22 L30,12 L45,22 L60,12" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.5" />
            {/* Étoile sacrée à 8 branches centrale */}
            <circle cx="30" cy="12" r="2" fill={strokeColor} opacity="0.9" />
          </pattern>
        </defs>
        <rect width="100%" height="24" fill="url(#ndop-pattern-strip)" />
      </svg>
    </div>
  );
};
