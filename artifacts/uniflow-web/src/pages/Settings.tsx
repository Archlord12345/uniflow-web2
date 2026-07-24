import React, { useState, useEffect } from 'react';
import { 
  User, Lock, Bell, Palette, HardDrive, Save, Moon, Sun, Check 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
  const [theme, setTheme] = useState<'light'|'dark'>('dark');

  // Sync theme with HTML class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const colors = [
    { name: 'Indigo', hex: 'hsl(217 91% 60%)' },
    { name: 'Emeraude', hex: 'hsl(142 71% 45%)' },
    { name: 'Violet', hex: 'hsl(262 83% 58%)' },
    { name: 'Rose', hex: 'hsl(346 87% 60%)' },
    { name: 'Ambre', hex: 'hsl(38 92% 50%)' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground mt-1">Gérez votre compte, l'apparence et les configurations du système.</p>
      </div>

      <Tabs defaultValue="profil" className="w-full">
        <TabsList className="grid grid-cols-5 w-full bg-card border border-border h-12 rounded-lg p-1">
          <TabsTrigger value="profil" className="flex gap-2"><User size={16} /> Profil</TabsTrigger>
          <TabsTrigger value="apparence" className="flex gap-2"><Palette size={16} /> Apparence</TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2"><Bell size={16} /> Notifs</TabsTrigger>
          <TabsTrigger value="securite" className="flex gap-2"><Lock size={16} /> Sécurité</TabsTrigger>
          <TabsTrigger value="systeme" className="flex gap-2"><HardDrive size={16} /> Système</TabsTrigger>
        </TabsList>

        <div className="mt-6 bg-card border border-border rounded-xl shadow-sm p-6 md:p-8 min-h-[400px]">
          <TabsContent value="profil" className="m-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-3xl font-heading uppercase border-4 border-background shadow-lg">
                AD
              </div>
              <div>
                <h3 className="text-lg font-bold">Photo de profil</h3>
                <p className="text-sm text-muted-foreground mb-3">Format JPG, GIF ou PNG. Max 2Mo.</p>
                <div className="flex gap-2">
                  <Button size="sm">Changer</Button>
                  <Button size="sm" variant="outline">Supprimer</Button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom complet</Label>
                <Input id="nom" defaultValue="Admin Principal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Adresse Email</Label>
                <Input id="email" defaultValue="admin@uniflow.cm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle (Lecture seule)</Label>
                <Input id="role" defaultValue="Super Administrateur" disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="departement">Département</Label>
                <Input id="departement" defaultValue="Direction Générale" />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
              <Button className="font-bold"><Save className="w-4 h-4 mr-2" /> Enregistrer les modifications</Button>
            </div>
          </TabsContent>

          <TabsContent value="apparence" className="m-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h3 className="text-lg font-bold mb-4">Thème</h3>
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <button 
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-border bg-transparent hover:border-primary/50'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900"><Sun size={20} /></div>
                  <span className="font-bold">Mode Clair</span>
                </button>
                <button 
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border bg-transparent hover:border-primary/50'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-100"><Moon size={20} /></div>
                  <span className="font-bold">Mode Sombre</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="text-lg font-bold mb-4">Couleur d'accentuation</h3>
              <div className="flex gap-4">
                {colors.map((color, i) => (
                  <button 
                    key={color.name}
                    className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-transform hover:scale-110 ${i === 0 ? 'border-card shadow-[0_0_0_2px_hsl(var(--primary))]' : 'border-transparent'}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {i === 0 && <Check size={16} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold mb-4">Préférences de notification</h3>
            
            <div className="space-y-4">
              {[
                { title: "Annulations de cours", desc: "Soyez alerté immédiatement quand un enseignant annule." },
                { title: "Changements de salles", desc: "Notifications lors des modifications de planning." },
                { title: "Alertes de présence", desc: "Quand le taux global descend sous les 70%." },
                { title: "Rapports hebdomadaires", desc: "Recevoir le récapitulatif par email le vendredi." }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                  <div>
                    <div className="font-bold">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                  <Switch defaultChecked={i !== 3} />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="securite" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold mb-4">Mot de passe</h3>
            <div className="grid gap-4 max-w-md">
              <div className="space-y-2">
                <Label>Mot de passe actuel</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Nouveau mot de passe</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirmer le nouveau mot de passe</Label>
                <Input type="password" />
              </div>
              <Button className="w-fit mt-2">Mettre à jour le mot de passe</Button>
            </div>
          </TabsContent>

          <TabsContent value="systeme" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 p-4 rounded-lg mb-6 flex gap-3">
              <AlertTriangle className="shrink-0" />
              <div className="text-sm font-medium">Attention: Ces paramètres affectent l'ensemble de l'institution. Seuls les super administrateurs peuvent les modifier.</div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Nom de l'Institution</Label>
                <Input defaultValue="Université de Yaoundé I" />
              </div>
              <div className="space-y-2">
                <Label>Année Académique Courante</Label>
                <Input defaultValue="2023-2024" />
              </div>
              <div className="space-y-2">
                <Label>Semestre Actuel</Label>
                <Input defaultValue="Semestre 1" />
              </div>
            </div>

            <div className="pt-6 border-t border-border mt-8">
              <h3 className="text-lg font-bold mb-4">Stockage & Base de données</h3>
              <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary"><HardDrive /></div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold">Capacité utilisée</span>
                    <span>45.2 Go / 100 Go</span>
                  </div>
                  <div className="h-2 bg-card rounded-full overflow-hidden border border-border">
                    <div className="h-full bg-primary w-[45%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

// Just to silence linter if icon is used directly
function AlertTriangle(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
}
