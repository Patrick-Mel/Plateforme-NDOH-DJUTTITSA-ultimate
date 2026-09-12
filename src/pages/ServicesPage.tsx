import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
  MOCK_ECOLES,
  MOCK_CENTRES_SANTE,
  MOCK_ENTREPRISES,
  MOCK_ASSOCIATIONS,
  MOCK_DOCUMENTS,
  MOCK_QUARTIERS,
} from '../data/mockData';
import {
  GraduationCap,
  HeartPulse,
  Building,
  Users,
  FileText,
  Phone,
  MapPin,
  Download,
  Filter,
} from 'lucide-react';
import { NdopBorder } from '../components/ui/NdopBorder';

export const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ecoles' | 'sante' | 'entreprises' | 'associations' | 'documents'>('ecoles');
  const [selectedQuartier, setSelectedQuartier] = useState<string>('all');

  const tabs = [
    { id: 'ecoles', label: 'Écoles & Lycées', icon: GraduationCap, count: MOCK_ECOLES.length },
    { id: 'sante', label: 'CMA & Santé', icon: HeartPulse, count: MOCK_CENTRES_SANTE.length },
    { id: 'entreprises', label: 'Thé & Entreprises', icon: Building, count: MOCK_ENTREPRISES.length },
    { id: 'associations', label: 'Comités & Associations', icon: Users, count: MOCK_ASSOCIATIONS.length },
    { id: 'documents', label: 'Documents Officiels', icon: FileText, count: MOCK_DOCUMENTS.length },
  ];

  const getQuartierNom = (qId: string) => {
    const q = MOCK_QUARTIERS.find((item) => item.id === qId);
    return q ? q.nom : 'Ndoh-Djuttitsa';
  };

  return (
    <div className="space-y-12 pb-20 bg-slate-50 dark:bg-[#090D16] transition-colors">
      <PageHeader
        title="Infrastructures, Santé & Services"
        subtitle="Consultez l'annuaire des établissements scolaires, du CMA de Ndoh-Djuttitsa et des acteurs économiques de la chefferie."
        badge="Annuaire Communautaire"
        bgImage="/images/cma-ndoh-djuttitsa.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Navigation Onglets Épurés */}
        <div className="flex flex-wrap gap-2 p-2 bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                type="button"
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-slate-950 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filtre par Quartier */}
        {activeTab !== 'documents' && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <Filter className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Filtrer par Quartier :</span>
            <select
              value={selectedQuartier}
              onChange={(e) => setSelectedQuartier(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Tous les 7 quartiers</option>
              {MOCK_QUARTIERS.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.nom}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Contenu de l'onglet Écoles */}
        {activeTab === 'ecoles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_ECOLES.filter((e) => selectedQuartier === 'all' || e.quartier_id === selectedQuartier).map((ecole) => (
              <Card key={ecole.id} className="p-6 space-y-4 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <Badge variant="emerald">{ecole.type}</Badge>
                </div>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {ecole.nom}
                </h3>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{getQuartierNom(ecole.quartier_id)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{ecole.contact}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Contenu Santé */}
        {activeTab === 'sante' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_CENTRES_SANTE.filter((s) => selectedQuartier === 'all' || s.quartier_id === selectedQuartier).map((cs) => (
              <Card key={cs.id} className="p-6 space-y-4 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <Badge variant="amber">24h/24 & Urgences</Badge>
                </div>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  {cs.nom}
                </h3>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{getQuartierNom(cs.quartier_id)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{cs.contact}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Contenu Entreprises */}
        {activeTab === 'entreprises' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_ENTREPRISES.filter((ent) => selectedQuartier === 'all' || ent.quartier_id === selectedQuartier).map((ent) => (
              <Card key={ent.id} className="p-6 space-y-4 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {ent.nom}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {ent.description}
                </p>
                <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 font-medium">
                  <p>📍 {getQuartierNom(ent.quartier_id)} · {ent.adresse}</p>
                  <p>📞 {ent.contact}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Contenu Associations */}
        {activeTab === 'associations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_ASSOCIATIONS.map((assoc) => (
              <Card key={assoc.id} className="p-6 space-y-4 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 w-fit">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {assoc.nom}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {assoc.objet}
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <p>👑 Président : {assoc.president}</p>
                  <p>📞 {assoc.contact}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Contenu Documents */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            {MOCK_DOCUMENTS.map((doc) => (
              <div key={doc.id} className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{doc.titre}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Taille : {doc.taille_mo} Mo · Ajouté le {doc.date_ajout}</p>
                  </div>
                </div>

                <a
                  href={doc.fichier_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:bg-amber-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger PDF</span>
                </a>
              </div>
            ))}
          </div>
        )}

        <NdopBorder variant="gold" height={16} className="opacity-80" />
      </div>
    </div>
  );
};
