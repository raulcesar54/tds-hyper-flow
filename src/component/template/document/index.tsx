import { Position } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { useFlow } from "../../../hooks/useFlow";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Props } from "./types";
import { CardHeader } from "../../uiKit/cardHeader";
import { useProperty } from "../../../hooks/useProperty";
import { useBoard } from "../../../hooks/useBoard";
import { groupBy } from "lodash";
import { Filters } from "../../uiKit/filters";
import { v4 } from "uuid";

export const Document = ({ data, id, ...props }: Props) => {
  const { handleSelectInfo } = useProperty();
  const { documents } = useFlow();
  const { connectNode, removeEdge, updateNodeData } = useBoard();
  const [value, setValue] = useState(data.document);
  const prepareDocuments = useMemo(() => {
    const doc = groupBy(documents, "Group");
    const info = Object.values(doc);
    const data = info.map((item) => ({
      id: v4(),
      label: item[0].Group,
      options: item,
    }));
    return data;
  }, [documents]);

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
        documentOutput: data.documentOutput || "PDF",
        statusMessage:
          data.statusMessage || "Selecione uma das opcões para analisar",
      },
    });
  }, [props.selected]);
  const handleClick = useCallback(() => {
    handleSelectInfo({
      label: data.title || "Documento",
      description: "Vincular Documento",
      icon: "FiFileText",
      nodeId: id,
      type: "Document",
      customInfo: data,
    });
  }, [handleSelectInfo, data, id]);
  return (
    <div
      onClick={handleClick}
      className={`border-2 p-4 ${
        props.selected ? "border-blue-400" : "border-[#eee] "
      }  flex w-[320px] flex-col rounded-lg bg-white
      `}
    >
      <div
        className={` flex flex-col
        ${!data.enabled && "opacity-30"}
        `}
      >
        <CardHeader
          iconName="FiFileText"
          subtitle="Vincular Documento"
          title={data.title || "Documento"}
        />
        {data.image && (
          <img
            src={data.image}
            className="max-h-50 mt-1 w-full rounded-lg object-cover"
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
                  document: event.target.value,
                },
              });
            }}
            className="w-full bg-slate-50 p-2 py-3 text-sm placeholder:px-2 placeholder:text-sm focus:bg-slate-100 disabled:bg-slate-200"
          >
            <option value="" disabled hidden>
              Escolha um relatório
            </option>

            {prepareDocuments.map((item) => {
              return (
                <optgroup key={item.id} label={item.label}>
                  {item.options.map((doc) => {
                    return (
                      <option value={doc.Id} key={doc.Name}>
                        {doc.Name}
                      </option>
                    );
                  })}
                </optgroup>
              );
            })}
          </select>
        </div>

        <Filters
          filterNode={data.filterNode}
          filterId={value}
          nodeId={id}
          type="KPIDoc"
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
