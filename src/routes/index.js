import config from "../config";
import { useRoutes } from "react-router-dom";
import AuthenticationRoutes from "./AuthenticationRoutes";
import MainRoutes from "./MainRoutes";
import NotFoundRoute from "./NotFoundRoute";

export default function Routes() {
  const NewMainRoutes = MainRoutes()
  return useRoutes([NewMainRoutes, AuthenticationRoutes, NotFoundRoute], config.basename);
}
