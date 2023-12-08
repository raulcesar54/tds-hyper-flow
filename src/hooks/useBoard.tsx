import { createContext, useCallback, useContext, useEffect } from "react";
import {
  Connection,
  Edge,
  MarkerType,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { v4 } from "uuid";
import { useFlow } from "./useFlow";
interface nodeType {
  nodeType: string;
  label: string;
}
interface updateNodeData<T> {
  targetId: string;
  value: T;
}
interface contextBoardProps {
  data: any;
  addNode: (nodeProps: nodeType) => void;
  removeEdges: (nodeProps: any, teest: any) => void;
  updateNode: (nodeProps: any, teest: any, value: any) => void;
  connectNode: (data: Edge | Connection) => void;
  removeEdge: (sourceHandle: string) => void;
  setNodes: (data: any) => void;
  updateNodeData: <T>(params: updateNodeData<T>) => void;
  onEdgesChange: any;
  edges: any;
  onNodesChange: any;
}
const ContextBoard = createContext({ data: [] } as contextBoardProps);
export const ProviderBoard = ({ children }: { children: JSX.Element }) => {
  const { data, loading } = useFlow();
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  useEffect(() => {
    if (!data?.nodes) return;
    if (!data?.edges) return;
    setNodes(data?.nodes);
    setEdges(data?.edges);
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
  function updateNode(targetId: string, id: string, value: string) {
    // setNodes((nodes) =>
    //   nodes.map((item) => {
    //     if (item.id === targetId) {
    //       item.data = {
    //         ...item.data,
    //         selected: true,
    //         values: { ...item.data.values, [id]: value },
    //       };
    //     }
    //     return item;
    //   })
    // );
  }
  function addNode({ nodeType, label }: nodeType) {
    setNodes((e: any) => [
      ...e,
      {
        id: v4(),
        type: nodeType,
        position: { x: 140, y: 100 },
        data: { label, selected: false, values: [] },
      },
    ]);
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
        data: nodes,
        addNode,
        onNodesChange,
        removeEdge,
        connectNode,
        updateNode,
        removeEdges,
        setNodes,
        edges,
        updateNodeData,
        onEdgesChange,
      }}
    >
      {children}
    </ContextBoard.Provider>
  );
};

export const useBoard = () => useContext(ContextBoard);
