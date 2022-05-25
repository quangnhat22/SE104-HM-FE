import MainLayout from "../layout/MainLayout";
import MonthlyReport from '../pages/MonthlyReport';
import { lazy } from "react";
import Loadable from "../ui-component/Loadable";

const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const Room = Loadable(lazy(() => import("../pages/Room")));
const CustomerSettings = Loadable(lazy(() => import('../pages/CustomerSettings')));
const Booking = Loadable(lazy(() => import('../pages/Booking')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Receipt = Loadable(lazy(() => import('../pages/Receipt')));
const ReceiptDetail = Loadable(lazy(() => import('../pages/ReceiptDetail')));
const RoomSettings = Loadable(lazy(() => import('../pages/RoomSettings')));
const SurchargeRateSetting = Loadable(lazy(() => import('../pages/SurchargeRateSetting')));


const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Dashboard />,
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
      path: '/monthly-report/:year/:month',
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
      path: '/receipt',
      element: <Receipt />
    },
    {
      path: '/receipt/:id',
      element: <ReceiptDetail />
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
