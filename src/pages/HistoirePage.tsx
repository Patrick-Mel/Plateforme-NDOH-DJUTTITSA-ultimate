import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Crown, Milestone, Landmark, BookOpen } from 'lucide-react';

export const HistoirePage: React.FC = () => {
  const timelineEvents = [
    {
      period: 'Origines ancestrales (XVIIIe siècle)',
      title: 'Fondation de la Chefferie & Installation',
      desc: 'Les premiers pionniers Bamiléké guidés par des dignitaires chasseurs s installent sur les hauteurs verdoyantes des hauts-plateaux. La chefferie s établit avec ses totems et conseils des neuf notables.',
    },
    {
      period: 'Période Coloniale & Plantation (1950)',
      title: 'Naissance du Domaine du Thé de Djuttitsa',
      desc: 'Découverte des micro-climats volcaniques propices à la culture du thé. Installation des premières unités agro-industrielles qui feront la renommée internationale du village.',
    },
    {
      period: 'Années 1980 - 2000',
      title: 'Modernisation et structuration des quartiers',
      desc: 'Création des premiers groupes scolaires, adduction d eau communautaire et mise en place du Comité de Développement de NDOH-DJUTTITSA (CODEV).',
    },
    {
      period: 'Ère Numérique (2026)',
      title: 'Plateforme Officielle & Diaspora Mondiale',
      desc: 'Lancement du portail numérique officiel pour préserver la mémoire du village, valoriser la culture Bamiléké et fédérer la diaspora mondiale.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Histoire & Origines de NDOH-DJUTTITSA"
        subtitle="Un voyage à travers les siècles : de la fondation de la Chefferie aux hauts-plateaux théiers modernes."
        badge="Mémoire & Patrimoine"
        bgImage="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        {/* Section 1 : Introduction historique */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="emerald">Identité & Royaume</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Une terre d histoire au sommet des hauts-plateaux
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              Situé à une altitude moyenne de 2 050 mètres dans la région de l Ouest-Cameroun, **NDOH-DJUTTITSA** est un village riche d une identité culturelle Bamiléké authentique. Son nom évoque la fraîcheur des montagnes et la fertilité des terres volcaniques.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              Transmise de génération en génération par la tradition orale et le Conseil des Sages, l histoire de NDOH-DJUTTITSA s inscrit dans le grand ensemble Bafou et du département de la Menoua.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <Crown className="w-6 h-6 text-amber-500 mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Chefferie Traditionnelle</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Garanti les us, coutumes et la justice coutumière.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <Landmark className="w-6 h-6 text-emerald-600 mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Lieux Sacrés</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Sanctuaires royaux et forêts sacrées préservées.</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80"
              alt="Chefferie et coutumes NDOH-DJUTTITSA"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Patrimoine Bamiléké</span>
              <h3 className="text-lg font-bold">L'esprit de solidarité ancestrale</h3>
            </div>
          </div>
        </div>

        {/* Section 2 : Frise Chronologique */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="amber">Chronologie Historique</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Les grandes étapes qui ont façonné le village
            </h2>
          </div>

          <div className="relative border-l-2 border-emerald-500/30 ml-4 sm:ml-32 space-y-10 py-4">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-10">
                {/* Puce chronologique */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-md">
                  <Milestone className="w-4 h-4 text-amber-300" />
                </div>

                <Card className="p-6 sm:p-8 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
                    {evt.period}
                  </span>
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                    {evt.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {evt.desc}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 : Note du Conseil de la Chefferie */}
        <Card className="p-8 bg-gradient-to-br from-emerald-950 to-slate-900 text-white space-y-4 border-emerald-800">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-amber-400" />
            <h3 className="text-2xl font-bold font-heading">Message des Sages & du Conseil Royal</h3>
          </div>
          <p className="text-slate-300 text-base leading-relaxed font-light">
            « Connaître d où l on vient est le compas qui guide où l on va. La jeunesse de NDOH-DJUTTITSA est invitée à chérir son histoire, à maintenir les liens du sang et du cœur, et à porter haut les valeurs d honnêteté, de travail et de respect de la terre. »
          </p>
        </Card>

      </div>
    </div>
  );
};
