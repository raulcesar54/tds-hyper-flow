import { Header } from "../component/template/header";
import { Action } from "../component/template/action";
import { Document } from "../component/template/document";
import { MainMenu } from "../component/template/mainMenu";
import { ActionMenu } from "../component/template/actionMenu";
import { Text } from "../component/template/text";
import { Toolbox } from "../component/template/toolbox";
import { Welcome } from "../component/template/welcome";
import { useBoard } from "../hooks/useBoard";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ZoomControl } from "./style";
import { PropertyContainer } from "../component/template/propertyContainer";
import { useFlow } from "../hooks/useFlow";
import ReactFlow, {
  Background,
  ConnectionMode,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { CustomEdge } from "../component/uiKit/customEdge";
import { EdgeNoLine } from "../component/uiKit/baseEdge";

export default function Main() {
  const reactFlowWrapper: any = useRef(null);
  const { data: flowData, handleGetInformation } = useFlow();
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const { data, onNodesChange, edges, addNode } = useBoard();
  const panOnDrag = [1, 2];
  const nodeTypes = useMemo(
    () => ({
      Welcome,
      Action,
      StartMenu: MainMenu,
      MenuItem: MainMenu,
      ActionMenu,
      KPIDoc: Document,
      KPIText: Text,
    }),
    []
  );
  const edgeTypes = useMemo(
    () => ({
      default: CustomEdge,
      base: EdgeNoLine,
    }),
    []
  );

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

  useEffect(() => {
    if (!flowData) handleGetInformation();
  }, []);
  useEffect(() => {
    if (
      flowData &&
      flowData.chatBot.position.x &&
      flowData.chatBot.position.y
    ) {
      reactFlowInstance.setViewport({
        zoom: flowData?.chatBot?.zoom || 0,
        x: flowData?.chatBot?.position?.x || 0,
        y: flowData?.chatBot?.position?.y || 0,
      });
    }
  }, [flowData]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <Header />
        <Toolbox />
        <PropertyContainer />
        <ReactFlow
          nodes={data}
          edges={edges}
          preventScrolling
          onInit={(instance) => {
            setReactFlowInstance(instance);
          }}
          ref={reactFlowWrapper}
          panOnDrag={panOnDrag}
          onNodesChange={onNodesChange}
          connectionMode={ConnectionMode.Loose}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onConnect={(prop) => {
            // updateNodeData({
            //   targetId: String(prop.target),
            //   value: {
            //     parent: prop.sourceHandle || prop.source,
            //   },
            // });
          }}
        >
          <ZoomControl
            position="bottom-right"
            className="flex flex-row rounded-md  bg-white px-3 !shadow-md"
          />
          <Background style={{ backgroundColor: "#f2f2f2" }} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
