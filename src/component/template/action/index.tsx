import { Position } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { useCallback, useEffect } from "react";
import { Props } from "./types";
import { useProperty } from "../../../hooks/useProperty";
import { CardHeader } from "../../uiKit/cardHeader";

export const Action = ({ data, id, ...props }: Props) => {
  const { handleSelectInfo } = useProperty();

  const handleClick = useCallback(() => {
    handleSelectInfo({
      label: data.title || "Ações",
      description: "Vincular Ação",
      icon: "FiCpu",
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
        iconName="FiCpu"
        subtitle="Ação"
        title={data.title || "Ação"}
      />
      {data.image && (
        <img
          src={data.image}
          className="rounded-lg mt-1 w-full max-h-50 object-cover"
          alt="image_step"
        />
      )}
      <HandleStyled
        type="target"
        position={Position.Left}
        id="target"
        onDrop={console.log}
      />
    </div>
  );
};
