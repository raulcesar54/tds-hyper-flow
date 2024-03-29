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
interface TargetNode {
  nodeId: string;
  sequence: string;
  name: string;
}
export interface WelcomeProps {
  selected: boolean;
  data: RootObject;
  id: string;
}
