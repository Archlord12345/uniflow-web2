import { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Users, Share2, Settings } from 'lucide-react';

export default function VideoConference() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'participants'>('chat');

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <span className="inline-block px-3 py-1 bg-blue-50 text-[#1E3A8A] text-xs font-semibold rounded-full mb-2">
            INF301 — Visioconférence en direct
          </span>
          <h1 className="text-2xl font-bold text-gray-900">Cours d'Algorithmique & Structuration de Données</h1>
          <p className="text-gray-500 text-sm">Enseignant : Dr. Nkam • 42 étudiants connectés</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">En direct</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video shadow-lg flex items-center justify-center border border-gray-800">
            {isVideoOff ? (
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-white text-2xl font-bold border border-gray-700">
                  EM
                </div>
                <p className="text-sm">Caméra désactivée</p>
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-gradient-to-tr from-[#1E3A8A] to-[#0D9488] rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                    DN
                  </div>
                  <h3 className="text-white text-xl font-bold mb-1">Dr. Nkam (Enseignant)</h3>
                  <p className="text-blue-200 text-sm">Présentation : Les Arbres Bioniques & Graphes Orientés</p>
                </div>
              </div>
            )}

            <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Dr. Nkam
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center gap-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition-colors ${
                isMuted ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3 rounded-full transition-colors ${
                isVideoOff ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
            </button>
            <button className="p-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full transition-colors">
              <Settings size={20} />
            </button>
            <button className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors px-6 font-semibold text-sm flex items-center gap-2">
              <PhoneOff size={20} />
              Quitter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[500px]">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'chat' ? 'border-[#1E3A8A] text-[#1E3A8A]' : 'border-transparent text-gray-500'
              }`}
            >
              <MessageSquare size={16} /> Chat
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={`flex-1 py-3 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'participants' ? 'border-[#1E3A8A] text-[#1E3A8A]' : 'border-transparent text-gray-500'
              }`}
            >
              <Users size={16} /> Participants (42)
            </button>
          </div>

          {activeTab === 'chat' ? (
            <div className="flex-1 p-4 flex flex-col justify-between overflow-hidden">
              <div className="space-y-3 overflow-y-auto pr-1 text-xs">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <span className="font-bold text-[#1E3A8A] block mb-1">Dr. Nkam (10:15)</span>
                  <p className="text-gray-700">Bonjour à tous. Merci d'ouvrir le support de cours de la semaine 4.</p>
                </div>
                <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100">
                  <span className="font-bold text-gray-900 block mb-1">Nkolo Marie (10:17)</span>
                  <p className="text-gray-700">Monsieur, le slide 12 est-il disponible en PDF ?</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                <input
                  type="text"
                  placeholder="Posez une question..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
                />
                <button className="bg-[#1E3A8A] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-blue-900 transition-colors">
                  Envoyer
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-3 overflow-y-auto text-xs">
              {['Dr. Nkam (Hôte)', 'Emma Martin (Vous)', 'Nkolo Marie', 'Tchouya Paul', 'Edoa Jean', 'Kamga Celine'].map((p, idx) => (
                <div key={p} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-800">{p}</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                    {idx === 0 ? 'Enseignant' : 'Connecté'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
