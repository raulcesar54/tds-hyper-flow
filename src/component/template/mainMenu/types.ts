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
  nodeId: string | null;
  sequence: string;
  name: string;
}
export interface MainMenuProps {
  data: RootObject;
  selected: boolean;
  id: string;
}
