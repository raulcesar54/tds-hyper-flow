import { RiRobot2Line } from "react-icons/ri";
import { HoverCard } from "../../../component/uiKit/hoverCard";
import {
  FiCpu,
  FiFileText,
  FiHome,
  FiMessageSquare,
} from "react-icons/fi";
import { useFlow } from "../../../hooks/useFlow";

export const Toolbox = () => {
  const { data } = useFlow()
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const isCognitiveDisabled = data?.chatBot.engine === 'Cognitive' && 'cursor-not-allowed pointer-events-none opacity-20'
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
          className='b-none p-4 hover:bg-slate-50'
        >
          <FiMessageSquare size={18} />
        </button>
      </HoverCard>
      <hr className="h-px px-5 max-w-md  w-full opacity-50" />
      <HoverCard title="Menu">
        <button
          onDragStart={(event) => onDragStart(event, "MenuItem")}
          draggable
          className={`b-none p-4 hover:bg-slate-50 ${isCognitiveDisabled}`}
        >
          <FiHome size={18} />
        </button>
      </HoverCard>
      <hr className="h-px px-5 max-w-md  w-full opacity-50" />
      <HoverCard title="Ação">
        <button
          onDragStart={(event) => onDragStart(event, "Action")}
          draggable
          className={`b-none p-4 hover:bg-slate-50 ${isCognitiveDisabled}`}
        >
          <FiCpu size={18} />
        </button>
      </HoverCard>
      <HoverCard title="IA">
        <button
          onDragStart={(event) => onDragStart(event, "IA")}
          draggable
          className={`b-none p-4 hover:bg-slate-50 ${isCognitiveDisabled}`}
        >
          <RiRobot2Line size={18} />
        </button>
      </HoverCard>
    </div>
  );
};
