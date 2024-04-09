import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  MarkerType,
  getBezierPath,
} from "reactflow";

export function EdgeNoLine({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={MarkerType.ArrowClosed} />
      <EdgeLabelRenderer>
        <div
          style={
            {
              // position: "absolute",
              // transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              // fontSize: 12,
              // pointerEvents: "all",
            }
          }
          className="nodrag nopan "
        ></div>
      </EdgeLabelRenderer>
    </>
  );
}
