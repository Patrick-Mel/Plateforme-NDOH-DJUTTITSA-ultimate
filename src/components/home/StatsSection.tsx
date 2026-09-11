import React from 'react';
import { Users, Mountain, Map, Leaf, Building2 } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Population estimée', value: '15 000+', icon: Users, desc: 'Résidents et Diaspora active' },
    { label: 'Altitude moyenne', value: '2 050 m', icon: Mountain, desc: 'Hauts-Plateaux de l Ouest' },
    { label: 'Domaine du Thé', value: '500+ Ha', icon: Leaf, desc: 'Plantations volcaniques' },
    { label: 'Quartiers historiques', value: '5 Secteurs', icon: Map, desc: 'Djuttitsa Centre, Bafou...' },
    { label: 'Établissements & Santé', value: '12+', icon: Building2, desc: 'Lycées, CSI, Coopératives' },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
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
