import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, MapPin, ShieldCheck, Mountain } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-[#0B0F19] text-slate-900 dark:text-white py-24 px-4 sm:px-8 transition-colors duration-300">
      {/* Photo Haute Définition Réaliste du Domaine du Thé & Collines Brumeuses */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 dark:opacity-40 scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80')" }}
      />
      
      {/* Superposition Dégradée Adaptative Thème Clair / Sombre */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-slate-50/80 to-slate-100 dark:from-[#0B0F19]/90 dark:via-[#0B0F19]/70 dark:to-[#0B0F19] transition-colors duration-300" />

      <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
        
        {/* Tagline Administrative & Géographique */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-700/80 text-emerald-800 dark:text-emerald-400 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm transition-colors duration-300"
        >
          <Mountain className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Sous-Chefferie du Groupement Bafou · Arrondissement de Nkong-Ni</span>
        </motion.div>

        {/* Titre Ultra Élégant */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading tracking-tight leading-tight text-slate-900 dark:text-white"
        >
          NDOH-DJUTTITSA
        </motion.h1>

        {/* Description Factuelle Réelle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-xl text-slate-700 dark:text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed"
        >
          Localité d altitude des Hauts-Plateaux de la Menoua (1 700 m - 2 050 m). Terre de tradition Bamiléké, du célèbre Complexe Théier (CTE) et d une communauté dynamique au Cameroun et dans la diaspora.
        </motion.p>

        {/* Boutons d Action Modernes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link to="/culture">
            <Button size="lg" className="w-full sm:w-auto text-sm shadow-md bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white" icon={<Compass className="w-4 h-4" />}>
              Découvrir la Culture & l Histoire
            </Button>
          </Link>

          <Link to="/services">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm bg-white/80 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700" icon={<ArrowRight className="w-4 h-4" />}>
              CMA, Écoles & Services
            </Button>
          </Link>
        </motion.div>

        {/* Badges de Réassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-medium"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Département de la Menoua · Région de l Ouest</span>
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Chefferie reconnue depuis 1950</span>
          </span>
        </motion.div>

      </div>
    </section>
  );
};
