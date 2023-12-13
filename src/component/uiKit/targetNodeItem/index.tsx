import { Position } from "reactflow";
import { HandleStyled } from "../handleStyle";
import { useBoard } from "../../../hooks/useBoard";
import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";

interface TargetNodeItemProps {
  sourceNodeId?: string;
  id?: string;
  index: number;
  name: string;
  data?: any;
  handleUpdateNodeData: (targetId: string, value: string) => void;
}

export const TargetNodeItem = (props: TargetNodeItemProps) => {
  const { index, sourceNodeId, id, name, data, handleUpdateNodeData } = props;
  const [value, setValue] = useState(name);
  const { connectNode, removeEdge, updateNodeData } = useBoard();

  useEffect(() => {
    connectNode({
      source: String(id),
      sourceHandle: `source_${sourceNodeId}`,
      target: String(sourceNodeId),
      targetHandle: `target_${sourceNodeId}`,
    });
    updateNodeData<{ title: string | null; index: number }>({
      targetId: String(sourceNodeId),
      value: {
        title: name,
        name,
        index,
      } as any,
    });
  }, []);

  const handleRemoveItem = (index: number) => {
    removeEdge(`source_${sourceNodeId}`);
    removeEdge(`target_${sourceNodeId}`);
    let provisoreItem = data.targetNode;
    const removedItems = provisoreItem.splice(index, 1);
    updateNodeData({
      targetId: String(id),
      value: {
        ...data,
        targetNode: provisoreItem,
      },
    });
  };

  return (
    <>
      <div className="flex flex-row items-center gap-2 justify-between">
        <div className="flex flex-col w-full">
          <label
            className="mt-3 font-bold text-sm mb-1"
            htmlFor={`input_${index}`}
          >
            Opção {index + 1}
          </label>
          <div className="flex gap-4">
            <input
              id={`input_${index}`}
              className="bg-slate-50 focus:bg-slate-100 text-sm p-2 py-3 placeholder:text-sm placeholder:px-2 w-full disabled:bg-slate-200"
              placeholder="opção do menu principal..."
              name="text"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                data.targetNode[index] = {
                  ...data.targetNode[index],
                  name: event.target.value,
                };

                updateNodeData<{ title: string | null; index: number }>({
                  targetId: String(sourceNodeId),
                  value: {
                    title: event.target.value,
                    name: event.target.value,
                    index,
                  } as any,
                });
                updateNodeData<{ title: string | null; index: number }>({
                  targetId: String(id),
                  value: data as any,
                });
              }}
            />
            <button
              onClick={() => handleRemoveItem(index)}
              className="flex flex-1 p-3 items-center bg-slate-50 rounded-md hover:bg-slate-200 cursor-pointer"
            >
              <FiTrash />
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <HandleStyled
          isVectorItems
          type="source"
          position={Position.Right}
          id={`source_${sourceNodeId}`}
          onConnect={(params) => {
            removeEdge(`source_${sourceNodeId}`);
            handleUpdateNodeData(String(params.target), value);
            connectNode(params);
          }}
        />
      </div>
    </>
  );
};
