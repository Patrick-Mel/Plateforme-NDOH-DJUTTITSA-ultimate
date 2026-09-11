import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import type { Media } from '../data/mockData';
import { MOCK_MEDIAS } from '../data/mockData';
import { Camera, Image as ImageIcon, Play, Tag, Calendar } from 'lucide-react';

export const GaleriePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const filteredMedias = MOCK_MEDIAS.filter((m) => {
    if (selectedType === 'all') return true;
    return m.type === selectedType;
  });

  return (
    <div className="space-y-12 pb-20">
      <PageHeader
        title="Médiathèque Visuelle & Photothèque"
        subtitle="Galerie officielle des paysages, événements traditionnels et visages de NDOH-DJUTTITSA."
        badge="Photothèque & Vidéos"
        bgImage="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Barre de Filtre des Médias */}
        <div className="flex items-center justify-center gap-3 p-2 bg-white dark:bg-[#111827] rounded-2xl max-w-md mx-auto border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <button
            onClick={() => setSelectedType('all')}
            type="button"
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
              selectedType === 'all'
                ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Tous les Médias
          </button>
          <button
            onClick={() => setSelectedType('photo')}
            type="button"
            className={`flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
              selectedType === 'photo'
                ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Photos</span>
          </button>
          <button
            onClick={() => setSelectedType('video')}
            type="button"
            className={`flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
              selectedType === 'video'
                ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Vidéos</span>
          </button>
        </div>

        {/* Grille Photothèque / Vidéothèque */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMedias.map((media) => (
            <div
              key={media.id}
              onClick={() => setSelectedMedia(media)}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 bg-slate-900 cursor-pointer transition-all duration-300"
            >
              <img
                src={media.thumbnail_url || media.url}
                alt={media.legende}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge variant="amber">{media.categorie}</Badge>
                {media.type === 'video' && (
                  <span className="p-2 rounded-full bg-red-600 text-white shadow-md animate-pulse">
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </span>
                )}
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <p className="text-sm font-bold text-white leading-snug line-clamp-2">
                  {media.legende}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{media.date_ajout}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modale Lightbox d affichage Grand Format */}
        <Modal
          isOpen={Boolean(selectedMedia)}
          onClose={() => setSelectedMedia(null)}
          title={selectedMedia?.legende || ''}
          maxWidth="4xl"
        >
          {selectedMedia && (
            <div className="space-y-4">
              {selectedMedia.type === 'video' ? (
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
                  <iframe
                    src={selectedMedia.url}
                    title={selectedMedia.legende}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="max-h-[70vh] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.legende}
                    className="max-h-[70vh] w-auto object-contain rounded-xl"
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  {selectedMedia.categorie}
                </span>
                <span>Date d ajout : {selectedMedia.date_ajout}</span>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </div>
  );
};
