import MinimalLayout from "../layout/MinimalLayout";
import { lazy } from 'react';
import Loadable from '../ui-component/Loadable';

const AuthLogin = Loadable(lazy(() => import('../pages/Login')));
const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    }
  ],
};

export default AuthenticationRoutes;
