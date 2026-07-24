import { useState } from 'react';
import { RefreshCw, Database, Wifi, WifiOff, Server, HardDrive, CheckCircle2, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

export default function AdminSync() {
  const [syncing, setSyncing] = useState(false);

  const handleForceSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1200);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full mb-2 inline-block">
            Moteur de Synchronisation Offline-First
          </span>
          <h1 className="text-2xl font-bold text-gray-900">Audit & État de la Synchronisation</h1>
          <p className="text-gray-500 text-sm">Pattern Outbox + Drift SQLite (Resolution Last-Write-Wins)</p>
        </div>
        <button
          onClick={handleForceSync}
          disabled={syncing}
          className="bg-[#1E3A8A] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-900 transition flex items-center gap-2 shadow"
        >
          <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Synchronisation en cours...' : 'Forcer la synchronisation'}
        </button>
      </div>

      {/* Health status grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Wifi size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">Statut Réseau Campus</p>
            <p className="text-lg font-bold text-gray-900">En Ligne (LAN 1 Gbps)</p>
            <span className="text-[10px] text-emerald-600 font-medium">Connectivité serveur locale active</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-[#1E3A8A] rounded-xl">
            <HardDrive size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">File d'attente Outbox</p>
            <p className="text-lg font-bold text-gray-900">0 Opération en attente</p>
            <span className="text-[10px] text-gray-400 font-medium">Toutes les mutations sont purgées</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">Économie Données Mobiles</p>
            <p className="text-lg font-bold text-gray-900">Compression Delta (gzip/br)</p>
            <span className="text-[10px] text-purple-700 font-medium">Consommation &lt; 2.4 Mo/jour</span>
          </div>
        </div>
      </div>

      {/* Tables Cursor Sync Detail */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Curseurs de synchronisation par table (Drift / SQLite)</h2>

        <div className="divide-y divide-gray-100">
          {[
            { table: 'students', total: 4832, synced: 4832, lastSync: 'Il y a 2 minutes', status: 'Synchronisé' },
            { table: 'attendance_records', total: 18420, synced: 18420, lastSync: 'A l\'instant', status: 'En direct' },
            { table: 'teaching_units (UE)', total: 142, synced: 142, lastSync: 'Il y a 10 minutes', status: 'Synchronisé' },
            { table: 'schedules', total: 320, synced: 320, lastSync: 'Il y a 5 minutes', status: 'Synchronisé' },
            { table: 'video_conferences', total: 12, synced: 12, lastSync: 'Il y a 1 heure', status: 'Synchronisé' },
          ].map((item) => (
            <div key={item.table} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <Database size={16} className="text-[#1E3A8A]" />
                <div>
                  <span className="font-mono font-bold text-gray-900">{item.table}</span>
                  <span className="text-gray-400 block">{item.total} enregistrements locaux</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                  <CheckCircle2 size={12} /> {item.status}
                </span>
                <span className="text-gray-400 block mt-1">{item.lastSync}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
