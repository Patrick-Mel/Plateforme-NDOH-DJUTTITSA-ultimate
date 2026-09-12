import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Image as ImageIcon, ArrowRight, Eye } from 'lucide-react';
import type { Media } from '../../data/mockData';
import { Badge } from '../ui/Badge';
import { NdopBorder } from '../ui/NdopBorder';

interface GalleryPreviewProps {
  medias: Media[];
}

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({ medias }) => {
  return (
    <section className="relative py-20 px-4 sm:px-8 bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      
      {/* Motif Ndop d'arrière-plan */}
      <div className="absolute inset-0 bg-ndop-pattern opacity-5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-10 z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="amber" className="mb-2">Patrimoine Visuel & Conservatoire</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              NDOH-DJUTTITSA en Images
            </h2>
          </div>
          <Link
            to="/galerie"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 font-bold text-xs sm:text-sm hover:border-amber-500/40 shadow-sm transition-all"
          >
            <span>Voir toute la médiathèque</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medias.slice(0, 4).map((media) => (
            <Link
              to="/galerie"
              key={media.id}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-900 transition-all duration-500 block"
            >
              <img
                src={media.thumbnail_url || media.url}
                alt={media.legende}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="p-2 rounded-xl bg-slate-950/80 text-amber-400 backdrop-blur-md border border-amber-500/30">
                  {media.type === 'video' ? <Camera className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                </span>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-amber-500/30 backdrop-blur-md">
                  {media.categorie}
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="p-3 rounded-full bg-amber-500/90 text-slate-950 font-bold shadow-xl flex items-center gap-2 text-xs">
                  <Eye className="w-4 h-4" />
                  <span>Agrandir</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <p className="text-xs font-semibold text-white line-clamp-2 leading-snug drop-shadow-sm">
                  {media.legende}
                </p>
                <p className="text-[10px] text-slate-400">
                  Ajouté le {media.date_ajout}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <NdopBorder variant="gold" height={16} className="opacity-75" />
      </div>
    </section>
  );
};
