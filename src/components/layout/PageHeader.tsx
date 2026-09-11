import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  bgImage?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  bgImage = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80',
}) => {
  return (
    <div className="relative py-20 md:py-28 px-4 sm:px-8 overflow-hidden bg-slate-950 text-white">
      {/* Background Image avec superposition dégradée */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      <div className="absolute inset-0 mist-overlay opacity-80" />

      {/* Contenu textuel centré */}
      <div className="relative max-w-5xl mx-auto text-center space-y-4">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight text-white drop-shadow-md"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};
