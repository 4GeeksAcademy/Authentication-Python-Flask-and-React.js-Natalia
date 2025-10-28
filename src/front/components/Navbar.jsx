import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">🟦</Link>

        <div>
          {!isAuthenticated() ? (
            <>
              <Link to="/signup" className="btn">Signup</Link>
              <Link to="/login" className="btn">Login</Link>
            </>
          ) : (
            <button className="btn" onClick={logout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};
