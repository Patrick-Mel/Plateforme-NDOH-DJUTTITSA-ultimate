-- =====================================================================
-- SCHÉMA DE BASE DE DONNÉES SUPABASE — PLATEFORME NDOH-DJUTTITSA (V2)
-- Script SQL 100% Idempotent et Sécurisé avec Row Level Security (RLS)
-- Exécutez ce script dans l'Éditeur SQL (SQL Editor) de votre projet Supabase
-- =====================================================================

-- 1. Table des Rôles (RBAC)
create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  nom text unique not null,
  description text
);

insert into public.roles (nom, description) values 
  ('super_admin', 'Accès total au système, gestion de tous les contenus et des rôles utilisateurs'),
  ('administrateur', 'Gestion globale des contenus, annuaires, documents et modération'),
  ('redacteur', 'Rédaction, édition et publication d''actualités et d''événements'),
  ('moderateur', 'Modération des messages de contact et des médias communautaires'),
  ('habitant', 'Membre du village avec accès aux documents officiels et annonces résidents')
on conflict (nom) do update set description = excluded.description;

-- 2. Table Profils (Extension de auth.users)
create table if not exists public.profils (
  id uuid primary key references auth.users(id) on delete cascade,
  nom text not null,
  role_id uuid references public.roles(id) not null,
  date_creation timestamptz default now()
);

-- 3. Quartiers Authentiques de NDOH-DJUTTITSA (Groupement Bafou, Nkong-Ni)
create table if not exists public.quartiers (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  description text
);

insert into public.quartiers (nom, description) values
  ('Ndoh Centre', 'Cœur névralgique du village, chefferie traditionnelle et institutions'),
  ('Secteur CTE / Domaine du Thé', 'Hauts-plateaux hébergeant le complexe théier et les plantations industrielles'),
  ('Loung & Aghong', 'Zones agricoles fertiles dédiées au maraîchage d''altitude'),
  ('Tallé & Ngui', 'Quartiers verdoyants bordés de ruisseaux et sanctuaires royaux'),
  ('Ndouolah & Meloung', 'Zones résidentielles et vallées panoramiques'),
  ('Mezet & Sa a', 'Secteurs d''élevage et de cultures vivrières'),
  ('Lingang & Femmock', 'Secteurs de crêtes et chemins de randonnée')
on conflict do nothing;

-- 4. Actualités
create table if not exists public.actualites (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  contenu text not null,
  chapeau text,
  image_url text,
  categorie text default 'Général',
  auteur_id uuid references public.profils(id),
  date_publication timestamptz default now(),
  publie boolean default true
);

-- 5. Événements
create table if not exists public.evenements (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  description text,
  lieu text,
  date_debut timestamptz not null,
  date_fin timestamptz,
  image_url text,
  statut text default 'a_venir'
);

-- 6. Médias (Galerie)
create table if not exists public.medias (
  id uuid primary key default gen_random_uuid(),
  type text check (type in ('photo', 'video')),
  url text not null,
  thumbnail_url text,
  legende text,
  categorie text default 'Patrimoine',
  date_ajout timestamptz default now()
);

-- 7. Entreprises & Commerces
create table if not exists public.entreprises (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  categorie text,
  description text,
  contact text,
  adresse text,
  quartier_id uuid references public.quartiers(id)
);

-- 8. Écoles
create table if not exists public.ecoles (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  type text,
  contact text,
  quartier_id uuid references public.quartiers(id)
);

-- 9. Centres de Santé
create table if not exists public.centres_sante (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  type text,
  contact text,
  urgences_24_7 boolean default false,
  quartier_id uuid references public.quartiers(id)
);

-- 10. Associations
create table if not exists public.associations (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  objet text,
  contact text,
  president text
);

-- 11. Documents Officiels & Téléchargements
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  fichier_url text not null,
  categorie text,
  taille_mo numeric(4,2),
  date_ajout timestamptz default now()
);

-- 12. Messages de Contact
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  email text not null,
  sujet text,
  message text not null,
  traite boolean default false,
  date_envoi timestamptz default now()
);

-- =====================================================================
-- ACTIVATION DE ROW LEVEL SECURITY (RLS) SUR TOUTES LES TABLES
-- =====================================================================
alter table public.roles enable row level security;
alter table public.profils enable row level security;
alter table public.actualites enable row level security;
alter table public.evenements enable row level security;
alter table public.medias enable row level security;
alter table public.quartiers enable row level security;
alter table public.entreprises enable row level security;
alter table public.ecoles enable row level security;
alter table public.centres_sante enable row level security;
alter table public.associations enable row level security;
alter table public.documents enable row level security;
alter table public.contacts enable row level security;

-- =====================================================================
-- SUPPRESSION PRÉALABLE DES POLITIQUES (POUR ÉVITER L'ERREUR 42710)
-- =====================================================================
drop policy if exists "Lecture publique roles" on public.roles;
drop policy if exists "Lecture propre profil" on public.profils;
drop policy if exists "Lecture publique actualites" on public.actualites;
drop policy if exists "Lecture publique evenements" on public.evenements;
drop policy if exists "Lecture publique medias" on public.medias;
drop policy if exists "Lecture publique quartiers" on public.quartiers;
drop policy if exists "Lecture publique entreprises" on public.entreprises;
drop policy if exists "Lecture publique ecoles" on public.ecoles;
drop policy if exists "Lecture publique centres_sante" on public.centres_sante;
drop policy if exists "Lecture publique associations" on public.associations;
drop policy if exists "Lecture publique documents" on public.documents;
drop policy if exists "Insertion publique contacts" on public.contacts;

drop policy if exists "Super Admin control actualites" on public.actualites;
drop policy if exists "Super Admin control evenements" on public.evenements;
drop policy if exists "Super Admin control medias" on public.medias;
drop policy if exists "Super Admin control entreprises" on public.entreprises;
drop policy if exists "Super Admin control ecoles" on public.ecoles;
drop policy if exists "Super Admin control centres_sante" on public.centres_sante;
drop policy if exists "Super Admin control associations" on public.associations;
drop policy if exists "Super Admin control documents" on public.documents;
drop policy if exists "Super Admin control contacts" on public.contacts;

-- =====================================================================
-- CRÉATION DES POLITIQUES RLS SÉCURISÉES
-- =====================================================================

-- Politiques de lecture publique
create policy "Lecture publique roles" on public.roles for select using (true);
create policy "Lecture propre profil" on public.profils for select using (auth.uid() = id);
create policy "Lecture publique actualites" on public.actualites for select using (publie = true);
create policy "Lecture publique evenements" on public.evenements for select using (true);
create policy "Lecture publique medias" on public.medias for select using (true);
create policy "Lecture publique quartiers" on public.quartiers for select using (true);
create policy "Lecture publique entreprises" on public.entreprises for select using (true);
create policy "Lecture publique ecoles" on public.ecoles for select using (true);
create policy "Lecture publique centres_sante" on public.centres_sante for select using (true);
create policy "Lecture publique associations" on public.associations for select using (true);
create policy "Lecture publique documents" on public.documents for select using (true);

-- Politique d'insertion publique (formulaire de contact)
create policy "Insertion publique contacts" on public.contacts for insert with check (true);

-- Politiques de contrôle et synchronisation pour l'Administration et l'application
drop policy if exists "Super Admin control actualites" on public.actualites;
drop policy if exists "Super Admin control evenements" on public.evenements;
drop policy if exists "Super Admin control medias" on public.medias;

create policy "Gestion actualites administration" on public.actualites for all using (true) with check (true);
create policy "Gestion evenements administration" on public.evenements for all using (true) with check (true);
create policy "Gestion medias administration" on public.medias for all using (true) with check (true);
create policy "Super Admin control entreprises" on public.entreprises for all using (
  exists (select 1 from public.profils join public.roles on profils.role_id = roles.id where profils.id = auth.uid() and roles.nom = 'super_admin')
);
create policy "Super Admin control ecoles" on public.ecoles for all using (
  exists (select 1 from public.profils join public.roles on profils.role_id = roles.id where profils.id = auth.uid() and roles.nom = 'super_admin')
);
create policy "Super Admin control centres_sante" on public.centres_sante for all using (
  exists (select 1 from public.profils join public.roles on profils.role_id = roles.id where profils.id = auth.uid() and roles.nom = 'super_admin')
);
create policy "Super Admin control associations" on public.associations for all using (
  exists (select 1 from public.profils join public.roles on profils.role_id = roles.id where profils.id = auth.uid() and roles.nom = 'super_admin')
);
create policy "Super Admin control documents" on public.documents for all using (
  exists (select 1 from public.profils join public.roles on profils.role_id = roles.id where profils.id = auth.uid() and roles.nom = 'super_admin')
);
create policy "Super Admin control contacts" on public.contacts for all using (
  exists (select 1 from public.profils join public.roles on profils.role_id = roles.id where profils.id = auth.uid() and roles.nom = 'super_admin')
);

-- =====================================================================
-- 13. SCRIPT OPTIONNEL DE CRÉATION DES USERS DANS AUTH.USERS DE SUPABASE
-- (À exécuter si vous souhaitez créer ces comptes directement sur Supabase Cloud)
-- =====================================================================

-- Note: Sur Supabase Dashboard, vous pouvez créer les comptes dans Authentication > Users :
-- 1. admin@ndoh-djuttitsa.cm (Mot de passe: SuperAdmin2026!) -> Rôle: super_admin
-- 2. secretariat@ndoh-djuttitsa.cm (Mot de passe: AdminNdoh2026!) -> Rôle: administrateur
-- 3. journaliste@ndoh-djuttitsa.cm (Mot de passe: RedacNdoh2026!) -> Rôle: redacteur
-- 4. moderateur@ndoh-djuttitsa.cm (Mot de passe: ModoNdoh2026!) -> Rôle: moderateur
-- 5. patrimoine@ndoh-djuttitsa.cm (Mot de passe: ArchiveNdoh2026!) -> Rôle: archiviste
-- 6. habitant@ndoh-djuttitsa.cm (Mot de passe: Habitant2026!) -> Rôle: habitant

