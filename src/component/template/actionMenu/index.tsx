import { useCallback, useEffect, useState } from "react";
import { Position } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { Button } from "../../../component/uiKit/button";
import { MainMenuProps, TargetNode } from "./types";
import { TargetNodeItemMenuAction } from "../../../component/uiKit/targetNodeItemMenuAction";
import { CardHeader } from "../../../component/uiKit/cardHeader";
import { v4 } from "uuid";
import { useBoard } from "../../../hooks/useBoard";
import { useProperty } from "../../../hooks/useProperty";

export const ActionMenu = ({ data, id, ...props }: MainMenuProps) => {
  const { updateNodeData } = useBoard();
  const { handleSelectInfo } = useProperty();
  const [targetNodes, setTargetNode] = useState<TargetNode[]>([]);

  useEffect(() => {
    if (!data.targetNode) return;
    setTargetNode(data.targetNode);
  }, [data]);
  useEffect(() => {
    if (!props.selected) handleSelectInfo(null);
  }, [props.selected]);

  const handleClick = useCallback(() => {
    handleSelectInfo({
      label: "Menu de Ações",
      description: "Menu de Ações",
      icon: "FiShuffle",
      nodeId: id,
      type: "ActionMenu",
      customInfo: data,
    });
  }, [props.selected]);

  return (
    <div
      onClick={handleClick}
      className={`p-4 border-2 ${
        props.selected ? "border-blue-400" : ""
      }  flex flex-col rounded-md shadow-sm w-[300px] bg-white`}
    >
      <div className={`mt-4 flex flex-col   ${!data.enabled && "opacity-30"}`}>
        <CardHeader
          iconName="FiShuffle"
          title={"Menu de Ações"}
          subtitle="Menu de Ações"
        />
        {data.image && (
          <img
            src={data.image}
            className="rounded-lg w-full max-h-50 object-cover mt-4"
            alt="image_step"
          />
        )}
        <h1
          dangerouslySetInnerHTML={{
            __html: `${data?.statusMessage?.replace(
              "{{username}}",
              "<strong class='text-blue-400'>Nome do usúario</strong>"
            )}`,
          }}
          className="max-w-[250px] mt-1 text-sm text-slate-800 "
        />
        <div className="mt-4 flex flex-col">
          {targetNodes.map((item, index) => {
            return (
              item.nodeId && (
                <TargetNodeItemMenuAction
                  sourceNodeId={item.nodeId}
                  name={item.name || ""}
                  index={index}
                  id={id}
                  data={data}
                  key={item.nodeId}
                  handleUpdateNodeData={(target, value) => {
                    targetNodes[index].nodeId = target;
                    targetNodes[index].name = value;
                    updateNodeData({ targetId: id, value: targetNodes });
                  }}
                />
              )
            );
          })}
        </div>
        <div className="flex flex-row gap-2 mt-4">
          <Button
            label="Adicionar"
            onClick={() =>
              updateNodeData({
                targetId: id,
                value: {
                  ...data,
                  targetNode: [
                    ...(data.targetNode || []),
                    {
                      nodeId: v4(),
                      name: "",
                      sequence: String(data?.targetNode?.length + 1 || 0),
                    },
                  ],
                },
              })
            }
          />
        </div>
      </div>
      <HandleStyled
        type="target"
        position={Position.Left}
        id={`target_${id}`}
      />
    </div>
  );
};
