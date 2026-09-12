import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { UtensilsCrossed, Music, Sparkles, Shirt, ShieldCheck, Crown } from 'lucide-react';
import { NdopBorder } from '../components/ui/NdopBorder';

export const CulturePage: React.FC = () => {
  const culturalHighlights = [
    {
      title: 'Danse Patrimoniale Lali & Njang',
      icon: Music,
      desc: 'Danses sacrées exécutées lors des grandes cérémonies royales et festivités traditionnelles. Les rythmes envoûtants du tam-tam et des balafons célèbrent la bravoure et les récoltes.',
      image: '/images/evenement-ndoh.jpg',
    },
    {
      title: 'Gastronomie Traditionnelle Bamiléké',
      icon: UtensilsCrossed,
      desc: 'Célébrée pour le taro à la sauce jaune préparée aux condiments secrets, le Koki de haricot cuit à la vapeur de feuilles de bananier, et le vin de palme de montagne.',
      image: '/images/evenement-ndoh.jpg',
    },
    {
      title: 'Étoffe Royale : Le Toghu & le Ndop',
      icon: Shirt,
      desc: 'Étoffes sacrées brodées à la main de motifs géométriques (losanges, étoiles à 8 branches, chevrons), portées par le Chef, la Reine-Mère et les Notables.',
      image: '/images/chefferie-ndoh-djuttitsa.jpg',
    },
    {
      title: 'Artisanat & Ébénisterie Royale',
      icon: Sparkles,
      desc: 'Maîtrise de la sculpture sur bois (trônes à caryatides, masques rituels To\'o et Kuosi), de la vannerie et de la poterie en terre cuite cuite au feu de bois.',
      image: '/images/chefferie-ndoh-djuttitsa.jpg',
    },
  ];

  return (
    <div className="space-y-16 pb-20 bg-slate-50 dark:bg-[#090D16] transition-colors">
      <PageHeader
        title="Culture & Traditions de NDOH-DJUTTITSA"
        subtitle="Richesse des coutumes Bamiléké du Groupement Bafou, danses patrimoniales, étoffe sacrée Ndop et gastronomie."
        badge="Identité Culturelle"
        bgImage="/images/evenement-ndoh.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="amber">Coutumes & Célébrations</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Un Patrimoine Vivant d'un Raffinement Exceptionnel
          </h2>
          <NdopBorder variant="gold" height={16} className="max-w-xs mx-auto opacity-80" />
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            À NDOH-DJUTTITSA, la culture est un art de vivre quotidien qui rythme les saisons, réunit la communauté du Groupement Bafou et honore les ancêtres.
          </p>
        </div>

        {/* Grille des 4 piliers culturels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {culturalHighlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <Card key={idx} className="overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/90 text-slate-950 shrink-0 font-bold shadow-lg backdrop-blur-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-white drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <NdopBorder variant="subtle" height={10} className="opacity-40" />
              </Card>
            );
          })}
        </div>

        {/* Focus Chefferie & Notables */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-ndop-pattern opacity-10 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Conseil des Notables & Sociétés Secrètes</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Les Gardiens des Coutumes & du Sacré
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Le village de Ndoh-Djuttitsa est structuré autour du Conseil des Notables (9 et 7 Notables), veillant à l'harmonie sociale, au respect des totems et au maintien des valeurs de fraternité Bamiléké.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-white">Arbre de Paix (Tsé)</h4>
                  <p className="text-[11px] text-slate-300">Symbole traditionnel de réconciliation et de justice.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-3">
                <Crown className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-white">Société du Lali</h4>
                  <p className="text-[11px] text-slate-300">Fraternité des guerriers et protecteurs de la chefferie.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
