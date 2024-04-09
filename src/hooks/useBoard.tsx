import { createContext, useContext, useEffect } from "react";
import {
  Connection,
  Edge,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { v4 } from "uuid";
import { Node, useFlow } from "./useFlow";
import { toast } from "react-toastify";
interface nodeType {
  position: {
    x: number;
    y: number;
  };
  type: string;
}
interface iupdateNodeData<T> {
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
  setEdges: (data: any) => void;
  updateNodeData: <T>(params: iupdateNodeData<T>) => void;
  updateNodeParams: <T>(params: iupdateNodeData<T>) => void;
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
  const [nodes, setNodes, onChangeNode] = useNodesState([]);

  useEffect(() => {
    if (!data?.nodes) return;
    setNodes(data?.nodes);
    setEdges(data?.edges);
  }, [loading]);
  useEffect(() => {
    // const getWelcomeNode = nodes.find((item) => item.type === "Welcome");
    // if (!getWelcomeNode) return;
    // if (!edges.length) return;
    // setEdges((edges) =>
    //   edges
    //     .filter((item) => item.id !== "00000000-0000-0000-0000-000000000000")
    //     .map((item) => {
    //       if (item.source === getWelcomeNode.id) {
    //         return { ...item, type: "base" };
    //       }
    //       return item;
    //     })
    // );
  }, [data]);

  function removeEdge(sourceHandleName: string) {
    return setEdges((edges) =>
      edges.filter((item) => item.sourceHandle !== sourceHandleName)
    );
  }
  function connectNode(params: Edge | Connection) {
    return setEdges((actualNode) =>
      addEdge(
        {
          ...params,
          type: "default",
        },
        actualNode
      )
    );
  }
  function handleNodeChange(node: any) {}
  function updateNodeParams<T>({ targetId, value }: iupdateNodeData<T>) {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === targetId) {
          return {
            ...node,
            ...value,
          };
        }
        return node;
      })
    );
  }
  function updateNodeData<T>({ targetId, value }: iupdateNodeData<T>) {
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
      const handleActionMenuId = v4();
      const handleActionBackwardMenuId = v4();

      const preparedSubItems = [
        {
          ...newNode,
          data: {
            ...newNode.data,
            targetNode: [
              {
                flowId: v4(),
                nodeId: actionMenu,
                name: newNode.data.name,
                sequence: "1",
              },
            ],
          },
        },
        {
          id: backwardMenu,
          type: "Action",
          chatbot,
          parent: actionMenu,
          data: {
            sequence: 0,
            name: "Menu Anterior",
            title: "Menu Anterior",
            statusMessage: "",
            document: "",
            parent: actionMenu,
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
            x: position.x + 750,
            y: position.y + 200,
          },
        },
        {
          id: mainMenu,
          type: "Action",
          chatbot,
          parent: actionMenu,
          data: {
            sequence: 1,
            name: "Menu Principal",
            title: "Menu Principal",
            statusMessage: "",
            document: "",
            parent: actionMenu,
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
            x: position.x + 750,
            y: position.y + 300,
          },
        },
        {
          id: actionMenu,
          type: "MenuItem",
          chatbot,
          parent: newNode.id,
          data: {
            sequence: "",
            name: "Menu de Ação",
            title: "",
            statusMessage: "Selecione uma das opções para analisar",
            document: "",
            documentOutput: "",
            message: "",
            image: "",
            targetNode: [
              {
                flowId: handleActionMenuId,
                nodeId: backwardMenu,
                name: "Menu Anterior",
                sequence: "1",
                type: "action",
              },
              {
                flowId: handleActionBackwardMenuId,
                nodeId: mainMenu,
                name: "Menu Principal",
                sequence: "2",
                type: "action",
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
            x: position.x + 400,
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
  function onNodesChange(data: any) {
    if (data[0].type === "remove") {
      const localeItem = nodes.find((item) => item.id === data[0].id);
      if (!localeItem) return;
      if (localeItem.type === "Welcome") {
        toast("Não é permitido remover o inicio do bot.", {
          type: "error",
          position: "top-center",
        });
        return;
      }
      if (localeItem.type === "StartMenu" && localeItem.data.sequence === "2") {
        toast("Não é permitido remover o menu de inicio do bot.", {
          type: "error",
          position: "top-center",
        });
        return;
      }
    }
    onChangeNode(data);
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
        setEdges,
        setNodes,
        edges,
        updateNodeData,
        updateNodeParams,
        onEdgesChange,
        handleNodeChange,
      }}
    >
      {children}
    </ContextBoard.Provider>
  );
};

export const useBoard = () => useContext(ContextBoard);
