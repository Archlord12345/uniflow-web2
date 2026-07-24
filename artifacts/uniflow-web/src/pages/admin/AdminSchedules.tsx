import { useState } from 'react';
import { Calendar, Plus, RefreshCw, AlertCircle, CheckCircle2, Clock, MapPin, Users, BookOpen } from 'lucide-react';
import { mockSchedule } from '@/lib/mock-data';

export default function AdminSchedules() {
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 1000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full mb-2 inline-block">
            Générateur Dynamique d'Emplois du Temps
          </span>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Salles & Emplois du Temps</h1>
          <p className="text-gray-500 text-sm">Détection automatique des conflits de salles et d'enseignants</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="bg-[#0D9488] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-teal-700 transition flex items-center gap-2 shadow"
          >
            <RefreshCw size={16} className={generating ? 'animate-spin' : ''} />
            {generating ? 'Génération en cours...' : 'Auto-ajuster le planning'}
          </button>
        </div>
      </div>

      {/* Conflicts alert card */}
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs">
        <CheckCircle2 size={20} className="shrink-0 text-emerald-600" />
        <div>
          <p className="font-bold">Aucun conflit détecté pour le Semestre 2</p>
          <p className="text-emerald-700">Toutes les Unités d'Enseignement sont affectées à des amphis/salles de capacité suffisante.</p>
        </div>
      </div>

      {/* Schedule grid preview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Planning Global des Amphithéâtres — Semaine En Cours</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { salle: 'Amphi 500', cours: 'INF301 — Algorithmique (CM)', enseignant: 'Dr. Nkam', horaire: '08:00 - 11:00', effectif: '480 / 500 places' },
            { salle: 'Amphi 350', cours: 'INF303 — BDD Relationnelles (CM)', enseignant: 'Mme. Tchuente', horaire: '11:15 - 14:15', effectif: '310 / 350 places' },
            { salle: 'Salle S202', cours: 'INF301 — Algorithmique (TD Grp A)', enseignant: 'M. Kamga', horaire: '14:30 - 16:30', effectif: '55 / 60 places' },
            { salle: 'Labo Info 1', cours: 'INF303 — BDD SQL (TP Grp B)', enseignant: 'Mme. Tchuente', horaire: '14:30 - 17:30', effectif: '40 / 40 places' },
          ].map((item) => (
            <div key={item.salle} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded">{item.salle}</span>
                <span className="text-[10px] text-gray-500 font-semibold flex items-center gap-1">
                  <Clock size={12} /> {item.horaire}
                </span>
              </div>
              <p className="font-bold text-sm text-gray-900">{item.cours}</p>
              <p className="text-xs text-gray-500">Enseignant : {item.enseignant}</p>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-[10px] text-gray-600">
                <span className="flex items-center gap-1"><Users size={12} /> {item.effectif}</span>
                <span className="text-emerald-600 font-bold">Disponible après 17h30</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
