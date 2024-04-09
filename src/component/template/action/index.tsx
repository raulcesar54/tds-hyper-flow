import { useCallback } from "react";
import { Position } from "reactflow";
import { useProperty } from "../../../hooks/useProperty";
import { CardHeader } from "../../uiKit/cardHeader";
import { HandleStyled } from "../../uiKit/handleStyle";
import { Props } from "./types";

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

  return (
    <div
      onClick={handleClick}
      className={`p-4 border-2 ${
        props.selected ? "border-blue-400" : "border-[#eee] "
      }  w-[320px] flex flex-col rounded-lg bg-white`}
    >
      <div className={`flex flex-col   ${!data.enabled && "opacity-30"}`}>
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
        {data?.statusMessage && data.statusMessage !== "Ação" && (
          <h1
            dangerouslySetInnerHTML={{
              __html: `${data?.statusMessage?.replace(
                "{{username}}",
                "<strong class='text-blue-400'>Nome do usúario</strong>"
              )}`,
            }}
            className="max-w-[250px] mt-1 text-sm text-slate-800 "
          />
        )}
        <HandleStyled
          type="target"
          position={Position.Left}
          id="target"
          onDrop={console.log}
        />
      </div>
    </div>
  );
};
