import React from "react";
import { Navigate } from "react-router-dom";

const StaffRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (user.role !== "staff") {
    // Not staff, redirect
    return <Navigate to="/" />;
  }

  return children;
};

export default StaffRoute;