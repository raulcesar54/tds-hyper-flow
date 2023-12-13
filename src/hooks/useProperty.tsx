import { createContext, useContext, useState } from "react";

interface PropertyProps {
  cardInfo: CardInfo | null;
  handleSelectInfo: (cardInformation: CardInfo | null) => void;
}
interface CardInfo {
  icon: string;
  label: string;
  description: string;
  nodeId: string;
  customInfo: any;
  type: "Message" | "Document" | "Action" | "Menu" | "ActionMenu";
}

const UsePropertyContext = createContext({} as PropertyProps);

export const UsePropertyProvider = (props: { children: JSX.Element }) => {
  const { children } = props;
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const handleSelectInfo = (cardInformation: CardInfo | null) =>
    setCardInfo(cardInformation);
  return (
    <UsePropertyContext.Provider
      value={{ cardInfo: cardInfo, handleSelectInfo }}
    >
      {children}
    </UsePropertyContext.Provider>
  );
};
export const useProperty = () => useContext(UsePropertyContext);
