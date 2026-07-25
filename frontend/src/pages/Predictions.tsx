import { BrainCircuit, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Predictions() {
  const predictions = [
    { area: 'Financial District', type: 'Armed Robbery', probability: 87, timeFrame: 'Next 48 Hours', trend: 'up' },
    { area: 'Westside Auto Mile', type: 'Vehicle Theft', probability: 64, timeFrame: 'Tonight (0200-0400)', trend: 'down' },
    { area: 'Industrial Park', type: 'Burglary', probability: 42, timeFrame: 'Weekend', trend: 'stable' },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <BrainCircuit className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Threat Predictions</h2>
          <p className="text-sm text-muted-foreground">Forecasting models based on historical patterns and current telemetry</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Top Prediction Highlight */}
        <div className="md:col-span-3 bg-gradient-to-r from-red-500/20 to-card border border-red-500/30 rounded-xl p-6 flex items-center justify-between shadow-lg">
          <div>
            <h3 className="text-red-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4" /> Highest Probability Threat
            </h3>
            <div className="text-3xl font-black text-foreground">Financial District: Armed Robbery</div>
            <p className="text-muted-foreground mt-1">Based on recent spike in encrypted comms and related petty thefts.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-red-500">87%</div>
            <div className="text-xs font-bold text-muted-foreground uppercase mt-1">Confidence</div>
          </div>
        </div>

        {/* Prediction Cards */}
        {predictions.map((p, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg">{p.area}</h4>
                <span className="text-sm text-muted-foreground">{p.type}</span>
              </div>
              <TrendingUp className={`w-5 h-5 ${p.trend === 'up' ? 'text-red-500' : p.trend === 'down' ? 'text-green-500' : 'text-yellow-500'}`} />
            </div>
            
            <div className="space-y-4 mt-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>PROBABILITY</span>
                  <span>{p.probability}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`h-full rounded-full ${p.probability > 75 ? 'bg-red-500' : p.probability > 50 ? 'bg-yellow-500' : 'bg-blue-500'}`} style={{ width: `${p.probability}%` }}></div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                <span className="text-xs font-bold text-muted-foreground block mb-1">TIME FRAME</span>
                <span className="text-sm font-medium">{p.timeFrame}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
