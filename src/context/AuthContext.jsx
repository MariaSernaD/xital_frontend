import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService } from "../services/authService";
import {
  getToken,
  saveToken,
  clearToken,
  decodeToken,
  isTokenExpired,
} from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    if (isTokenExpired(token)) {
      clearToken();
      setLoading(false);
      return;
    }

    const payload = decodeToken(token);
    if (payload) {
      setUser({ id: payload.userId, name: payload.name, role: payload.role });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "authToken" && !event.newValue) {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = async (credentials) => {
    const { token } = await loginService(credentials);
    saveToken(token);
    const payload = decodeToken(token);
    if (!payload) throw new Error("Token inválido");
    setUser({ id: payload.userId, name: payload.name, role: payload.role });
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const value = { user, isAuthenticated: !!user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro del <AuthProvider> ");
  }
  return ctx;
}
