import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UseContextApi } from "../Context/UseContextApi";

const AuthProtected = ({ children, authentication = true }) => {
  const { user } = useContext(UseContextApi);
  const location = useLocation();

  // Not logged in but route requires auth
  if (!user && authentication) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Logged in but trying to access login page
  if (user && !authentication) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthProtected;