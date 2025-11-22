import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

export default function ProtectedRoute({ children }) {
  const { user, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
