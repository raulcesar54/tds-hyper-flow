import { Position } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { useFlow } from "../../../hooks/useFlow";
import { useCallback, useEffect, useState } from "react";
import { Props } from "./types";
import { CardHeader } from "../../uiKit/cardHeader";
import { useProperty } from "../../../hooks/useProperty";
import { useBoard } from "../../../hooks/useBoard";

export const Document = ({ data, id, ...props }: Props) => {
  const { handleSelectInfo } = useProperty();
  const { documents } = useFlow();
  const { connectNode, removeEdge } = useBoard();
  const [value, setValue] = useState(data.message);

  const handleClick = useCallback(() => {
    handleSelectInfo({
      label: data.title || "Documento",
      description: "vincular documento",
      icon: "FiFileText",
      nodeId: id,
      type: "Document",
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
        iconName="FiFileText"
        subtitle="vincular documento"
        title={data.title || "Documento"}
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
            {documents?.map((item) => {
              return (
                <option value={item.Id} key={item.Id}>
                  {item.Name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <HandleStyled
        type="target"
        position={Position.Left}
        id={`target_${id}`}
      />
      <HandleStyled
        type="source"
        position={Position.Right}
        id={`source_${id}`}
        onConnect={(params) => {
          removeEdge(`source_${id}`);
          connectNode(params);
        }}
      />
    </div>
  );
};
