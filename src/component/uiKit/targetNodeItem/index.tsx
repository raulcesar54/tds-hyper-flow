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
  data?: {
    targetNode: {
      name: string;
      nodeId: string;
      sequence: string;
      flowId?: string;
    }[];
  };
  handleUpdateNodeData: (targetId: string, value: string) => void;
}

export const TargetNodeItem = (props: TargetNodeItemProps) => {
  const { index, sourceNodeId, id, name, data, handleUpdateNodeData } = props;
  const [value, setValue] = useState(name);
  const { connectNode, removeEdge, updateNodeData } = useBoard();

  const handleRemoveItem = (index: number, targetId?: string) => {
    removeEdge(`source_${sourceNodeId}`);
    removeEdge(`target_${sourceNodeId}`);
    if (!data?.targetNode) return;
    let provisoreItem = data.targetNode;
    const removedItems = provisoreItem.splice(index, 1);
    if (targetId) {
      updateNodeData({
        targetId: String(targetId),
        value: { sequence: String(index + 1), parent: "", name: "", title: "" },
      });
    }
    updateNodeData({
      targetId: String(id),
      value: {
        ...data,
        targetNode: provisoreItem,
      },
    });
  };
  useEffect(() => {
    const item = data?.targetNode.find((item) => item.nodeId === sourceNodeId);
    const itemIndex = data?.targetNode.findIndex(
      (item) => item.nodeId === sourceNodeId
    );
    if (
      item?.flowId === "00000000-0000-0000-0000-000000000000" ||
      !item?.flowId
    )
      return;
    updateNodeData<{ title: string | null; index: number }>({
      targetId: String(item?.flowId),
      value: {
        title: item.name,
        name: item.name,
        parent: item?.flowId,
        sequence: String((itemIndex || 0) + 1),
        index: itemIndex,
      } as any,
    });
    setValue(item.name);
    connectNode({
      source: String(id),
      sourceHandle: `source_${item.nodeId}`,
      target: item.flowId,
      targetHandle: `target_${item.flowId}`,
    });
  }, []);
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
                if (!data) return;
                const getValueById = data.targetNode.find(
                  (item) => item.nodeId === sourceNodeId
                );
                handleUpdateNodeData(String(getValueById?.flowId), value);
                updateNodeData<{ title: string | null; index: number }>({
                  targetId: String(getValueById?.flowId),
                  value: {
                    title: event.target.value,
                    name: event.target.value,
                    parent: getValueById?.flowId,
                    sequence: String(index + 1),
                    index,
                  } as any,
                });
              }}
            />
            <button
              onClick={() => {
                if (!data) return;

                const getValueById = data.targetNode.find(
                  (item) => item.nodeId === sourceNodeId
                );
                handleRemoveItem(index, getValueById?.flowId);
              }}
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
            handleUpdateNodeData(String(params.target), value);
            updateNodeData({
              targetId: String(params.target),
              value: { sequence: String(index + 1), parent: sourceNodeId },
            });
            connectNode(params);
          }}
        />
      </div>
    </>
  );
};
