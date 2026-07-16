import { Navigate } from "react-router-dom";

function isTokenValid(token) {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000; 
    return payload.exp > now;
  } catch {
    return false;
  }
}

function getRolesFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.roles || [];
  } catch {
    return [];
  }
}

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");

  if (!isTokenValid(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const roles = getRolesFromToken(token);
    if (!roles.includes(requiredRole)) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
