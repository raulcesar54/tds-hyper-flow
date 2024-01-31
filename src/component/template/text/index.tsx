import { Position } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { useBoard } from "../../../hooks/useBoard";
import { CardHeader } from "../../uiKit/cardHeader";
import { useFlow } from "../../../hooks/useFlow";
import { MainMenuProps } from "./types";
import { useProperty } from "../../../hooks/useProperty";
import { useCallback, useEffect, useMemo, useState } from "react";
import { groupBy } from "lodash";

export const Text = ({ data, id, ...props }: MainMenuProps) => {
  const { handleSelectInfo } = useProperty();
  const { messages } = useFlow();
  const [value, setValue] = useState(data.message);
  const { connectNode, removeEdge, updateNodeData } = useBoard();

  useEffect(() => {
    if (!data.targetNode) return;
    data.targetNode.map((item) => {
      connectNode({
        source: String(id),
        sourceHandle: `source_${item.nodeId}`,
        target: String(item.nodeId),
        targetHandle: `target_${item.nodeId}`,
      });
    });
  }, []);

  useEffect(() => {
    if (data.targetNode.length) {
      data.targetNode.map((targetNode) => {
        return connectNode({
          source: String(id),
          sourceHandle: `source_${id}`,
          target: String(targetNode.nodeId),
          targetHandle: `target_${targetNode.nodeId}`,
        });
      });
    }
  }, [data.targetNode]);
  useEffect(() => {
    updateNodeData({
      targetId: id,
      value: {
        statusMessage: "Selecione uma das opcões para analisar",
      },
    });
    if (!props.selected) handleSelectInfo(null);
  }, [props.selected]);

  const handleClick = useCallback(() => {
    handleSelectInfo({
      label: data.title || "Mensagem",
      description: "Vincular Mensagem",
      icon: "FiType",
      nodeId: id,
      type: "Message",
      customInfo: data,
    });
  }, [props.selected]);

  const prepareMessages = useMemo(() => {
    const doc = groupBy(messages, "Group");
    const info = Object.values(doc);
    const data = info.map((item) => ({
      label: item[0].Group,
      options: item,
    }));
    return data;
  }, [messages]);

  return (
    <div
      onClick={handleClick}
      className={`p-4 border-2 ${
        props.selected ? "border-blue-400" : "border-[#eee] "
      }  w-[320px] flex flex-col rounded-lg bg-white`}
    >
      <div
        className={`mt-4 flex flex-col
        ${!data.enabled && "opacity-30"}
        `}
      >
        <CardHeader
          iconName="FiType"
          title={data.title || "Mensagem"}
          subtitle="Vincular Mensagem"
        />
        <div className="mt-4 flex flex-col">
          {data.image && (
            <img
              src={data.image}
              className="rounded-lg mt-1 w-full max-h-50 object-cover"
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
            className="max-w-[250px] mt-1 text-sm text-slate-800 "
          />
          <label className="mt-3 font-bold text-sm mb-1" htmlFor="text">
            Selecione a Mensagem
          </label>
          <div className="flex flex-row gap-3">
            <select
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                updateNodeData({
                  targetId: id,
                  value: {
                    message: event.target.value,
                  },
                });
              }}
              className="bg-slate-50 focus:bg-slate-100 text-sm p-2 py-3 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200 w-full"
            >
              <option value="" selected disabled hidden>
                Escolha um relatório
              </option>
              {prepareMessages.map((item) => {
                return (
                  <optgroup key={item.label} label={item.label}>
                    {item.options.map((item) => {
                      return (
                        <option value={item.Id} key={item.Id}>
                          {item.Name}
                        </option>
                      );
                    })}
                  </optgroup>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <HandleStyled
        type="target"
        position={Position.Left}
        id={`target_${id}`}
      />
      <HandleStyled
        type="source"
        position={Position.Right}
        id={`source_${id}`}
        onConnect={(params) => {
          removeEdge(`source_${id}`);
          connectNode(params);
        }}
      />
    </div>
  );
};
