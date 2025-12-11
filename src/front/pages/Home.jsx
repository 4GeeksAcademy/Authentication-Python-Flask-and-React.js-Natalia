import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import nosignalImg from "../assets/error.png"; 


export const Home = () => {
  return (
    <div className="tv-screen">
      <img
        className="tv-background"
        src={nosignalImg}
        alt="No Signal"
      />
      <div className="tv-overlay">
        <Link to="/signup" className="tv-button">
          <span className="normal-text">WELCOME</span>
          <span className="hover-text">SIGN UP</span>
        </Link>
        <Link to="/login" className="tv-button" style={{ marginTop: "20px" }}>
          <span className="normal-text">ALREADY HAVE ACCOUNT?</span>
          <span className="hover-text">LOGIN</span>
        </Link>
      </div>
    </div>
  );
};
