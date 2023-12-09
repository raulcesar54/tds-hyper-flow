import { useFlow } from "../../../hooks/useFlow";
import { Loading } from "../../../component/uiKit/loading";
import logo from "../../../assets/logo.png";
import { FaWhatsapp } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import { api } from "../../../services";
import { useState } from "react";

export const Header = () => {
  const [saving, setSaving] = useState(false);
  const { data, loading } = useFlow();
  const handleSaveData = async () => {
    // console.log(data?.nodes)
    setSaving(true);
    if (!data?.nodes) return;
    const preparation = data.nodes.map((data) => ({
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
        document: data.data.document,
        documentOutput: data.data.documentOutput || "",
        message: data.data.message,
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

    const save = await api.put("ChatbotFlow/Save", preparation);
    setSaving(false);
  };
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
        disabled={saving}
        className="p-3 px-8 py-4 bg-slate-50 h-full cursor-pointer hover:bg-blue-400 transition-all  hover:text-white"
        onClick={handleSaveData}
      >
        {saving ? <Loading /> : "salvar"}
      </button>
    </div>
  );
};
