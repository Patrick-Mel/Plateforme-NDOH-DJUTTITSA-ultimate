import React from 'react';
import { Users, Mountain, Map, Leaf, ShieldCheck } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Ressortissants & Diaspora', value: '15 000+', icon: Users, desc: 'Au Cameroun et dans le monde' },
    { label: 'Altitude Moyenne', value: '1 850 m', icon: Mountain, desc: 'Hauts-Plateaux de la Menoua' },
    { label: 'Complexe Théier CTE', value: '500+ Ha', icon: Leaf, desc: 'Culture & Transformation' },
    { label: 'Secteurs & Quartiers', value: '12 Zones', icon: Map, desc: 'Ndoh, Loung, Mezet, Sa a...' },
    { label: 'Statut Sub-Chefferie', value: 'Depuis 1950', icon: ShieldCheck, desc: 'Fondée en 1908' },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 bg-white dark:bg-[#0B0F19] border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
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
