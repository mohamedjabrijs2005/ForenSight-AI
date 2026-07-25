import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing, ShieldAlert, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface Alert {
  id: string;
  type: 'CRITICAL' | 'WARNING' | 'INFO' | 'RESOLVED';
  title: string;
  message: string;
  timestamp: string;
  source: string;
}

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "ALT-001",
      type: "CRITICAL",
      title: "Multiple Gunshots Detected",
      message: "ShotSpotter acoustic sensors triggered in Sector 4. High probability of automatic weapons fire.",
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      source: "Sensor Grid Alpha"
    },
    {
      id: "ALT-002",
      type: "WARNING",
      title: "Unauthorized Access Attempt",
      message: "Failed biometric scan at evidence lockup door 3B.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      source: "Internal Security"
    },
    {
      id: "ALT-003",
      type: "INFO",
      title: "System Update Complete",
      message: "Facial recognition database successfully synced with federal servers.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      source: "IT Operations"
    },
    {
      id: "ALT-004",
      type: "RESOLVED",
      title: "Suspect Apprehended",
      message: "Patrol Unit Bravo-2 successfully detained suspect matching bolo description.",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      source: "Dispatch"
    }
  ]);

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="flex flex-col h-full gap-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <BellRing className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Alerts</h2>
          <p className="text-sm text-muted-foreground">Real-time incident and system notifications</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
              className={`flex gap-4 p-5 rounded-xl border relative overflow-hidden bg-card shadow-sm ${
                alert.type === 'CRITICAL' ? 'border-red-500/50 shadow-red-500/10' :
                alert.type === 'WARNING' ? 'border-yellow-500/50 shadow-yellow-500/10' :
                alert.type === 'RESOLVED' ? 'border-green-500/50 shadow-green-500/10' :
                'border-border'
              }`}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                alert.type === 'CRITICAL' ? 'bg-red-500' :
                alert.type === 'WARNING' ? 'bg-yellow-500' :
                alert.type === 'RESOLVED' ? 'bg-green-500' :
                'bg-blue-500'
              }`} />

              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                alert.type === 'CRITICAL' ? 'bg-red-500/10 text-red-500' :
                alert.type === 'WARNING' ? 'bg-yellow-500/10 text-yellow-500' :
                alert.type === 'RESOLVED' ? 'bg-green-500/10 text-green-500' :
                'bg-blue-500/10 text-blue-500'
              }`}>
                {alert.type === 'CRITICAL' ? <ShieldAlert className="w-6 h-6" /> :
                 alert.type === 'WARNING' ? <AlertTriangle className="w-6 h-6" /> :
                 alert.type === 'RESOLVED' ? <CheckCircle2 className="w-6 h-6" /> :
                 <Info className="w-6 h-6" />}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">{alert.title}</h3>
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{alert.message}</p>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <span className="bg-secondary px-2 py-1 rounded">Source: {alert.source}</span>
                  <span className="text-muted-foreground uppercase">{alert.id}</span>
                </div>
              </div>

              <div className="flex items-start">
                <button 
                  onClick={() => removeAlert(alert.id)}
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <CheckCircle2 className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">All clear. No active alerts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
