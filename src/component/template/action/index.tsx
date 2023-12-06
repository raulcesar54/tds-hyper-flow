import { FiShuffle } from "react-icons/fi";
import { Position } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
export const Action = ({ data, id, ...props }: any) => {
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
          <FiShuffle size={16} />
        </div>
        <div className="flex flex-col ">
          {data.title || "Ações"}
          <small className="mt-[-4px] text-sm font-light">vincular ação</small>
        </div>
      </label>
      <div className="mt-4 flex flex-col">
        <label className="mt-3 font-bold text-sm mb-1" htmlFor="text">
          Ações
        </label>
        <div className="flex flex-row gap-3">
          <select className="bg-slate-100 w-full text-sm p-2 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200">
            <option value="relatorio1">menu principal</option>
            <option value="relatori2">menu anterior</option>
            <option value="relatorio3">escolher outro bot</option>
          </select>
        </div>
      </div>

      <HandleStyled
        type="target"
        position={Position.Left}
        id="target"
        onDrop={console.log}
        onConnect={(event) => {}}
      />
    </div>
  );
};
