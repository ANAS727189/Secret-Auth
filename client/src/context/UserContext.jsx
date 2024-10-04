import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log("Logging in user: ", userData); // Debug log
    setUser(userData);
  };

  const logout = () => {
    console.log("Logging out user"); // Debug log
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);