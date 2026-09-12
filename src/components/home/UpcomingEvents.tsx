import React from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import type { Evenement } from '../../data/mockData';
import { NdopBorder } from '../ui/NdopBorder';

interface UpcomingEventsProps {
  events: Evenement[];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  return (
    <section className="relative py-20 px-4 sm:px-8 bg-white dark:bg-[#070A10] border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      
      {/* Motif Ndop d'arrière-plan */}
      <div className="absolute inset-0 bg-ndop-pattern opacity-5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-12 z-10">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
            <Calendar className="w-3.5 h-3.5" />
            <span>Agenda Communautaire & Culturel</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Événements à Venir au Village
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Célébrations traditionnelles Bamiléké, assemblées de développement du CODEV et rassemblements de la Chefferie.
          </p>

          <NdopBorder variant="gold" height={14} className="max-w-xs mx-auto opacity-75 mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {events.map((evt) => {
            const dateObj = new Date(evt.date_debut);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase();
            
            return (
              <div key={evt.id} className="glass-card flex flex-col h-full overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={evt.image_url}
                    alt={evt.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge Date Royale */}
                  <div className="absolute top-3 left-3 bg-slate-950/90 text-white rounded-2xl px-4 py-2 text-center border border-amber-500/40 shadow-xl backdrop-blur-md">
                    <span className="block font-heading font-extrabold text-2xl royal-gold-text leading-none">
                      {day}
                    </span>
                    <span className="block text-[10px] font-extrabold tracking-widest uppercase text-slate-300">
                      {month}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                      {evt.titre}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{evt.lieu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>{new Date(evt.date_debut).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
