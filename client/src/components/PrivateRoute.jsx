import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { Navigate, useLocation } from "react-router-dom";
//import { useEffect } from "react";

function PrivateRoute({ children }) {
  const { user } = useAppContext();
  const location = useLocation();

  if (!user) {
    toast.error("You must be logged in to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
