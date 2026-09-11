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
  CheckCircle,
} from 'lucide-react';

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
    <div className="space-y-12 pb-20">
      <PageHeader
        title="Infrastructures, Santé & Services"
        subtitle="Consultez l annuaire des établissements scolaires, du CMA de Ndoh-Djuttitsa et des acteurs économiques de la chefferie."
        badge="Annuaire Communautaire"
        bgImage="/images/cma-ndoh-djuttitsa.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Navigation Onglets Épurés */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/60 dark:bg-[#111827] rounded-2xl border border-slate-300/60 dark:border-slate-800">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                type="button"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                  isSelected
                    ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-800'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-slate-800 text-amber-400 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filtre par Quartier */}
        {activeTab !== 'documents' && activeTab !== 'associations' && (
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-700 dark:text-slate-300">Secteur / Quartier :</span>
            <select
              value={selectedQuartier}
              onChange={(e) => setSelectedQuartier(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Tous les secteurs de Ndoh-Djuttitsa</option>
              {MOCK_QUARTIERS.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.nom}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Onglet 1 : ÉCOLES */}
        {activeTab === 'ecoles' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_ECOLES.filter(
              (item) => selectedQuartier === 'all' || item.quartier_id === selectedQuartier
            ).map((ecole) => (
              <Card key={ecole.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="blue">{ecole.type}</Badge>
                </div>

                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {ecole.nom}
                </h3>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{getQuartierNom(ecole.quartier_id)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{ecole.contact}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Onglet 2 : SANTÉ (CMA) */}
        {activeTab === 'sante' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_CENTRES_SANTE.filter(
              (item) => selectedQuartier === 'all' || item.quartier_id === selectedQuartier
            ).map((cs) => (
              <Card key={cs.id} className="p-6 space-y-4 border-l-4 border-l-emerald-600">
                <div className="flex items-center justify-between">
                  <Badge variant="emerald">{cs.type}</Badge>
                  {cs.urgences_24_7 && (
                    <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/80 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-800">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Permanence Urgences 24h/7</span>
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  {cs.nom}
                </h3>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium pt-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{getQuartierNom(cs.quartier_id)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-bold text-slate-900 dark:text-white">{cs.contact}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Onglet 3 : ENTREPRISES */}
        {activeTab === 'entreprises' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_ENTREPRISES.filter(
              (item) => selectedQuartier === 'all' || item.quartier_id === selectedQuartier
            ).map((ent) => (
              <Card key={ent.id} className="p-6 space-y-4">
                <Badge variant="amber">{ent.categorie}</Badge>

                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {ent.nom}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ent.description}
                </p>

                <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{ent.adresse}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{ent.contact}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Onglet 4 : ASSOCIATIONS */}
        {activeTab === 'associations' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_ASSOCIATIONS.map((ass) => (
              <Card key={ass.id} className="p-6 space-y-4">
                <Badge variant="purple">Association Communautaire</Badge>

                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {ass.nom}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ass.objet}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div><span className="font-bold text-slate-700 dark:text-slate-300">Responsable :</span> {ass.president}</div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{ass.contact}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Onglet 5 : DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_DOCUMENTS.map((doc) => (
              <Card key={doc.id} className="p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <Badge variant="gray">{doc.categorie}</Badge>

                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    {doc.titre}
                  </h3>

                  <div className="text-xs text-slate-500">
                    Taille : {doc.taille_mo} Mo · Ajouté le {doc.date_ajout}
                  </div>
                </div>

                <a
                  href={doc.fichier_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-500 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Télécharger le document (PDF)</span>
                </a>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
