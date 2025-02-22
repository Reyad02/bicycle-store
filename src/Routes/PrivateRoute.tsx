import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const userEmail = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  if (!token || !userEmail) {
    return <Navigate to="/login" replace={true} state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;
