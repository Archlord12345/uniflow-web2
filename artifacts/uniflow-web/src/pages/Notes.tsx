import { useState } from 'react';
import { Download, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { mockNotes } from '@/lib/mock-data';

const semestres = ['Semestre 1', 'Semestre 2'];

const COLORS = ['#1E3A8A', '#0D9488', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function Notes() {
  const [semestre, setSemestre] = useState('Semestre 1');

  const moyenne = (mockNotes.reduce((acc, n) => acc + n.moyenne * n.credits, 0) / mockNotes.reduce((acc, n) => acc + n.credits, 0)).toFixed(2);
  const creditsValides = mockNotes.filter(n => n.valide).reduce((acc, n) => acc + n.credits, 0);
  const totalCredits = mockNotes.reduce((acc, n) => acc + n.credits, 0);

  const chartData = mockNotes.map(n => ({ name: n.code, moyenne: n.moyenne, fill: n.valide ? '#1E3A8A' : '#EF4444' }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes Notes</h1>
          <p className="text-sm text-gray-500 mt-0.5">Résultats académiques par unité d'enseignement</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {semestres.map(s => (
              <button key={s} onClick={() => setSemestre(s)}
                className={['px-4 py-2 text-sm font-semibold transition-colors', semestre === s ? 'bg-[#1E3A8A] text-white' : 'text-gray-500 hover:bg-gray-50'].join(' ')}>
                {s}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 border border-gray-200 bg-white px-3.5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:border-gray-300 shadow-sm">
            <Download size={15} /> Exporter
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Moyenne générale', value: `${moyenne}/20`, color: '#1E3A8A', bg: '#EFF6FF' },
          { label: 'Crédits validés', value: `${creditsValides}/${totalCredits}`, color: '#0D9488', bg: '#F0FDFA' },
          { label: 'UE validées', value: `${mockNotes.filter(n => n.valide).length}/${mockNotes.length}`, color: '#10B981', bg: '#F0FDF4' },
          { label: 'UE ajournées', value: `${mockNotes.filter(n => !n.valide).length}`, color: '#EF4444', bg: '#FEF2F2' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} style={{ color: s.color }} />
              <span className="text-xs font-medium text-gray-500">{s.label}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900">Détail par UE — {semestre}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                {['Code UE', 'Intitulé', 'Type', 'Crédits', 'CC', 'TP', 'Examen', 'Moyenne', 'Validation'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockNotes.map((n, i) => (
                <tr key={n.code} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="inline-block font-mono text-xs font-bold text-white px-2 py-0.5 rounded-md" style={{ background: COLORS[i % COLORS.length] }}>
                      {n.code}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{n.intitule}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{n.type}</span>
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-gray-700">{n.credits}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{n.cc ?? <span className="text-gray-300">—</span>}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{n.tp ?? <span className="text-gray-300">—</span>}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{n.examen}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={['text-base font-bold', n.valide ? 'text-[#1E3A8A]' : 'text-red-500'].join(' ')}>
                      {n.moyenne.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400">/20</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={['text-xs font-semibold px-2.5 py-1 rounded-full',
                      n.valide ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'].join(' ')}>
                      {n.valide ? '✓ Validé' : '✗ Ajourné'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#1E3A8A]/5 border-t border-gray-100">
                <td colSpan={3} className="px-4 py-3 text-sm font-bold text-gray-900">Total / Moyenne</td>
                <td className="px-4 py-3 text-center font-bold text-[#1E3A8A]">{totalCredits}</td>
                <td colSpan={3} />
                <td className="px-4 py-3 text-center font-bold text-[#1E3A8A] text-base">{moyenne}<span className="text-xs text-gray-400">/20</span></td>
                <td className="px-4 py-3">
                  <span className="text-xs font-semibold bg-[#0D9488]/10 text-[#0D9488] px-2.5 py-1 rounded-full">
                    {creditsValides}/{totalCredits} crédits
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Graphique des moyennes par UE</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={[0, 20]} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
              formatter={(v: number) => [`${v}/20`, 'Moyenne']}
            />
            {/* Barres avec couleur conditionnelle */}
            <Bar dataKey="moyenne" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {/* Ligne de validation */}
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <div className="w-8 h-0.5 bg-red-400 border-dashed border border-red-400" />
          <span>Barre de validation : 10/20</span>
        </div>
      </div>
    </div>
  );
}
