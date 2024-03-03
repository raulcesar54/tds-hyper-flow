import { useMemo } from "react";
import { useBoard } from "../../../hooks/useBoard";
import { useProperty } from "../../../hooks/useProperty";

interface Props {
  nodeId: string;
}
export const ListFilters = (props: Props) => {
  const { data, updateNodeData } = useBoard();
  const { cardInfo } = useProperty();

  const filterNodes = useMemo(() => {
    return data?.find((item) => item.id === cardInfo?.nodeId);
  }, [cardInfo, data]);

  const handleUpdatedFilter = (
    id: string,
    value: string | boolean,
    field: string
  ) => {
    const nodesFiltered = filterNodes?.data.filterNode;

    const prepareData = nodesFiltered?.map((node) => {
      if (node.id === id) {
        return { ...node, [field]: value };
      }
      return { ...node };
    });
    updateNodeData({
      targetId: props.nodeId,
      value: { filterNode: prepareData },
    });
  };
  return (
    <div className="flex flex-col">
      {filterNodes?.data.filterNode?.map((item) => {
        return (
          <div key={item.Id} className="flex flex-col gap-2">
            <label className="mt-3 font-bold text-sm mb-1">{item.name}</label>
            <input
              className="bg-slate-50 focus:bg-slate-100 text-sm p-2 py-3 placeholder:text-sm placeholder:px-2 w-full disabled:bg-slate-200"
              placeholder="Apelido"
              name="alias"
              value={item.alias}
              onChange={(event) => {
                if (!item.id) return;
                handleUpdatedFilter(item.id, event.target.value, "alias");
              }}
            />
            <input
              className="bg-slate-50 focus:bg-slate-100 text-sm p-2 py-3 placeholder:text-sm placeholder:px-2 w-full disabled:bg-slate-200"
              placeholder="Valor Fixo"
              name="argument"
              value={item.argument}
              onChange={(event) => {
                if (!item.id) return;
                handleUpdatedFilter(item.id, event.target.value, "argument");
              }}
            />
            <div className="flex items-center mb-4">
              <input
                id={`default-checkbox_${item.name}`}
                type="checkbox"
                checked={Boolean(item.input)}
                onChange={(event) => {
                  if (!item.id) return;
                  handleUpdatedFilter(item.id, event.target.checked, "input");
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={`default-checkbox_${item.name}`}
                className="ms-2 text-sm text-gray-400"
              >
                Digitar Filtro
              </label>
            </div>
          </div>
        );
      })}
      {!filterNodes?.data.filterNode?.length && (
        <div className="flex flex-col">
          <h1 className=" mt-3 max-w-[250px] text-sm text-slate-300 ">
            Filtros não adicionados
          </h1>
        </div>
      )}
    </div>
  );
};
