import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, AlertTriangle } from 'lucide-react';
import type { Actualite } from '../../data/mockData';
import { Badge } from '../ui/Badge';
import { useContent } from '../../context/ContentContext';
import { NdopBorder } from '../ui/NdopBorder';

interface LatestNewsProps {
  news: Actualite[];
  onSelectArticle: (article: Actualite) => void;
}

export const LatestNews: React.FC<LatestNewsProps> = ({ news, onSelectArticle }) => {
  const { emergencyAlert } = useContent();

  return (
    <section className="relative py-20 px-4 sm:px-8 bg-slate-50 dark:bg-[#090D16] transition-colors overflow-hidden">
      
      {/* Motif Ndop d'arrière-plan */}
      <div className="absolute inset-0 bg-ndop-pattern opacity-5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-10 z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold mb-3">
              <span>Actualités & Communiqués Officiels</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              Les Dernières Nouvelles du Village
            </h2>
          </div>
          <Link
            to="/actualites"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-bold text-xs sm:text-sm hover:border-amber-500/40 shadow-sm transition-all"
          >
            <span>Toutes les actualités</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ALERTE COMMUNAUTAIRE PRIORITAIRE DANS LES ACTUALITÉS */}
        {emergencyAlert.active && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/20 border-2 border-amber-500/40 text-amber-950 dark:text-amber-100 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-xl backdrop-blur-sm transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="amber">ALERTE COMMUNAUTAIRE PRIORITAIRE</Badge>
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">Chefferie Bafou</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-amber-950 dark:text-amber-50 leading-snug">
                {emergencyAlert.text}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.slice(0, 3).map((article) => (
            <div
              key={article.id}
              className="glass-card flex flex-col h-full overflow-hidden group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden" onClick={() => onSelectArticle(article)}>
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
                <div className="space-y-3">
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
                    onClick={() => onSelectArticle(article)}
                    className="text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2"
                  >
                    {article.titre}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {article.chapeau}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onSelectArticle(article)}
                    type="button"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors"
                  >
                    <span>Lire l'article complet</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <NdopBorder variant="subtle" height={10} className="opacity-40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
