import { useMemo, useState } from "react";
import { useProperty } from "../../../hooks/useProperty";
import { CardHeader } from "../../uiKit/cardHeader";
import { useBoard } from "../../../hooks/useBoard";
import { Node } from "../../../hooks/useFlow";
import { OutputDoc } from "../../uiKit/outputDoc";
import { ListFilters } from "../listFilters";
import { Tab } from "../tab";

export const PropertyContainer = () => {
  const { cardInfo, handleSelectInfo } = useProperty();
  const { data, updateNodeData } = useBoard();
  const [information, setInformation] = useState<Node | undefined>();
  const [selectedTab, setSelectedTab] = useState("PROPERTY");

  useMemo(() => {
    const findNode = data?.find((item) => item.id === cardInfo?.nodeId);
    setInformation(findNode);
  }, [cardInfo, data]);

  if (!cardInfo) {
    return <></>;
  }

  return (
    <div className="absolute flex flex-col z-50 bg-white right-4 top-4 gap-4 items-center shadow-md rounded-md max-w-[320px] min-w-[320px] p-4 ring-2 ring-blue-400">
      <CardHeader
        iconName={cardInfo.icon}
        subtitle={cardInfo.description}
        title={cardInfo.label}
        showCloseIcon
        handleCloseIcon={() => {
          setSelectedTab("PROPERTY");
          handleSelectInfo(null);
        }}
      />
      {(cardInfo.type === "Document" || cardInfo.type === "Message") && (
        <Tab
          handleSelectTab={setSelectedTab}
          selectedTab={selectedTab}
          tabs={[
            {
              label: "Propriedades",
              name: "PROPERTY",
            },
            {
              label: "Filtros",
              name: "FILTERS",
            },
          ]}
        />
      )}
      <div className="flex flex-col gap-0 w-full">
        {selectedTab === "PROPERTY" && (
          <div className="flex flex-col gap-1 w-full">
            <label className="mt-3 font-bold text-sm  w-full text-left ">
              Mensagem de status
            </label>
            <textarea
              rows={4}
              cols={16}
              className="bg-slate-50 focus:bg-slate-100 text-sm p-2 w-full py-3 placeholder:text-sm placeholder:px-2 rounded-md disabled:bg-slate-200"
              placeholder="Mensagem de status..."
              name="text"
              value={information?.data.statusMessage}
              onChange={(event) => {
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
        {selectedTab === "PROPERTY" && (
          <img
            src={
              information?.data.image ||
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAANlBMVEXp7vG6vsHs8fS2ur3c4eTU2dzm6u3P1Ne4vL/u8/a4vL67v8G0ubzDx8rY3eDEyMvh5unKz9Izr04MAAADb0lEQVR4nO2c63KrIBRGFY1CY4x5/5c93nKiICZGGOvuWj86adowYc0HWxgxSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOC3oiJwdJ/2oJr6Epy6Sc4qxeTXKtNPfoYfP9NXDj//f0xfv97oX2X6cU4l5pGl6TWNgdbF0b37AnPXUWwMVEd37wvqLKKQNnzm6A5uxcRMSEuWH93DrTRV/8XbaVBnQdFj9u4nm13Vpc+ILk3wy5FCn3LYqHL43hG+9ti0PqmRCNGO2HRMVJlGNqIx8mpakpEQyzRBRlSSd+u0vT0RY8Tkt6rq1mnXcl9fpBjp130DOt2Vk8HI9exG1G16VV81u5qWkBF7Ibxn6SrDSF5ZC7UdqxIRRoyzcZR9P25EGCnsiLRLwK87JMGIqt3NkjdL15VdQxFGSkfIm+v7Irt7jUmovm0f3B3o1Q7pVHuViMjIZeOo6aYdffP8hwQjSePuQq+U33Ee9ikRYcQ4tSar/Z996vMoEWHkue31wTSiJpV6WYkII4myjFS5rz/FdIAtKpFhxJpJqod3Xp3POEtKJFTf7vdGv2KSeYU4F7cLSoRkJFHJvRqcZDr3CnFrkntdIsVIW3CK8tam/ZEbb1+ckrSUEjlG2jeNUsbvw10PjimZf0KSkfVPLAyZxYHzV4woT0LcgSOk1rylWLu7YpaSv5KR9ftvpin5G0ZWhoyjRKIRU1tvF9XbO5JeSgQaMXU1nyrfJmSmRJ6RVkia3iZ/+CAhaVdcRiXijPRCpoPAex3iSYm06qvq+Q7ZZ0NmVDIxIiYjTyGdkv5vG4SINGIm9/32Kfl4yAg1YuppIlolWxIi0Yip7R2ybTdGizNiC9mMFlZr1O6zA8Iysjsh0oy0ZXf36SNRRsxlU1WRb8RcQpw/EmSkuw4JcGJPkJE6wJBJJVXfxXuMdho5d0YwkmDEBSM2GLGJboRaYxs5d0YSjNgZeVRBjoNXYowkTR6GsWkBRgI3jRG7aYzYTWPEbvqkRqI97sCc1MiwaaYfSRGa/JzPH3k+oyYNciEyZ2j4dE8Ac49vhmXHYdCjyOM+68p3QusXY8owm6uL6LPNqz0RlWTXozv3Haq5R5hXW66XMyakxwRb400p/IcNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FD+AZS0NBe99dfKAAAAAElFTkSuQmCC"
            }
            className="rounded-lg mt-1 w-full  max-h-50 object-cover  mt-4"
            alt="Insira uma Imagem corretamente"
          />
        )}
        {selectedTab === "PROPERTY" && (
          <div className="flex flex-col gap-1 w-full">
            <label className="mt-3 font-bold text-sm mb-1">Imagem</label>
            <input
              className="bg-slate-50 focus:bg-slate-100 text-sm p-2 w-full rounded-md py-3 placeholder:text-sm placeholder:px-2 disabled:bg-slate-200"
              placeholder="Imagem do menu (Link)"
              name="text"
              value={information?.data.image}
              onChange={(event) => {
                updateNodeData({
                  targetId: cardInfo.nodeId,
                  value: {
                    image: event.target.value,
                  },
                });
              }}
            />
          </div>
        )}
        {cardInfo.type === "Document" && selectedTab === "PROPERTY" && (
          <OutputDoc />
        )}

        {cardInfo.type !== "Welcome" && selectedTab === "PROPERTY" && (
          <label className="relative inline-flex items-center cursor-pointer mt-4">
            <h1>{information?.data.enabled}</h1>
            <input
              type="checkbox"
              checked={information?.data.enabled}
              onChange={(event) => {
                updateNodeData({
                  targetId: cardInfo.nodeId,
                  value: {
                    enabled: event.target.checked,
                  },
                });
              }}
              className="sr-only peer"
            />
            <div
              className="w-11 h-6 rounded-full peer bg-slate-100 peer-checked:after:translate-x-full
           rtl:peer-checked:after:-translate-x-full 
           peer-checked:after:border-white after:content-[''] 
           after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
            peer-checked:bg-blue-400"
            ></div>
            <span className="ms-3 text-sm font-medium text-gray-400 dark:text-gray-500">
              Publicar
            </span>
          </label>
        )}
        {(cardInfo.type === "Document" || cardInfo.type === "Message") &&
          selectedTab === "FILTERS" && (
            <ListFilters nodeId={cardInfo?.nodeId} />
          )}
      </div>
    </div>
  );
};
