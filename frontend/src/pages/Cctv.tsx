import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Camera, AlertCircle, Scan, Activity } from 'lucide-react';

interface CameraFeed {
  id: string;
  location: string;
  status: string;
  aiDetections: string[];
  alertLevel: string;
  feedUrl: string;
  timestamp: string;
}

export default function Cctv() {
  const [cameras, setCameras] = useState<CameraFeed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cctv')
      .then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then(data => {
        setCameras(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("CCTV API failed:", err);
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

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">CCTV Intelligence Feed</h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Activity className="w-4 h-4 text-green-500 animate-pulse" />
          <span className="font-mono text-muted-foreground">LIVE STREAM ACTIVE</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 flex-1">
        {cameras.map((cam) => (
          <motion.div 
            key={cam.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-lg group relative"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center p-3 bg-black/90 text-white z-10 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${cam.status === 'ACTIVE' ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></span>
                <span className="font-mono text-xs">{cam.id}</span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs font-semibold">{cam.location}</span>
              </div>
              <span className="font-mono text-xs text-gray-400">
                {new Date(cam.timestamp).toLocaleTimeString()}
              </span>
            </div>

            {/* Video Feed Area */}
            <div className="relative flex-1 bg-black overflow-hidden min-h-[250px] flex items-center justify-center">
              {cam.status === 'OFFLINE' ? (
                <div className="text-gray-600 flex flex-col items-center">
                  <AlertCircle className="w-12 h-12 mb-2 opacity-50" />
                  <span className="font-mono text-sm uppercase tracking-widest">Signal Lost</span>
                </div>
              ) : (
                <>
                  <img 
                    src={cam.feedUrl} 
                    alt={cam.location} 
                    onError={(e) => {
                      const fallback = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='600' height='400' fill='%23111' /><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='20' fill='%23666'>SIGNAL LOST / CORS BLOCKED</text></svg>";
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" 
                  />
                  
                  {/* Fake AI Bounding Box overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-32 h-48 border-2 border-primary/50 bg-primary/10 rounded" />
                    <div className="absolute top-1/4 left-1/4 -mt-6 bg-primary/80 text-white text-[10px] font-mono px-1 py-0.5 rounded">
                      PERSON 98%
                    </div>
                  </div>

                  <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none" />
                </>
              )}
            </div>

            {/* Bottom Metadata Bar */}
            <div className="p-4 bg-muted/20 border-t border-border flex justify-between items-start">
              <div>
                <h4 className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-2">
                  <Scan className="w-3 h-3" /> AI DETECTIONS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cam.aiDetections.length > 0 ? (
                    cam.aiDetections.map(det => (
                      <span key={det} className="text-xs bg-secondary px-2 py-1 rounded text-foreground font-medium">
                        {det}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic">No anomalies detected</span>
                  )}
                </div>
              </div>

              {cam.alertLevel !== 'NONE' && (
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  cam.alertLevel === 'HIGH' ? 'bg-red-500/20 text-red-500 border-red-500/30' :
                  cam.alertLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                  'bg-blue-500/20 text-blue-500 border-blue-500/30'
                }`}>
                  {cam.alertLevel} ALERT
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
