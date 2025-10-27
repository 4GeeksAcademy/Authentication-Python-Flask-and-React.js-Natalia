import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Private = () => {
  const [message, setMessage] = useState("");
  const { getToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const token = getToken();

    fetch("http://localhost:3001/api/private", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setMessage(data.msg))
      .catch(() => navigate("/login"));
  }, []);

  return (
    <div className="private-container">
      <h2>User Dashboard</h2>
      <p>{message || "Loading..."}</p>
    </div>
  );
};
