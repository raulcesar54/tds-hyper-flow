import * as icon from "react-icons/fi";
import { HoverCard } from "../hoverCard";
interface CardHeaderProps {
  iconName: string;
  title: string;
  subtitle: string;
  showCloseIcon?: boolean;
  handleCloseIcon?: () => void;
  handleRemoveItem?: () => void;
}

export const CardHeader = (props: CardHeaderProps) => {
  const { iconName, title, subtitle } = props;
  const prepareIcon = icon as any;
  const Icons = prepareIcon[iconName];

  return (
    <label
      htmlFor="text"
      className="flex items-center flex-row text-lg font-bold gap-3 w-full "
    >
      <div className="p-3 ring-1 ring-slate-100 bg-slate-50 rounded-lg">
        <Icons size={18} />
      </div>
      <div className="flex flex-col ">
        {title}
        <small className="mt-[-4px] text-sm font-light">{subtitle}</small>
      </div>
      {props.showCloseIcon && (
        <div
          className="p-3 ring-1 ring-slate-100 bg-slate-50 rounded-lg ml-auto cursor-pointer"
          onClick={props.handleCloseIcon}
        >
          {props.showCloseIcon && <icon.FiX />}
        </div>
      )}
      {props.handleRemoveItem && (
        <HoverCard title="Remover Nó" position="right" subtitle="excluir">
          <div
            onClick={props.handleCloseIcon}
            className="p-3 ring-1 ring-slate-100  rounded-lg ml-auto cursor-pointer hover:ring-blue-400 hover:text-white hover:bg-blue-500"
          >
            <icon.FiTrash2 />
          </div>
        </HoverCard>
      )}
    </label>
  );
};
