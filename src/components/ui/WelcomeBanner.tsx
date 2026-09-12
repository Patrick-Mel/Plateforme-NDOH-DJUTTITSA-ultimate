import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, X, ChevronRight, Compass, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NdopBorder } from './NdopBorder';

export const WelcomeBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="relative my-6 max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 dark:from-[#090D16] dark:via-emerald-950/80 dark:to-[#0B132B] text-white p-6 sm:p-8 shadow-2xl border border-amber-500/30">
          
          {/* Filigrane traditionnel Ndop */}
          <div className="absolute inset-0 bg-ndop-pattern opacity-10 pointer-events-none" />

          {/* Halo d'ambiance lumineuse */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Bouton Fermer */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors z-20"
            title="Masquer le message d'accueil"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Icône Royauté & Message */}
            <div className="flex items-start gap-4 text-left max-w-2xl">
              <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 shrink-0 shadow-inner mt-1">
                <Crown className="w-7 h-7 animate-pulse-subtle" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Meffo · Message d'Accueil de la Chefferie</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-white">
                  Nzie & Bienvenue à <span className="royal-gold-text">Ndoh-Djuttitsa</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Terre ancestrale du <strong>Groupement Bafou</strong> sur les Hauts-Plateaux de la Menoua (1 700 m – 2 050 m). Découvrez notre patrimoine culturel d'exception, notre illustre Domaine Théier (CTE) et les initiatives de notre communauté résiliente.
                </p>
              </div>
            </div>

            {/* Actions Rapides */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
              <Link
                to="/culture"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4" />
                <span>Explorer le Patrimoine</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                to="/histoire"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all duration-300"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Histoire & Dynasty (1908)</span>
              </Link>
            </div>

          </div>

          {/* Frise Ndop décorative bas */}
          <NdopBorder variant="gold" height={14} className="mt-4 opacity-75" />

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
