import { format } from "date-fns";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import PenCardAction from "./PenCardAction";
import CollectionCardAction from "./CollectionCardAction";
type TableView = {
  headers: {
    label: string;
  }[];
  type: string;
  data: PenResponse[] | Collection[];
};
const TableView = ({ headers, data, type }: TableView) => {
  return (
    <table className="text-white w-full mt-2 mb-4 overflow-x-auto">
      <tr className=" bg-[#383a47] text-center">
        {headers.map((item) => (
          <th className="p-2">{item.label}</th>
        ))}
        <th></th>
      </tr>
      {data.map((item) => (
        <tr className="text-center" key={item._id}>
          <td className="space-x-2">
            <Link
              className="text-green-600"
              to={
                type === "pen"
                  ? `/pen?id=${item._id}`
                  : `/app/collection?id=${item._id}`
              }
            >
              {item.title}
            </Link>
            <span
              className={`${
                item.type === "public" ? "bg-green-900" : "bg-yellow-900"
              } px-1 rounded`}
            >
              {item.type}
            </span>
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
            {type === "pen" ? (
              <PenCardAction penId={item._id} key={item._id} type={item.type} />
            ) : (
              <CollectionCardAction
                colId={item._id}
                key={item._id}
                type={item.type}
              />
            )}
          </td>
        </tr>
      ))}
    </table>
  );
};

export default TableView;
