import { useFlow } from "../../../hooks/useFlow";
import { Loading } from "../../../component/uiKit/loading";
import { FaWhatsapp } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import { api } from "../../../services";
import { useMemo, useState } from "react";
import { useBoard } from "../../../hooks/useBoard";
import { useViewport } from "reactflow";
import { isEqual } from "lodash";
import { v4 } from "uuid";

export const Header = () => {
  const [saving, setSaving] = useState(false);
  const { data, loading } = useFlow();
  const { data: info, edges } = useBoard();
  const { zoom, x, y } = useViewport();

  const handleSaveData = async () => {
    setSaving(true);
    try {
      if (!data?.nodes) return;
      const prepareNodes = info.map((information, index) => {
        return {
          id: information.id,
          type: information.type,
          chatbot: information.chatbot,
          parent:
            information.data.parent ||
            information.parent ||
            "00000000-0000-0000-0000-000000000000",
          position: {
            ...information.position,
          },
          data: {
            sequence: String(index + 1),
            name: information.data.name,
            statusMessage: information.data.statusMessage,
            document:
              information.data.document ||
              "00000000-0000-0000-0000-000000000000",
            documentOutput: information.data.documentOutput || "PDF",
            message:
              information.data.message ||
              "00000000-0000-0000-0000-000000000000",
            image: information.data.image || "",
            targetNode: information.data.targetNode || [],
            filterNode: information.data.filterNode || [],
            enabled: information.data.enabled,
          },
          width: information.width,
          height: information.height,
          selected: false,
          positionAbsolute: {
            ...information.position,
          },
          dragging: true,
        };
      });
      const prepareData = {
        chatBot: {
          id: data.chatBot.id,
          name: data.chatBot.name,
          enabled: data.chatBot.enabled,
          type: data.chatBot.type,
          description: data.chatBot.description,
          actions: data.chatBot.Actions,
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
        edges:
          edges.map((item: any) => {
            item.id = v4();

            return item;
          }) || [],
      };
      await api.put("ChatbotFlow/Save", prepareData);
      window.location.reload();
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
    <header className="absolute flex flex-row z-50 bg-white left-4 top-4 gap-4 items-center shadow-md rounded-md pl-6 overflow-hidden">
      <img src="/logo.svg" width={30} />
      {loading && (
        <div className="p-4">
          <Loading />
        </div>
      )}
      {!loading && (
        <>
          <h1 className="font-bold py-4 text-xs">Fluxo</h1>
          <h2 className="font-bold py-4 text-xs text-blue-500 -ml-1">
            {data?.chatBot.name}
          </h2>
          <div className="flex flex-row gap-4 h-full border-l-2 pl-4">
            <FaWhatsapp
              size={18}
              className={`text-blue-100  ${
                (data?.chatBot.type === "WhatsApp" ||
                  data?.chatBot.type === "Both") &&
                "!text-blue-500 "
              }`}
            />
            <LiaTelegramPlane
              size={18}
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
        </>
      )}
    </header>
  );
};
