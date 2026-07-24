import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'etudiant' | 'delegue' | 'enseignant' | 'admin' | 'superadmin';

export interface UserProfile {
  id: string;
  nomComplet: string;
  initiales: string;
  role: string;
  roleKey: UserRole;
  filiere: string;
  niveau: string;
  matricule: string;
  email: string;
  etablissement: string;
  avatarColor: string;
}

export const ROLE_PROFILES: Record<UserRole, UserProfile> = {
  etudiant: {
    id: '1',
    nomComplet: 'Emma Martin',
    initiales: 'EM',
    role: 'Étudiante',
    roleKey: 'etudiant',
    filiere: 'Informatique',
    niveau: 'Licence 2',
    matricule: '23I0042',
    email: 'emma.martin@uniflow.cm',
    etablissement: 'Université de Yaoundé I',
    avatarColor: '#1E3A8A',
  },
  delegue: {
    id: '2',
    nomComplet: 'Tchouya Paul',
    initiales: 'TP',
    role: 'Délégué de classe',
    roleKey: 'delegue',
    filiere: 'Informatique',
    niveau: 'Licence 2',
    matricule: '23I0012',
    email: 'paul.tchouya@uniflow.cm',
    etablissement: 'Université de Yaoundé I',
    avatarColor: '#0D9488',
  },
  enseignant: {
    id: '3',
    nomComplet: 'Dr. Nkam Jean-Paul',
    initiales: 'DN',
    role: 'Enseignant-Chercheur',
    roleKey: 'enseignant',
    filiere: 'Informatique & Algorithmique',
    niveau: 'Faculté des Sciences',
    matricule: 'ENS9810',
    email: 'dr.nkam@uniflow.cm',
    etablissement: 'Université de Yaoundé I',
    avatarColor: '#7C3AED',
  },
  admin: {
    id: '4',
    nomComplet: 'Mme. Eboa Chantal',
    initiales: 'EC',
    role: 'Secrétariat Académique',
    roleKey: 'admin',
    filiere: 'Direction des Écoles',
    niveau: 'Administration',
    matricule: 'ADM4021',
    email: 'chantal.eboa@uniflow.cm',
    etablissement: 'Université de Yaoundé I',
    avatarColor: '#D97706',
  },
  superadmin: {
    id: '5',
    nomComplet: 'Prof. Onguene Roger',
    initiales: 'PO',
    role: 'Super Admin / Vice-Recteur',
    roleKey: 'superadmin',
    filiere: 'Gouvernance Centrale',
    niveau: 'Direction Générale',
    matricule: 'DIR0001',
    email: 'prof.onguene@uniflow.cm',
    etablissement: 'Université de Yaoundé I',
    avatarColor: '#DC2626',
  },
};

interface RoleContextType {
  role: UserRole;
  setRole: (r: UserRole) => void;
  user: UserProfile;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('uniflow_user_role') as UserRole;
    return saved && ROLE_PROFILES[saved] ? saved : 'etudiant';
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('uniflow_user_role', newRole);
  };

  useEffect(() => {
    localStorage.setItem('uniflow_user_role', role);
  }, [role]);

  const user = ROLE_PROFILES[role];

  return (
    <RoleContext.Provider value={{ role, setRole, user }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    return {
      role: 'etudiant' as UserRole,
      setRole: () => {},
      user: ROLE_PROFILES.etudiant,
    };
  }
  return context;
}
