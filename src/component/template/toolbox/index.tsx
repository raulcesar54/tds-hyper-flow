import { HoverCard } from "../../../component/uiKit/hoverCard";
import { FiCpu, FiFileText, FiHome, FiShuffle, FiType } from "react-icons/fi";

export const Toolbox = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="absolute z-50 bg-white left-4 top-[35%] overflow-hidden flex flex-col items-center shadow-md rounded-md py-2">
      <HoverCard title="Documento">
        <button
          onDragStart={(event) => onDragStart(event, "KPIDoc")}
          draggable
          className="b-none p-4 hover:bg-slate-50"
        >
          <FiFileText />
        </button>
      </HoverCard>
      <HoverCard title="Ação">
        <button
          onDragStart={(event) => onDragStart(event, "Action")}
          draggable
          className="b-none p-4 hover:bg-slate-50"
        >
          <FiCpu />
        </button>
      </HoverCard>
      <HoverCard title="Mensagem">
        <button
          onDragStart={(event) => onDragStart(event, "KPIText")}
          draggable
          className="b-none p-4 hover:bg-slate-50"
        >
          <FiType />
        </button>
      </HoverCard>
      <HoverCard title="Ações">
        <button
          onDragStart={(event) => onDragStart(event, "ActionMenu")}
          draggable
          className="b-none p-4 hover:bg-slate-50"
        >
          <FiShuffle />
        </button>
      </HoverCard>
      <HoverCard title="Menu">
        <button
          onDragStart={(event) => onDragStart(event, "MenuItem")}
          draggable
          className="b-none p-4 hover:bg-slate-50"
        >
          <FiHome />
        </button>
      </HoverCard>
    </div>
  );
};
