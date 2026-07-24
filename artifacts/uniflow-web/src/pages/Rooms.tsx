import React, { useState } from 'react';
import { 
  MapPin, Wifi, Projector, Monitor, AirVent, Settings2, CalendarRange 
} from 'lucide-react';
import { mockRooms } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';

export default function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState(mockRooms[0]);

  const getEquipmentIcon = (eq: string) => {
    switch(eq) {
      case 'wifi': return <Wifi size={14} />;
      case 'projector': return <Projector size={14} />;
      case 'computer': return <Monitor size={14} />;
      case 'ac': return <AirVent size={14} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Libre': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Occupee': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Maintenance': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Gestion des Salles</h1>
          <p className="text-muted-foreground mt-1">Allocation, équipements et disponibilité des espaces.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-medium bg-card">Nouvelle Salle</Button>
          <Button className="font-medium">Planifier Maintenance</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Rooms List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border p-4 rounded-xl shadow-sm flex items-center justify-between mb-2">
            <h2 className="font-bold font-heading">Toutes les salles ({mockRooms.length})</h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Libre (4)</Badge>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Occupée (3)</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRooms.map(room => (
              <button 
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`text-left p-5 rounded-xl border transition-all ${
                  selectedRoom.id === room.id 
                    ? 'bg-primary/5 border-primary ring-1 ring-primary/20 shadow-md' 
                    : 'bg-card border-border hover:border-primary/30 hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-primary h-5 w-5" />
                    <h3 className="font-bold text-lg font-heading">{room.name}</h3>
                  </div>
                  <Badge variant="outline" className={getStatusColor(room.status)}>{room.status}</Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <Badge variant="secondary" className="font-medium">{room.type}</Badge>
                  <span>{room.capacity} places</span>
                </div>
                <div className="flex items-center gap-2 border-t border-border pt-3">
                  {room.equipment.map((eq, i) => (
                    <div key={i} className="h-7 w-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground" title={eq}>
                      {getEquipmentIcon(eq)}
                    </div>
                  ))}
                  {room.equipment.length === 0 && <span className="text-xs italic text-muted-foreground">Aucun équipement</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Room Details & Chart */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden sticky top-24">
            <div className="p-6 border-b border-border bg-gradient-to-br from-primary/10 to-transparent">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold font-heading">{selectedRoom.name}</h2>
                <Badge className={getStatusColor(selectedRoom.status)}>{selectedRoom.status}</Badge>
              </div>
              <p className="text-muted-foreground">{selectedRoom.type} • Capacité maximale: {selectedRoom.capacity}</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex gap-2">
                <Button className="flex-1 font-bold" variant="default">
                  <CalendarRange className="mr-2 h-4 w-4" /> Réserver
                </Button>
                <Button className="flex-1 font-bold" variant="outline">
                  <Settings2 className="mr-2 h-4 w-4" /> Maintenance
                </Button>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Taux d'occupation (semaine)</h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { day: 'Lun', occ: 85 }, { day: 'Mar', occ: 90 }, 
                      { day: 'Mer', occ: 60 }, { day: 'Jeu', occ: 75 }, 
                      { day: 'Ven', occ: 40 }
                    ]} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                      <RechartsTooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                      <Bar dataKey="occ" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Prochains événements</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg border border-border">
                    <div>
                      <div className="font-bold text-sm">Aujourd'hui, 14h00</div>
                      <div className="text-xs text-muted-foreground">INF301 - Dr. Nkam</div>
                    </div>
                    <Badge variant="outline" className="bg-card">2h</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg border border-border">
                    <div>
                      <div className="font-bold text-sm">Aujourd'hui, 16h30</div>
                      <div className="text-xs text-muted-foreground">MAT201 - Pr. Fotso</div>
                    </div>
                    <Badge variant="outline" className="bg-card">1.5h</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
