import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import PenCard from "./shared/PenCard";
import CollectionCard from "./shared/CollectionCard";

const Deleted = () => {
  const collection = useSelector(
    (state: RootState) => state.collection.deletedCollections
  );
  const pens = useSelector((state: RootState) => state.pen.deletedPens);
  return pens.length === 0 && collection.length === 0 ? (
    <div className="flex items-center justify-center text-white">
      <h1 className="text-lg md:text-2xl">Does not have any deleted items</h1>
    </div>
  ) : (
    <div className="text-white flex flex-col gap-2  p-4">
      {pens.length > 0 && (
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">Deleted Pens</h1>
          <div className="flex flex-wrap gap-2">
            {pens.map((pen, index) => (
              <PenCard data={pen} key={index} />
            ))}
          </div>
        </div>
      )}
      {collection.length > 0 && (
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">Deleted Collections</h1>
          <div className="flex flex-wrap gap-4">
            {collection.map((col, index) => (
              <CollectionCard data={col} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Deleted;
