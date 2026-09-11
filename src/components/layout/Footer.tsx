import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, MapPin, Phone, Mail, Globe, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Colonne 1 : Présentation Village */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center text-white shadow-md">
                <Mountain className="w-6 h-6 text-amber-300" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                NDOH-DJUTTITSA
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Village des Hauts-Plateaux de l Ouest-Cameroun. Terre de tradition Bamiléké, de plantations de thé et d authenticité culturelle.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Shield className="w-4 h-4" />
              <span>Plateforme Numérique Officielle Supabase</span>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-base">Navigation Principale</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/histoire" className="hover:text-emerald-400 transition-colors">Histoire & Origines</Link></li>
              <li><Link to="/culture" className="hover:text-emerald-400 transition-colors">Patrimoine & Culture Bamiléké</Link></li>
              <li><Link to="/tourisme" className="hover:text-emerald-400 transition-colors">Domaine du Thé & Tourisme</Link></li>
              <li><Link to="/services" className="hover:text-emerald-400 transition-colors">Annuaire des Services & Santé</Link></li>
              <li><Link to="/actualites" className="hover:text-emerald-400 transition-colors">Actualités du Village</Link></li>
              <li><Link to="/galerie" className="hover:text-emerald-400 transition-colors">Médiathèque Photos & Vidéos</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Informations Pratiques & Numéros d Urgence */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-base">Urgences & Contacts</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Chefferie Traditionnelle, Ndoh-Djuttitsa, Région de l Ouest, Cameroun</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Centre de Santé (Urgence 24h/7) : +237 690 12 34 56</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>contact@ndoh-djuttitsa.cm</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Code Postal / Zone : Arrondissement de Dschang / Bafou</span>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Diaspora & Météo */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-base">Espace Diaspora & Projets</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ressortissants de NDOH-DJUTTITSA à travers le monde, restez connectés avec la terre de vos ancêtres et participez aux projets de développement communal.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
              <div className="font-semibold text-emerald-400 mb-1">Météo des Hauts-Plateaux :</div>
              <div className="text-slate-300">Température moyenne : 18°C à 22°C</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Idéal pour le thé et le maraîchage.</div>
            </div>
          </div>

        </div>

        {/* Bas de page Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Plateforme Numérique Officielle de NDOH-DJUTTITSA. Tous droits réservés.</p>
          <div className="flex items-center gap-1">
            <span>Conçu avec</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>pour la communauté de NDOH-DJUTTITSA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
