import Footer from "@/Pages/Shared/Footer/Footer";
import NavMenu from "@/Pages/Shared/NavMenu";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <NavMenu></NavMenu>
      <div className="min-h-[calc(100vh-445px)] container mx-auto z-0">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
