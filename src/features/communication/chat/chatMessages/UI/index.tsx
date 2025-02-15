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
  useGetProjectHistoryQuery,
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
  SadSmileIcon,
  SendIcon,
} from "@shared/assets";
import {
  cookiesTypes,
  INTERSECTION_ELEMENTS,
  PAGE_ANIMATION,
} from "@shared/config";
import { useAppDispatch, useAppSelector, useDebounce } from "@shared/hooks";
import {
  checkDatetime,
  checkDatetimeDifference,
  convertUTCToLocalDateTime,
  getFormattedDateTime,
} from "@shared/utils";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCentrifuge } from "@widgets/communication/chat";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { animateScroll } from "react-scroll";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.scss";

interface ChatMessagesProps {
  card: IChatData;
}

export const ChatMessages: FC<ChatMessagesProps> = ({ card }) => {
  let currentDate: string | null = null;
  const userId = Cookies.get(cookiesTypes.userId)!;
  const { t } = useTranslation();
  const { role } = useAppSelector((state) => state.user);
  const { OrderMessageSend, OrderMessageNew } = useCentrifuge();
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousScrollHeightRef = useRef<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [readOrderMessage] = useReadOrderMessageMutation();
  const [readProjectMessage] = useReadProjectMessageMutation();
  const [newMessage, setNewMessage] = useState<string>("");
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false);
  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [showScrollDownButton, setShowScrollDownButton] =
    useState<boolean>(false);
  const [lastMessageToRead, setLastMessageToRead] =
    useState<IMessageNewSocket | null>(null);
  const containerArrowHeight = 250;

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

  const debouncedPosition = useDebounce(
    lastMessageToRead?.message_date + " " + lastMessageToRead?.message_time,
    DEBOUNCE.readMessage,
  );

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
      // HardBreak.configure({
      //   keepMarks: true,
      // }),
    ],
    content: newMessage,
    editorProps: {
      attributes: {
        class:
          "main_font h-full px-1 max-h-[100px] overflow-auto bg-transparent text-black focus:outline-none text-base",
      },
    },
    onUpdate({ editor }) {
      handleChange(editor.getHTML());
    },
  });

  const { data: orderHistory, isFetching: isFetchingOrder } =
    useGetOrderHistoryQuery(
      {
        ...formFields,
      },
      // { skip: !!card?.project_id && !!card }
      { skip: !formFields?.order_id || !card },
    );

  console.log("formFields", formFields);

  const { data: projectHistory, isFetching: isFetchingProject } =
    useGetProjectHistoryQuery(
      {
        ...formFields,
      },
      // { skip: !!card?.order_id && !!card }
      { skip: !formFields?.project_id || !card },
    );

  const data = card?.type === chatType.order ? orderHistory : projectHistory;
  const isFetching =
    card?.type === chatType.order ? isFetchingOrder : isFetchingProject;

  useEffect(() => {
    reset(getDefaultValues(card));
  }, [card]);

  useEffect(() => {
    if (
      data?.history &&
      (data?.history?.length || 0) <= INTERSECTION_ELEMENTS.chat
    ) {
      if (containerRef.current && !isSendMessage) {
        const scrollTo = itemRefs.current
          .slice(0, history?.length)
          .reduce((acc, el) => {
            return acc + (el?.offsetHeight || 0);
          }, 0);

        containerRef.current.scrollTop =
          scrollTo + (INTERSECTION_ELEMENTS.chat - 1) * 15;
        setLastMessageToRead(data?.history[data?.history?.length - 1]);
      }
    }
  }, [data?.history?.length]);

  useEffect(() => {
    if (containerRef.current && !isFetching && !isNewMessage) {
      const newScrollHeight = containerRef.current.scrollHeight;
      containerRef.current.scrollTop +=
        newScrollHeight - previousScrollHeightRef.current;
    }
  }, [isFetching]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const isScrolledUp =
          containerRef.current.scrollTop + containerRef.current.clientHeight <
          containerRef.current.scrollHeight - containerArrowHeight;
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
  }, [containerRef.current]);

  const handlePaginationHistory = () => {
    if (data?.history) {
      const topMessage = data?.history[0];
      setValue("message_date", topMessage?.message_date);
      setValue("message_time", topMessage?.message_time);

      if (containerRef.current) {
        previousScrollHeightRef.current = containerRef.current.scrollHeight;
      }
    }
  };

  const handleArrowDown = () => {
    if (messagesEndRef.current) {
      animateScroll.scrollToBottom({
        containerId: "all__messages",
        smooth: true,
      });
    }
  };

  const handleNewMessage = (message: IMessageNewSocket) => {
    // console.log("newnewnew", message);
    if (message?.recipient === RecipientType.receiver) {
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

      if (message?.order_id && message?.order_id === card?.order_id) {
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
      } else if (
        message?.project_id &&
        message?.project_id === card?.project_id
      ) {
        dispatch(
          chatAPI.util.updateQueryData(
            "getProjectHistory",
            {
              ...formFields,
            },
            (draft) => {
              Object.assign(draft, newHistory);
            },
          ),
        );
      }
      setIsNewMessage(true);
    }
  };

  const handleSendMessage = () => {
    const message = cleanMessage(newMessage);
    // const message = newMessage;
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
      if (card?.type === chatType.order) {
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
      } else if (card?.type === chatType.project) {
        dispatch(
          chatAPI.util.updateQueryData(
            "getProjectHistory",
            {
              ...formFields,
            },
            (draft) => {
              Object.assign(draft, newHistory);
            },
          ),
        );
      }
      editor?.commands.setContent("");
      setNewMessage("");
      setIsSendMessage(true);
    }
  };

  const handleReadMessage = (message: IMessageNewSocket) => {
    if (
      message?.status === MessageStatus.unread &&
      message?.recipient === RecipientType.receiver &&
      message?.order_id
    ) {
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
      message?.recipient === RecipientType.receiver &&
      message?.project_id
    ) {
      readProjectMessage({
        project_id: message?.project_id,
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
              "getProjectHistory",
              {
                project_id: message?.project_id,
                batch: INTERSECTION_ELEMENTS.chat,
              },
              (draft) => {
                draft.history = newHistory;
              },
            ),
          );
          dispatch(
            chatAPI.util.updateQueryData(
              "getProjectChats",
              { role: role },
              (draft) => {
                const newChatOrder: IChatData[] = draft.map((chat) => {
                  if (chat?.project_id === message?.project_id) {
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
                draft.splice(0, draft.length, ...newChatOrder);
              },
            ),
          );
        })
        .catch(() => {
          console.log("Read messag Error");
        });
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && event.ctrlKey) {
      handleSendMessage();
    }
  };

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
      setIsNewMessage(false);
      if (!showScrollDownButton) {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" });
      }
    }
  }, [isNewMessage]);

  // useEffect(() => {
  //   if (data && !lastMessageToRead) {
  //     setLastMessageToRead(data?.history[data?.history?.length - 1]);
  //   }
  // }, [data]);

  useEffect(() => {
    if (lastMessageToRead) {
      handleReadMessage(lastMessageToRead);
    }
  }, [debouncedPosition]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dataset = (entry.target as HTMLElement).dataset.message;
            if (dataset) {
              const message: IMessageNewSocket = JSON.parse(dataset);
              if (
                message?.recipient === RecipientType.receiver &&
                lastMessageToRead
              ) {
                const lastDatetime = lastMessageToRead?.message_datetime;
                const messageDatetime = message?.message_datetime;

                if (checkDatetime(lastDatetime, messageDatetime)) {
                  setLastMessageToRead(message);
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

  // const [visibleDate, setVisibleDate] = useState<string | null>(null);

  // useEffect(() => {
  //   let lastVisibleDate: string | null | undefined = null;

  //   const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
  //     entries.forEach((entry) => {
  //       const date = (entry.target as HTMLElement).dataset.date;
  //       console.log("date", date, entry);
  //       if (entry.isIntersecting) {
  //         console.log("date222", date);
  //         lastVisibleDate = date; // Последняя видимая дата
  //       }
  //     });
  //     console.log("lastVisibleDate", lastVisibleDate);
  //     // Если ни одна дата не видна, показываем последнюю известную дату
  //     if (lastVisibleDate) {
  //       console.log("!isAnyDateVisible && lastVisibleDate", lastVisibleDate);
  //       setVisibleDate(lastVisibleDate);
  //     } else {
  //       setVisibleDate(null); // Если хотя бы одна дата видна, скрываем фиксированную дату
  //     }
  //   };

  //   const observer = new IntersectionObserver(handleVisibilityChange, {
  //     root: containerRef.current,
  //     threshold: 0,
  //   });

  //   // Находим все элементы с атрибутом data-date
  //   const dateElements = document.querySelectorAll("[data-date]");
  //   dateElements.forEach((el) => observer.observe(el));

  //   // Добавляем слушатель события скролла
  //   const container = containerRef.current;
  //   const handleScroll = () => {
  //     // Принудительно проверяем элементы при каждом скролле
  //     observer.takeRecords().forEach(handleVisibilityChange);
  //   };

  //   if (container) {
  //     container.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     // Убираем наблюдателя и слушатель при размонтировании
  //     dateElements.forEach((el) => observer.unobserve(el));
  //     if (container) {
  //       container.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, []);

  OrderMessageNew(handleNewMessage);
  return (
    <div className={styles.wrapper}>
      {data?.history?.length ? (
        <div id="all__messages" className={styles.check} ref={containerRef}>
          <div className={styles.all__messages}>
            {!data?.isLast && !isFetching && (
              <DinamicPagination onChange={handlePaginationHistory} />
            )}
            {/* {!!visibleDate && (
              <div className={styles.date_absolute}>
                <p>{visibleDate}</p>
              </div>
            )} */}
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
                        <div
                          //  data-date={""}
                          className={styles.date}
                        >
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
                        data-date={message?.formated_date}
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
        // <div className={styles.no_messages}>
        //   <p>{t("chat.no_message")}</p>
        // </div>

        <div className={styles.chat__choose}>
          <SadSmileIcon />
          <div className={styles.no_messages}>
            <p>{t("chat.no_message")}</p>
          </div>
        </div>
      )}
      <div className={styles.wrapper__bottom}>
        <button>
          <AddIcon />
        </button>
        {/* <div className={`main_font ${styles.input} placeholder:truncate`}>
          {(newMessage === "" || newMessage === "<p></p>") && (
            <span className="truncate">{t("chat.new_message")}</span>
          )}
          <EditorContent
            editor={editor}
            maxLength={limit}
            onKeyDown={handleKeyPress}
            className={styles.text}
          />
        </div> */}
        <textarea
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={t("chat.new_message")}
          className={styles.text}
          maxLength={limit}
          value={newMessage}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSendMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
