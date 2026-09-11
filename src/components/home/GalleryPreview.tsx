import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Image as ImageIcon, ArrowRight } from 'lucide-react';
import type { Media } from '../../data/mockData';
import { Badge } from '../ui/Badge';

interface GalleryPreviewProps {
  medias: Media[];
}

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({ medias }) => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-slate-900 text-white transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="amber" className="mb-2">Patrimoine Visuel</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              NDOH-DJUTTITSA en images
            </h2>
          </div>
          <Link
            to="/galerie"
            className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:gap-3 transition-all text-sm"
          >
            <span>Voir toute la médiathèque</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medias.slice(0, 4).map((media) => (
            <div
              key={media.id}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-lg border border-slate-800 bg-slate-800"
            >
              <img
                src={media.thumbnail_url || media.url}
                alt={media.legende}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute top-3 left-3">
                <span className="p-2 rounded-xl bg-slate-950/70 text-amber-400 backdrop-blur-md inline-block">
                  {media.type === 'video' ? <Camera className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
                  {media.categorie}
                </span>
                <p className="text-xs font-medium text-white line-clamp-2 leading-snug">
                  {media.legende}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
