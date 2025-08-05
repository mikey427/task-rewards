// AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./Login";
import App from "./App";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import Chores from "./Chores";

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
          <Route
            path="/"
            element={
              <>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarTrigger />
                  <App />
                </SidebarProvider>
              </>
            }
          />
          {/* <Route path="/logout" element={} */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/chores"
            element={
              <>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarTrigger />
                  <Chores />
                </SidebarProvider>
              </>
            }
          />
          <Route
            path="/shop"
            element={
              <>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarTrigger />
                  <App />
                </SidebarProvider>
              </>
            }
          />
          <Route
            path="/history"
            element={
              <>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarTrigger />
                  <App />
                </SidebarProvider>
              </>
            }
          />
          <Route
            path="/parental"
            element={
              <>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarTrigger />
                  <App />
                </SidebarProvider>
              </>
            }
          />
          <Route
            path="/stats"
            element={
              <>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarTrigger />
                  <App />
                </SidebarProvider>
              </>
            }
          />
          <Route
            path="/manage-user"
            element={
              <>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarTrigger />
                  <App />
                </SidebarProvider>
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarTrigger />
                  <App />
                </SidebarProvider>
              </>
            }
          />
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
