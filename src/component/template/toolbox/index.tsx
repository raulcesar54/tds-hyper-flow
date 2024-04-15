import { RiRobot2Line } from "react-icons/ri";
import { HoverCard } from "../../../component/uiKit/hoverCard";
import {
  FiCpu,
  FiFileText,
  FiHome,
  FiMail,
  FiMessageSquare,
  FiShuffle,
  FiType,
} from "react-icons/fi";

export const Toolbox = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="absolute z-50 bg-white left-4 top-[35%] overflow-hidden flex flex-col gap-2 items-center shadow-md rounded-md p-2 py-4">
      <HoverCard title="Documento">
        <button
          onDragStart={(event) => onDragStart(event, "KPIDoc")}
          draggable
          className="b-none p-4 hover:bg-slate-50"
        >
          <FiFileText size={18} />
        </button>
      </HoverCard>
      <HoverCard title="Mensagem">
        <button
          onDragStart={(event) => onDragStart(event, "KPIText")}
          draggable
          className="b-none p-4 hover:bg-slate-50"
        >
          <FiMessageSquare size={18} />
        </button>
      </HoverCard>
      <hr className="h-px px-5 max-w-md  w-full opacity-50" />
      <HoverCard title="Menu">
        <button
          onDragStart={(event) => onDragStart(event, "MenuItem")}
          draggable
          className="b-none p-4 hover:bg-slate-50"
        >
          <FiHome size={18} />
        </button>
      </HoverCard>
      <hr className="h-px px-5 max-w-md  w-full opacity-50" />
      <HoverCard title="Ação">
        <button
          onDragStart={(event) => onDragStart(event, "Action")}
          draggable
          className="b-none p-4 hover:bg-slate-50"
        >
          <FiCpu size={18} />
        </button>
      </HoverCard>
      <HoverCard title="IA">
        <button
          onDragStart={(event) => onDragStart(event, "IA")}
          draggable
          className="b-none p-4 hover:bg-slate-50"
        >
          <RiRobot2Line size={18} />
        </button>
      </HoverCard>
    </div>
  );
};
