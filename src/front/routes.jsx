import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Private } from "./pages/Private";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { PrivateRoute } from "./components/PrivateRoute";

export const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      
        <Route element={<PrivateRoute />}>
          <Route path="/private" element={<Private />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
