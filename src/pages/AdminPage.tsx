import React, { useState } from 'react';
import { useAuth, type UserRole } from '../context/AuthContext';
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
  AlertTriangle,
  Upload,
  Share2,
  Download,
  Music,
  FileText,
  Video,
  Eye,
  EyeOff,
  Landmark,
  Sliders,
  Code,
  CheckCircle2,
  X,
  Send,
  Archive,
} from 'lucide-react';
import type { Actualite, Media } from '../data/mockData';
import { MOCK_USER_ROLES, MOCK_QUARTIERS } from '../data/mockData';
import { useContent } from '../context/ContentContext';

export const AdminPage: React.FC = () => {
  const { isMockAdmin, currentRole, activeUser, loginAsRole, signOut } = useAuth();
  const {
    medias: mediasQueue,
    actualites: actualitesList,
    evenements,
    emergencyAlert,
    addMedia,
    deleteMedia: handleDeleteMediaCtx,
    addActualite,
    deleteActualite: handleDeleteActualiteCtx,
    setEmergencyAlert,
  } = useContent();

  const emergencyAlertActive = emergencyAlert.active;
  const emergencyAlertText = emergencyAlert.text;
  
  // États d'authentification et affichage mot de passe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Notifications toast (pour la copie de lien)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Onglet sélectionné
  const [adminTab, setAdminTab] = useState<'medias' | 'roles' | 'actualites' | 'evenements' | 'quartiers' | 'contacts' | 'patrimoine' | 'systeme' | 'sql'>('medias');
  
  // Onglet de filtrage des médias
  const [mediaFilter, setMediaFilter] = useState<'all' | 'photo' | 'video' | 'audio' | 'document'>('all');

  // Modal d'aperçu de média
  const [selectedPreviewMedia, setSelectedPreviewMedia] = useState<Media | null>(null);
  
  // Modal de code d'intégration HTML
  const [embedMedia, setEmbedMedia] = useState<Media | null>(null);

  // Formulaire de Téléversement Multimédia
  const [uploadLegende, setUploadLegende] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Culture & Coutumes');
  const [uploadTags, setUploadTags] = useState('');
  const [uploadType, setUploadType] = useState<'photo' | 'video' | 'audio' | 'document'>('photo');
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileSize, setUploadedFileSize] = useState<number>(2.5);

  // Formulaire d'ajout d'actualité
  const [newTitle, setNewTitle] = useState('');
  const [newChapeau, setNewChapeau] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Économie & Développement');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Paramètres système (Super Admin)
  const setEmergencyAlertActive = (active: boolean) => {
    setEmergencyAlert({ ...emergencyAlert, active });
  };
  const setEmergencyAlertText = (text: string) => {
    setEmergencyAlert({ ...emergencyAlert, text });
  };
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [siteName, setSiteName] = useState('Plateforme Officielle du Village NDOH-DJUTTITSA');

  // Liste des utilisateurs pour la gestion des rôles
  const [usersList, setUsersList] = useState([
    { id: 'u-1', email: 'admin@ndoh-djuttitsa.cm', nom: 'S.M. Jean-Paul Melaga III', role: 'super_admin' as UserRole, status: 'Actif' },
    { id: 'u-2', email: 'secretariat@ndoh-djuttitsa.cm', nom: 'Secrétariat Chefferie & CODEV', role: 'administrateur' as UserRole, status: 'Actif' },
    { id: 'u-3', email: 'journaliste@ndoh-djuttitsa.cm', nom: 'Rédacteur Communautaire', role: 'redacteur' as UserRole, status: 'Actif' },
    { id: 'u-4', email: 'moderateur@ndoh-djuttitsa.cm', nom: 'Médiateur Citoyen', role: 'moderateur' as UserRole, status: 'Actif' },
    { id: 'u-5', email: 'patrimoine@ndoh-djuttitsa.cm', nom: 'Conservateur du Patrimoine', role: 'archiviste' as UserRole, status: 'Actif' },
    { id: 'u-6', email: 'habitant@ndoh-djuttitsa.cm', nom: 'Membre Résident Ndoh', role: 'habitant' as UserRole, status: 'Actif' },
  ]);

  // Modal d'ajout de compte utilisateur
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('redacteur');

  // Messages citoyens (Modération)
  const [messagesList, setMessagesList] = useState([
    {
      id: 'm-1',
      auteur: 'Jean-Pierre T. (Ndoh Centre)',
      email: 'jp.tagne@gmail.com',
      date: 'Hier à 16:45',
      sujet: 'Réhabilitation de l École Publique',
      message: 'Félicitations pour la mise en ligne de la plateforme. Comment la diaspora peut-elle contribuer au financement des salles de classe ?',
      statut: 'Nouveau'
    },
    {
      id: 'm-2',
      auteur: 'Dr. Marie N. (Santé)',
      email: 'dr.marie@sante.cm',
      date: 'Il y a 3 jours',
      sujet: 'Campagne de consultation au CMA',
      message: 'Nous proposons d\'organiser une journée de consultations médicales et ophtalmologiques gratuites au CMA de Ndoh-Djuttitsa le mois prochain.',
      statut: 'En cours'
    },
    {
      id: 'm-3',
      auteur: 'Paul K. (Loung)',
      email: 'paul.k@yahoo.fr',
      date: 'Il y a 5 jours',
      sujet: 'Entretien des pistes maraîchères',
      message: 'Demande d\'intervention du matériel communal pour l\'aménagement du pont en bois de Loung après les fortes pluies.',
      statut: 'Traité'
    }
  ]);
  const [replyMessageId, setReplyMessageId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // GESTION DU TÉLÉVERSEMENT DE FICHIER (FILE READER)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setUploadedFileSize(Number((file.size / (1024 * 1024)).toFixed(2)));

    // Déterminer le type automatique si non forcé
    if (file.type.startsWith('image/')) setUploadType('photo');
    else if (file.type.startsWith('video/')) setUploadType('video');
    else if (file.type.startsWith('audio/')) setUploadType('audio');
    else if (file.type.includes('pdf') || file.type.includes('document')) setUploadType('document');

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedFileUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadLegende) {
      alert('Veuillez ajouter une légende ou description pour ce fichier.');
      return;
    }

    const fileUrlToUse = uploadedFileUrl || (
      uploadType === 'photo' ? '/images/cte-djuttitsa-tea.jpg' :
      uploadType === 'video' ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' :
      uploadType === 'audio' ? 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' :
      '/documents/presentation-historique-ndoh-djuttitsa.pdf'
    );

    const tagsArray = uploadTags ? uploadTags.split(',').map(t => t.trim()) : ['Ndoh', uploadCategory];

    const newMediaItem: Media = {
      id: `m-${Date.now()}`,
      type: uploadType,
      url: fileUrlToUse,
      legende: uploadLegende,
      categorie: uploadCategory,
      date_ajout: new Date().toISOString().split('T')[0],
      taille_mo: uploadedFileSize,
      auteur_role: activeUser?.nom || 'Administration',
      share_url: `https://ndoh-djuttitsa.cm/share/m-${Date.now()}`,
      tags: tagsArray,
      format: uploadType === 'photo' ? 'image/png' : uploadType === 'video' ? 'video/mp4' : uploadType === 'audio' ? 'audio/mp3' : 'application/pdf'
    };

    addMedia(newMediaItem);
    setUploadLegende('');
    setUploadTags('');
    setUploadedFileUrl('');
    setUploadedFileName('');
    showToast('Fichier téléversé et disponible sur le site.');
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer ce média du serveur ?')) {
      handleDeleteMediaCtx(id);
      showToast('Fichier supprimé avec succès.');
    }
  };

  const copyToClipboard = (text: string, label = 'Lien de partage') => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copié dans le presse-papier.`);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    try {
      let authenticated = false;

      // 1. Tenter d'abord la connexion via Supabase Auth réelles si configuré
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (!error && data.session) {
          authenticated = true;
          const matched = MOCK_USER_ROLES.find(r => r.email.toLowerCase() === cleanEmail);
          const roleToSet = matched ? matched.role : 'administrateur';
          loginAsRole(roleToSet, cleanEmail, data.user?.user_metadata?.nom || cleanEmail);
          showToast(`Connecté via Supabase Auth (${roleToSet.toUpperCase()})`);
        }
      }

      // 2. Si non authentifié par Supabase (utilisateur non encore créé sur le Cloud Supabase), valider via le registre de rôles
      if (!authenticated) {
        const matchedRole = MOCK_USER_ROLES.find(
          (r) => r.email.toLowerCase() === cleanEmail && r.password.trim() === cleanPassword
        );

        if (matchedRole) {
          authenticated = true;
          loginAsRole(matchedRole.role, matchedRole.email, matchedRole.nom);
          
          if (matchedRole.role === 'super_admin') setAdminTab('systeme');
          else if (matchedRole.role === 'administrateur') setAdminTab('quartiers');
          else if (matchedRole.role === 'redacteur') setAdminTab('actualites');
          else if (matchedRole.role === 'moderateur') setAdminTab('contacts');
          else if (matchedRole.role === 'archiviste') setAdminTab('patrimoine');
          else setAdminTab('medias');
        }
      }

      if (!authenticated) {
        setLoginError('Adresse email ou mot de passe incorrect. Veuillez vérifier vos identifiants.');
      }
    } catch (err: any) {
      // En cas d'erreur Supabase (ex. user not found), tenter le registre de rôles
      const matchedRole = MOCK_USER_ROLES.find(
        (r) => r.email.toLowerCase() === cleanEmail && r.password.trim() === cleanPassword
      );

      if (matchedRole) {
        loginAsRole(matchedRole.role, matchedRole.email, matchedRole.nom);
        if (matchedRole.role === 'super_admin') setAdminTab('systeme');
        else if (matchedRole.role === 'administrateur') setAdminTab('quartiers');
        else if (matchedRole.role === 'redacteur') setAdminTab('actualites');
        else if (matchedRole.role === 'moderateur') setAdminTab('contacts');
        else if (matchedRole.role === 'archiviste') setAdminTab('patrimoine');
        else setAdminTab('medias');
      } else {
        setLoginError('Adresse email ou mot de passe incorrect. Veuillez vérifier vos identifiants.');
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newUser = {
      id: `u-${Date.now()}`,
      email: newUserEmail,
      nom: newUserName,
      role: newUserRole,
      status: 'Actif'
    };

    setUsersList([...usersList, newUser]);
    setNewUserName('');
    setNewUserEmail('');
    showToast(`Nouveau compte ${newUserRole.toUpperCase()} créé avec succès !`);
  };

  const handleChangeRole = (userId: string, newRole: UserRole) => {
    setUsersList(usersList.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    showToast('Rôle utilisateur mis à jour avec succès.');
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newItem: Actualite = {
      id: `act-${Date.now()}`,
      titre: newTitle,
      chapeau: newChapeau || newTitle,
      contenu: newContent,
      image_url: newImageUrl || '/images/cte-djuttitsa-tea.jpg',
      categorie: newCategory,
      date_publication: new Date().toISOString(),
      publie: true,
      auteur: activeUser?.nom || 'Administration NDOH-DJUTTITSA',
    };

    addActualite(newItem);
    setNewTitle('');
    setNewChapeau('');
    setNewContent('');
    setNewImageUrl('');
    showToast('Actualité publiée avec succès et visible sur le site !');
  };

  // Helper pour afficher le badge de rôle avec couleurs distinctes
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
      case 'archiviste':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">Archiviste</span>;
      case 'habitant':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">Habitant</span>;
    }
  };

  const isAuthenticated = Boolean(isMockAdmin);

  // ---------------------------------------------------------------------------
  // ÉCRAN DE CONNEXION PROFESSIONNEL (SANS IDENTIFIANTS AFFICHÉS)
  // ---------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white py-12 px-4 sm:px-6 transition-colors duration-300">
        
        {/* Toast Floating Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="w-full max-w-md space-y-6 px-3 sm:px-0">
          
          {/* Header institutionnel */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-500/30 shadow-lg">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
                Console d'Administration
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Portail officiel de la Chefferie Supérieure & Communauté de <span className="text-emerald-700 dark:text-emerald-400 font-bold">NDOH-DJUTTITSA</span>.
              </p>
            </div>
          </div>

          {/* Formulaire de Connexion Strict */}
          <Card className="p-5 sm:p-8 space-y-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xl">
            <div className="space-y-1">
              <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Connexion à votre espace</span>
              </h2>
              <p className="text-xs text-slate-500">Saisissez vos identifiants institutionnels pour accéder à votre console.</p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs text-center font-medium">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Adresse Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@ndoh-djuttitsa.cm"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                    title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-emerald-600" /> : <Eye className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loggingIn}
                size="lg"
                className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 text-white shadow-md font-bold"
                icon={<Lock className="w-4 h-4" />}
              >
                {loggingIn ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </form>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[11px] text-slate-400">
                Accès sécurisé par contrôle d'accès RBAC · Groupement Bafou, Menoua
              </p>
            </div>
          </Card>

        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // ÉCRAN ADMINISTRATEUR PRINCIPAL QUAND CONNECTÉ
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white pb-20 transition-colors duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce max-w-[90vw]">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* BARRE HAUTE NAVIGATION ET BANDEAU D'IDENTITÉ RESPONSIVE */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] px-4 sm:px-8 py-4 sm:py-5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/30 shrink-0">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base sm:text-xl font-bold font-heading text-slate-900 dark:text-white truncate">Console Administration</h1>
                {getRoleBadge(currentRole)}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-1.5 mt-0.5">
                <span>Connecté en tant que <strong className="text-slate-900 dark:text-slate-200">{activeUser?.nom}</strong></span>
                <span className="hidden sm:inline">•</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 truncate max-w-[200px] sm:max-w-none">{activeUser?.email}</span>
              </p>
            </div>
          </div>

          {/* BOUTON DÉCONNEXION */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto justify-center border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs py-2"
              icon={<LogOut className="w-4 h-4" />}
            >
              Déconnexion
            </Button>
          </div>

        </div>
      </div>

      {/* SI LE RÔLE EST HABITANT : ÉCRAN CITOYEN RESTREINT AVEC DEMANDE D'ÉLÉVATION */}
      {currentRole === 'habitant' ? (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          <Card className="p-5 sm:p-8 space-y-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xl text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-500/30">
              <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="space-y-2">
              <Badge variant="amber">Accès Réservé à l'Équipe Administrative</Badge>
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                Portail Citoyen - Privilèges Limitées
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
                Vous êtes actuellement connecté avec le rôle <strong className="text-slate-900 dark:text-white">Habitant / Visiteur</strong>. L'accès à la gestion des actualités, des médias, des décrets et de la base de données est réservé aux administrateurs de la chefferie.
              </p>
            </div>

            {/* Formulaire de demande d'élévation de rôle */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-4 max-w-lg mx-auto">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-600" />
                <span>Demander des droits d'administration ou de rédaction</span>
              </h3>
              <p className="text-xs text-slate-500">
                Vous êtes membre d'un comité de quartier ou journaliste ? Envoyez votre demande au secrétariat de la Chefferie Supérieure.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); showToast('Votre demande a été envoyée au secrétariat !'); }} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Votre nom complet..."
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <select className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium">
                  <option value="redacteur">Rôle souhaité: Rédacteur Communautaire</option>
                  <option value="moderateur">Rôle souhaité: Modérateur Citoyen</option>
                  <option value="archiviste">Rôle souhaité: Archiviste du Patrimoine</option>
                </select>
                <textarea
                  rows={3}
                  required
                  placeholder="Motif de votre demande..."
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <Button type="submit" size="sm" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold">
                  Envoyer la demande
                </Button>
              </form>
            </div>
          </Card>
        </div>
      ) : (

        /* CONTENU DE LA CONSOLE POUR LES RÔLES ADMINISTRATIFS */
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 space-y-6 sm:space-y-8">

          {/* BARRE DE CARTES DE STATISTIQUES GLOBALES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 mb-1 sm:mb-2" />
              <div className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{mediasQueue.length}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Fichiers multimédias</div>
            </div>
            <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 mb-1 sm:mb-2" />
              <div className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{usersList.length}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Comptes utilisateurs (RBAC)</div>
            </div>
            <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 mb-1 sm:mb-2" />
              <div className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{actualitesList.length}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Actualités publiées</div>
            </div>
            <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 mb-1 sm:mb-2" />
              <div className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{messagesList.length}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Messages citoyens reçus</div>
            </div>
          </div>

          {/* BARRE D'ONGLETS RESPONSIVE (SCROLL HORIZONTAL + BOUTONS ERGONOMIQUES) */}
          <div className="p-1.5 bg-slate-200/60 dark:bg-[#111827] rounded-2xl border border-slate-300/60 dark:border-slate-800 overflow-x-auto touch-pan-x scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max">
            
              {/* Médias & Partage (Accessible à tous les rôles admin) */}
              <button
                onClick={() => setAdminTab('medias')}
                type="button"
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  adminTab === 'medias' ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4 shrink-0" />
                <span>1. Téléversement & Médias ({mediasQueue.length})</span>
              </button>

              {/* Gestion des Rôles (Super Admin & Administrateur) */}
              {(currentRole === 'super_admin' || currentRole === 'administrateur') && (
                <button
                  onClick={() => setAdminTab('roles')}
                  type="button"
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    adminTab === 'roles' ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <UserCheck className="w-4 h-4 shrink-0" />
                  <span>2. Rôles & RBAC</span>
                </button>
              )}

              {/* Actualités (Super Admin, Administrateur, Rédacteur) */}
              {(currentRole === 'super_admin' || currentRole === 'administrateur' || currentRole === 'redacteur') && (
                <button
                  onClick={() => setAdminTab('actualites')}
                  type="button"
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    adminTab === 'actualites' ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Newspaper className="w-4 h-4 shrink-0" />
                  <span>3. Actualités & Articles</span>
                </button>
              )}

              {/* Événements (Super Admin, Administrateur, Rédacteur) */}
              {(currentRole === 'super_admin' || currentRole === 'administrateur' || currentRole === 'redacteur') && (
                <button
                  onClick={() => setAdminTab('evenements')}
                  type="button"
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    adminTab === 'evenements' ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>4. Agenda</span>
                </button>
              )}

              {/* Quartiers & Infrastructures (Super Admin & Administrateur) */}
              {(currentRole === 'super_admin' || currentRole === 'administrateur') && (
                <button
                  onClick={() => setAdminTab('quartiers')}
                  type="button"
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    adminTab === 'quartiers' ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Landmark className="w-4 h-4 shrink-0" />
                  <span>5. Quartiers & Infrastructures</span>
                </button>
              )}

              {/* Messages Citoyens & Modération (Super Admin, Administrateur, Modérateur) */}
              {(currentRole === 'super_admin' || currentRole === 'administrateur' || currentRole === 'moderateur') && (
                <button
                  onClick={() => setAdminTab('contacts')}
                  type="button"
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    adminTab === 'contacts' ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>6. Messages Citoyens</span>
                </button>
              )}

              {/* Archives & Patrimoine (Super Admin, Administrateur, Archiviste) */}
              {(currentRole === 'super_admin' || currentRole === 'administrateur' || currentRole === 'archiviste') && (
                <button
                  onClick={() => setAdminTab('patrimoine')}
                  type="button"
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    adminTab === 'patrimoine' ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Archive className="w-4 h-4 shrink-0" />
                  <span>7. Patrimoine & Archives</span>
                </button>
              )}

              {/* Paramètres Système (Super Admin) */}
              {currentRole === 'super_admin' && (
                <button
                  onClick={() => setAdminTab('systeme')}
                  type="button"
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    adminTab === 'systeme' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Sliders className="w-4 h-4 shrink-0" />
                  <span>8. Système & Urgences</span>
                </button>
              )}

              {/* Schéma SQL (Super Admin & Administrateur) */}
              {(currentRole === 'super_admin' || currentRole === 'administrateur') && (
                <button
                  onClick={() => setAdminTab('sql')}
                  type="button"
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    adminTab === 'sql' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Database className="w-4 h-4 shrink-0" />
                  <span>9. SQL Supabase</span>
                </button>
              )}

            </div>
          </div>

          {/* ========================================================================= */}
          {/* ONGLET 1 : TÉLÉVERSEMENT & MÉDIATHÈQUE INTERACTIVE AVEC PARTAGE */}
          {/* ========================================================================= */}
          {adminTab === 'medias' && (
            <div className="space-y-8">
              
              {/* Formulaire de Téléversement de Fichiers Multimédias */}
              <Card className="p-6 sm:p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                      <Upload className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span>Téléverser & Partager un Fichier Multimédia</span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Uploadez des photos, vidéos, enregistrements audios ou documents PDF avec liens de partage direct.
                    </p>
                  </div>
                  <Badge variant="emerald">Formats: JPG, PNG, MP4, MP3, PDF</Badge>
                </div>

                <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  
                  {/* Zone de Dépôt de Fichier (Drag and Drop / Select) */}
                  <div className="space-y-3">
                    <label className="font-bold text-slate-700 dark:text-slate-300 block">Sélecteur de Fichier *</label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center bg-slate-50 dark:bg-slate-900/60 hover:border-emerald-500 transition-colors flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        {uploadType === 'photo' && <ImageIcon className="w-6 h-6" />}
                        {uploadType === 'video' && <Video className="w-6 h-6" />}
                        {uploadType === 'audio' && <Music className="w-6 h-6" />}
                        {uploadType === 'document' && <FileText className="w-6 h-6" />}
                      </div>
                      
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">
                          {uploadedFileName ? uploadedFileName : 'Glissez-déposez un fichier ici'}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          {uploadedFileSize ? `Taille détectée : ${uploadedFileSize} Mo` : 'ou cliquez pour parcourir votre ordinateur'}
                        </p>
                      </div>

                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*,video/*,audio/*,.pdf,.docx"
                        className="hidden"
                        id="media-file-input"
                      />
                      <label
                        htmlFor="media-file-input"
                        className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors inline-block"
                      >
                        Parcourir les fichiers
                      </label>
                    </div>

                    {/* Aperçu direct après sélection */}
                    {uploadedFileUrl && (
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                        <span className="font-bold text-emerald-900 dark:text-emerald-300 text-[11px] block">Aperçu du Fichier Sélectionné :</span>
                        {uploadType === 'photo' && <img src={uploadedFileUrl} alt="Aperçu" className="w-full h-32 object-cover rounded-lg" />}
                        {uploadType === 'video' && <video src={uploadedFileUrl} controls className="w-full h-32 rounded-lg bg-black" />}
                        {uploadType === 'audio' && <audio src={uploadedFileUrl} controls className="w-full mt-2" />}
                        {uploadType === 'document' && <div className="p-3 rounded bg-white dark:bg-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300">Document PDF / Fichier prêt pour le téléversement</div>}
                      </div>
                    )}
                  </div>

                  {/* Métadonnées du Fichier */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Type de Média</label>
                      <select
                        value={uploadType}
                        onChange={(e) => setUploadType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="photo">Photo / Image (JPG, PNG)</option>
                        <option value="video">Vidéo (MP4, WEBM)</option>
                        <option value="audio">Fichier Audio / Chant (MP3, WAV)</option>
                        <option value="document">Document PDF / Officiel</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Légende / Description *</label>
                      <textarea
                        required
                        rows={2}
                        value={uploadLegende}
                        onChange={(e) => setUploadLegende(e.target.value)}
                        placeholder="Ex. Enregistrement de la cérémonie d'inauguration du CMA de Ndoh-Djuttitsa..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Catégorie</label>
                        <select
                          value={uploadCategory}
                          onChange={(e) => setUploadCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Culture & Coutumes">Culture & Coutumes</option>
                          <option value="Paysages & Thé">Paysages & Thé (CTE)</option>
                          <option value="Infrastructures">Infrastructures & Soins</option>
                          <option value="Patrimoine Sonore">Patrimoine Sonore</option>
                          <option value="Documents Officiels">Documents Officiels</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Tags (séparés par virgule)</label>
                        <input
                          type="text"
                          value={uploadTags}
                          onChange={(e) => setUploadTags(e.target.value)}
                          placeholder="Ndoh, Chefferie, CTE..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <Button type="submit" size="md" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold" icon={<Upload className="w-4 h-4" />}>
                      Publier et Générer le Lien de Partage
                    </Button>
                  </div>

                </form>
              </Card>

              {/* Médiathèque & Partage de Fichiers Existants */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Médiathèque & Fichiers Partagés</h3>
                    <p className="text-xs text-slate-500">Consultez, partagez ou intégrez vos contenus dans le site.</p>
                  </div>

                  {/* Filtres par Type de Média */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setMediaFilter('all')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                        mediaFilter === 'all' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Tous ({mediasQueue.length})
                    </button>
                    <button
                      onClick={() => setMediaFilter('photo')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                        mediaFilter === 'photo' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Photos ({mediasQueue.filter(m => m.type === 'photo').length})
                    </button>
                    <button
                      onClick={() => setMediaFilter('video')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                        mediaFilter === 'video' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Vidéos ({mediasQueue.filter(m => m.type === 'video').length})
                    </button>
                    <button
                      onClick={() => setMediaFilter('audio')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                        mediaFilter === 'audio' ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Audios ({mediasQueue.filter(m => m.type === 'audio').length})
                    </button>
                    <button
                      onClick={() => setMediaFilter('document')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                        mediaFilter === 'document' ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Documents ({mediasQueue.filter(m => m.type === 'document').length})
                    </button>
                  </div>
                </div>

                {/* Grille des Fichiers Multimédias */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mediasQueue
                    .filter(m => mediaFilter === 'all' || m.type === mediaFilter)
                    .map((item) => (
                      <Card key={item.id} className="overflow-hidden bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        
                        {/* Prévisualisation visuelle selon le type */}
                        <div className="relative h-44 bg-slate-950 overflow-hidden group">
                          {item.type === 'photo' && (
                            <img src={item.url} alt={item.legende} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          )}
                          {item.type === 'video' && (
                            <video src={item.url} className="w-full h-full object-cover opacity-80" />
                          )}
                          {item.type === 'audio' && (
                            <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-950 flex flex-col items-center justify-center text-white p-4 space-y-2">
                              <Music className="w-10 h-10 text-purple-400 animate-pulse" />
                              <span className="text-xs font-mono font-bold text-purple-200">Format Audio MP3</span>
                            </div>
                          )}
                          {item.type === 'document' && (
                            <div className="w-full h-full bg-gradient-to-br from-amber-900 to-orange-950 flex flex-col items-center justify-center text-white p-4 space-y-2">
                              <FileText className="w-10 h-10 text-amber-400" />
                              <span className="text-xs font-mono font-bold text-amber-200">Document Officiel PDF</span>
                            </div>
                          )}

                          {/* Badge Type */}
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-slate-900/80 text-white backdrop-blur-md border border-white/20 flex items-center gap-1">
                              {item.type === 'photo' && <ImageIcon className="w-3 h-3 text-emerald-400" />}
                              {item.type === 'video' && <Video className="w-3 h-3 text-blue-400" />}
                              {item.type === 'audio' && <Music className="w-3 h-3 text-purple-400" />}
                              {item.type === 'document' && <FileText className="w-3 h-3 text-amber-400" />}
                              <span>{item.type}</span>
                            </span>
                          </div>

                          {/* Bouton Aperçu Modal */}
                          <button
                            onClick={() => setSelectedPreviewMedia(item)}
                            type="button"
                            className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white gap-2 font-bold text-xs transition-opacity"
                          >
                            <Eye className="w-5 h-5" />
                            <span>Ouvrir l'aperçu</span>
                          </button>
                        </div>

                        {/* Corps d'informations et boutons de partage */}
                        <div className="p-5 space-y-4">
                          <div>
                            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                              <span>Ajouté le {item.date_ajout}</span>
                              <span>{item.taille_mo || 3.0} Mo</span>
                            </div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">{item.legende}</h4>
                            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1">{item.categorie}</p>
                          </div>

                          {/* Tags */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((t, idx) => (
                                <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Barre d'actions de Partage Direct */}
                          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => copyToClipboard(item.share_url || item.url, 'Lien direct du fichier')}
                                type="button"
                                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                              >
                                <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Copier le Lien</span>
                              </button>

                              <button
                                onClick={() => setEmbedMedia(item)}
                                type="button"
                                className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                                title="Code d'intégration HTML"
                              >
                                <Code className="w-3.5 h-3.5 text-blue-600" />
                                <span className="hidden sm:inline">Embed</span>
                              </button>

                              <a
                                href={item.url}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                                title="Télécharger"
                              >
                                <Download className="w-4 h-4" />
                              </a>

                              <button
                                onClick={() => handleDeleteMedia(item.id)}
                                type="button"
                                className="p-2 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 hover:bg-red-200 transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                        </div>
                      </Card>
                    ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* ONGLET 2 : GESTION DES RÔLES & ATTRIIBUTION DES PRIVILÈGES (RBAC) */}
          {/* ========================================================================= */}
          {adminTab === 'roles' && (
            <div className="space-y-8">
              
              {/* Formulaire d'ajout d'utilisateur */}
              <Card className="p-6 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Créer un Nouveau Compte Administrateur ou Rédacteur</span>
                </h3>

                <form onSubmit={handleAddUserSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Nom Complet *</label>
                    <input
                      type="text"
                      required
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="ex. Dignitaire Bernard T."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Adresse Email *</label>
                    <input
                      type="email"
                      required
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="email@ndoh-djuttitsa.cm"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Attribution du Rôle</label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                    >
                      <option value="super_admin">Super Administrateur</option>
                      <option value="administrateur">Administrateur Général</option>
                      <option value="redacteur">Rédacteur Communautaire</option>
                      <option value="moderateur">Modérateur Citoyen</option>
                      <option value="archiviste">Archiviste du Patrimoine</option>
                    </select>
                  </div>

                  <div className="space-y-1 sm:col-span-1 flex items-end">
                    <Button type="submit" size="sm" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold">
                      Créer le Compte
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Tableau d'affectation des rôles */}
              <Card className="p-6 sm:p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Liste des Membres et Privilèges RBAC</h3>
                    <p className="text-xs text-slate-500">Modifiez le rôle d'un utilisateur en temps réel dans le système.</p>
                  </div>
                  <Badge variant="emerald">{usersList.length} Utilisateurs Inscrits</Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Utilisateur / Dignitaire</th>
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
                              <option value="archiviste">Archiviste</option>
                              <option value="habitant">Habitant</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* MATRICE DÉTAILLÉE DES MATRICES DE PRIVILÈGES DES 6 RÔLES */}
              <Card className="p-6 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-500" />
                  <span>Matrice Comparative des Privilèges (6 Rôles)</span>
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-mono">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold">
                        <th className="py-2.5 px-3">Action / Pouvoir</th>
                        <th className="py-2.5 px-3 text-amber-600">Super Admin</th>
                        <th className="py-2.5 px-3 text-emerald-600">Admin</th>
                        <th className="py-2.5 px-3 text-blue-600">Rédacteur</th>
                        <th className="py-2.5 px-3 text-purple-600">Modérateur</th>
                        <th className="py-2.5 px-3 text-indigo-600">Archiviste</th>
                        <th className="py-2.5 px-3 text-slate-500">Habitant</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-bold">Configuration système & Alerte d'urgence</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-bold">Attribution et modification des rôles</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-bold">Téléversement & Partage multimédia</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-bold">Rédaction & Publication d'actualités</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-bold">Boîte de réception des messages citoyens</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-bold">Gestion du Conservatoire Sonore & Patrimoine</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Autorisé</td>
                        <td className="py-2.5 px-3 text-slate-400">Restreint</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

            </div>
          )}

          {/* ========================================================================= */}
          {/* ONGLET 3 : ACTUALITÉS & PUBLICATIONS */}
          {/* ========================================================================= */}
          {adminTab === 'actualites' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="p-6 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Publier une Actualité du Village</span>
                </h3>

                <form onSubmit={handleAddNews} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Titre de l'article *</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="ex. Réhabilitation de la route principale..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Catégorie</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="Économie & Développement">Économie & Développement</option>
                      <option value="Culture & Tradition">Culture & Tradition</option>
                      <option value="Santé & Social">Santé & Social</option>
                      <option value="Sport & Jeunesse">Sport & Jeunesse</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">URL d'image ou média téléversé</label>
                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Chapeau / Résumé</label>
                    <input
                      type="text"
                      value={newChapeau}
                      onChange={(e) => setNewChapeau(e.target.value)}
                      placeholder="Résumé en une phrase..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Contenu détaillé *</label>
                    <textarea
                      required
                      rows={4}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Texte complet..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <Button type="submit" size="sm" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold">
                    Publier l'Article
                  </Button>
                </form>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">Articles publiés par les Rédacteurs</h3>
                <div className="space-y-3">
                  {actualitesList.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <img src={item.image_url} alt="" className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <Badge variant="amber" className="mb-1 text-[10px]">{item.categorie}</Badge>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{item.titre}</h4>
                          <span className="text-xs text-slate-500">Par {item.auteur || 'Secrétariat'} • {new Date(item.date_publication).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          handleDeleteActualiteCtx(item.id);
                          showToast('Article supprimé.');
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/60 rounded-xl"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ONGLET 4 : AGENDA ÉVÉNEMENTS */}
          {/* ========================================================================= */}
          {adminTab === 'evenements' && (
            <Card className="p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span>Gestion de l'Agenda & Événements Communautaires</span>
                  </h3>
                  <p className="text-xs text-slate-500">Programmation des réunions de développement et tournois de football.</p>
                </div>
                <Badge variant="amber">Agenda Officiel</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {evenements.map((evt) => (
                  <div key={evt.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                    <img src={evt.image_url} alt="" className="w-full h-32 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{evt.titre}</h4>
                      <p className="text-xs text-slate-500 mt-1">{evt.lieu}</p>
                      <span className="inline-block px-2 py-0.5 mt-2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                        Début: {new Date(evt.date_debut).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ========================================================================= */}
          {/* ONGLET 5 : QUARTIERS & INFRASTRUCTURES (ADMINISTRATEUR) */}
          {/* ========================================================================= */}
          {adminTab === 'quartiers' && (
            <div className="space-y-8">
              
              {/* Suivi des Infrastructures Clés */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-5 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Domaine Théier (CTE Djuttitsa)</h4>
                    <Badge variant="emerald">En activité</Badge>
                  </div>
                  <p className="text-xs text-slate-500">Superficie: +1 500 Ha de plantations. Production optimale sous le climat des hauts-plateaux.</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[85%]"></div>
                  </div>
                </Card>

                <Card className="p-5 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Centre Médical (CMA)</h4>
                    <Badge variant="amber">Travaux en cours</Badge>
                  </div>
                  <p className="text-xs text-slate-500">Maternité et bloc opératoire en rénovation par le CODEV et la communauté.</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[60%]"></div>
                  </div>
                </Card>

                <Card className="p-5 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">École Publique & Lycée</h4>
                    <Badge variant="emerald">Rentrée OK</Badge>
                  </div>
                  <p className="text-xs text-slate-500">Bâtiments scolaires rénovés à Ndoh Centre et CETA Agricole.</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[95%]"></div>
                  </div>
                </Card>
              </div>

              {/* Liste des 7 Quartiers de NDOH-DJUTTITSA */}
              <Card className="p-6 sm:p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-emerald-600" />
                      <span>Gestion des 7 Quartiers de Ndoh-Djuttitsa</span>
                    </h3>
                    <p className="text-xs text-slate-500">Territoire du groupement Bafou, Nkong-Ni, Menoua.</p>
                  </div>
                  <Badge variant="emerald">7 Quartiers</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  {MOCK_QUARTIERS.map((q) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-emerald-800 dark:text-emerald-300">{q.nom}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 font-mono text-[10px] font-bold">{q.id.toUpperCase()}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">{q.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ONGLET 6 : MESSAGES CITOYENS & MODÉRATION (MODÉRATEUR) */}
          {/* ========================================================================= */}
          {adminTab === 'contacts' && (
            <Card className="p-6 sm:p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span>Boîte de Réception Citoyenne & Modération</span>
                  </h3>
                  <p className="text-xs text-slate-500">Réponses directes et modération des requêtes adressées à la Chefferie.</p>
                </div>
                <Badge variant="emerald">{messagesList.length} Messages</Badge>
              </div>

              <div className="space-y-4 text-xs">
                {messagesList.map((m) => (
                  <div key={m.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{m.auteur}</span>
                          <span className="font-mono text-slate-400 text-[11px]">&lt;{m.email}&gt;</span>
                        </div>
                        <h4 className="font-bold text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">{m.sujet}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          m.statut === 'Nouveau' ? 'bg-blue-100 text-blue-800' :
                          m.statut === 'En cours' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {m.statut}
                        </span>
                        <span className="text-slate-400 text-[11px]">{m.date}</span>
                      </div>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      "{m.message}"
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setReplyMessageId(m.id)}
                          type="button"
                          className="px-3 py-1.5 rounded-xl bg-purple-700 text-white font-bold flex items-center gap-1.5 hover:bg-purple-800 transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Répondre à l'habitant</span>
                        </button>
                      </div>

                      <select
                        value={m.statut}
                        onChange={(e) => {
                          setMessagesList(messagesList.map(msg => msg.id === m.id ? { ...msg, statut: e.target.value } : msg));
                          showToast('Statut du message mis à jour.');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-semibold text-[11px]"
                      >
                        <option value="Nouveau">Marquer Nouveau</option>
                        <option value="En cours">Marquer En cours</option>
                        <option value="Traité">Marquer Traité</option>
                      </select>
                    </div>

                    {/* Zone de réponse simulée */}
                    {replyMessageId === m.id && (
                      <div className="mt-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 space-y-2">
                        <span className="font-bold text-purple-900 dark:text-purple-300">Réponse officielle de la Chefferie :</span>
                        <textarea
                          rows={3}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Rédigez votre réponse ici..."
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-purple-300 dark:border-purple-800 text-slate-900 dark:text-white"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setReplyMessageId(null)}
                            type="button"
                            className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={() => {
                              showToast(`Réponse transmise avec succès à ${m.email} !`);
                              setReplyMessageId(null);
                              setReplyText('');
                              setMessagesList(messagesList.map(msg => msg.id === m.id ? { ...msg, statut: 'Traité' } : msg));
                            }}
                            type="button"
                            className="px-3 py-1 rounded-lg bg-purple-700 text-white font-bold"
                          >
                            Envoyer la réponse
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ========================================================================= */}
          {/* ONGLET 7 : CONSERVATOIRE DU PATRIMOINE CULTUEL & AUDIOS (ARCHIVISTE) */}
          {/* ========================================================================= */}
          {adminTab === 'patrimoine' && (
            <Card className="p-6 sm:p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <Archive className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Conservatoire Digital du Patrimoine & Récits Historiques</span>
                  </h3>
                  <p className="text-xs text-slate-500">Numérisation et catalogage des trésors culturels et archives sonores de Ndoh-Djuttitsa.</p>
                </div>
                <Badge variant="emerald">Espace Archiviste</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                
                <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                      <Music className="w-4 h-4" />
                      <span>Archives Sonores & Chants Traditionnels</span>
                    </h4>
                    <span className="px-2 py-0.5 rounded bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-bold text-[10px]">MP3 Audio</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Enregistrements audios d'époque des cérémonies royales, chants des moissons et louanges des dignitaires.
                  </p>
                  <audio controls src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" className="w-full mt-2" />
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
                      <Landmark className="w-4 h-4" />
                      <span>Arbre Dynastique & Manuscrits Royaux</span>
                    </h4>
                    <span className="px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-bold text-[10px]">Document PDF</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Généalogie officielle des Fo (Chefs Supérieurs) de Ndoh-Djuttitsa et histoire des alliances du groupement Bafou.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono text-slate-500 text-[11px]">Ref: ARCH-DYNASTIE-2026.pdf</span>
                    <a href="/documents/presentation-historique-ndoh-djuttitsa.pdf" target="_blank" className="px-3 py-1 rounded-lg bg-amber-700 text-white font-bold">Consulter</a>
                  </div>
                </div>

              </div>
            </Card>
          )}

          {/* ========================================================================= */}
          {/* ONGLET 8 : PARAMÈTRES SYSTÈME & ALERTE D URGENCE (SUPER ADMIN) */}
          {/* ========================================================================= */}
          {adminTab === 'systeme' && (
            <Card className="p-6 sm:p-8 bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-amber-500" />
                    <span>Contrôle Système & Bannières d'Urgence du Village</span>
                  </h3>
                  <p className="text-xs text-slate-500">Panneau exclusif du Super Administrateur (Chefferie Supérieure).</p>
                </div>
                <Badge variant="amber">Super Admin Only</Badge>
              </div>

              <div className="space-y-6 text-xs">
                
                {/* Switcher Bannière d'urgence */}
                <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">Bannière d'Alerte d'Urgence du Village</h4>
                      <p className="text-slate-500">Diffuser un message prioritaire en haut de toutes les pages du site.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEmergencyAlertActive(!emergencyAlertActive);
                        showToast(emergencyAlertActive ? 'Alerte d\'urgence désactivée' : 'Alerte d\'urgence activée sur le site');
                      }}
                      className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                        emergencyAlertActive ? 'bg-amber-600 text-white' : 'bg-slate-300 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {emergencyAlertActive ? 'Bannière Activée' : 'Désactivée'}
                    </button>
                  </div>

                  {emergencyAlertActive && (
                    <div className="space-y-2">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Texte de l'alerte d'urgence</label>
                      <input
                        type="text"
                        value={emergencyAlertText}
                        onChange={(e) => setEmergencyAlertText(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 text-slate-900 dark:text-white font-semibold"
                      />
                    </div>
                  )}
                </div>

                {/* Nom du site et mode maintenance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Nom Officiel du Site</label>
                    <input
                      type="text"
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Mode Maintenance</label>
                    <button
                      onClick={() => {
                        setMaintenanceMode(!maintenanceMode);
                        showToast(maintenanceMode ? 'Mode maintenance désactivé' : 'Mode maintenance ACTIVÉ');
                      }}
                      className={`w-full py-2 px-3 rounded-xl font-bold text-xs transition-colors ${
                        maintenanceMode ? 'bg-red-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {maintenanceMode ? 'Site en Maintenance (Accès restreint)' : 'Site En Ligne (Accès Public)'}
                    </button>
                  </div>
                </div>

              </div>
            </Card>
          )}

          {/* ========================================================================= */}
          {/* ONGLET 9 : SCHÉMA SQL SUPABASE & INSTRUCTIONS RLS */}
          {/* ========================================================================= */}
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
                  <span>Politiques RLS (Row Level Security) 6-Rôles incluses :</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Lecture publique (`SELECT`) autorisée sur toutes les tables de présentation.</li>
                  <li>Écriture publique autorisée sur la table `contacts`.</li>
                  <li>Modifications granulaires (`INSERT`, `UPDATE`, `DELETE`) selon les rôles `super_admin`, `administrateur`, `redacteur`, `moderateur`, `archiviste`.</li>
                </ul>
              </div>
            </Card>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL APERÇU MEDIA (PHOTOS, VIDÉOS, AUDIOS, PDF) */}
      {/* ========================================================================= */}
      {selectedPreviewMedia && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl max-w-3xl w-[95vw] sm:w-full p-4 sm:p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedPreviewMedia(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors z-10"
            >
              <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>

            <div className="space-y-1 pr-8">
              <Badge variant="emerald">{selectedPreviewMedia.type.toUpperCase()}</Badge>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">{selectedPreviewMedia.legende}</h3>
              <p className="text-xs text-slate-500">Catégorie: {selectedPreviewMedia.categorie}</p>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black flex items-center justify-center min-h-[220px] sm:min-h-[300px] max-h-[450px]">
              {selectedPreviewMedia.type === 'photo' && (
                <img src={selectedPreviewMedia.url} alt="" className="max-h-[420px] w-auto object-contain" />
              )}
              {selectedPreviewMedia.type === 'video' && (
                <video src={selectedPreviewMedia.url} controls autoPlay className="w-full max-h-[420px]" />
              )}
              {selectedPreviewMedia.type === 'audio' && (
                <div className="p-6 sm:p-8 text-center space-y-4 w-full">
                  <Music className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto animate-bounce" />
                  <audio src={selectedPreviewMedia.url} controls autoPlay className="w-full" />
                </div>
              )}
              {selectedPreviewMedia.type === 'document' && (
                <div className="p-6 sm:p-8 text-center space-y-4">
                  <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto" />
                  <p className="text-white text-xs font-mono">Aperçu du Document PDF disponible via téléchargement direct</p>
                  <a href={selectedPreviewMedia.url} target="_blank" download className="inline-block px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs">
                    Télécharger et ouvrir le PDF
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
              <button
                onClick={() => copyToClipboard(selectedPreviewMedia.share_url || selectedPreviewMedia.url, 'Lien direct')}
                className="px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Copier le Lien de Partage</span>
              </button>
              <button
                onClick={() => setSelectedPreviewMedia(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL CODE D'INTÉGRATION HTML (EMBED) */}
      {/* ========================================================================= */}
      {embedMedia && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl max-w-xl w-[95vw] sm:w-full p-4 sm:p-6 space-y-4 shadow-2xl relative text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEmbedMedia(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-slate-100 dark:bg-slate-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 pr-6">
              <Code className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Code d'Intégration HTML (Embed Snippet)</span>
            </h3>

            <p className="text-slate-500 leading-relaxed">
              Copiez ce code pour intégrer directement le fichier <strong className="text-slate-900 dark:text-white">{embedMedia.legende}</strong> dans un article ou un autre site web.
            </p>

            <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] break-all border border-slate-800">
              {embedMedia.type === 'photo' && `<img src="${embedMedia.url}" alt="${embedMedia.legende}" class="rounded-xl shadow-md" />`}
              {embedMedia.type === 'video' && `<video src="${embedMedia.url}" controls width="100%" poster="/images/cte-djuttitsa-tea.jpg"></video>`}
              {embedMedia.type === 'audio' && `<audio src="${embedMedia.url}" controls width="100%"></audio>`}
              {embedMedia.type === 'document' && `<iframe src="${embedMedia.url}" width="100%" height="600px"></iframe>`}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                onClick={() => {
                  const snippet = embedMedia.type === 'photo' ? `<img src="${embedMedia.url}" alt="${embedMedia.legende}" />` :
                                  embedMedia.type === 'video' ? `<video src="${embedMedia.url}" controls></video>` :
                                  embedMedia.type === 'audio' ? `<audio src="${embedMedia.url}" controls></audio>` :
                                  `<iframe src="${embedMedia.url}"></iframe>`;
                  copyToClipboard(snippet, 'Code HTML d\'intégration');
                  setEmbedMedia(null);
                }}
                size="sm"
                className="w-full sm:w-auto justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold"
              >
                Copier le Code Snippet
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
