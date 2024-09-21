import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { userLoggedIn, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error checking authentication. Please try again.
      </div>
    );
  }

  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
