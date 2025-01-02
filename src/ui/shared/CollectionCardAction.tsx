import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  useChangeCollectionTypeMutation,
  useTempDeleteCollectionMutation,
} from "@/redux/slices/collectionApiSlice";
import {
  changeStateCollectionType,
  deleteStateCollection,
} from "@/redux/slices/collectionSlice";

const CollectionCardAction = ({
  colId,
  type,
}: {
  colId: string;
  type: string;
}) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [changeType] = useChangeCollectionTypeMutation();
  const [deleteColTemp] = useTempDeleteCollectionMutation();
  const handleMakePrivate = () => {
    if (accessToken) {
      const value = type === "public" ? "private" : "public";
      const request: ChangeTypeRequest = {
        value: value,
        accessToken: accessToken as string,
        id: colId,
      };
      changeType(request);
      dispatch(changeStateCollectionType(request));
      toast.success("Collection type changed successfully");
    } else {
      toast.error("User session expired, Please login to proceed");
      navigate("/auth");
    }
  };

  const handleDelete = async () => {
    if (accessToken) {
      const res = await deleteColTemp({
        id: colId,
        accessToken: accessToken as string,
      });
      res.data && dispatch(deleteStateCollection(res.data));
      toast.success("Collection Deleted successfully");
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

export default CollectionCardAction;
