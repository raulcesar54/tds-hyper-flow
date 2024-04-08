import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { Position } from "reactflow";
import { useBoard } from "../../../hooks/useBoard";
import { HandleStyled, HandleVectorItem } from "../handleStyle";

interface TargetNodeItemProps {
  sourceNodeId?: string;
  id?: string;
  index: number;
  name: string;
  i: number;
  data?: {
    targetNode: {
      name: string;
      nodeId: string;
      sequence: string;
      flowId?: string;
    }[];
  };
  handleRemoverItem: () => void;
  handleRemoverItemAnotherTargetId: (targetId: string) => void;
  handleUpdateNodeData: (targetId: string, value: string) => void;
}

export const TargetNodeItem = (props: TargetNodeItemProps) => {
  const {
    index,
    sourceNodeId,
    id,
    name,
    i,
    data,
    handleUpdateNodeData,
    handleRemoverItem,
  } = props;
  const [value, setValue] = useState(name);
  const {
    connectNode,
    removeEdge,
    updateNodeData,
    updateNodeParams,
    data: nodes,
    edges,
    setEdges,
  } = useBoard();

  const handleRemove = () => {
    const findItem = edges.find(
      (item: any) => item.sourceHandle === `source_${sourceNodeId}`
    );
    if (findItem) {
      setEdges((edge: any) =>
        edge.filter(
          (item: any) =>
            item?.id !== findItem?.id && item?.target !== findItem?.target
        )
      );
    }
    removeEdge(`source_${sourceNodeId}`);
    handleRemoverItem();
  };
  useEffect(() => {
    const item = data?.targetNode.find((item) => item.flowId === sourceNodeId);
    const itemIndex = data?.targetNode.findIndex(
      (item) => item.flowId === sourceNodeId
    );
    if (
      item?.nodeId === "00000000-0000-0000-0000-000000000000" ||
      !item?.nodeId
    )
      return;
    updateNodeData<{ title: string | null; index: number }>({
      targetId: String(item?.nodeId),
      value: {
        title: item.name,
        name: item.name,
        sequence: String((itemIndex || 0) + 1),
        index: itemIndex,
      } as any,
    });
    setValue(item.name);
    connectNode({
      source: String(id),
      sourceHandle: `source_${item.flowId}`,
      target: item.nodeId,
      targetHandle: `target_${item.nodeId}`,
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
            Opção {i}
          </label>
          <div className="flex gap-4">
            <input
              id={`input_${index}`}
              className="bg-slate-50 focus:bg-slate-100 text-sm p-2 py-3 placeholder:text-sm placeholder:px-2 w-full disabled:bg-slate-200"
              placeholder="opção do menu principal..."
              name="text"
              value={value}
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => {
                setValue(event.target.value);
                if (!data) return;
                const getValueById = data.targetNode.find(
                  (item) => item.flowId === sourceNodeId
                );
                handleUpdateNodeData(String(getValueById?.nodeId), value);
                if (getValueById?.nodeId) {
                  updateNodeParams({
                    targetId: String(getValueById?.nodeId),
                    value: {
                      parent: id,
                    },
                  });
                  updateNodeData<{ title: string | null; index: number }>({
                    targetId: String(getValueById?.nodeId),
                    value: {
                      title: event.target.value,
                      name: event.target.value,
                      parent: id,
                      sequence: String(index + 1),
                      index,
                    } as any,
                  });
                }
              }}
            />
            <button
              onClick={(event) => {
                event?.stopPropagation();
                if (!data) return;
                handleRemove();
              }}
              className="flex flex-1 p-3 items-center bg-slate-50 rounded-md hover:bg-slate-200 cursor-pointer"
            >
              <FiTrash />
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <HandleVectorItem
          type="source"
          position={Position.Right}
          id={`source_${sourceNodeId}`}
          onConnect={(params) => {
            const getValueById = nodes.find(
              (item) => item.id === params.target
            );

            if (
              getValueById?.type !== "KPIDoc" &&
              getValueById?.type !== "KPIText"
            ) {
              alert("Você só pode conectar a Documentos ou Mensagens");
              return;
            }
            updateNodeParams({
              targetId: String(params.target),
              value: {
                parent: id,
              },
            });
            handleUpdateNodeData(String(params.target), value);
            updateNodeData({
              targetId: String(params.target),
              value: {
                sequence: String(index + 1),
                parent: id,
                title: value,
                name: value,
              },
            });

            connectNode(params);
          }}
        />
      </div>
    </>
  );
};
