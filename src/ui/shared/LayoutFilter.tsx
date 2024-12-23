import { useSearchParams } from "react-router-dom";
import { RiLayout2Fill, RiLayout4Fill } from "react-icons/ri";
import { TfiLayoutTabWindow } from "react-icons/tfi";
import { ReactNode } from "react";
const LayoutFilter = ({
  options,
}: {
  options: {
    value: string;
    icon: ReactNode;
  }[];
}) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentLayoutFilter =
    searchParam.get("layout") || options.at(0)?.value || "normal";
  const handleClick = (value: string) => {
    searchParam.set("layout", value);
    setSearchParam(searchParam);
  };
  return (
    <div className=" flex gap-4 border border-white rounded-sm">
      {options.map((option) => (
        <button
          onClick={() => handleClick(option.value)}
          key={option.value}
          className={`p-2 rounded-md text-2xl ${
            option.value !== currentLayoutFilter
              ? "bg-[#1E1F26]"
              : "bg-[#383a47]"
          }  hover:bg-[#383a47]`}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
};

export default LayoutFilter;
