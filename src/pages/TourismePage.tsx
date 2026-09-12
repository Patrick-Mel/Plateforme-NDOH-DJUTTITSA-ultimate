import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Cloud, Compass, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NdopBorder } from '../components/ui/NdopBorder';

export const TourismePage: React.FC = () => {
  const spots = [
    {
      name: 'Complexe Théier de Djuttitsa (CTE)',
      desc: 'Plantations de thé s\'étendant à perte de vue sur les pentes d\'altitude. Un paysage majestueux particulièrement impressionnant au lever du soleil lorsque la brume glisse sur les collines.',
      image: '/images/cte-djuttitsa-tea.jpg',
      tag: 'Site Majeur',
    },
    {
      name: 'Hauts-Plateaux de Nkong-Ni (1 850 m - 2 050 m)',
      desc: 'Relief accidenté et crêtes offrant un panorama à 360° sur le département de la Menoua et les plaines environnantes de la région de l\'Ouest.',
      image: '/images/monts-bamboutos.jpg',
      tag: 'Randonnée & Nature',
    },
    {
      name: 'Rivières & Sanctuaires Naturels d\'Altitude',
      desc: 'Sources d\'eau pures alimentant les vallées maraîchères et bosquets sacrés protégés par la tradition coutumière du Groupement Bafou.',
      image: '/images/monts-bamboutos.jpg',
      tag: 'Eaux Vives',
    },
  ];

  return (
    <div className="space-y-16 pb-20 bg-slate-50 dark:bg-[#090D16] transition-colors">
      <PageHeader
        title="Tourisme & Paysages Théiers"
        subtitle="Découvrez la sérénité des hauts-plateaux : plantations du CTE, collines brumeuses et air pur de la Menoua."
        badge="Écotourisme d'Altitude"
        bgImage="/images/cte-djuttitsa-tea.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        {/* Banner Météo & Conseils Visiteur */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] text-slate-900 dark:text-white space-y-2 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <Cloud className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold font-heading text-lg">Climat Frais d'Altitude</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Températures douces comprises entre 15°C et 22°C toute l'année. Prévoir un vêtement chaud pour le matin et le soir.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] text-slate-900 dark:text-white space-y-2 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <Compass className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            <h4 className="font-bold font-heading text-lg">Parcours de la Cueillette</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Visite des champs de théiers et observation du savoir-faire traditionnel de la cueillette des jeunes pousses.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] text-slate-900 dark:text-white space-y-2 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <Phone className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold font-heading text-lg">Accueil & Guides Locaux</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Guides locaux et accompagnateurs communautaires pour des randonnées sécurisées dans la chefferie.
            </p>
          </div>
        </div>

        {/* Spots touristiques */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="amber">Sites Incontournables</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              Les Joyaux Naturels de Ndoh-Djuttitsa
            </h2>
            <NdopBorder variant="gold" height={16} className="max-w-xs mx-auto opacity-80" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {spots.map((spot, idx) => (
              <Card key={idx} className="flex flex-col h-full overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="amber">{spot.tag}</Badge>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                      {spot.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {spot.desc}
                    </p>
                  </div>
                </div>
                <NdopBorder variant="subtle" height={10} className="opacity-40" />
              </Card>
            ))}
          </div>
        </div>

        {/* Banner Appel à Visiter */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-900 text-white text-center space-y-6 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-ndop-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Venez Vivre l'Expérience des Hauts-Plateaux
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Pour organiser votre visite ou contacter les guides communautaires de Ndoh-Djuttitsa, prenez contact avec notre secrétariat.
            </p>
            <div className="pt-2">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-600 hover:to-amber-700">
                  Prendre Contact pour une Visite
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
