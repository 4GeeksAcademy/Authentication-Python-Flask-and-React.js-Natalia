import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const saveToken = (token) => {
    sessionStorage.setItem("token", token);
  };

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const isAuthenticated = () => {
    return !!getToken();
  };

  return { saveToken, getToken, logout, isAuthenticated };
};
