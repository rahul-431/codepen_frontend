import Navbar from "@/ui/shared/Navbar";
import SideBar from "@/ui/shared/SideBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex">
        <SideBar />
      </div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
