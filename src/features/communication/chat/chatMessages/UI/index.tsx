import {
  chatAPI,
  chatType,
  getChatHistoryReq,
  IChatData,
  IMessageNewSocket,
  IMessageSendSocket,
  MeesageSendType,
  MessageStatus,
  RecipientType,
  useGetOrderHistoryQuery,
  useReadOrderMessageMutation,
  useReadProjectMessageMutation,
} from "@entities/communication";
import { DEBOUNCE } from "@entities/project";
import { DinamicPagination } from "@features/other";
import {
  AddIcon,
  ArrowReadIcon,
  ArrowSmallVerticalIcon,
  MessageAppendixIcon,
  SendIcon,
} from "@shared/assets";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import {
  checkDatetime,
  checkDatetimeDifference,
  convertUTCToLocalDateTime,
  getFormattedDateTime,
} from "@shared/functions";
import { useAppDispatch, useAppSelector, useDebounce } from "@shared/hooks";
import HardBreak from "@tiptap/extension-hard-break";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCentrifuge } from "@widgets/communication/chat";
import Cookies from "js-cookie";
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { animateScroll } from "react-scroll";
import { v4 as uuidv4 } from "uuid";
import { SkeletonChatMessage } from "../skeleton";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";

interface ChatMessagesProps {
  card: IChatData;
}

export const ChatMessages: FC<ChatMessagesProps> = ({ card }) => {
  const { t } = useTranslation();
  const { OrderMessageSend, OrderMessageNew } = useCentrifuge();
  const { role } = useAppSelector((state) => state.user);
  let currentDate: string | null = null;
  const userId = Cookies.get("user_id")!;
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [readOrderMessage] = useReadOrderMessageMutation();
  const [readProjectMessage] = useReadProjectMessageMutation();
  const [newMessage, setNewMessage] = useState<string>("");
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false);
  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [showScrollDownButton, setShowScrollDownButton] =
    useState<boolean>(false);

  const getDefaultValues = (card: IChatData) => ({
    ...(card?.type === chatType.order
      ? { order_id: card?.order_id }
      : { project_id: card?.project_id }),
    batch: INTERSECTION_ELEMENTS.chat,
  });

  const { watch, setValue, reset } = useForm<getChatHistoryReq>({
    defaultValues: getDefaultValues(card),
  });

  const formFields = watch();

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

  const { data, isFetching } = useGetOrderHistoryQuery({
    ...formFields,
  });

  useEffect(() => {
    reset(getDefaultValues(card));
  }, [card]);

  useEffect(() => {
    if ((data?.history?.length || 0) <= INTERSECTION_ELEMENTS.chat) {
      if (containerRef.current && !isSendMessage) {
        const scrollTo = itemRefs.current
          .slice(0, history?.length)
          .reduce((acc, el) => {
            return acc + (el?.offsetHeight || 0);
          }, 0);

        containerRef.current.scrollTop =
          scrollTo + (INTERSECTION_ELEMENTS.chat - 1) * 15;
      }
    }
  }, [data?.history?.length]);

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
    if (message !== "") {
      const orderMessage: IMessageSendSocket = {
        ...(card?.type === chatType.order
          ? {
              order_id: card?.order_id,
              method: MeesageSendType.order_message_create,
            }
          : {
              project_id: card?.project_id,
              method: MeesageSendType.project_message_create,
            }),
        user_id: userId,
        message: message,
      };
      OrderMessageSend(orderMessage);

      const datetime = getFormattedDateTime();
      const orderMessageState: IMessageNewSocket = {
        id: uuidv4(),
        ...(card?.type === chatType.order
          ? { order_id: card?.order_id }
          : { project_id: card?.project_id }),
        message: message,
        recipient: RecipientType.sender,
        formated_date: datetime.localDate,
        formated_time: datetime.localTime,
        message_date: datetime.utcDate,
        message_time: datetime.utcTime,
        message_datetime: datetime.utcDate + " " + datetime.utcTime,
        status: MessageStatus.unread,
      };
      const newHistory = {
        ...data,
        history: [...(data?.history || []), orderMessageState],
      };
      dispatch(
        chatAPI.util.updateQueryData(
          "getOrderHistory",
          {
            ...formFields,
          },
          (draft) => {
            Object.assign(draft, newHistory);
          },
        ),
      );
      editor?.commands.setContent("");
      setNewMessage("");
      setIsSendMessage(true);
    }
  };

  const handleNewMessage = (message: IMessageNewSocket) => {
    // console.log("newnewnew", message);
    if (message?.recipient === RecipientType.receiver) {
      if (message?.order_id && message?.order_id === card?.order_id) {
        const datetime = convertUTCToLocalDateTime(
          message?.message_date,
          message?.message_time,
        );
        const newMessage: IMessageNewSocket = {
          ...message,
          formated_date: datetime.localDate,
          formated_time: datetime.localTime,
          message_datetime: message.message_date + " " + message.message_time,
        };
        const newHistory = {
          ...data,
          history: [...(data?.history || []), newMessage],
        };
        dispatch(
          chatAPI.util.updateQueryData(
            "getOrderHistory",
            {
              ...formFields,
            },
            (draft) => {
              Object.assign(draft, newHistory);
            },
          ),
        );
        setIsNewMessage(true);
      } else if (
        message?.project_id &&
        message?.project_id === card?.project_id
      ) {
      }
    }
  };

  const handlePaginationHistory = () => {
    if (data?.history) {
      const topMessage = data?.history[0];
      setValue("message_date", topMessage?.message_date);
      setValue("message_time", topMessage?.message_time);
    }
  };

  OrderMessageNew(handleNewMessage);

  const handleChange = (content: string) => {
    setNewMessage(content);
  };

  const cleanMessage = (message: string) => {
    // console.log("Before cleaning:", message);
    let cleanedMessage = message?.replace(
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

    // console.log("After cleaning:", cleanedMessage);
    return cleanedMessage;
  };

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

  const handleReadMessage = (message: IMessageNewSocket) => {
    console.log("handleReadMessage");
    if (message?.status === MessageStatus.unread && message?.order_id) {
      console.log(
        "READ MESSAGE",
        message?.message_date + " " + message?.message_time,
      );
      readOrderMessage({
        order_id: message?.order_id,
        message_datetime: message?.message_date + " " + message?.message_time,
      })
        .unwrap()
        .then(() => {
          const newHistory: IMessageNewSocket[] =
            data?.history.map((item) => {
              if (
                checkDatetime(item?.message_datetime, message?.message_datetime)
              ) {
                return {
                  ...item,
                  status: MessageStatus.read,
                };
              }
              return item;
            }) || [];
          dispatch(
            chatAPI.util.updateQueryData(
              "getOrderHistory",
              {
                order_id: message?.order_id,
                batch: INTERSECTION_ELEMENTS.chat,
              },
              (draft) => {
                draft.history = newHistory;
              },
            ),
          );
          dispatch(
            chatAPI.util.updateQueryData(
              "getOrderChats",
              { role: role },
              (draft) => {
                const newChatOrder: IChatData[] = draft.map((chat) => {
                  if (chat?.order_id === message?.order_id) {
                    return {
                      ...chat,
                      unread_count: newHistory.filter(
                        (item) =>
                          item?.status === MessageStatus.unread &&
                          item.recipient === RecipientType.receiver,
                      ).length,
                    };
                  }
                  return chat;
                });
                console.log("newChatOrder", newChatOrder);
                draft.splice(0, draft.length, ...newChatOrder);
              },
            ),
          );
        })
        .catch(() => {
          console.log("Read messag Error");
        });
    } else if (
      message?.status === MessageStatus.unread &&
      message?.project_id
    ) {
    }
  };

  const [lastMessage, setLastMessage] = useState<IMessageNewSocket | null>(
    null,
  );

  useEffect(() => {
    if (data && !lastMessage) {
      setLastMessage(data?.history[0]);
    }
  }, [data]);

  const debouncedPosition = useDebounce(
    lastMessage?.message_date + " " + lastMessage?.message_time,
    DEBOUNCE.readMessage,
  );

  useEffect(() => {
    // console.log("debouncedPosition", debouncedPosition, lastMessage);
    if (lastMessage) {
      handleReadMessage(lastMessage);
    }
  }, [debouncedPosition]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dataset = (entry.target as HTMLElement).dataset.message;
            // console.log(dataset);
            if (dataset) {
              const message: IMessageNewSocket = JSON.parse(dataset);
              if (
                message?.recipient === RecipientType.receiver &&
                lastMessage
              ) {
                const lastDatetime = lastMessage?.message_datetime;
                const messageDatetime = message?.message_datetime;
                // console.log(lastDatetime, messageDatetime, message);
                if (checkDatetime(lastDatetime, messageDatetime)) {
                  // console.log("checkDatetime", message);
                  setLastMessage(message);
                }
              }
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1, // Срабатывает, когда 100% элемента видны
      },
    );

    messagesRef.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref); // Подключаем наблюдателя к каждому элементу
      }
    });

    return () => {
      if (messagesRef.current) {
        messagesRef.current.forEach((ref) => {
          if (ref) observer.unobserve(ref); // Очищаем наблюдателя при размонтировании
        });
      }
    };
  }, [data]);

  console.log("data", data);

  return (
    <div className={styles.wrapper}>
      {data?.history?.length ? (
        <div id="all__messages" className={styles.check} ref={containerRef}>
          <div className={styles.all__messages}>
            {!data?.isLast && (
              <DinamicPagination onChange={handlePaginationHistory} />
            )}
            {isFetching && (
              <div className={styles.skeleton_wrapper}>
                {Array.from({ length: INTERSECTION_ELEMENTS.chat }).map(
                  (_, index) => {
                    const values = Object.values(RecipientType);
                    const randomIndex = Math.floor(
                      Math.random() * values.length,
                    );
                    const recipient = values[randomIndex];
                    return (
                      <div className={styles.messages_wrapper} key={index}>
                        <div
                          className={`${styles.row__message} ${
                            recipient === RecipientType.receiver
                              ? styles.receiver
                              : styles.sender
                          }`}
                        >
                          <SkeletonChatMessage recipient={recipient} />
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            )}
            {data &&
              data?.history?.map((message, index) => {
                let isTimeDifferenceSmall = false;
                let isSameRecepient = true;
                if (index < data.history.length) {
                  isTimeDifferenceSmall = checkDatetimeDifference(
                    message?.message_datetime,
                    data.history[index + 1]?.message_datetime,
                    2,
                  );
                  isSameRecepient =
                    message?.recipient === data.history[index + 1]?.recipient;
                }

                return (
                  <motion.div
                    key={message?.id}
                    initial="hidden"
                    animate="visible"
                    custom={
                      INTERSECTION_ELEMENTS.chat -
                      (index % INTERSECTION_ELEMENTS.chat)
                    }
                    variants={PAGE_ANIMATION.animationChat}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className={styles.messages_wrapper}
                  >
                    {message?.message_date !== currentDate &&
                      ((currentDate = message?.message_date),
                      (
                        <div className={styles.date}>
                          <p>{message?.formated_date}</p>
                        </div>
                      ))}

                    <div
                      className={`${styles.row__message} ${
                        message?.recipient === RecipientType.receiver
                          ? styles.receiver
                          : styles.sender
                      } ${!isTimeDifferenceSmall || !isSameRecepient ? styles.more : styles.less} `}
                    >
                      <div
                        className={styles.message}
                        ref={(el) => (messagesRef.current[index] = el)}
                        data-message={JSON.stringify({
                          ...message,
                          message: undefined,
                        })}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: message?.message || "",
                          }}
                        />
                        <div className={styles.time}>
                          <span>{message?.formated_time}</span>
                          {message?.recipient === RecipientType.sender && (
                            <div className={styles.read}>
                              <ArrowReadIcon
                                isRead={Boolean(message?.status)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      {(!isTimeDifferenceSmall || !isSameRecepient) && (
                        <div className={styles.appendix}>
                          <MessageAppendixIcon />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
          </div>
          {showScrollDownButton && (
            <button className={styles.arrow__down} onClick={handleArrowDown}>
              <ArrowSmallVerticalIcon className="active__icon" />
            </button>
          )}
          <div className={styles.end} ref={messagesEndRef} />
        </div>
      ) : (
        <div className={styles.no_messages}>
          <p>{t("chat.no_message")}</p>
        </div>
      )}
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
