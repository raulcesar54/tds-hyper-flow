import { Position } from "reactflow";
import { TargetNode } from "../../../component/template/mainMenu/types";
import { HandleStyled } from "../handleStyle";
import { useBoard } from "../../../hooks/useBoard";
import { useEffect, useState } from "react";

interface TargetNodeItemProps {
  targetNode: TargetNode;
  index: number;
  sourceId: string;
}

export const TargetNodeItem = (props: TargetNodeItemProps) => {
  const { index, sourceId, targetNode } = props;
  const { connectNode, removeEdge, updateNodeData } = useBoard();
  const [value, setValue] = useState(targetNode.name || "");

  useEffect(() => {
    connectNode({
      source: sourceId,
      sourceHandle: `source_${targetNode.handleId}`,
      target: targetNode.nodeId,
      targetHandle: "target",
    });
    updateNodeData<{ title: string | null; index: number }>({
      targetId: String(targetNode.nodeId),
      value: { title: value, index } as any,
    });
  }, []);
  return (
    <>
      <label className="mt-3 font-bold text-sm mb-1" htmlFor={`input_${index}`}>
        Opção {index + 1}
      </label>
      <input
        id={`input_${index}`}
        className="bg-slate-50 focus:bg-slate-100 text-sm p-2 py-3 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200"
        placeholder="opção do menu principal..."
        name="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          updateNodeData<{ title: string | null; index: number }>({
            targetId: String(targetNode.nodeId),
            value: { title: event.target.value, index } as any,
          });
        }}
      />
      <div className="relative">
        <HandleStyled
          isVectorItems
          type="source"
          position={Position.Right}
          id={`source_${targetNode.handleId}`}
          onConnect={(params) => {
            if (params.target === null) return;
            removeEdge(`source_${targetNode.handleId}`);
            connectNode(params);
            updateNodeData<{ title: string | null; index: number }>({
              targetId: String(targetNode.nodeId),
              value: { title: value, index } as any,
            });
          }}
        />
      </div>
    </>
  );
};
