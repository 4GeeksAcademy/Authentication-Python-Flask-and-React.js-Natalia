import { useState } from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_BACKEND_URL || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ msg: "Error" }));
        throw new Error(data.msg || "Error en registro");
      }
      
      window.location.href = "/login";
    } catch (err) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Join Us!</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
      {error && <p style={{ color: "pink", marginTop: "10px" }}>{error}</p>}

      <p className="mt-3">
        Do you already have an account? <Link to="/login">LogIn</Link>
      </p>
    </div>
  );
};