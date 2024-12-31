import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import ProfilePenList from "@/ui/shared/ProfilePenList";
import ProfileCollectionList from "@/ui/shared/ProfileCollectionList";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [searchParam, setSearchParam] = useSearchParams();

  const defaultTab = searchParam.get("tab");
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto">
      <div className="flex flex-col w-full min-h-80">
        <div className="relative w-full h-[80%] bg-[url(https://t3.ftcdn.net/jpg/03/91/46/10/240_F_391461057_5P0BOWl4lY442Zoo9rzEeJU0S2c1WDZR.jpg)] bg-cover bg-no-repeat flex flex-col items-center justify-center">
          <h1 className="text-white text-6xl font-serif font-semibold">
            {user?.name}
          </h1>
          <h1 className="text-white text-2xl font-serif font-semibold">
            {user?.email}
          </h1>
          <div className="absolute top-48 border-4 border-gray-600 rounded-md">
            <img
              src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="user profile"
              className="w-24 h-24 object-contain rounded-md"
            />
          </div>
        </div>
        <div className=" bg-black w-full h-[20%] flex items-center justify-end text-white gap-4 px-4">
          <p className="space-x-1">
            <span>0</span>
            <span>Followers</span>
          </p>
          <p className="space-x-1">
            <span>0</span>
            <span>Following</span>
          </p>
        </div>
      </div>
      <div className="bg-primary">
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
          </TabsList>
          <div className="w-full h-1 bg-green-500 my-4 mx-1 rounded-lg"></div>
          <TabsContent value="pens" className="flex flex-col gap-4">
            <ProfilePenList />
          </TabsContent>
          <TabsContent value="collections">
            <ProfileCollectionList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
