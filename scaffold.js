const fs = require('fs');
const path = require('path');

const pages = [
  { name: 'Crimes', title: 'Crime Management', desc: 'Centralized database of all reported incidents.' },
  { name: 'Map', title: 'GIS Crime Map', desc: 'Interactive geographical analysis of crime hotspots.' },
  { name: 'Predictions', title: 'AI Predictions', desc: 'Machine learning forecasts for potential future incidents.' },
  { name: 'DigitalTwin', title: 'Digital Twin', desc: '3D spatial simulation of the city infrastructure.' },
  { name: 'Patterns', title: 'Pattern Discovery', desc: 'AI-driven identification of hidden crime patterns.' },
  { name: 'Intelligence', title: 'Criminal Intelligence', desc: 'Profiles, networks, and associations.' },
  { name: 'Cctv', title: 'CCTV Intelligence', desc: 'Live video analytics and automated threat detection.' },
  { name: 'Patrols', title: 'Patrol Management', desc: 'Optimization and tracking of deployed units.' },
  { name: 'Alerts', title: 'Alert Center', desc: 'Real-time notifications and emergency dispatches.' },
  { name: 'Reports', title: 'Reports & Analytics', desc: 'Exportable compliance and statistical reports.' },
  { name: 'AiAssistant', title: 'AI Assistant', desc: 'Conversational interface for database querying.' },
  { name: 'Portal', title: 'Public Portal', desc: 'Community facing interfaces and tip submissions.' },
  { name: 'Settings', title: 'System Settings', desc: 'Configuration for roles, permissions, and models.' },
];

const getMockState = (name) => {
  if (name === 'Crimes') return `  const [cases, setCases] = useState([{ id: 'CAS-9012', type: 'Burglary', status: 'In Progress' }]);`;
  if (name === 'Map') return `  const [pings, setPings] = useState([{ x: 20, y: 30 }]);`;
  if (name === 'Predictions') return `  const [charts, setCharts] = useState([40, 70, 45, 90, 65, 30, 85]);`;
  if (name === 'DigitalTwin') return `  const [rotation, setRotation] = useState(0);`;
  if (name === 'Patterns') return `  const [nodes, setNodes] = useState([{ id: 1, type: 'suspect' }]);`;
  if (name === 'Intelligence') return `  const [latLng, setLatLng] = useState({ lat: 34.05, lng: -118.24 });`;
  if (name === 'Cctv') return `  const [threatLevel, setThreatLevel] = useState(0);`;
  if (name === 'Patrols') return `  const [units, setUnits] = useState([{ id: 'U-12', status: 'En Route' }]);`;
  if (name === 'Alerts') return `  const [alerts, setAlerts] = useState([{ id: 1, msg: 'High Priority Dispatch', time: 'Just now' }]);`;
  if (name === 'Reports') return `  const [progressVal, setProgressVal] = useState(0);`;
  if (name === 'AiAssistant') return `  const [dots, setDots] = useState('');`;
  if (name === 'Portal') return `  const [tips, setTips] = useState(42);`;
  if (name === 'Settings') return `  const [cpu, setCpu] = useState(12);`;
  return `  const [data, setData] = useState(0);`;
};

const getMockEffect = (name) => {
  if (name === 'Crimes') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setCases(prev => {
          if (prev.length > 5) return prev;
          return [{ id: 'CAS-' + Math.floor(Math.random() * 9999), type: ['Theft', 'Assault', 'Fraud'][Math.floor(Math.random() * 3)], status: 'To Do' }, ...prev];
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  `;
  if (name === 'Map') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setPings(prev => [...prev.slice(-4), { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }]);
      }, 2000);
      return () => clearInterval(interval);
    }
  `;
  if (name === 'Predictions') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setCharts(prev => prev.map(v => Math.max(10, Math.min(100, v + (Math.random() * 20 - 10)))));
      }, 3000);
      return () => clearInterval(interval);
    }
  `;
  if (name === 'DigitalTwin') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  `;
  if (name === 'Patterns') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setNodes(prev => {
          if (prev.length > 6) return prev;
          return [...prev, { id: prev.length + 1, type: Math.random() > 0.5 ? 'suspect' : 'location' }];
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  `;
  if (name === 'Intelligence') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setLatLng(prev => ({ lat: prev.lat + (Math.random() * 0.01 - 0.005), lng: prev.lng + (Math.random() * 0.01 - 0.005) }));
      }, 1000);
      return () => clearInterval(interval);
    }
  `;
  if (name === 'Cctv') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setThreatLevel(Math.floor(Math.random() * 100));
      }, 1500);
      return () => clearInterval(interval);
    }
  `;
  if (name === 'Patrols') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setUnits(prev => prev.length > 4 ? prev : [...prev, { id: 'U-' + Math.floor(Math.random() * 99), status: ['En Route', 'On Scene', 'Available'][Math.floor(Math.random() * 3)] }]);
      }, 4000);
      return () => clearInterval(interval);
    }
  `;
  if (name === 'Alerts') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setAlerts(prev => {
          if (prev.length > 5) return prev;
          return [{ id: Math.random(), msg: ['Suspicious Activity', 'Vandalism Reported', 'Traffic Collision'][Math.floor(Math.random() * 3)], time: 'Just now' }, ...prev];
        });
      }, 4500);
      return () => clearInterval(interval);
    }
  `;
  if (name === 'Reports') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setProgressVal(prev => (prev >= 100 ? 0 : prev + 5));
      }, 500);
      return () => clearInterval(interval);
    }
  `;
  if (name === 'AiAssistant') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 200);
      return () => clearInterval(interval);
    }
  `;
  if (name === 'Portal') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setTips(prev => prev + 1);
      }, 6000);
      return () => clearInterval(interval);
    }
  `;
  if (name === 'Settings') return `
    if (isOnline) {
      const interval = setInterval(() => {
        setCpu(Math.floor(Math.random() * 40) + 10);
      }, 2000);
      return () => clearInterval(interval);
    }
  `;
  return ``;
};

const getMockUI = (name) => {
  if (name === 'Crimes') return `
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['To Do', 'In Progress', 'Closed'].map(col => (
                <div key={col} className="bg-muted/10 border border-border rounded-xl p-4 min-h-[400px]">
                  <h3 className="font-bold text-sm mb-4">{col}</h3>
                  <div className="space-y-3">
                    {cases.filter(c => c.status === col || (col === 'To Do' && c.status !== 'In Progress')).map((c, i) => (
                      <div key={i} className="bg-white border border-border p-3 rounded-lg shadow-sm animate-in fade-in slide-in-from-top-4">
                        <p className="text-xs font-mono text-muted-foreground">{c.id}</p>
                        <p className="font-semibold text-sm">{c.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>`;
  if (name === 'Map') return `
            <div className="relative w-full h-[600px] bg-slate-900 rounded-xl overflow-hidden shadow-inner flex items-center justify-center border border-border">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              <div className="absolute top-4 left-4 bg-black/80 text-white/90 text-xs font-mono px-4 py-3 rounded backdrop-blur-md border border-white/10 z-20">
                <p>LIVE RADAR TRACKING</p>
                <p className="text-primary mt-1">{pings.length} Active Hotspots</p>
              </div>
              {pings.map((ping, i) => (
                <div key={i} className="absolute animate-in zoom-in fade-in duration-500" style={{ top: \`\${ping.y}%\`, left: \`\${ping.x}%\` }}>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute opacity-75"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full relative"></div>
                </div>
              ))}
            </div>`;
  if (name === 'Predictions') return `
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-border rounded-xl p-8 shadow-sm">
                <h3 className="font-bold text-sm mb-8 text-muted-foreground uppercase tracking-wider">7-Day Forecast Confidence</h3>
                <div className="flex items-end gap-3 h-64">
                  {charts.map((h, i) => (
                    <div key={i} className="w-full bg-primary/20 rounded-t-sm relative group hover:bg-primary transition-all duration-300" style={{ height: \`\${h}%\` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{Math.round(h)}%</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-border rounded-xl p-8 shadow-sm flex flex-col justify-center items-center text-center">
                 <div className="w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center mb-6 relative">
                   <div className="absolute inset-[-4px] rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                   <span className="text-3xl font-bold">{Math.round(charts[0])}%</span>
                 </div>
                 <h3 className="font-bold text-lg">High Risk Detected</h3>
                 <p className="text-muted-foreground text-sm mt-2 max-w-xs">XGBoost model predicts an elevated likelihood of property crimes in Sector 4 within 48 hours.</p>
              </div>
            </div>`;
  if (name === 'DigitalTwin') return `
            <div className="relative w-full h-[600px] bg-[#09090b] rounded-xl overflow-hidden shadow-inner flex items-center justify-center border border-border perspective-[1000px]">
              <div className="absolute top-4 left-4 text-primary text-xs font-mono bg-primary/10 px-3 py-1 rounded">SIMULATION RENDER</div>
              <div className="w-64 h-64 border-2 border-primary/40 rounded-xl flex items-center justify-center transform-style-3d transition-transform duration-100" style={{ transform: \`rotateX(60deg) rotateZ(\${rotation}deg)\` }}>
                <div className="absolute w-full h-full border border-primary/20 grid grid-cols-4 grid-rows-4">
                  {Array(16).fill(0).map((_, i) => <div key={i} className="border border-primary/10"></div>)}
                </div>
                <div className="w-16 h-32 bg-primary/30 absolute border border-primary transform translate-z-16 -translate-x-12 -translate-y-8"></div>
                <div className="w-24 h-16 bg-blue-500/30 absolute border border-blue-500 transform translate-z-8 translate-x-12 translate-y-12"></div>
              </div>
            </div>`;
  if (name === 'Patterns') return `
            <div className="relative w-full h-[500px] bg-slate-50 border border-border rounded-xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="relative w-full h-full p-8">
                {nodes.map((node, i) => (
                  <div key={node.id} className="absolute animate-in zoom-in fade-in flex flex-col items-center gap-2" style={{ top: \`\${20 + (i * 15)}%\`, left: \`\${20 + (i * 12)}%\` }}>
                    <div className={\`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg \${node.type === 'suspect' ? 'bg-red-500' : 'bg-blue-500'}\`}>
                       {node.type === 'suspect' ? <AlertCircle className="w-6 h-6" /> : <Terminal className="w-6 h-6" />}
                    </div>
                    <span className="text-[10px] font-bold uppercase bg-white px-2 py-0.5 rounded shadow-sm border border-border">{node.type} {node.id}</span>
                  </div>
                ))}
              </div>
            </div>`;
  if (name === 'Intelligence') return `
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 bg-white border border-border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-muted rounded-full mb-4 bg-[url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80')] bg-cover"></div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm text-red-500 font-bold mb-4">THREAT LEVEL: HIGH</p>
                <div className="w-full space-y-2 text-sm text-left">
                  <div className="flex justify-between border-b pb-1"><span className="text-muted-foreground">ID</span><span className="font-mono">CID-99201</span></div>
                  <div className="flex justify-between border-b pb-1"><span className="text-muted-foreground">Aliases</span><span>"Ghost"</span></div>
                  <div className="flex justify-between pb-1"><span className="text-muted-foreground">Status</span><span>Wanted</span></div>
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div className="bg-slate-900 text-white rounded-xl p-6 shadow-inner font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-2 text-xs text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div> LIVE TRACKING
                  </div>
                  <p className="mb-4 text-slate-400">// LAST KNOWN COORDINATES</p>
                  <p className="text-2xl mb-1">LAT: {latLng.lat.toFixed(6)}</p>
                  <p className="text-2xl">LNG: {latLng.lng.toFixed(6)}</p>
                </div>
                <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold mb-4">Known Associates</h3>
                  <div className="flex gap-4">
                    {[1, 2].map(i => <div key={i} className="w-12 h-12 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">?</div>)}
                  </div>
                </div>
              </div>
            </div>`;
  if (name === 'Cctv') return `
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="relative bg-black rounded-xl overflow-hidden aspect-video border border-border shadow-sm group">
                  <div className="absolute top-2 left-2 flex items-center gap-2 z-10">
                    <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-white text-xs font-mono bg-black/50 px-2 py-0.5 rounded">CAM-\${1040 + i}</span>
                  </div>
                  <div className="w-full h-full opacity-60 bg-[url('https://images.unsplash.com/photo-1555626906-fcf10d6851b4?w=500&q=80')] bg-cover bg-center mix-blend-luminosity"></div>
                  {i === 1 && (
                    <div className="absolute top-[30%] left-[40%] w-16 h-24 border-2 border-red-500 z-20">
                       <span className="absolute -top-5 left-0 text-[8px] bg-red-500 text-white px-1 whitespace-nowrap">THREAT: {threatLevel}%</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-white/70 font-mono z-10 bg-black/40 px-2 py-1 rounded">
                    <span>{i === 1 ? 'AI: PERSON DETECTED' : 'AI: NO THREAT'}</span>
                    <span>14:32:0\${i}</span>
                  </div>
                </div>
              ))}
            </div>`;
  if (name === 'Patrols') return `
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 space-y-4">
                <h3 className="font-bold">Active Units</h3>
                {units.map((u, i) => (
                  <div key={i} className="bg-white border border-border rounded-xl p-4 shadow-sm flex items-center justify-between animate-in fade-in slide-in-from-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">🚓</div>
                      <div>
                        <p className="font-bold text-sm">{u.id}</p>
                        <p className="text-xs text-muted-foreground">Unit {i + 1}</p>
                      </div>
                    </div>
                    <span className={\`text-xs font-bold px-2 py-1 rounded \${u.status === 'Available' ? 'bg-green-500/10 text-green-600' : u.status === 'En Route' ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'}\`}>{u.status}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-slate-100 rounded-xl border border-border relative overflow-hidden h-[500px]">
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground text-sm font-medium">DISPATCH MAP FEED<br/>(Awaiting GIS Layer)</div>
              </div>
            </div>`;
  if (name === 'Alerts') return `
            <div className="max-w-3xl mx-auto space-y-4">
              {alerts.map((alert, i) => (
                <div key={alert.id} className="bg-white border-l-4 border-red-500 rounded-r-xl border-y border-r border-border p-5 shadow-sm animate-in slide-in-from-top-4 fade-in">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1 block">Critical Alert</span>
                      <h3 className="text-lg font-bold">{alert.msg}</h3>
                      <p className="text-sm text-muted-foreground mt-1">AI detection algorithm flagged anomalous activity requiring immediate attention.</p>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{alert.time}</span>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90">Dispatch Unit</button>
                    <button className="px-4 py-2 bg-muted text-foreground text-xs font-bold rounded-lg hover:bg-muted/80">Dismiss</button>
                  </div>
                </div>
              ))}
            </div>`;
  if (name === 'Reports') return `
            <div className="max-w-4xl mx-auto bg-white rounded-xl border border-border p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                <div>
                  <h2 className="text-2xl font-bold">Generate Report</h2>
                  <p className="text-sm text-muted-foreground mt-1">Compile comprehensive statistical analysis documents.</p>
                </div>
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-sm hover:bg-primary/90">Run Generator</button>
              </div>
              <div className="space-y-6">
                <div className="bg-muted/10 p-6 rounded-xl border border-border">
                  <h3 className="font-bold text-sm mb-4">Background Processing</h3>
                  <div className="flex justify-between text-xs mb-2 font-mono">
                    <span>Compiling Q3 Incident Data...</span>
                    <span>{progressVal}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: \`\${progressVal}%\` }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map(i => (
                    <div key={i} className="border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary cursor-pointer transition-colors">
                      <div className="w-12 h-12 bg-red-500/10 text-red-600 rounded-lg flex items-center justify-center font-bold">PDF</div>
                      <div>
                        <p className="font-bold text-sm">Monthly Overview - \${i}</p>
                        <p className="text-xs text-muted-foreground">Generated today</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>`;
  if (name === 'AiAssistant') return `
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
            </div>`;
  if (name === 'Portal') return `
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-primary text-white p-8 rounded-xl shadow-lg text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1000&q=80')] bg-cover"></div>
                <h2 className="text-3xl font-bold relative z-10">Community Watch Portal</h2>
                <p className="mt-2 text-primary-foreground/80 relative z-10">Submit anonymous tips securely to our AI system.</p>
              </div>
              <div className="bg-white border border-border p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <h3 className="font-bold">Live Tip Counter</h3>
                  <span className="text-2xl font-mono font-bold text-primary animate-in fade-in slide-in-from-bottom">{tips}</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Incident Type</label>
                    <select className="w-full p-3 rounded-lg border border-border bg-muted/20"><option>Suspicious Activity</option></select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Details</label>
                    <textarea rows={4} className="w-full p-3 rounded-lg border border-border bg-muted/20" placeholder="Describe the incident..."></textarea>
                  </div>
                  <button className="w-full py-3 bg-black text-white font-bold rounded-lg shadow-sm">Submit Securely</button>
                </div>
              </div>
            </div>`;
  if (name === 'Settings') return `
            <div className="max-w-3xl mx-auto bg-white rounded-xl border border-border p-8 shadow-sm">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-6">System Health</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border bg-muted/10">
                      <p className="text-sm text-muted-foreground font-semibold">CPU Utilization</p>
                      <p className="text-3xl font-mono font-bold text-primary mt-2">{cpu}%</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-muted/10">
                      <p className="text-sm text-muted-foreground font-semibold">Memory (RAM)</p>
                      <p className="text-3xl font-mono font-bold text-primary mt-2">64.2 GB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">ML Model Configuration</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/5">
                      <div>
                        <p className="font-bold text-sm">Predictive Engine (XGBoost)</p>
                        <p className="text-xs text-muted-foreground">Primary forecasting model</p>
                      </div>
                      <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div></div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/5">
                      <div>
                        <p className="font-bold text-sm">Facial Recognition CNN</p>
                        <p className="text-xs text-muted-foreground">Used in CCTV Intelligence</p>
                      </div>
                      <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
  return `<div>Default Mock</div>`;
};

pages.forEach(page => {
  const content = `import { useState, useEffect } from 'react';
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

export default function ${page.name}() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(false);

${getMockState(page.name)}

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
${getMockEffect(page.name)}
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">${page.title}</h1>
          <p className="text-muted-foreground mt-1">${page.desc}</p>
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
        className={\`\${isOnline ? '' : 'glass-panel p-8 md:p-12 border-border items-center justify-center'} flex-1 flex flex-col min-h-[500px]\`}
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
                  <div key={i} className={\`flex items-start gap-3 \${log.includes('SUCCESS') ? 'text-green-400 font-bold' : 'text-blue-300'}\`}>
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
                  <div className={\`h-full transition-all duration-500 \${progress === 100 ? 'bg-green-500' : 'bg-blue-500'}\`} style={{ width: \`\${progress}%\` }}/>
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
${getMockUI(page.name)}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(__dirname, 'frontend', 'src', 'pages', page.name + '.tsx'), content);
});

console.log('Successfully generated 13 detailed, unique, and real-time pages!');
