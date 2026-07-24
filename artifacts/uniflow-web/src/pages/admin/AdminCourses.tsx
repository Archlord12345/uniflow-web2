import { useState } from 'react';
import { BookOpen, Plus, Search, Edit, Trash2, Users, CheckCircle } from 'lucide-react';
import { mockCours } from '@/lib/mock-data';

export default function AdminCourses() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = mockCours.filter(
    (c) =>
      c.intitule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Cours Académiques</h1>
          <p className="text-gray-500 text-sm">Administration des Unités d'Enseignement (UE) et affectations</p>
        </div>
        <button className="bg-[#1E3A8A] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-900 transition-colors shadow-sm flex items-center gap-2">
          <Plus size={18} />
          Créer un cours
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par code ou intitulé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
          />
        </div>
        <div className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
          Total : {filteredCourses.length} Unités d'Enseignement
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 font-semibold uppercase">
              <tr>
                <th className="px-6 py-4">Code & Intitule</th>
                <th className="px-6 py-4">Filière / Niveau</th>
                <th className="px-6 py-4">Crédits</th>
                <th className="px-6 py-4">Enseignant</th>
                <th className="px-6 py-4">Inscrits</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredCourses.map((cours) => (
                <tr key={cours.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-[#1E3A8A] rounded-lg">
                        <BookOpen size={16} />
                      </div>
                      <div>
                        <span className="font-bold block text-gray-900">{cours.code}</span>
                        <span className="text-xs text-gray-500">{cours.intitule}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-md text-xs font-semibold">
                      {cours.filiere} — {cours.niveau}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{cours.credits} ECTS</td>
                  <td className="px-6 py-4 text-sm font-medium">{cours.enseignant}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                      <Users size={14} className="text-gray-400" />
                      {cours.inscrits} étudiants
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle size={12} />
                      {cours.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-[#1E3A8A] hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
