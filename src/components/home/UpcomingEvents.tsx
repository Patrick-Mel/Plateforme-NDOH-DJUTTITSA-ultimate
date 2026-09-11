import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import type { Evenement } from '../../data/mockData';
import { Card } from '../ui/Card';

interface UpcomingEventsProps {
  events: Evenement[];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-white dark:bg-[#0B0F19] border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300">
            Agenda Communautaire
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            Événements à venir au village
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Célébrations traditionnelles, assemblées de développement et rendez-vous sportifs de la chefferie.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {events.map((evt) => {
            const dateObj = new Date(evt.date_debut);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase();
            
            return (
              <Card key={evt.id} className="flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={evt.image_url}
                    alt={evt.titre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/85 text-white rounded-2xl px-3.5 py-2 text-center border border-white/20 shadow-md">
                    <span className="block font-heading font-extrabold text-xl text-amber-400 leading-none">
                      {day}
                    </span>
                    <span className="block text-[10px] font-bold tracking-wider uppercase text-slate-300">
                      {month}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                      {evt.titre}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
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
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
