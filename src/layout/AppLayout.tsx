import { useGetCurrentUserQuery } from "@/redux/slices/authApiSlice";
import { addUser } from "@/redux/slices/authSlice";
import Navbar from "@/ui/shared/Navbar";
import SideBar from "@/ui/shared/SideBar";
import Spinner from "@/ui/shared/Spinner";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  // Use the query hook conditionally based on the presence of the access token
  const {
    data: user,
    error,
    isLoading,
  } = useGetCurrentUserQuery(
    { accessToken: accessToken as string },
    { skip: !accessToken } // Skip the query if no accessToken
  );
  if (user) {
    dispatch(addUser(user));
  }
  if (error) {
    console.log(error);
  }
  if (isLoading) {
    return (
      <div className="h-screen bg-primary flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

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

export default AppLayout;
