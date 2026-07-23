import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function Portal() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);

  const startPipeline = () => {
    if (isInitializing) return;
    setIsInitializing(true);
    setLogs([]);
    setProgress(0);
    setHasError(false);

    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep < LOG_STEPS.length) {
        setLogs(prev => [...prev, LOG_STEPS[currentStep]]);
        setProgress(Math.floor(((currentStep + 1) / LOG_STEPS.length) * 90));
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setHasError(true);
          setProgress(100);
          setLogs(prev => [...prev, "ERROR: Connection timeout. Docker ML containers are not responding. Please ensure 'docker-compose up' is running the backend services."]);
        }, 1500);
      }
    }, 800);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Public Portal</h1>
        <p className="text-muted-foreground mt-1">Community facing interfaces and tip submissions.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 border-border flex-1 flex flex-col items-center justify-center min-h-[500px]"
      >
        {!isInitializing && !hasError && (
          <div className="text-center flex flex-col items-center max-w-md">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Module Offline</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed font-medium">
              This advanced ML module is currently mocked for the Command Center demonstration. The underlying AI models require connection to the FastAPI backend.
            </p>
            <button 
              onClick={startPipeline}
              className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-[0_2px_10px_rgba(26,115,232,0.3)] hover:bg-primary/90 transition-all active:scale-[0.98] w-full"
            >
              Initialize ML Pipeline
            </button>
          </div>
        )}

        {(isInitializing || hasError) && (
          <div className="w-full max-w-2xl bg-[#0d1117] rounded-2xl overflow-hidden border border-border shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-white/10">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground font-semibold tracking-wider">forensight-ml-pipeline.sh</span>
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm min-h-[300px] flex flex-col">
              <div className="flex-1 space-y-2">
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-start gap-3 ${log.includes('ERROR') ? 'text-red-400 font-bold' : 'text-green-400'}`}
                    >
                      <span className="opacity-50 text-xs mt-0.5">[{new Date().toISOString().split('T')[1].substring(0, 8)}]</span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isInitializing && !hasError && (
                  <motion.div 
                    animate={{ opacity: [1, 0.5, 1] }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="flex items-center gap-2 text-blue-400 mt-4"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </motion.div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="flex justify-between text-xs mb-2 font-semibold">
                  <span className={hasError ? "text-red-400" : "text-blue-400"}>
                    {hasError ? "INITIALIZATION FAILED" : "INITIALIZING..."}
                  </span>
                  <span className="text-white">{progress}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${hasError ? 'bg-red-500' : 'bg-blue-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {hasError && (
                <button 
                  onClick={() => { setIsInitializing(false); setHasError(false); }}
                  className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-bold text-xs tracking-widest uppercase"
                >
                  <AlertCircle className="w-4 h-4" />
                  Retry Connection
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
