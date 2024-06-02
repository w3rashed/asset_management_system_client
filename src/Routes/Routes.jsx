import Home from "@/Pages/Home/Home";
import JoinAsEmployee from "@/Pages/Login_&_Register/JoinAsEmployee/JoinAsEmployee";
import JoinAsHrManager from "@/Pages/Login_&_Register/JoinAsHrManager/JoinAsHrManager";
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
      {
        path: "/join_employee",
        element: <JoinAsEmployee></JoinAsEmployee>,
      },
      {
        path: "/join_hr_manager",
        element: <JoinAsHrManager></JoinAsHrManager>,
      },
    ],
  },
]);
