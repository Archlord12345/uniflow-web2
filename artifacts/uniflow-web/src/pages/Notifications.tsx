import { useState } from 'react';
import { Bell, Megaphone, Settings, BookOpen, CheckCheck, Star, Trash2, MoreVertical, Filter } from 'lucide-react';
import { mockNotifications } from '@/lib/mock-data';

const tabs = ['Tous', 'Annonces', 'Système', 'Non lus'];

const typeIcon: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  annonce:  { icon: Megaphone, color: '#1E3A8A', bg: '#EFF6FF' },
  devoir:   { icon: BookOpen,  color: '#F59E0B', bg: '#FFFBEB' },
  visio:    { icon: Bell,      color: '#8B5CF6', bg: '#F5F3FF' },
  systeme:  { icon: Settings,  color: '#6B7280', bg: '#F3F4F6' },
};

export default function Notifications() {
  const [tab, setTab] = useState('Tous');
  const [selected, setSelected] = useState(mockNotifications[0]);

  const filtered = mockNotifications.filter(n => {
    if (tab === 'Non lus') return n.nonLu;
    if (tab === 'Annonces') return n.type === 'annonce';
    if (tab === 'Système') return n.type === 'systeme';
    return true;
  });

  const unreadCount = mockNotifications.filter(n => n.nonLu).length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-0.5">{unreadCount} non lues</p>
        </div>
        <div className="flex items-center gap-2">
          {['Par UE ▾', 'Par type ▾', 'Période ▾'].map(f => (
            <select key={f} className="border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm font-medium text-gray-600 focus:outline-none shadow-sm">
              <option>{f}</option>
            </select>
          ))}
          <button className="flex items-center gap-1.5 bg-[#1E3A8A] text-white px-3.5 py-2 rounded-xl text-sm font-semibold hover:bg-[#1E3A8A]/90 shadow-sm transition-colors">
            <CheckCheck size={15} /> Tout marquer comme lu
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5" style={{ minHeight: 600 }}>
        {/* Left — liste */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 px-2 pt-2">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={['flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors',
                  tab === t ? 'border-[#1E3A8A] text-[#1E3A8A]' : 'border-transparent text-gray-500 hover:text-gray-700'].join(' ')}
              >
                {t}
                {t === 'Non lus' && unreadCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1E3A8A] text-white text-[9px] font-bold px-1">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filtered.map(n => {
              const meta = typeIcon[n.type] ?? typeIcon.systeme;
              const isSelected = selected?.id === n.id;
              return (
                <div
                  key={n.id}
                  onClick={() => setSelected(n)}
                  className={['flex items-start gap-3 p-4 cursor-pointer transition-colors hover:bg-gray-50',
                    isSelected ? 'bg-[#1E3A8A]/5 border-l-2 border-[#1E3A8A]' : ''].join(' ')}
                >
                  {/* Unread dot */}
                  <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
                    <div className={['w-2 h-2 rounded-full', n.nonLu ? 'bg-[#1E3A8A]' : 'bg-gray-200'].join(' ')} />
                  </div>

                  {/* Icon */}
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: meta.bg }}>
                    <meta.icon size={15} style={{ color: meta.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={['text-sm leading-snug line-clamp-1', n.nonLu ? 'font-bold text-gray-900' : 'font-medium text-gray-700'].join(' ')}>
                        {n.titre}
                      </p>
                      <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">{n.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">{n.apercu}</p>
                    <p className="text-[11px] text-gray-400 mt-1 font-medium">{n.expediteur}</p>
                  </div>

                  <button
                    onClick={e => e.stopPropagation()}
                    className="shrink-0 text-gray-300 hover:text-gray-500 transition-colors p-0.5 mt-0.5"
                  >
                    <MoreVertical size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — détail */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          {selected ? (
            <>
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-base line-clamp-1">{selected.titre}</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"><Star size={16} /></button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>

              {/* Meta */}
              <div className="px-6 py-3 bg-gray-50 flex flex-wrap items-center gap-4 text-xs text-gray-500 border-b border-gray-100">
                <span><span className="text-gray-400">De :</span> <span className="font-semibold text-gray-700">{selected.expediteur}</span></span>
                <span>{selected.time}</span>
                {selected.nonLu && (
                  <span className="bg-[#1E3A8A]/10 text-[#1E3A8A] font-semibold px-2 py-0.5 rounded-full">Non lue</span>
                )}
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {selected.body}
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 py-4 border-t border-gray-50">
                <button className="bg-[#0D9488] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0D9488]/90 transition-colors shadow-sm">
                  J'ai compris
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <Bell size={28} className="text-gray-300" />
              </div>
              <p className="font-semibold text-gray-500">Sélectionnez une notification</p>
              <p className="text-sm text-gray-400 mt-1">Cliquez sur un élément à gauche pour voir son contenu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
