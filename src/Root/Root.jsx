import NavMenu from "@/Pages/Shared/NavMenu";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <NavMenu></NavMenu>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
