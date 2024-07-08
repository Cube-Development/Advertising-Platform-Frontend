import {
  IOrderMessageNewSocket,
  IOrderMessageSendSocket,
} from "@shared/types/chat";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import axios from "axios";
import { Centrifuge, PublicationContext } from "centrifuge";
import Cookies from "js-cookie";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";

interface CentrifugeContextType {
  centrifuge: Centrifuge | null;
  OrderMessageSend: (message: IOrderMessageSendSocket) => Promise<void>;
  OrderMessageNewChat: (
    handleNewMessageChat: (message: IOrderMessageNewSocket) => void,
  ) => void;
  OrderMessageNew: (
    handleNewMessage: (message: IOrderMessageNewSocket) => void,
  ) => void;
}

const CentrifugeContext = createContext<CentrifugeContextType | undefined>(
  undefined,
);

export const CentrifugeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const centrifugeRef = useRef<Centrifuge | null>(null);
  const handleNewMessageRef = useRef<(message: IOrderMessageNewSocket) => void>(
    () => {},
  );
  const handleNewMessageChatRef = useRef<
    (message: IOrderMessageNewSocket) => void
  >(() => {});

  const { toast } = useToast();
  const { t } = useTranslation();
  const WS_ENDPOINT = "ws://167.172.186.13:8000/connection/websocket";
  const accessToken: string = Cookies.get("accessToken")!;
  const id = "35a547a1-6168-48de-9162-f9b89d7c5232";
  const channelName = "common"; // замените на ваше имя канала
  const personalChannel = "common:user#" + id;

  // const [token, setToken] = useState("");
  // const { data: newToken, isLoading } = useGetChatTokenQuery({
  //   channel: channelName,
  // });

  // useEffect(() => {
  //   setToken(newToken);
  // }, [newToken]);

  // console.log("useGetChatTokenQuery", token);
  useEffect(() => {
    const initializeCentrifuge = async () => {
      const centrifugeInstance = new Centrifuge(WS_ENDPOINT, {
        getToken: () => Promise.resolve(accessToken),
        debug: true,
      });

      centrifugeInstance.connect();
      centrifugeRef.current = centrifugeInstance;

      try {
        const token = await getSubscriptionToken(channelName, accessToken);
        // console.log("getSubscriptionToken", token);

        const sub = centrifugeInstance.newSubscription(personalChannel, {
          getToken: () => Promise.resolve(token),
        });

        sub.on("publication", (ctx: PublicationContext) => {
          // console.log("Message", ctx);
          const newMessage = ctx.data as IOrderMessageNewSocket;
          // console.log("handleNewMessage", handleNewMessageRef.current);
          // console.log("handleNewMessageChat", handleNewMessageChatRef.current);

          if (newMessage.recipient) {
            handleNewMessageRef.current(newMessage);
            handleNewMessageChatRef.current(newMessage);
            // console.log("new Message");
            toast({
              variant: "default",
              title: t("toasts.websoket.new_message"),
            });
          }
        });

        sub.subscribe();
        // console.log("subsub", sub);

        return () => {
          sub.unsubscribe();
          centrifugeInstance.disconnect();
        };
      } catch (error) {
        console.error("Error:", error);
      }
    };

    initializeCentrifuge();
  }, []);

  const getSubscriptionToken = async (channel: string, accessToken: string) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/subscription`,
      { channel: channel },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.token;
  };

  const OrderMessageSend = async (message: IOrderMessageSendSocket) => {
    if (!centrifugeRef.current)
      throw new Error("Centrifuge instance is not initialized");
    try {
      const result = await centrifugeRef.current.publish(
        personalChannel,
        message,
      );
      // console.log("Message sent:", result);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const OrderMessageNew = (
    callback: (message: IOrderMessageNewSocket) => void,
  ) => {
    handleNewMessageRef.current = callback;
  };

  const OrderMessageNewChat = (
    callback: (message: IOrderMessageNewSocket) => void,
  ) => {
    handleNewMessageChatRef.current = callback;
  };

  return (
    <CentrifugeContext.Provider
      value={{
        centrifuge: centrifugeRef.current,
        OrderMessageSend,
        OrderMessageNew,
        OrderMessageNewChat,
      }}
    >
      {children}
    </CentrifugeContext.Provider>
  );
};

export const useCentrifuge = (): CentrifugeContextType => {
  const context = useContext(CentrifugeContext);
  if (!context) {
    throw new Error("useCentrifuge must be used within a CentrifugeProvider");
  }
  return context;
};
