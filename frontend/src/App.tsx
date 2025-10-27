// src/App.tsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// === PÁGINAS ===
import LoginPage from './pages/Auth/LoginPage';
import DocenteDashboard from './pages/Docente/DocenteDashboard';
import NewRequestView from './pages/Docente/NewRequestView';
import RequestHistoryView from './pages/Docente/RequestHistoryView';
import BienesDashboard from './pages/AdminBienes/BienesDashboard';
import BienesRequestsView from './pages/AdminBienes/BienesRequestsView';
import BienesRegisterView from './pages/AdminBienes/BienesRegisterView';
import BibliotecaDashboard from './pages/AdminBiblioteca/BibliotecaDashboard';
import LibrosRequestsView from './pages/AdminBiblioteca/LibrosRequestsView';
import LibroRegisterView from './pages/AdminBiblioteca/LibroRegisterView';

// === TIPO ===
import type { ReactNode } from 'react';

// === RUTA PROTEGIDA ===
interface ProtectedRouteProps {
  children: ReactNode;
  roles: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// === APP ===
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* DOCENTE */}
          <Route
            path="/docente/dashboard"
            element={<ProtectedRoute roles={['docente']}><DocenteDashboard /></ProtectedRoute>}
          />
          <Route
            path="/docente/nueva-solicitud"
            element={<ProtectedRoute roles={['docente']}><NewRequestView /></ProtectedRoute>}
          />
          <Route
            path="/docente/historial"
            element={<ProtectedRoute roles={['docente']}><RequestHistoryView /></ProtectedRoute>}
          />

          {/* ADMIN BIENES */}
          <Route
            path="/admin-bienes/dashboard"
            element={<ProtectedRoute roles={['admin_bienes']}><BienesDashboard /></ProtectedRoute>}
          />
          <Route
            path="/admin-bienes/solicitudes"
            element={<ProtectedRoute roles={['admin_bienes']}><BienesRequestsView /></ProtectedRoute>}
          />
          <Route
            path="/admin-bienes/registrar"
            element={<ProtectedRoute roles={['admin_bienes']}><BienesRegisterView /></ProtectedRoute>}
          />

          {/* ADMIN BIBLIOTECA */}
          <Route
            path="/admin-biblioteca/dashboard"
            element={<ProtectedRoute roles={['admin_biblioteca']}><BibliotecaDashboard /></ProtectedRoute>}
          />
          <Route
            path="/admin-biblioteca/solicitudes"
            element={<ProtectedRoute roles={['admin_biblioteca']}><LibrosRequestsView /></ProtectedRoute>}
          />
          <Route
            path="/admin-biblioteca/registrar"
            element={<ProtectedRoute roles={['admin_biblioteca']}><LibroRegisterView /></ProtectedRoute>}
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;