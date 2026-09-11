import React, { useState } from 'react';
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
  Key,
} from 'lucide-react';
import type { Actualite } from '../data/mockData';
import { MOCK_ACTUALITES, MOCK_EVENEMENTS, MOCK_MEDIAS } from '../data/mockData';

export const AdminPage: React.FC = () => {
  const { user, isMockAdmin, loginAsDemoAdmin, signOut } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [adminTab, setAdminTab] = useState<'actualites' | 'evenements' | 'medias' | 'contacts' | 'sql'>('actualites');

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
      auteur: 'Super Admin',
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white transition-colors duration-300">
        <Card className="w-full max-w-md p-8 space-y-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xl">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-500/30">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">Espace Administrateur</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Accès réservé au Super Administrateur de la localité.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSupabaseLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Adresse Email Super Admin</label>
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
            <p className="text-xs text-slate-500">Accès de démonstration :</p>
            <Button
              onClick={loginAsDemoAdmin}
              variant="outline"
              size="sm"
              className="w-full border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/50"
            >
              Accéder en Mode Démo Super Admin (1-clic)
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white pb-20 transition-colors duration-300">
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Console Super Admin</h1>
                <Badge variant="emerald">{isMockAdmin ? 'Mode Démo Admin' : 'Supabase Auth JWT'}</Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Gestion dynamique des contenus et RLS Security</p>
            </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <Newspaper className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2" />
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{actualitesList.length}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Actualités enregistrées</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-2" />
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{MOCK_EVENEMENTS.length}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Événements programmés</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <ImageIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{MOCK_MEDIAS.length}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Fichiers médias & Galerie</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">4</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Messages contacts reçus</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-900 rounded-2xl border border-slate-300/60 dark:border-slate-800">
          <button
            onClick={() => setAdminTab('actualites')}
            type="button"
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              adminTab === 'actualites' ? 'bg-slate-900 text-white dark:bg-emerald-600' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Gestion des Actualités
          </button>
          <button
            onClick={() => setAdminTab('evenements')}
            type="button"
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              adminTab === 'evenements' ? 'bg-slate-900 text-white dark:bg-emerald-600' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Gestion des Événements
          </button>
          <button
            onClick={() => setAdminTab('medias')}
            type="button"
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              adminTab === 'medias' ? 'bg-slate-900 text-white dark:bg-emerald-600' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Stockage & Médias
          </button>
          <button
            onClick={() => setAdminTab('sql')}
            type="button"
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              adminTab === 'sql' ? 'bg-amber-600 text-white' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Schéma SQL & RLS Supabase
          </button>
        </div>

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

        {adminTab === 'sql' && (
          <Card className="p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Database className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Instructions de Déploiement & SQL Supabase</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Pour connecter votre instance Supabase réelle à cette plateforme, créez les tables et politiques RLS en exécutant le fichier <code className="text-amber-600 dark:text-amber-300">supabase_schema.sql</code> généré à la racine du projet.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 space-y-2">
              <div className="font-bold text-amber-400">// Clés d environnement (.env) :</div>
              <div>VITE_SUPABASE_URL=https://votre-projet.supabase.co</div>
              <div>VITE_SUPABASE_ANON_KEY=votre_cle_anon_publique</div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Key className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Politiques RLS (Row Level Security) incluses :</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                <li>Lecture publique (`SELECT`) autorisée sur toutes les tables de présentation.</li>
                <li>Écriture publique autorisée exclusivement sur la table `contacts` (Formulaire de contact).</li>
                <li>Modifications (`INSERT`, `UPDATE`, `DELETE`) réservées exclusivement au rôle `super_admin`.</li>
              </ul>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
};
