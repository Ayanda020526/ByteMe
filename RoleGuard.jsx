// src/components/RoleGuard.jsx
import { Navigate } from "react-router-dom";

/**
 * Reusable layout security guard block.
 * @param {Array} allowedRoles - List of strings permitted to pass (e.g. ["student", "lecturer"])
 */
export function RoleGuard({ children, allowedRoles }) {
  const activeUser = JSON.parse(localStorage.getItem("user"));

  // 1. If not logged in at all, kick them back to login page
  if (!activeUser) {
    return <Navigate to="/login" replace />;
  }

  // 2. If their role variable doesn't match the permissions array, send them to dashboard
  if (!allowedRoles.includes(activeUser.role)) {
    alert("⛔ Access Denied: Your account role lacks clearance for this panel.");
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Permitted entry path clearance granted
  return children;
}
