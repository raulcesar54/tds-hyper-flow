import { FiFileText } from "react-icons/fi";
import { Position, useReactFlow } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { useBoard } from "../../../hooks/useBoard";
export const Document = ({ data, id, ...props }: any) => {
  const { connectNode, removeEdge } = useBoard();
  const reactflow = useReactFlow();
  return (
    <div
      className={`p-4 border-2 ${
        props.selected ? "border-blue-400" : "border-[#eee] "
      }  w-[400px] flex flex-col rounded-lg bg-white`}
    >
      <HandleStyled type="target" position={Position.Left} id="target" />
      <label
        htmlFor={`input_${data.index}`}
        className="flex items-center flex-row text-lg font-bold gap-2 "
      >
        <div className="p-3 border-2 border-slate-200 rounded-lg">
          <FiFileText size={16} />
        </div>
        <div className="flex flex-col ">
          {data.title || "Documento"}
          <small className="mt-[-4px] text-sm font-light">
            vincular documento
          </small>
        </div>
      </label>
      <div className="mt-4 flex flex-col">
        <label className="mt-3 font-bold text-sm mb-1" htmlFor="text">
          Documento vinculados
        </label>
        <div className="flex flex-row gap-3">
          <input
            className="bg-slate-100 w-full text-sm p-2 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200"
            placeholder="opção do menu principal..."
            name="text"
          />
          <select className="bg-slate-100 text-sm p-2 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200">
            <option value="relatorio1">Relatorio 01</option>
            <option value="relatori2">Relatorio 02</option>
            <option value="relatorio3">Relatorio 03</option>
          </select>
        </div>
      </div>

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
