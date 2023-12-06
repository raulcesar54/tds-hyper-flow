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
  NodeId: string;
  Sequence: string;
  Name: string;
}
export interface WelcomeProps {
  selected: boolean;
  data: RootObject;
  id: string;
}
