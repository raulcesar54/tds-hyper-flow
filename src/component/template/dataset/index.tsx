import { Position } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { useFlow } from "../../../hooks/useFlow";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Props } from "./types";
import { CardHeader } from "../../uiKit/cardHeader";
import { useProperty } from "../../../hooks/useProperty";
import { useBoard } from "../../../hooks/useBoard";
import { groupBy } from "lodash";
import { v4 } from "uuid";

export const DataSet = ({ data, id, ...props }: Props) => {
  const { handleSelectInfo } = useProperty();
  const { dataset } = useFlow();
  const { connectNode, removeEdge, updateNodeData } = useBoard();
  const [value, setValue] = useState(data.dataSet);
  const getIconName = (name: string) => {
    // const iconText = name.split('\\')
    // const icon = iconText.pop()
    return name
  }
  const prepareDocuments = useMemo(() => {
    const doc = groupBy(dataset, "Group");
    const info = Object.values(doc);
    const data = info.map((item) => {
      const icon = getIconName(item[0].Icon)
      return ({
        id: v4(),
        label: item[0].Group,
        icon,
        options: item,
      })
    });
    return data;
  }, [dataset]);

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
        statusMessage: data.statusMessage || "Aguarde gerando o conjunto de dados",
      },
    });
  }, [props.selected]);
  const handleClick = useCallback(() => {
    handleSelectInfo({
      label: data.title || "Conjunto de Dados",
      description: "Conjunto de Dados",
      icon: "FiDatabase",
      nodeId: id,
      type: "DataSet",
      customInfo: data,
    });
  }, [handleSelectInfo, data, id]);

  const icon = useMemo(() => {
    const findIconName = dataset?.find(item => item.Id === value)
    if (!findIconName) return
    return getIconName(findIconName.Icon)
  }, [value, data, dataset])
  return (
    <div
      onClick={handleClick}
      className={`border-2 p-4 ${props.selected ? "border-blue-400" : "border-[#eee] "
        }  flex w-[320px] flex-col rounded-lg bg-white
      `}
    >
      <div
        className={` flex flex-col
        ${!data.enabled && "opacity-30"}
        `}
      >
        <CardHeader
          iconName="FiDatabase"
          subtitle="Conjunto de Dados"
          title={data.title || "Conjunto de Dados"}
          imgPath={icon}
        />
        {data.image && (
          <img
            src={data.image}
            className="max-h-50 mt-1 w-full rounded-lg object-cover"
            alt="image_step"
          />
        )}
        <label className="mb-1 mt-3 text-sm font-bold" htmlFor="text">
          Selecione um Conjunto de Dados
        </label>
        <div className="flex flex-row gap-3">
          <select
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              updateNodeData({
                targetId: id,
                value: {
                  dataSet: event.target.value,
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
              Escolha um conjunto de dados
            </option>
            <option value="" disabled hidden>
              Escolha um conjunto de dados
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
      </div>

      <HandleStyled
        type="target"
        className="commonHandler"
        position={Position.Left}
        id={`target_${id}`}
      />
    </div>
  );
};
