import { Position, useReactFlow } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { useBoard } from "../../../hooks/useBoard";
import { CardHeader } from "../../uiKit/cardHeader";
import { useFlow } from "../../../hooks/useFlow";
import { MainMenuProps } from "./types";
import { useProperty } from "../../../hooks/useProperty";
import { useCallback, useEffect, useMemo, useState } from "react";

export const Text = ({ data, id, ...props }: MainMenuProps) => {
  const { connectNode, removeEdge } = useBoard();
  const { handleSelectInfo } = useProperty();
  const reactflow = useReactFlow();
  const { loading, messages } = useFlow();
  const [value, setValue] = useState(data.message);

  const handleClick = useCallback(() => {
    handleSelectInfo({
      label: data.title || "Mensagem",
      description: "vincular mensagem",
      icon: "FiType",
      nodeId: id,
      type: "Message",
      customInfo: data,
    });
  }, [props.selected]);
  useEffect(() => {
    if (!props.selected) handleSelectInfo(null);
  }, [props.selected]);

  return (
    <div
      onClick={handleClick}
      className={`p-4 border-2 ${
        props.selected ? "border-blue-400" : "border-[#eee] "
      }  w-[320px] flex flex-col rounded-lg bg-white`}
    >
      <CardHeader
        iconName="FiType"
        title={data.title || "Mensagem"}
        subtitle="vincular mensagem"
      />
      <div className="mt-4 flex flex-col">
        {data.image && (
          <img
            src={data.image}
            className="rounded-lg mt-1 w-full max-h-50 object-cover"
            alt="image_step"
          />
        )}
        <label className="mt-3 font-bold text-sm mb-1" htmlFor="text">
          Selecione a expressão
        </label>
        <div className="flex flex-row gap-3">
          <select
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="bg-slate-50 focus:bg-slate-100 text-sm p-2 py-3 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200 w-full"
          >
            {messages?.map((item) => {
              return (
                <option value={item.Id} key={item.Id}>
                  {item.Name}
                </option>
              );
            })}
          </select>
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
