import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App as Index } from '@/pages/index';
import { Dash } from '@/pages/dashboard';

const pages: Record<string, any> = import.meta.glob("@/pages/**/*.tsx", { eager: true });

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/dashboard",
      element: <Dash />,
    },
  ]
);

export const App = () => {
  return <RouterProvider router={router} />;
};
