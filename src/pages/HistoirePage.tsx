import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Crown, Milestone, ShieldCheck } from 'lucide-react';

export const HistoirePage: React.FC = () => {
  const timelineEvents = [
    {
      period: '1908 — Fondation',
      title: 'Installation des Premières Lignées',
      desc: 'Fondation de la communauté par les premières familles pionnières Bamiléké sur les hauts-plateaux de Nkong-Ni, attirées par la clémence du climat et la fertilité des terres.',
    },
    {
      period: '1950 — Reconnaissance Administrative',
      title: 'Érection en Chefferie de 3ème Degré',
      desc: 'Reconnaissance officielle de Ndoh-Djuttitsa comme chefferie rattachée au Groupement Bafou (Chefferie supérieure de 1er degré dans la Menoua).',
    },
    {
      period: 'Milieu du XXe siècle',
      title: 'Implémentation de la Culture Théière (CTE)',
      desc: 'Création des grandes plantations industrielles du Complexe Théier de Djuttitsa (CTE), faisant du village l un des bassins de production théière majeurs de l Afrique Centrale.',
    },
    {
      period: 'Dynastie Actuelle',
      title: 'Règne de S.M. Jean-Paul Melaga Djuttitsa Fodoh Touni III',
      desc: 'Poursuite de la modernisation, structuration des réseaux d eau et d électricité et préservation des coutumes ancestrales Bamiléké.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Histoire & Dynastie de Ndoh-Djuttitsa"
        subtitle="De la fondation en 1908 à la chefferie moderne du groupement Bafou (Menoua)."
        badge="Mémoire & Dynastie"
        bgImage="https://upload.wikimedia.org/wikipedia/commons/e/ea/Chefferie_Bafou_.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="emerald">Dynastie & Coutumes</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Une chefferie ancrée dans le Groupement Bafou
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              Rattaché au groupement Bafou dans l arrondissement de Nkong-Ni (Département de la Menoua), **Ndoh-Djuttitsa** est dirigé par son chef traditionnel **S.M. Jean-Paul Melaga Djuttitsa Fodoh Touni III**.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              Créé en 1908 et officiellement érigé en chefferie en 1950, le village préserve l organisation coutumière Bamiléké avec le Conseil des Notables, la préservation des lieux sacrés et le respect de la hiérarchie traditionnelle.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <Crown className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Dynastie Fodoh Touni</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Garants des valeurs traditionnelles Bamiléké.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">3ème Degré Officiel</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Rattaché à la Chefferie Supérieure Bafou (1er degré).</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 h-[400px]">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/77/Chefferie_Bafou_Entr%C3%A9e_principal.jpg"
              alt="Entrée Principale Chefferie Bafou"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Patrimoine de Nkong-Ni</span>
              <h3 className="text-lg font-bold">Tradition et respect des valeurs ancestrales</h3>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="amber">Chronologie Authentique</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Les repères historiques majeurs
            </h2>
          </div>

          <div className="relative border-l-2 border-slate-300 dark:border-slate-800 ml-4 sm:ml-32 space-y-8 py-2">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-10">
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-emerald-700 dark:bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <Milestone className="w-4 h-4 text-amber-300" />
                </div>

                <Card className="p-6 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 block">
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
      </div>
    </div>
  );
};
