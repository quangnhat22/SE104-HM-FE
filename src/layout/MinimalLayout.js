import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const MinimalLayout = () => (
  <>
    <Outlet />
    <ToastContainer/>
  </>
);

export default MinimalLayout;
