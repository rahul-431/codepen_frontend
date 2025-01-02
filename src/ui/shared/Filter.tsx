import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

export default function Filter({
  filterField,
  options,
  classname = "p-1 rounded-sm  hover:bg-green-600 font-semibold text-white sm:w-20",
}: {
  filterField: string;
  classname?: string;
  options: {
    value: string;
    label?: string;
    icon?: ReactNode;
  }[];
}) {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentFilter = searchParam.get(filterField) || options[0].value;
  function handleClick(value: string) {
    searchParam.set(filterField, value);
    setSearchParam(searchParam);
  }
  return (
    <div className="flex items-center gap-1">
      {options.map((option) => (
        <button
          className={`${
            option.value === currentFilter ? "bg-green-600" : "bg-green-900"
          } ${classname}`}
          onClick={() => handleClick(option.value)}
          key={option.value}
          disabled={option.value === currentFilter}
        >
          {option?.label ? option.label : option.icon}
        </button>
      ))}
    </div>
  );
}
