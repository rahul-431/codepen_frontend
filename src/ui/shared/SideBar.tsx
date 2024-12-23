import { useState } from "react";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { TbArrowBigLeftLineFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="relative  flex items-center">
      <button
        onClick={() => setOpen(!open)}
        className={`absolute ${
          open ? "left-[210px] top-3" : " top-3 left-2"
        } z-10 text-white px-2 py-3 bg-primary rounded-md text-lg`}
      >
        {open ? <TbArrowBigLeftLineFilled /> : <BsLayoutTextSidebarReverse />}
      </button>
      <div
        className={`${
          open ? "flex" : "hidden"
        } text-white h-full w-[220px] max-w-[220px] p-2 flex-col gap-4 bg-[#1E1F26]`}
      >
        <header className="px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 138 26"
            fill="none"
            stroke="#FFF"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M80 6h-9v14h9 M114 6h-9 v14h9 M111 13h-6 M77 13h-6 M122 20V6l11 14V6 M22 16.7L33 24l11-7.3V9.3L33 2L22 9.3V16.7z M44 16.7L33 9.3l-11 7.4 M22 9.3l11 7.3 l11-7.3 M33 2v7.3 M33 16.7V24 M88 14h6c2.2 0 4-1.8 4-4s-1.8-4-4-4h-6v14 M15 8c-1.3-1.3-3-2-5-2c-4 0-7 3-7 7s3 7 7 7 c2 0 3.7-0.8 5-2 M64 13c0 4-3 7-7 7h-5V6h5C61 6 64 9 64 13z" />
          </svg>
        </header>
        <div className="flex flex-col px-4 gap-8">
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-xs text-gray-500 tracking-wider">
              TRY OUT ONLINE EDITOR
            </p>
            <Link
              to="/pen"
              className=" text-center p-2 rounded-md border-4 border-green-800 hover:border-green-600 tex-white font-semibold bg-black text-lg"
            >
              Start Coding
            </Link>
          </div>
          <ul className="flex flex-col gap-4 text-lg text-white font-semibold">
            <li>Search Pens</li>
            <li>Challenges</li>
            <li>Spark</li>
          </ul>
          <p className="flex gap-2 font-semibold text-lg">
            <span>CodePen</span>
            <span className="bg-yellow-700 p-1 text-sm">Pro</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
