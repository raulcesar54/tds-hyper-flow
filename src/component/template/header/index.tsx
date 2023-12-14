import { FlowResponse, useFlow } from "../../../hooks/useFlow";
import { Loading } from "../../../component/uiKit/loading";
import logo from "../../../assets/logo.png";
import { FaWhatsapp } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import { api } from "../../../services";
import { useMemo, useState } from "react";
import { useBoard } from "../../../hooks/useBoard";
import { useViewport } from "reactflow";
import { isEqual } from "lodash";

export const Header = () => {
  const [saving, setSaving] = useState(false);
  const { data, loading } = useFlow();
  const { data: info, setNodes } = useBoard();
  const { zoom, x, y } = useViewport();

  const handleSaveData = async () => {
    setSaving(true);
    try {
      if (!data?.nodes) return;

      const prepareNodes = info.map((data: any) => ({
        id: data.id,
        type: data.type,
        chatbot: data.chatbot,
        parent: "00000000-0000-0000-0000-000000000000",
        position: {
          ...data.position,
        },
        data: {
          sequence: data.data.sequence,
          name: data.data.name,
          statusMessage: data.data.statusMessage,
          document:
            data.data.document || "00000000-0000-0000-0000-000000000000",
          documentOutput: data.data.documentOutput || "",
          message: data.data.message || "00000000-0000-0000-0000-000000000000",
          image: data.data.image || "",
          targetNode: data.data.targetNode || [],
          filterNode: data.data.filterNode || [],
          enabled: true,
        },
        width: data.width,
        height: data.height,
        selected: false,
        positionAbsolute: {
          ...data.position,
        },
        dragging: true,
      }));
      const prepareData = {
        chatBot: {
          ...data.chatBot,
          actions: [
            {
              id: "string",
              type: 0,
              key: "string",
              value: "string",
            },
          ],
          zoom,
          position: {
            x,
            y,
          },
          positionAbsolute: {
            x: 0,
            y: 0,
          },
        },
        nodes: prepareNodes,
        edges: [],
      };
      await api.put("ChatbotFlow/Save", prepareData);
      const { data: nodes } = await api.get<FlowResponse>("ChatbotFlow/flow", {
        params: {
          id: data.chatBot.id,
        },
      });
      setNodes(nodes.nodes);
    } catch (err) {
      alert("Tivemos um erro ao salvar o fluxo, entre em contato com suporte.");
    } finally {
      setSaving(false);
    }
  };
  const isDisabled = useMemo(() => {
    return isEqual(data?.nodes, info);
  }, [data, info]);
  return (
    <div className="absolute flex flex-row z-50 bg-white left-4 top-4 gap-4 items-center shadow-md rounded-md pl-6 overflow-hidden">
      <img className="my-4" src={logo} alt="logo hyper reports" width={80} />
      {loading && <Loading />}
      {!loading && (
        <>
          <h1 className="font-bold py-4 text-xs">Fluxo</h1>
          <h2 className="font-bold py-4 text-xs text-blue-500 -ml-1">
            {data?.chatBot.name}
          </h2>
        </>
      )}
      <div className="flex flex-row gap-4 h-full border-l-2 pl-4">
        <FaWhatsapp
          className={`text-blue-100  ${
            (data?.chatBot.type === "WhatsApp" ||
              data?.chatBot.type === "Both") &&
            "!text-blue-500 "
          }`}
        />
        <LiaTelegramPlane
          className={`text-blue-100   ${
            (data?.chatBot.type === "Telegram" ||
              data?.chatBot.type === "Both") &&
            "!text-blue-500 "
          }`}
        />
      </div>
      <button
        disabled={isDisabled || saving || loading}
        className="p-3 px-8 py-4 h-full cursor-pointer bg-blue-400 transition-all  text-white disabled:bg-slate-50 disabled:text-slate-300"
        onClick={handleSaveData}
      >
        {saving ? <Loading /> : "Salvar"}
      </button>
    </div>
  );
};
