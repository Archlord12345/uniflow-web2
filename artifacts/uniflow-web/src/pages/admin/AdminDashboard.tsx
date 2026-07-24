import { Users, BookOpen, Clock, Activity, TrendingUp, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { mockAdminStats, mockAdminActivity } from '@/lib/mock-data';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Data for charts
const activityData = [
  { time: '08:00', users: 120 }, { time: '10:00', users: 340 }, { time: '12:00', users: 450 },
  { time: '14:00', users: 380 }, { time: '16:00', users: 410 }, { time: '18:00', users: 290 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tableau de bord</h1>
          <p className="text-gray-500 text-sm mt-1">Vue d'ensemble de l'activité sur UniFlow.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-gray-200 shadow-sm self-start md:self-auto">
          <button className="px-3 py-1.5 text-xs font-medium bg-[#1E3A8A] text-white rounded-md">Aujourd'hui</button>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors">7 jours</button>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors">30 jours</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Étudiants Actifs', value: mockAdminStats.etudiants.value, delta: mockAdminStats.etudiants.delta, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Enseignants', value: mockAdminStats.enseignants.value, delta: mockAdminStats.enseignants.delta, icon: Activity, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Cours Actifs', value: mockAdminStats.cours.value, delta: mockAdminStats.cours.delta, icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Taux de Présence', value: mockAdminStats.presences.value, delta: mockAdminStats.presences.delta, icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">
                <TrendingUp size={12} /> {stat.delta}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${stat.bg} opacity-50 -z-10 group-hover:scale-150 transition-transform duration-500`} />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900">Activité de la plateforme</h2>
            <button className="text-[#1E3A8A] text-sm font-medium hover:underline flex items-center gap-1">
              Rapport complet <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="users" stroke="#1E3A8A" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900">Activité récente</h2>
          </div>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {mockAdminActivity.map((activity, i) => (
              <div key={activity.id} className="relative flex items-start gap-4">
                <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center shrink-0">
                  {activity.icon === 'BookOpen' && <BookOpen size={16} className="text-[#1E3A8A]" />}
                  {activity.icon === 'UserPlus' && <Users size={16} className="text-[#0D9488]" />}
                  {activity.icon === 'AlertTriangle' && <AlertCircle size={16} className="text-amber-500" />}
                  {activity.icon === 'Edit' && <Activity size={16} className="text-purple-500" />}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.detail}</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-medium rounded-xl transition-colors border border-gray-200">
            Voir tout l'historique
          </button>
        </div>
      </div>
    </div>
  );
}