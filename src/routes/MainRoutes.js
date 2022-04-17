import MainLayout from "../layout/MainLayout";
import MonthlyReport from '../pages/MonthlyReport';
import { lazy } from "react";
import Loadable from "../ui-component/Loadable";

const TestPage = Loadable(lazy(() => import("../pages/TestPage")));
const Room = Loadable(lazy(() => import("../pages/Room")));
const Booking = Loadable(lazy(() => import('../pages/Booking')));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <TestPage />,
    },
    {
      path: "/room",
      element: <Room />,
    },
    {
      path: '/monthly-report',
      element: <MonthlyReport />
    },
    {
      path: '/booking/:id',
      element: <Booking />
    },
  ],
};

export default MainRoutes;
