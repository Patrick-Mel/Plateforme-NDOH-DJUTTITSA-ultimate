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

export const MOCK_QUARTIERS: Quartier[] = [
  { id: 'q1', nom: 'Djuttitsa Centre', description: 'Cœur administratif et commercial du village, accueillant les marchés et les rassemblements.' },
  { id: 'q2', nom: 'Bafou-Nord / Hauts-Plateaux', description: 'Zone d altitude élevée abritant les célèbres plantations de thé et offre des vues panoramiques spectaculaires.' },
  { id: 'q3', nom: 'Tchue-Lieu', description: 'Vallée verdoyante dédiée à l agriculture vivrière et aux traditions artisanales.' },
  { id: 'q4', nom: 'Ntsingbeu', description: 'Quartier pacifique bordé d écoles, d institutions et de zones résidentielles.' },
  { id: 'q5', nom: 'Baleng-Chefferie', description: 'Centre culturel et historique abritant la chefferie traditionnelle et les lieux sacrés.' }
];

export const MOCK_ACTUALITES: Actualite[] = [
  {
    id: 'act-1',
    titre: 'Inauguration du nouveau complexe agro-écologique de NDOH-DJUTTITSA',
    chapeau: 'Un grand pas vers le développement durable avec la modernisation du traitement des récoltes locales.',
    contenu: `La communauté de NDOH-DJUTTITSA s'est réunie ce week-end autour des autorités traditionnelles et des représentants de la région pour inauguré le nouveau complexe agro-écologique. Ce centre moderne facilitera le séchage et l'emballage du thé et des produits vivriers cultivés sur nos riches terres volcaniques.\n\nCe projet, financé en partie par la diaspora et le comité de développement, vise à renforcer l'autonomie économique des femmes et des jeunes agriculteurs du village.`,
    image_url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1200&q=80',
    categorie: 'Économie & Développement',
    date_publication: '2026-09-01T10:00:00Z',
    publie: true,
    auteur: 'Comité de Rédaction'
  },
  {
    id: 'act-2',
    titre: 'Préparation du Grand Festival Culturel et Traditionnel Bamiléké',
    chapeau: 'Danse Lali, démonstrations d artisanat et rassemblement de la diaspora prévus au mois de décembre.',
    contenu: `Le Conseil de la Chefferie et les associations culturelles préparent activement l'édition 2026 du grand rassemblement biennal. Au programme : défilé des dignitaires en tenues traditionnelles Toghu, compétitions de danses patrimoniales Lali et Njang, et foire gastronomique célébrant le Koki et la sauce jaune au taro.`,
    image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    categorie: 'Culture & Tradition',
    date_publication: '2026-08-25T14:30:00Z',
    publie: true,
    auteur: 'Conseil Culturel'
  },
  {
    id: 'act-3',
    titre: 'Campagne de Santé Publique : Consultations gratuites à l Hôpital de District',
    chapeau: 'Des équipes médicales de spécialistes seront présentes du 15 au 18 octobre pour des soins généraux et pédiatriques.',
    contenu: `L'association Santé Pour Tous en partenariat avec le Centre de Santé Intégré de Djuttitsa organise quatre jours de consultations gratuites. Des dépistages systématiques, la distribution de moustiquaires et des soins ophtalmologiques seront dispensés à toute la population.`,
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    categorie: 'Santé & Social',
    date_publication: '2026-08-18T09:00:00Z',
    publie: true,
    auteur: 'Commission Santé'
  }
];

export const MOCK_EVENEMENTS: Evenement[] = [
  {
    id: 'evt-1',
    titre: 'Festival Culturel & Danse patrimoniale Lali',
    description: 'Rassemblement des fils et filles de NDOH-DJUTTITSA avec cérémonies traditionnelles, expositions royales et concerts nocturnes.',
    lieu: 'Place de la Chefferie Traditionnelle, Djuttitsa',
    date_debut: '2026-12-20T08:00:00Z',
    date_fin: '2026-12-23T20:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80',
    statut: 'a_venir'
  },
  {
    id: 'evt-2',
    titre: 'Randonnée Guidée des Plantations de Thé et des Monts Djuttitsa',
    description: 'Une marche matinale dans la brume à travers les collines verdoyantes suivie d une dégustation de thé fraîchement cueilli.',
    lieu: 'Domaine du Thé de Djuttitsa',
    date_debut: '2026-10-10T06:30:00Z',
    date_fin: '2026-10-10T14:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    statut: 'a_venir'
  },
  {
    id: 'evt-3',
    titre: 'Assemblée Générale du Comité de Développement',
    description: 'Présentation du bilan annuel des projets d adduction d eau et d éclairage public solaire.',
    lieu: 'Foyer Communautaire de Djuttitsa Centre',
    date_debut: '2026-11-05T09:00:00Z',
    date_fin: '2026-11-05T16:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    statut: 'a_venir'
  }
];

export const MOCK_MEDIAS: Media[] = [
  {
    id: 'm1',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    legende: 'Les célèbres plantations de thé de Djuttitsa au lever du soleil sous la brume des hauts plateaux.',
    categorie: 'Paysages & Nature',
    date_ajout: '2026-08-01'
  },
  {
    id: 'm2',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    legende: 'Dignitaires traditionnels en tenues d apparat lors des célébrations patrimoniales.',
    categorie: 'Culture & Tradition',
    date_ajout: '2026-07-20'
  },
  {
    id: 'm3',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
    legende: 'Artisanat d ébénisterie et masques de la chefferie.',
    categorie: 'Artisanat',
    date_ajout: '2026-06-15'
  },
  {
    id: 'm4',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    legende: 'Documentaire : Voyage au cœur du village de NDOH-DJUTTITSA',
    categorie: 'Documentaire',
    date_ajout: '2026-05-10'
  }
];

export const MOCK_ECOLES: Ecole[] = [
  { id: 'e1', nom: 'Lycée Technique de Djuttitsa', type: 'Secondaire Publique', contact: '+237 677 00 11 22', quartier_id: 'q1' },
  { id: 'e2', nom: 'École Publique Groupe I & II de Djuttitsa', type: 'Primaire Publique', contact: '+237 699 33 44 55', quartier_id: 'q1' },
  { id: 'e3', nom: 'Collège Catholique Saint-Michel', type: 'Secondaire Privé', contact: '+237 675 88 99 00', quartier_id: 'q4' }
];

export const MOCK_CENTRES_SANTE: CentreSante[] = [
  { id: 'cs1', nom: 'Centre de Santé Intégré (CSI) de Djuttitsa', type: 'Centre de Santé Public', contact: '+237 690 12 34 56', urgences_24_7: true, quartier_id: 'q1' },
  { id: 'cs2', nom: 'Dispensaire Communautaire de Bafou-Nord', type: 'Centre Communautaire', contact: '+237 671 23 45 67', urgences_24_7: false, quartier_id: 'q2' }
];

export const MOCK_ENTREPRISES: Entreprise[] = [
  { id: 'ent1', nom: 'Complexe Agro-Industriel Thé Djuttitsa', categorie: 'Agriculture & Agroalimentaire', description: 'Production, transformation et exportation du thé de montagne premium.', contact: '+237 233 44 55 66', adresse: 'Secteur des Plantations, Bafou-Nord', quartier_id: 'q2' },
  { id: 'ent2', nom: 'Auberge & Eco-Lodge des Collines', categorie: 'Hôtellerie & Tourisme', description: 'Hébergement écologique avec vue sur les plantations et restauration locale.', contact: '+237 699 88 77 66', adresse: 'Route des Hauts-Plateaux', quartier_id: 'q2' },
  { id: 'ent3', nom: 'Marché Central & Coopérative Agricole', categorie: 'Commerce & Marché', description: 'Vente directe de produits maraîchers, pomme de terre, haricot et fruits.', contact: '+237 677 11 22 33', adresse: 'Place du Marché, Djuttitsa Centre', quartier_id: 'q1' }
];

export const MOCK_ASSOCIATIONS: Association[] = [
  { id: 'ass1', nom: 'CODEV - Comité de Développement de NDOH-DJUTTITSA', objet: 'Coordination des grands travaux d infrastructure, d électricité et d eau potable.', contact: '+237 677 55 44 33', president: 'M. Jean-Paul Tagne' },
  { id: 'ass2', nom: 'Association des Femmes Dynamiques de Djuttitsa (AFDD)', objet: 'Promotion de la micro-finance sociale et du maraîchage féminin.', contact: '+237 699 22 33 44', president: 'Mme Marie Kenfack' },
  { id: 'ass3', nom: 'Réseau Jeunesse & Innovation NDOH', objet: 'Encadrement des jeunes aux métiers du numérique et à l entrepreneuriat rural.', contact: '+237 670 99 88 77', president: 'Ing. Eric Dongmo' }
];

export const MOCK_DOCUMENTS: DocumentOfficiel[] = [
  { id: 'doc1', titre: 'Plan Stratégique de Développement Communal (2025-2030)', fichier_url: '#', categorie: 'Rapport Officiel', taille_mo: 4.2, date_ajout: '2026-01-15' },
  { id: 'doc2', titre: 'Guide Touristique Officiel de NDOH-DJUTTITSA', fichier_url: '#', categorie: 'Tourisme', taille_mo: 8.5, date_ajout: '2026-03-20' },
  { id: 'doc3', titre: 'Annuaire des Services & Commerces Locaux', fichier_url: '#', categorie: 'Annuaire', taille_mo: 2.1, date_ajout: '2026-06-10' }
];
