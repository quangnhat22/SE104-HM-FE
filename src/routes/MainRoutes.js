import Cookies from "js-cookie";
import { lazy, useEffect, useState } from "react";
import Loadable from "../ui-component/Loadable";
import AccountRoutes from "./MainRoutes/AccountRoutes";
import CommonRoutes from "./MainRoutes/CommonRoute";
import SettingRoutes from "./MainRoutes/SettingRoutes";

const AuthGuard = Loadable(lazy(() => import("./AuthGuard")));

const MainRoutes = () => {
  const userLevel = Cookies.get("level");
  const [level, setLevel] = useState(-1);
  useEffect(() => {
    setLevel(userLevel);
  }, [userLevel]);
  return {
    path: "/",
    element: <AuthGuard />,
    children:
      level === "0"
        ? CommonRoutes.concat(SettingRoutes, AccountRoutes)
        : CommonRoutes,
  };
};

export default MainRoutes;
