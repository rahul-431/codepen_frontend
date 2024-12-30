import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PenList from "@/ui/shared/PenList";
const YourWork = () => {
  return (
    <div className="bg-primary h-full w-full overflow-y-auto">
      <Tabs defaultValue="pens" className="mt-5 p-5">
        <TabsList className="bg-transparent space-x-2">
          <TabsTrigger
            value="pens"
            className="bg-[#383a47] text-lg hover:bg-white hover:text-black text-white"
          >
            Pens
          </TabsTrigger>
          <TabsTrigger
            value="collections"
            className="bg-[#383a47] hover:bg-white text-lg hover:text-black text-white"
          >
            Collections
          </TabsTrigger>
          <TabsTrigger
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
          <h1>Collections</h1>
        </TabsContent>
        <TabsContent value="deleted">
          <h1>Deleted</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default YourWork;
