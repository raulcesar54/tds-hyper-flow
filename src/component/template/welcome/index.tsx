import { Position, addEdge, useReactFlow } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { WelcomeProps } from "./types";
import { useFlow } from "@/hooks/useFlow";

export const Welcome = ({ data, id, ...props }: WelcomeProps) => {
  const reactflow = useReactFlow();

  return (
    <div
      className={`p-4 border-2 ${
        data.selected || props.selected ? "border-blue-400" : "border-[#eee] "
      }  flex flex-col rounded-lg bg-white`}
    >
      <label htmlFor="text" className="text-lg font-bold max-w-[150px]  ">
        {data.name}
      </label>
      <h1
        dangerouslySetInnerHTML={{
          __html: `${data.statusMessage.replace(
            "{{username}}",
            "<strong>{{ Nome do usúario }}</strong>"
          )}`,
        }}
        className="max-w-[200px] text-sm mt-2"
      />
      <HandleStyled
        id={`source_${id}`}
        type="source"
        position={Position.Right}
        onConnect={(params) => {
          if (params.target === null) return;
          if (reactflow !== null) {
            const instanceReactFlow = reactflow;
            const isValidTarget = instanceReactFlow
              .getNode(params.target)
              ?.type?.includes("MenuPrincipal");
            if (!isValidTarget) {
              alert("Atenção, o documento pode ligar apenas ao Menu");
              return;
            }
          }
          alert("nó não valido");
        }}
      />
    </div>
  );
};
