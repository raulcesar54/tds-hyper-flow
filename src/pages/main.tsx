import { Header } from "../component/template/header";
import { Action } from "../component/template/action";
import { BackMenu } from "../component/template/backMenu";
import { Document } from "../component/template/document";
import { MainMenu } from "../component/template/mainMenu";
import { Text } from "../component/template/text";
import { Toolbox } from "../component/template/toolbox";
import { Welcome } from "../component/template/welcome";
import { useBoard } from "../hooks/useBoard";
import { useCallback, useRef, useState } from "react";
import ReactFlow, { Background, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuid } from "uuid";

const nodeTypes = {
  Welcome,
  StartMenu: MainMenu,
  Action: BackMenu,
  KPIDoc: Document,
  ActionMenu: Action,
  KPIText: Text,
};

export default function Main() {
  const reactFlowWrapper: any = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const { data, onNodesChange, removeEdges, onEdgesChange, setNodes, edges } =
    useBoard();
  const panOnDrag = [1, 2];

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: uuid(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  function onRemoveEdge(data: any) {
    data.map((item: any) => {
      removeEdges(item.source, item.target);
    });
  }
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Header />
      <Toolbox />
      <ReactFlowProvider>
        <ReactFlow
          nodes={data}
          edges={edges}
          preventScrolling
          onInit={setReactFlowInstance}
          ref={reactFlowWrapper}
          panOnDrag={panOnDrag}
          onEdgesDelete={onRemoveEdge}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <Background color="#f2f2f2" style={{ backgroundColor: "#f2f2f2" }} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
