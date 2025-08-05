import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  ID: string;
  Name: string;
  Email: string;
  Balance: number;
  CreatedAt: Date;
  DeleteAt: Date;
  UpdatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:3000";

//   useEffect(() => {
//     checkAuthStatus();
//     // console.log(AuthContext)
//   }, []);

// const checkAuthStatus = async (): Promise<void> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/auth/validate`, {
//       credentials: "include", // Sends cookies
//     });

//     if (response.ok) {
//       const userData: User = await response.json();
//       console.log(userData);
//       setUser(userData);
//     } else {
//       setUser(null);
//     }
//   } catch (error) {
//     console.error("Auth check failed: ", error);
//     setUser(null);
//   } finally {
//     setLoading(false);
//   }
// };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:3000";
  useEffect(() => {
    console.log("AuthProvider mounted, calling checkAuthStatus");
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async (): Promise<void> => {
    console.log("checkAuthStatus called");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/validate`, {
        credentials: "include",
      });

      console.log("Response status:", response.status, response.ok);

      if (response.ok) {
        const userData: User = await response.json();
        console.log("Setting user data:", userData);
        setUser(userData);
      } else {
        console.log("Response not ok, setting user to null");
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed: ", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    console.log("Cookies being sent:", document.cookie);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const userData: User = await response.json();
        console.log(userData);
        setUser(userData);
        console.log("successful login");
        return { success: true };
      } else {
        const error = await response.json();
        console.log("failed login");
        return { success: false, error: error.message };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
