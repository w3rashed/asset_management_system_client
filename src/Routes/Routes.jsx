import Home from "@/Pages/Home/Home";
import AddAsset from "@/Pages/HrManager/AddAsset/AddAsset";
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
      // employe route
      {
        path: "/join_employee",
        element: <JoinAsEmployee></JoinAsEmployee>,
      },

      // hr route
      {
        path: "/join_hr_manager",
        element: <JoinAsHrManager></JoinAsHrManager>,
      },
      {
        path: "/add_asset",
        element: <AddAsset></AddAsset>,
      },
    ],
  },
]);
