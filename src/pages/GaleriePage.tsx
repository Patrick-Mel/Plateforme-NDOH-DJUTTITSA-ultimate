import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import type { Media } from '../data/mockData';
import { useContent } from '../context/ContentContext';
import { Camera, Image as ImageIcon, Play, Tag, Calendar, Eye } from 'lucide-react';
import { NdopBorder } from '../components/ui/NdopBorder';

export const GaleriePage: React.FC = () => {
  const { medias } = useContent();
  const [selectedType, setSelectedType] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const filteredMedias = medias.filter((m) => {
    if (selectedType === 'all') return true;
    return m.type === selectedType;
  });

  return (
    <div className="space-y-12 pb-20 bg-slate-50 dark:bg-[#090D16] transition-colors">
      <PageHeader
        title="Médiathèque Visuelle & Photothèque"
        subtitle="Galerie officielle des paysages, événements traditionnels et visages de NDOH-DJUTTITSA."
        badge="Photothèque & Vidéos"
        bgImage="/images/chefferie-ndoh-djuttitsa.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Barre de Filtre des Médias */}
        <div className="flex items-center justify-center gap-3 p-2 bg-white dark:bg-[#111827] rounded-2xl max-w-md mx-auto border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <button
            onClick={() => setSelectedType('all')}
            type="button"
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
              selectedType === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
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
                ? 'bg-amber-500 text-slate-950 shadow-sm'
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
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Vidéos</span>
          </button>
        </div>

        {/* Grille de la Galerie */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMedias.map((media) => (
            <div
              key={media.id}
              onClick={() => setSelectedMedia(media)}
              className="glass-card group relative h-72 overflow-hidden cursor-pointer"
            >
              <img
                src={media.thumbnail_url || media.url}
                alt={media.legende}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <Badge variant="amber">{media.categorie}</Badge>
                {media.type === 'video' && (
                  <span className="p-1.5 rounded-lg bg-red-600 text-white flex items-center gap-1 text-[10px] font-bold">
                    <Play className="w-3 h-3 fill-current" /> Vidéo
                  </span>
                )}
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="p-3 rounded-full bg-amber-500 text-slate-950 font-bold shadow-xl flex items-center gap-2 text-xs">
                  <Eye className="w-4 h-4" />
                  <span>Agrandir</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h4 className="text-sm font-bold text-white line-clamp-1">
                  {media.legende}
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    {media.date_ajout}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Prévisualisation Grand Format */}
        <Modal
          isOpen={Boolean(selectedMedia)}
          onClose={() => setSelectedMedia(null)}
          title={selectedMedia?.legende || ''}
          maxWidth="4xl"
        >
          {selectedMedia && (
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center min-h-[350px]">
                {selectedMedia.type === 'video' ? (
                  selectedMedia.url.includes('youtube') || selectedMedia.url.includes('vimeo') || selectedMedia.url.includes('googleapis') ? (
                    <video controls autoPlay className="w-full max-h-[75vh]">
                      <source src={selectedMedia.url} type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture vidéo HTML5.
                    </video>
                  ) : (
                    <iframe
                      src={selectedMedia.url}
                      title={selectedMedia.legende}
                      className="w-full h-[450px]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.legende}
                    className="max-h-[75vh] w-auto object-contain"
                  />
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-slate-900 dark:text-white">{selectedMedia.categorie}</span>
                </div>
                <span>Date d'ajout : {selectedMedia.date_ajout}</span>
              </div>
            </div>
          )}
        </Modal>

        <NdopBorder variant="gold" height={16} className="opacity-80" />
      </div>
    </div>
  );
};
