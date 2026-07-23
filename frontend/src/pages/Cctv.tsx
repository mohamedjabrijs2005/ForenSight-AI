import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Terminal, AlertCircle } from 'lucide-react';

const LOG_STEPS = [
  "Initializing secure connection to FastAPI...",
  "Authenticating JWT token...",
  "Connecting to PostgreSQL (PostGIS) database...",
  "Warming up Redis cache layer...",
  "Loading Machine Learning models (XGBoost, Scikit-learn)...",
  "Allocating GPU memory tensors...",
  "Syncing real-time intelligence feeds...",
  "Establishing Digital Twin websocket...",
];

export default function Cctv() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(false);

  const [threatLevel, setThreatLevel] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    if (isInitializing && !isOnline && progress < 100) {
      let currentStep = 0;
      
      interval = setInterval(() => {
        if (currentStep < LOG_STEPS.length) {
          const currentLog = LOG_STEPS[currentStep];
          setLogs(prev => {
            const newLogs = [...prev];
            if (!newLogs.includes(currentLog)) {
              newLogs.push(currentLog);
            }
            return newLogs;
          });
          setProgress(Math.floor(((currentStep + 1) / LOG_STEPS.length) * 100));
          currentStep++;
        } else {
          clearInterval(interval);
          setLogs(prev => [...prev, "SUCCESS: All Machine Learning models successfully loaded."]);
          timeout = setTimeout(() => {
            setIsOnline(true);
            setIsInitializing(false);
          }, 500);
        }
      }, 200);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [isInitializing, isOnline]);

  useEffect(() => {

    if (isOnline) {
      const interval = setInterval(() => {
        setThreatLevel(Math.floor(Math.random() * 100));
      }, 1500);
      return () => clearInterval(interval);
    }
  
  }, [isOnline]);

  const startPipeline = () => {
    if (isInitializing || isOnline) return;
    setIsInitializing(true);
    setLogs([]);
    setProgress(0);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">CCTV Intelligence</h1>
          <p className="text-muted-foreground mt-1">Live video analytics and automated threat detection.</p>
        </div>
        {isOnline && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-700 rounded-full text-sm font-bold border border-green-500/20 shadow-sm shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            SYSTEM ONLINE
          </div>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${isOnline ? '' : 'glass-panel p-8 md:p-12 border-border items-center justify-center'} flex-1 flex flex-col min-h-[500px]`}
      >
        {/* Offline State */}
        {!isInitializing && !isOnline && progress === 0 && (
          <div className="text-center flex flex-col items-center max-w-md m-auto">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Module Offline</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed font-medium">
              This advanced ML module is currently mocked for the Command Center demonstration. The underlying AI models require connection to the backend pipeline.
            </p>
            <button 
              onClick={startPipeline}
              className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-[0_2px_10px_rgba(26,115,232,0.3)] hover:bg-primary/90 transition-all active:scale-[0.98] w-full"
            >
              Initialize ML Pipeline
            </button>
          </div>
        )}

        {/* Loading Terminal State */}
        {(isInitializing && !isOnline) && (
          <div className="w-full max-w-2xl bg-[#0d1117] rounded-2xl overflow-hidden border border-border shadow-2xl m-auto">
            {/* Terminal Header */}
            <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-white/10">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground font-semibold tracking-wider">forensight-ml-pipeline.sh</span>
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm min-h-[300px] flex flex-col">
              <div className="flex-1 space-y-2">
                {logs.map((log, i) => (
                  <div key={i} className={`flex items-start gap-3 ${log.includes('SUCCESS') ? 'text-green-400 font-bold' : 'text-blue-300'}`}>
                    <span className="opacity-50 text-xs mt-0.5">[{new Date().toISOString().split('T')[1].substring(0, 8)}]</span>
                    <span>{log}</span>
                  </div>
                ))}
                
                {progress < 100 && (
                  <div className="flex items-center gap-2 text-blue-400 mt-4 animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <div className="flex justify-between text-xs mb-2 font-semibold">
                  <span className={progress === 100 ? "text-green-400" : "text-blue-400"}>
                    {progress === 100 ? "INITIALIZATION COMPLETE" : "INITIALIZING..."}
                  </span>
                  <span className="text-white">{progress}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${progress}%` }}/>
                </div>
              </div>
            </div>
          </div>
        )}

        {isOnline && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full flex-1"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="relative bg-black rounded-xl overflow-hidden aspect-video border border-border shadow-sm group">
                  <div className="absolute top-2 left-2 flex items-center gap-2 z-10">
                    <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-white text-xs font-mono bg-black/50 px-2 py-0.5 rounded">CAM-${1040 + i}</span>
                  </div>
                  <div className="w-full h-full opacity-60 bg-[url('https://images.unsplash.com/photo-1555626906-fcf10d6851b4?w=500&q=80')] bg-cover bg-center mix-blend-luminosity"></div>
                  {i === 1 && (
                    <div className="absolute top-[30%] left-[40%] w-16 h-24 border-2 border-red-500 z-20">
                       <span className="absolute -top-5 left-0 text-[8px] bg-red-500 text-white px-1 whitespace-nowrap">THREAT: {threatLevel}%</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-white/70 font-mono z-10 bg-black/40 px-2 py-1 rounded">
                    <span>{i === 1 ? 'AI: PERSON DETECTED' : 'AI: NO THREAT'}</span>
                    <span>14:32:0${i}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
