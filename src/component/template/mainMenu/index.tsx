import { useCallback, useEffect, useState } from "react";
import { Position } from "reactflow";
import { v4 } from "uuid";
import { Button } from "../../../component/uiKit/button";
import { CardHeader } from "../../../component/uiKit/cardHeader";
import { TargetNodeItem } from "../../../component/uiKit/targetNodeItem";
import { useBoard } from "../../../hooks/useBoard";
import { useProperty } from "../../../hooks/useProperty";
import { HandleStyled } from "../../uiKit/handleStyle";
import { MainMenuProps, TargetNode } from "./types";

export const MainMenu = ({ data, id, ...props }: MainMenuProps) => {
  const { updateNodeData } = useBoard();
  const [targetNodes, setTargetNode] = useState<TargetNode[]>([]);
  const { handleSelectInfo } = useProperty();

  useEffect(() => {
    if (!data.targetNode) return;
    setTargetNode(data.targetNode);
  }, [data]);
  useEffect(() => {
    updateNodeData({
      targetId: id,
      value: {
        statusMessage:
          data.statusMessage || "Selecione uma das opções para analisar",
      },
    });
    // if (!props.selected) handleSelectInfo(null);
  }, [props.selected]);

  const handleClick = () => {
    handleSelectInfo({
      label: "Menu",
      description: "Menu",
      icon: "FiHome",
      nodeId: id,
      type: "Menu",
      customInfo: data,
    });
  };

  return (
    <div
      onClick={handleClick}
      className={`border-2 p-4 ${
        props.selected ? "border-blue-400" : ""
      }  flex w-[300px] flex-col rounded-md bg-white shadow-sm`}
    >
      <CardHeader
        iconName="FiHome"
        title={data.title || "Menu"}
        subtitle="Menu"
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
      <div className="mt-2 flex flex-col">
        {targetNodes.map((item, index) => {
          return (
            item.nodeId && (
              <TargetNodeItem
                sourceNodeId={item.nodeId}
                name={item.name || ""}
                index={index}
                id={id}
                data={data as any}
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
      <HandleStyled
        type="target"
        position={Position.Left}
        id={`target_${id}`}
      />
    </div>
  );
};
