import { useState } from 'react';
import { Edit, CheckCircle, BarChart2, Star } from 'lucide-react';
import { mockUser, mockNotes } from '@/lib/mock-data';

const tabs = ['Informations', 'Parcours', 'Présences', 'Notes', 'Paramètres', 'Références'];

export default function Profile() {
  const [tab, setTab] = useState('Informations');

  return (
    <div className="space-y-6">
      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A] text-2xl font-bold">
              {mockUser.initiales}
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{mockUser.nomComplet}</h1>
                <p className="text-sm text-gray-500 mt-0.5">Étudiante en {mockUser.niveau} – {mockUser.filiere}</p>
                <span className="inline-flex items-center gap-1.5 mt-2 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {mockUser.statut}
                </span>
              </div>
              <button className="flex items-center gap-2 border border-[#1E3A8A] text-[#1E3A8A] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1E3A8A]/5 transition-colors">
                <Edit size={15} /> Modifier le profil
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mt-5 border-b border-gray-100 -mx-6 px-6">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={['pb-3 px-3 text-sm font-semibold border-b-2 transition-colors',
                tab === t ? 'border-[#1E3A8A] text-[#1E3A8A]' : 'border-transparent text-gray-500 hover:text-gray-700'].join(' ')}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {tab === 'Informations' && (
        <div className="grid md:grid-cols-2 gap-5">
          {/* Infos personnelles */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Informations personnelles</h2>
            <div className="space-y-3">
              {[
                { label: 'Nom complet', value: mockUser.nomComplet },
                { label: 'Date de naissance', value: mockUser.dateNaissance },
                { label: 'Téléphone', value: mockUser.telephone },
                { label: 'Email', value: mockUser.email },
                { label: 'Adresse', value: mockUser.adresse },
              ].map(f => (
                <div key={f.label} className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-500">{f.label}</span>
                  <span className="text-sm font-medium text-gray-900 text-right max-w-[55%]">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Infos académiques */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Informations académiques</h2>
            <div className="space-y-3">
              {[
                { label: 'Numéro étudiant', value: mockUser.matricule },
                { label: 'Filière', value: mockUser.filiere },
                { label: 'Niveau', value: mockUser.niveau },
                { label: 'Langues', value: mockUser.langues },
                { label: 'Établissement', value: mockUser.etablissement },
                { label: 'Date d\'inscription', value: mockUser.inscription },
              ].map(f => (
                <div key={f.label} className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-500">{f.label}</span>
                  <span className="text-sm font-medium text-gray-900 text-right max-w-[55%]">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mes statistiques */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Mes statistiques</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: BarChart2, label: 'Sessions totales', value: 80, sub: 'Sessions suivies', color: '#1E3A8A', bg: '#EFF6FF' },
                { icon: CheckCircle, label: 'Présences', value: 68, sub: 'Sessions présentes', color: '#0D9488', bg: '#F0FDFA' },
                { icon: Star, label: 'Points', value: 1200, sub: 'Points cumulés', color: '#F59E0B', bg: '#FFFBEB' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                    <s.icon size={22} style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs font-semibold text-gray-700">{s.label}</p>
                    <p className="text-[11px] text-gray-400">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'Notes' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Résultats académiques — Semestre 1</h2>
            <span className="text-sm font-bold text-[#1E3A8A]">Moy. générale : 13.1/20</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  {['Code', 'Intitulé', 'Type', 'Crédits', 'CC', 'TP', 'Examen', 'Moyenne', 'Validation'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockNotes.map(n => (
                  <tr key={n.code} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#1E3A8A]">{n.code}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{n.intitule}</td>
                    <td className="px-4 py-3"><span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{n.type}</span></td>
                    <td className="px-4 py-3 text-center text-gray-700 font-semibold">{n.credits}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{n.cc ?? '—'}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{n.tp ?? '—'}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{n.examen}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={['font-bold text-sm', n.valide ? 'text-[#0D9488]' : 'text-red-600'].join(' ')}>{n.moyenne.toFixed(1)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={['text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap',
                        n.valide ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'].join(' ')}>
                        {n.valide ? '✓ Validé' : '✗ Ajourné'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {['Parcours', 'Présences', 'Paramètres', 'Références'].includes(tab) && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1E3A8A]/10 flex items-center justify-center mx-auto mb-4">
            <Edit size={24} className="text-[#1E3A8A]" />
          </div>
          <p className="font-semibold text-gray-700">Section {tab}</p>
          <p className="text-sm text-gray-400 mt-1">Contenu disponible prochainement</p>
        </div>
      )}
    </div>
  );
}
