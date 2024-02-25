import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  MarkerType,
  getBezierPath,
} from "reactflow";
import { useBoard } from "../../../hooks/useBoard";

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const { setEdges, updateNodeData, data } = useBoard();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges: any) => {
      const selectEdge = edges.find((item: any) => item.id === id);
      const selectNode =
        selectEdge?.source &&
        (data.find((item) => item.id === selectEdge.source) as any);
      if (selectEdge?.target) {
        updateNodeData({
          targetId: String(selectEdge.target),
          value: { sequence: null, parent: "", name: "", title: "" },
        });
      }
      if (
        selectEdge?.source &&
        (selectNode.type === "StartMenu" || selectNode.type === "ActionMenu")
      ) {
        const treatTargetNode =
          selectNode &&
          selectNode?.data.targetNode.map((item: any) => {
            if (
              item.nodeId === selectEdge.sourceHandle.replace("source_", "")
            ) {
              return {
                ...item,
                flowId: "00000000-0000-0000-0000-000000000000",
              };
            }
            return item;
          });
        updateNodeData({
          targetId: selectNode.id,
          value: {
            ...selectNode.data,
            targetNode: treatTargetNode,
          },
        });
      }
      return edges.filter((edge: any) => edge.id !== id);
    });
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={MarkerType.ArrowClosed} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan "
        >
          <button className=" edgebutton " onClick={onEdgeClick}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
