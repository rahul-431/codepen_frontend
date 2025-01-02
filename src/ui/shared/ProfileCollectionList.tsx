import { IoGrid } from "react-icons/io5";
import Filter from "./Filter";
import { FaThList } from "react-icons/fa";

import TableView from "./TableView";
import { useSearchParams } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import EmptyBox from "./EmptyBox";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CreateNewCollection } from "../CreateNewCollection";

const ProfileCollectionList = () => {
  const [searchParam] = useSearchParams();
  const layoutFilterValue = searchParam.get("layout");
  const layoutFilter =
    !layoutFilterValue || layoutFilterValue === "grid"
      ? "grid"
      : layoutFilterValue;
  const collections: Collection[] = useSelector(
    (state: RootState) => state.collection.collections
  );

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
        <div className="flex gap-4 flex-wrap mt-5">
          {collections && collections.length > 0 ? (
            collections.map((item, index) => (
              <CollectionCard data={item} key={index} />
            ))
          ) : (
            <EmptyBox label="Collection">
              <CreateNewCollection />
            </EmptyBox>
          )}
        </div>
      ) : collections && collections.length > 0 ? (
        <TableView
          headers={[
            { label: "Title" },
            { label: "Created At" },
            { label: "Last Updated" },
            { label: "Stats" },
          ]}
          data={collections}
        />
      ) : (
        <EmptyBox label="Collection">
          <CreateNewCollection />
        </EmptyBox>
      )}
    </>
  );
};

export default ProfileCollectionList;
