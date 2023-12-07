import { FiType } from "react-icons/fi";
import { Position, useReactFlow } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { useBoard } from "../../../hooks/useBoard";
export const Text = ({ data, id, ...props }: any) => {
  const { connectNode, removeEdge } = useBoard();
  const reactflow = useReactFlow();

  return (
    <div
      className={`p-4 border-2 ${
        props.selected ? "border-blue-400" : "border-[#eee] "
      }  w-[320px] flex flex-col rounded-lg bg-white`}
    >
      <label
        htmlFor={`input_${data.index}`}
        className="flex items-center flex-row text-lg font-bold gap-2 "
      >
        <div className="p-3 border-2 border-slate-200 rounded-lg">
          <FiType size={16} />
        </div>
        <div className="flex flex-col ">
          {data.title || "Mensagem"}
          <small className="mt-[-4px] text-sm font-light">
            vincular mensagem
          </small>
        </div>
      </label>
      <div className="mt-4 flex flex-col">
        <label className="mt-3 font-bold text-sm mb-1" htmlFor="text">
          Mensagem vinculados
        </label>
        <div className="flex flex-row gap-3">
          <input
            id="text"
            className="bg-slate-100 w-full text-sm p-2 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200"
            placeholder="buscar relatório..."
            name="text"
          />
        </div>
      </div>

      <HandleStyled type="target" position={Position.Left} id="target" />

      <HandleStyled
        type="source"
        position={Position.Right}
        id="source"
        onConnect={(params) => {
          if (params.target === null) return;
          if (reactflow !== null) {
            const instanceReactFlow = reactflow;
            const isValidTarget = instanceReactFlow
              .getNode(params.target)
              ?.type?.includes("MenuPrincipal");
            if (!isValidTarget) {
              alert("Atenção, o documento pode ligar apenas ao Menu");
              return;
            }
          }

          removeEdge(`source_${id}`);
          return connectNode(params);
        }}
      />
    </div>
  );
};
