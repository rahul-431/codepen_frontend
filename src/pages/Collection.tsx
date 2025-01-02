import { useGetCurrentCollectionQuery } from "@/redux/slices/collectionApiSlice";
import { CreateNewCollection } from "@/ui/CreateNewCollection";
import CollectionCardAction from "@/ui/shared/CollectionCardAction";
import ProfilePenList from "@/ui/shared/ProfilePenList";
import Spinner from "@/ui/shared/Spinner";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Collection = () => {
  const [searchParam] = useSearchParams();
  const colId = searchParam.get("id");
  const at = localStorage.getItem("accessToken");
  if (!colId) {
    toast.error("Please provide the collectio id");
  }
  const { data, error, isLoading } = useGetCurrentCollectionQuery(
    {
      id: colId as string,
      accessToken: at as string,
    },
    { skip: !at }
  );
  if (error) {
    console.log(error);
    return (
      <div className="flex items-center justify-center bg-black text-white">
        <h1>Error Occured</h1>
      </div>
    );
  }
  if (isLoading) {
    return <Spinner />;
  }
  if (!data) {
    return (
      <div className="flex items-center justify-center bg-black text-white">
        <h1>No Data found</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 text-white w-full h-full bg-primary overflow-y-auto overflow-x-auto">
      <div className="flex justify-between items-center p-2 sm:p-4">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
            {data.title}
          </h1>
          <p className="text-gray-400 sm:text-lg">{data.author?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <CreateNewCollection
            id={data._id}
            edit={true}
            title={data.title}
            desc={data.description}
          />
          <div className="hover:bg-[#272831] p-2 bg-[#1E1F26] rounded-md text-xl items-center flex">
            <CollectionCardAction colId="101" type="public" />
          </div>
        </div>
      </div>
      <hr />
      <div className="p-2 sm:p-4">
        <ProfilePenList />
      </div>
      <hr />
      <div className="p-2 sm:p-4">
        <div className="bg-[#1E1F26] w-full flex flex-col gap-4 rounded-md p-2 sm:p-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg md:text-xl">Description</h1>
            <p>
              {data.description ? data.description : "No description available"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <p>
              <span>Created At : </span>
              <span>
                {format(new Date(data.createdAt as string), "MMM dd yyyy,p")}
              </span>
            </p>
            <p>
              <span>Updated At : </span>
              <span>
                {format(new Date(data.updatedAt as string), "MMM dd yyyy,p")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
