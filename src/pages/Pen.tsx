import PenBody from "@/ui/shared/PenBody";
import PenNavbar from "@/ui/shared/PenNavbar";

const Pen = () => {
  return (
    <div className="flex flex-col">
      <PenNavbar />
      <PenBody />
    </div>
  );
};

export default Pen;
