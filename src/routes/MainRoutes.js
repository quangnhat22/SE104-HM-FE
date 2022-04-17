import MainLayout from "../layout/MainLayout";
import MonthlyReport from '../pages/MonthlyReport';
import { lazy } from "react";
import Loadable from "../ui-component/Loadable";

const TestPage = Loadable(lazy(() => import("../pages/TestPage")));
const Room = Loadable(lazy(() => import("../pages/Room")));
const CustomerSettings = Loadable(lazy(() => import('../pages/CustomerSettings')));
const Booking = Loadable(lazy(() => import('../pages/Booking')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const RoomSettings = Loadable(lazy(() => import('../pages/RoomSettings')));
const SurchargeRateSetting = Loadable(lazy(() => import('../pages/SurchargeRateSetting')));


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
    {
      path: '/payment',
      element: <Payment />
    },
    {
      path: '/customer-settings',
      element: <CustomerSettings />
    },
    {
      path: '/room-settings',
      element: <RoomSettings />
    },
    {
      path: '/surcharge-rate-settings',
      element: <SurchargeRateSetting />
   },
  ],
};

export default MainRoutes;
