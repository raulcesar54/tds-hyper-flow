export interface TargetNodeItemMenuActionProps {
  sourceNodeId?: string;
  id?: string;
  index: number;
  name?: string;
  data?: any;
  handleUpdateNodeData: (targetId: string, value: string) => void;
}
