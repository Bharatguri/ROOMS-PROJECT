import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("gymnest-user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Login (email + password later)
  const login = (email) => {
    const savedUser = JSON.parse(localStorage.getItem("gymnest-user"));

    if (savedUser && savedUser.email === email) {
      setUser(savedUser);
      return true;
    }

    return false;
  };

  // Register user
  const register = (data) => {
    const newUser = {
      ...data,
      role: "member", // system role
    };

    localStorage.setItem("gymnest-user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gymnest-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
