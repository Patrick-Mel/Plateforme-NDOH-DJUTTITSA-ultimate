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
    <div className="relative py-16 md:py-24 px-4 sm:px-8 overflow-hidden bg-slate-100 dark:bg-[#0B0F19] text-slate-900 dark:text-white transition-colors duration-300 border-b border-slate-200/60 dark:border-slate-800">
      {/* Background Image avec superposition dégradée adaptative */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-40 scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-slate-100/80 to-slate-100 dark:from-[#0B0F19]/90 dark:via-[#0B0F19]/70 dark:to-[#0B0F19] transition-colors duration-300" />

      {/* Contenu textuel centré */}
      <div className="relative max-w-5xl mx-auto text-center space-y-3 z-10">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 backdrop-blur-md">
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white drop-shadow-sm"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};
