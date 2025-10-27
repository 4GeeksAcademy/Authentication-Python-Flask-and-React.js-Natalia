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
        <h1 className="tv-text">NO SIGNAL</h1>
        <Link to="/signup" className="tv-button">Enter System</Link>
      </div>
    </div>
  );
};
