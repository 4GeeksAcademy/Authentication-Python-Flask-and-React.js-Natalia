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
          <span className="normal-text">NO SIGNAL</span>
          <span className="hover-text">ENTER THE SYSTEM</span>
        </Link>
      </div>
    </div>
  );
};
