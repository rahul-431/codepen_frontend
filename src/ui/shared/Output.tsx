import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Output = () => {
  const css = useSelector((state: RootState) => state.css);
  const html = useSelector((state: RootState) => state.html);
  const js = useSelector((state: RootState) => state.js);
  console.log(css, html, js);
  const combinedCode = `<html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`;
  const iframeCode = `data:text/html;charset=utf-8,${combinedCode}`;
  return (
    <iframe
      src={iframeCode}
      className="border border-red-300 h-full w-full"
    ></iframe>
  );
};

export default Output;
