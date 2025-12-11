import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          🟦
        </Link>

        <div>
          {!token ? (
            <>
              <Link to="/signup" className="btn">
                Signup
              </Link>
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/private"className="btn">
              Private
              </Link>{" "}
            </>
          ) : (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}