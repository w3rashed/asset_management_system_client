import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Login_&_Register/Login";
import Register from "@/Pages/Login_&_Register/Register";
import Root from "@/Root/Root";
import { createBrowserRouter } from "react-router-dom";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);
