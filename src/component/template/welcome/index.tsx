import { Position, useReactFlow } from "reactflow";
import { HandleStyled } from "../../uiKit/handleStyle";
import { WelcomeProps } from "./types";
import { useBoard } from "../../../hooks/useBoard";
import { useCallback, useEffect } from "react";
import { useProperty } from "../../../hooks/useProperty";

export const Welcome = ({ data, id, ...props }: WelcomeProps) => {
  const reactflow = useReactFlow();
  const { connectNode } = useBoard();
  const { handleSelectInfo } = useProperty();

  // useEffect(() => {
  //   if (!data?.targetNode?.[0].nodeId) return;
  //   connectNode({
  //     source: String(id),
  //     sourceHandle: `source_${data?.targetNode?.[0].nodeId}`,
  //     target: String(data?.targetNode?.[0].nodeId),
  //     targetHandle: `target_${data?.targetNode?.[0].nodeId}`,
  //   });
  // }, [data]);

  // useEffect(() => {
  //   // if (!props.selected) handleSelectInfo(null);
  // }, [props.selected]);

  const handleClick = useCallback(() => {
    handleSelectInfo({
      label: "Bem vindo",
      description: "Tela Inicial",
      icon: "FiBox",
      nodeId: id,
      type: "Welcome",
      customInfo: data,
    });
  }, [props.selected]);
  return (
    <div
      onClick={handleClick}
      className={`p-4 border-2 ${
        data.selected || props.selected ? "border-blue-400" : "border-[#eee] "
      }  flex flex-col rounded-lg bg-white`}
    >
      <label htmlFor="text" className="text-lg font-bold max-w-[150px]  ">
        {data.name}
      </label>
      {data.image && (
        <img
          src={data.image}
          width={250}
          className="rounded-lg mt-1"
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
        className="max-w-[250px]  text-sm "
      />
      <HandleStyled
        type="source"
        position={Position.Right}
        id={`source_${id}`}
        onConnect={(params) => {
          if (params.target === null) return;
          if (reactflow !== null) {
            const instanceReactFlow = reactflow;
            const isValidTarget = instanceReactFlow
              .getNode(params.target)
              ?.type?.includes("MenuPrincipal");
            if (!isValidTarget) {
              alert("Atenção, o Documento pode ligar apenas ao Menu");
              return;
            }
          }
          alert("nó não valido");
        }}
      />
    </div>
  );
};
