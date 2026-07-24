import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Check, GraduationCap, BookUser, UserCog } from 'lucide-react';

const steps = ['Informations', 'Sécurité', 'Rôle', 'Académique'];

const roleOptions = [
  { id: 'etudiant', label: 'Étudiant', icon: GraduationCap, desc: 'Je suis un étudiant inscrit à l\'université' },
  { id: 'enseignant', label: 'Enseignant', icon: BookUser, desc: 'J\'enseigne un ou plusieurs cours' },
  { id: 'admin', label: 'Administrateur', icon: UserCog, desc: 'Je gère l\'administration universitaire' },
];

export default function Register() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('etudiant');
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', telephone: '', password: '', confirm: '', filiere: '', niveau: '' });

  function next() { if (step < 3) setStep(step + 1); else navigate('/dashboard'); }
  function prev() { if (step > 0) setStep(step - 1); }

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left */}
      <div className="hidden md:flex flex-col w-[45%] bg-[#1E3A8A] relative overflow-hidden p-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#0D9488]/20" />
        </div>
        <img src="/uniflow-logo.png" alt="UniFlow" className="h-9 object-contain self-start brightness-0 invert relative z-10" />
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Rejoignez UniFlow</h2>
          <p className="text-blue-200 leading-relaxed mb-8">Créez votre compte en quelques étapes et accédez à l'ensemble de la plateforme.</p>
          <div className="space-y-3">
            {['Gestion de vos cours et devoirs', 'Suivi de vos présences', 'Communication avec enseignants', 'Emploi du temps interactif'].map((f) => (
              <div key={f} className="flex items-center gap-3 text-blue-100 text-sm">
                <span className="w-5 h-5 rounded-full bg-[#0D9488] flex items-center justify-center shrink-0"><Check size={12} /></span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-8 flex justify-center">
            <img src="/uniflow-logo.png" alt="UniFlow" className="h-9 object-contain" />
          </div>

          {/* Steps */}
          <div className="flex items-center gap-0 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={['w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    i < step ? 'bg-[#0D9488] text-white' : i === step ? 'bg-[#1E3A8A] text-white' : 'bg-gray-100 text-gray-400'].join(' ')}>
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={['text-[10px] font-medium mt-1', i === step ? 'text-[#1E3A8A]' : 'text-gray-400'].join(' ')}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={['flex-1 h-0.5 mx-2 mb-4', i < step ? 'bg-[#0D9488]' : 'bg-gray-200'].join(' ')} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom</label>
                  <input value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})} placeholder="Emma" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
                  <input value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} placeholder="Martin" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="emma.martin@uniflow.cm" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                <input value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} placeholder="+237 6XX XX XX XX" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
                <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Min. 8 caractères" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmer le mot de passe</label>
                <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} placeholder="Répétez le mot de passe" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 mb-3">Sélectionnez votre rôle</p>
              {roleOptions.map((r) => (
                <button key={r.id} type="button" onClick={() => setRole(r.id)}
                  className={['w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all',
                    role === r.id ? 'border-[#1E3A8A] bg-[#1E3A8A]/5' : 'border-gray-200 hover:border-gray-300'].join(' ')}>
                  <div className={['w-10 h-10 rounded-xl flex items-center justify-center shrink-0', role === r.id ? 'bg-[#1E3A8A] text-white' : 'bg-gray-100 text-gray-500'].join(' ')}>
                    <r.icon size={20} />
                  </div>
                  <div>
                    <p className={['font-semibold text-sm', role === r.id ? 'text-[#1E3A8A]' : 'text-gray-900'].join(' ')}>{r.label}</p>
                    <p className="text-xs text-gray-500">{r.desc}</p>
                  </div>
                  {role === r.id && <Check size={18} className="ml-auto text-[#1E3A8A]" />}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Filière</label>
                <select value={form.filiere} onChange={e => setForm({...form, filiere: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition bg-white">
                  <option value="">Choisir une filière</option>
                  <option>Informatique</option><option>Mathématiques</option><option>Physique</option><option>Chimie</option><option>SVT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Niveau</label>
                <select value={form.niveau} onChange={e => setForm({...form, niveau: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition bg-white">
                  <option value="">Choisir un niveau</option>
                  <option>Licence 1</option><option>Licence 2</option><option>Licence 3</option><option>Master 1</option><option>Master 2</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={prev} className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                Retour
              </button>
            )}
            <button onClick={next} className="flex-1 bg-[#1E3A8A] text-white py-3 rounded-xl font-semibold hover:bg-[#1E3A8A]/90 transition shadow-sm">
              {step === 3 ? 'Créer le compte' : 'Continuer'}
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-400">
            Déjà un compte ?{' '}
            <Link href="/auth" className="text-[#1E3A8A] hover:underline font-medium">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
