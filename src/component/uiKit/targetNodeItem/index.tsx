import { Position } from "reactflow";
import { HandleStyled } from "../handleStyle";
import { useBoard } from "../../../hooks/useBoard";
import { useEffect, useState } from "react";

interface TargetNodeItemProps {
  sourceNodeId?: string;
  id?: string;
  index: number;
  name: string;
  handleUpdateNodeData: (targetId: string, value: string) => void;
}

export const TargetNodeItem = (props: TargetNodeItemProps) => {
  const { index, sourceNodeId, id, name, handleUpdateNodeData } = props;
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
            targetId: String(sourceNodeId),
            value: {
              title: event.target.value,
              name: event.target.value,
              index,
            } as any,
          });
        }}
      />
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
