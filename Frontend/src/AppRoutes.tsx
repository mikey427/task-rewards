// AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./Login";
import App from "./App";

function AppRoutes() {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {user ? (
        // Authenticated routes
        <>
          <Route path="/" element={<App />} />
          {/* <Route path="/logout" element={} */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        // Unauthenticated routes
        <>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
