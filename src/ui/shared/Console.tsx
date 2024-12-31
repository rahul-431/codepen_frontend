import { clearLogs, setLog } from "@/redux/slices/CodeSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { MdOutlineClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Console = ({ close }: { close: () => void }) => {
  const logs = useSelector((state: RootState) => state.code.logs);
  const dispatch = useDispatch();
  useEffect(() => {
    // Add event listener once when the component mounts
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "console") {
        dispatch(
          setLog({
            method: e.data.method,
            args: e.data.args,
          })
        );
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [dispatch]);
  return (
    <div className="flex flex-col overflow-y-auto h-full w-full">
      <div className=" flex  bg-black w-full justify-between items-center p-1 ">
        <h1 className="bg-[#1E1F26] text-white p-1 rounded font-semibold">
          Console
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(clearLogs())}
            className="rounded text-white px-1 bg-[#1E1F26]"
          >
            Clear
          </button>
          <button
            onClick={close}
            className="text-lg rounded text-white p-1 bg-[#1E1F26]"
          >
            <MdOutlineClear />
          </button>
        </div>
      </div>
      <div className="h-[432px] flex flex-col gap-1 px-4 pt-2 bg-[#1E1F26]">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`p-2 border-b border-slate-700 ${
              log.method === "error"
                ? "bg-red-800 text-white"
                : "text-green-400"
            }`}
          >
            <p>{log.args}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Console;
