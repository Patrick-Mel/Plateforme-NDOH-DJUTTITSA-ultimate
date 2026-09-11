import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { LatestNews } from '../components/home/LatestNews';
import { UpcomingEvents } from '../components/home/UpcomingEvents';
import { GalleryPreview } from '../components/home/GalleryPreview';
import type { Actualite } from '../data/mockData';
import { MOCK_ACTUALITES, MOCK_EVENEMENTS, MOCK_MEDIAS } from '../data/mockData';
import { Modal } from '../components/ui/Modal';
import { Calendar, User, Tag } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const HomePage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Actualite | null>(null);

  return (
    <div className="space-y-0">
      <HeroSection />
      <StatsSection />
      <LatestNews
        news={MOCK_ACTUALITES}
        onSelectArticle={(article) => setSelectedArticle(article)}
      />
      <UpcomingEvents events={MOCK_EVENEMENTS} />
      <GalleryPreview medias={MOCK_MEDIAS} />

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
  );
};
