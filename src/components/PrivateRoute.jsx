import { Navigate } from "react-router-dom";

export default function PrivateRoute({ user, allowedRoles, children }) {
  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Unauthorized
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
