import { Header } from "../component/template/header";
import { Action } from "../component/template/action";
import { Document } from "../component/template/document";
import { MainMenu } from "../component/template/mainMenu";
import { ActionMenu } from "../component/template/actionMenu";
import { Text } from "../component/template/text";
import { Toolbox } from "../component/template/toolbox";
import { Welcome } from "../component/template/welcome";
import { useBoard } from "../hooks/useBoard";
import { useCallback, useRef, useState } from "react";
import ReactFlow, { Background, ReactFlowProvider } from "reactflow";
import { ZoomControl } from "./style";
import { PropertyContainer } from "../component/template/propertyContainer";
import "reactflow/dist/style.css";

const nodeTypes = {
  Welcome,
  Action,

  StartMenu: MainMenu,

  MenuItem: MainMenu,
  ActionMenu,

  KPIDoc: Document,
  KPIText: Text,
};

export default function Main() {
  const reactFlowWrapper: any = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const { data, onNodesChange, removeEdges, onEdgesChange, edges, addNode } =
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

      addNode({ position, type });
    },
    [reactFlowInstance]
  );
  function onRemoveEdge(data: any) {
    data.map((item: any) => {
      removeEdges(item.source, item.target);
    });
  }
  const onConnect = useCallback((connection: any) => {
    // setEdges((eds) => addEdge(connection, eds))
  }, []);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Header />
      <Toolbox />
      <PropertyContainer />
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
          onConnect={onConnect}
          fitView
        >
          <ZoomControl
            position="bottom-right"
            className="flex flex-row px-3  !shadow-md bg-white rounded-md"
          />
          <Background style={{ backgroundColor: "#f2f2f2" }} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
