import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mountain, CloudSun, CloudRain, Sun, CloudFog } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useLiveWeather } from '../../lib/weather';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const weather = useLiveWeather();

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

  // Sélection de l icône météo dynamique
  const getWeatherIcon = () => {
    if (weather.weatherCode === 0) return <Sun className="w-3.5 h-3.5 text-amber-500" />;
    if (weather.weatherCode >= 45 && weather.weatherCode <= 48) return <CloudFog className="w-3.5 h-3.5 text-slate-400" />;
    if (weather.weatherCode >= 51) return <CloudRain className="w-3.5 h-3.5 text-blue-400" />;
    return <CloudSun className="w-3.5 h-3.5 text-amber-500" />;
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Logo de NDOH-DJUTTITSA */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-emerald-950/80 border border-slate-800 dark:border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm group-hover:scale-105 transition-transform duration-300">
            <Mountain className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
          </div>
          <div>
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white block leading-none">
              NDOH-DJUTTITSA
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 dark:text-emerald-400 block mt-1">
              Groupement Bafou · Menoua
            </span>
          </div>
        </Link>

        {/* Liens de Navigation Desktop */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Widget Météo Dynamique en Direct + Bascule de Thème */}
        <div className="flex items-center gap-3">
          <div
            title={`Météo dynamique en direct à Ndoh-Djuttitsa (Latitude 5.45° N, Longitude 10.05° E) : ${weather.condition}`}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-300"
          >
            {getWeatherIcon()}
            <span>2 050 m · {weather.loading ? '...' : `${weather.temperature}°C`}</span>
            <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 hidden xl:inline">
              ({weather.condition})
            </span>
          </div>

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

      </nav>

      {/* Menu Mobile Déroulant */}
      {isOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] flex flex-col gap-1 shadow-xl">
          {/* Météo mobile */}
          <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 mb-1">
            {getWeatherIcon()}
            <span>Météo Ndoh-Djuttitsa : {weather.temperature}°C · {weather.condition}</span>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive(link.path)
                  ? 'bg-slate-900 text-white dark:bg-emerald-600'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
