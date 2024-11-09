import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const userData = {
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:3000/api/login",
        userData
      );
      localStorage.setItem("token", response.data.token);
      const { data } = await axios.get("/profile", {
        headers: { Authorization: `Bearer ${response.data.token}` },
      });
      setUser(data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const register = async (name, email, password, confirmPassword) => {
    const data = {
      name,
      email,
      password,
      confirmPassword,
    };
    try {
      await axios.post("/api/register", data);
      await login(email, password);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get(
            "/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
