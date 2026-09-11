import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Cloud, Sun, Compass, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TourismePage: React.FC = () => {
  const spots = [
    {
      name: 'Complexe Théier de Djuttitsa (CTE)',
      desc: 'Plantations de thé s étendant à perte de vue sur les pentes volcaniques. Un paysage emblématique particulièrement impressionnant au lever du soleil lorsque la brume glisse sur les collines.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
      tag: 'Site Majeur',
    },
    {
      name: 'Hauts-Plateaux de Nkong-Ni (1 850 m - 2 050 m)',
      desc: 'Relief accidenté et crêtes majestueuses offrant un panorama à 360° sur le département de la Menoua et les plaines environnantes de la région de l Ouest.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      tag: 'Randonnée & Nature',
    },
    {
      name: 'Rivières & Sanctuaires Naturels d Altitude',
      desc: 'Sources d eau pures alimentant les vallées maraîchères et bosquets sacrés protégés par la tradition coutumière.',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80',
      tag: 'Eaux vives',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Tourisme & Paysages Théiers"
        subtitle="Découvrez la sérénité des hauts-plateaux : plantations du CTE, collines brumeuses et air pur de la Menoua."
        badge="Écotourisme d Altitude"
        bgImage="https://upload.wikimedia.org/wikipedia/commons/4/4b/Plantation_de_th%C3%A9_-_Ouest_du_Cameroun.JPG"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        {/* Banner Météo & Conseils Visiteur */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-100 dark:bg-[#111827] text-slate-900 dark:text-white space-y-2 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <Cloud className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold font-heading text-lg text-slate-900 dark:text-white">Climat Frais d Altitude</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Températures douces comprises entre 15°C et 22°C toute l année. Prévoir un vêtement chaud pour le matin et le soir.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-100 dark:bg-[#111827] text-slate-900 dark:text-white space-y-2 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <Compass className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            <h4 className="font-bold font-heading text-lg text-slate-900 dark:text-white">Parcours de la Cueillette</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Visite des champs de théiers et observation du savoir-faire traditionnel de la cueillette des jeunes pousses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-100 dark:bg-[#111827] text-slate-900 dark:text-white space-y-2 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <Sun className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold font-heading text-lg text-slate-900 dark:text-white">Période Idéale de Séjour</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              De Novembre à Avril pour profiter d une excellente visibilité sur les montagnes et d un ciel lumineux.
            </p>
          </div>
        </div>

        {/* Attractions Majeures */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="emerald">Sites Remarquables</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Les incontournables de Ndoh-Djuttitsa
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {spots.map((spot, idx) => (
              <Card key={idx} className="flex flex-col h-full overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="amber">{spot.tag}</Badge>
                  </div>
                </div>

                <div className="p-6 flex-grow space-y-3">
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                    {spot.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {spot.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Appel Contact Accueil */}
        <Card className="p-8 md:p-12 bg-white dark:bg-[#111827] text-slate-900 dark:text-white rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 transition-colors duration-300 shadow-sm">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="amber">Accueil & Orientation</Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Vous prévoyez un séjour ou une visite d étude ?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Prenez contact avec le secrétariat communautaire pour obtenir des conseils d accès depuis Dschang ou Bafoussam.
            </p>
          </div>

          <Link to="/contact">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white" icon={<Phone className="w-4 h-4" />}>
              Nous Contacter
            </Button>
          </Link>
        </Card>

      </div>
    </div>
  );
};
