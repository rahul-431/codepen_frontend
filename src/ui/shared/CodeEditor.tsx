import { addCss, addHtml, addJs } from "@/redux/slices/CodeSlice";
import { RootState } from "@/redux/store";
import { Editor } from "@monaco-editor/react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
interface CodeEditorProps {
  language: string;
  defaultValue?: string;
}
const CodeEditor = ({
  language = "html",
  defaultValue = "//Write your own code",
}: CodeEditorProps) => {
  const openResult = useSelector((state: RootState) => state.openResult);
  const css = useSelector((state: RootState) => state.css);
  const html = useSelector((state: RootState) => state.html);
  const js = useSelector((state: RootState) => state.js);
  const dispatch = useDispatch();
  const handleChange = useCallback(
    (value = "") => {
      language === "html"
        ? dispatch(addHtml(value))
        : language === "css"
        ? dispatch(addCss(value))
        : language === "javascript"
        ? dispatch(addJs(value))
        : "";
    },
    [language]
  );
  return (
    <Editor
      className={`${
        openResult ? "h-[260px]" : "min-h-[432px]"
      } sm:min-h-[432px]`}
      theme="vs-dark"
      value={
        language === "html"
          ? html
          : language === "css"
          ? css
          : language === "javascript"
          ? js
          : ""
      }
      language={language}
      saveViewState
      onChange={handleChange}
      defaultValue={defaultValue}
    />
  );
};

export default CodeEditor;
