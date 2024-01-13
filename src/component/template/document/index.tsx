import { Position } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { useFlow } from "../../../hooks/useFlow";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Props } from "./types";
import { CardHeader } from "../../uiKit/cardHeader";
import { useProperty } from "../../../hooks/useProperty";
import { useBoard } from "../../../hooks/useBoard";
import { groupBy } from "lodash";

export const Document = ({ data, id, ...props }: Props) => {
  const { handleSelectInfo } = useProperty();
  const { documents } = useFlow();
  const { connectNode, removeEdge, updateNodeData } = useBoard();
  const [value, setValue] = useState(data.document);
  const prepareDocuments = useMemo(() => {
    const doc = groupBy(documents, "Group");
    const info = Object.values(doc);
    const data = info.map((item) => ({
      label: item[0].Group,
      options: item,
    }));
    return data;
  }, [documents]);

  useEffect(() => {
    if (!props.selected) handleSelectInfo(null);
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
  }, [props.selected]);

  return (
    <div
      onClick={handleClick}
      className={`p-4 pt-2 border-2 ${
        props.selected ? "border-blue-400" : "border-[#eee] "
      }  w-[320px] flex flex-col rounded-lg bg-white
      `}
    >
      <div
        className={`mt-4 flex flex-col
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
                  document: event.target.value,
                },
              });
            }}
            className="bg-slate-50 focus:bg-slate-100 text-sm p-2 py-3 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200 w-full"
          >
            {prepareDocuments.map((item) => {
              return (
                <optgroup key={item.label} label={item.label}>
                  {item.options.map((doc) => {
                    return (
                      <option value={doc.Id} key={doc.Id}>
                        {doc.Name}
                      </option>
                    );
                  })}
                </optgroup>
              );
            })}
          </select>
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
