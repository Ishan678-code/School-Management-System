

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Mock credentials
const USERS = {
  "admin@edumanage.com":   { password: "admin123",   role: "admin" },
  "teacher@edumanage.com": { password: "teacher123", role: "teacher" },
  "student@edumanage.com": { password: "student123", role: "student" },
  "parent@edumanage.com":  { password: "parent123",  role: "parent" },
};

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const found = USERS[email.toLowerCase()];

    if (!found || found.password !== password) {
      return { success: false, message: "Invalid email or password" };
    }

    const userData = { role: found.role, email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true, role: found.role };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // We only show loading if we are strictly waiting for initial mount
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans bg-slate-50">
        <div className="text-blue-600 font-medium">Loading session...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};