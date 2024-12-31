import { addCss, addHtml, addJs, updateTitle } from "@/redux/slices/CodeSlice";
import { useGetCurrentPenQuery } from "@/redux/slices/penApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const useCurrentPen = () => {
  const [searchParam] = useSearchParams();
  const penId = searchParam && searchParam.get("id");
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const { data: currentPen, isSuccess } = useGetCurrentPenQuery(
    { id: penId as string, accessToken: accessToken as string },
    { skip: !penId || !accessToken }
  );
  //get current pen data from database
  useEffect(() => {
    if (currentPen && isSuccess) {
      // const { html, css, js, title } = currentPen;
      const code = currentPen.code;
      if (code) {
        if (code.html) dispatch(addHtml(code.html));
        if (code.css) dispatch(addCss(code.css));
        if (code.js) dispatch(addJs(code.js));
      }
      const title = currentPen.title;
      if (title) dispatch(updateTitle(title));
    }
  }, [currentPen, isSuccess, dispatch]);
};
export { useCurrentPen };
