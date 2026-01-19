import * as React from "react";

const STORAGE_KEY = "ceo:isLoggedIn";

function readStored() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

type AuthState = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    setIsLoggedIn(readStored());
  }, []);

  const login = React.useCallback(() => {
    setIsLoggedIn(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
  }, []);

  const logout = React.useCallback(() => {
    setIsLoggedIn(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "false");
    } catch {}
  }, []);

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
}

