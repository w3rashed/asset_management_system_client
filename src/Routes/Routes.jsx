import Request_for_asset from "@/Pages/Employee/Request_for_asset/Request_for_asset";
import Home from "@/Pages/Home/Home";
import AddAnEmployee from "@/Pages/HrManager/AddAnEmployee/AddAnEmployee";
import AddAsset from "@/Pages/HrManager/AddAsset/AddAsset";
import AllRequest from "@/Pages/HrManager/AllRequest/AllRequest";
import AssetsList from "@/Pages/HrManager/AssetsList/AssetsList";
import MyEmployeeList from "@/Pages/HrManager/MyEmployeeList/MyEmployeeList";
import UpdateAsset from "@/Pages/HrManager/UpdateAsset/UpdateAsset";
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
      {
        path: "/request_for_assets",
        element: <Request_for_asset></Request_for_asset>,
      },

      // hr route
      {
        path: "/join_hr_manager",
        element: <JoinAsHrManager></JoinAsHrManager>,
      },
      {
        path: "/asset_list",
        element: <AssetsList></AssetsList>,
      },
      {
        path: "update_asset",
        element: <UpdateAsset></UpdateAsset>,
      },
      {
        path: "/add_asset",
        element: <AddAsset></AddAsset>,
      },
      {
        path: "/all_requests",
        element: <AllRequest></AllRequest>,
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
