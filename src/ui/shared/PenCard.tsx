import { Button } from "@/components/ui/button";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { HiArrowsPointingOut } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PenCardAction from "./PenCardAction";

const PenCard = ({ data }: { data: PenResponse }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-96 h-80 rounded-md bg-[#1E1F26] p-4">
      <div className="h-[70%] w-full bg-white rounded-md">
        <img src="" alt="" />
      </div>
      <div className="h-[20%] mt-2">
        <div className="flex justify-between items-center">
          <p className="text-white text-lg space-x-2">
            <span>{data.title}</span>
            <span
              className={`${
                data.type === "public" ? "bg-green-900" : "bg-yellow-900"
              } px-1 rounded`}
            >
              {data.type}
            </span>
          </p>
          <PenCardAction penId={data._id} type={data.type} />
        </div>
        <div className="flex justify-between items-center">
          <div className="space-x-2 mt-2">
            <Button>
              <span>
                <AiFillLike />
              </span>
              <span>{data.stats?.likes.length || 0}</span>
            </Button>
            <Button>
              <span>
                <FaCommentAlt />
              </span>
              <span>{data.stats?.comments.length || 0}</span>
            </Button>
            <Button>
              <span>
                <IoEyeSharp />
              </span>
              <span>{data.stats?.views.length || 0}</span>
            </Button>
          </div>
          <Button
            className="text-2xl"
            onClick={() => navigate(`/pen?id=${data._id}`)}
          >
            <HiArrowsPointingOut />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PenCard;
