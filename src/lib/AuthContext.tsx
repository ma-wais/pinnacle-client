import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch } from "./api";
import type { User } from "./types";

type AuthState = {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (input: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    addressLine1?: string;
    city?: string;
    postcode?: string;
    businessName?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const data = await apiFetch<{ user: User | null }>(
        `/api/auth/me?t=${Date.now()}`,
      );
      console.log("Auth Refresh Result:", data);
      setUser(data.user);
    } catch (err) {
      console.error("Auth Refresh Failed:", err);
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    console.log("Attempting login...");
    const res = await apiFetch<{ token: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.token) {
      localStorage.setItem("token", res.token);
    }
    console.log("Login successful, refreshing...");
    await refresh();
  };

  const register: AuthState["register"] = async (input) => {
    const res = await apiFetch<{ token: string }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
    if (res.token) {
      localStorage.setItem("token", res.token);
    }
    await refresh();
  };

  const logout = async () => {
    localStorage.removeItem("token");
    await apiFetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  useEffect(() => {
    (async () => {
      try {
        await refresh();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const value = useMemo<AuthState>(
    () => ({ user, loading, refresh, login, register, logout }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
