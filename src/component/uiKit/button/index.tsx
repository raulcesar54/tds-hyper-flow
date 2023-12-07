export const Button = ({
  label,
  onClick,
  remove,
}: {
  label: string;
  onClick: () => void;
  remove?: boolean;
}) => (
  <button
    className={`w-full p-2 py-3  ${
      remove ? "bg-white text-[#000] border-2" : "bg-blue-400"
    } text-white rounded-md mt-4`}
    onClick={onClick}
  >
    {label}
  </button>
);
