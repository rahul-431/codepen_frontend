import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
type TableView = {
  headers: {
    label: string;
  }[];
  data: PenCard[] | Collection[];
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
        <tr className="text-center">
          <td className="p-2">
            <Link to={`/pen?${item._id}`}>{item.title}</Link>
          </td>
          <td>{item.createdAt}</td>
          <td>{item.updatedAt}</td>
          <td className="flex items-center gap-2 justify-center p-2">
            <div className="flex  space-x-1 items-center bg-[#383a47] px-1 rounded-sm">
              <span>
                <AiFillLike />
              </span>
              <span>{item.stats?.likes || 0}</span>
            </div>
            <div className="flex  space-x-1 items-center bg-[#383a47] px-1 rounded-sm">
              <span>
                <FaCommentAlt />
              </span>
              <span>{item.stats?.comments || 0}</span>
            </div>
            <div className="flex  space-x-1 items-center bg-[#383a47] px-1 rounded-sm">
              <span>
                <IoEyeSharp />
              </span>
              <span>{item.stats?.views || 0}</span>
            </div>
          </td>
          <td>
            <HiEllipsisHorizontal />
          </td>
        </tr>
      ))}
    </table>
  );
};

export default TableView;
