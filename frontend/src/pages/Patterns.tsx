import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Loader2, Info } from 'lucide-react';

interface Node {
  id: string;
  type: 'suspect' | 'incident' | 'location' | 'vehicle';
  label: string;
  danger?: number;
  date?: string;
}

interface Edge {
  source: string;
  target: string;
  label: string;
}

interface PatternData {
  nodes: Node[];
  edges: Edge[];
}

export default function Patterns() {
  const [data, setData] = useState<PatternData | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/patterns')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Pre-calculate positions for a mock force-directed look
  const positions = {
    "node-1": { x: 30, y: 30 },
    "node-2": { x: 70, y: 20 },
    "node-3": { x: 50, y: 15 },
    "node-4": { x: 50, y: 50 },
    "node-5": { x: 20, y: 70 },
    "node-6": { x: 80, y: 60 },
    "node-7": { x: 50, y: 85 }
  } as Record<string, {x: number, y: number}>;

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center gap-3">
        <Network className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">Pattern Discovery</h2>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden relative">
        {/* Network Graph Area */}
        <div className="flex-1 bg-card/30 border border-border rounded-xl relative overflow-hidden flex items-center justify-center">
          
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          
          <div className="relative w-full max-w-3xl aspect-square">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {data.edges.map((edge, i) => {
                const s = positions[edge.source];
                const t = positions[edge.target];
                if (!s || !t) return null;
                return (
                  <g key={i}>
                    <line x1={`${s.x}%`} y1={`${s.y}%`} x2={`${t.x}%`} y2={`${t.y}%`} stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
                    <text x={`${(s.x + t.x)/2}%`} y={`${(s.y + t.y)/2}%`} fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle" dy="-5">{edge.label}</text>
                  </g>
                );
              })}
            </svg>

            {data.nodes.map(node => {
              const pos = positions[node.id];
              if (!pos) return null;
              
              const isSelected = selectedNode?.id === node.id;
              let color = 'bg-blue-500';
              if (node.type === 'suspect') color = 'bg-red-500';
              if (node.type === 'incident') color = 'bg-yellow-500';
              if (node.type === 'location') color = 'bg-green-500';

              return (
                <motion.button
                  key={node.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedNode(node)}
                  className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center shadow-lg transition-shadow cursor-pointer ${color} ${isSelected ? 'ring-4 ring-primary ring-offset-4 ring-offset-background' : 'hover:ring-2 ring-white/50'}`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <span className="sr-only">{node.label}</span>
                  <div className="absolute top-full mt-2 whitespace-nowrap text-xs font-bold bg-background/80 px-2 py-1 rounded backdrop-blur border border-border">
                    {node.label}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Side Panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-80 bg-card border border-border rounded-xl p-6 shadow-2xl flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{selectedNode.type}</span>
                  <h3 className="text-xl font-bold text-foreground mt-1">{selectedNode.label}</h3>
                </div>
                <button onClick={() => setSelectedNode(null)} className="text-muted-foreground hover:text-foreground">
                  ×
                </button>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-3 border border-border/50">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Detailed analytical breakdown for this node. The system has identified this entity via multi-modal synthesis.</p>
                </div>
                
                {selectedNode.danger !== undefined && (
                  <div>
                    <span className="block text-xs font-bold text-muted-foreground">THREAT PROBABILITY</span>
                    <div className="w-full bg-secondary h-2 rounded-full mt-1 overflow-hidden">
                      <div className="bg-red-500 h-full" style={{ width: `${selectedNode.danger * 100}%` }}></div>
                    </div>
                  </div>
                )}
                
                {selectedNode.date && (
                  <div>
                    <span className="block text-xs font-bold text-muted-foreground">INCIDENT DATE</span>
                    <span className="font-mono">{selectedNode.date}</span>
                  </div>
                )}

                <div>
                  <span className="block text-xs font-bold text-muted-foreground">NODE ID</span>
                  <span className="font-mono text-xs">{selectedNode.id}</span>
                </div>
              </div>

              <div className="mt-auto">
                <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 py-2 rounded-lg font-semibold transition-colors text-sm">
                  Run Deep Trace
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
