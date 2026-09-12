import React from 'react';
import { Users, Mountain, Map, Leaf, Crown } from 'lucide-react';
import { NdopBorder } from '../ui/NdopBorder';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Habitants du Village', value: '12 000+', icon: Users, desc: 'Population résidente & diaspora' },
    { label: 'Altitude Moyenne', value: '1 850 m', icon: Mountain, desc: 'Hauts-Plateaux de la Menoua' },
    { label: 'Complexe Théier CTE', value: '1 660 Ha', icon: Leaf, desc: 'Culture & transformation du thé' },
    { label: 'Quartiers du Village', value: '7 Quartiers', icon: Map, desc: 'Ndoh, Loung, Mezet, Sa\'a...' },
    { label: 'Fondation Chefferie', value: 'Depuis 1908', icon: Crown, desc: 'Groupement Bafou · Menoua' },
  ];

  return (
    <section className="relative py-16 px-4 sm:px-8 bg-slate-50 dark:bg-[#090D16] border-y border-slate-200/80 dark:border-slate-800/80 transition-colors overflow-hidden">
      
      {/* Motif Ndop d'arrière-plan */}
      <div className="absolute inset-0 bg-ndop-pattern opacity-5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        
        <NdopBorder variant="gold" height={16} className="mb-8 opacity-80" />

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-3xl bg-white dark:bg-[#111827]/90 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 group overflow-hidden"
              >
                {/* Accent doré au survol */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </div>
                
                <div className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-1">
                  {stat.label}
                </div>
                
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  {stat.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
