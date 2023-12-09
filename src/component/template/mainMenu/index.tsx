import { useEffect, useState } from "react";
import { Position } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { Button } from "../../../component/uiKit/button";
import { MainMenuProps, TargetNode } from "./types";
import { TargetNodeItem } from "../../../component/uiKit/targetNodeItem";
import { CardHeader } from "../../../component/uiKit/cardHeader";
import { v4 } from "uuid";
import { useBoard } from "../../../hooks/useBoard";

export const MainMenu = ({ data, id, ...props }: MainMenuProps) => {
  const { updateNodeData } = useBoard();
  const [targetNodes, setTargetNode] = useState<TargetNode[]>([]);

  useEffect(() => {
    if (!data.targetNode) return;
    setTargetNode(data.targetNode);
  }, [data]);

  return (
    <div
      className={`p-4 border-2 ${
        props.selected ? "border-blue-400" : ""
      }  flex flex-col rounded-md shadow-sm w-[300px] bg-white`}
    >
      <CardHeader iconName="FiHome" title={"Menu"} subtitle="menu de ações" />
      <div className="mt-4 flex flex-col">
        {targetNodes.map((item, index) => {
          return (
            item.nodeId && (
              <TargetNodeItem
                sourceNodeId={item.nodeId}
                name={item.name || ""}
                index={index}
                id={id}
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
          label="adicionar"
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
