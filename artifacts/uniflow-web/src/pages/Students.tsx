import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Download, MoreHorizontal, Edit, Trash2, Eye 
} from 'lucide-react';
import { mockStudents } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filiereFilter, setFiliereFilter] = useState('toutes');
  const [niveauFilter, setNiveauFilter] = useState('tous');
  
  const filteredStudents = mockStudents.filter(s => {
    const matchesSearch = s.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.matricule.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFiliere = filiereFilter === 'toutes' || s.filiere === filiereFilter;
    const matchesNiveau = niveauFilter === 'tous' || s.niveau === niveauFilter;
    return matchesSearch && matchesFiliere && matchesNiveau;
  });

  const stats = [
    { label: 'Total', value: mockStudents.length, color: 'bg-blue-500' },
    { label: 'L1', value: mockStudents.filter(s=>s.niveau==='L1').length, color: 'bg-indigo-500' },
    { label: 'L2', value: mockStudents.filter(s=>s.niveau==='L2').length, color: 'bg-purple-500' },
    { label: 'L3', value: mockStudents.filter(s=>s.niveau==='L3').length, color: 'bg-fuchsia-500' },
    { label: 'Master', value: mockStudents.filter(s=>s.niveau.startsWith('M')).length, color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Gestion des Étudiants</h1>
          <p className="text-muted-foreground mt-1">Consultez, ajoutez et modifiez les dossiers étudiants.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-medium bg-card">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="font-medium">
                <Plus className="mr-2 h-4 w-4" /> Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter un étudiant</DialogTitle>
                <DialogDescription>
                  Créez un nouveau dossier étudiant. Remplissez tous les champs obligatoires.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nom" className="text-right">Nom</Label>
                  <Input id="nom" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prenom" className="text-right">Prénom</Label>
                  <Input id="prenom" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="matricule" className="text-right">Matricule</Label>
                  <Input id="matricule" className="col-span-3" placeholder="Ex: 24A001" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="filiere" className="text-right">Filière</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner une filière" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INFO">Informatique (INFO)</SelectItem>
                      <SelectItem value="MATH">Mathématiques (MATH)</SelectItem>
                      <SelectItem value="PHYS">Physique (PHYS)</SelectItem>
                      <SelectItem value="CHIMIE">Chimie (CHIMIE)</SelectItem>
                      <SelectItem value="SVT">SVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="niveau" className="text-right">Niveau</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L1">Licence 1</SelectItem>
                      <SelectItem value="L2">Licence 2</SelectItem>
                      <SelectItem value="L3">Licence 3</SelectItem>
                      <SelectItem value="M1">Master 1</SelectItem>
                      <SelectItem value="M2">Master 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Enregistrer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
            <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
            <span className="text-muted-foreground">{stat.label}</span>
            <span className="font-bold">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Rechercher par nom, prénom ou matricule..." 
            className="pl-10 h-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Select value={filiereFilter} onValueChange={setFiliereFilter}>
            <SelectTrigger className="w-[160px] h-10">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Filière" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toutes">Toutes filières</SelectItem>
              <SelectItem value="INFO">INFO</SelectItem>
              <SelectItem value="MATH">MATH</SelectItem>
              <SelectItem value="PHYS">PHYS</SelectItem>
              <SelectItem value="CHIMIE">CHIMIE</SelectItem>
              <SelectItem value="SVT">SVT</SelectItem>
            </SelectContent>
          </Select>

          <Select value={niveauFilter} onValueChange={setNiveauFilter}>
            <SelectTrigger className="w-[140px] h-10">
              <SelectValue placeholder="Niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous niveaux</SelectItem>
              <SelectItem value="L1">L1</SelectItem>
              <SelectItem value="L2">L2</SelectItem>
              <SelectItem value="L3">L3</SelectItem>
              <SelectItem value="M1">M1</SelectItem>
              <SelectItem value="M2">M2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Étudiant</th>
                <th className="px-6 py-4 font-semibold">Matricule</th>
                <th className="px-6 py-4 font-semibold">Filière / Niveau</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Statut</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                          {student.nom.charAt(0)}{student.prenom.charAt(0)}
                        </div>
                        <div className="font-medium text-foreground">{student.nom} {student.prenom}</div>
                      </div>
                    </td>
                    <td className="px-6 py-3 font-mono text-muted-foreground">{student.matricule}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-muted font-bold text-xs">{student.filiere}</Badge>
                        <span className="text-xs font-medium text-muted-foreground">{student.niveau}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{student.email}</td>
                    <td className="px-6 py-3">
                      <Badge variant={
                        student.statut === 'Inscrit' ? 'default' : 
                        student.statut === 'Suspendu' ? 'destructive' : 'secondary'
                      } className={student.statut === 'Inscrit' ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' : ''}>
                        {student.statut}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="sr-only">Ouvrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> Voir profil</DropdownMenuItem>
                          <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Modifier</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Désinscrire</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Aucun étudiant ne correspond à vos filtres.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border p-4 flex items-center justify-between text-sm text-muted-foreground bg-muted/20">
          <div>Affichage de {filteredStudents.length} sur {mockStudents.length} étudiants</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Précédent</Button>
            <Button variant="outline" size="sm" disabled>Suivant</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
