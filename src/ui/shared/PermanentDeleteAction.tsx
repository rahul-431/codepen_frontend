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
  usePermanentDeleteCollectionMutation,
  useRestoreCollectionMutation,
} from "@/redux/slices/collectionApiSlice";
import {
  deleteStateCollectionPer,
  restoreCollection,
} from "@/redux/slices/collectionSlice";
import {
  usePermanentDeletePenMutation,
  useRestorePenMutation,
} from "@/redux/slices/penApiSlice";
import { deleteStatePenPer, restorePen } from "@/redux/slices/penSlice";

const PermanentDeleteAction = ({
  colId,
  type,
}: {
  colId: string;
  type: string;
}) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [deleteCol] = usePermanentDeleteCollectionMutation();
  const [deletePen] = usePermanentDeletePenMutation();
  const [restorePenApi] = useRestorePenMutation();
  const [restoreCollectionApi] = useRestoreCollectionMutation();
  const handleDelete = () => {
    if (accessToken) {
      if (type === "pen") {
        deletePen({ id: colId, accessToken: accessToken as string });
        dispatch(deleteStatePenPer({ id: colId }));
        toast.success("Pen Deleted permanently");
      }
      if (type === "collection") {
        deleteCol({
          id: colId,
          accessToken: accessToken as string,
        });
        dispatch(deleteStateCollectionPer({ id: colId }));
        toast.success("Collection Deleted Permanently");
      }
    } else {
      toast.error("User session expired, Please login to proceed");
      navigate("/auth");
    }
  };
  const handleRestore = async () => {
    if (accessToken) {
      if (type === "pen") {
        const res = await restorePenApi({
          id: colId,
          accessToken: accessToken as string,
        });
        res.data && dispatch(restorePen(res.data));
        toast.success("Pen restoration successful");
      }
      if (type === "collection") {
        const res = await restoreCollectionApi({
          id: colId,
          accessToken: accessToken as string,
        });
        res.data && dispatch(restoreCollection(res.data));
        toast.success("Collection restoration successful");
      }
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
          onClick={handleRestore}
        >
          <span>
            <RiGitRepositoryPrivateLine />
          </span>
          <span>Restore</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          className="text-md font-semibold"
        >
          <span>
            <MdDeleteOutline />
          </span>
          <span>Delete permanently</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PermanentDeleteAction;
