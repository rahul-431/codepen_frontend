import Navbar from "@/ui/shared/Navbar";
import SideBar from "@/ui/shared/SideBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex">
        <SideBar />
      </div>
      <div className="flex flex-col w-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
