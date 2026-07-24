import { useState } from 'react';
import { Save, Download, Search, CheckCircle, FileSpreadsheet, Upload, Calculator } from 'lucide-react';
import { useRole } from '@/lib/role-context';

export default function TeacherGrades() {
  const { user } = useRole();
  const [selectedUE, setSelectedUE] = useState('INF301');
  const [searchTerm, setSearchTerm] = useState('');

  const [studentsGrades, setStudentsGrades] = useState([
    { id: '1', matricule: '23I0042', nom: 'Martin Emma', cc: 15.5, exam: 14.0 },
    { id: '2', matricule: '23I0012', nom: 'Tchouya Paul', cc: 17.0, exam: 16.5 },
    { id: '3', matricule: '23I0088', nom: 'Edoa Jean', cc: 11.0, exam: 12.0 },
    { id: '4', matricule: '23I0019', nom: 'Nkolo Marie', cc: 16.0, exam: 15.0 },
    { id: '5', matricule: '23I0105', nom: 'Kamga Celine', cc: 9.5, exam: 10.5 },
    { id: '6', matricule: '23I0073', nom: 'Belinga Yves', cc: 13.0, exam: 11.5 },
  ]);

  const handleGradeChange = (id: string, field: 'cc' | 'exam', value: string) => {
    const num = parseFloat(value) || 0;
    setStudentsGrades((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: num } : s))
    );
  };

  const filtered = studentsGrades.filter(
    (s) =>
      s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.matricule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full mb-2 inline-block">
            Système d'évaluation LMD
          </span>
          <h1 className="text-2xl font-bold text-gray-900">Grille de Saisie des Notes & CC</h1>
          <p className="text-gray-500 text-sm">Calcul automatique des moyennes (Contrôle Continu 30% • Examen 70%)</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5">
            <Upload size={14} /> Importer Excel
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow">
            <Save size={14} /> Enregistrer & Publier
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-gray-500 uppercase">Unité d'Enseignement :</label>
          <select
            value={selectedUE}
            onChange={(e) => setSelectedUE(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
          >
            <option value="INF301">INF301 — Algorithmique (CM/TD)</option>
            <option value="INF303">INF303 — BDD Relationnelles</option>
          </select>
        </div>

        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Chercher étudiant ou matricule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Matricule</th>
              <th className="px-6 py-4">Nom & Prénom</th>
              <th className="px-6 py-4 text-center">Note CC (/20) — 30%</th>
              <th className="px-6 py-4 text-center">Note Examen (/20) — 70%</th>
              <th className="px-6 py-4 text-center">Moyenne Finale</th>
              <th className="px-6 py-4 text-center">Décision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((s) => {
              const moyenne = (s.cc * 0.3 + s.exam * 0.7).toFixed(2);
              const isPassed = parseFloat(moyenne) >= 10;
              return (
                <tr key={s.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-[#1E3A8A]">{s.matricule}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{s.nom}</td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="20"
                      value={s.cc}
                      onChange={(e) => handleGradeChange(s.id, 'cc', e.target.value)}
                      className="w-20 text-center font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="20"
                      value={s.exam}
                      onChange={(e) => handleGradeChange(s.id, 'exam', e.target.value)}
                      className="w-20 text-center font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    />
                  </td>
                  <td className="px-6 py-4 text-center font-extrabold text-base text-gray-900">
                    {moyenne} / 20
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                        isPassed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {isPassed ? 'Validé' : 'Ajourné'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
