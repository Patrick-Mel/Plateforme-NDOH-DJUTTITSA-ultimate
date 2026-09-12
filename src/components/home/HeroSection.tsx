import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, MapPin, ShieldCheck, Crown } from 'lucide-react';
import { Button } from '../ui/Button';
import { WelcomeBanner } from '../ui/WelcomeBanner';
import { NdopBorder } from '../ui/NdopBorder';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-slate-950 text-white py-16 px-4 sm:px-8">
      
      {/* Background Image Haute Définition du Domaine du Thé et Collines de Djuttitsa */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transform duration-1000"
        style={{ backgroundImage: "url('/images/cte-djuttitsa-tea.jpg')" }}
      />
      
      {/* Overlay avec motif traditionnel Ndop */}
      <div className="absolute inset-0 bg-ndop-pattern opacity-15" />

      {/* Superposition Dégradée Somptueuse */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-emerald-950/60 to-[#090D16]" />

      <div className="relative max-w-6xl mx-auto text-center space-y-8 z-10 w-full pt-4">
        
        {/* Message de Bienvenue Royal Immersif */}
        <WelcomeBanner />

        {/* Tagline Administrative & Géographique */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg"
        >
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Chefferie du Groupement Bafou · Arrondissement de Nkong-Ni</span>
        </motion.div>

        {/* Titre Ultra Élégant avec Gradient Or & Ndop */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading tracking-tight leading-tight text-white hero-text-shadow"
          >
            NDOH-DJUTTITSA
          </motion.h1>

          <NdopBorder variant="gold" height={20} className="max-w-md mx-auto opacity-90" />
        </div>

        {/* Description Factuelle Authentique */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-xl text-slate-200 font-normal max-w-3xl mx-auto leading-relaxed drop-shadow-md"
        >
          Terre de majesté des Hauts-Plateaux de la Menoua (1 700 m – 2 050 m). Berceau des traditions Bamiléké du Groupement Bafou, du Domaine du Thé (CTE) et d'un avenir partagé.
        </motion.p>

        {/* Boutons d'Action Modernes & Culturels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link to="/culture" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-sm shadow-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold border border-amber-400" icon={<Compass className="w-4 h-4" />}>
              Découvrir la Culture & l'Histoire
            </Button>
          </Link>

          <Link to="/services" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800 hover:border-amber-400/50" icon={<ArrowRight className="w-4 h-4" />}>
              CMA, Écoles & Services
            </Button>
          </Link>
        </motion.div>

        {/* Badges de Réassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium"
        >
          <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Département de la Menoua · Ouest-Cameroun</span>
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Chefferie reconnue depuis 1950</span>
          </span>
        </motion.div>

      </div>
    </section>
  );
};
