export interface TargetNodeItemMenuActionProps {
  sourceNodeId?: string;
  id?: string;
  index: number;
  name?: string;
  data?: {
    targetNode: {
      name: string;
      nodeId: string;
      sequence: string;
      flowId?: string;
    }[];
  };
  i?: number;
  handleRemoverItemAnotherTargetId: (targetId: string) => void;
  handleRemoveItem: () => void;
  handleUpdateNodeData: (targetId: string, value?: string) => void;
}
