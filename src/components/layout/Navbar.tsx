import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Mountain, CloudSun } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isMockAdmin, user } = useAuth();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Histoire', path: '/histoire' },
    { name: 'Culture', path: '/culture' },
    { name: 'Tourisme', path: '/tourisme' },
    { name: 'Services', path: '/services' },
    { name: 'Actualités', path: '/actualites' },
    { name: 'Galerie', path: '/galerie' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Barre d'information en haut */}
      <div className="bg-emerald-900 dark:bg-slate-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between font-medium">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <CloudSun className="w-3.5 h-3.5 text-amber-300" />
            <span>Djuttitsa : 19°C · Brume Matinale</span>
          </span>
          <span className="hidden md:inline-block text-emerald-300/60">|</span>
          <span className="hidden md:inline-block">Altitude : 2 050 m · Hauts-Plateaux de l Ouest-Cameroun</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="flex items-center gap-1 hover:text-amber-300 transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{isMockAdmin || user ? 'Espace Admin (Connecté)' : 'Espace Administration'}</span>
          </Link>
        </div>
      </div>

      {/* Navigation principale avec Glassmorphism */}
      <nav className="glass-panel border-b border-slate-200/50 dark:border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo du village */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <Mountain className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 dark:text-white block leading-none">
                NDOH-DJUTTITSA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 dark:text-emerald-400 block mt-1">
                Portail Officiel du Village
              </span>
            </div>
          </Link>

          {/* Liens Desktop */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-emerald-700 text-white font-semibold shadow-sm dark:bg-emerald-600'
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions Droite (Bascule Thème + Bouton Mobile) */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Bouton Hamburger Mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Ouvrir le menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Deroulant */}
        {isOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-slate-200/60 dark:border-slate-800/80 mt-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-emerald-700 text-white font-semibold dark:bg-emerald-600'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
