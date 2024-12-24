import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import { DiCssTricks } from "react-icons/di";
import { RiDropdownList } from "react-icons/ri";
import { FaHtml5, FaJsSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOpenResult } from "@/redux/slices/CodeSlice";
import { RootState } from "@/redux/store";
import Output from "./Output";

const PenBody = () => {
  const [searchParam] = useSearchParams();
  const layoutFilter = searchParam.get("layout") || "normal";
  const dispatch = useDispatch();
  const openResult = useSelector((state: RootState) => state.openResult);
  return (
    <section className="w-full h-full border-t border-slate-500 bg-black flex flex-col justify-between">
      {/* for mobile view */}
      <div className="block md:hidden text-white w-full h-full">
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="flex gap-1 px-4 bg-transparent items-center justify-between">
            <div className="flex gap-1">
              <TabsTrigger
                value="html"
                className="bg-[#383a47] hover:bg-white hover:text-black text-white"
              >
                HTML
              </TabsTrigger>
              <TabsTrigger
                value="css"
                className="bg-[#383a47] hover:bg-white hover:text-black text-white"
              >
                CSS
              </TabsTrigger>
              <TabsTrigger
                value="js"
                className="bg-[#383a47] hover:bg-white hover:text-black text-white"
              >
                JS
              </TabsTrigger>
            </div>
            <button
              onClick={() => dispatch(setOpenResult(!openResult))}
              className={` px-2 py-1 rounded-md ${
                openResult ? "bg-white text-black" : "bg-[#383a47]"
              } text-white`}
            >
              Result
            </button>
          </TabsList>
          <div className="w-full h-full flex flex-col sm:flex-row justify-between px-4 ">
            <div
              className={`${
                openResult ? "w-full sm:w-[400px] sm:min-w-80" : "w-full h-full"
              }`}
            >
              <TabsContent value="html">
                <CodeEditor
                  language="html"
                  defaultValue="<h1>Hello World</h1>"
                />
              </TabsContent>
              <TabsContent value="css">
                <CodeEditor language="css" defaultValue="h1{color:red}" />
              </TabsContent>
              <TabsContent value="js">
                <CodeEditor
                  language="javascript"
                  defaultValue="console.log('helloworld');"
                />
              </TabsContent>
            </div>
            {openResult && (
              <div className="bg-white min-w-80 min-h-48 max-h-60 sm:min-h-[432px]">
                <Output />
              </div>
            )}
          </div>
        </Tabs>
      </div>

      {/* for desktop view */}
      <div className="hidden md:block w-full h-full">
        <ResizablePanelGroup
          direction={layoutFilter === "normal" ? "vertical" : "horizontal"}
        >
          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup
              direction={layoutFilter === "normal" ? "horizontal" : "vertical"}
            >
              <ResizablePanel defaultSize={50} className="bg-primary">
                <div className="flex justify-between items-center p-1">
                  <h1 className="flex gap-1 items-center bg-[#383a47] text-white p-1 rounded font-semibold">
                    <span className="text-red-500 text-2xl">
                      <FaHtml5 />
                    </span>
                    <span>HTML</span>
                  </h1>
                  <button className="text-xl rounded text-white">
                    <RiDropdownList />
                  </button>
                </div>
                <CodeEditor
                  language="html"
                  defaultValue="<h1>Hello World</h1>"
                />
              </ResizablePanel>
              <ResizableHandle
                withHandle
                style={
                  layoutFilter !== "normal"
                    ? {
                        width: "100%",
                        height: "16px",
                      }
                    : {}
                }
                className="bg-black w-4 border-r border-l border-slate-500"
              />
              <ResizablePanel defaultSize={50} className="bg-primary">
                <div className="flex justify-between items-center p-1">
                  <h1 className="flex gap-1 items-center bg-[#383a47] text-white p-1 rounded font-semibold">
                    <span className="text-blue-500 text-2xl">
                      <DiCssTricks />
                    </span>
                    <span>CSS</span>
                  </h1>

                  <button className="text-xl rounded text-white">
                    <RiDropdownList />
                  </button>
                </div>
                <CodeEditor language="css" defaultValue="h1{color:red}" />
              </ResizablePanel>
              <ResizableHandle
                withHandle
                style={
                  layoutFilter !== "normal"
                    ? {
                        width: "100%",
                        height: "16px",
                      }
                    : {}
                }
                className="bg-black w-4 border-r border-l border-slate-500"
              />
              <ResizablePanel defaultSize={50} className="bg-primary">
                <div className="flex justify-between items-center p-1">
                  <h1 className="flex gap-1 items-center bg-[#383a47] text-white p-1 rounded font-semibold">
                    <span className="text-yellow-500 text-2xl">
                      <FaJsSquare />
                    </span>
                    <span>JS</span>
                  </h1>

                  <button className="text-xl rounded text-white">
                    <RiDropdownList />
                  </button>
                </div>
                <CodeEditor
                  language="javascript"
                  defaultValue="console.log('helloworld');"
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle
            withHandle
            style={
              layoutFilter === "normal" ? { width: "100%", height: "16px" } : {}
            }
            className="bg-black w-4 border-r border-l border-slate-500"
          />
          <ResizablePanel defaultSize={40} className="bg-white">
            <Output />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="bg-slate-600 p-2 flex gap-2">
        <Button className="bg-[#1E1F26] hover:bg-[#383a47]" size="sm">
          Console
        </Button>
        <Button className="bg-[#1E1F26] hover:bg-[#383a47]" size="sm">
          Assets
        </Button>
        <Button className="bg-[#1E1F26] hover:bg-[#383a47]" size="sm">
          Shortcuts
        </Button>
      </div>
    </section>
  );
};
export default PenBody;
