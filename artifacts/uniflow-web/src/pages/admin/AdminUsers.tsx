import { useState } from 'react';
import { Search, Filter, MoreVertical, Edit2, Trash2, Mail, UserX, UserCheck } from 'lucide-react';
import { mockAdminUsers } from '@/lib/mock-data';

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('Tous');

  const filteredUsers = mockAdminUsers.filter(user => {
    const matchesSearch = user.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.matricule.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'Tous' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Gestion des Utilisateurs</h1>
          <p className="text-gray-500 text-sm mt-1">{mockAdminUsers.length} utilisateurs inscrits sur la plateforme.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Exporter
          </button>
          <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors shadow-sm">
            Ajouter un utilisateur
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou matricule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#1E3A8A]/20 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={18} className="text-gray-400 shrink-0" />
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-gray-50 border-none text-sm rounded-lg py-2 pl-3 pr-8 focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none w-full md:w-auto appearance-none"
          >
            <option value="Tous">Tous les rôles</option>
            <option value="Étudiant">Étudiants</option>
            <option value="Enseignant">Enseignants</option>
            <option value="Administrateur">Administrateurs</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Utilisateur</th>
                <th className="px-6 py-4">Matricule</th>
                <th className="px-6 py-4">Rôle</th>
                <th className="px-6 py-4">Filière/Département</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        {user.nom.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.nom}</div>
                        <div className="text-gray-500 text-xs">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-600">
                    {user.matricule}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      user.role === 'Administrateur' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'Enseignant' ? 'bg-blue-100 text-blue-700' :
                      'bg-teal-100 text-teal-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {user.filiere}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        user.statut === 'Actif' ? 'bg-green-500' : 
                        user.statut === 'Suspendu' ? 'bg-red-500' : 'bg-amber-500'
                      }`} />
                      <span className="text-gray-700 font-medium">{user.statut}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 rounded-lg transition-colors" title="Contacter">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Modifier">
                        <Edit2 size={16} />
                      </button>
                      {user.statut === 'Actif' ? (
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Suspendre">
                          <UserX size={16} />
                        </button>
                      ) : (
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Réactiver">
                          <UserCheck size={16} />
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              Aucun utilisateur ne correspond à votre recherche.
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
          <span>Affichage de {filteredUsers.length} utilisateurs</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-50">Précédent</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-100 bg-white">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-100">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
}