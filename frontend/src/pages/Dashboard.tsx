import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShieldAlert, 
  Clock, 
  MapPin,
  Activity
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#000',
      bodyColor: '#333',
      borderColor: 'rgba(0,0,0,0.1)',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: { display: false, drawBorder: false },
      ticks: { color: 'rgba(0,0,0,0.5)' }
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
      ticks: { color: 'rgba(0,0,0,0.5)' }
    }
  },
  elements: {
    line: { tension: 0.4 },
    point: { radius: 0, hitRadius: 10, hoverRadius: 4 }
  }
};

const INITIAL_HOTSPOTS = [
  { loc: "Downtown Financial District", type: "Theft Alert", conf: 94 },
  { loc: "Northside Industrial Park", type: "Suspicious Activity", conf: 88 },
  { loc: "Metro Transit Hub", type: "Crowd Anomaly", conf: 82 },
  { loc: "West End Residential", type: "Burglary Risk", conf: 79 },
];

export default function Dashboard() {
  const [crimesToday, setCrimesToday] = useState(142);
  const [activeCases, setActiveCases] = useState(3102);
  const [respTime, setRespTime] = useState(252);
  const [riskScore, setRiskScore] = useState(84);
  const [hotspots, setHotspots] = useState(INITIAL_HOTSPOTS);
  
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        fill: true,
        label: 'Predicted Crimes',
        data: [650, 590, 800, 810, 560, 550, 400],
        borderColor: 'rgb(26, 115, 232)',
        backgroundColor: 'rgba(26, 115, 232, 0.1)',
      },
      {
        fill: true,
        label: 'Actual Crimes',
        data: [620, 600, 780, 790, 580, 540, 390],
        borderColor: 'rgb(15, 157, 88)',
        backgroundColor: 'rgba(15, 157, 88, 0.1)',
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCrimesToday(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setActiveCases(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setRespTime(prev => prev + (Math.random() > 0.5 ? 2 : -2));
      setRiskScore(prev => Math.min(100, Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1))));

      setHotspots(prev => prev.map(spot => ({
        ...spot,
        conf: Math.min(99, Math.max(50, spot.conf + (Math.random() > 0.5 ? 1 : -1)))
      })));

      setChartData(prev => {
        const newData = { ...prev };
        const lastIdx = newData.datasets[1].data.length - 1;
        newData.datasets[1].data[lastIdx] += (Math.random() > 0.5 ? 2 : -2);
        return newData;
      });
      
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const STATS = [
    { label: "Today's Crimes", value: crimesToday.toString(), trend: "+12%", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Cases", value: activeCases.toLocaleString(), trend: "-2%", icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50" },
    { label: "Avg Response Time", value: formatTime(respTime), trend: "-15s", icon: Clock, color: "text-green-600", bg: "bg-green-50" },
    { label: "AI Risk Score", value: `${riskScore}/100`, trend: riskScore > 80 ? "High" : "Normal", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Command Center</h1>
          <p className="text-muted-foreground mt-1">Real-time intelligence and predictive analytics</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-white px-3 py-1.5 rounded-full shadow-sm border border-border">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          Live Sync Active
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
              className="glass-panel p-6 relative overflow-hidden group border-border"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-2 text-foreground tracking-tight">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground relative z-10 font-medium">
                <span className={stat.trend.startsWith('+') || stat.trend === 'High' ? 'text-destructive' : 'text-green-600'}>
                  {stat.trend}
                </span>
                <span className="ml-2">vs last week</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6 border-border flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-foreground">AI Crime Prediction vs Actual</h3>
            <select className="bg-muted border border-border rounded-md text-sm px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium cursor-pointer transition-all hover:bg-muted/80">
              <option>Last 7 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 w-full min-h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6 border-border flex flex-col"
        >
          <h3 className="text-lg font-bold text-foreground mb-6">Live AI Hotspots</h3>
          <div className="flex-1 space-y-3">
            {hotspots.map((spot, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer border border-transparent hover:border-border group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{spot.loc}</p>
                    <p className="text-xs font-medium text-muted-foreground">{spot.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-primary">{spot.conf}%</span>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Confidence</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold shadow-[0_2px_10px_rgba(26,115,232,0.3)] transition-all active:scale-[0.98]">
            Deploy Patrols
          </button>
        </motion.div>
      </div>
    </div>
  );
}
