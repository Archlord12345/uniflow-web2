import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Printer, Wand2, X } from 'lucide-react';
import { mockScheduleEvents } from '@/lib/mock-data';

const DAYS = [
  { label: 'Lun', date: 13 },
  { label: 'Mar', date: 14 },
  { label: 'Mer', date: 15 },
  { label: 'Jeu', date: 16 },
  { label: 'Ven', date: 17 },
  { label: 'Sam', date: 18 },
];
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const HOUR_HEIGHT = 64; // px per hour
const START_HOUR = 8;

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  CM: { bg: '#DBEAFE', border: '#3B82F6', text: '#1E40AF' },
  TD: { bg: '#D1FAE5', border: '#10B981', text: '#065F46' },
  TP: { bg: '#EDE9FE', border: '#8B5CF6', text: '#5B21B6' },
  Séminaire: { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E' },
};

interface ScheduleEvent {
  id: string;
  day: number;
  startHour: number;
  endHour: number;
  type: string;
  ue: string;
  code: string;
  salle: string;
  enseignant: string;
  couleur: string;
  border: string;
  texte: string;
}

export default function Schedule() {
  const [selected, setSelected] = useState<ScheduleEvent | null>(null);
  const [view, setView] = useState<'Semaine' | 'Mois' | 'Jour'>('Semaine');

  return (
    <div className="space-y-5 h-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Emploi du temps</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-gray-200 bg-white px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:border-gray-300 shadow-sm transition-colors">
            <Download size={15} /> Export PDF
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 bg-white px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:border-gray-300 shadow-sm transition-colors">
            <Printer size={15} /> Imprimer
          </button>
          <button className="flex items-center gap-1.5 bg-[#0D9488] text-white px-3 py-2 rounded-xl text-sm font-semibold hover:bg-[#0D9488]/90 shadow-sm transition-colors">
            <Wand2 size={15} /> Auto-générer
          </button>
        </div>
      </div>

      {/* Nav + view toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-[#1E3A8A] hover:border-[#1E3A8A] shadow-sm transition-colors">
            <ChevronLeft size={16} />
          </button>
          <span className="font-semibold text-gray-900 text-sm">13 – 18 mai 2024</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-[#1E3A8A] hover:border-[#1E3A8A] shadow-sm transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Filters */}
          {['Programme', 'Niveau', 'Semestre'].map(f => (
            <select key={f} className="border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] shadow-sm">
              <option>{f} ▾</option>
            </select>
          ))}
          {/* View switch */}
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {(['Semaine', 'Mois', 'Jour'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={['px-3 py-2 text-xs font-semibold transition-colors', view === v ? 'bg-[#1E3A8A] text-white' : 'text-gray-500 hover:bg-gray-50'].join(' ')}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar grid + optional detail panel */}
      <div className="flex gap-4">
        {/* Grid */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-auto">
          <div className="min-w-[640px]">
            {/* Day headers */}
            <div className="grid border-b border-gray-100" style={{ gridTemplateColumns: '56px repeat(6, 1fr)' }}>
              <div className="py-3 px-2 text-xs text-gray-400 font-medium text-center">Heure</div>
              {DAYS.map((d) => (
                <div key={d.label} className="py-3 px-2 text-center border-l border-gray-50">
                  <p className="text-xs font-bold text-gray-900">{d.label} <span className="font-normal text-gray-400">{d.date}</span></p>
                </div>
              ))}
            </div>

            {/* Time + events grid */}
            <div className="relative" style={{ gridTemplateColumns: '56px repeat(6, 1fr)' }}>
              {/* Hour rows */}
              {HOURS.map((h) => (
                <div key={h} className="absolute w-full flex" style={{ top: (h - START_HOUR) * HOUR_HEIGHT, height: HOUR_HEIGHT }}>
                  <div className="w-14 flex items-start justify-center pt-0 pr-2">
                    <span className="text-[11px] text-gray-400 font-medium leading-none">{h}h</span>
                  </div>
                  <div className="flex-1 border-t border-gray-100" />
                </div>
              ))}

              {/* Columns with events */}
              <div className="ml-14 grid relative" style={{ gridTemplateColumns: 'repeat(6, 1fr)', height: HOURS.length * HOUR_HEIGHT }}>
                {DAYS.map((day, dayIdx) => (
                  <div key={dayIdx} className="relative border-l border-gray-100">
                    {mockScheduleEvents
                      .filter(e => e.day === dayIdx + 1)
                      .map((event) => {
                        const top = (event.startHour - START_HOUR) * HOUR_HEIGHT;
                        const height = (event.endHour - event.startHour) * HOUR_HEIGHT;
                        const colors = typeColors[event.type] ?? { bg: event.couleur, border: event.border, text: event.texte };
                        const isSelected = selected?.id === event.id;
                        return (
                          <div
                            key={event.id}
                            onClick={() => setSelected(isSelected ? null : event)}
                            className="absolute left-1 right-1 rounded-xl px-2 py-1.5 cursor-pointer transition-all hover:shadow-md overflow-hidden"
                            style={{
                              top,
                              height: height - 4,
                              background: colors.bg,
                              borderLeft: `3px solid ${colors.border}`,
                              outline: isSelected ? `2px solid ${colors.border}` : 'none',
                            }}
                          >
                            <p className="text-[11px] font-bold leading-tight truncate" style={{ color: colors.text }}>{event.code}</p>
                            <p className="text-[10px] leading-tight" style={{ color: colors.text }}>{event.type}</p>
                            {height >= 100 && (
                              <>
                                <p className="text-[10px] mt-1 truncate" style={{ color: colors.text }}>{event.salle}</p>
                                <p className="text-[10px] truncate" style={{ color: colors.text }}>{event.enseignant}</p>
                              </>
                            )}
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-72 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm">Cours sélectionné</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={16} /></button>
            </div>

            {(() => {
              const colors = typeColors[selected.type] ?? { bg: '#F3F4F6', border: '#1E3A8A', text: '#1E3A8A' };
              return (
                <>
                  <div className="rounded-xl p-3" style={{ background: colors.bg }}>
                    <p className="font-bold text-sm" style={{ color: colors.text }}>{selected.ue} — {selected.type}</p>
                    <p className="text-xs mt-0.5" style={{ color: colors.text }}>{selected.code}</p>
                  </div>
                  <div className="space-y-2.5 text-sm text-gray-700">
                    <div className="flex justify-between"><span className="text-gray-400">Enseignant</span><span className="font-medium">{selected.enseignant}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Salle</span><span className="font-medium">{selected.salle}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Horaire</span><span className="font-medium">{selected.startHour}h – {selected.endHour}h</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Type</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: colors.bg, color: colors.text }}>{selected.type}</span>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <button className="w-full border border-[#1E3A8A] text-[#1E3A8A] py-2 rounded-xl text-sm font-semibold hover:bg-[#1E3A8A]/5 transition-colors">Voir les étudiants</button>
                    <button className="w-full bg-[#1E3A8A] text-white py-2 rounded-xl text-sm font-semibold hover:bg-[#1E3A8A]/90 transition-colors">Ajouter au calendrier</button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        {Object.entries(typeColors).map(([type, c]) => (
          <div key={type} className="flex items-center gap-1.5 text-xs text-gray-600">
            <div className="w-3 h-3 rounded" style={{ background: c.border }} />
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}
