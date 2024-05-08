import { createContext, useCallback, useContext, useState } from "react";
import { api } from "../services";

export interface FlowResponse {
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
export interface Node {
  id: string;
  type: string;
  position: Position;
  data: Data;
  width: number;
  parent: string;
  chatbot: string;
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
  parent?: string;

  targetNode?: TargetNode[];
  filterNode?: FilterNode[];
  enabled: boolean;
}
interface FilterNode {
  Id: string;
  Name: string;
  Type: string;
  id?: string;
  name?: string;
  type?: string;
  alias?: string;
  input?: string;
  argument?: string;
}
interface TargetNode {
  nodeId: string;
  flowId?: string;
  sequence: string;
  name: string;
  type: "action" | "text";
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
  engine: 'Cognitive' | 'Flow'
  description: string;
  Actions: ActionsType[];
  position: Position;
  positionAbsolute: Position;
  zoom: number;
}

interface ActionsType {
  Id: string;
  Type: number;
  Key: string;
  Value: string;
}
interface BoardType {
  loading: boolean;
  data: FlowResponse | null;
  messages: MessageOrDocResponse[] | null;
  documents: MessageOrDocResponse[] | null;
  outputDocs: OutputDocResponse[] | null;
  handleGetInformation: () => void;
}

interface MessageOrDocResponse {
  Id: string;
  Name: string;
  Type: string;
  Group: string;
  Description: string;
}
interface OutputDocResponse {
  Type: string;
  Name: string;
  Image: string;
}
const FlowContext = createContext({} as BoardType);

export const FlowProvider = (props: { children: JSX.Element }) => {
  const { children } = props;
  const id = window.location.search;

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<FlowResponse | null>(null);
  const [messages, setMessages] = useState<MessageOrDocResponse[] | null>(null);
  const [outputDocs, setOutputDocs] = useState<OutputDocResponse[] | null>(
    null
  );
  const [documents, setDocuments] = useState<MessageOrDocResponse[] | null>(
    null
  );

  //Destacar se é pdf imagem doc ou xls
  const handleGetInformation = useCallback(async () => {
    const idTreated = id.replace("?id=", "");
    try {
      setLoading(true);
      const [data, messagesReport, documentReport, outputDocs] =
        await Promise.all([
          await api.get<FlowResponse>("ChatbotFlow/flow", {
            params: {
              id: idTreated,
            },
          }),
          await api.get<MessageOrDocResponse[]>("ChatbotFlow/message", {
            params: {
              id: idTreated,
            },
          }),
          await api.get<MessageOrDocResponse[]>("ChatbotFlow/docs", {
            params: {
              id: idTreated,
            },
          }),
          await api.get<OutputDocResponse[]>("ChatbotFlow/OutputDoc", {
            params: {
              id: idTreated,
            },
          }),
        ]);
      const getWelcomeNode = data.data.nodes.find(
        (item) => item?.type === "Welcome"
      );
      const edges = data.data.edges.map((item) => {
        if (item?.source === getWelcomeNode?.id) {
          return { ...item, type: "base" };
        }
        return item;
      });

      setData({ ...data.data, edges });
      setMessages(messagesReport.data);
      setDocuments(documentReport.data);
      setOutputDocs(outputDocs.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <FlowContext.Provider
      value={{
        loading,
        data,
        messages,
        documents,
        outputDocs,
        handleGetInformation,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
export const useFlow = () => useContext(FlowContext);
