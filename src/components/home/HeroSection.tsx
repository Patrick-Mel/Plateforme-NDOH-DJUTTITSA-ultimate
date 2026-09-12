import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, MapPin, ShieldCheck, Crown, Landmark } from 'lucide-react';
import { Button } from '../ui/Button';
import { NdopBorder } from '../ui/NdopBorder';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden bg-slate-950 text-white py-20 px-4 sm:px-8">
      
      {/* Background Image Haute Définition du Domaine du Thé et Collines de Djuttitsa */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 scale-105 transform duration-1000"
        style={{ backgroundImage: "url('/images/cte-djuttitsa-tea.jpg')" }}
      />
      
      {/* Overlay avec motif traditionnel Ndop */}
      <div className="absolute inset-0 bg-ndop-pattern opacity-15" />

      {/* Superposition Dégradée Somptueuse */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-emerald-950/60 to-[#090D16]" />

      <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10 w-full">
        
        {/* Message d'Accueil Royal Authentique Nativement Intégré */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold backdrop-blur-md shadow-xl"
        >
          <Crown className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Meffo & Nzie · Bienvenue à Ndoh-Djuttitsa</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 hidden sm:inline" />
          <span className="text-slate-300 hidden sm:inline">Groupement Bafou</span>
        </motion.div>

        {/* Titre Principal Majestueux */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading tracking-tight leading-none text-white hero-text-shadow"
          >
            NDOH-DJUTTITSA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xs sm:text-sm uppercase font-extrabold tracking-widest royal-gold-text"
          >
            Hauts-Plateaux de la Menoua · Alt. 1 700 m – 2 050 m
          </motion.p>

          <NdopBorder variant="gold" height={22} className="max-w-md mx-auto opacity-90 my-2" />
        </div>

        {/* Message d'Accueil & Présentation Authentique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <p className="text-base sm:text-xl text-slate-100 font-normal leading-relaxed drop-shadow-md">
            Bienvenue sur le portail officiel de la chefferie traditionnelle de <strong>Ndoh-Djuttitsa</strong>. Terre ancestrale du Groupement Bafou, sanctuaire du Complexe Théier (CTE) et symbole du dynamisme bamiléké à l'Ouest-Cameroun.
          </p>

          {/* Mot d'Accueil du Conseil des Notables */}
          <div className="p-5 rounded-2xl bg-white/5 border border-amber-500/20 backdrop-blur-sm text-left sm:text-center italic text-xs sm:text-sm text-amber-200/90 leading-relaxed shadow-inner">
            « Que la paix, la sérénité des montagnes et le travail de nos ancêtres guident vos pas en terre de Ndoh-Djuttitsa. »
            <span className="block mt-1 text-[11px] font-bold not-italic text-amber-400">— Le Conseil des Notables & la Chefferie Fodoh Touni III</span>
          </div>
        </motion.div>

        {/* Boutons d'Action Harmonieux */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link to="/culture" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-sm shadow-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold border border-amber-400" icon={<Compass className="w-4 h-4" />}>
              Explorer le Patrimoine Culturel
            </Button>
          </Link>

          <Link to="/histoire" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800 hover:border-amber-400/50" icon={<Landmark className="w-4 h-4 text-amber-400" />}>
              Découvrir l'Histoire & la Dynastie
            </Button>
          </Link>
        </motion.div>

        {/* Badges d'ancrage territorial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium"
        >
          <span className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Nkong-Ni · Menoua · Ouest-Cameroun</span>
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Chefferie reconnue depuis 1950</span>
          </span>
        </motion.div>

      </div>
    </section>
  );
};
