import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Bell, Search } from 'lucide-react';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      
      <div className="z-10 flex w-full">
        <Sidebar />
        
        <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background">
          <header className="h-16 flex items-center justify-between px-8 border-b border-border bg-card">
            <div className="flex items-center bg-muted rounded-full px-4 py-2 w-96 border border-transparent focus-within:bg-white focus-within:border-primary/30 focus-within:shadow-sm transition-all">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input 
                type="text" 
                placeholder="Search case, criminal, or location..." 
                className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse border-2 border-card"></span>
              </button>
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
