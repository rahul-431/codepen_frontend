import { Button } from "@/components/ui/button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEffect, useState } from "react";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateTitle } from "@/redux/slices/CodeSlice";
import {
  useCreateNewPenMutation,
  useUpdatePenMutation,
} from "@/redux/slices/penApiSlice";
import Spinner from "./Spinner";
import { toast } from "sonner";
import UserAction from "./UserAction";
import { useCurrentPen } from "@/hooks/useCurrentPen";

const PenNavbar = () => {
  const title = useSelector((state: RootState) => state.code.title);
  const html = useSelector((state: RootState) => state.code.html);
  const css = useSelector((state: RootState) => state.code.css);
  const js = useSelector((state: RootState) => state.code.js);
  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState(false);
  const [openLayout, setOpenLayout] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const layoutRef = useClickOutside(setOpenLayout, openLayout);
  const menuRef = useClickOutside(setOpenMenu, openMenu);
  const [searchParam, setSearchParam] = useSearchParams();
  const layoutFilter = searchParam.get("layout") || "normal";
  const penId = searchParam && searchParam.get("id");

  const navigate = useNavigate();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const [
    createNewPen,
    { isSuccess: isCreated, data, isLoading: isCreatingPen },
  ] = useCreateNewPenMutation();
  const accessToken = localStorage.getItem("accessToken");
  const [updatePen, { isLoading: isUpdating }] = useUpdatePenMutation();

  //getting current pen
  useCurrentPen();

  //handle infinite re-render
  useEffect(() => {
    if (isCreated && data) {
      searchParam.set("id", data._id);
      setSearchParam(searchParam);
    }
  }, [isCreated, data, searchParam, setSearchParam]);

  const handleCreatePen = () => {
    if (accessToken) {
      createNewPen({
        title,
        html,
        css,
        js,
        accessToken: accessToken as string,
      });
      toast.success("New Pen Created successfully");
    } else {
      toast.error("User session in expired or Login first");
      navigate("/auth");
    }
  };
  const handleUpdatePen = () => {
    if (penId && accessToken) {
      updatePen({
        _id: penId,
        title,
        html,
        css,
        js,
        accessToken: accessToken as string,
      });
      toast.success("Pen Updated successfully");
    } else {
      toast.error("User session in expired login first");
      navigate("/auth");
    }
  };
  const handleUpdateTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdatePen();
      setEditTitle(false);
      toast.success("Title updated succesfully");
    }
  };
  return (
    <div className="flex justify-between py-2 px-2 sm:px-4  bg-black text-white">
      <div className="flex gap-3 items-center">
        <img
          onClick={() => navigate("/")}
          src="https://blog.codepen.io/wp-content/uploads/2023/09/logo-white.png"
          alt="logo"
          className="h-8 w-8 sm:h-12 sm:w-12 cursor-pointer"
        />
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 sm:gap-2 items-center">
            {editTitle ? (
              <input
                type="text"
                className="outline-none bg-transparent w-20"
                // autoFocus={true}
                onChange={(e) => dispatch(updateTitle(e.target.value))}
                onKeyDown={handleUpdateTitle}
              />
            ) : (
              <p
                onDoubleClick={() => setEditTitle(true)}
                className="text-lg sm:text-xl font-extrabold"
              >
                {title || "Untitled"}
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
            {authUser ? authUser.name.toUpperCase() : "Captain Anonymous"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 relative">
        {!penId ? (
          <Button
            disabled={isCreated}
            onClick={handleCreatePen}
            className="hidden md:flex gap-2 text-lg bg-[#1E1F26] hover:bg-[#383a47]"
          >
            <span>
              <FaCloud />
            </span>
            <span>{isCreatingPen ? <Spinner /> : "Save"}</span>
          </Button>
        ) : (
          <Button
            disabled={isUpdating}
            onClick={handleUpdatePen}
            className="hidden md:flex gap-2 text-lg bg-[#1E1F26] hover:bg-[#383a47]"
          >
            <span>
              <FaCloud />
            </span>
            <span>{isUpdating ? <Spinner /> : "update"}</span>
          </Button>
        )}
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
            {penId ? (
              <Button
                onClick={handleUpdatePen}
                className="w-full flex gap-2 text-base sm:text-lg bg-[#1E1F26] hover:bg-[#383a47]"
              >
                <span>
                  <FaCloud />
                </span>
                <span>{isCreatingPen ? <Spinner /> : "Save"}</span>
              </Button>
            ) : (
              <Button
                onClick={handleCreatePen}
                className="w-full flex gap-2 text-base sm:text-lg bg-[#1E1F26] hover:bg-[#383a47]"
              >
                <span>
                  <FaCloud />
                </span>
                <span>{isCreatingPen ? <Spinner /> : "Save"}</span>
              </Button>
            )}
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
          )}
        </div>
        {(authUser && authUser._id) || accessToken ? (
          <UserAction />
        ) : (
          <Button
            onClick={() => navigate("/auth")}
            className="text-base md:text-lg bg-green-700 hover:bg-green-600"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default PenNavbar;
