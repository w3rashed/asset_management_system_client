import Home from "@/Pages/Home/Home";
import AddAnEmployee from "@/Pages/HrManager/AddAnEmployee/AddAnEmployee";
import AddAsset from "@/Pages/HrManager/AddAsset/AddAsset";
import MyEmployeeList from "@/Pages/HrManager/MyEmployeeList/MyEmployeeList";
import JoinAsEmployee from "@/Pages/Login_&_Register/JoinAsEmployee/JoinAsEmployee";
import JoinAsHrManager from "@/Pages/Login_&_Register/JoinAsHrManager/JoinAsHrManager";
import MyProfile from "@/Pages/MyProfile/MyProfile";
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
        path: "/porfile",
        element: <MyProfile></MyProfile>,
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
      {
        path: "/my_employee_list",
        element: <MyEmployeeList></MyEmployeeList>,
      },
      {
        path: "/add_employee",
        element: <AddAnEmployee></AddAnEmployee>,
      },
    ],
  },
]);
