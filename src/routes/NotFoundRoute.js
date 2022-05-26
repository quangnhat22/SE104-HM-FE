import { lazy } from 'react';
import Loadable from '../ui-component/Loadable';

const NotFound = Loadable(lazy(() => import('../pages/NotFound')));
const NotFoundRoute = {
  path: "*",
  element: <NotFound />,
};

export default NotFoundRoute;
