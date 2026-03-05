import { Navigate } from "react-router-dom";

function BrandRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "brand") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default BrandRoute;
