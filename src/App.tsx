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

export const App: React.FC = () => {
  const { pathname } = useLocation();

  // Remonter en haut de page à chaque changement d URL
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
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
