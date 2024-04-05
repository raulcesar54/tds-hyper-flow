export interface TargetNodeItemMenuActionProps {
  sourceNodeId?: string;
  id?: string;
  index: number;
  name?: string;
  data?: any;
  i?: number;
  handleRemoveItem: () => void;
  handleUpdateNodeData: (targetId: string, value: string) => void;
}
