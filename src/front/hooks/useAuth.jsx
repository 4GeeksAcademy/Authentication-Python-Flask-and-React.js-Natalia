// useAuth.jsx
export const useAuth = () => {
  const saveToken = (token) => sessionStorage.setItem("token", token);
  const getToken = () => sessionStorage.getItem("token");
  const logout = () => {
    sessionStorage.removeItem("token");
  };
  const isAuthenticated = () => !!getToken();

  return { saveToken, getToken, logout, isAuthenticated };
};
