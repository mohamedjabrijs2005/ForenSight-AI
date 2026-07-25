import { useState } from 'react';
import { Settings as SettingsIcon, Shield, Server, Save, CheckCircle2 } from 'lucide-react';

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-full gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <SettingsIcon className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Configuration</h2>
          <p className="text-sm text-muted-foreground">Manage ForenSight AI parameters and integrations</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-8 pb-10 custom-scrollbar pr-4">
        
        {/* Machine Learning Settings */}
        <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-border pb-3 mb-5">
            <Server className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">AI & Machine Learning</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-foreground block mb-2">Primary Prediction Model</label>
                <select className="w-full bg-muted border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>ForenSight Core v4.2 (Recommended)</option>
                  <option>Legacy Pattern Matcher v3</option>
                  <option>Experimental Neural Net Beta</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                <div>
                  <div className="font-medium text-sm">Aggressive Profiling</div>
                  <div className="text-xs text-muted-foreground">Enable deep social media scraping</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-foreground block mb-2">Confidence Threshold</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="50" max="99" defaultValue="85" className="w-full accent-primary" />
                  <span className="text-sm font-mono bg-muted px-2 py-1 rounded">85%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Minimum AI confidence required to flag suspects</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Access */}
        <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-border pb-3 mb-5">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">Security & Privacy</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                <div>
                  <div className="font-medium text-sm">CJIS Compliance Mode</div>
                  <div className="text-xs text-muted-foreground">Strict data masking</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                <div>
                  <div className="font-medium text-sm">Two-Factor Auth</div>
                  <div className="text-xs text-muted-foreground">Require hardware token</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </section>

      </div>

      <div className="pt-4 border-t border-border flex justify-end">
        <button 
          onClick={handleSave}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          {saved ? <><CheckCircle2 className="w-5 h-5" /> Saved</> : <><Save className="w-5 h-5" /> Apply Changes</>}
        </button>
      </div>
    </div>
  );
}
