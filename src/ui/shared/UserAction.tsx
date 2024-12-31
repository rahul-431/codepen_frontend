import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineLayout } from "react-icons/ai";
import { BsCollection } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/slices/authApiSlice";
import { toast } from "sonner";
import { removeUser } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

const UserAction = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const handleLogout = async () => {
    if (accessToken) {
      await logout({ accessToken: accessToken });
    }
    dispatch(removeUser());
    localStorage.clear();
    navigate("/");
    toast.success("Logout successfully");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="user profile"
          className="w-12 h-12 object-contain rounded-md"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#1E1F26] text-white space-y-2 p-2 border-none min-w-40">
        <DropdownMenuItem
          onClick={() => navigate("/app/your-work")}
          className="text-md font-semibold"
        >
          Your work
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate("/app/profile")}
          className="text-md font-semibold"
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate("/pen")}
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
  );
};

export default UserAction;
