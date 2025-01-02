import { format } from "date-fns";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
type TableView = {
  headers: {
    label: string;
  }[];
  data: PenResponse[] | Collection[];
};
const TableView = ({ headers, data }: TableView) => {
  return (
    <table className="text-white w-full mt-2 mb-4 ">
      <tr className=" bg-[#383a47] text-center">
        {headers.map((item) => (
          <th className="p-2">{item.label}</th>
        ))}
        <th></th>
      </tr>
      {data.map((item) => (
        <tr className="text-center" key={item._id}>
          <td className="p-2">
            <Link to={`/pen?${item._id}`}>{item.title}</Link>
          </td>
          <td>{format(new Date(item.createdAt as string), "MMM dd yyyy,p")}</td>
          <td>{format(new Date(item.updatedAt as string), "MMM dd yyyy,p")}</td>
          <td className="flex items-center gap-2 justify-center p-2">
            <div className="flex  space-x-1 items-center bg-[#383a47] px-1 rounded-sm">
              <span>
                <AiFillLike />
              </span>
              <span>{item.stats?.likes.length || 0}</span>
            </div>
            <div className="flex  space-x-1 items-center bg-[#383a47] px-1 rounded-sm">
              <span>
                <FaCommentAlt />
              </span>
              <span>{item.stats?.comments.length || 0}</span>
            </div>
            <div className="flex  space-x-1 items-center bg-[#383a47] px-1 rounded-sm">
              <span>
                <IoEyeSharp />
              </span>
              <span>{item.stats?.views.length || 0}</span>
            </div>
          </td>
          <td>
            <button className="text-3xl hover:bg-[#383a47] rounded">
              <HiEllipsisHorizontal />
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default TableView;
