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
import { HoverCard } from "../../uiKit/hoverCard";
import { useFlow } from "../../../hooks/useFlow";
import { RiRobot2Line } from "react-icons/ri";
export const MainMenu = ({ data, id, ...props }: MainMenuProps) => {
  const { updateNodeData, updateNodeParams, } = useBoard();
  const { data: flowData } = useFlow()
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
        value: {
          sequence: 0,
          parent: null,
          title: "",
          name: "",
          statusMessage: "",
        },
      });
    }
  };

  let indexAction = 0;
  let indexText = 0;

  return (
    <div
      onClick={handleClick}
      className={`border-2 p-4 ${props.selected ? "border-blue-400" : ""
        }  flex w-[300px] flex-col rounded-md bg-white shadow-sm`}
    >
      {flowData?.chatBot.engine === 'Cognitive' ? <CardHeader iconName="VscRobot" title={data.title || "Menu Cognitivo"}
        subtitle="Menu" /> : <CardHeader
        iconName="FiHome"
        title={data.title || "Menu"}
        subtitle="Menu"
      />}
      {data.image && (
        <img
          src={data.image}
          className="max-h-50  w-full rounded-lg object-cover"
          alt="image_step"
        />
      )}
      <hr className="mt-4" />
      <div className="mt-2 flex flex-col">
        <h1 className="font-semibold">Opções</h1>
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
          <small className="text-slate-400">Sem opções vinculadas</small>
        )}

        <HoverCard
          position="bottom"
          title=""
          subtitle="*É permitido no máximo 5 opções."
        >
          <div className=" flex flex-row gap-2">
            <Button
              label="Adicionar opção"
              disabled={
                targetNodes.filter((item) => item.type === "text").length >= 5
              }
              onClick={(event) => {
                event?.stopPropagation();
                handleAddNodeData("text");
              }}
            />
          </div>
        </HoverCard>
      </div>
      {flowData?.chatBot.engine === 'Flow' &&
        <>
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
                      handleRemoverItemAnotherTargetId={(paramId) => {
                        const idx = targetNodes.findIndex(
                          (i) => i.nodeId === paramId
                        );
                        targetNodes[idx].nodeId =
                          "00000000-0000-0000-0000-000000000000";
                      }}
                      handleRemoveItem={() =>
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
              <small className="text-slate-400">Sem ações vinculadas</small>
            )}
            <HoverCard
              position="bottom"
              title=""
              subtitle="*É permitido no máximo 5 ações."
            >
              <div className=" flex flex-row gap-2">
                <Button
                  label="Adicionar ação"
                  disabled={
                    targetNodes.filter((item) => item.type === "action").length >= 5
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddNodeData("action");
                  }}
                />
              </div>
            </HoverCard>
          </div>
        </>
      }

      <HandleStyled
        type="target"
        className="commonHandler"
        position={Position.Left}
        id={`target_${id}`}
      />
    </div>
  );
};
