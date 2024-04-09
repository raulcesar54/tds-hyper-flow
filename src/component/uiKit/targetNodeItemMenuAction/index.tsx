import { Position } from "reactflow";
import { HandleStyled, HandleVectorItem } from "../handleStyle";
import { useBoard } from "../../../hooks/useBoard";
import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { useFlow } from "../../../hooks/useFlow";
import { TargetNodeItemMenuActionProps } from "./types";

export const TargetNodeItemMenuAction = (
  props: TargetNodeItemMenuActionProps
) => {
  const {
    index,
    i,
    sourceNodeId,
    id,
    name,
    data,
    handleUpdateNodeData,
    handleRemoveItem,
  } = props;
  const [value, setValue] = useState(name);
  const { connectNode, removeEdge, updateNodeData, data: nodes } = useBoard();
  const { data: flowData } = useFlow();
  const [newName, setNewName] = useState(name);

  const handleRemove = () => {
    removeEdge(`source_${sourceNodeId}`);
    removeEdge(`target_${sourceNodeId}`);
    handleRemoveItem();
  };
  useEffect(() => {
    const item = data?.targetNode.find(
      (item: any) => item.flowId === sourceNodeId
    );
    const itemIndex = data?.targetNode.findIndex(
      (item: any) => item.flowId === sourceNodeId
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
        parent: item?.nodeId,
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
            Ação {i && i}
          </label>
          <div className="flex gap-4">
            <select
              value={newName}
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => {
                setValue(event.target.value);
                setNewName(event.target.value);

                if (!data) return;
                const getValueById = data.targetNode.find(
                  (item) => item.flowId === sourceNodeId
                );
                // const getDataNode = nodes.find(
                //   (i) => i.id === getValueById?.nodeId
                // );
                handleUpdateNodeData(
                  String(getValueById?.nodeId),
                  event.target.value
                );
                if (getValueById?.nodeId) {
                  updateNodeData<{ title: string | null; index: number }>({
                    targetId: String(getValueById?.nodeId),
                    value: {
                      title: event.target.value,
                      // ...(getDataNode?.data.statusMessage === "" && {
                      statusMessage: event.target.value,
                      // }),
                      name: event.target.value,
                      sequence: String(index + 1),
                      parent: id,
                      index,
                    } as any,
                  });
                }
              }}
              className="bg-slate-50 focus:bg-slate-100 text-sm p-2 py-3 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200 w-full"
            >
              <option value="" disabled hidden>
                Escolha uma ação
              </option>
              {flowData?.chatBot.Actions.map((item) => {
                return (
                  <option value={String(item?.Value)} key={item.Id}>
                    {item.Value}
                  </option>
                );
              })}
            </select>
            <button
              onClick={(event) => {
                event.stopPropagation();
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
            if (getValueById?.type !== "Action") {
              alert("Você só pode conectar a ações");
              return;
            }
            // const getDataNode = nodes.find((i) => i.id === params.target);
            handleUpdateNodeData(String(params.target), value);
            updateNodeData({
              targetId: String(params.target),
              value: {
                sequence: String(index + 1),
                parent: id,
                title: value,
                name: value,
                // ...(getDataNode?.data.statusMessage === "" && {
                statusMessage: value,
                // }),
              },
            });
            connectNode(params);
          }}
        />
      </div>
    </>
  );
};
