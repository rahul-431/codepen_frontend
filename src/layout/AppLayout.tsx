import { useGetCurrentUserQuery } from "@/redux/slices/authApiSlice";
import { addUser } from "@/redux/slices/authSlice";
import {
  useGetCurrentCollectionsQuery,
  useGetTempDelCollectionsQuery,
} from "@/redux/slices/collectionApiSlice";
import {
  addCollections,
  addDeletedCollections,
} from "@/redux/slices/collectionSlice";
import {
  useGetCurrentPensQuery,
  useGetTempDelPensQuery,
} from "@/redux/slices/penApiSlice";
import { addDeletedPens, addPens } from "@/redux/slices/penSlice";
import Navbar from "@/ui/shared/Navbar";
import SideBar from "@/ui/shared/SideBar";
import Spinner from "@/ui/shared/Spinner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const {
    data: user,
    error,
    isLoading,
  } = useGetCurrentUserQuery(
    { accessToken: accessToken as string },
    { skip: !accessToken } // Skip the query if no accessToken
  );
  const {
    data: pens,
    isLoading: isl,
    error: e,
  } = useGetCurrentPensQuery(
    { accessToken: accessToken as string },
    { skip: !accessToken }
  );
  const { data: delPens } = useGetTempDelPensQuery(
    { accessToken: accessToken as string },
    { skip: !accessToken }
  );

  const {
    data: collections,
    isLoading: islc,
    error: e1,
  } = useGetCurrentCollectionsQuery(
    { accessToken: accessToken as string },
    { skip: !accessToken }
  );
  const { data: delcols } = useGetTempDelCollectionsQuery(
    { accessToken: accessToken as string },
    { skip: !accessToken }
  );

  useEffect(() => {
    if (pens) {
      dispatch(addPens(pens));
    }
    if (delPens) {
      dispatch(addDeletedPens(delPens));
    }
    if (delcols) {
      dispatch(addDeletedCollections(delcols));
    }
    if (user) {
      dispatch(addUser(user));
    }
    if (collections) {
      dispatch(addCollections(collections));
    }
  }, [pens, user, dispatch, collections, delPens, delcols]);
  if (error || e || e1) {
    console.log(error || e || e1);
  }
  if (error) {
    console.log("error", error);
  }
  if (isLoading || isl || islc) {
    return (
      <div className="h-screen bg-primary flex items-center justify-center">
        <Spinner />
        
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex">
        <SideBar />
      </div>
      <div className="flex flex-col w-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
