import React, { createContext, useState, useContext } from "react";

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);
  const [loading, setLoading] = useState(false);

  // 🔹 login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/adminlogin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // save token
      setToken(data.token);
      localStorage.setItem("adminToken", data.token);

      setAdmin({ email });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // 🔹 logout function
  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("adminToken");
  };

  return (
    <AdminContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
