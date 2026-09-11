import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Shield,
  Lock,
  LogOut,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  Mail,
  Plus,
  Trash2,
  Database,
  Users,
  UserCheck,
  FileText,
  Building2,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';
import type { Actualite } from '../data/mockData';
import { MOCK_ACTUALITES, MOCK_EVENEMENTS, MOCK_MEDIAS } from '../data/mockData';

// Types pour la gestion RBAC 5 Rôles
export type UserRole = 'super_admin' | 'administrateur' | 'redacteur' | 'moderateur' | 'habitant';

export interface UserProfile {
  id: string;
  email: string;
  nom: string;
  role: UserRole;
  date_creation: string;
}

export const AdminPage: React.FC = () => {
  const { user, isMockAdmin, loginAsDemoAdmin, signOut } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Rôle de l'utilisateur connecté (par défaut super_admin en démo)
  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');

  // Onglet sélectionné
  const [adminTab, setAdminTab] = useState<'roles' | 'actualites' | 'evenements' | 'medias' | 'contacts' | 'sql'>('actualites');

  // Mock list d'utilisateurs pour la démonstration RBAC
  const [usersList, setUsersList] = useState<UserProfile[]>([
    {
      id: 'u-1',
      email: 'admin@ndoh-djuttitsa.cm',
      nom: 'S.M. Jean-Paul Melaga III',
      role: 'super_admin',
      date_creation: '2026-01-15T10:00:00Z',
    },
    {
      id: 'u-2',
      email: 'secretariat@ndoh-djuttitsa.cm',
      nom: 'Secrétariat Chefferie',
      role: 'administrateur',
      date_creation: '2026-02-01T09:30:00Z',
    },
    {
      id: 'u-3',
      email: 'journaliste@ndoh-djuttitsa.cm',
      nom: 'Rédacteur Communautaire',
      role: 'redacteur',
      date_creation: '2026-02-10T14:15:00Z',
    },
    {
      id: 'u-4',
      email: 'moderateur@ndoh-djuttitsa.cm',
      nom: 'Modérateur du Forum',
      role: 'moderateur',
      date_creation: '2026-02-15T11:00:00Z',
    },
    {
      id: 'u-5',
      email: 'habitant@ndoh-djuttitsa.cm',
      nom: 'Membre Résident Ndoh',
      role: 'habitant',
      date_creation: '2026-03-01T08:00:00Z',
    },
  ]);

  const [actualitesList, setActualitesList] = useState<Actualite[]>(MOCK_ACTUALITES);
  const [newTitle, setNewTitle] = useState('');
  const [newChapeau, setNewChapeau] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Économie & Développement');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        loginAsDemoAdmin();
      }
    } catch (err: any) {
      setLoginError(err.message || 'Erreur lors de la connexion Super Admin');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleChangeRole = (userId: string, newRole: UserRole) => {
    setUsersList(
      usersList.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    alert('Rôle utilisateur mis à jour avec succès !');
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newItem: Actualite = {
      id: `act-${Date.now()}`,
      titre: newTitle,
      chapeau: newChapeau || newTitle,
      contenu: newContent,
      image_url: newImageUrl || 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1200&q=80',
      categorie: newCategory,
      date_publication: new Date().toISOString(),
      publie: true,
      auteur: 'Administration NDOH-DJUTTITSA',
    };

    setActualitesList([newItem, ...actualitesList]);
    setNewTitle('');
    setNewChapeau('');
    setNewContent('');
    setNewImageUrl('');
    alert('Actualité publiée avec succès !');
  };

  const handleDeleteNews = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cette actualité ?')) {
      setActualitesList(actualitesList.filter((item) => item.id !== id));
    }
  };

  const isAuthenticated = Boolean(user || isMockAdmin);

  // Helper pour afficher le badge de rôle
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return <Badge variant="amber" className="bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40">Super Admin</Badge>;
      case 'administrateur':
        return <Badge variant="emerald">Administrateur</Badge>;
      case 'redacteur':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">Rédacteur</span>;
      case 'moderateur':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800">Modérateur</span>;
      case 'habitant':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">Habitant</span>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white transition-colors duration-300">
        <Card className="w-full max-w-md p-8 space-y-6 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xl">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-500/30">
              <Shield className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">Espace Administration</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Plateforme officielle de gestion pour la sous-chefferie de NDOH-DJUTTITSA.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSupabaseLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Adresse Email Administrateur</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ndoh-djuttitsa.cm"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loggingIn}
              size="lg"
              className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 text-white"
              icon={<Lock className="w-4 h-4" />}
            >
              {loggingIn ? 'Connexion en cours...' : 'Se connecter via Supabase Auth'}
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center space-y-3">
            <p className="text-xs text-slate-500">Accès immédiat de démonstration :</p>
            <Button
              onClick={loginAsDemoAdmin}
              variant="outline"
              size="sm"
              className="w-full border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/50"
            >
              Accéder en Mode Démo (1-clic)
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Si le rôle est "habitant", l'accès à la console /admin est refusé
  if (currentRole === 'habitant') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white transition-colors duration-300">
        <Card className="w-full max-w-lg p-8 space-y-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-500/30">
            <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="space-y-2">
            <Badge variant="amber">Accès Réservé à l Équipe Administrative</Badge>
            <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
              Accès Refusé au Rôle Habitant
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              L espace d administration <code className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">/admin</code> est strictement réservé aux rôles administratifs de la chefferie (Super Administrateur, Administrateur, Rédacteur, Modérateur).
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              En tant qu habitant du village, vous pouvez consulter les informations publiques, la galerie, les actualités et envoyer des messages via le formulaire de contact.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Tester un rôle administratif autorisé :</span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as UserRole)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
              >
                <option value="super_admin">Super Admin</option>
                <option value="administrateur">Administrateur</option>
                <option value="redacteur">Rédacteur</option>
                <option value="moderateur">Modérateur</option>
                <option value="habitant">Habitant (Bloqué)</option>
              </select>
            </div>
            <Link to="/">
              <Button size="md" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                Retourner à l Accueil du Site
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white pb-20 transition-colors duration-300">
      {/* Barre de navigation d administration */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Console Administration</h1>
                {getRoleBadge(currentRole)}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                RBAC Sécurisé par Row Level Security (RLS) · Supabase BaaS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Selecteur de rôle pour démonstration facile */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Tester rôle :</span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as UserRole)}
                className="bg-transparent font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="super_admin">Super Admin</option>
                <option value="administrateur">Administrateur</option>
                <option value="redacteur">Rédacteur</option>
                <option value="moderateur">Modérateur</option>
                <option value="habitant">Habitant</option>
              </select>
            </div>

            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              icon={<LogOut className="w-4 h-4" />}
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Cartes de Statistiques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mb-2" />
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{usersList.length}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Membres inscrits (RBAC)</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <Newspaper className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2" />
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{actualitesList.length}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Actualités publiées</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-2" />
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{MOCK_EVENEMENTS.length}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Événements programmés</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">4</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Messages citoyens reçus</div>
          </div>
        </div>

        {/* Barre d Onglets Fonctionnels par Rôle */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/60 dark:bg-[#111827] rounded-2xl border border-slate-300/60 dark:border-slate-800">
          {(currentRole === 'super_admin' || currentRole === 'administrateur') && (
            <button
              onClick={() => setAdminTab('roles')}
              type="button"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                adminTab === 'roles' ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Gestion des Rôles (5 Rôles)</span>
            </button>
          )}

          {(currentRole === 'super_admin' || currentRole === 'administrateur' || currentRole === 'redacteur') && (
            <button
              onClick={() => setAdminTab('actualites')}
              type="button"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                adminTab === 'actualites' ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Actualités</span>
            </button>
          )}

          {(currentRole === 'super_admin' || currentRole === 'administrateur' || currentRole === 'redacteur') && (
            <button
              onClick={() => setAdminTab('evenements')}
              type="button"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                adminTab === 'evenements' ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Événements</span>
            </button>
          )}

          {(currentRole === 'super_admin' || currentRole === 'administrateur' || currentRole === 'moderateur') && (
            <button
              onClick={() => setAdminTab('medias')}
              type="button"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                adminTab === 'medias' ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Médias & Photothèque</span>
            </button>
          )}

          {(currentRole === 'super_admin' || currentRole === 'administrateur' || currentRole === 'moderateur') && (
            <button
              onClick={() => setAdminTab('contacts')}
              type="button"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                adminTab === 'contacts' ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Messages Contacts</span>
            </button>
          )}

          {(currentRole === 'super_admin' || currentRole === 'administrateur') && (
            <button
              onClick={() => setAdminTab('sql')}
              type="button"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                adminTab === 'sql' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Schéma SQL Supabase</span>
            </button>
          )}
        </div>

        {/* CONTENU ONGLET 1 : GESTION DES RÔLES (SUPER ADMIN & ADMINISTRATEUR) */}
        {adminTab === 'roles' && (
          <Card className="p-6 sm:p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Gestion des Rôles Utilisateurs (RBAC 5-Rôles)</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Attribuez ou modifiez les privilèges des membres inscrits.
                </p>
              </div>
              <Badge variant="emerald">5 Rôles Opérationnels</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Utilisateur / Nom</th>
                    <th className="py-3 px-4">Adresse Email</th>
                    <th className="py-3 px-4">Rôle Actuel</th>
                    <th className="py-3 px-4">Changer le Rôle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {u.nom}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono">
                        {u.email}
                      </td>
                      <td className="py-3.5 px-4">
                        {getRoleBadge(u.role)}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleChangeRole(u.id, e.target.value as UserRole)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="super_admin">Super Administrateur</option>
                          <option value="administrateur">Administrateur</option>
                          <option value="redacteur">Rédacteur</option>
                          <option value="moderateur">Modérateur</option>
                          <option value="habitant">Habitant</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Légende explicative des 5 rôles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-300">1. Super Administrateur</span>
                <p className="text-slate-600 dark:text-slate-400">Contrôle total du système, gestion des utilisateurs, attribution des rôles et configuration globale.</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
                <span className="font-bold text-emerald-900 dark:text-emerald-300">2. Administrateur</span>
                <p className="text-slate-600 dark:text-slate-400">Gestion globale des contenus, événements, médias, documents officiels et révision des messages.</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-1">
                <span className="font-bold text-blue-900 dark:text-blue-300">3. Rédacteur & 4. Modérateur</span>
                <p className="text-slate-600 dark:text-slate-400">Le Rédacteur crée les actualités/événements ; le Modérateur valide les médias et les contacts reçus.</p>
              </div>
            </div>
          </Card>
        )}

        {/* CONTENU ONGLET 2 : ACTUALITÉS */}
        {adminTab === 'actualites' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Publier une Actualité</span>
              </h3>

              <form onSubmit={handleAddNews} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Titre de l article *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="ex. Réhabilitation de la route principale..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Catégorie</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Économie & Développement">Économie & Développement</option>
                    <option value="Culture & Tradition">Culture & Tradition</option>
                    <option value="Santé & Social">Santé & Social</option>
                    <option value="Sport & Jeunesse">Sport & Jeunesse</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">URL de l image (Optionnelle)</label>
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Chapeau / Résumé</label>
                  <input
                    type="text"
                    value={newChapeau}
                    onChange={(e) => setNewChapeau(e.target.value)}
                    placeholder="Une courte phrase d accroche..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Contenu complet *</label>
                  <textarea
                    required
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Contenu détaillé..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <Button type="submit" size="sm" className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 text-white">
                  Publier l Article
                </Button>
              </form>
            </Card>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">Articles publiés dans le système</h3>
              <div className="space-y-3">
                {actualitesList.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image_url}
                        alt=""
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div>
                        <Badge variant="amber" className="mb-1 text-[10px]">{item.categorie}</Badge>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{item.titre}</h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(item.date_publication).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteNews(item.id)}
                      type="button"
                      className="p-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/60 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTENU ONGLET 3 : ÉVÉNEMENTS */}
        {adminTab === 'evenements' && (
          <Card className="p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>Gestion des Événements Communautaires</span>
              </h3>
              <Badge variant="amber">Agenda Officiel</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {MOCK_EVENEMENTS.map((evt) => (
                <div key={evt.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <img src={evt.image_url} alt="" className="w-16 h-16 rounded-xl object-cover" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{evt.titre}</h4>
                    <p className="text-slate-500 dark:text-slate-400">{evt.lieu}</p>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                      {new Date(evt.date_debut).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* CONTENU ONGLET 4 : MÉDIAS */}
        {adminTab === 'medias' && (
          <Card className="p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Gestion du Stockage & Médias</span>
              </h3>
              <Badge variant="emerald">Stockage Supabase Storage</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {MOCK_MEDIAS.map((m) => (
                <div key={m.id} className="group relative h-36 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  <img src={m.url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center p-2 text-white text-center text-xs font-bold transition-opacity">
                    {m.legende}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* CONTENU ONGLET 5 : MESSAGES CONTACTS */}
        {adminTab === 'contacts' && (
          <Card className="p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Messages & Recommandations des Citoyens</span>
              </h3>
              <Badge variant="emerald">Formulaire Officiel</Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Jean-Pierre T. (Diaspora France)</span>
                  <span className="text-slate-400">Hier à 16:45</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  "Félicitations pour la mise en ligne de la plateforme officielle de notre village NDOH-DJUTTITSA. Comment la diaspora peut-elle contribuer à la réhabilitation de l école ?"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Dr. Marie N. (Santé)</span>
                  <span className="text-slate-400">Il y a 3 jours</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  "Proposition d organisation d une campagne de consultation médicale gratuite au CMA de Ndoh-Djuttitsa."
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* CONTENU ONGLET 6 : SCHÉMA SQL & RLS */}
        {adminTab === 'sql' && (
          <Card className="p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Database className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Instructions de Déploiement & SQL Supabase</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Pour connecter votre instance Supabase réelle à cette plateforme, exécutez le fichier <code className="text-amber-600 dark:text-amber-300 font-mono">supabase_schema.sql</code> dans votre SQL Editor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 space-y-2">
              <div className="font-bold text-amber-400">// Clés d environnement (.env) :</div>
              <div>VITE_SUPABASE_URL=https://votre-projet.supabase.co</div>
              <div>VITE_SUPABASE_ANON_KEY=votre_cle_anon_publique</div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Politiques RLS (Row Level Security) 5-Rôles incluses :</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                <li>Lecture publique (`SELECT`) autorisée sur toutes les tables de présentation.</li>
                <li>Écriture publique autorisée sur la table `contacts`.</li>
                <li>Modifications granulaires (`INSERT`, `UPDATE`, `DELETE`) selon les rôles `super_admin`, `administrateur`, `redacteur`, `moderateur`.</li>
              </ul>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
};
