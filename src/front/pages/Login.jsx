import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const API = import.meta.env.VITE_BACKEND_URL || "";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Login error");
      
      sessionStorage.setItem("token", data.token);
      window.location.href = "/private";
    } catch (err) {
      setError(err.message || "Failed to fetch");
    }
  };

  return (
    <div className="form-container">
      <h2>LogIn</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button">Enter</button>
      </form>

      {error && <p style={{ color: "pink" }}>{error}</p>}

      <p className="mt-3">
       Don't have an account yet?? <Link to="/signup">SignUp</Link>
      </p>
    </div>
  );
};