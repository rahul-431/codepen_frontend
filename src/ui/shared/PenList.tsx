import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaTags } from "react-icons/fa";
import ProfilePenList from "./ProfilePenList";

const PenList = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="flex items-center justify-between bg-[#383a47] p-2 rounded-md">
        <div className="hidden md:flex space-x-2 items-center">
          <div className="flex space-x-1">
            <input
              type="text"
              className="bg-[#1E1F26] px-2 outline-none text-white rounded-md"
              placeholder="Search here"
            />
            <Button className="bg-[#1E1F26] ">Search</Button>
          </div>
          <Button>
            <span>
              <FaTags />
            </span>
            <span>Tags</span>
          </Button>
        </div>
        <div className="flex space-x-2 items-center">
          <Select>
            <SelectTrigger className="w-[180px] bg-[#1E1F26] outline-none border-none text-white ">
              <SelectValue placeholder="Sort pens" />
            </SelectTrigger>
            <SelectContent className="bg-[#1E1F26] text-white text-lg font-semibold">
              <SelectGroup>
                <SelectItem value="date-updated" defaultChecked className="">
                  Date Updated
                </SelectItem>
                <SelectItem value="date-created">Date Created</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ProfilePenList />
    </div>
  );
};

export default PenList;
