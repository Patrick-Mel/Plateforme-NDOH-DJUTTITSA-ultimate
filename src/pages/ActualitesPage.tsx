import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import type { Actualite } from '../data/mockData';
import { useContent } from '../context/ContentContext';
import { Search, Calendar, User, Tag, ArrowRight, AlertTriangle } from 'lucide-react';
import { NdopBorder } from '../components/ui/NdopBorder';

export const ActualitesPage: React.FC = () => {
  const { actualites, emergencyAlert } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [selectedArticle, setSelectedArticle] = useState<Actualite | null>(null);

  const categories = ['Toutes', 'Économie & Développement', 'Culture & Tradition', 'Santé & Social'];

  const filteredNews = actualites.filter((item) => {
    const matchesCategory = selectedCategory === 'Toutes' || item.categorie === selectedCategory;
    const matchesSearch =
      item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.chapeau.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-20 bg-slate-50 dark:bg-[#090D16] transition-colors">
      <PageHeader
        title="Journal & Actualités de NDOH-DJUTTITSA"
        subtitle="Suivez au quotidien la vie du village, les projets d'investissement et les événements communautaires du Groupement Bafou."
        badge="Presse & Information"
        bgImage="/images/cte-djuttitsa-tea.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* CARTE D'ALERTE COMMUNAUTAIRE PRIORITAIRE SI ACTIVÉE */}
        {emergencyAlert.active && (
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/10 dark:bg-amber-500/20 border-2 border-amber-500/40 text-amber-950 dark:text-amber-100 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-lg backdrop-blur-sm transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="amber">ALERTE COMMUNAUTAIRE PRIORITAIRE</Badge>
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">Chefferie Officielle</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-amber-950 dark:text-amber-50 leading-snug">
                {emergencyAlert.text}
              </p>
            </div>
          </div>
        )}

        {/* Barre de Recherche et Filtres par Catégorie */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors duration-300">
          
          {/* Recherche textuelle */}
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Filtres par Catégorie */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredNews.map((article) => (
            <Card
              key={article.id}
              className="flex flex-col h-full cursor-pointer group overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-amber-500/40"
            >
              <div className="relative h-56 overflow-hidden" onClick={() => setSelectedArticle(article)}>
                <img
                  src={article.image_url}
                  alt={article.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="amber">{article.categorie}</Badge>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      {new Date(article.date_publication).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    {article.auteur && (
                      <span className="flex items-center gap-1 font-medium">
                        <User className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        {article.auteur}
                      </span>
                    )}
                  </div>
                  <h3
                    onClick={() => setSelectedArticle(article)}
                    className="text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-2"
                  >
                    {article.titre}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {article.chapeau}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedArticle(article)}
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors pt-2"
                >
                  <span>Lire l'article complet</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <NdopBorder variant="subtle" height={10} className="opacity-40" />
            </Card>
          ))}
        </div>

        {/* Modal de Lecture de l'Article */}
        <Modal
          isOpen={Boolean(selectedArticle)}
          onClose={() => setSelectedArticle(null)}
          title={selectedArticle?.titre || ''}
          maxWidth="2xl"
        >
          {selectedArticle && (
            <div className="space-y-6">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-md">
                <img
                  src={selectedArticle.image_url}
                  alt={selectedArticle.titre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="amber">{selectedArticle.categorie}</Badge>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  {new Date(selectedArticle.date_publication).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                {selectedArticle.auteur && (
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-4 h-4 text-amber-600" />
                    {selectedArticle.auteur}
                  </span>
                )}
                <span className="flex items-center gap-1.5 font-medium">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  {selectedArticle.categorie}
                </span>
              </div>

              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-base font-normal">
                {selectedArticle.contenu}
              </div>
            </div>
          )}
        </Modal>

      </div>
    </div>
  );
};
