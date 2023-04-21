import { useRoutes } from "react-router-dom";
import Dashboard from "../app_pages/Dashboard";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../app_pages/Login";
import MainLayout from "../layouts/MainLayout";

const RouterConfig = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
];

export const Router = () => {
  const router = useRoutes(RouterConfig);
  return router;
};
