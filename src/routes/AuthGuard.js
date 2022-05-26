import { Navigate, Outlet } from "react-router-dom";
// import Cookies from 'js-cookie'

const Auth = () => {
  // let user = Cookies.get("user");
  // if (user) return true;
  return false;
};

const ProtectedRoutes = () => {
  let isAuth = Auth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
