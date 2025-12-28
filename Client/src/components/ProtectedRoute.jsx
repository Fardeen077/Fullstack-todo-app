import useAuthStore from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = useAuthStore((state) => state.isAuth);

  // if user are note login set Naviagte into login page 
  if (!isAuth) return <Navigate to="/login" replace />
  return children;
}

export default ProtectedRoute;