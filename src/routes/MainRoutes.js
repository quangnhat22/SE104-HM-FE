import { lazy } from "react";
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import AccountRoutes from "./MainRoutes/AccountRoutes";
import CommonRoutes from "./MainRoutes/CommonRoute";
import SettingRoutes from "./MainRoutes/SettingRoutes";

const AuthGuard = Loadable(lazy(() => import("./AuthGuard")));

const MainRoutes = {
  path: "/",
  element: (
    // <AuthGuard>
    <MainLayout />
    // </AuthGuard>
  ),
  children: CommonRoutes.concat(SettingRoutes, AccountRoutes),
};

export default MainRoutes;
