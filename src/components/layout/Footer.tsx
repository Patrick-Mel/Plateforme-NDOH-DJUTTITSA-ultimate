import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, MapPin, Phone, Mail, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Colonne 1 : Présentation Officielle */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
                <Mountain className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                NDOH-DJUTTITSA
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-normal">
              Chefferie traditionnelle de 3ème degré rattachée au Groupement Bafou, Arrondissement de Nkong-Ni, Département de la Menoua, Région de l Ouest-Cameroun.
            </p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/histoire" className="hover:text-emerald-700 dark:hover:text-white transition-colors">Histoire & Origines (1908)</Link></li>
              <li><Link to="/culture" className="hover:text-emerald-700 dark:hover:text-white transition-colors">Culture & Traditions Bamiléké</Link></li>
              <li><Link to="/tourisme" className="hover:text-emerald-700 dark:hover:text-white transition-colors">Complexe Théier & Collines</Link></li>
              <li><Link to="/services" className="hover:text-emerald-700 dark:hover:text-white transition-colors">CMA, Écoles & Services</Link></li>
              <li><Link to="/actualites" className="hover:text-emerald-700 dark:hover:text-white transition-colors">Actualités Communautaires</Link></li>
              <li><Link to="/galerie" className="hover:text-emerald-700 dark:hover:text-white transition-colors">Photothèque & Médias</Link></li>
              <li><Link to="/admin" className="hover:text-amber-600 dark:hover:text-amber-400 font-bold text-emerald-700 dark:text-emerald-400 transition-colors">🔐 Espace Administration</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Contacts & Urgences */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">Contacts & Urgences</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Chefferie de Ndoh-Djuttitsa, Nkong-Ni, Menoua, Cameroun</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>CMA de Ndoh-Djuttitsa : +237 690 12 34 56</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>contact@ndoh-djuttitsa.cm</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>Zone Bafou-Nord / Alt. 1 700 - 2 050 m</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Mentions Légales & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Portail Officiel de la localité de NDOH-DJUTTITSA. Tous droits réservés.</p>
          <p className="text-slate-500 dark:text-slate-600">Chefferie du Groupement Bafou · Menoua</p>
        </div>
      </div>
    </footer>
  );
};
