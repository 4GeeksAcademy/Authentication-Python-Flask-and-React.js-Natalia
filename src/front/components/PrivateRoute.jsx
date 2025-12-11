import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};