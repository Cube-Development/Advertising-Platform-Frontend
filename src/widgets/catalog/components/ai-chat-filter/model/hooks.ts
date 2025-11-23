import { MESSAGE_SEND_TYPE, notificationsTypes } from "@entities/communication";
import { ICatalogFilter } from "@entities/project";
import { useCentrifuge } from "@shared/api";
import { PERSONAL_CHANNEL_PREFIX } from "@shared/api/centrifuge/model";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { ScrollArea } from "@shared/ui";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { IMessageSendAISocket, Message, Question } from "./types";

export const useAiChatFilter = (
  handleFind: (value: ICatalogFilter) => void,
) => {
  const userId = Cookies.get(ENUM_COOKIES_TYPES.USER_ID)!;
  const { OrderMessageNewChat, centrifuge } = useCentrifuge();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [pendingQuestion, setPendingQuestion] = useState<Question | null>(null);
  const [questionFlow, setQuestionFlow] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [params, setParams] = useState<ICatalogFilter | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const completionMessageIdRef = useRef<string | null>(null);
  const scrollAreaRef = useRef<React.ElementRef<typeof ScrollArea> | null>(
    null,
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport =
        (scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]",
        ) as HTMLElement | null) ||
        (scrollAreaRef.current.querySelector(
          '[style*="overflow"]',
        ) as HTMLElement | null) ||
        (scrollAreaRef.current.firstElementChild as HTMLElement | null);

      if (viewport) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            viewport.scrollTo({
              top: viewport.scrollHeight,
              behavior: "smooth",
            });
          });
        });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, pendingQuestion, isComplete, isTyping]);

  const handleAiMessage = (message: any) => {
    console.log("handleAiMessage", message);

    if (message?.method === notificationsTypes.ai_sample_not_ready) {
      setIsTyping(false);
      const questionText =
        "Дополните информацию: \n - " + message?.questions?.join("\n - ") || "";

      const newQuestions = [
        {
          id: uuidv4(),
          text: questionText,
        },
      ];

      setThreadId(message?.thread_id);
      if (newQuestions.length > 0) {
        setQuestionFlow((prev) => {
          const updated = [...prev, ...newQuestions];

          setCurrentQuestion((current) => {
            if (current === null) {
              return 0;
            }
            if (current >= prev.length) {
              return prev.length;
            }
            return current;
          });

          return updated;
        });
      }
    } else if (message?.method === notificationsTypes.ai_sample_ready) {
      setIsTyping(false);
      setPendingQuestion(null);
      setIsComplete(true);
      setCurrentQuestion(null);
      const newParams: ICatalogFilter = {
        age: message?.age,
        business: message?.business,
        female: message?.female,
        language: message?.language,
        male: message?.male,
        region: message?.region,
      };
      setParams(newParams);
    }
  };

  OrderMessageNewChat(handleAiMessage);

  useEffect(() => {
    console.log("questionFlow", questionFlow);
    if (currentQuestion === null) {
      return;
    }

    if (currentQuestion >= questionFlow.length) {
      setPendingQuestion(null);
      return;
    }

    const nextQuestion = questionFlow[currentQuestion];
    if (!nextQuestion) {
      return;
    }

    const questionAlreadyShown = messages.some(
      (msg) => msg.id === nextQuestion.id && msg.role === "assistant",
    );

    if (questionAlreadyShown) {
      setPendingQuestion(nextQuestion);
      return;
    }

    // setIsTyping(true);
    console.log("nextQuestion", nextQuestion, currentQuestion);
    setMessages((prev) => [
      ...prev,
      {
        id: nextQuestion.id,
        role: "assistant",
        text: nextQuestion.text,
      },
    ]);
    setPendingQuestion(nextQuestion);
  }, [currentQuestion, questionFlow, messages]);

  useEffect(() => {
    if (isComplete && !completionMessageIdRef.current) {
      const completionMessageId = uuidv4();
      completionMessageIdRef.current = completionMessageId;

      const completionMessage: Message = {
        id: completionMessageId,
        role: "assistant",
        text: "По вашему запросу найдены каналы, чтобы их увидеть нажмите кнопку <<Подобрать>>",
      };

      setMessages((prev) => [...prev, completionMessage]);
    }
  }, [isComplete]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const payload = input.trim();
    const messageId = crypto.randomUUID();

    const userMessage: Message = {
      id: messageId,
      role: "user",
      text: payload,
    };

    if (messages.length === 0) {
      setMessages([userMessage]);
      setInput("");
      setIsComplete(false);
      setCurrentQuestion(null);
    } else {
      setMessages((prev) => [...prev, userMessage]);
      setPendingQuestion(null);
      setInput("");
      setCurrentQuestion((prev) => {
        if (prev === null) {
          return null;
        }
        return prev + 1;
      });
    }

    try {
      setIsTyping(true);

      const aiMessage: IMessageSendAISocket = {
        user_id: userId,
        message: payload,
        method: MESSAGE_SEND_TYPE.AI_SAMPLE_REQUEST,
        id: messageId,
        thread_id: threadId,
      };

      if (centrifuge) {
        await centrifuge.publish(
          PERSONAL_CHANNEL_PREFIX.AI_SAMPLE + userId,
          aiMessage,
        );
      } else {
        throw new Error("Centrifuge instance is not initialized");
      }
    } catch (error) {
      console.error("Ошибка отправки сообщения AI:", error);
    }
  };

  const handleReset = () => {
    setInput("");
    setMessages([]);
    setPendingQuestion(null);
    setIsComplete(false);
    setCurrentQuestion(null);
    setIsTyping(false);
    setQuestionFlow([]);
    setThreadId(null);
    setParams(null);
    completionMessageIdRef.current = null;
  };

  const handleFindWithParams = () => {
    if (params) {
      handleFind(params);
    }
  };

  return {
    input,
    setInput,
    messages,
    pendingQuestion,
    isComplete,
    isTyping,
    scrollAreaRef,
    messagesEndRef,
    handleSubmit,
    handleReset,
    handleFindWithParams,
    params,
  };
};
