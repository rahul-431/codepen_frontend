import { IoGrid } from "react-icons/io5";
import Filter from "./Filter";
import { FaThList } from "react-icons/fa";
import PenCard from "./PenCard";
import TableView from "./TableView";
import { useNavigate, useSearchParams } from "react-router-dom";
import EmptyBox from "./EmptyBox";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ProfilePenList = () => {
  const [searchParam] = useSearchParams();
  const layoutFilterValue = searchParam.get("layout");
  const layoutFilter =
    !layoutFilterValue || layoutFilterValue === "grid"
      ? "grid"
      : layoutFilterValue;
  const penType = searchParam.get("types");
  const penFilter = !penType || penType === "all" ? "all" : penType;
  const pens: PenResponse[] = useSelector((state: RootState) => state.pen.pens);
  const filteredPens =
    penFilter == "all" || penFilter == "popular"
      ? pens
      : pens.filter((pen) => pen.type === penFilter);

  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <Filter
          filterField="types"
          options={[
            { value: "all", label: "All" },
            { value: "popular", label: "Popular" },
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
        />
        <Filter
          classname="p-1 rounded-sm  hover:bg-green-600 font-semibold text-white text-xl"
          filterField="layout"
          options={[
            {
              value: "grid",
              icon: <IoGrid />,
            },
            {
              value: "table",
              icon: <FaThList />,
            },
          ]}
        />
      </div>
      {layoutFilter === "grid" ? (
        <div className="flex gap-4 flex-wrap">
          {filteredPens && filteredPens.length > 0 ? (
            filteredPens.map((item, index) => (
              <PenCard data={item} key={index} />
            ))
          ) : (
            <EmptyBox label="Pen">
              <button
                onClick={() => navigate("/pen")}
                className="p-2 rounded-md bg-green-900 hover:bg-green-600"
              >
                Create New Pen
              </button>
            </EmptyBox>
          )}
        </div>
      ) : filteredPens && filteredPens.length > 0 ? (
        <TableView
          type="pen"
          headers={[
            { label: "Title" },
            { label: "Created At" },
            { label: "Last Updated" },
            { label: "Stats" },
          ]}
          data={filteredPens}
        />
      ) : (
        <EmptyBox label="Pen">
          <button
            onClick={() => navigate("/pen")}
            className="p-2 rounded-md bg-green-900 hover:bg-green-600"
          >
            Create New Pen
          </button>
        </EmptyBox>
      )}
    </>
  );
};

export default ProfilePenList;
