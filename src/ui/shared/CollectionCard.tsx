import { Button } from "@/components/ui/button";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { HiArrowsPointingOut, HiEllipsisHorizontal } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ data }: CollectionCard) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-96 h-80 rounded-md bg-[#1E1F26] p-4">
      <div className="h-[70%] w-full rounded-md grid grid-cols-2 gap-2">
        <div className="rounded-md bg-white" />
        <div className="rounded-md bg-white" />
        <div className="rounded-md bg-white" />
        <div className="rounded-md bg-white" />
      </div>
      <div className="h-[20%] mt-2">
        <div className="flex justify-between items-center">
          <p className="text-white text-lg">{data.title}</p>
          <button className="text-white text-3xl">
            <HiEllipsisHorizontal />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="space-x-2 mt-2">
            <Button>
              <span>
                <AiFillLike />
              </span>
              <span>{data.stats?.likes || 0}</span>
            </Button>
            <Button>
              <span>
                <FaCommentAlt />
              </span>
              <span>{data.stats?.comments || 0}</span>
            </Button>
            <Button>
              <span>
                <IoEyeSharp />
              </span>
              <span>{data.stats?.views || 0}</span>
            </Button>
          </div>
          <Button
            className="text-2xl"
            onClick={() => navigate(`/collections/${data._id}`)}
          >
            <HiArrowsPointingOut />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
