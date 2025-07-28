import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext.tsx";
import Login from "./Login.tsx";

function App() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>ERROR: UNAUTHENTICATED</div>;
  }

  return <div>Home</div>;
}

export default App;
