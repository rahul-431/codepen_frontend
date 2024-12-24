import { addCss, addHtml, addJs } from "@/redux/slices/CodeSlice";
import { RootState } from "@/redux/store";
import { Editor } from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
interface CodeEditorProps {
  language: string;
  defaultValue?: string;
}
const CodeEditor = ({
  language = "html",
  defaultValue = "//Write your own code",
}: CodeEditorProps) => {
  const { openResult, css, html, js } = useSelector(
    (state: RootState) => state
  );
  console.log("at code editor", css, html, js);
  const dispatch = useDispatch();
  const handleChange = (value = "") => {
    language === "html"
      ? dispatch(addHtml(value))
      : language === "css"
      ? dispatch(addCss(value))
      : language === "javascript"
      ? dispatch(addJs(value))
      : "";
  };
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
