import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export type UserRole = 'super_admin' | 'administrateur' | 'redacteur' | 'moderateur' | 'archiviste' | 'habitant';

export interface ActiveUser {
  email: string;
  nom: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isMockAdmin: boolean;
  currentRole: UserRole;
  activeUser: ActiveUser | null;
  loginAsDemoAdmin: () => void;
  loginAsRole: (role: UserRole, email?: string, nom?: string) => void;
  switchRole: (role: UserRole) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [isMockAdmin, setIsMockAdmin] = useState<boolean>(() => {
    return localStorage.getItem('ndoh_mock_admin') === 'true';
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('ndoh_active_role') as UserRole;
    return saved || 'super_admin';
  });

  const [activeUser, setActiveUser] = useState<ActiveUser | null>(() => {
    const savedEmail = localStorage.getItem('ndoh_user_email');
    const savedName = localStorage.getItem('ndoh_user_name');
    const savedRole = (localStorage.getItem('ndoh_active_role') as UserRole) || 'super_admin';

    if (savedEmail && savedName) {
      return { email: savedEmail, nom: savedName, role: savedRole };
    }
    return {
      email: 'admin@ndoh-djuttitsa.cm',
      nom: 'S.M. Jean-Paul Melaga III',
      role: 'super_admin',
    };
  });

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginAsDemoAdmin = () => {
    setIsMockAdmin(true);
    setCurrentRole('super_admin');
    const defaultUser = {
      email: 'admin@ndoh-djuttitsa.cm',
      nom: 'S.M. Jean-Paul Melaga III',
      role: 'super_admin' as UserRole,
    };
    setActiveUser(defaultUser);
    localStorage.setItem('ndoh_mock_admin', 'true');
    localStorage.setItem('ndoh_active_role', 'super_admin');
    localStorage.setItem('ndoh_user_email', defaultUser.email);
    localStorage.setItem('ndoh_user_name', defaultUser.nom);
  };

  const loginAsRole = (role: UserRole, email?: string, nom?: string) => {
    setIsMockAdmin(true);
    setCurrentRole(role);

    const userObj: ActiveUser = {
      email: email || `${role}@ndoh-djuttitsa.cm`,
      nom: nom || `Utilisateur ${role.toUpperCase()}`,
      role,
    };
    setActiveUser(userObj);

    localStorage.setItem('ndoh_mock_admin', 'true');
    localStorage.setItem('ndoh_active_role', role);
    localStorage.setItem('ndoh_user_email', userObj.email);
    localStorage.setItem('ndoh_user_name', userObj.nom);
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem('ndoh_active_role', role);
    if (activeUser) {
      const updated = { ...activeUser, role };
      setActiveUser(updated);
    }
  };

  const signOut = async () => {
    setIsMockAdmin(false);
    localStorage.removeItem('ndoh_mock_admin');
    localStorage.removeItem('ndoh_active_role');
    localStorage.removeItem('ndoh_user_email');
    localStorage.removeItem('ndoh_user_name');
    if (supabase) {
      await supabase.auth.signOut();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isMockAdmin,
        currentRole,
        activeUser,
        loginAsDemoAdmin,
        loginAsRole,
        switchRole,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé au sein d\'un AuthProvider');
  }
  return context;
};

