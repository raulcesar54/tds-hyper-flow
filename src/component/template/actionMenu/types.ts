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
}
export interface TargetNode {
  handleId?: string;
  name?: string;
  nodeId: string;
  sequence?: string;
}
export interface MainMenuProps {
  data: RootObject;
  selected: boolean;
  id: string;
}
