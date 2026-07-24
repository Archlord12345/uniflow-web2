import { useState } from 'react';
import { Bell, Search, BookOpen, ClipboardList, Clock, Star, CheckCircle, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockUser, mockDashboardStats, mockDashboardActivity, mockCalendar, mockRepartitionNotes, mockProchainEvenement } from '@/lib/mock-data';

const COLORS = ['#1E3A8A', '#0D9488', '#F59E0B', '#EF4444'];

const statCards = [
  { key: 'coursInscrits', icon: BookOpen, color: '#1E3A8A', bg: '#EFF6FF' },
  { key: 'devoirsARendre', icon: ClipboardList, color: '#F59E0B', bg: '#FFFBEB' },
  { key: 'prochainCours', icon: Clock, color: '#0D9488', bg: '#F0FDFA' },
  { key: 'moyenne', icon: Star, color: '#8B5CF6', bg: '#F5F3FF' },
  { key: 'presences', icon: CheckCircle, color: '#10B981', bg: '#F0FDF4' },
] as const;

// Mini calendar generator
function MiniCalendar() {
  const { mois, today, joursAvecEvenements } = mockCalendar;
  // May 2024 starts on Wednesday (index 2)
  const firstDay = 2;
  const daysInMonth = 31;
  const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Calendrier</h3>
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-gray-700 transition-colors"><ChevronLeft size={16} /></button>
          <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{mois}</span>
          <button className="text-gray-400 hover:text-gray-700 transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {dayLabels.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const isToday = day === today;
          const hasEvent = joursAvecEvenements.includes(day);
          return (
            <div key={i} className="flex flex-col items-center py-0.5">
              <div className={[
                'w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium cursor-pointer transition-colors',
                isToday ? 'bg-[#1E3A8A] text-white font-bold' : 'text-gray-700 hover:bg-gray-100',
              ].join(' ')}>
                {day}
              </div>
              {hasEvent && !isToday && (
                <div className="w-1 h-1 rounded-full bg-[#0D9488] mt-0.5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const statutStyles: Record<string, string> = {
  'Rendu': 'bg-[#0D9488]/10 text-[#0D9488]',
  'Terminé': 'bg-gray-100 text-gray-600',
  'À venir': 'bg-amber-100 text-amber-700',
  'Nouveau': 'bg-[#1E3A8A]/10 text-[#1E3A8A]',
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('today');

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bonjour, {mockUser.nom} 👋</h1>
          <p className="text-sm text-gray-500 mt-0.5">Lundi 13 mai 2024 · Université de Yaoundé I · Facultés des Sciences</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 w-64">
            <Search size={16} className="text-gray-400" />
            <input placeholder="Rechercher (cours, devoirs...)" className="flex-1 text-sm outline-none placeholder-gray-400 bg-transparent" />
            <span className="text-[10px] text-gray-300 font-medium">⌘K</span>
          </div>
          <button className="relative w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-[#1E3A8A] transition-colors shadow-sm">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-white" />
          </button>
          <div className="w-9 h-9 rounded-full bg-[#1E3A8A] text-white font-bold text-sm flex items-center justify-center shadow-sm">
            {mockUser.initiales}
          </div>
        </div>
      </div>

      {/* Campus Welcome Hero Card */}
      <div className="relative rounded-2xl overflow-hidden shadow-md h-36 bg-gradient-to-r from-[#1E3A8A] to-[#0D9488]">
        <img src="/hero-campus.jpg" alt="Campus UY1" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" />
        <div className="relative z-10 p-5 h-full flex flex-col justify-between text-white">
          <div className="flex justify-between items-start">
            <span className="bg-white/20 backdrop-blur-md text-[11px] font-semibold px-2.5 py-0.5 rounded-full">Portail Universitaire Officiel</span>
            <span className="text-xs font-mono bg-black/30 px-2 py-0.5 rounded">Matricule: {mockUser.matricule}</span>
          </div>
          <div>
            <p className="text-lg font-bold">Bienvenue sur UniFlow LMS</p>
            <p className="text-xs text-teal-100">Accédez à vos cours, relevés de notes et visioconférences en temps réel</p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map(({ key, icon: Icon, color, bg }) => {
          const stat = mockDashboardStats[key as keyof typeof mockDashboardStats];
          return (
            <div key={key} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <span className="text-[11px] font-semibold text-[#0D9488] bg-[#0D9488]/10 px-2 py-0.5 rounded-full">{stat.delta}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-tight">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Left — activité + progression */}
        <div className="lg:col-span-2 space-y-5">
          {/* Activité récente */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-50">
              <h2 className="font-semibold text-gray-900">Activité récente</h2>
              <div className="flex gap-1">
                {(['today', 'week', 'month'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={['px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                      activeTab === t ? 'bg-[#1E3A8A] text-white' : 'text-gray-500 hover:bg-gray-100'].join(' ')}
                  >
                    {t === 'today' ? "Aujourd'hui" : t === 'week' ? 'Cette semaine' : 'Ce mois'}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {mockDashboardActivity.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: item.couleur }}>
                    {item.cours.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{item.cours}</p>
                    <p className="text-xs text-gray-500 truncate">{item.activite} · {item.enseignant}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs text-gray-400">{item.time}</span>
                    <span className={['text-[10px] font-semibold px-2 py-0.5 rounded-full', statutStyles[item.statut] ?? 'bg-gray-100 text-gray-600'].join(' ')}>
                      {item.statut}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progression */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Progression globale</h2>
              <span className="text-xs text-[#0D9488] font-semibold">+5% ce mois</span>
            </div>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-bold text-gray-900">72%</span>
              <span className="text-sm text-gray-500 mb-1.5">· 8 cours sur 12 complétés</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#0D9488]" style={{ width: '72%' }} />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>0%</span><span>100%</span>
            </div>
          </div>
        </div>

        {/* Right — calendrier + événement + donut */}
        <div className="space-y-4">
          <MiniCalendar />

          {/* Prochain événement */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar size={16} className="text-[#1E3A8A]" />
              Prochain événement
            </h3>
            <div className="bg-[#1E3A8A]/5 rounded-xl p-3 mb-3">
              <p className="font-bold text-gray-900 text-sm">{mockProchainEvenement.titre}</p>
              <p className="text-xs text-gray-500 mt-0.5">{mockProchainEvenement.date}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                <span>⏰ {mockProchainEvenement.heure}</span>
                <span>📍 Salle {mockProchainEvenement.salle}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 rounded-xl px-3 py-2">
              <span className="text-2xl font-bold text-amber-600">{mockProchainEvenement.dansJours}</span>
              <div>
                <p className="text-xs font-semibold text-amber-800">jours restants</p>
                <p className="text-[10px] text-amber-600">{mockProchainEvenement.date}</p>
              </div>
            </div>
            <button className="mt-3 w-full border border-[#0D9488] text-[#0D9488] py-2 rounded-xl text-sm font-semibold hover:bg-[#0D9488]/5 transition-colors">
              Voir le détail
            </button>
          </div>

          {/* Répartition des notes */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Répartition des notes</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={mockRepartitionNotes} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value">
                  {mockRepartitionNotes.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1.5 mt-1">
              {mockRepartitionNotes.map((r, i) => (
                <div key={r.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                  {r.name} ({r.value}%)
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
