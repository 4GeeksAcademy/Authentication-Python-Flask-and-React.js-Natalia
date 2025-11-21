import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Private = () => {
  const [message, setMessage] = useState(""); // Wiadomość do wyświetlenia
  const [loading, setLoading] = useState(true); // Stan ładowania
  const { getToken, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
   
    if (!isAuthenticated()) {
      console.log("User not authenticated. Redirecting to login...");
      navigate("/login");
      return;
    }


    const token = getToken();
    console.log("Token JWT:", token);

   
    fetch("http://localhost:3001/protected", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          if (res.status === 401) {
            console.warn("Unauthorized! Logging out...");
            logout();
            navigate("/login");
          }
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data received from backend:", data);
        
        setMessage(
          `Welcome ${data.user.name}! Email: ${data.user.email}, Age: ${data.user.edad}, Description: ${data.user.description}`
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching private data:", err);
        navigate("/login");
      });
  }, [navigate, isAuthenticated, getToken, logout]);

  
  return (
    <div className="private-container">
      <h2>User Dashboard</h2>
      {loading ? <p>Loading...</p> : <p>{message}</p>}
    </div>
  );
};
