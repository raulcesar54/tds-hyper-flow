import { useEffect, useState } from "react";
import { useProperty } from "../../../hooks/useProperty";
import { CardHeader } from "../../uiKit/cardHeader";
import { useBoard } from "../../../hooks/useBoard";
import { useFlow } from "../../../hooks/useFlow";

export const PropertyContainer = () => {
  const { cardInfo } = useProperty();
  const { outputDocs } = useFlow();
  const [imageValue, setImageValue] = useState("");
  const [statusMessae, setStatusMessage] = useState(() => {
    return cardInfo?.customInfo?.statusMessage;
  });
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const { updateNodeData } = useBoard();

  useEffect(() => {
    setStatusMessage(cardInfo?.customInfo?.statusMessage);
  }, [cardInfo?.customInfo?.statusMessage]);
  useEffect(() => {
    setSelectedFormat(cardInfo?.customInfo?.outputDocument);
  }, [cardInfo?.customInfo?.outputDocument]);
  useEffect(() => {
    setImageValue(cardInfo?.customInfo?.image);
  }, [cardInfo?.customInfo?.image]);

  if (!cardInfo) {
    return <></>;
  }

  return (
    <div className="absolute flex flex-col z-50 bg-white right-4 top-4 gap-4 items-center shadow-md rounded-md max-w-[320px] min-w-[320px] p-4 ring-2 ring-blue-400">
      <CardHeader
        iconName={cardInfo.icon}
        subtitle={cardInfo.description}
        title={cardInfo.label}
      />
      <div className="flex flex-col gap-0 w-full mt-2">
        {(cardInfo.type === "Message" || cardInfo.type === "Action") && (
          <div className="flex flex-col gap-1 w-full">
            <label className="mt-3 font-bold text-sm  w-full text-left">
              mensagem de status
            </label>
            <input
              className="bg-slate-50 focus:bg-slate-100 text-sm p-2 w-full py-3 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200"
              placeholder="Mensagem de status..."
              name="text"
              value={statusMessae}
              onChange={(event) => {
                setStatusMessage(event.target.value);
                updateNodeData({
                  targetId: cardInfo.nodeId,
                  value: {
                    statusMessage: event.target.value,
                  },
                });
              }}
            />
          </div>
        )}
        <img
          src={
            imageValue ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAANlBMVEXp7vG6vsHs8fS2ur3c4eTU2dzm6u3P1Ne4vL/u8/a4vL67v8G0ubzDx8rY3eDEyMvh5unKz9Izr04MAAADb0lEQVR4nO2c63KrIBRGFY1CY4x5/5c93nKiICZGGOvuWj86adowYc0HWxgxSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOC3oiJwdJ/2oJr6Epy6Sc4qxeTXKtNPfoYfP9NXDj//f0xfv97oX2X6cU4l5pGl6TWNgdbF0b37AnPXUWwMVEd37wvqLKKQNnzm6A5uxcRMSEuWH93DrTRV/8XbaVBnQdFj9u4nm13Vpc+ILk3wy5FCn3LYqHL43hG+9ti0PqmRCNGO2HRMVJlGNqIx8mpakpEQyzRBRlSSd+u0vT0RY8Tkt6rq1mnXcl9fpBjp130DOt2Vk8HI9exG1G16VV81u5qWkBF7Ibxn6SrDSF5ZC7UdqxIRRoyzcZR9P25EGCnsiLRLwK87JMGIqt3NkjdL15VdQxFGSkfIm+v7Irt7jUmovm0f3B3o1Q7pVHuViMjIZeOo6aYdffP8hwQjSePuQq+U33Ee9ikRYcQ4tSar/Z996vMoEWHkue31wTSiJpV6WYkII4myjFS5rz/FdIAtKpFhxJpJqod3Xp3POEtKJFTf7vdGv2KSeYU4F7cLSoRkJFHJvRqcZDr3CnFrkntdIsVIW3CK8tam/ZEbb1+ckrSUEjlG2jeNUsbvw10PjimZf0KSkfVPLAyZxYHzV4woT0LcgSOk1rylWLu7YpaSv5KR9ftvpin5G0ZWhoyjRKIRU1tvF9XbO5JeSgQaMXU1nyrfJmSmRJ6RVkia3iZ/+CAhaVdcRiXijPRCpoPAex3iSYm06qvq+Q7ZZ0NmVDIxIiYjTyGdkv5vG4SINGIm9/32Kfl4yAg1YuppIlolWxIi0Yip7R2ybTdGizNiC9mMFlZr1O6zA8Iysjsh0oy0ZXf36SNRRsxlU1WRb8RcQpw/EmSkuw4JcGJPkJE6wJBJJVXfxXuMdho5d0YwkmDEBSM2GLGJboRaYxs5d0YSjNgZeVRBjoNXYowkTR6GsWkBRgI3jRG7aYzYTWPEbvqkRqI97sCc1MiwaaYfSRGa/JzPH3k+oyYNciEyZ2j4dE8Ac49vhmXHYdCjyOM+68p3QusXY8owm6uL6LPNqz0RlWTXozv3Haq5R5hXW66XMyakxwRb400p/IcNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FD+AZS0NBe99dfKAAAAAElFTkSuQmCC"
          }
          className="rounded-lg mt-1 w-full  max-h-50 object-cover  mt-4"
          alt="Insira uma imagem corretamente"
        />
        <div className="flex flex-col gap-1 w-full">
          <label className="mt-3 font-bold text-sm mb-1">imagem</label>
          <input
            className="bg-slate-50 focus:bg-slate-100 text-sm p-2 w-full py-3 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200"
            placeholder="Imagem do menu (Link)"
            name="text"
            value={imageValue}
            onChange={(event) => {
              setImageValue(event.target.value);
              updateNodeData({
                targetId: cardInfo.nodeId,
                value: {
                  image: event.target.value,
                },
              });
            }}
          />
        </div>
        {cardInfo.type === "Document" && (
          <div className="flex flex-col gap-1 w-full">
            <label className="mt-3 font-bold text-sm mb-1">
              Formato de saída
            </label>
            <div className="flex flex-row gap-3 flex-wrap">
              {outputDocs?.map((item) => {
                return (
                  <div
                    className={`p-2 ring-1 ring-slate-200 bg-slate-50 rounded-md max-w-fit ${
                      selectedFormat === item.Name && "bg-blue-500"
                    }`}
                    key={item.Name}
                    onClick={() => {
                      updateNodeData({
                        targetId: cardInfo.nodeId,
                        value: {
                          outputDocument: item.Name,
                        },
                      });
                      setSelectedFormat(item.Name);
                    }}
                  >
                    <img src={item.Image} alt={item.Name} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
