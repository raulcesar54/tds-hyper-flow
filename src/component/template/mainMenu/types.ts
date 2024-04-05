interface RootObject {
  sequence: string;
  name: string;
  statusMessage: string;
  document: string;
  documentOutput?: any;
  message: string;
  image: string;
  targetNode: TargetNode[];
  filterNode: any[];
  enabled: boolean;
  selected: boolean;
  title: string;
}
export interface TargetNode {
  handleId?: string;
  name?: string;
  nodeId: string;
  flowId?: string;
  type: "action" | "text" | null;
  sequence?: string;
}
export interface MainMenuProps {
  data: RootObject;
  selected: boolean;
  id: string;
}
