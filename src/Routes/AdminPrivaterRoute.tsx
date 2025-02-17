import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { TUser } from "../redux/features/auth/authSlice";
import { ReactNode } from "react";
import UserRole from "../Constants/Role";

const AdminPrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const userEmail = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  
  if (!token || !userEmail) {
    return <Navigate to="/login" replace={true} state={location.pathname} />;
  }

  const { role }: TUser = jwtDecode(token as string);

  if (role !== UserRole.admin) {
    return <Navigate to="/login" replace={true} state={location.pathname} />;
  }

  return children;
};

export default AdminPrivateRoute;
