import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext.tsx";
import Login from "./Login.tsx";

function App() {
  const { user, isAuthenticated, loading, checkAuthStatus } = useAuth();

  // useEffect(() => {
  //   if (!user?.email) {
  //     // Need to fix this late - half-ass solution to auth state being empty on load after login
  //     checkAuthStatus();
  //   }
  // }, []);
  useEffect(() => {
    // if (!user?.email) {
    //   // Need to fix this late - half-ass solution to auth state being empty on load after login
    //   checkAuthStatus();
    // }
  }, []);

  useEffect(() => {
    console.log("App component - user changed:", user);
    console.log("App component - loading state:", loading);
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Home
      {user?.Email}
    </div>
  );
}

export default App;
