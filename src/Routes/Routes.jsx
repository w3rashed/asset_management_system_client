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
        element: <MyAssets></MyAssets>,
      },
      {
        path: "/my_document",
        element: <MyDocument></MyDocument>,
      },
      {
        path: "/my_team",
        element: <MyTeam></MyTeam>,
      },
      {
        path: "/request_for_assets",
        element: <Request_for_asset></Request_for_asset>,
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
          fetch(`http://localhost:5000/join_hr_manager/payment/${params.id}`),
      },
      {
        path: "/asset_list",
        element: <AssetsList></AssetsList>,
      },
      {
        path: "asset_list/update_asset/:id",
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
