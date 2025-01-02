import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Deleted from "@/ui/Deleted";
import PenList from "@/ui/shared/PenList";
import ProfileCollectionList from "@/ui/shared/ProfileCollectionList";
import { useSearchParams } from "react-router-dom";
const YourWork = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const defaultTab = searchParam.get("tab");
  return (
    <div className="bg-primary h-full w-full overflow-y-auto">
      <Tabs
        defaultValue={!defaultTab ? "pens" : defaultTab}
        className="mt-5 p-5"
      >
        <TabsList className="bg-transparent space-x-2">
          <TabsTrigger
            onClick={() => {
              searchParam.set("tab", "pens");
              setSearchParam(searchParam);
            }}
            value="pens"
            className="bg-[#383a47] text-lg hover:bg-white hover:text-black text-white"
          >
            Pens
          </TabsTrigger>
          <TabsTrigger
            onClick={() => {
              searchParam.set("tab", "collections");
              setSearchParam(searchParam);
            }}
            value="collections"
            className="bg-[#383a47] hover:bg-white text-lg hover:text-black text-white"
          >
            Collections
          </TabsTrigger>
          <TabsTrigger
            onClick={() => {
              searchParam.set("tab", "deleted");
              setSearchParam(searchParam);
            }}
            value="deleted"
            className="bg-[#383a47] hover:bg-white text-lg hover:text-black text-white"
          >
            Deleted
          </TabsTrigger>
        </TabsList>
        <div className="w-full h-1 bg-green-500 my-4 mx-1 rounded-lg"></div>
        <TabsContent value="pens">
          <PenList />
        </TabsContent>
        <TabsContent value="collections">
          <ProfileCollectionList />
        </TabsContent>
        <TabsContent value="deleted">
          <Deleted />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default YourWork;
