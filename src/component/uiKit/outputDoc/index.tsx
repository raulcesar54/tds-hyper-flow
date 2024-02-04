import { useProperty } from "../../../hooks/useProperty";
import { useBoard } from "../../../hooks/useBoard";
import { useFlow } from "../../../hooks/useFlow";
import { useState } from "react";

export const OutputDoc = () => {
  const { outputDocs } = useFlow();
  const { cardInfo } = useProperty();
  const { updateNodeData } = useBoard();
  const [selectedOutput, setSelectedOutput] = useState(
    cardInfo?.customInfo.documentOutput
  );
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="mt-3 font-bold text-sm mb-1">Formato de saída</label>
      <ul className="flex flex-row gap-4 flex-wrap">
        {outputDocs?.map((item) => {
          return (
            <li
              className={`ring-1 ring-slate-50 bg-slate-50 p-3 py-4 rounded-md max-w-fit cursor-pointer ${
                selectedOutput === item.Name && "!bg-blue-500"
              }`}
              key={item.Name}
              onClick={() => {
                if (!cardInfo?.nodeId) return;
                updateNodeData({
                  targetId: cardInfo?.nodeId,
                  value: {
                    documentOutput: item.Name,
                  },
                });
                setSelectedOutput(item.Name);
              }}
            >
              <img src={item.Image} alt={item.Name} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
