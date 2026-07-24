import { useState } from 'react';
import { BookOpen, Users, CheckSquare, Video, Calendar, ArrowUpRight, Play, CheckCircle2, Clock, Upload, Bell } from 'lucide-react';
import { useRole } from '@/lib/role-context';
import { Link } from 'wouter';

export default function TeacherDashboard() {
  const { user } = useRole();
  const [selectedUE, setSelectedUE] = useState('INF301');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#1E3A8A] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-xs font-semibold rounded-full mb-2">
              Espace Enseignant-Chercheur
            </span>
            <h1 className="text-2xl font-bold">Bonjour, {user.nomComplet}</h1>
            <p className="text-indigo-200 text-sm mt-1">
              Département d'Informatique • Faculté des Sciences, UY1
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/video"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition shadow flex items-center gap-2"
            >
              <Play size={16} /> Lancer le cours en visioconférence
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl">
              <BookOpen size={20} />
            </div>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">2 UE</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">120 h</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Volume horaire attribué (CM/TD/TP)</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-blue-50 text-[#1E3A8A] rounded-xl">
              <Users size={20} />
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">482 Etud.</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">92%</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Assiduité moyenne des étudiants</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
              <CheckSquare size={20} />
            </div>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">1 en attente</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">4 / 5</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Feuilles de présence validées</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl">
              <Calendar size={20} />
            </div>
            <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">14h00</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">S202</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Prochain cours aujourd'hui (Amphi 500)</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mes Enseignements Attribués */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Mes Unités d'Enseignement (UE)</h2>
              <p className="text-xs text-gray-500">Semestre 2 — Année Académique 2025/2026</p>
            </div>
            <Link href="/teacher/courses" className="text-xs font-bold text-[#1E3A8A] hover:underline flex items-center gap-1">
              Gérer les cours <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { code: 'INF301', titre: 'Algorithmique & Structuration de Données', filiere: 'L2 Informatique', etudiants: 280, horraire: 'CM: 30h | TD: 15h | TP: 15h', delegue: 'Tchouya Paul' },
              { code: 'INF303', titre: 'Bases de Données Relationnelles & SQL', filiere: 'L2 Informatique', etudiants: 202, horraire: 'CM: 20h | TD: 10h | TP: 20h', delegue: 'Nkolo Marie' },
            ].map((ue) => (
              <div key={ue.code} className="p-4 bg-gray-50 hover:bg-purple-50/40 rounded-xl border border-gray-100 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 text-xs font-bold rounded-md">{ue.code}</span>
                    <span className="text-xs font-semibold text-gray-500">{ue.filiere}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{ue.titre}</h3>
                  <p className="text-xs text-gray-500 mt-1">{ue.horraire} • Délégué : <span className="font-medium text-gray-700">{ue.delegue}</span></p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href="/teacher/grades" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-semibold transition">
                    Saisir Notes
                  </Link>
                  <Link href="/video" className="px-3 py-1.5 bg-[#1E3A8A] text-white rounded-lg text-xs font-semibold hover:bg-blue-900 transition flex items-center gap-1">
                    <Video size={14} /> Visio
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validation des Feuilles de Présence */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Validation Présences</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">1 à valider</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">INF301 — Séance du 24/07</span>
                <span className="text-[10px] text-amber-700 font-semibold">Par Délégué Tchouya P.</span>
              </div>
              <p className="text-gray-600">242 Présents • 18 Absents • 4 Retards</p>
              <div className="pt-2 flex gap-2">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 rounded-lg text-xs transition">
                  Valider la feuille
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">
                  Revoir
                </button>
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">INF303 — Séance du 22/07</span>
                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Validé
                </span>
              </div>
              <p className="text-gray-500">190 Présents • 12 Absents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
