import { useEffect, useState } from "react";
import { Position } from "reactflow";
import { v4 } from "uuid";
import { Button } from "../../../component/uiKit/button";
import { CardHeader } from "../../../component/uiKit/cardHeader";
import { TargetNodeItem } from "../../../component/uiKit/targetNodeItem";
import { useBoard } from "../../../hooks/useBoard";
import { useProperty } from "../../../hooks/useProperty";
import { HandleStyled } from "../../uiKit/handleStyle";
import { MainMenuProps, TargetNode } from "./types";
import { TargetNodeItemMenuAction } from "../../uiKit/targetNodeItemMenuAction";

export const MainMenu = ({ data, id, ...props }: MainMenuProps) => {
  const { updateNodeData, updateNodeParams, data: nodes, edges } = useBoard();
  const [targetNodes, setTargetNode] = useState<TargetNode[]>(
    data.targetNode || []
  );
  const { handleSelectInfo } = useProperty();
  useEffect(() => {
    if (!data.targetNode) return;
    setTargetNode(data.targetNode);
  }, [data]);
  useEffect(() => {
    if (!props.selected) handleSelectInfo(null);
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
  const handleAddNodeData = (type: "action" | "text") => {
    updateNodeData({
      targetId: id,
      value: {
        ...data,
        targetNode: [
          ...(data.targetNode || []),
          {
            flowId: v4(),
            nodeId: "00000000-0000-0000-0000-000000000000",
            name: "",
            sequence: String(data?.targetNode?.length + 1 || 0),
            type,
          },
        ],
      },
    });
  };
  const handleRemoveItem = (flowId: string, nodeId?: string) => {
    const removedItems = targetNodes.filter((data) => data.flowId !== flowId);
    updateNodeData({
      targetId: id,
      value: {
        ...data,
        targetNode: removedItems,
      },
    });
    if (nodeId) {
      updateNodeParams({
        targetId: nodeId,
        value: {
          parent: null,
        },
      });
      updateNodeData({
        targetId: nodeId,
        value: { sequence: 0, parent: null, title: "", name: "" },
      });
    }
  };
  let indexAction = 0;
  let indexText = 0;
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
      <hr className="mt-4" />
      <div className="mt-2 flex flex-col">
        <h1 className="font-semibold">Mensagem ou Documento</h1>
        {targetNodes.filter((item) => item.type === "text").length ? (
          targetNodes.map((item, index) => {
            item.type === "text" && indexText++;
            return item.type === "text"
              ? item.flowId && (
                  <TargetNodeItem
                    sourceNodeId={item.flowId}
                    name={item.name || ""}
                    index={index}
                    id={id}
                    i={indexText}
                    data={data as any}
                    key={item.flowId}
                    handleRemoverItemAnotherTargetId={(paramId) => {
                      const idx = targetNodes.findIndex(
                        (i) => i.nodeId === paramId
                      );
                      targetNodes[idx].nodeId =
                        "00000000-0000-0000-0000-000000000000";
                    }}
                    handleRemoverItem={() =>
                      item.flowId && handleRemoveItem(item.flowId, item.nodeId)
                    }
                    handleUpdateNodeData={(target, value) => {
                      targetNodes[index].name = value;
                      targetNodes[index].sequence = String(index + 1);
                      targetNodes[index].nodeId = target;
                    }}
                  />
                )
              : null;
          })
        ) : (
          <small className="text-slate-400">Sem textos vinculados</small>
        )}
        <div className=" flex flex-row gap-2">
          <Button
            label="Adicionar texto"
            onClick={(event) => {
              event?.stopPropagation();
              handleAddNodeData("text");
            }}
          />
        </div>
      </div>
      <hr className="mt-4" />
      <div className="mt-2 flex flex-col">
        <h1 className="font-semibold">Ações</h1>
        {targetNodes.filter((item) => item.type === "action").length ? (
          targetNodes.map((item, index) => {
            item.type === "action" && indexAction++;
            return item.type === "action"
              ? item.flowId && (
                  <TargetNodeItemMenuAction
                    sourceNodeId={item.flowId}
                    name={item.name || ""}
                    index={index}
                    id={id}
                    i={indexAction}
                    data={data as any}
                    key={item.flowId}
                    handleRemoveItem={() =>
                      item.flowId && handleRemoveItem(item.flowId, item.nodeId)
                    }
                    handleRemoverItemAnotherTargetId={(paramId) => {
                      const idx = targetNodes.findIndex(
                        (i) => i.nodeId === paramId
                      );
                      targetNodes[idx].nodeId =
                        "00000000-0000-0000-0000-000000000000";
                    }}
                    handleUpdateNodeData={(target, value) => {
                      targetNodes[index].name = value;
                      targetNodes[index].sequence = String(index + 1);
                      targetNodes[index].nodeId = target;
                    }}
                  />
                )
              : null;
          })
        ) : (
          <small className="text-slate-400">Sem ações vinculados</small>
        )}
        <div className=" flex flex-row gap-2">
          <Button
            label="Adicionar ações"
            onClick={(event) => {
              event.stopPropagation();
              handleAddNodeData("action");
            }}
          />
        </div>
      </div>

      <HandleStyled
        type="target"
        position={Position.Left}
        id={`target_${id}`}
      />
    </div>
  );
};
