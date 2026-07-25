import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Map, 
  BrainCircuit, 
  Globe2, 
  Network, 
  UserSearch, 
  Cctv, 
  Car, 
  BellRing, 
  FileText, 
  BotMessageSquare, 
  Users, 
  Settings,
  Shield,
  LogOut
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Crime Management', path: '/crimes', icon: ShieldAlert },
  { name: 'Crime Map', path: '/map', icon: Map },
  { name: 'AI Predictions', path: '/predictions', icon: BrainCircuit, roles: ['Super Admin', 'Crime Analyst'] },
  { name: 'Digital Twin', path: '/digital-twin', icon: Globe2, roles: ['Super Admin', 'Crime Analyst'] },
  { name: 'Pattern Discovery', path: '/patterns', icon: Network },
  { name: 'Criminal Intelligence', path: '/intelligence', icon: UserSearch },
  { name: 'CCTV Intelligence', path: '/cctv', icon: Cctv },
  { name: 'Patrol Management', path: '/patrols', icon: Car },
  { name: 'Alerts', path: '/alerts', icon: BellRing },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'AI Assistant', path: '/ai-chat', icon: BotMessageSquare },
  { name: 'Public Portal', path: '/portal', icon: Users },
  { name: 'Settings', path: '/settings', icon: Settings, roles: ['Super Admin'] },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 h-screen border-r border-border bg-card flex flex-col shadow-sm z-20">
      <div className="h-16 flex items-center px-6 border-b border-border gap-3">
        <Shield className="w-8 h-8 text-primary" />
        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
          ForenSight AI
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {MENU_ITEMS.map((item) => {
          if (item.roles && user && !item.roles.includes(user.role)) {
            return null;
          }
          
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 font-medium ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border space-y-2">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 truncate">
            <div className="text-sm font-semibold text-foreground truncate">{user?.name || 'User'}</div>
            <div className="text-xs text-muted-foreground truncate">{user?.role || 'Guest'}</div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
