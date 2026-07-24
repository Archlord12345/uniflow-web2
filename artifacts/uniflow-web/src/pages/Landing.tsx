import { Link } from 'wouter';
import { BookOpen, Users, Wifi, Shield, ArrowRight, CheckCircle } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <img src="/uniflow-logo.png" alt="UniFlow" className="h-9 object-contain" />
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600 font-medium">
            <a href="#fonctionnalites" className="hover:text-[#1E3A8A] transition-colors">Fonctionnalités</a>
            <a href="#impact" className="hover:text-[#1E3A8A] transition-colors">À propos</a>
            <a href="#tarifs" className="hover:text-[#1E3A8A] transition-colors">Tarifs</a>
            <a href="#contact" className="hover:text-[#1E3A8A] transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth" className="text-sm font-medium text-gray-700 hover:text-[#1E3A8A] transition-colors px-4 py-2">
              Se connecter
            </Link>
            <Link href="/register" className="text-sm font-semibold bg-[#1E3A8A] text-white px-5 py-2.5 rounded-lg hover:bg-[#1e3a8a]/90 transition-colors">
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#1E3A8A]/8 text-[#1E3A8A] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse" />
              Plateforme éducative tout-en-un
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
              Simplifiez l'éducation,<br />
              <span className="text-[#1E3A8A]">libérez le potentiel</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              UniFlow centralise vos cours, communications, planifications et bien plus encore, dans une interface intuitive et moderne.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register" className="flex items-center gap-2 bg-[#1E3A8A] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[#1e3a8a]/90 transition-all shadow-md hover:shadow-lg">
                Commencer gratuitement
                <ArrowRight size={18} />
              </Link>
              <Link href="/auth" className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3.5 rounded-xl font-semibold hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-colors">
                Se connecter
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Déjà utilisateur ?{' '}
              <Link href="/auth" className="text-[#1E3A8A] font-medium hover:underline">Se connecter</Link>
            </p>
          </div>

          {/* Hero illustration — mockup UI */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] rounded-2xl p-1 shadow-2xl overflow-hidden">
              <div className="bg-white rounded-xl p-3 space-y-3">
                {/* Mock topbar */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 h-6 bg-gray-100 rounded-md mx-2 flex items-center px-3">
                    <span className="text-xs text-gray-400">https://www.uniflow.education</span>
                  </div>
                </div>
                {/* Campus Image Header */}
                <div className="relative h-48 rounded-lg overflow-hidden group">
                  <img src="/hero-campus.jpg" alt="Campus Université de Yaoundé I" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <span className="bg-[#0D9488] text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider mb-1 inline-block">Campus Connecté</span>
                      <h4 className="text-white text-sm font-bold">Université de Yaoundé I — UniFlow</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Shadow decoration */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#0D9488]/10 rounded-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* Pourquoi UniFlow */}
      <section id="fonctionnalites" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Pourquoi choisir UniFlow ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Une solution pensée pour les universités africaines, accessible partout, même hors connexion.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, color: '#1E3A8A', bg: '#EFF6FF', titre: 'Tout-en-un', desc: 'Cours, emplois du temps, devoirs, notes et plus encore.' },
              { icon: Users, color: '#0D9488', bg: '#F0FDFA', titre: 'Collaboratif', desc: 'Enseignants et étudiants dans un même espace intuitif.' },
              { icon: Wifi, color: '#F59E0B', bg: '#FFFBEB', titre: 'Accessible', desc: 'Fonctionne hors-ligne, adapté aux zones à faible connexion.' },
              { icon: Shield, color: '#8B5CF6', bg: '#F5F3FF', titre: 'Sécurisé', desc: 'Données protégées et authentification multi-rôle.' },
            ].map((f) => (
              <div key={f.titre} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: f.bg }}>
                  <f.icon size={24} color={f.color} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.titre}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="impact" className="py-20 bg-[#1E3A8A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { val: '4 832', label: 'Étudiants inscrits' },
              { val: '127', label: 'Cours actifs' },
              { val: '48/62', label: 'Salles disponibles' },
              { val: '87%', label: 'Taux de présence moyen' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-bold mb-2">{s.val}</div>
                <div className="text-blue-200 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features detail */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Gérez vos présences en temps réel</h2>
              <p className="text-gray-500 mb-6">Générateur de QR code, marquage par délégué, alertes automatiques et tableaux de bord complets pour chaque cours.</p>
              <ul className="space-y-3">
                {['QR code par séance en temps réel', 'Marquage par le délégué de classe', 'Alertes automatiques aux absents', 'Export CSV et PDF des données'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle size={18} className="text-[#0D9488] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#F0FDFA] to-[#EFF6FF] rounded-2xl p-8 flex items-center justify-center min-h-64">
              <div className="text-center">
                <div className="text-7xl mb-4">📊</div>
                <div className="text-2xl font-bold text-[#1E3A8A]">87%</div>
                <div className="text-sm text-gray-500">Taux de présence moyen</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <img src="/uniflow-logo.png" alt="UniFlow" className="h-8 object-contain brightness-0 invert opacity-80" />
            <p className="text-sm text-center">© 2024 UniFlow — KERNEL FORGE · Université de Yaoundé I</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">CGU</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
