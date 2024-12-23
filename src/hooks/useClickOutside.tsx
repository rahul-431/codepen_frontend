import { useCallback, useEffect, useRef } from "react";

export const useClickOutside = (
  callback: React.Dispatch<React.SetStateAction<boolean>>,
  condition: boolean
) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = useCallback((e: MouseEvent) => {
    if (
      ref.current &&
      !(e.target instanceof Node && ref.current.contains(e.target))
    ) {
      callback(false);
    }
  }, []);

  useEffect(() => {
    if (condition) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [condition, handleClick]);
  return ref;
};
