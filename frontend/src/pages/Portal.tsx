import { useState } from 'react';
import { Users, Send, ShieldCheck, Lock, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portal() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="flex flex-col h-full gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Users className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Public Tip Portal</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Lock className="w-3 h-3" /> Encrypted Anonymous Submission System
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
        <AnimatePresence>
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-green-500/10 border border-green-500/30 rounded-xl p-10 flex flex-col items-center text-center mt-10"
            >
              <ShieldCheck className="w-20 h-20 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-green-500 mb-2">Tip Submitted Securely</h3>
              <p className="text-muted-foreground max-w-md">
                Your information has been encrypted and sent to our analysts. Your identity remains 100% anonymous. Thank you for keeping our city safe.
              </p>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6"
            >
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg text-sm text-primary flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                <p>This portal routes directly into the ForenSight AI Core. All IP addresses are stripped, and submissions are analyzed for immediate threat potential.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-foreground block mb-2">Incident Type</label>
                  <select className="w-full bg-muted border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Suspicious Activity</option>
                    <option>Theft / Burglary</option>
                    <option>Violent Crime</option>
                    <option>Cybercrime</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-bold text-foreground block mb-2">Location / Area</label>
                  <input type="text" placeholder="e.g. 7th and Fig, Downtown" className="w-full bg-muted border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>

                <div>
                  <label className="text-sm font-bold text-foreground block mb-2">Detailed Description</label>
                  <textarea 
                    rows={5} 
                    placeholder="Provide as much detail as possible (suspect descriptions, vehicles, license plates, times)..." 
                    className="w-full bg-muted border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary custom-scrollbar"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="text-sm font-bold text-foreground block mb-2">Evidence Upload (Optional)</label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-muted-foreground bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer">
                    <UploadCloud className="w-10 h-10 mb-2 opacity-50" />
                    <p className="font-medium text-sm">Click to upload photos or videos</p>
                    <p className="text-xs mt-1 opacity-70">Metadata will be automatically scrubbed</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <button type="submit" className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                  <Send className="w-5 h-5" /> Submit Anonymous Tip
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
