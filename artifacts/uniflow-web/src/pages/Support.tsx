import { useState } from 'react';
import { HelpCircle, Search, MessageCircle, FileText, ChevronRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { mockTickets } from '@/lib/mock-data';

export default function Support() {
  const [activeTab, setActiveTab] = useState('faq');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] rounded-2xl p-8 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-3xl font-bold mb-2">Comment pouvons-nous vous aider ?</h1>
          <p className="text-blue-100 mb-6">Recherchez dans notre base de connaissances ou contactez l'assistance UniFlow.</p>
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Décrivez votre problème..."
              className="w-full pl-12 pr-4 py-3.5 bg-white text-gray-900 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
        <div className="relative z-10 shrink-0 hidden md:block">
          <img src="/uniflow-mascot-owl.png" alt="Mascotte Owl UniFlow" className="w-36 h-36 object-contain drop-shadow-xl" />
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-24 right-12 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl" />
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('faq')}
          className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
            activeTab === 'faq' ? 'text-[#1E3A8A]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Centre d'aide & FAQ
          {activeTab === 'faq' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A8A] rounded-t-full" />}
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
            activeTab === 'tickets' ? 'text-[#1E3A8A]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Mes requêtes
          {activeTab === 'tickets' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A8A] rounded-t-full" />}
        </button>
      </div>

      {activeTab === 'faq' ? (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <h2 className="font-bold text-gray-900 text-lg">Sujets fréquents</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Connexion & Compte', icon: AlertCircle, count: 12 },
                { title: 'Notes & Bulletins', icon: FileText, count: 8 },
                { title: 'Problèmes techniques', icon: HelpCircle, count: 15 },
                { title: 'Absences & Justificatifs', icon: Clock, count: 5 },
              ].map((category) => (
                <div key={category.title} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-[#1E3A8A]/30 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-[#1E3A8A]/5 rounded-lg text-[#1E3A8A]">
                      <category.icon size={20} />
                    </div>
                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{category.count} articles</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#1E3A8A] transition-colors">{category.title}</h3>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-50">
                <h3 className="font-semibold text-gray-900">Articles recommandés</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  'Comment justifier une absence ?',
                  'Je n\'arrive pas à soumettre mon devoir',
                  'Comment modifier mon mot de passe ?',
                  'Où trouver mon emploi du temps officiel ?'
                ].map((article) => (
                  <div key={article} className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-gray-400 group-hover:text-[#0D9488]" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{article}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#F0FDFA] p-6 rounded-xl border border-[#0D9488]/20 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0D9488] mx-auto mb-4 shadow-sm">
                <MessageCircle size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Vous ne trouvez pas de réponse ?</h3>
              <p className="text-sm text-gray-600 mb-5">Notre équipe d'assistance est là pour vous aider avec vos problèmes.</p>
              <button onClick={() => setActiveTab('tickets')} className="w-full bg-[#0D9488] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0f766e] transition-colors shadow-sm">
                Ouvrir un ticket
              </button>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Contacts urgents</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="text-gray-500 text-xs mb-0.5">Scolarité</div>
                  <div className="font-medium text-gray-900">scolarite@uniflow.cm</div>
                  <div className="text-gray-600">+237 222 22 22 22</div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500 text-xs mb-0.5">Support Technique</div>
                  <div className="font-medium text-gray-900">tech@uniflow.cm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Vos requêtes récentes</h2>
            <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors shadow-sm">
              Nouveau ticket
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {mockTickets.map((ticket) => (
              <div key={ticket.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    ticket.statut === 'Open' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {ticket.statut === 'Open' ? <Clock size={16} /> : <CheckCircle2 size={16} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#1E3A8A] transition-colors">{ticket.sujet}</h3>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span>Dernière mise à jour : {ticket.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    ticket.statut === 'Open' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    {ticket.statut === 'Open' ? 'En cours' : 'Résolu'}
                  </span>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}