import { useState } from 'react';
import { ClipboardList, Clock, CheckCircle, AlertTriangle, Eye } from 'lucide-react';
import { mockDevoirs } from '@/lib/mock-data';

const tabs = ['À faire', 'Rendus', 'Tous'];

export default function Devoirs() {
  const [tab, setTab] = useState('À faire');

  const filtered = mockDevoirs.filter(d => {
    if (tab === 'À faire') return d.statut === 'À faire';
    if (tab === 'Rendus') return d.statut === 'Rendu';
    return true;
  });

  const aFaire = mockDevoirs.filter(d => d.statut === 'À faire').length;
  const rendus = mockDevoirs.filter(d => d.statut === 'Rendu').length;
  const urgent = mockDevoirs.filter(d => d.urgent).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes Devoirs</h1>
          <p className="text-sm text-gray-500 mt-0.5">Suivez et gérez vos travaux à rendre</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: ClipboardList, label: 'Total', value: mockDevoirs.length, color: '#1E3A8A', bg: '#EFF6FF' },
          { icon: Clock, label: 'En attente', value: aFaire, color: '#F59E0B', bg: '#FFFBEB' },
          { icon: CheckCircle, label: 'Rendus', value: rendus, color: '#0D9488', bg: '#F0FDFA' },
          { icon: AlertTriangle, label: 'Urgents', value: urgent, color: '#EF4444', bg: '#FEF2F2' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.bg }}>
              <s.icon size={20} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm w-fit">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={['px-4 py-2 rounded-lg text-sm font-semibold transition-colors', tab === t ? 'bg-[#1E3A8A] text-white' : 'text-gray-500 hover:bg-gray-100'].join(' ')}>
            {t}
            {t === 'À faire' && aFaire > 0 && (
              <span className="ml-1.5 bg-white/20 text-[11px] px-1.5 rounded-full">{aFaire}</span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((d) => (
          <div key={d.id} className={['bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow',
            d.urgent ? 'border-red-200' : 'border-gray-100'].join(' ')}>
            {/* Top accent bar */}
            <div className="h-1" style={{ background: d.couleur }} />

            <div className="p-5 space-y-3">
              {/* UE badge + status */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white px-2.5 py-1 rounded-full" style={{ background: d.couleur }}>
                  {d.ue}
                </span>
                <div className="flex items-center gap-1.5">
                  {d.urgent && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      <AlertTriangle size={11} /> Urgent
                    </span>
                  )}
                  <span className={['text-[11px] font-semibold px-2 py-0.5 rounded-full',
                    d.statut === 'À faire' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'].join(' ')}>
                    {d.statut}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 text-sm leading-snug">{d.titre}</h3>

              {/* Enseignant */}
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                  {d.enseignant.split(' ').map(n => n[0]).join('')}
                </span>
                {d.enseignant}
              </p>

              {/* Date limite */}
              <div className={['flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl',
                d.urgent ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-600'].join(' ')}>
                <Clock size={13} />
                <span>{d.urgent ? '⚠️ ' : ''}Rendu avant le {d.dateLimite}</span>
              </div>

              {/* CTA */}
              {d.statut === 'À faire' && (
                <div className="flex gap-2 pt-1">
                  <button className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5">
                    <Eye size={13} /> Voir les détails
                  </button>
                  <button className="flex-1 text-white py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity" style={{ background: d.couleur }}>
                    Rendre le devoir
                  </button>
                </div>
              )}

              {d.statut === 'Rendu' && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-xl text-xs font-semibold">
                  <CheckCircle size={13} /> Devoir rendu avec succès
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#0D9488]/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-[#0D9488]" />
          </div>
          <p className="font-semibold text-gray-700">Aucun devoir {tab.toLowerCase()}</p>
          <p className="text-sm text-gray-400 mt-1">Vous êtes à jour !</p>
        </div>
      )}
    </div>
  );
}
