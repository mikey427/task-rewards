import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext.tsx';
import Login from "./Login.tsx";

function App() {
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    console.log(user)
  }, [user])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <div>Home
      {user?.Email}
    </div>
  );
}

export default App;
