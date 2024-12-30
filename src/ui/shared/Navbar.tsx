import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineLayout } from "react-icons/ai";
import { RootState } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { BsCollection } from "react-icons/bs";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/slices/authApiSlice";
import { toast } from "sonner";
import { removeUser } from "@/redux/slices/authSlice";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const { pathname } = useLocation();
  const arr = pathname.split("/");
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  //close the modal when clicked outside
  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);
  const handleLogout = async () => {
    if (accessToken) {
      await logout({ accessToken: accessToken });
    }
    dispatch(removeUser());
    localStorage.clear();
    navigate("/");
    toast.success("Logout successfully");
  };
  const createNewPen = () => {};
  return (
    <div className="relative w-full">
      <div className="bg-black px-2 md:px-12 py-3 flex justify-between items-center w-full">
        <div className="flex sm:gap-4 gap-2 items-center">
          <div className="flex gap-2 sm:gap-4 items-center lg:hidden">
            <img
              src="https://blog.codepen.io/wp-content/uploads/2023/09/logo-white.png"
              alt=""
              className="sm:w-10 sm:h-10 h-7 w-7 cursor-pointer"
              //   onClick={}
            />
            <button
              onClick={() => setOpen(!open)}
              className="text-2xl text-white p-2 bg-[#1E1F26] rounded-md hover:bg-[#272831]"
            >
              {open ? <HiBarsArrowUp /> : <HiBarsArrowDown />}
            </button>
          </div>
          {user?._id && (
            <div className="hidden md:flex items-center gap-1 rounded-md">
              <Link
                to="/app"
                className={`${
                  arr[2] === "your-work"
                    ? "bg-[#272831] border-b border-green-400 "
                    : "hover:border-slate-400"
                } hover:bg-[#272831] p-2 bg-[#1E1F26] hover:border-b  font-semibold hover:text-white rounded-s-md text-slate-400`}
              >
                Your Work
              </Link>
              <Link
                to="following"
                className={`${
                  arr[2] === "following"
                    ? "bg-[#272831] border-b border-green-400"
                    : "hover:border-slate-400"
                } hover:bg-[#272831] p-2 bg-[#1E1F26] hover:border-b  font-semibold hover:text-white  text-slate-400`}
              >
                Following
              </Link>
              <Link
                to="trending"
                className={`${
                  arr[2] === "trending"
                    ? " bg-[#272831] border-b border-green-400 "
                    : "hover:border-slate-400"
                } hover:bg-[#272831] p-2 bg-[#1E1F26] hover:border-b  font-semibold hover:text-white rounded-e-md text-slate-400`}
              >
                Trending
              </Link>
            </div>
          )}
          <div className="flex text-white items-center gap-1 px-2 w-24 sm:w-80 bg-[#1E1F26] rounded-md">
            <div className="left-4 top-2 text-lg">
              <IoSearch />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search"
              className="p-2 bg-transparent  text-white focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2 md:gap-4">
          {user?._id ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="user profile"
                  className="w-12 h-12 object-contain rounded-md"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1E1F26] text-white space-y-2 p-2 border-none min-w-40">
                <DropdownMenuItem className="text-md font-semibold">
                  Your work
                </DropdownMenuItem>
                <DropdownMenuItem className="text-md font-semibold">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={createNewPen}
                  className="text-md font-semibold"
                >
                  <span>
                    <AiOutlineLayout />
                  </span>
                  New Pen
                </DropdownMenuItem>
                <DropdownMenuItem className="text-md font-semibold">
                  <span>
                    <BsCollection />
                  </span>
                  <span>New Collection</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-md font-semibold">
                  <span>
                    <IoSettingsOutline />
                  </span>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-md font-semibold"
                >
                  <span className="text-xl">
                    <IoIosLogOut />
                  </span>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              size="sm"
              className="text-md bg-green-700 hover:bg-green-600"
            >
              Login
            </Button>
          )}{" "}
        </div>
      </div>

      <div
        ref={ref}
        className={`${
          open ? "flex" : "hidden"
        } text-white absolute sm:w-[300px] sm:h-[280px] p-4 flex-col gap-4 bg-primary`}
      >
        <div className="flex flex-col gap-2">
          <p className="font-semibold">TRY OUT ONLINE EDITOR</p>
          <button className="p-2 rounded-md border-4 border-green-800 hover:border-green-600 tex-white font-semibold bg-black">
            Start Coding
          </button>
        </div>
        <ul className="flex flex-col gap-2 text-white font-semibold">
          <li>Search Pens</li>
          <li>Challenges</li>
          <li>Spark</li>
        </ul>
        <p className="flex gap-2 font-semibold">
          <span>CodePen</span>
          <span className="px-2 bg-yellow-600">Pro</span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
