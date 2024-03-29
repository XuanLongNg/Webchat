import { LayoutProps } from "antd";
import MainLayout from "../layouts/MainLayout/MainLayout";
import { Navigate, RouteObject } from "react-router";
import { AppRoutes } from "./appRoutes";
import Homepage from "../pages/home/homePage";
import Login from "../pages/LogIn/logIn";
import Message from "../pages/Message/message";
import Register from "../pages/Register/register";
type RouteProperties = {
  layout?: React.FC<LayoutProps>;
};

type ConfigRoute = RouteObject & RouteProperties;

export const ConfigRoutes: ConfigRoute[] = [
  {
    element: <Homepage />,
    path: AppRoutes.URL,
    index: true,
  },
  {
    element: <Login />,
    path: AppRoutes.LOG_IN,
  },
  {
    element: <Register />,
    path: AppRoutes.REGISTER,
  },
  {
    element: <Message />,
    path: AppRoutes.MESSAGE,
    layout: MainLayout,
  },
  {
    path: "*",
    element: <Navigate to={AppRoutes.NOT_FOUND} />,
  },
];
