import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Actualite, Media, Evenement } from '../data/mockData';
import { MOCK_ACTUALITES, MOCK_MEDIAS, MOCK_EVENEMENTS } from '../data/mockData';

interface EmergencyAlert {
  active: boolean;
  text: string;
}

interface ContentContextType {
  medias: Media[];
  actualites: Actualite[];
  evenements: Evenement[];
  emergencyAlert: EmergencyAlert;
  addMedia: (media: Media) => void;
  deleteMedia: (id: string) => void;
  addActualite: (actualite: Actualite) => void;
  deleteActualite: (id: string) => void;
  addEvenement: (evenement: Evenement) => void;
  deleteEvenement: (id: string) => void;
  setEmergencyAlert: (alert: EmergencyAlert) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medias, setMedias] = useState<Media[]>(() => {
    const saved = localStorage.getItem('ndoh_medias');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return MOCK_MEDIAS;
  });

  const [actualites, setActualites] = useState<Actualite[]>(() => {
    const saved = localStorage.getItem('ndoh_actualites');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return MOCK_ACTUALITES;
  });

  const [evenements, setEvenements] = useState<Evenement[]>(() => {
    const saved = localStorage.getItem('ndoh_evenements');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return MOCK_EVENEMENTS;
  });

  const [emergencyAlert, setEmergencyAlertState] = useState<EmergencyAlert>(() => {
    const saved = localStorage.getItem('ndoh_emergency');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      active: true,
      text: 'Travaux de réhabilitation de la voirie principale et adduction d\'eau au quartier Loung-Djuttitsa.',
    };
  });

  useEffect(() => {
    localStorage.setItem('ndoh_medias', JSON.stringify(medias));
  }, [medias]);

  useEffect(() => {
    localStorage.setItem('ndoh_actualites', JSON.stringify(actualites));
  }, [actualites]);

  useEffect(() => {
    localStorage.setItem('ndoh_evenements', JSON.stringify(evenements));
  }, [evenements]);

  useEffect(() => {
    localStorage.setItem('ndoh_emergency', JSON.stringify(emergencyAlert));
  }, [emergencyAlert]);

  const addMedia = (newMedia: Media) => {
    setMedias(prev => [newMedia, ...prev]);
  };

  const deleteMedia = (id: string) => {
    setMedias(prev => prev.filter(m => m.id !== id));
  };

  const addActualite = (newAct: Actualite) => {
    setActualites(prev => [newAct, ...prev]);
  };

  const deleteActualite = (id: string) => {
    setActualites(prev => prev.filter(a => a.id !== id));
  };

  const addEvenement = (evt: Evenement) => {
    setEvenements(prev => [evt, ...prev]);
  };

  const deleteEvenement = (id: string) => {
    setEvenements(prev => prev.filter(e => e.id !== id));
  };

  const setEmergencyAlert = (alert: EmergencyAlert) => {
    setEmergencyAlertState(alert);
  };

  return (
    <ContentContext.Provider
      value={{
        medias,
        actualites,
        evenements,
        emergencyAlert,
        addMedia,
        deleteMedia,
        addActualite,
        deleteActualite,
        addEvenement,
        deleteEvenement,
        setEmergencyAlert,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent doit être utilisé au sein d\'un ContentProvider');
  }
  return context;
};
