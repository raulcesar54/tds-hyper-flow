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
  target,
  source,
  sourceHandleId,
  targetHandleId,
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
    updateNodeData({
      targetId: String(target),
      value: { sequence: null, parent: "", name: "", title: "" },
    });
    const selectItem = data.find((item) => item.id === source);
    const treatTargetNode = selectItem?.data?.targetNode?.map((item) => {
      if (item.nodeId === target) {
        return {
          ...item,
          nodeId: "00000000-0000-0000-0000-000000000000",
        };
      }
      return item;
    });
    if (!selectItem) return;

    updateNodeData({
      targetId: selectItem.id,
      value: {
        ...selectItem.data,
        targetNode: treatTargetNode,
      },
    });

    setEdges((edges: any) => edges.filter((edge: any) => edge.id !== id));
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
