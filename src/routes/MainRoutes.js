import MainLayout from "../layout/MainLayout";
import { lazy } from "react";
import Loadable from "../ui-component/Loadable";

const TestPage = Loadable(lazy(() => import("../pages/TestPage")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <TestPage />,
    },
  ],
};

export default MainRoutes;
