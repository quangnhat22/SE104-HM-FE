import { lazy } from "react";
import Loadable from "../../ui-component/Loadable";

const Dashboard = Loadable(lazy(() => import("../../pages/Dashboard")));
const Room = Loadable(lazy(() => import("../../pages/Room")));
const Booking = Loadable(lazy(() => import("../../pages/Booking")));
const Payment = Loadable(lazy(() => import("../../pages/Payment")));
const Receipt = Loadable(lazy(() => import("../../pages/Receipt")));
const ReceiptDetail = Loadable(lazy(() => import("../../pages/ReceiptDetail")));
const MonthlyReport = Loadable(lazy(() => import("../../pages/MonthlyReport")));
const RentVoucherDetail = Loadable(lazy(() => import("../../pages/RentVoucherDetail")));

const CommonRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/room",
    element: <Room />,
  },
  {
    path: "/monthly-report",
    element: <MonthlyReport />,
  },
  {
    path: "/monthly-report/:year/:month",
    element: <MonthlyReport />,
  },
  {
    path: "/booking/:id",
    element: <Booking />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/receipt",
    element: <Receipt />,
  },
  {
    path: "/receipt/:id",
    element: <ReceiptDetail />,
  },
  {
    path: "/rent-voucher-detail/:id",
    element: <RentVoucherDetail />,
  },
];

export default CommonRoutes;
