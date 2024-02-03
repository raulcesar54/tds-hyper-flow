import { createContext, useCallback, useContext, useEffect } from "react";
import {
  Connection,
  Edge,
  NodeChange,
  addEdge,
  useEdgesState,
  useNodesState,
  useViewport,
} from "reactflow";
import { v4 } from "uuid";
import { Node, useFlow } from "./useFlow";
interface nodeType {
  position: {
    x: number;
    y: number;
  };
  type: string;
}
interface updateNodeData<T> {
  targetId: string;
  value: T;
}
interface contextBoardProps {
  data: Node[] | [];
  addNode: (nodeProps: nodeType) => void;
  removeEdges: (nodeProps: any, teest: any) => void;
  connectNode: (data: Edge | Connection) => void;
  removeEdge: (sourceHandle: string) => void;
  setNodes: (data: any) => void;
  updateNodeData: <T>(params: updateNodeData<T>) => void;
  onEdgesChange: any;
  handleNodeChange: (node: any) => void;
  edges: any;
  onNodesChange: any;
}
const ContextBoard = createContext({ data: [] } as contextBoardProps);

export const ProviderBoard = ({ children }: { children: JSX.Element }) => {
  const chatBotId = window.location.search;
  const { data, loading } = useFlow();
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  useEffect(() => {
    if (!data?.nodes) return;
    if (!data?.edges) return;
    setNodes(data?.nodes);

    // setEdges(data?.edges);
  }, [loading]);

  const removeEdge = useCallback(
    (sourceHandleName: string) => {
      return setEdges((edegs) =>
        edegs.filter((item) => item.sourceHandle !== sourceHandleName)
      );
    },
    [setEdges]
  );
  const connectNode = useCallback(
    (params: Edge | Connection) => {
      return setEdges((actualNode) =>
        addEdge(
          {
            ...params,
            // animated: true,
          },
          actualNode
        )
      );
    },
    [setEdges]
  );
  function handleNodeChange(node: any) {
    console.log(node);
  }
  function updateNodeData<T>({ targetId, value }: updateNodeData<T>) {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === targetId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...value,
            },
          };
        }
        return node;
      })
    );
  }
  function addNode({ position, type }: nodeType) {
    const uuidGenerated = v4();
    const chatbot = chatBotId.replace("?id=", "");
    const newNode = {
      id: uuidGenerated,
      type,
      chatbot,
      parent: "",
      data: {
        sequence: "",
        name: "",
        title: "",
        statusMessage: "",
        document: "",
        documentOutput: "",
        message: "",
        image: "",
        targetNode: [],
        filterNode: [],
        enabled: true,
      },
      width: 286,
      height: 279,
      selected: false,
      dragging: false,
      position,
    };
    if (type === "KPIDoc" || type === "KPIText") {
      const actionMenu = v4();
      const backwardMenu = v4();
      const mainMenu = v4();

      const preparedSubItems = [
        {
          ...newNode,
          data: {
            ...newNode.data,
            targetNode: [{ nodeId: actionMenu, name: "", sequence: "1" }],
          },
        },
        {
          id: backwardMenu,
          type: "Action",
          chatbot,
          parent: "",
          data: {
            sequence: 0,
            name: "Menu Anterior",
            title: "Menu Anterior",
            statusMessage: "",
            document: "",
            documentOutput: "",
            message: "",
            image: "",
            targetNode: [],
            filterNode: [],
            enabled: true,
          },
          width: 320,
          height: 100,
          selected: false,
          dragging: false,
          position: {
            x: position.x + 700,
            y: position.y,
          },
        },
        {
          id: mainMenu,
          type: "Action",
          chatbot,
          parent: "",
          data: {
            sequence: 1,
            name: "Menu Principal",
            title: "Menu Principal",
            statusMessage: "",
            document: "",
            documentOutput: "",
            message: "",
            image: "",
            targetNode: [],
            filterNode: [],
            enabled: true,
          },
          width: 320,
          height: 100,
          selected: false,
          dragging: false,
          position: {
            x: position.x + 700,
            y: position.y + 150,
          },
        },
        {
          id: actionMenu,
          type: "ActionMenu",
          chatbot,
          parent: "",
          data: {
            sequence: "",
            name: "",
            title: "",
            statusMessage: "Selecione uma das opções para analisar",
            document: "",
            documentOutput: "",
            message: "",
            image: "",
            targetNode: [
              {
                nodeId: backwardMenu,
                name: "Menu Anterior",
                sequence: "1",
              },
              {
                nodeId: mainMenu,
                name: "Menu Principal",
                sequence: "2",
              },
            ],
            filterNode: [],
            enabled: true,
          },
          width: 300,
          height: 374,
          selected: false,
          dragging: false,
          position: {
            x: position.x + 360,
            y: position.y - 100,
          },
        },
      ];

      setNodes((lastValue: any) => [...lastValue, ...preparedSubItems]);
      return;
    }

    setNodes((lastValue: any) => [...lastValue, newNode]);
  }
  function removeEdges(sourceId: string, targetId: string) {
    setNodes((nodes) =>
      nodes.map((item: any) => {
        if (item.id === sourceId) {
          item.data = {
            selected: false,
          };
          delete item.data.targetId;
        }
        if (item.id === targetId) {
          // item.data.values[sourceId] = "";
        }
        return item;
      })
    );
  }

  return (
    <ContextBoard.Provider
      value={{
        data: nodes as Node[],
        addNode,
        onNodesChange,
        removeEdge,
        connectNode,
        removeEdges,
        setNodes,
        edges,
        updateNodeData,
        onEdgesChange,
        handleNodeChange,
      }}
    >
      {children}
    </ContextBoard.Provider>
  );
};

export const useBoard = () => useContext(ContextBoard);
