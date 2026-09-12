import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Crown, Milestone, ShieldCheck } from 'lucide-react';
import { NdopBorder } from '../components/ui/NdopBorder';

export const HistoirePage: React.FC = () => {
  const timelineEvents = [
    {
      period: '1908 — Fondation Ancestrale',
      title: 'Installation des Premières Lignées Bamiléké',
      desc: 'Fondation de la communauté par les premières familles pionnières Bamiléké sur les hauts-plateaux de Nkong-Ni, attirées par la clémence du climat et la fertilité des terres.',
    },
    {
      period: '1950 — Érection Administrative',
      title: 'Érection en Chefferie de 3ème Degré',
      desc: 'Reconnaissance officielle de Ndoh-Djuttitsa comme chefferie rattachée au Groupement Bafou (Chefferie supérieure de 1er degré dans la Menoua).',
    },
    {
      period: 'Milieu du XXe siècle',
      title: 'Implémentation du Complexe Théier (CTE)',
      desc: 'Création des grandes plantations industrielles du Complexe Théier de Djuttitsa (CTE), faisant du village l\'un des bassins de production théière majeurs de l\'Afrique Centrale.',
    },
    {
      period: 'Dynastie Actuelle',
      title: 'Règne de S.M. Jean-Paul Melaga Djuttitsa Fodoh Touni III',
      desc: 'Poursuite de la modernisation, structuration des réseaux d\'eau et d\'électricité et préservation des coutumes ancestrales Bamiléké.',
    },
  ];

  return (
    <div className="space-y-16 pb-20 bg-slate-50 dark:bg-[#090D16] transition-colors">
      <PageHeader
        title="Histoire & Dynastie de NDOH-DJUTTITSA"
        subtitle="De la fondation en 1908 à la chefferie moderne de Ndoh-Djuttitsa (Groupement Bafou, Menoua)."
        badge="Mémoire & Dynastie"
        bgImage="/images/chefferie-ndoh-djuttitsa.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="emerald">Dynastie & Coutumes</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              La Chefferie Traditionnelle de Ndoh-Djuttitsa
            </h2>
            <NdopBorder variant="gold" height={16} className="opacity-80" />
            
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              Située dans l'arrondissement de Nkong-Ni (Département de la Menoua), la <strong>Chefferie de Ndoh-Djuttitsa</strong> est dirigée par son chef traditionnel <strong>S.M. Jean-Paul Melaga Djuttitsa Fodoh Touni III</strong>.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              Créée en 1908 et officiellement érigée en chefferie de 3ème degré en 1950, la communauté préserve l'organisation coutumière Bamiléké avec le Conseil des Notables, la préservation des lieux sacrés et le respect des traditions.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <Crown className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Dynastie Fodoh Touni</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Garants des valeurs traditionnelles Bamiléké.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Rattachement Bafou</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Chefferie Supérieure du 1er degré de Bafou.</p>
              </div>
            </div>
          </div>

          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
            <img
              src="/images/chefferie-ndoh-djuttitsa.jpg"
              alt="Chefferie de Ndoh-Djuttitsa"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Patrimoine Architectural</span>
              <p className="text-lg font-bold">Chefferie Royale & Conseil des Notables</p>
            </div>
          </div>
        </div>

        {/* Chronologie Historique */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="amber">Chronologie du Village</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Les Grandes Étapes de notre Histoire
            </h2>
            <NdopBorder variant="gold" height={14} className="max-w-xs mx-auto opacity-75" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {timelineEvents.map((event, idx) => (
              <Card key={idx} className="p-8 space-y-4 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 font-bold">
                    <Milestone className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    {event.period}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  {event.title}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {event.desc}
                </p>
                <NdopBorder variant="subtle" height={10} className="opacity-40" />
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
