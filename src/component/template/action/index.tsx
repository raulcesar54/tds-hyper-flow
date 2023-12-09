import { FiShuffle } from "react-icons/fi";
import { Position } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { useCallback, useEffect, useState } from "react";
import { Props } from "./types";
import { useFlow } from "../../../hooks/useFlow";
import { useProperty } from "../../../hooks/useProperty";
import { CardHeader } from "../../uiKit/cardHeader";

export const Action = ({ data, id, ...props }: Props) => {
  const [value, setValue] = useState("");
  const { data: flowData } = useFlow();
  const { handleSelectInfo } = useProperty();

  const handleClick = useCallback(() => {
    handleSelectInfo({
      label: data.title || "Ações",
      description: "vincular ação",
      icon: "FiShuffle",
      nodeId: id,
      type: "Action",
      customInfo: { ...data },
    });
  }, [props.selected, data]);

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
        iconName="FiShuffle"
        subtitle="vincular ação"
        title={data.title || "Ações"}
      />
      {data.image && (
        <img
          src={data.image}
          className="rounded-lg mt-1 w-full max-h-50 object-cover"
          alt="image_step"
        />
      )}
      <div className="flex flex-row gap-3 mt-6">
        <select
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="bg-slate-50 focus:bg-slate-100 text-sm p-2 py-3 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200 w-full"
        >
          {flowData?.chatBot.Actions.map((item) => {
            return (
              <option value={item.Id} key={item.Id}>
                {item.Value}
              </option>
            );
          })}
        </select>
      </div>

      <HandleStyled
        type="target"
        position={Position.Left}
        id="target"
        onDrop={console.log}
      />
    </div>
  );
};
