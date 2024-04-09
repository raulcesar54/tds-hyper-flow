import { MouseEventHandler } from "react";

export const Button = ({
  label,
  onClick,
  remove,
  disabled,
  title,
}: {
  label: string;
  title?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  remove?: boolean;
  disabled?: boolean;
}) => (
  <button
    title={title}
    disabled={disabled}
    className={`w-full p-2 py-3  
    ${disabled ? "bg-gray-300 text-gray-500" : ""}
    ${
      remove ? "bg-white text-[#000] border-2" : "bg-blue-400"
    } text-white rounded-md mt-4`}
    onClick={onClick}
  >
    {label}
  </button>
);
