import { api } from "../services";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface FlowResponse {
  chatBot: ChatBot;
  nodes: Node[];
  edges: Edge[];
}
interface Edge {
  id: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
  source: string;
}
interface Node {
  id: string;
  type: string;
  position: Position;
  data: Data;
  width: number;
  height: number;
  selected: boolean;
  positionAbsolute: Position;
  dragging: boolean;
}
interface Data {
  sequence: string;
  name: string;
  statusMessage: string;
  document: string;
  documentOutput?: any;
  message: string;
  image?: string;
  targetNode?: TargetNode[];
  filterNode?: FilterNode[];
  enabled: boolean;
}
interface FilterNode {
  Id: string;
  Name: string;
  Type: string;
}
interface TargetNode {
  NodeId: string;
  Sequence: string;
  Name: string;
}
interface Position {
  x: number;
  y: number;
}
interface ChatBot {
  id: string;
  name: string;
  enabled: boolean;
  type: string;
  description: string;
}
interface BoardType {
  loading: boolean;
  data: FlowResponse | null;
  messages: MessageResponse[] | null;
}

interface MessageResponse {
  Id: string;
  Name: string;
  Type: string;
  Description: string;
}
const FlowContext = createContext({} as BoardType);

export const FlowProvider = (props: { children: JSX.Element }) => {
  const { children } = props;
  const id = window.location.search;

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<FlowResponse | null>(null);
  const [messages, setMessages] = useState<MessageResponse[] | null>(null);

  //Destacar se é pdf imagem doc ou xls
  const handleGetInformation = useCallback(async () => {
    try {
      setLoading(true);
      const [data, messagesReport] = await Promise.all([
        await api.get<FlowResponse>("ChatbotFlow/flow", {
          params: {
            id: id.replace("?id=", ""),
          },
        }),
        await api.get<MessageResponse[]>("ChatbotFlow/message", {
          params: {
            id: id.replace("?id=", ""),
          },
        }),
      ]);

      setData(data.data);
      setMessages(messagesReport.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetInformation();
  }, []);

  return (
    <FlowContext.Provider value={{ loading, data, messages }}>
      {children}
    </FlowContext.Provider>
  );
};
export const useFlow = () => useContext(FlowContext);
