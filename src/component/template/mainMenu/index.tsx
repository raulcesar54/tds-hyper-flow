import { useBoard } from "../../../hooks/useBoard";
import { useEffect, useState } from "react";
import { Position } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { Button } from "../../../component/uiKit/button";
import { MainMenuProps, TargetNode } from "./types";
import { TargetNodeItem } from "../../../component/uiKit/targetNodeItem";
import { CardHeader } from "../../../component/uiKit/cardHeader";
import { v4 } from "uuid";
export const MainMenu = ({ data, id, ...props }: MainMenuProps) => {
  const { updateNode } = useBoard();
  const [targetNodes, setTargetNode] = useState<TargetNode[]>([]);

  useEffect(() => {
    if (!data.targetNode) return;
    const prepareData = data.targetNode.map((item) => {
      return {
        ...item,
        handleId: v4(),
      };
    });
    setTargetNode(prepareData);
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
            <TargetNodeItem
              sourceId={id}
              targetNode={item}
              index={index}
              key={item.handleId}
            />
          );
        })}
      </div>
      <div className="flex flex-row gap-2 mt-4">
        <Button
          label="adicionar"
          onClick={() =>
            setTargetNode((preventName) => {
              return [
                ...preventName,
                {
                  nodeId: null,
                  handleId: v4(),
                  sequence: "",
                  name: "",
                },
              ];
            })
          }
        />
      </div>

      <HandleStyled
        type="target"
        position={Position.Left}
        id={`target_${id}`}
        onConnect={(event) => {
          updateNode(event.target, id, "");
        }}
      />
    </div>
  );
};
