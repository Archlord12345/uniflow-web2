// ── Utilisateur connecté ──────────────────────────────────────────────────────
export const mockUser = {
  nom: 'Emma',
  prenom: 'Martin',
  nomComplet: 'Emma Martin',
  initiales: 'EM',
  role: 'Étudiante',
  filiere: 'Informatique',
  niveau: 'Licence 2',
  matricule: '2023042',
  email: 'emma.martin@uniflow.cm',
  telephone: '+237 6XX XX XX XX',
  dateNaissance: '15 mars 2003',
  adresse: 'Yaoundé, Cameroun',
  etablissement: 'Université de Yaoundé 1',
  inscription: '12 septembre 2023',
  langues: 'Français, Anglais',
  statut: 'Actif',
  online: true,
  avatar: null,
};

// ── Dashboard stats ───────────────────────────────────────────────────────────
export const mockDashboardStats = {
  coursInscrits: { value: 12, delta: '+8%', label: 'Cours inscrits' },
  devoirsARendre: { value: 5, delta: '+1', label: 'Devoirs à rendre' },
  prochainCours: { value: '2h30', delta: '+15m', label: 'Prochain cours dans' },
  moyenne: { value: '14.6/20', delta: '+0.8', label: 'Moyenne générale' },
  presences: { value: '87%', delta: '+5%', label: 'Taux de présence' },
};

export const mockDashboardActivity = [
  { id: '1', cours: 'Mathématiques', activite: 'Devoir 1 rendu', time: '10:15', enseignant: 'P. Martin', statut: 'Rendu', couleur: '#1E3A8A' },
  { id: '2', cours: 'Économie', activite: 'Quiz noté', time: '09:40', enseignant: 'Dr. Dubois', statut: 'Terminé', couleur: '#0D9488' },
  { id: '3', cours: 'Histoire', activite: 'Cours à venir', time: '14:00', enseignant: 'Dr. Bernard', statut: 'À venir', couleur: '#F59E0B' },
  { id: '4', cours: 'Physique', activite: 'Document ajouté', time: '16:00', enseignant: 'Dr. Lefèvre', statut: 'Nouveau', couleur: '#8B5CF6' },
  { id: '5', cours: 'Anglais', activite: 'Note publiée', time: '17:00', enseignant: 'Mme Johnson', statut: 'Nouveau', couleur: '#10B981' },
];

export const mockCalendar = {
  mois: 'Mai 2024',
  annee: 2024,
  moisIndex: 4,
  joursAvecEvenements: [7, 13, 15, 19, 22, 26, 28],
  today: 19,
};

export const mockRepartitionNotes = [
  { name: 'Excellent', value: 19 },
  { name: 'Bien', value: 52 },
  { name: 'Assez bien', value: 21 },
  { name: 'Faible', value: 8 },
];

export const mockProchainEvenement = {
  titre: 'Examen Maths',
  heure: '09h00',
  salle: 'A204',
  date: 'Samedi 18 mai 2024',
  dansJours: 5,
};

// ── Cours ─────────────────────────────────────────────────────────────────────
export const mockCours = [
  { id: '1', code: 'INF301', intitule: 'Algorithmique — Mathématiques', filiere: 'INFO', niveau: 'L3', credits: 6, enseignant: 'Dr. Nkam', inscrits: 145, tauxPresence: 85, progression: 75, statut: 'En cours', couleur: '#1E3A8A', imageBg: 'from-blue-900 to-blue-700' },
  { id: '2', code: 'ECO201', intitule: 'Économie', filiere: 'ECO', niveau: 'L2', credits: 4, enseignant: 'Dr. Dubois', inscrits: 210, tauxPresence: 60, progression: 60, statut: 'En cours', couleur: '#0D9488', imageBg: 'from-teal-800 to-teal-600' },
  { id: '3', code: 'INF302', intitule: 'Réseaux Informatiques', filiere: 'INFO', niveau: 'L3', credits: 5, enseignant: 'Dr. Nkam', inscrits: 145, tauxPresence: 45, progression: 45, statut: 'En cours', couleur: '#3B82F6', imageBg: 'from-blue-600 to-indigo-700' },
  { id: '4', code: 'AI401', intitule: 'Intelligence Artificielle', filiere: 'INFO', niveau: 'M1', credits: 6, enseignant: 'Dr. Lefèvre', inscrits: 80, tauxPresence: 87, progression: 87, statut: 'En cours', couleur: '#8B5CF6', imageBg: 'from-violet-800 to-purple-700' },
  { id: '5', code: 'ECO301', intitule: 'Économie Avancée', filiere: 'ECO', niveau: 'L3', credits: 4, enseignant: 'Pr. Fotso', inscrits: 120, tauxPresence: 55, progression: 55, statut: 'À venir', couleur: '#F59E0B', imageBg: 'from-amber-700 to-orange-600' },
  { id: '6', code: 'PHY101', intitule: 'Philosophie', filiere: 'PHYS', niveau: 'L1', credits: 3, enseignant: 'Pr. Bernard', inscrits: 200, tauxPresence: 30, progression: 30, statut: 'À venir', couleur: '#10B981', imageBg: 'from-emerald-700 to-green-600' },
];

export const mockProchainDevoirs = [
  { id: 'd1', ue: 'Algorithmique', dateLimite: 'Dans 4 jours', niveau: 'Devoir 1', urgent: true },
  { id: 'd2', ue: 'Économie', dateLimite: 'Le 22 mai', niveau: 'Devoir 2', urgent: false },
  { id: 'd3', ue: 'Réseaux', dateLimite: 'Le 24 mai', niveau: 'TP noté', urgent: false },
];

// ── Étudiants ─────────────────────────────────────────────────────────────────
export const mockStudents = [
  { id: '1', matricule: '21A001', nom: 'Nkolo Marie', filiere: 'INFO', niveau: 'L3', email: 'm.nkolo@uniflow.cm', statut: 'Inscrit' },
  { id: '2', matricule: '22B014', nom: 'Tchouya Paul', filiere: 'MATH', niveau: 'L2', email: 'p.tchouya@uniflow.cm', statut: 'Inscrit' },
  { id: '3', matricule: '20C105', nom: 'Kamga Celine', filiere: 'PHYS', niveau: 'M1', email: 'c.kamga@uniflow.cm', statut: 'Inscrit' },
  { id: '4', matricule: '23D042', nom: 'Edoa Jean', filiere: 'SVT', niveau: 'L1', email: 'j.edoa@uniflow.cm', statut: 'Inscrit' },
  { id: '5', matricule: '21A019', nom: 'Belinga Arthur', filiere: 'INFO', niveau: 'L3', email: 'a.belinga@uniflow.cm', statut: 'Suspendu' },
  { id: '6', matricule: '19E088', nom: 'Ngo Jeanne', filiere: 'CHIMIE', niveau: 'M2', email: 'j.ngo@uniflow.cm', statut: 'Inscrit' },
  { id: '7', matricule: '22B022', nom: 'Atangana Marc', filiere: 'MATH', niveau: 'L2', email: 'm.atangana@uniflow.cm', statut: 'Inscrit' },
  { id: '8', matricule: '23D101', nom: 'Etoundi Sophie', filiere: 'SVT', niveau: 'L1', email: 's.etoundi@uniflow.cm', statut: 'Inscrit' },
  { id: '9', matricule: '21A111', nom: 'Fouda Yves', filiere: 'INFO', niveau: 'L3', email: 'y.fouda@uniflow.cm', statut: 'Inscrit' },
  { id: '10', matricule: '20C003', nom: 'Mbia Alice', filiere: 'PHYS', niveau: 'M1', email: 'a.mbia@uniflow.cm', statut: 'En attente' },
];

// ── Emploi du temps ───────────────────────────────────────────────────────────
export const mockScheduleEvents = [
  { id: '1', day: 1, startHour: 8, endHour: 10, type: 'CM', ue: 'Algorithmique', code: 'INF301', salle: 'Amphi A', enseignant: 'Dr. Nkam', couleur: '#DBEAFE', border: '#1E3A8A', texte: '#1E3A8A' },
  { id: '2', day: 1, startHour: 10, endHour: 12, type: 'TD', ue: 'Algorithmique', code: 'INF301', salle: 'Salle TD 101', enseignant: 'M. B', couleur: '#DBEAFE', border: '#1E3A8A', texte: '#1E3A8A' },
  { id: '3', day: 2, startHour: 8, endHour: 11, type: 'TP', ue: 'Réseaux', code: 'INF302', salle: 'Labo Info 1', enseignant: 'Dr. N', couleur: '#D1FAE5', border: '#059669', texte: '#065F46' },
  { id: '4', day: 2, startHour: 14, endHour: 16, type: 'Séminaire', ue: 'IA', code: 'AI401', salle: 'Amphi C', enseignant: 'Dr. L', couleur: '#EDE9FE', border: '#7C3AED', texte: '#5B21B6' },
  { id: '5', day: 3, startHour: 9, endHour: 12, type: 'TD', ue: 'Économie', code: 'ECO201', salle: 'Salle TD 102', enseignant: 'Dr. D', couleur: '#CCFBF1', border: '#0D9488', texte: '#0F766E' },
  { id: '6', day: 3, startHour: 13, endHour: 16, type: 'CM', ue: 'Économie', code: 'ECO201', salle: 'Salle Réseaux C', enseignant: 'Dr. D', couleur: '#CCFBF1', border: '#0D9488', texte: '#0F766E' },
  { id: '7', day: 4, startHour: 8, endHour: 10, type: 'CM', ue: 'Algorithmique', code: 'INF301', salle: 'Amphi A', enseignant: 'Dr. M', couleur: '#DBEAFE', border: '#1E3A8A', texte: '#1E3A8A' },
  { id: '8', day: 4, startHour: 10, endHour: 12, type: 'TP', ue: 'Algorithmique', code: 'INF301', salle: 'Labo SVT', enseignant: 'Dr. M', couleur: '#DBEAFE', border: '#1E3A8A', texte: '#1E3A8A' },
  { id: '9', day: 4, startHour: 16, endHour: 18, type: 'CM', ue: 'Économie', code: 'ECO201', salle: 'Salle 301', enseignant: 'Pr. F', couleur: '#CCFBF1', border: '#0D9488', texte: '#0F766E' },
  { id: '10', day: 5, startHour: 14, endHour: 16, type: 'CM', ue: 'Informatique', code: 'INF101', salle: 'Amphi B', enseignant: 'M. B', couleur: '#FEF3C7', border: '#D97706', texte: '#92400E' },
];

// ── Présences ─────────────────────────────────────────────────────────────────
export const mockPresences = [
  { id: '1', etudiant: 'Emma Martin', num: '14052401', presences: 18, absences: 2, retards: 1, taux: 90, justifiees: 1, statut: 'Régulier' },
  { id: '2', etudiant: 'Lucas Bernard', num: '14052402', presences: 16, absences: 3, retards: 1, taux: 80, justifiees: 1, statut: 'Régulier' },
  { id: '3', etudiant: 'Chloé Dubois', num: '14052403', presences: 14, absences: 5, retards: 2, taux: 70, justifiees: 2, statut: 'Attention' },
  { id: '4', etudiant: 'Hugo Leroy', num: '14052404', presences: 10, absences: 8, retards: 3, taux: 50, justifiees: 1, statut: 'Critique' },
];

export const mockPresenceStats = {
  tauxGlobal: 87,
  totalSessions: 156,
  presentsAujourdhui: 12,
  absencesAJustifier: 12,
};

export const mockPresenceChart = [
  { semaine: 'S14', presences: 85, groupe: 78 },
  { semaine: 'S15', presences: 88, groupe: 82 },
  { semaine: 'S16', presences: 82, groupe: 79 },
  { semaine: 'S17', presences: 90, groupe: 85 },
];

// ── Notifications ─────────────────────────────────────────────────────────────
export const mockNotifications = [
  { id: '1', type: 'annonce', titre: 'Annonce importante', apercu: "Changement de salle pour le cours d'Algo de demain (14/05) : Amphi B → Salle B102", expediteur: 'Admin UniFlow', time: 'Il y a 1 min', nonLu: true, body: "Bonjour à tous,\n\nNous vous informons que le cours d'Algorithmique prévu demain aura lieu en Salle B102." },
  { id: '2', type: 'devoir', titre: 'Nouveau devoir', apercu: 'Bases de données – À rendre avant le 20 mai 23:58', expediteur: 'Dr. Benkamm', time: 'Il y a 3h', nonLu: true, body: "Un nouveau devoir a été ajouté pour le cours de Bases de données." },
  { id: '3', type: 'visio', titre: 'Visioconférence dans 30 min', apercu: 'Algorithmique – Session en ligne à 14:00', expediteur: 'Pr. Martin', time: 'Hier', nonLu: false, body: "La session de visioconférence pour le cours d'Algorithmique aura lieu aujourd'hui à 14:00." },
  { id: '4', type: 'systeme', titre: 'Absence justifiée', apercu: 'Votre absence du 19/05 a été justifiée', expediteur: 'Admin', time: 'Hier', nonLu: false, body: "Votre demande de justification d'absence a été acceptée." },
];

// ── Notes / Résultats ─────────────────────────────────────────────────────────
export const mockNotes = [
  { code: 'INF301', intitule: 'Algorithmique Avancée', type: 'Obligatoire', credits: 6, cc: 14, tp: 16, examen: 15, moyenne: 15.2, valide: true },
  { code: 'MAT201', intitule: 'Algèbre Linéaire', type: 'Obligatoire', credits: 4, cc: 12, tp: null, examen: 11, moyenne: 11.5, valide: true },
  { code: 'PHY405', intitule: 'Physique Quantique', type: 'Obligatoire', credits: 6, cc: 9, tp: 8, examen: 10, moyenne: 9.2, valide: false },
  { code: 'INF302', intitule: 'Bases de Données', type: 'Obligatoire', credits: 5, cc: 16, tp: 18, examen: 17, moyenne: 17.0, valide: true },
];

// ── Devoirs ───────────────────────────────────────────────────────────────────
export const mockDevoirs = [
  { id: '1', ue: 'INF301', couleur: '#1E3A8A', titre: 'Exercices Graphes — Chapitre 7', enseignant: 'Dr. Nkam', dateLimite: '20 mai 2024 — 23:58', statut: 'À faire', urgent: true, progression: 0 },
  { id: '2', ue: 'MAT201', couleur: '#0D9488', titre: 'DM2 — Algèbre', enseignant: 'Pr. Fotso', dateLimite: '22 mai 2024', statut: 'À faire', urgent: false, progression: 30 },
  { id: '3', ue: 'INF302', couleur: '#7C3AED', titre: 'TP Base de Données', enseignant: 'Dr. Nkam', dateLimite: '25 mai 2024', statut: 'À faire', urgent: false, progression: 50 },
  { id: '4', ue: 'INF301', couleur: '#1E3A8A', titre: 'TP Algorithmes de tri', enseignant: 'Dr. Nkam', dateLimite: '10 mai 2024', statut: 'En retard', urgent: true, progression: 80 },
  { id: '5', ue: 'MAT201', couleur: '#0D9488', titre: 'DM1 — Matrices', enseignant: 'Pr. Fotso', dateLimite: '5 mai 2024', statut: 'Soumis', urgent: false, progression: 100 },
  { id: '6', ue: 'PHY101', couleur: '#10B981', titre: 'Dissertation', enseignant: 'Pr. Bernard', dateLimite: '2 mai 2024', statut: 'Noté', urgent: false, progression: 100, note: '15/20' },
];

// ── Messages ──────────────────────────────────────────────────────────────────
export const mockMessages = [
  {
    id: '1', contact: 'Dr. Nkam', initiales: 'DN', couleur: '#1E3A8A', email: 'nkam@uniflow.cm', bureau: 'Bâtiment B, Bureau 204',
    role: 'Enseignant - Algorithmique · L3 INFO', dernierMsg: 'Bonne note ! Continuez ainsi.', time: '10:15', nonLu: 1,
    messages: [
      { id: 'm1', de: 'Dr. Nkam', texte: "Bonjour Emma, j'ai reçu votre rendu du TP.", time: '10:10' },
      { id: 'm2', de: 'Emma', texte: 'Merci beaucoup Docteur !', time: '10:12' },
      { id: 'm3', de: 'Dr. Nkam', texte: 'Bonne note ! Continuez ainsi.', time: '10:15' },
    ],
  },
  {
    id: '2', contact: 'Pr. Fotso', initiales: 'PF', couleur: '#0D9488', email: 'fotso@uniflow.cm', bureau: 'Bâtiment A, Bureau 102',
    role: 'Enseignant - Mathématiques · L2', dernierMsg: "N'oubliez pas le DM2.", time: 'Hier', nonLu: 0,
    messages: [
      { id: 'm4', de: 'Pr. Fotso', texte: 'Rappel : le DM2 est à rendre avant le 22 mai.', time: 'Hier 08:30' },
      { id: 'm5', de: 'Pr. Fotso', texte: "N'oubliez pas le DM2.", time: 'Hier 14:00' },
    ],
  },
  {
    id: '3', contact: 'Délégué (Emma B.)', initiales: 'EB', couleur: '#8B5CF6', email: 'eb@uniflow.cm', bureau: 'Local Associatif',
    role: 'Déléguée L2 INFO', dernierMsg: 'Réunion annulée ce soir.', time: 'Lun', nonLu: 0,
    messages: [
      { id: 'm6', de: 'Emma B.', texte: 'La réunion de ce soir est annulée.', time: 'Lun 14:00' },
    ],
  },
  {
    id: '4', contact: 'Admin UniFlow', initiales: 'AU', couleur: '#F59E0B', email: 'admin@uniflow.cm', bureau: 'Scolarité',
    role: 'Administration', dernierMsg: 'Votre compte a été mis à jour.', time: 'Mar', nonLu: 0,
    messages: [
      { id: 'm7', de: 'Admin UniFlow', texte: 'Bonjour, votre compte a été mis à jour.', time: 'Mar 09:00' },
    ],
  },
];

// ── Salles ────────────────────────────────────────────────────────────────────
export const mockRooms = [
  { id: '1', nom: 'Amphi A', capacite: 800, type: 'Amphithéâtre', statut: 'Occupée', equipements: ['Projecteur', 'Climatisation', 'WiFi'] },
  { id: '2', nom: 'Amphi B', capacite: 500, type: 'Amphithéâtre', statut: 'Libre', equipements: ['Projecteur', 'WiFi'] },
  { id: '3', nom: 'Amphi C', capacite: 300, type: 'Amphithéâtre', statut: 'Libre', equipements: ['Projecteur', 'Climatisation'] },
  { id: '4', nom: 'Salle TD 101', capacite: 40, type: 'Salle de TD', statut: 'Occupée', equipements: ['Tableau blanc'] },
];

// ── Visioconférence ───────────────────────────────────────────────────────────
export const mockVideoParticipants = [
  { id: '1', nom: 'Emma Martin', initiales: 'EM', isSelf: true },
  { id: '2', nom: 'Sarah K.', initiales: 'SK', isSelf: false },
  { id: '3', nom: 'Yasmine L.', initiales: 'YL', isSelf: false },
  { id: '4', nom: 'Lino M.', initiales: 'LM', isSelf: false },
];

export const mockVideoChat = [
  { id: '1', auteur: 'Emma Martin', initiales: 'EM', texte: 'Pouvez-vous répéter la partie sur les graphes ?', time: '10:15', moi: true },
  { id: '2', auteur: 'Prof. Dubois', initiales: 'PD', texte: 'Bien sûr, je reviens dessus', time: '10:15', moi: false },
  { id: '3', auteur: 'Lucas Bernard', initiales: 'LB', texte: "J'ai la même question que Emma", time: '10:16', moi: false },
];

// ── Ressources (Bibliothèque) ─────────────────────────────────────────────────
export const mockResources = [
  { id: '1', titre: 'Support de cours - Algorithmique des graphes', type: 'PDF', ue: 'INF301', enseignant: 'Dr. Nkam', dateAjout: '12 Mai 2024', taille: '2.4 MB', couleur: '#EF4444' },
  { id: '2', titre: 'Tutoriel SQL Avancé', type: 'Vidéo', ue: 'INF302', enseignant: 'Pr. Fotso', dateAjout: '10 Mai 2024', taille: '450 MB', couleur: '#3B82F6' },
  { id: '3', titre: 'Documentation Python 3', type: 'Lien', ue: 'INF301', enseignant: 'Dr. Nkam', dateAjout: '08 Mai 2024', taille: '-', couleur: '#10B981' },
  { id: '4', titre: 'Exercices corrigés de Microéconomie', type: 'PDF', ue: 'ECO201', enseignant: 'Dr. Dubois', dateAjout: '05 Mai 2024', taille: '1.2 MB', couleur: '#EF4444' },
  { id: '5', titre: 'Introduction au Machine Learning', type: 'Présentation', ue: 'AI401', enseignant: 'Dr. Lefèvre', dateAjout: '02 Mai 2024', taille: '15 MB', couleur: '#F59E0B' },
  { id: '6', titre: 'Annales d\'examens 2020-2023', type: 'Archive', ue: 'Général', enseignant: 'Scolarité', dateAjout: '01 Mai 2024', taille: '25 MB', couleur: '#8B5CF6' },
];

// ── Tickets de support ────────────────────────────────────────────────────────
export const mockTickets = [
  { id: '#2847', sujet: 'Problème accès Moodle', statut: 'Open', date: 'Il y a 2h' },
  { id: '#2801', sujet: 'Correction note Algèbre', statut: 'Résolu', date: 'Le 12/05' },
  { id: '#2790', sujet: 'Demande de certificat de scolarité', statut: 'Résolu', date: 'Le 10/05' },
];

// ── Admin Dashboard Stats ─────────────────────────────────────────────────────
export const mockAdminStats = {
  etudiants: { value: 1247, delta: '+12', label: 'Étudiants actifs' },
  enseignants: { value: 86, delta: '+2', label: 'Enseignants' },
  cours: { value: 142, delta: '+5', label: 'Cours actifs' },
  sessions: { value: 28, delta: '+3', label: 'Sessions aujourd\'hui' },
  presences: { value: '89%', delta: '+2%', label: 'Taux présence global' },
};

export const mockAdminInscriptions = [
  { mois: 'Jan', value: 120 },
  { mois: 'Fév', value: 150 },
  { mois: 'Mar', value: 180 },
  { mois: 'Avr', value: 220 },
  { mois: 'Mai', value: 310 },
  { mois: 'Juin', value: 280 },
];

export const mockAdminFiliere = [
  { name: 'Informatique', value: 450, color: '#1E3A8A' },
  { name: 'Économie', value: 320, color: '#0D9488' },
  { name: 'Mathématiques', value: 210, color: '#F59E0B' },
  { name: 'Physique', value: 150, color: '#8B5CF6' },
  { name: 'SVT', value: 117, color: '#10B981' },
];

export const mockAdminActivity = [
  { id: '1', action: 'Nouveau cours créé', detail: 'IA Avancée par Dr. Lefèvre', time: 'Il y a 10 min', icon: 'BookOpen' },
  { id: '2', action: 'Inscription étudiant', detail: '3 nouveaux étudiants en INFO', time: 'Il y a 1h', icon: 'UserPlus' },
  { id: '3', action: 'Note modifiée', detail: 'Par Pr. Fotso (Mathématiques)', time: 'Il y a 2h', icon: 'Edit' },
  { id: '4', action: 'Alerte présence', detail: 'Taux anormalement bas en L1 ECO', time: 'Il y a 4h', icon: 'AlertTriangle' },
];

// ── Admin Users ───────────────────────────────────────────────────────────────
export const mockAdminUsers = [
  { id: '1', nom: 'Emma Martin', email: 'emma.martin@uniflow.cm', role: 'Étudiant', filiere: 'Informatique', statut: 'Actif', appareil: 'MacBook Pro - Safari', matricule: '2023042', tel: '+237 6XX XX XX XX', inscription: '12/09/2023' },
  { id: '2', nom: 'Dr. Nkam', email: 'nkam@uniflow.cm', role: 'Enseignant', filiere: 'Informatique', statut: 'Actif', appareil: 'Windows 10 - Chrome', matricule: 'ENS001', tel: '+237 6YY YY YY YY', inscription: '01/08/2020' },
  { id: '3', nom: 'Pr. Fotso', email: 'fotso@uniflow.cm', role: 'Enseignant', filiere: 'Mathématiques', statut: 'Actif', appareil: 'iPad - Safari', matricule: 'ENS012', tel: '+237 6ZZ ZZ ZZ ZZ', inscription: '15/09/2018' },
  { id: '4', nom: 'Admin Général', email: 'admin@uniflow.cm', role: 'Administrateur', filiere: '-', statut: 'Actif', appareil: 'Linux - Firefox', matricule: 'ADM001', tel: '+237 6AA AA AA AA', inscription: '01/01/2020' },
  { id: '5', nom: 'Lucas Bernard', email: 'lucas.b@uniflow.cm', role: 'Étudiant', filiere: 'Économie', statut: 'Inactif', appareil: 'iPhone - Safari', matricule: '2023089', tel: '+237 6BB BB BB BB', inscription: '14/09/2023' },
  { id: '6', nom: 'Chloé Dubois', email: 'chloe.d@uniflow.cm', role: 'Étudiant', filiere: 'Physique', statut: 'Actif', appareil: 'Windows 11 - Edge', matricule: '2023102', tel: '+237 6CC CC CC CC', inscription: '15/09/2023' },
  { id: '7', nom: 'Hugo Leroy', email: 'hugo.l@uniflow.cm', role: 'Étudiant', filiere: 'SVT', statut: 'Suspendu', appareil: 'Android - Chrome', matricule: '2023204', tel: '+237 6DD DD DD DD', inscription: '18/09/2023' },
  { id: '8', nom: 'Dr. Dubois', email: 'dubois@uniflow.cm', role: 'Enseignant', filiere: 'Économie', statut: 'Actif', appareil: 'MacBook Air - Safari', matricule: 'ENS045', tel: '+237 6EE EE EE EE', inscription: '10/08/2021' },
];

// ── Admin Courses ─────────────────────────────────────────────────────────────
export const mockAdminCoursesData = [
  { id: '1', code: 'INF301', intitule: 'Algorithmique — Mathématiques', semestre: 'S5', enseignant: 'Dr. Nkam', etudiants: 145, presence: 85, statut: 'Actif', couleur: '#1E3A8A' },
  { id: '2', code: 'ECO201', intitule: 'Économie', semestre: 'S3', enseignant: 'Dr. Dubois', etudiants: 210, presence: 60, statut: 'Actif', couleur: '#0D9488' },
  { id: '3', code: 'INF302', intitule: 'Réseaux Informatiques', semestre: 'S5', enseignant: 'Dr. Nkam', etudiants: 145, presence: 45, statut: 'Brouillon', couleur: '#3B82F6' },
  { id: '4', code: 'AI401', intitule: 'Intelligence Artificielle', semestre: 'S7', enseignant: 'Dr. Lefèvre', etudiants: 80, presence: 87, statut: 'Actif', couleur: '#8B5CF6' },
  { id: '5', code: 'ECO301', intitule: 'Économie Avancée', semestre: 'S5', enseignant: 'Pr. Fotso', etudiants: 120, presence: 55, statut: 'Archivé', couleur: '#F59E0B' },
  { id: '6', code: 'PHY101', intitule: 'Philosophie', semestre: 'S1', enseignant: 'Pr. Bernard', etudiants: 200, presence: 30, statut: 'Brouillon', couleur: '#10B981' },
];
