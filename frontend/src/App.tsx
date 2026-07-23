import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Crimes from './pages/Crimes';
import Map from './pages/Map';
import Predictions from './pages/Predictions';
import DigitalTwin from './pages/DigitalTwin';
import Patterns from './pages/Patterns';
import Intelligence from './pages/Intelligence';
import Cctv from './pages/Cctv';
import Patrols from './pages/Patrols';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import AiAssistant from './pages/AiAssistant';
import Portal from './pages/Portal';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected App Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="crimes" element={<Crimes />} />
              <Route path="map" element={<Map />} />
              <Route path="predictions" element={<Predictions />} />
              <Route path="digital-twin" element={<DigitalTwin />} />
              <Route path="patterns" element={<Patterns />} />
              <Route path="intelligence" element={<Intelligence />} />
              <Route path="cctv" element={<Cctv />} />
              <Route path="patrols" element={<Patrols />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="reports" element={<Reports />} />
              <Route path="ai-chat" element={<AiAssistant />} />
              <Route path="portal" element={<Portal />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
