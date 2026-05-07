import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

type protectedRouteProp = {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: protectedRouteProp) {
  const { user, isLoading } = useContext(AuthContext)!;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}