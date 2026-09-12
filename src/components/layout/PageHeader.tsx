import React from 'react';
import { motion } from 'framer-motion';
import { NdopBorder } from '../ui/NdopBorder';

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
  bgImage = '/images/cte-djuttitsa-tea.jpg',
}) => {
  return (
    <div className="relative py-16 md:py-20 px-4 sm:px-8 overflow-hidden bg-slate-950 text-white transition-colors duration-300 border-b border-amber-500/20 shadow-md">
      {/* Background Image avec superposition dégradée adaptative */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Overlay avec motif traditionnel Ndop */}
      <div className="absolute inset-0 bg-ndop-pattern opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-emerald-950/60 to-[#090D16]" />

      {/* Contenu textuel centré */}
      <div className="relative max-w-5xl mx-auto text-center space-y-4 z-10">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-500/10 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-sm">
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight text-white hero-text-shadow"
        >
          {title}
        </motion.h1>

        <NdopBorder variant="gold" height={16} className="max-w-xs mx-auto opacity-80" />

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow-sm"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};
