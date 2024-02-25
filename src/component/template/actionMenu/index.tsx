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
    updateNodeData({
      targetId: id,
      value: {
        statusMessage:
          data.statusMessage || " Selecione uma das opções para analisar",
      },
    });
    // if (!props.selected) handleSelectInfo(null);
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
      className={`border-2 p-4 ${
        props.selected ? "border-blue-400" : ""
      }  flex w-[300px] flex-col rounded-md bg-white shadow-sm`}
    >
      <div className={` flex flex-col   ${!data.enabled && "opacity-30"}`}>
        <CardHeader
          iconName="FiShuffle"
          title={"Menu de Ações"}
          subtitle="Menu de Ações"
        />
        {data.image && (
          <img
            src={data.image}
            className="max-h-50  w-full rounded-lg object-cover"
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
          className=" mt-3 max-w-[250px] text-sm text-slate-800 "
        />
        <div className=" flex flex-col">
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
                    targetNodes[index].name = value;
                    targetNodes[index].sequence = String(index + 1);
                    targetNodes[index].flowId = target;
                    updateNodeData({
                      targetId: target,
                      value: { title: value },
                    });
                  }}
                />
              )
            );
          })}
        </div>
        <div className=" flex flex-row gap-2">
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
