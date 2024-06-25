interface RootObject {
  sequence: string;
  name: string;
  statusMessage: string;
  dataSet: string;
  title: string;
  message: string;
  document: string;
  image: string;
  documentOutput: string;
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
export interface Props {
  data: RootObject;
  selected: boolean;
  id: string;
}
