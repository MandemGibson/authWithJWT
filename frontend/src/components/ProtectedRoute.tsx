import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  console.log("User status in ProtectedRoute:", user);

  if (isLoading) return <div>Loading...</div>;
  if (!isLoading && !user) {
    return <Navigate to="/auth/signin" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
