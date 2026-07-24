import { useState } from 'react';
import { Search, Edit2, Send } from 'lucide-react';
import { mockMessages } from '@/lib/mock-data';

export default function Messages() {
  const [active, setActive] = useState(mockMessages[0]);
  const [input, setInput] = useState('');

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    setInput('');
  }

  return (
    <div className="h-[calc(100vh-9rem)] flex flex-col space-y-0">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-500 mt-0.5">Communiquez avec vos enseignants et collègues</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white min-h-[500px]">
        {/* Left — conversations list */}
        <div className="w-72 shrink-0 border-r border-gray-100 flex flex-col">
          {/* Search + new */}
          <div className="p-3 border-b border-gray-50 flex items-center gap-2">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input placeholder="Rechercher..." className="w-full pl-8 pr-3 py-2 bg-gray-50 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] border border-transparent" />
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 transition-colors shrink-0">
              <Edit2 size={14} />
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {mockMessages.map(m => {
              const isActive = active?.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActive(m)}
                  className={['w-full flex items-center gap-3 p-3.5 text-left transition-colors hover:bg-gray-50',
                    isActive ? 'bg-[#1E3A8A]/5 border-l-2 border-[#1E3A8A]' : ''].join(' ')}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: m.couleur }}>
                      {m.initiales}
                    </div>
                    {m.nonLu > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1E3A8A] border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
                        {m.nonLu}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className={['text-sm truncate', m.nonLu > 0 ? 'font-bold text-gray-900' : 'font-medium text-gray-700'].join(' ')}>
                        {m.contact}
                      </p>
                      <span className="text-[10px] text-gray-400 shrink-0 ml-1">{m.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{m.dernierMsg}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right — chat */}
        {active ? (
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat header */}
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: active.couleur }}>
                {active.initiales}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{active.contact}</p>
                <p className="text-xs text-gray-500">{active.role}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {active.messages.map(msg => {
                const isMoi = msg.de === 'Emma';
                return (
                  <div key={msg.id} className={['flex', isMoi ? 'justify-end' : 'justify-start'].join(' ')}>
                    {!isMoi && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mr-2 self-end mb-1" style={{ background: active.couleur }}>
                        {active.initiales}
                      </div>
                    )}
                    <div className={['max-w-xs lg:max-w-sm', isMoi ? 'items-end' : 'items-start', 'flex flex-col'].join(' ')}>
                      <div className={['px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                        isMoi ? 'bg-[#1E3A8A] text-white rounded-br-md' : 'bg-gray-100 text-gray-900 rounded-bl-md'].join(' ')}>
                        {msg.texte}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="px-4 py-3 border-t border-gray-100 flex items-center gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Écrire un message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition"
              />
              <button type="submit" className="w-10 h-10 flex items-center justify-center bg-[#0D9488] text-white rounded-xl hover:bg-[#0D9488]/90 transition-colors shadow-sm shrink-0">
                <Send size={16} />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Edit2 size={28} className="text-gray-300" />
              </div>
              <p className="font-semibold text-gray-500">Sélectionnez une conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
