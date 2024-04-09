import { Position } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { useBoard } from "../../../hooks/useBoard";
import { CardHeader } from "../../uiKit/cardHeader";
import { useFlow } from "../../../hooks/useFlow";
import { MainMenuProps } from "./types";
import { useProperty } from "../../../hooks/useProperty";
import { useCallback, useEffect, useMemo, useState } from "react";
import { groupBy } from "lodash";
import { Filters } from "../../uiKit/filters";

export const Text = ({ data, id, ...props }: MainMenuProps) => {
  const { handleSelectInfo } = useProperty();
  const { messages } = useFlow();
  const [value, setValue] = useState(data.message);
  const { connectNode, removeEdge, updateNodeData } = useBoard();

  useEffect(() => {
    if (data?.targetNode?.length) {
      data.targetNode.map((targetNode) => {
        return connectNode({
          source: String(id),
          sourceHandle: `source_${id}`,
          target: String(targetNode.nodeId),
          targetHandle: `target_${targetNode.nodeId}`,
        });
      });
    }
  }, []);

  useEffect(() => {
    updateNodeData({
      targetId: id,
      value: {
        statusMessage: "Selecione uma das opcões para analisar",
      },
    });
  }, [props.selected]);

  const handleClick = useCallback(() => {
    handleSelectInfo({
      label: data.title || "Mensagem",
      description: "Mensagem",
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
      className={`border-2 p-4 ${
        props.selected ? "border-blue-400" : "border-[#eee] "
      }  flex w-[320px] flex-col rounded-lg bg-white`}
    >
      <div
        className={` flex flex-col
        ${!data.enabled && "opacity-30"}
        `}
      >
        <CardHeader
          iconName="FiMessageSquare"
          title={data.title || "Mensagem"}
          subtitle="Mensagem"
        />
        <div className=" flex flex-col">
          {data.image && (
            <img
              src={data.image}
              className="max-h-50 mt-1 w-full rounded-lg object-cover"
              alt="image_step"
            />
          )}
          {/* <h1
            dangerouslySetInnerHTML={{
              __html: `${data?.statusMessage?.replace(
                "{{username}}",
                "<strong class='text-blue-400'>Nome do usúario</strong>"
              )}`,
            }}
            className=" mt-3 max-w-[250px] text-sm text-slate-800 "
          /> */}
          <label className="mb-1 mt-3 text-sm font-bold" htmlFor="text">
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
              className="w-full bg-slate-50 p-2 py-3 text-sm placeholder:px-2 placeholder:text-sm focus:bg-slate-100 disabled:bg-slate-200"
            >
              <option
                value="00000000-0000-0000-0000-000000000000"
                disabled
                hidden
              >
                Escolha um relatório
              </option>
              <option value="" disabled hidden>
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

        <Filters
          filterNode={data.filterNode}
          filterId={value}
          nodeId={id}
          type="KPIText"
        />
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
