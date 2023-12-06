import { useFlow } from "../../../hooks/useFlow";
import { Loading } from "../../../component/uiKit/loading";
import logo from "../../../assets/logo.png";
import { FaWhatsapp } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";

export const Header = () => {
  const { data, loading } = useFlow();
  return (
    <div className="absolute flex flex-row z-50 bg-white left-4 top-4 gap-4 items-center shadow-md rounded-md px-6">
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
    </div>
  );
};
