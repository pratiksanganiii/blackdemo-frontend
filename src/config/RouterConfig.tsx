import { useRoutes } from "react-router-dom";
import Dashboard from "../app_pages/Dashboard";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import React from "react";
const Login = React.lazy(() => import("../app_pages/Login"));
const Register = React.lazy(() => import("../app_pages/Register"));

const RouterConfig = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
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
