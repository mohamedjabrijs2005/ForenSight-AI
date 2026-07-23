// @ts-nocheck
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

export default function AiAssistant() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(false);

  const [dots, setDots] = useState('');

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
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 200);
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Assistant</h1>
          <p className="text-muted-foreground mt-1">Conversational interface for database querying.</p>
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

            <div className="flex flex-col h-[600px] bg-white rounded-xl border border-border shadow-sm overflow-hidden max-w-4xl mx-auto">
              <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-muted/10">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-border rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%]">
                    <p className="text-sm">Hello, Inspector. I am the ForenSight AI Assistant. I have analyzed the last 24 hours of incident reports. How can I assist you today?</p>
                  </div>
                </div>
                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <span className="text-xs text-white font-bold">ME</span>
                  </div>
                  <div className="bg-primary text-white rounded-2xl rounded-tr-none p-4 shadow-sm max-w-[80%]">
                    <p className="text-sm">Run a deep analysis on the recent downtown anomalies.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-border rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%] min-w-[100px]">
                    <p className="text-sm font-mono text-muted-foreground">Processing{dots}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white border-t border-border">
                <div className="relative">
                  <input type="text" placeholder="Type a command or question..." className="w-full pl-4 pr-12 py-3 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  <button className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-lg hover:bg-primary/90">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
