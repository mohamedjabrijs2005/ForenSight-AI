import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Car, MapPin, Battery, Radio, Shield, Send } from 'lucide-react';

interface PatrolUnit {
  id: string;
  type: string;
  status: string;
  officers: string[];
  location: { lat: number; lng: number; address: string };
  assignment: string;
  eta: string;
  callSign: string;
  batteryLevel: number;
}

export default function Patrols() {
  const [units, setUnits] = useState<PatrolUnit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/patrols')
      .then(res => res.json())
      .then(data => {
        setUnits(data);
        setLoading(false);
      });
  }, []);

  const handleDispatch = (id: string) => {
    // Optimistic UI update
    setUnits(prev => prev.map(unit => 
      unit.id === id 
        ? { ...unit, status: 'En Route', assignment: 'New Dispatch Order' } 
        : unit
    ));
    
    // In a real app, this would be a POST/PUT request to the backend
    // fetch(`/api/patrols/${id}/dispatch`, { method: 'POST' })
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Active Patrol Management</h2>
        </div>
        <div className="flex gap-4 text-sm font-medium">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Available</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> En Route</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> On Scene</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {units.map((unit) => {
          const statusColor = 
            unit.status === 'Available' ? 'text-green-500 bg-green-500/10 border-green-500/20' :
            unit.status === 'En Route' ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' :
            'text-red-500 bg-red-500/10 border-red-500/20';

          return (
            <motion.div
              key={unit.id}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{unit.callSign}</h3>
                    <p className="text-sm text-muted-foreground">{unit.type}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColor}`}>
                  {unit.status.toUpperCase()}
                </div>
              </div>

              <div className="bg-muted/30 p-3 rounded-lg border border-border/50 text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{unit.location.address}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {unit.location.lat}, {unit.location.lng}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Radio className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="font-medium line-clamp-2">{unit.assignment}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Battery className="w-4 h-4" />
                  <span>{unit.batteryLevel}%</span>
                </div>
                <div className="font-mono bg-background px-2 py-1 rounded border border-border">
                  ETA: {unit.eta}
                </div>
              </div>

              <div className="mt-auto pt-2 border-t border-border flex gap-2">
                <button 
                  onClick={() => handleDispatch(unit.id)}
                  disabled={unit.status === 'En Route' || unit.status === 'On Scene'}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    unit.status === 'Available' 
                      ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  {unit.status === 'Available' ? 'Dispatch' : 'Dispatched'}
                </button>
                <button className="px-4 bg-muted hover:bg-muted/80 py-2 rounded-lg text-sm font-semibold transition-colors">
                  Details
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
