import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white py-20 px-4 sm:px-8">
      {/* Arrière-plan héro avec image HD des hauts-plateaux & plantations de thé */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45 scale-105 transition-transform duration-10000"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80')" }}
      />
      
      {/* Dégradés superposés pour lisibilité parfaite */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
      <div className="absolute inset-0 mist-overlay" />

      {/* Particules / Brume animée */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float pointer-events-none delay-1000" />

      <div className="relative max-w-6xl mx-auto text-center space-y-8 z-10">
        
        {/* Badge d en-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Plateforme Numérique Officielle du Village</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Titre Principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading tracking-tight leading-tight text-white"
        >
          Bienvenue à{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
            NDOH-DJUTTITSA
          </span>
        </motion.h1>

        {/* Sous-titre explicatif */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg sm:text-2xl text-slate-200 font-light max-w-3xl mx-auto leading-relaxed"
        >
          Joyau des Hauts-Plateaux de l Ouest-Cameroun (2 050 m). Terre d histoire, de plantations de thé sous la brume, de tradition Bamiléké et d avenir solidaire.
        </motion.p>

        {/* Boutons d action principaux */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link to="/culture">
            <Button size="lg" className="w-full sm:w-auto text-base shadow-emerald-500/20" icon={<Compass className="w-5 h-5" />}>
              Explorer le Patrimoine & la Culture
            </Button>
          </Link>

          <Link to="/services">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base bg-white/10 hover:bg-white/20 border-white/30 text-white" icon={<ArrowRight className="w-5 h-5" />}>
              Services, Écoles & Santé
            </Button>
          </Link>
        </motion.div>

        {/* Tags de géolocalisation et réassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300 font-medium"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Région de l Ouest · Arrondissement de Dschang</span>
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Chefferie Traditionnelle de 3ème Degré</span>
          </span>
        </motion.div>

      </div>
    </section>
  );
};
