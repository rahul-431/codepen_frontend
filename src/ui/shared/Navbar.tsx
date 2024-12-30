import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  //close the modal when clicked outside
  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);
  return (
    <div className="relative w-full">
      <div className="bg-black px-2 md:px-12 py-3 flex justify-between items-center w-full">
        <div className="flex sm:gap-4 gap-2 items-center">
          <div className="flex gap-2 sm:gap-4 items-center lg:hidden">
            <img
              src="https://blog.codepen.io/wp-content/uploads/2023/09/logo-white.png"
              alt=""
              className="sm:w-10 sm:h-10 h-7 w-7 cursor-pointer"
              //   onClick={}
            />
            <button
              onClick={() => setOpen(!open)}
              className="text-2xl text-white p-2 bg-[#1E1F26] rounded-md hover:bg-[#272831]"
            >
              {open ? <HiBarsArrowUp /> : <HiBarsArrowDown />}
            </button>
          </div>
          <div className="flex text-white items-center gap-1 px-2 w-24 sm:w-80 bg-[#1E1F26] rounded-md">
            <div className="left-4 top-2 text-lg">
              <IoSearch />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search"
              className="p-2 bg-transparent  text-white focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2 md:gap-4">
          <Button
            onClick={() => navigate("/auth")}
            size="sm"
            className="text-md bg-green-700 hover:bg-green-600"
          >
            Login
          </Button>
        </div>
      </div>
      <div
        ref={ref}
        className={`${
          open ? "flex" : "hidden"
        } text-white absolute sm:w-[300px] sm:h-[280px] p-4 flex-col gap-4 bg-primary`}
      >
        <div className="flex flex-col gap-2">
          <p className="font-semibold">TRY OUT ONLINE EDITOR</p>
          <button className="p-2 rounded-md border-4 border-green-800 hover:border-green-600 tex-white font-semibold bg-black">
            Start Coding
          </button>
        </div>
        <ul className="flex flex-col gap-2 text-white font-semibold">
          <li>Search Pens</li>
          <li>Challenges</li>
          <li>Spark</li>
        </ul>
        <p className="flex gap-2 font-semibold">
          <span>CodePen</span>
          <span className="px-2 bg-yellow-600">Pro</span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
