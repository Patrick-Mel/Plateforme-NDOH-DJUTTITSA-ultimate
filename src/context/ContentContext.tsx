import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Actualite, Media, Evenement } from '../data/mockData';
import { MOCK_ACTUALITES, MOCK_MEDIAS, MOCK_EVENEMENTS } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

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

  // Synchronisation au démarrage & écoute en Temps Réel (Realtime) avec Supabase
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    const client = supabase;

    const syncWithSupabase = async () => {
      try {
        // Médias
        const { data: dbMedias, error: errM } = await client.from('medias').select('*').order('date_ajout', { ascending: false });
        if (!errM && dbMedias && dbMedias.length > 0) {
          const formatted: Media[] = dbMedias.map(m => ({
            id: m.id,
            type: (m.type || 'photo') as 'photo' | 'video' | 'audio' | 'document',
            url: m.url,
            thumbnail_url: m.thumbnail_url || m.url,
            legende: m.legende || '',
            categorie: m.categorie || 'Patrimoine',
            date_ajout: m.date_ajout || new Date().toISOString()
          }));
          setMedias(formatted);
        }

        // Actualités
        const { data: dbActs, error: errA } = await client.from('actualites').select('*').order('date_publication', { ascending: false });
        if (!errA && dbActs && dbActs.length > 0) {
          const formattedActs: Actualite[] = dbActs.map(a => ({
            id: a.id,
            titre: a.titre,
            chapeau: a.chapeau || '',
            contenu: a.contenu,
            image_url: a.image_url || '',
            date_publication: a.date_publication ? a.date_publication.split('T')[0] : new Date().toISOString().split('T')[0],
            publie: a.publie ?? true,
            categorie: a.categorie || 'Général',
            auteur: 'Rédaction NDOH'
          }));
          setActualites(formattedActs);
        }
      } catch (e) {
        console.warn('Fallback local actif:', e);
      }
    };

    syncWithSupabase();

    // Abonnement Supabase Realtime pour recevoir les nouveautés sans rafraîchir
    const channel = client
      .channel('public-ndoh-content-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'medias' }, (payload) => {
        if (payload.new) {
          const m = payload.new;
          const newM: Media = {
            id: m.id,
            type: (m.type || 'photo') as 'photo' | 'video' | 'audio' | 'document',
            url: m.url,
            thumbnail_url: m.thumbnail_url || m.url,
            legende: m.legende || '',
            categorie: m.categorie || 'Patrimoine',
            date_ajout: m.date_ajout || new Date().toISOString()
          };
          setMedias(prev => [newM, ...prev.filter(item => item.id !== newM.id)]);
        }
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'actualites' }, (payload) => {
        if (payload.new) {
          const a = payload.new;
          const newA: Actualite = {
            id: a.id,
            titre: a.titre,
            chapeau: a.chapeau || '',
            contenu: a.contenu,
            image_url: a.image_url || '',
            date_publication: a.date_publication ? a.date_publication.split('T')[0] : new Date().toISOString().split('T')[0],
            publie: a.publie ?? true,
            categorie: a.categorie || 'Général',
            auteur: 'Rédaction NDOH'
          };
          setActualites(prev => [newA, ...prev.filter(item => item.id !== newA.id)]);
        }
      })
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, []);

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

  const addMedia = async (newMedia: Media) => {
    setMedias(prev => [newMedia, ...prev]);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('medias').insert({
          type: newMedia.type,
          url: newMedia.url,
          thumbnail_url: newMedia.thumbnail_url || newMedia.url,
          legende: newMedia.legende,
          categorie: newMedia.categorie
        });
      } catch (e) {
        console.error('Erreur sync Supabase media:', e);
      }
    }
  };

  const deleteMedia = async (id: string) => {
    setMedias(prev => prev.filter(m => m.id !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('medias').delete().eq('id', id);
      } catch (e) {
        console.error('Erreur suppression Supabase media:', e);
      }
    }
  };

  const addActualite = async (newAct: Actualite) => {
    setActualites(prev => [newAct, ...prev]);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('actualites').insert({
          titre: newAct.titre,
          chapeau: newAct.chapeau,
          contenu: newAct.contenu,
          image_url: newAct.image_url,
          categorie: newAct.categorie
        });
      } catch (e) {
        console.error('Erreur sync Supabase actualite:', e);
      }
    }
  };

  const deleteActualite = async (id: string) => {
    setActualites(prev => prev.filter(a => a.id !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('actualites').delete().eq('id', id);
      } catch (e) {
        console.error('Erreur suppression Supabase actualite:', e);
      }
    }
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
