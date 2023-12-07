import * as icon from "react-icons/fi";
interface CardHeaderProps {
  iconName: string;
  title: string;
  subtitle: string;
}

export const CardHeader = (props: CardHeaderProps) => {
  const { iconName, title, subtitle } = props;
  const prepareIcon = icon as any;
  const Icons = prepareIcon[iconName];

  return (
    <label
      htmlFor="text"
      className="flex items-center flex-row text-lg font-bold gap-2 "
    >
      <div className="p-3 ring-1 ring-slate-100 bg-slate-50 rounded-lg">
        <Icons size={16} />
      </div>
      <div className="flex flex-col ">
        {title}
        <small className="mt-[-4px] text-sm font-light">{subtitle}</small>
      </div>
    </label>
  );
};
