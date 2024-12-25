import { addCss, addHtml, addJs } from "@/redux/slices/CodeSlice";
import { RootState } from "@/redux/store";
import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useCallback, useRef } from "react";
import { DiCssTricks } from "react-icons/di";
import { FaHtml5, FaJsSquare } from "react-icons/fa";
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
  let unsavedChanges = 0;
  const handleChange = useCallback(
    (value = "") => {
      language === "html"
        ? dispatch(addHtml(value))
        : language === "css"
        ? dispatch(addCss(value))
        : language === "javascript"
        ? dispatch(addJs(value))
        : "";
      // monaco.editor
      unsavedChanges = unsavedChanges + 1;
    },
    [language]
  );
  console.log("unsaved changed", unsavedChanges);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const handleMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };
  const handleFormatDocument = () => {
    if (editorRef.current) {
      editorRef.current.trigger(
        "keyboard", // Source of the action (keyboard, mouse, etc.)
        "editor.action.formatDocument", // The formatting command
        null // Additional arguments (not needed here)
      );
    }
  };
  return (
    <>
      <div className="flex justify-between items-center p-1">
        <h1 className="flex gap-1 items-center bg-[#383a47] text-white p-1 rounded font-semibold">
          <span
            className={`${
              language === "html"
                ? "text-red-500"
                : language === "css"
                ? "text-blue-500"
                : "text-yellow-500"
            } text-2xl`}
          >
            {language === "html" ? (
              <FaHtml5 />
            ) : language === "css" ? (
              <DiCssTricks />
            ) : (
              <FaJsSquare />
            )}
          </span>
          <span>
            {language === "html" ? "HTML" : language === "css" ? "CSS" : "JS"}
          </span>
        </h1>
        <button
          onClick={handleFormatDocument}
          className="bg-[#383a47] p-1 rounded text-white"
        >
          Format{" "}
          <span>
            {language === "html" ? "HTML" : language === "css" ? "CSS" : "JS"}
          </span>
        </button>
      </div>
      <Editor
        className={`${
          openResult ? "h-[260px]" : "min-h-[432px]"
        } sm:min-h-[432px]`}
        theme="vs-dark"
        onMount={handleMount}
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
    </>
  );
};

export default CodeEditor;
