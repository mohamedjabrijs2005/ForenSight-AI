import { Globe2, Layers, Cpu, Activity, Maximize } from 'lucide-react';

export default function DigitalTwin() {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe2 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Digital Twin Simulation</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-sm font-mono text-muted-foreground">SYNCING SECTOR 4</span>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-4 gap-6 min-h-[400px]">
        {/* Main 3D View Placeholder */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl relative overflow-hidden flex flex-col group">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button className="p-2 bg-black/50 text-white rounded hover:bg-black/80 backdrop-blur">
              <Layers className="w-4 h-4" />
            </button>
            <button className="p-2 bg-black/50 text-white rounded hover:bg-black/80 backdrop-blur">
              <Maximize className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 bg-black/90 relative overflow-hidden flex items-center justify-center">
            {/* Grid overlay for tech feel */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0,150,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,150,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="text-center relative z-10">
              <Globe2 className="w-24 h-24 text-primary opacity-50 mx-auto mb-4 animate-[spin_10s_linear_infinite]" />
              <p className="font-mono text-primary/70 tracking-widest text-sm uppercase">Loading WebGL City Mesh...</p>
              <div className="w-48 h-1 bg-primary/20 rounded-full mx-auto mt-4 overflow-hidden">
                <div className="w-1/2 h-full bg-primary animate-[bounce_2s_infinite]"></div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-muted/30 border-t border-border flex justify-between text-xs font-mono text-muted-foreground">
            <span>COORDS: 34.0522° N, 118.2437° W</span>
            <span>ZOOM: 14.5x</span>
            <span>LAYERS: INFRASTRUCTURE, TRAFFIC</span>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="flex flex-col gap-4">
          <div className="bg-card border border-border rounded-xl p-4 flex-1">
            <h3 className="font-bold text-sm mb-4 border-b border-border pb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Simulation Controls
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground flex justify-between mb-1">
                  <span>Time Simulation</span>
                  <span>+4 HRS</span>
                </label>
                <input type="range" className="w-full accent-primary" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground">Active Overlays</label>
                <label className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded border border-border/50 cursor-pointer hover:bg-muted/80">
                  <input type="checkbox" defaultChecked className="accent-primary" />
                  Traffic Density
                </label>
                <label className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded border border-border/50 cursor-pointer hover:bg-muted/80">
                  <input type="checkbox" defaultChecked className="accent-primary" />
                  Police Presence
                </label>
                <label className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded border border-border/50 cursor-pointer hover:bg-muted/80">
                  <input type="checkbox" className="accent-primary" />
                  Cell Tower Triangulation
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-4">
             <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-red-500">
              <Activity className="w-4 h-4" /> Live Events
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li className="flex gap-2 text-muted-foreground"><span className="text-red-500 font-mono">14:32</span> Accident on I-5</li>
              <li className="flex gap-2 text-muted-foreground"><span className="text-yellow-500 font-mono">14:28</span> High congestion in D12</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
