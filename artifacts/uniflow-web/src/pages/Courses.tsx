import { useState } from 'react';
import { Search, Filter, Grid, List, Clock, Users, ChevronRight } from 'lucide-react';
import { mockCours, mockProchainDevoirs } from '@/lib/mock-data';

const tabs = ['Tous', 'En cours', 'À voir', 'Terminés'];

export default function Courses() {
  const [tab, setTab] = useState('Tous');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const filtered = mockCours.filter(c => {
    const matchTab = tab === 'Tous' || c.statut === tab;
    const matchSearch = !search || c.intitule.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes cours</h1>
          <p className="text-sm text-gray-500 mt-0.5">{mockCours.length} cours inscrits ce semestre</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 border border-gray-200 bg-white px-3.5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:border-gray-300 transition-colors shadow-sm">
            <Filter size={15} /> Filtre
          </button>
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <button onClick={() => setView('grid')} className={['px-3 py-2 transition-colors', view === 'grid' ? 'bg-[#1E3A8A] text-white' : 'text-gray-500 hover:bg-gray-50'].join(' ')}><Grid size={16} /></button>
            <button onClick={() => setView('list')} className={['px-3 py-2 transition-colors', view === 'list' ? 'bg-[#1E3A8A] text-white' : 'text-gray-500 hover:bg-gray-50'].join(' ')}><List size={16} /></button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-5">
        {/* Main */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search + tabs */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un cours ou un enseignant..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition"
              />
            </div>
            <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm shrink-0">
              {tabs.map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={['px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors', tab === t ? 'bg-[#1E3A8A] text-white' : 'text-gray-500 hover:bg-gray-100'].join(' ')}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {view === 'grid' ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((cours) => (
                <div key={cours.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
                  {/* Course image/banner */}
                  <div className={`h-36 bg-gradient-to-br ${cours.imageBg} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <div className="text-8xl font-black text-white">{cours.code.slice(0, 2)}</div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/30">
                        {cours.statut === 'En cours' ? 'INFOXX' : cours.filiere}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={['text-[10px] font-bold px-2.5 py-1 rounded-full',
                        cours.statut === 'En cours' ? 'bg-green-400/80 text-white' : 'bg-amber-400/80 text-white'].join(' ')}>
                        {cours.statut}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{cours.code}</p>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">{cours.intitule}</h3>
                    <p className="text-xs text-gray-500 mb-3">Pr. {cours.enseignant}</p>

                    {/* Progress */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                      <span>{cours.tauxPresence}% chapitres vus</span>
                      <span className="font-semibold" style={{ color: cours.couleur }}>{cours.tauxPresence}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${cours.tauxPresence}%`, background: cours.couleur }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Users size={12} /> {cours.inscrits}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {cours.credits} crédits</span>
                      </div>
                      <button className="text-xs font-semibold text-white px-3 py-1.5 rounded-lg transition-colors" style={{ background: cours.couleur }}>
                        Continuer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((cours) => (
                <div key={cours.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cours.imageBg} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {cours.code.slice(0, 3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{cours.intitule}</h3>
                      <span className={['text-[10px] font-bold px-2 py-0.5 rounded-full', cours.statut === 'En cours' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'].join(' ')}>{cours.statut}</span>
                    </div>
                    <p className="text-xs text-gray-500">Pr. {cours.enseignant} · {cours.credits} crédits · {cours.inscrits} étudiants</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs font-semibold" style={{ color: cours.couleur }}>{cours.tauxPresence}%</p>
                      <div className="w-20 bg-gray-100 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${cours.tauxPresence}%`, background: cours.couleur }} />
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#1E3A8A] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar — prochains devoirs */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Prochains devoirs</h3>
            <div className="space-y-3">
              {mockProchainDevoirs.map((d) => (
                <div key={d.id} className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-xl">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0 bg-[#1E3A8A]">
                    {d.ue.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{d.ue}</p>
                    <p className="text-[10px] text-gray-500">{d.niveau}</p>
                    <p className={['text-[10px] font-semibold mt-0.5', d.urgent ? 'text-red-600' : 'text-gray-500'].join(' ')}>
                      {d.dateLimite}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full text-xs font-semibold text-[#1E3A8A] hover:underline text-center block">
              Voir tous les devoirs →
            </button>
          </div>

          <div className="bg-[#1E3A8A] rounded-2xl p-4 text-white">
            <h3 className="font-semibold text-sm mb-2">📊 Statistiques</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-blue-200">Cours actifs</span><span className="font-bold">4</span></div>
              <div className="flex justify-between"><span className="text-blue-200">Taux présence moy.</span><span className="font-bold">71%</span></div>
              <div className="flex justify-between"><span className="text-blue-200">Crédits validés</span><span className="font-bold">20/30</span></div>
              <div className="flex justify-between"><span className="text-blue-200">Semestre</span><span className="font-bold">S1 2024</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
