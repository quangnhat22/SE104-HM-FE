import { lazy } from "react";
import Loadable from "../../ui-component/Loadable";
const Account = Loadable(lazy(() => import("../../pages/Account")));

const AccountRoutes = [
  {
    path: "/accounts",
    element: <Account />,
  },
];

export default AccountRoutes;
