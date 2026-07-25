import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, UserSearch, AlertTriangle, Crosshair, MapPin, ShieldAlert, Fingerprint, History } from 'lucide-react';

interface Suspect {
  id: string;
  name: string;
  alias: string;
  status: string;
  threatLevel: string;
  lastKnown: { lat: number; lng: number };
  associates: string[];
  crimes: string[];
  image: string;
  description: string;
  activeTracking: boolean;
}

export default function Intelligence() {
  const [suspects, setSuspects] = useState<Suspect[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);

  useEffect(() => {
    fetch('/api/intelligence')
      .then(res => res.json())
      .then(data => {
        setSuspects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch intelligence", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-primary">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="animate-pulse">Accessing Interpol Databases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full gap-6">
      {/* List View */}
      <div className={`flex-1 transition-all duration-300 ${selectedSuspect ? 'max-w-md hidden md:block' : 'w-full'}`}>
        <div className="flex items-center gap-3 mb-6">
          <UserSearch className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Criminal Intelligence</h2>
        </div>
        
        <div className="grid gap-4">
          {suspects.map((suspect) => (
            <motion.div
              key={suspect.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSuspect(suspect)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedSuspect?.id === suspect.id 
                  ? 'bg-primary/10 border-primary/50' 
                  : 'bg-card/50 border-border hover:border-primary/30'
              }`}
            >
              <div className="flex gap-4">
                <img src={suspect.image} alt={suspect.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{suspect.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      suspect.threatLevel === 'HIGH' ? 'bg-red-500/20 text-red-500' : 
                      suspect.threatLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500' : 
                      'bg-green-500/20 text-green-500'
                    }`}>
                      {suspect.threatLevel} RISK
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">AKA: "{suspect.alias}"</p>
                  <p className="text-sm font-medium mt-2">{suspect.status}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <AnimatePresence>
        {selectedSuspect && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-1 bg-card/80 border border-border rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm flex flex-col"
          >
            <div className="p-6 border-b border-border bg-muted/20 flex justify-between items-start">
              <div className="flex gap-6 items-center">
                <div className="relative">
                  <img src={selectedSuspect.image} alt={selectedSuspect.name} className="w-24 h-24 rounded-lg object-cover shadow-xl" />
                  {selectedSuspect.activeTracking && (
                    <div className="absolute -bottom-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1 animate-pulse">
                      <Crosshair className="w-3 h-3" /> TRACKING
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                    {selectedSuspect.name.toUpperCase()}
                  </h2>
                  <p className="text-lg text-muted-foreground font-mono">{selectedSuspect.id}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 bg-secondary/50 rounded-md text-sm">{selectedSuspect.alias}</span>
                    <span className="px-3 py-1 bg-secondary/50 rounded-md text-sm">{selectedSuspect.status}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedSuspect(null)} className="text-muted-foreground hover:text-foreground md:hidden">
                Close
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <section>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                    <History className="w-4 h-4" /> Criminal Record
                  </h4>
                  <ul className="space-y-2">
                    {selectedSuspect.crimes.map(c => (
                      <li key={c} className="flex items-center gap-2 text-sm bg-destructive/10 text-destructive-foreground px-3 py-2 rounded-md">
                        <AlertTriangle className="w-4 h-4" /> {c}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                    <MapPin className="w-4 h-4" /> Last Known Location
                  </h4>
                  <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                    LAT: {selectedSuspect.lastKnown.lat}<br/>
                    LNG: {selectedSuspect.lastKnown.lng}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                    <Fingerprint className="w-4 h-4" /> Profile Summary
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground bg-muted/20 p-4 rounded-lg border border-border/50">
                    {selectedSuspect.description}
                  </p>
                </section>

                <section>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                    <ShieldAlert className="w-4 h-4" /> Known Associates
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSuspect.associates.map(a => (
                      <span key={a} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {a}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
