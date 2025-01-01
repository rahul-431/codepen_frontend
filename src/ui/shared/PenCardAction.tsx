import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsBoxes } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import {
  useChangeTypeMutation,
  useTempDeletePenMutation,
} from "@/redux/slices/penApiSlice";
import { toast } from "sonner";
import { changeStatePenType, deleteStatePen } from "@/redux/slices/penSlice";
import { useNavigate } from "react-router-dom";

const PenCardAction = ({ penId, type }: { penId: string; type: string }) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [changeType] = useChangeTypeMutation();
  const [deleteTempPen] = useTempDeletePenMutation();
  const handleAddToCollection = () => {};
  const handleMakePrivate = () => {
    if (accessToken) {
      const value = type === "public" ? "private" : "public";
      const request: ChangeTypeRequest = {
        value: value,
        accessToken: accessToken as string,
        id: penId,
      };
      changeType(request);
      dispatch(changeStatePenType(request));
      toast.success("Pen type changed successfully");
    } else {
      toast.error("User session expired, Please login to proceed");
      navigate("/auth");
    }
  };

  const handleDelete = () => {
    if (accessToken) {
      deleteTempPen({
        id: penId,
        accessToken: accessToken as string,
      });
      dispatch(deleteStatePen({ id: penId }));
      toast.success("Pen Deleted successfully");
    } else {
      toast.error("User session expired, Please login to proceed");
      navigate("/auth");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white text-3xl">
        <HiEllipsisHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#1E1F26] text-white space-y-2 p-2 border-none shadow shadow-white">
        <DropdownMenuItem
          onClick={handleAddToCollection}
          className="text-md font-semibold"
        >
          <span>
            <BsBoxes />
          </span>
          Add to Collection
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-md font-semibold"
          onClick={handleMakePrivate}
        >
          <span>
            <RiGitRepositoryPrivateLine />
          </span>
          <span>Make {type === "public" ? "Private" : "Public"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          className="text-md font-semibold"
        >
          <span>
            <MdDeleteOutline />
          </span>
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PenCardAction;
