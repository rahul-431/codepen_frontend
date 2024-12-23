import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSearchParams } from "react-router-dom";

const PenBody = () => {
  const [searchParam] = useSearchParams();
  const layoutFilter = searchParam.get("layout") || "normal";
  return (
    <section className="w-full h-full border-t border-slate-500 bg-black flex flex-col justify-between">
      <ResizablePanelGroup
        direction={layoutFilter === "normal" ? "vertical" : "horizontal"}
      >
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup
            direction={layoutFilter === "normal" ? "horizontal" : "vertical"}
          >
            <ResizablePanel defaultSize={50} className="bg-primary">
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
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
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
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
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
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
          <div className="flex h-[200px] items-center justify-center p-6">
            <span className="font-semibold">One</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
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
