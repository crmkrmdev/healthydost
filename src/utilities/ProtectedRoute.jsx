import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const purpose = localStorage.getItem("purpose");

  if (!purpose) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
