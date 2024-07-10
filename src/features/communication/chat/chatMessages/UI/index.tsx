import { AddIcon, ArrowSmallVerticalIcon, SendIcon } from "@shared/assets";
import HardBreak from "@tiptap/extension-hard-break";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { animateScroll } from "react-scroll";
import styles from "./styles.module.scss";
import { useCentrifuge } from "@widgets/communication/chat";
import { DinamicPagination } from "@features/other";
import {
  convertUTCToLocalDateTime,
  getCurrentUtcDateTime,
} from "@shared/functions";
import {
  IOrderMessageNewSocket,
  IOrderMessageSendSocket,
  MessageStatus,
  RecipientType,
  useGetOrderHistoryQuery,
} from "@entities/communication";
import { INTERSECTION_ELEMENTS } from "@shared/config";

interface ChatMessagesProps {
  id: string;
  isOrder: boolean;
}

export const ChatMessages: FC<ChatMessagesProps> = ({ id, isOrder }) => {
  const { t } = useTranslation();
  const { OrderMessageSend, OrderMessageNew } = useCentrifuge();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentDateString = getCurrentUtcDateTime();

  let currentDate: string | null = null;

  const { watch, setValue } = useForm({
    defaultValues: {
      ...(isOrder ? { order_id: id } : { project_id: id }),
      batch: INTERSECTION_ELEMENTS.chat,
      message_date: currentDateString.date,
      message_time: currentDateString.time,
    },
  });

  const formFields = watch();

  const { data: history, isLoading } = useGetOrderHistoryQuery({
    ...formFields,
  });
  console.log(history);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false);

  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [chat, setChat] = useState<IOrderMessageNewSocket[]>([]);
  const [showScrollDownButton, setShowScrollDownButton] =
    useState<boolean>(false);

  useEffect(() => {
    if (history) {
      const reversedArray = [...history].reverse();
      const newHistory = reversedArray.map((item) => {
        const datetime = convertUTCToLocalDateTime(
          item.message_date,
          item.message_time,
        );
        return {
          ...item,
          message_date: datetime.localDate,
          message_time: datetime.localTime,
        };
      });
      setChat([...newHistory, ...chat]);
    }
  }, [history]);

  useEffect(() => {
    if (containerRef.current && !isSendMessage) {
      const scrollTo = itemRefs.current
        .slice(0, history?.length)
        .reduce((acc, el) => {
          return acc + (el?.offsetHeight || 0);
        }, 0);

      console.log("scrollTo", scrollTo, history?.length);
      containerRef.current.scrollTop =
        scrollTo + (INTERSECTION_ELEMENTS.chat - 1) * 15;
    }
  }, [chat]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const isScrolledUp =
          containerRef.current.scrollTop + containerRef.current.clientHeight <
          containerRef.current.scrollHeight - 250;
        setShowScrollDownButton(isScrolledUp);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && event.ctrlKey) {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const message = cleanMessage(newMessage);
    console.log(message);
    if (message !== "") {
      const orderMessage: IOrderMessageSendSocket = {
        ...(isOrder ? { order_id: id } : { project_id: id }),
        user_id: "35a547a1-6168-48de-9162-f9b89d7c5232",
        message: message,
      };
      OrderMessageSend(orderMessage);
      const currentDate: Date = new Date();
      const year: number = currentDate.getFullYear();
      const month: number = currentDate.getMonth() + 1;
      const day: number = currentDate.getDate();
      const formattedDate: string = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      const hours: number = currentDate.getHours();
      const minutes: number = currentDate.getMinutes();
      const formattedTime: string = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      const orderMessageState: IOrderMessageNewSocket = {
        id: "12",
        ...(isOrder ? { order_id: id } : { project_id: id }),
        message: message,
        recipient: RecipientType.sender,
        message_date: formattedDate,
        message_time: formattedTime,
        status: MessageStatus.unread,
      };

      setChat([...chat, orderMessageState]);
      editor?.commands.setContent("");
      setNewMessage("");
      setIsSendMessage(true);
    }
  };

  const handleNewMessage = (message: IOrderMessageNewSocket) => {
    if (
      (message.order_id === id || message.project_id === id) &&
      message.recipient === RecipientType.receiver
    ) {
      const datetime = convertUTCToLocalDateTime(
        message.message_date,
        message.message_time,
      );
      const newMessage: IOrderMessageNewSocket = {
        ...message,
        message_date: datetime.localDate,
        message_time: datetime.localTime,
      };
      setChat([...chat, newMessage]);
      setIsNewMessage(true);
    }
  };

  const handleGetMessage = () => {
    if (chat.length && history?.length) {
      const lastMessage = chat[0];
      const date = new Date(
        `${lastMessage.message_date} ${lastMessage.message_time}`,
      );
      const utcDate = date.toISOString().split("T")[0];
      const utcTime = date.toISOString().split("T")[1].split("Z")[0];

      setValue("message_date", utcDate);
      setValue("message_time", utcTime);

      console.log(lastMessage, date.toISOString());
    }
  };

  OrderMessageNew(handleNewMessage);

  const limit = 4000;
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      Link.configure({
        openOnClick: "whenNotEditable",
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "hyperlink",
        },
        autolink: false,
      }),
      HardBreak.configure({
        // keepMarks: false,
      }),
    ],
    content: newMessage,
    editorProps: {
      attributes: {
        class:
          "h-full px-1 max-h-[100px] overflow-auto bg-transparent text-black focus:outline-none text-sm",
      },
    },
    onUpdate({ editor }) {
      handleChange(editor.getHTML());
    },
  });

  const handleChange = (content: string) => {
    setNewMessage(content);
  };

  const cleanMessage = (message: string) => {
    console.log("Before cleaning:", message);
    let cleanedMessage = message.replace(
      /^(<p>\s*(<br\s*\/?>\s*)+|(<br\s*\/?>\s*)+)/g,
      "<p>",
    );
    cleanedMessage = cleanedMessage.replace(
      /((<br\s*\/?>\s*)+<\/p>\s*$|(<br\s*\/?>\s*)+\s*$)/g,
      "</p>",
    );
    cleanedMessage = cleanedMessage.replace(/(<p>\s*<\/p>)+/g, "");
    if (/^<p>\s*<\/p>$/.test(cleanedMessage)) {
      cleanedMessage = "";
    }

    console.log("After cleaning:", cleanedMessage);
    return cleanedMessage;
  };
  console.log(newMessage);

  useEffect(() => {
    if (isSendMessage && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
      setIsSendMessage(false);
    }
  }, [isSendMessage]);

  useEffect(() => {
    if (isNewMessage && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
      setIsNewMessage(false);
    }
  }, [isNewMessage]);

  const handleArrowDown = () => {
    if (messagesEndRef.current) {
      animateScroll.scrollToBottom({
        containerId: "all__messages",
        smooth: true,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div id="all__messages" className={styles.check} ref={containerRef}>
        <DinamicPagination onChange={handleGetMessage} />
        <div className={styles.all__messages}>
          {/* {isLoading && Array.from({ length: INTERSECTION_ELEMENTS.chat }).map(
            (_, index) => (
              <div className={styles.messages_wrapper} key={index}>
                <div className={`${styles.row__message} ${styles.sender}`}>
                  <SkeletonChatMessage />
                </div>
              </div>
            )
          )} */}
          {~isLoading &&
            chat.map((message, index) => (
              <div
                key={message.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={styles.messages_wrapper}
              >
                {message.message_date !== currentDate &&
                  ((currentDate = message.message_date),
                  (
                    <div className={styles.date}>
                      <p>{message.message_date}</p>
                    </div>
                  ))}

                <div
                  className={`${styles.row__message} ${
                    message.recipient === RecipientType.receiver
                      ? styles.recipient
                      : styles.sender
                  }`}
                >
                  <div
                    className={`${styles.message} ${
                      message.recipient === RecipientType.receiver
                        ? styles.recipient
                        : styles.sender
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: message.message || "",
                      }}
                    />
                    <span className={styles.time}>{message.message_time}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {showScrollDownButton && (
          <button className={styles.arrow__down} onClick={handleArrowDown}>
            <ArrowSmallVerticalIcon className="active__icon" />
          </button>
        )}
        <div className={styles.end} ref={messagesEndRef} />
      </div>
      <div className={styles.wrapper__bottom}>
        <button>
          <AddIcon />
        </button>
        <div className={styles.input}>
          {(newMessage === "" || newMessage === "<p></p>") && (
            <span>{t("chat.new_message")}</span>
          )}
          <EditorContent
            editor={editor}
            maxLength={limit}
            onKeyDown={handleKeyPress}
            className={styles.text}
          />
        </div>
        <button onClick={handleSendMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
