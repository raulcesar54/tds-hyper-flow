import { useBoard } from "../../../hooks/useBoard";
import { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { Connection, Position, addEdge, useReactFlow } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { Button } from "../../../component/uiKit/button";
import { MainMenuProps, TargetNode } from "./types";

export const MainMenu = ({ data, id, ...props }: MainMenuProps) => {
  const [inputValue, setInputValue] = useState("");
  const { updateNode } = useBoard();
  const { connectNode, updateNodeData, removeEdge } = useBoard();
  const [targetNodes, setInputs] = useState<TargetNode[]>([
    {
      NodeId: null,
      Name: "",
      Sequence: "",
    },
  ]);
  useEffect(() => {
    if (!data.targetNode) return;
    setInputs(data.targetNode);
  }, [data]);

  return (
    <div
      className={`p-4 border-2 ${
        props.selected ? "border-blue-400" : ""
      }  flex flex-col rounded-md shadow-sm w-[300px] bg-white`}
    >
      <label
        htmlFor="text"
        className="flex items-center flex-row text-lg font-bold gap-2 "
      >
        <div className="p-3 ring-1 ring-slate-100 bg-slate-50 rounded-lg">
          <FiHome size={16} />
        </div>
        <div className="flex flex-col ">
          Menu
          <small className="mt-[-4px] text-sm font-light">menu de ação</small>
        </div>
      </label>
      <div className="mt-4 flex flex-col">
        {targetNodes.map((item, index) => {
          return (
            <>
              <label
                className="mt-3 font-bold text-sm mb-1"
                htmlFor={`input_${index}`}
              >
                Opção {index + 1}
              </label>
              <input
                id={`input_${index}`}
                className="bg-slate-100 text-sm p-2 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200"
                placeholder="opção do menu principal..."
                name="text"
                onChange={(event) => {
                  setInputs((prevValue) => {
                    return prevValue.map((item, internalIndex) => {
                      if (index === internalIndex) {
                        item.Name = event.target.value;
                      }
                      return item;
                    });
                  });
                  if (targetNodes[index].NodeId !== null) {
                    updateNodeData<{ title: string | null; index: number }>({
                      targetId: String(targetNodes[index].NodeId),
                      value: { title: targetNodes[index].Name, index },
                    });
                  }
                }}
              />
              <div className="relative">
                <HandleStyled
                  isVectorItems
                  type="source"
                  position={Position.Right}
                  id={`source_${index}`}
                  onConnect={(params) => {
                    if (params.target === null) return;
                    if (targetNodes[index].NodeId) {
                      removeEdge(`source_${index}`);
                    }

                    setInputs((prevValue) => {
                      return prevValue.map((item, internalIndex) => {
                        if (index === internalIndex) {
                          item.NodeId = params.target;
                        }
                        return item;
                      });
                    });
                    if (targetNodes[index].Name) {
                      updateNodeData<{ title: string; index: number }>({
                        targetId: String(targetNodes[index].NodeId),
                        value: { title: targetNodes[index].Name, index },
                      });
                    }
                    return connectNode(params);
                  }}
                />
              </div>
            </>
          );
        })}
      </div>
      <div className="flex flex-row gap-2 mt-4">
        <Button
          label="adicionar"
          onClick={
            () => console.log(123)
            // setInputs((Name) => [
            //   ...Name,
            //   {
            //     Name: "",
            //     NodeId: null,
            //   },
            // ])
          }
        />
        <div className="basis-1">
          <Button
            remove
            label="remover"
            onClick={() => setInputs((Name) => Name.slice(1))}
          />
        </div>
      </div>

      <HandleStyled
        type="target"
        position={Position.Left}
        id={`target_${id}`}
        onConnect={(event) => {
          updateNode(event.target, id, inputValue);
        }}
      />
    </div>
  );
};
