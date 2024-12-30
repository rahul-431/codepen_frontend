import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!accessToken) navigate("/auth");
  }, [accessToken, navigate]);
  if (accessToken) return children;
};

export default ProtectedRoute;
