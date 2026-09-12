import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { HistoirePage } from './pages/HistoirePage';
import { CulturePage } from './pages/CulturePage';
import { TourismePage } from './pages/TourismePage';
import { ServicesPage } from './pages/ServicesPage';
import { ActualitesPage } from './pages/ActualitesPage';
import { GaleriePage } from './pages/GaleriePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { useContent } from './context/ContentContext';
import { AlertTriangle } from 'lucide-react';

export const App: React.FC = () => {
  const { pathname } = useLocation();
  const { emergencyAlert } = useContent();

  // Remonter en haut de page à chaque changement d'URL
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* BANNIÈRE D URGENCE SITE-WIDE */}
      {emergencyAlert.active && pathname !== '/admin' && (
        <div className="bg-amber-600 text-white px-4 py-2.5 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md z-50">
          <AlertTriangle className="w-4 h-4 shrink-0 animate-pulse" />
          <span>ALERTE COMMUNAUTAIRE NDOH-DJUTTITSA : {emergencyAlert.text}</span>
        </div>
      )}

      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/histoire" element={<HistoirePage />} />
          <Route path="/culture" element={<CulturePage />} />
          <Route path="/tourisme" element={<TourismePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/actualites" element={<ActualitesPage />} />
          <Route path="/galerie" element={<GaleriePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
