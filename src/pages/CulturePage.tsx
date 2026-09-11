import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { UtensilsCrossed, Music, Sparkles, Shirt } from 'lucide-react';

export const CulturePage: React.FC = () => {
  const culturalHighlights = [
    {
      title: 'Danse Patrimoniale Lali & Njang',
      icon: Music,
      desc: 'Danses sacrées exécutées lors des grandes cérémonies royales et festivités traditionnelles. Les rythmes envoûtants du tam-tam et des balafons célèbrent la bravoure et les récoltes.',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Gastronomie Traditionnelle Bamiléké',
      icon: UtensilsCrossed,
      desc: 'Célébrée pour le taro à la sauce jaune préparée aux condiments secrets, le Koki de haricot cuit à la vapeur de feuilles de bananier, et le vin de palme de montagne.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Vêtement d Apparat : Le Toghu',
      icon: Shirt,
      desc: 'Étoffe royale brodée à la main de motifs géométriques dorés, rouges et blancs, portée par les dignitaires, princes et membres des sociétés secrètes.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Artisanat & Ébénisterie Royale',
      icon: Sparkles,
      desc: 'Maîtrise de la sculpture sur bois (trônes à statuettes, masques rituels), de la vannerie et de la poterie en terre cuite cuite au feu de bois.',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Culture & Traditions de NDOH-DJUTTITSA"
        subtitle="Richesse des coutumes Bamiléké, danses patrimoniales, gastronomie du terroir et savoir-faire ancestral."
        badge="Identité Culturelle"
        bgImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="amber">Coutumes & Célébrations</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            Un patrimoine vivant d un raffinement exceptionnel
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            À NDOH-DJUTTITSA, la culture n est pas un simple souvenir du passé : c est un art de vivre quotidien qui rythme les saisons, réunit les familles et honore les ancêtres.
          </p>
        </div>

        {/* Grille des 4 piliers culturels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {culturalHighlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <Card key={idx} className="flex flex-col h-full overflow-hidden group">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-amber-300 font-bold text-sm">
                    <IconComponent className="w-5 h-5" />
                    <span>{item.title}</span>
                  </div>
                </div>

                <div className="p-6 flex-grow space-y-3">
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Section Événements Culturels Majeurs */}
        <div className="bg-white dark:bg-[#111827] text-slate-900 dark:text-white rounded-3xl p-8 md:p-12 space-y-6 border border-slate-200 dark:border-slate-800 transition-colors duration-300 shadow-sm">
          <div className="space-y-2">
            <Badge variant="emerald">Agenda des Rites</Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Les grands rendez-vous culturels annuels
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">DÉCEMBRE - JANVIER</span>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">Le Festival Biennal Lali</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Grand rassemblement communautaire avec concours de danses royales et intronisations.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">AOÛT - SEPTEMBRE</span>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">Célébration des Récoltes</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Action de grâce pour les premières récoltes de pomme de terre, maïs et thé de montagne.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">TOUT AU LONG DE L ANNEÉ</span>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">Funérailles Traditionnelles</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Cérémonies solennelles et festives rendant hommage à la mémoire des anciens disparus.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
