import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Filter, FileBarChart, Loader2, CheckCircle2 } from 'lucide-react';

export default function Reports() {
  const [generating, setGenerating] = useState(false);
  const [reportType, setReportType] = useState('weekly');

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  const recentReports = [
    { id: 'REP-2607-A', name: 'Weekly Incident Summary', date: '2026-07-23', type: 'PDF', size: '2.4 MB' },
    { id: 'REP-2607-B', name: 'Patrol Efficiency Metrics', date: '2026-07-22', type: 'CSV', size: '1.1 MB' },
    { id: 'REP-2607-C', name: 'Predictive Threat Analysis', date: '2026-07-20', type: 'PDF', size: '5.6 MB' },
  ];

  return (
    <div className="flex flex-col h-full gap-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <FileBarChart className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports & Analytics</h2>
          <p className="text-sm text-muted-foreground">Generate and export official compliance documentation</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 flex-1">
        
        {/* Generator Panel */}
        <div className="md:col-span-1 bg-card border border-border rounded-xl p-6 flex flex-col gap-6 shadow-sm h-fit">
          <h3 className="font-bold text-lg border-b border-border pb-2">Generate New Report</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Report Type</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-muted border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="weekly">Weekly Incident Summary</option>
                <option value="monthly">Monthly Crime Statistics</option>
                <option value="patrol">Patrol Efficiency Report</option>
                <option value="ai">AI Confidence Logs</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="date" className="bg-muted border border-border rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
                <input type="date" className="bg-muted border border-border rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Format</label>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary/20 text-primary border border-primary/50 py-2 rounded-lg text-sm font-semibold">PDF</button>
                <button className="flex-1 bg-muted text-muted-foreground hover:bg-muted/80 border border-border py-2 rounded-lg text-sm font-medium">CSV</button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={generating}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors mt-auto disabled:opacity-70"
          >
            {generating ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
            ) : (
              <><FileText className="w-5 h-5" /> Generate Report</>
            )}
          </button>
        </div>

        {/* History Panel */}
        <div className="md:col-span-2 bg-card border border-border rounded-xl p-6 flex flex-col shadow-sm">
          <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
            <h3 className="font-bold text-lg">Report History</h3>
            <button className="text-muted-foreground hover:text-foreground p-2 bg-muted rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{report.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono text-muted-foreground">{report.id}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{report.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-muted-foreground">{report.type}</div>
                    <div className="text-xs text-muted-foreground">{report.size}</div>
                  </div>
                  <button className="p-2 bg-background border border-border rounded-lg text-foreground hover:text-primary hover:border-primary/50 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
