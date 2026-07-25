import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ShieldAlert, FolderOpen, AlertTriangle, FileText, ChevronRight, X } from 'lucide-react';

interface CrimeCase {
  id: string;
  title: string;
  status: string;
  severity: string;
  date: string;
  location: string;
  assignedTo: string;
  description: string;
  evidence: string[];
}

export default function Crimes() {
  const [cases, setCases] = useState<CrimeCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CrimeCase | null>(null);

  useEffect(() => {
    fetch('/api/crimes')
      .then(res => res.json())
      .then(data => {
        setCases(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const columns = ['Open', 'Under Investigation', 'In Progress', 'Closed'];

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center gap-3">
        <ShieldAlert className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">Crime Management Board</h2>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Kanban Board */}
        <div className="flex-1 flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {columns.map(status => (
            <div key={status} className="flex-1 min-w-[300px] bg-muted/20 border border-border rounded-xl flex flex-col">
              <div className="p-4 border-b border-border bg-card/50 rounded-t-xl flex justify-between items-center">
                <h3 className="font-semibold text-sm uppercase tracking-wider">{status}</h3>
                <span className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full font-mono">
                  {cases.filter(c => c.status === status).length}
                </span>
              </div>
              <div className="p-4 flex-1 overflow-y-auto space-y-4">
                {cases.filter(c => c.status === status).map(c => (
                  <motion.div
                    layoutId={`case-${c.id}`}
                    key={c.id}
                    onClick={() => setSelectedCase(c)}
                    className="bg-card border border-border p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-muted-foreground">{c.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        c.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
                        c.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-500' :
                        c.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-blue-500/20 text-blue-500'
                      }`}>
                        {c.severity}
                      </span>
                    </div>
                    <h4 className="font-bold text-foreground mb-1">{c.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{c.description}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{c.assignedTo}</span>
                      <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {c.evidence.length}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Case Details Slide Over */}
        <AnimatePresence>
          {selectedCase && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-96 bg-card border-l border-border shadow-2xl flex flex-col absolute right-0 top-0 bottom-0 z-40"
            >
              <div className="p-6 border-b border-border bg-muted/20 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono mb-1">
                    <FolderOpen className="w-4 h-4" /> {selectedCase.id}
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{selectedCase.title}</h2>
                </div>
                <button onClick={() => setSelectedCase(null)} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg border border-border/50 leading-relaxed">
                    {selectedCase.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Status</h4>
                    <span className="text-sm font-medium">{selectedCase.status}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Severity</h4>
                    <span className="text-sm font-bold text-red-500">{selectedCase.severity}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Location</h4>
                    <span className="text-sm font-medium">{selectedCase.location}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Investigator</h4>
                    <span className="text-sm font-medium">{selectedCase.assignedTo}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Logged Evidence</h4>
                  <ul className="space-y-2">
                    {selectedCase.evidence.map((ev, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm bg-secondary/50 px-3 py-2 rounded-lg border border-border">
                        <AlertTriangle className="w-4 h-4 text-primary" /> {ev}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 border-t border-border bg-muted/10">
                <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                  Open Full Case File <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
