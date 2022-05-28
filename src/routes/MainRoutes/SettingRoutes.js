import { lazy } from "react";
import Loadable from "../../ui-component/Loadable";
const CustomerSettings = Loadable(lazy(() => import("../../pages/CustomerSettings")));
const RoomSettings = Loadable(lazy(() => import("../../pages/RoomSettings")));
const SurchargeRateSetting = Loadable(lazy(() => import("../../pages/SurchargeRateSetting")));

const SettingRoutes = [
  {
    path: "/customer-settings",
    element: <CustomerSettings />,
  },
  {
    path: "/room-settings",
    element: <RoomSettings />,
  },
  {
    path: "/surcharge-rate-settings",
    element: <SurchargeRateSetting />,
  },
];

export default SettingRoutes;
