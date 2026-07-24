import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Eye, EyeOff, Shield, Users, GraduationCap, UserCog, BookUser } from 'lucide-react';
import { useRole, UserRole } from '@/lib/role-context';

const roles: Array<{ id: UserRole; label: string; icon: any }> = [
  { id: 'etudiant', label: 'Étudiant', icon: GraduationCap },
  { id: 'delegue', label: 'Délégué', icon: Users },
  { id: 'enseignant', label: 'Enseignant', icon: BookUser },
  { id: 'admin', label: 'Administrateur', icon: UserCog },
  { id: 'superadmin', label: 'Super Admin', icon: Shield },
];

export default function Auth() {
  const [, navigate] = useLocation();
  const { role, setRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<UserRole>(role || 'etudiant');
  const [showPwd, setShowPwd] = useState(false);
  const [login, setLogin] = useState('');
  const [pwd, setPwd] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRole(selectedRole);
    if (selectedRole === 'admin' || selectedRole === 'superadmin') {
      navigate('/admin/dashboard');
    } else if (selectedRole === 'enseignant') {
      navigate('/teacher/dashboard');
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <div className="min-h-screen flex font-sans">
      {/* ── Gauche — navy ── */}
      <div className="hidden md:flex flex-col w-[55%] bg-[#1E3A8A] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute top-1/2 -right-24 w-64 h-64 rounded-full bg-[#0D9488]/20" />
          <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-white/5" />
        </div>

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo blanc */}
          <img src="/uniflow-logo.png" alt="UniFlow" className="h-10 object-contain self-start brightness-0 invert" />

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Gérez votre institution<br />avec précision.
            </h2>
            <p className="text-blue-200 text-lg leading-relaxed mb-10">
              La plateforme centralisée pour les étudiants, les enseignants et l'administration universitaire.
            </p>

            {/* Floating cards mockup */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 max-w-sm">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold shrink-0">EM</div>
                <div>
                  <p className="text-white text-sm font-semibold">Emma Martin</p>
                  <p className="text-blue-200 text-xs">Étudiante · Licence 2 Informatique</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-green-300 text-xs">En ligne</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 max-w-sm ml-8">
                <div className="w-10 h-10 rounded-full bg-[#0D9488]/30 flex items-center justify-center text-white font-bold shrink-0">DN</div>
                <div>
                  <p className="text-white text-sm font-semibold">Dr. Nkam</p>
                  <p className="text-blue-200 text-xs">Enseignant · Algorithmique</p>
                </div>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-blue-300 text-xs">
            UniFlow — KERNEL FORGE · Université de Yaoundé I
          </p>
        </div>
      </div>

      {/* ── Droite — formulaire ── */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="md:hidden mb-8 flex justify-center">
            <img src="/uniflow-logo.png" alt="UniFlow" className="h-9 object-contain" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Bienvenue</h2>
          <p className="text-gray-500 text-sm mb-8">Connectez-vous à votre espace personnel.</p>

          {/* Role selector */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Je suis un...</p>
            <div className="flex flex-wrap gap-2">
              {roles.map((r) => {
                const active = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={[
                      'flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium border transition-all',
                      active
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#1E3A8A] hover:text-[#1E3A8A]',
                    ].join(' ')}
                  >
                    <r.icon size={16} />
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Identifiant ou Email</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Ex: admin@uniflow.cm ou 21A001"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Mot de passe</label>
                <button type="button" className="text-xs text-[#1E3A8A] hover:underline font-medium">
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0D9488] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0D9488]/90 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              Se connecter →
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Problème de connexion ?{' '}
            <button className="text-[#1E3A8A] hover:underline font-medium">Contacter le support</button>
          </p>

          <p className="mt-3 text-center text-sm text-gray-400">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-[#1E3A8A] hover:underline font-medium">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
