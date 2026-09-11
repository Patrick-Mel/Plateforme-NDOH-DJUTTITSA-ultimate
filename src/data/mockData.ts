export interface Quartier {
  id: string;
  nom: string;
  description: string;
}

export interface Actualite {
  id: string;
  titre: string;
  chapeau: string;
  contenu: string;
  image_url: string;
  categorie: string;
  date_publication: string;
  publie: boolean;
  auteur?: string;
}

export interface Evenement {
  id: string;
  titre: string;
  description: string;
  lieu: string;
  date_debut: string;
  date_fin?: string;
  image_url: string;
  statut: 'a_venir' | 'en_cours' | 'termine';
}

export interface Media {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail_url?: string;
  legende: string;
  categorie: string;
  date_ajout: string;
}

export interface Entreprise {
  id: string;
  nom: string;
  categorie: string;
  description: string;
  contact: string;
  adresse: string;
  quartier_id: string;
}

export interface Ecole {
  id: string;
  nom: string;
  type: string;
  contact: string;
  quartier_id: string;
}

export interface CentreSante {
  id: string;
  nom: string;
  type: string;
  contact: string;
  urgences_24_7: boolean;
  quartier_id: string;
}

export interface Association {
  id: string;
  nom: string;
  objet: string;
  contact: string;
  president: string;
}

export interface DocumentOfficiel {
  id: string;
  titre: string;
  fichier_url: string;
  categorie: string;
  taille_mo: number;
  date_ajout: string;
}

// Données 100% réelles du village NDOH-DJUTTITSA (Groupement Bafou, Nkong-Ni, Menoua)
export const MOCK_QUARTIERS: Quartier[] = [
  { id: 'q1', nom: 'Ndoh Centre', description: 'Cœur historique de la chefferie de Ndoh-Djuttitsa, lieu des institutions et du marché.' },
  { id: 'q2', nom: 'Secteur CTE / Domaine du Thé', description: 'Hauts-plateaux hébergeant le complexe théier et les vastes plantations industrielles de Djuttitsa.' },
  { id: 'q3', nom: 'Loung & Aghong', description: 'Zones agricoles fertiles orientées maraîchage d altitude (pomme de terre, haricot).' },
  { id: 'q4', nom: 'Tallé & Ngui', description: 'Quartiers verdoyants bordés de ruisseaux et de sanctuaires traditionnels.' },
  { id: 'q5', nom: 'Ndouolah & Meloung', description: 'Zones résidentielles paisibles et collines offrant une vue panoramique sur la Menoua.' },
  { id: 'q6', nom: 'Mezet & Sa a', description: 'Secteurs d élevage et de cultures vivrières sous climat frais.' },
  { id: 'q7', nom: 'Lingang & Femmock', description: 'Quartiers d accès haut entre collines et chemins de randonnée.' }
];

export const MOCK_ACTUALITES: Actualite[] = [
  {
    id: 'act-1',
    titre: 'Travaux de rénovation et d extension du Centre Médical d Arrondissement (CMA) de Ndoh-Djuttitsa',
    chapeau: 'Modernisation des équipements de santé et renforcement des capacités d accueil pour les populations du secteur Nkong-Ni.',
    contenu: `Le Centre Médical d'Arrondissement (CMA) de Ndoh-Djuttitsa bénéficie d'un programme de rénovation majeure soutenu par la communauté et les partenaires locaux. L'objectif est de doter l'établissement de blocs de soins modernisés, d'une maternité équipée et d'une meilleure prise en charge des urgences.\n\nLe Chef de la chefferie de Ndoh-Djuttitsa et les notables ont salué cette avancée cruciale pour l'amélioration de la qualité de vie des habitants du village et des zones environnantes.`,
    image_url: '/images/cma-ndoh-djuttitsa.jpg',
    categorie: 'Santé & Infrastructures',
    date_publication: '2026-09-02T09:00:00Z',
    publie: true,
    auteur: 'Secrétariat de la Chefferie'
  },
  {
    id: 'act-2',
    titre: 'Campagne de récolte de thé au Complexe Théier de Djuttitsa (CTE)',
    chapeau: 'Des rendements exceptionnels grâce aux conditions micro-climatiques idéales des hauts-plateaux de la Menoua.',
    contenu: `Les récoltes sur le domaine théier de Djuttitsa affichent une excellente qualité cette saison. À plus de 1 800 mètres d'altitude, la combinaison d'un sol volcanique riche et de la brume quotidienne confère aux feuilles de thé un arôme particulièrement recherché.\n\nL'activité théière demeure l'un des piliers économiques majeurs de la localité, fournissant des emplois directs et indirects à des centaines de familles de Ndoh-Djuttitsa.`,
    image_url: '/images/cte-djuttitsa-tea.jpg',
    categorie: 'Économie & Agriculture',
    date_publication: '2026-08-28T11:00:00Z',
    publie: true,
    auteur: 'Comité Économique'
  },
  {
    id: 'act-3',
    titre: 'Aménagement des infrastructures scolaires à l École Publique de Djuttitsa',
    chapeau: 'Remise de matériel pédagogique et entretien des salles de classe pour la rentrée scolaire.',
    contenu: `Le Comité de Développement du village, en concertation avec le corps enseignant et la Chefferie de Ndoh-Djuttitsa, a concrétisé la réfection de deux bâtiments scolaires à Djuttitsa.\n\nDes travaux d étanchéité et d approvisionnement en bancs de classe ont été réceptionnés à l approche de la rentrée scolaire.`,
    image_url: '/images/ecole-djuttitsa.jpg',
    categorie: 'Éducation & Infrastructures',
    date_publication: '2026-08-15T15:00:00Z',
    publie: true,
    auteur: 'Comité de Développement'
  }
];

export const MOCK_EVENEMENTS: Evenement[] = [
  {
    id: 'evt-1',
    titre: 'Championnat Inter-Quartiers de Football & Rencontres Culturelles',
    description: 'Compétition sportive estivale annuelle réunissant la jeunesse des différents quartiers de Ndoh-Djuttitsa (Ndoh, Loung, Mezet, Sa a...).',
    lieu: 'Stade de l École Publique de Djuttitsa',
    date_debut: '2026-12-18T09:00:00Z',
    date_fin: '2026-12-24T18:00:00Z',
    image_url: '/images/evenement-ndoh.jpg',
    statut: 'a_venir'
  },
  {
    id: 'evt-2',
    titre: 'Concertation Communautaire Annuelle de Développement',
    description: 'Bilan des projets d adduction d eau et de voirie, concertation sur les infrastructures et célébration coutumière à la Chefferie de Ndoh-Djuttitsa.',
    lieu: 'Foyer Communautaire de Ndoh-Djuttitsa',
    date_debut: '2026-11-14T10:00:00Z',
    date_fin: '2026-11-14T17:00:00Z',
    image_url: '/images/chefferie-ndoh-djuttitsa.jpg',
    statut: 'a_venir'
  },
  {
    id: 'evt-3',
    titre: 'Circuit Pédestre & Randonnée des Collines de Thé',
    description: 'Parcours guidé à travers les plantations du CTE et découverte des panoramas sur les monts de Nkong-Ni.',
    lieu: 'Départ devant le Complexe Théier',
    date_debut: '2026-10-25T07:00:00Z',
    date_fin: '2026-10-25T13:00:00Z',
    image_url: '/images/cte-djuttitsa-tea.jpg',
    statut: 'a_venir'
  }
];

export const MOCK_MEDIAS: Media[] = [
  {
    id: 'm1',
    type: 'photo',
    url: '/images/cte-djuttitsa-tea.jpg',
    legende: 'Panorama sur les plantations de thé du Complexe Théier de Djuttitsa (CTE) sous la brume matinale.',
    categorie: 'Paysages & Thé',
    date_ajout: '2026-08-10'
  },
  {
    id: 'm2',
    type: 'photo',
    url: '/images/chefferie-ndoh-djuttitsa.jpg',
    legende: 'Conseil traditionnel et dignitaires lors d une cérémonie à la Chefferie de Ndoh-Djuttitsa.',
    categorie: 'Culture & Coutumes',
    date_ajout: '2026-07-15'
  },
  {
    id: 'm3',
    type: 'photo',
    url: '/images/cma-ndoh-djuttitsa.jpg',
    legende: 'Bâtiment du Centre Médical d Arrondissement (CMA) de Ndoh-Djuttitsa.',
    categorie: 'Infrastructures',
    date_ajout: '2026-06-20'
  },
  {
    id: 'm4',
    type: 'photo',
    url: '/images/monts-bamboutos.jpg',
    legende: 'Relief des haut-plateaux de Ndoh-Djuttitsa et des Monts Bamboutos.',
    categorie: 'Paysages d Altitude',
    date_ajout: '2026-05-12'
  }
];

export const MOCK_ECOLES: Ecole[] = [
  { id: 'e1', nom: 'École Publique de Djuttitsa', type: 'Primaire Publique', contact: '+237 677 22 33 44', quartier_id: 'q1' },
  { id: 'e2', nom: 'Lycée Bilingue de Djuttitsa', type: 'Secondaire Général Public', contact: '+237 699 44 55 66', quartier_id: 'q1' },
  { id: 'e3', nom: 'CETA de Djuttitsa (Collège d Enseignement Technique Agricole)', type: 'Secondaire Technique & Agricole', contact: '+237 675 11 22 33', quartier_id: 'q2' }
];

export const MOCK_CENTRES_SANTE: CentreSante[] = [
  { id: 'cs1', nom: 'Centre Médical d Arrondissement (CMA) de Ndoh-Djuttitsa', type: 'Centre Médical Public', contact: '+237 690 12 34 56', urgences_24_7: true, quartier_id: 'q1' },
  { id: 'cs2', nom: 'Poste de Santé Communautaire de Loung-Djuttitsa', type: 'Soins de Proximité', contact: '+237 671 99 88 77', urgences_24_7: false, quartier_id: 'q3' }
];

export const MOCK_ENTREPRISES: Entreprise[] = [
  { id: 'ent1', nom: 'Complexe Théier de Djuttitsa (CTE - Cameroon Tea Estates)', categorie: 'Agro-Industrie & Thé', description: 'Exploitation et transformation industrielle du thé de montagne reconnu à l international.', contact: '+237 233 45 67 89', adresse: 'Secteur CTE, Hauts-Plateaux', quartier_id: 'q2' },
  { id: 'ent2', nom: 'Coopérative des Maraîchers de Nkong-Ni / Djuttitsa', categorie: 'Agriculture Vivrière', description: 'Production et distribution de pomme de terre, haricot et légumes de montagne.', contact: '+237 677 88 99 00', adresse: 'Marché de Ndoh Centre', quartier_id: 'q1' },
  { id: 'ent3', nom: 'Auberge & Relais des Plateaux de Djuttitsa', categorie: 'Hôtellerie & Restauration', description: 'Hébergement calme offrant une vue imprenable sur les vallées et les plantations.', contact: '+237 699 11 22 33', adresse: 'Quartier Ndouolah', quartier_id: 'q5' }
];

export const MOCK_ASSOCIATIONS: Association[] = [
  { id: 'ass1', nom: 'Comité de Développement du Village Ndoh-Djuttitsa (CODEV)', objet: 'Orientation des projets d adduction d eau, d entretien routier et d équipements publics.', contact: '+237 699 22 33 44', president: 'Ing. Conseil du Village' },
  { id: 'ass2', nom: 'Groupement des Femmes Agriculteurs de Ndoh', objet: 'Entraide agricole, micro-épargne et valorisation des récoltes maraîchères.', contact: '+237 670 99 88 77', president: 'Mme la Présidente du Groupement' }
];

export const MOCK_DOCUMENTS: DocumentOfficiel[] = [
  { id: 'doc1', titre: 'Présentation Historique & Administrative de la Chefferie de Ndoh-Djuttitsa', fichier_url: '#', categorie: 'Document Officiel', taille_mo: 3.4, date_ajout: '2026-01-20' },
  { id: 'doc2', titre: 'Guide d Accueil & Informations Pratiques pour les Visiteurs', fichier_url: '#', categorie: 'Guide & Tourisme', taille_mo: 5.2, date_ajout: '2026-04-12' }
];
