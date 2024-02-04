import { useEffect, useState } from "react";
import { useProperty } from "../../../hooks/useProperty";
import { api } from "../../../services";
import { Loading } from "../loading";
import { useBoard } from "../../../hooks/useBoard";
import { FiTrash } from "react-icons/fi";
import { Button } from "../button";
import { v4 } from "uuid";

interface FilterResponse {
  id: string;
  name: string;
  provider: string;
  source: string;
  tags: string[];
  type: number;
}

interface Props {
  nodeId: string;
  filterId: string;
  type: "KPIDoc" | "KPIText";
  filterNode: any;
}
export const Filters = (props: Props) => {
  const { updateNodeData } = useBoard();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<FilterResponse[]>([]);
  const [selectList, setSelectList] = useState([{ value: "", id: v4() }]);

  useEffect(() => {
    if (!props.filterId) return;
    handleGetFilters();
  }, [props.filterId]);

  useEffect(() => {
    if (!props.filterNode) return;
    setSelectList(
      props.filterNode.map((item: any) => {
        return { value: item.name, id: item.name };
      })
    );
  }, []);

  const handleGetFilters = async () => {
    setLoading(true);
    try {
      const data = await api.get(
        `/ChatbotFlow/Filters?Id=${props.filterId}&Type=${props.type}`
      );
      setOptions(data.data);
    } catch (error) {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveItem = (id: string) => {
    const removedItems = selectList.filter((item) => item.id !== id);
    const dt = handleConvertToNode(removedItems);
    updateNodeData({
      targetId: props.nodeId,
      value: {
        filterNode: dt,
      },
    });
    setSelectList(removedItems);
  };
  const handleConvertToNode = (
    preparedItems: {
      value: string;
      id: string;
    }[]
  ) => {
    return preparedItems.map((item: any) => {
      const prepareToNode = options.find(
        (optionItem) => optionItem.name === item.value
      );
      if (!prepareToNode) return [];
      return {
        id: prepareToNode.id,
        name: prepareToNode.name,
        type: prepareToNode?.type,
      };
    });
  };

  if (loading) {
    return (
      <div className="flex flex-row gap-2 items-center pt-4">
        <Loading /> <small>Carregando Filtrors...</small>
      </div>
    );
  }
  if (!loading && !options.length) {
    return (
      <div className="flex flex-col">
        <label className="mt-3 font-bold text-sm mb-1">Filtros</label>
        <h1 className=" mt-3 max-w-[250px] text-sm text-slate-300 ">
          Não existe filtros relacionados
        </h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <label className="mt-3 font-bold text-sm mb-1">Filtros</label>
      <div className="flex flex-col gap-2">
        {selectList.map((data, index) => (
          <div className="flex gap-4" key={data.id}>
            <select
              value={selectList[index].value}
              onChange={(event) => {
                const prepareItems = selectList.map((item) => {
                  if (item.id === data.id) {
                    return {
                      ...data,
                      value: event.target.value,
                    };
                  }
                  return item;
                });
                const dt = handleConvertToNode(prepareItems);
                updateNodeData({
                  targetId: props.nodeId,
                  value: {
                    filterNode: dt,
                  },
                });
                setSelectList(prepareItems);
              }}
              placeholder="Filtro 1"
              className="bg-slate-50 focus:bg-slate-100 text-sm p-2 py-3 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200 w-full"
            >
              <option selected disabled>
                Selecione um filtro
              </option>
              {options.map((item) => (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleRemoveItem(data.id)}
              className="flex flex-1 p-3 items-center bg-slate-50 rounded-md hover:bg-slate-200 cursor-pointer"
            >
              <FiTrash />
            </button>
          </div>
        ))}
      </div>
      {!selectList.length && (
        <div className="flex flex-col">
          <h1 className=" mt-3 max-w-[250px] text-sm text-slate-300 ">
            Filtros não adicionados
          </h1>
        </div>
      )}
      {selectList.length < 3 && (
        <div className=" flex flex-row gap-2">
          <Button
            label="Adicionar Filtro"
            onClick={() => {
              setSelectList((selects) => [...selects, { value: "", id: v4() }]);
            }}
          />
        </div>
      )}
    </div>
  );
};
