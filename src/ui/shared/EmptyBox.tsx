import { ReactNode } from "react";

const EmptyBox = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <div className="min-h-32 w-full flex items-center justify-center">
      <div className="sm:p-4 p-2 text-white flex flex-col gap-2 max-w-96 items-center justify-center">
        <h1 className="text-xl">Does not have any {label}</h1>
        {children}
      </div>
    </div>
  );
};

export default EmptyBox;
