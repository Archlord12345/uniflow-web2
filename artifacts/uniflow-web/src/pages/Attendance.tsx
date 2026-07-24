import { useState, useEffect } from 'react';
import { Download, QrCode, UserCheck, RefreshCw, Eye, Edit, Trash2, CheckCircle2, XCircle, Clock, AlertCircle, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockPresences, mockPresenceStats, mockPresenceChart } from '@/lib/mock-data';
import { useRole } from '@/lib/role-context';

const statutStyle: Record<string, string> = {
  'Régulier': 'bg-green-100 text-green-700',
  'Attention': 'bg-amber-100 text-amber-700',
  'Critique': 'bg-red-100 text-red-700',
};

// Simulated QR code using SVG pattern
function QrSvg() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Corner squares */}
      {[[5,5],[65,5],[5,65]].map(([x,y],i) => (
        <g key={i}>
          <rect x={x} y={y} width={30} height={30} fill="none" stroke="#1E3A8A" strokeWidth="3" rx="2" />
          <rect x={x+8} y={y+8} width={14} height={14} fill="#1E3A8A" rx="1" />
        </g>
      ))}
      {/* Data cells */}
      {[
        [40,5],[45,5],[50,5],[55,5],
        [40,15],[50,15],[55,15],
        [40,25],[42,25],[48,25],[55,25],
        [40,35],[44,35],[52,35],
        [70,40],[75,40],[80,40],[85,40],[90,40],
        [70,50],[80,50],[90,50],
        [70,60],[75,60],[85,60],[90,60],
        [70,70],[72,70],[80,70],[90,70],
        [70,80],[78,80],[83,80],[90,80],
        [70,90],[75,90],[80,90],[88,90],
        [5,40],[10,40],[18,40],[25,40],[32,40],
        [5,50],[15,50],[25,50],[32,50],
        [5,60],[8,60],[18,60],[28,60],[35,60],
        [5,70],[12,70],[22,70],[30,70],
        [5,80],[10,80],[20,80],[28,80],[35,80],
        [5,90],[8,90],[15,90],[25,90],[35,90],
      ].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width={4} height={4} fill="#1E3A8A" rx="0.5" />
      ))}
    </svg>
  );
}

function CountdownTimer() {
  const [secs, setSecs] = useState(512);
  useEffect(() => {
    const id = setInterval(() => setSecs(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return <span className="text-3xl font-bold text-[#1E3A8A] tabular-nums">{m}:{s}</span>;
}

export default function Attendance() {
  const { role, user } = useRole();
  const [selectedUE, setSelectedUE] = useState('Toutes');
  const [showDelegateSheet, setShowDelegateSheet] = useState(role === 'delegue');

  // Interactive marking state
  const [markedList, setMarkedList] = useState(
    mockPresences.map((p) => ({
      id: p.id,
      etudiant: p.etudiant,
      num: p.num,
      status: 'P' as 'P' | 'A' | 'R' | 'E',
    }))
  );

  const setStudentStatus = (id: string, status: 'P' | 'A' | 'R' | 'E') => {
    setMarkedList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const countP = markedList.filter((m) => m.status === 'P').length;
  const countA = markedList.filter((m) => m.status === 'A').length;
  const countR = markedList.filter((m) => m.status === 'R').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des présences</h1>
            {role === 'delegue' && (
              <span className="px-2.5 py-0.5 bg-teal-100 text-teal-800 text-xs font-bold rounded-full flex items-center gap-1">
                <ShieldCheck size={12} /> Espace Délégué
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">Suivi et pointage en direct par séance</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDelegateSheet(!showDelegateSheet)}
            className="flex items-center gap-1.5 bg-[#0D9488] text-white px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0D9488]/90 shadow-sm transition-colors"
          >
            <UserCheck size={15} /> {showDelegateSheet ? 'Masquer Grille Pointage' : 'Saisie Direct Délégué'}
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 bg-white px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:border-gray-300 shadow-sm transition-colors">
            <Download size={15} /> Exporter PV
          </button>
        </div>
      </div>

      {/* Delegate Marking Interactive Sheet (if active) */}
      {showDelegateSheet && (
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-[#1E3A8A] text-white p-6 rounded-2xl shadow-xl space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
                Mode Prise de Présence Officielle (Délégué)
              </span>
              <h2 className="text-lg font-bold">L2 Informatique — INF301 Algorithmique (Amphi 500)</h2>
              <p className="text-xs text-gray-300">Enseignant responsable : Dr. Nkam Jean-Paul</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-medium">
              <span>Outbox Local: <strong className="text-emerald-400">Synchronisé</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-emerald-500/20 border border-emerald-500/30 p-2.5 rounded-xl">
              <p className="text-xl font-bold text-emerald-300">{countP}</p>
              <p className="text-[10px] text-emerald-200 font-semibold uppercase">Présents</p>
            </div>
            <div className="bg-red-500/20 border border-red-500/30 p-2.5 rounded-xl">
              <p className="text-xl font-bold text-red-300">{countA}</p>
              <p className="text-[10px] text-red-200 font-semibold uppercase">Absents</p>
            </div>
            <div className="bg-amber-500/20 border border-amber-500/30 p-2.5 rounded-xl">
              <p className="text-xl font-bold text-amber-300">{countR}</p>
              <p className="text-[10px] text-amber-200 font-semibold uppercase">Retards</p>
            </div>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {markedList.map((st) => (
              <div key={st.id} className="flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-xs">
                <div>
                  <span className="font-bold text-white block">{st.etudiant}</span>
                  <span className="text-[10px] text-gray-400 font-mono">{st.num}</span>
                </div>
                <div className="flex gap-1">
                  {(['P', 'A', 'R', 'E'] as const).map((code) => {
                    const isSel = st.status === code;
                    const colors: Record<string, string> = {
                      P: isSel ? 'bg-emerald-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20',
                      A: isSel ? 'bg-red-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20',
                      R: isSel ? 'bg-amber-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20',
                      E: isSel ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20',
                    };
                    const labels: Record<string, string> = { P: 'Présent', A: 'Absent', R: 'Retard', E: 'Excusé' };
                    return (
                      <button
                        key={code}
                        onClick={() => setStudentStatus(st.id, code)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${colors[code]}`}
                      >
                        {labels[code]}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2">
            Transmettre la feuille au Secrétariat Académique & Enseignant
          </button>
        </div>
      )}


      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        {['UE ▾', 'Groupe ▾', 'Semaine ▾'].map(f => (
          <select key={f} className="border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] shadow-sm">
            <option>{f}</option>
          </select>
        ))}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Taux global — ring */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0">
            <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
              <circle cx="30" cy="30" r="24" fill="none" stroke="#F3F4F6" strokeWidth="8" />
              <circle cx="30" cy="30" r="24" fill="none" stroke="#0D9488" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 24 * mockPresenceStats.tauxGlobal / 100} ${2 * Math.PI * 24}`}
                strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">{mockPresenceStats.tauxGlobal}%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockPresenceStats.tauxGlobal}%</p>
            <p className="text-xs text-gray-500">Taux de présence global</p>
          </div>
        </div>

        {[
          { label: 'Total sessions', value: mockPresenceStats.totalSessions, sub: `Sur ${mockPresences.length * 4} étudiants`, color: '#1E3A8A' },
          { label: "Présents aujourd'hui", value: mockPresenceStats.presentsAujourdhui, sub: 'Sur 20 étudiants', color: '#0D9488' },
          { label: 'Absences à justifier', value: mockPresenceStats.absencesAJustifier, sub: '6.7% des étudiants', color: '#EF4444' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Table + QR code */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Liste de présence</h2>
            <span className="text-xs text-gray-400">{mockPresences.length} étudiants</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  {['#', 'Étudiant', 'N° Étudiant', 'Présences', 'Absences', 'Retards', 'Taux', 'Justifiées', 'Statut', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockPresences.map((p, i) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A] text-[10px] font-bold shrink-0">
                          {p.etudiant.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-gray-900 whitespace-nowrap">{p.etudiant}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{p.num}</td>
                    <td className="px-4 py-3 text-gray-900 font-semibold text-center">{p.presences}</td>
                    <td className="px-4 py-3 text-red-600 font-semibold text-center">{p.absences}</td>
                    <td className="px-4 py-3 text-amber-600 font-semibold text-center">{p.retards}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className="h-full rounded-full bg-[#0D9488]" style={{ width: `${p.taux}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700 tabular-nums">{p.taux}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">{p.justifiees}</td>
                    <td className="px-4 py-3">
                      <span className={['text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap', statutStyle[p.statut]].join(' ')}>
                        {p.statut}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-[#1E3A8A] hover:bg-[#1E3A8A]/10 rounded-lg transition-colors"><Eye size={14} /></button>
                        <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"><Edit size={14} /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QR Code panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center gap-4">
          <div className="w-full flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">QR Code session active</h3>
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">● Actif</span>
          </div>

          <div className="w-48 h-48 p-3 border-2 border-dashed border-[#1E3A8A]/20 rounded-2xl">
            <QrSvg />
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Scannez pour marquer votre présence</p>
            <CountdownTimer />
            <p className="text-[11px] text-gray-400 mt-1">Expire dans ce délai</p>
          </div>

          <button className="flex items-center gap-2 w-full justify-center border border-[#1E3A8A] text-[#1E3A8A] py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1E3A8A]/5 transition-colors">
            <RefreshCw size={14} /> Générer nouveau QR
          </button>

          <p className="text-xs text-gray-400 text-center">
            <strong className="text-gray-700">{mockPresenceStats.presentsAujourdhui}</strong> étudiants sur la liste
          </p>
        </div>
      </div>

      {/* Bottom chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Évolution des présences par semaine</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockPresenceChart} barSize={12}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="semaine" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={[60, 100]} />
            <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="presences" name="Taux présences (%)" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
            <Bar dataKey="groupe" name="Taux groupe (%)" fill="#0D9488" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
