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
      name: 'Domaine & Plantations de Thé de Djuttitsa',
      desc: 'S étendant sur des centaines d hectares de collines verdoyantes, les plantations offrent un paysage époustouflant, particulièrement le matin lorsque la brume se lève lentement.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
      tag: 'Incontournable',
    },
    {
      name: 'Les Monts Djuttitsa (2 050 m)',
      desc: 'Point culminant idéal pour les amateurs de trekking et d éco-tourisme. De là-haut, profitez d une vue panoramique à 360° sur toute la Menoua et les plaines environnantes.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      tag: 'Randonnée & Nature',
    },
    {
      name: 'Cascades & Rivières d Altitude',
      desc: 'Rivières cristallines s écoulant des montagnes volcaniques. Lieux paisibles bordés de végétation luxuriante et de ponts artisanaux.',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80',
      tag: 'Eaux vives',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Tourisme & Paysages d Exception"
        subtitle="Explorez la magie des hauts-plateaux : plantations de thé d altitude, collines brumeuses et randonnées inoubliables."
        badge="Ecotourisme & Évasion"
        bgImage="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-emerald-900 text-white space-y-2 border border-emerald-800">
            <Cloud className="w-8 h-8 text-amber-300" />
            <h4 className="font-bold font-heading text-lg">Climat Frais d Altitude</h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Températures douces comprises entre 16°C et 24°C toute l année. Prévoir un veste ou un pull chaud pour les matinées et les soirées.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800">
            <Compass className="w-8 h-8 text-emerald-400" />
            <h4 className="font-bold font-heading text-lg">Circuit Dégustation de Thé</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Visites guidées de la cueillette artisanale du thé et dégustation des grands crus infusés à l eau de source des hauts-plateaux.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-900/90 text-white space-y-2 border border-amber-800">
            <Sun className="w-8 h-8 text-amber-300" />
            <h4 className="font-bold font-heading text-lg">Meilleure Période de Visite</h4>
            <p className="text-xs text-amber-100 leading-relaxed">
              De Novembre à Avril (saison sèche) pour les randonnées dégagées et la photographie de paysages sous un ciel lumineux.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="emerald">Sites Rémarquables</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Les incontournables de votre séjour à Djuttitsa
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

        <Card className="p-8 md:p-12 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="amber">Guide Local & Accueil</Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Besoin d un guide ou d un hébergement eco-lodge ?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Le Comité de Développement et les acteurs du tourisme local organisent votre accueil, votre transport depuis Dschang ou Bafoussam et votre hébergement sur place.
            </p>
          </div>

          <Link to="/contact">
            <Button size="lg" variant="secondary" icon={<Phone className="w-5 h-5" />}>
              Contacter l Office du Tourisme
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};
