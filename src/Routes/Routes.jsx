import MyAssets from "@/Pages/Employee/MyAssets/MyAssets";
import MyTeam from "@/Pages/Employee/MyTeam/MyTeam";
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
import MyDocument from "@/components/MyDocument/MyDocument";
import Payment from "@/components/Payment/Payment";
import SubscriptionPage from "@/components/SubscriptionPage/SubscriptionPage";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

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
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      // employe route
      {
        path: "/join_employee",
        element: <JoinAsEmployee></JoinAsEmployee>,
      },
      {
        path: "/my_assets",
        element: (
          <PrivateRoute>
            <MyAssets></MyAssets>,
          </PrivateRoute>
        ),
      },
      {
        path: "/my_document",
        element: (
          <PrivateRoute>
            <MyDocument></MyDocument>,
          </PrivateRoute>
        ),
      },
      {
        path: "/my_team",
        element: (
          <PrivateRoute>
            <MyTeam></MyTeam>,
          </PrivateRoute>
        ),
      },
      {
        path: "/request_for_assets",
        element: (
          <PrivateRoute>
            <Request_for_asset></Request_for_asset>,
          </PrivateRoute>
        ),
      },

      // hr route
      {
        path: "/subscription_page",
        element: <SubscriptionPage></SubscriptionPage>,
      },
      {
        path: "/join_hr_manager",
        element: <JoinAsHrManager></JoinAsHrManager>,
      },
      {
        path: "join_hr_manager/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(
            `https://asset-nex-server.vercel.app/join_hr_manager/payment/${params.id}`
          ),
      },
      {
        path: "/asset_list",
        element: (
          <PrivateRoute>
            <AssetsList></AssetsList>
          </PrivateRoute>
        ),
      },
      {
        path: "asset_list/update_asset/:id",
        element: (
          <PrivateRoute>
            <UpdateAsset></UpdateAsset>
          </PrivateRoute>
        ),
      },
      {
        path: "/add_asset",
        element: (
          <PrivateRoute>
            <AddAsset></AddAsset>,
          </PrivateRoute>
        ),
      },
      {
        path: "/all_requests",
        element: (
          <PrivateRoute>
            <AllRequest></AllRequest>,
          </PrivateRoute>
        ),
      },
      {
        path: "/my_employee_list",
        element: (
          <PrivateRoute>
            <MyEmployeeList></MyEmployeeList>,
          </PrivateRoute>
        ),
      },
      {
        path: "/add_employee",
        element: (
          <PrivateRoute>
            <AddAnEmployee></AddAnEmployee>,
          </PrivateRoute>
        ),
      },
    ],
  },
]);
