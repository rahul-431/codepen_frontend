import { Button } from "@/components/ui/button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useState } from "react";
import { FaCloud } from "react-icons/fa";
import {
  HiMiniBarsArrowDown,
  HiMiniBarsArrowUp,
  HiMiniXMark,
} from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { RiEdit2Fill, RiLayout2Fill, RiLayout4Fill } from "react-icons/ri";
import { TfiLayoutTabWindow } from "react-icons/tfi";
import LayoutFilter from "./LayoutFilter";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateTitle } from "@/redux/slices/CodeSlice";

const PenNavbar = () => {
  const title = useSelector((state: RootState) => state.title);
  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState(false);
  const [openLayout, setOpenLayout] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const layoutRef = useClickOutside(setOpenLayout, openLayout);
  const menuRef = useClickOutside(setOpenMenu, openMenu);
  const [searchParam] = useSearchParams();
  const layoutFilter = searchParam.get("layout") || "normal";
  return (
    <div className="flex justify-between py-2 px-2 sm:px-4  bg-black text-white">
      <div className="flex gap-3 items-center">
        <img
          src="https://blog.codepen.io/wp-content/uploads/2023/09/logo-white.png"
          alt="logo"
          className="h-8 w-8 sm:h-12 sm:w-12"
        />
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 sm:gap-2 items-center">
            {editTitle ? (
              <input
                type="text"
                className="outline-none bg-transparent w-20"
                autoFocus
                onChange={(e) => dispatch(updateTitle(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditTitle(false);
                }}
              />
            ) : (
              <p
                onDoubleClick={() => setEditTitle(true)}
                className="text-lg sm:text-xl font-extrabold"
              >
                {title}
              </p>
            )}
            <button
              onClick={() => {
                setEditTitle(!editTitle);
              }}
              className="text-lg sm:text-xl p-[1px] border border-white rounded"
            >
              {editTitle ? <HiMiniXMark /> : <RiEdit2Fill />}
            </button>
          </div>
          <p className="hidden sm:block text-slate-600 font-semibold">
            Captain Anonymous
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 relative">
        <Button className="hidden md:flex gap-2 text-lg bg-[#1E1F26] hover:bg-[#383a47]">
          <span>
            <FaCloud />
          </span>
          <span>Save</span>
        </Button>
        <Button className="hidden md:flex gap-2 text-lg bg-[#1E1F26] hover:bg-[#383a47]">
          <span>
            <IoMdSettings />
          </span>
          <span>Settings</span>
        </Button>
        <button
          onClick={(e) => {
            setOpenMenu((prev) => !prev);
            e.stopPropagation();
          }}
          className="md:hidden p-2 rounded-md text-2xl bg-[#1E1F26] hover:bg-[#272831]"
        >
          {openMenu ? <HiMiniBarsArrowUp /> : <HiMiniBarsArrowDown />}
        </button>
        {openMenu && (
          <div
            ref={menuRef}
            className="flex md:hidden p-1 gap-1 flex-col items-start absolute top-12 sm:top-16 -right-2 sm:-right-4 w-full z-20 bg-[#1b1c22] "
          >
            <Button className="w-full flex gap-2 text-base sm:text-lg bg-[#1E1F26] hover:bg-[#383a47]">
              <span>
                <FaCloud />
              </span>
              <span>Save</span>
            </Button>
            <Button className="w-full flex gap-2 text-base sm:text-lg bg-[#1E1F26] hover:bg-[#383a47]">
              <span>
                <IoMdSettings />
              </span>
              <span>Settings</span>
            </Button>
          </div>
        )}
        <div className="hidden md:block  relative">
          <button
            onClick={(e) => {
              setOpenLayout((prev) => !prev);
              e.stopPropagation();
            }}
            className="p-2 rounded-md text-2xl bg-[#1E1F26] hover:bg-[#272831]"
          >
            {layoutFilter === "left" ? (
              <RiLayout2Fill />
            ) : layoutFilter === "right" ? (
              <RiLayout4Fill />
            ) : (
              <TfiLayoutTabWindow />
            )}
          </button>
          {openLayout && (
            <div
              onClick={(e) => e.stopPropagation()}
              ref={layoutRef}
              className="z-30 flex-col gap-2 p-4 absolute top-12 right-0 bg-[#1b1c22] rounded-md"
            >
              <p className="text-base font-semibold">Change View</p>
              <LayoutFilter
                setOpenLayout={setOpenLayout}
                options={[
                  { value: "normal", icon: <TfiLayoutTabWindow /> },
                  { value: "left", icon: <RiLayout2Fill /> },
                  { value: "right", icon: <RiLayout4Fill /> },
                ]}
              />
            </div>
          )}{" "}
        </div>
        <Button className="text-base md:text-lg bg-green-700 hover:bg-green-600">
          Sign Up
        </Button>
        <Button className="text-base md:text-lg bg-[#1E1F26] hover:bg-[#383a47]">
          Login
        </Button>
      </div>
    </div>
  );
};

export default PenNavbar;
