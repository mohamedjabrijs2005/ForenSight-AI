import { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Bell, Search, AlertCircle, FileText, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'alert', msg: 'High priority dispatch in Sector 4', time: '2m ago' },
  { id: 2, type: 'report', msg: 'Q3 Analytics Report generated', time: '1h ago' },
  { id: 3, type: 'system', msg: 'XGBoost model retrained successfully', time: '3h ago' },
];

const MOCK_SEARCH_DB = [
  { id: 'CID-99201', name: 'John Doe (Ghost)', type: 'Suspect' },
  { id: 'CAS-8921', name: 'Grand Theft Auto', type: 'Case' },
  { id: 'LOC-402', name: 'Downtown Financial District', type: 'Location' },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = MOCK_SEARCH_DB.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      
      <div className="z-10 flex w-full">
        <Sidebar />
        
        <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background">
          <header className="h-16 flex items-center justify-between px-8 border-b border-border bg-card relative z-50">
            
            {/* Search Bar */}
            <div className="relative" ref={searchRef}>
              <div className="flex items-center bg-muted rounded-full px-4 py-2 w-96 border border-transparent focus-within:bg-white focus-within:border-primary/30 focus-within:shadow-sm transition-all">
                <Search className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsSearching(true); }}
                  onFocus={() => setIsSearching(true)}
                  placeholder="Search case, criminal, or location..." 
                  className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <AnimatePresence>
                {isSearching && searchQuery.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full mt-2 bg-white border border-border rounded-xl shadow-xl overflow-hidden"
                  >
                    {searchResults.length > 0 ? (
                      <div className="py-2">
                        {searchResults.map(result => (
                          <div 
                            key={result.id} 
                            onClick={() => {
                              setSearchQuery('');
                              setIsSearching(false);
                              if (result.type === 'Suspect') navigate('/intelligence');
                              else if (result.type === 'Case') navigate('/crimes');
                              else navigate('/map');
                            }}
                            className="px-4 py-3 hover:bg-muted/30 cursor-pointer flex items-center gap-3 transition-colors"
                          >
                            <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center">
                              {result.type === 'Suspect' ? <User className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="text-sm font-bold">{result.name}</p>
                              <p className="text-xs text-muted-foreground">{result.type} • {result.id}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                        No results found for "{searchQuery}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setShowNotifs(!showNotifs)}
                  className={`relative p-2 rounded-full transition-colors ${showNotifs ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                >
                  <Bell className="w-5 h-5 transition-colors" />
                  <span className="absolute top-1.5 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse border-2 border-card"></span>
                </button>
                
                <AnimatePresence>
                  {showNotifs && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, transformOrigin: 'top right' }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-white border border-border rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-border bg-muted/10 flex justify-between items-center">
                        <span className="font-bold text-sm">Notifications</span>
                        <span className="text-xs text-primary font-semibold cursor-pointer">Mark all read</span>
                      </div>
                      <div className="divide-y divide-border">
                        {MOCK_NOTIFICATIONS.map(n => (
                          <div key={n.id} className="p-4 hover:bg-muted/30 cursor-pointer transition-colors flex gap-3">
                            <div className="mt-0.5">
                              {n.type === 'alert' && <AlertCircle className="w-4 h-4 text-red-500" />}
                              {n.type === 'report' && <FileText className="w-4 h-4 text-blue-500" />}
                              {n.type === 'system' && <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-green-500"></div></div>}
                            </div>
                            <div>
                              <p className="text-sm font-medium leading-snug">{n.msg}</p>
                              <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-3 border-t border-border bg-muted/10 text-center cursor-pointer hover:bg-muted/20 transition-colors">
                        <span className="text-xs font-bold text-primary">View all alerts</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>
          
          <div className="flex-1 overflow-auto p-8 custom-scrollbar">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
