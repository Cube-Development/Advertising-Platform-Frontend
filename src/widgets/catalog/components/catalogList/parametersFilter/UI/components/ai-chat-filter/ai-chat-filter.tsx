import {
  IMessageNewSocket,
  IMessageSendSocket,
  MESSAGE_SEND_TYPE,
  notificationsTypes,
} from "@entities/communication";
import { useCentrifuge } from "@shared/api";
import { PERSONAL_CHANNEL_PREFIX } from "@shared/api/centrifuge/model";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { MyButton, ScrollArea, TextType } from "@shared/ui";
import Cookies from "js-cookie";
import { RotateCcw, Send, Sparkles } from "lucide-react";
import React, {
  type FC,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  text: string;
}

interface Question {
  id: string;
  text: string;
}

interface AiChatFilterProps {
  className?: string;
  handleFind: (value: any) => void;
}

export const AiChatFilter: FC<AiChatFilterProps> = ({
  className,
  handleFind,
}) => {
  const userId = Cookies.get(ENUM_COOKIES_TYPES.USER_ID)!;
  const { OrderMessageNewChat, centrifuge } = useCentrifuge();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [pendingQuestion, setPendingQuestion] = useState<Question | null>(null);
  const [questionFlow, setQuestionFlow] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [params, setParams] = useState<any>();
  const [isTyping, setIsTyping] = useState(false);
  const [treadId, setThreadId] = useState<string | null>(null);
  const scrollAreaRef = useRef<React.ElementRef<typeof ScrollArea> | null>(
    null,
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  console.log("messages", messages);

  //   const questionFlow = useMemo<Question[]>(
  //     () =>
  //       (messages || [])
  //         .filter((el) => el?.role === "assistant")
  //         ?.map((item, index) => ({
  //           id: `q-${index}`,
  //           text: item?.text,
  //         })),
  //     [messages]
  //   );
  console.log("treadId", treadId);
  const scrollToBottom = () => {
    // Получаем viewport элемент внутри ScrollArea
    if (scrollAreaRef.current) {
      // Radix UI ScrollArea создает viewport с data-атрибутом или можно найти через структуру
      const viewport =
        (scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]",
        ) as HTMLElement | null) ||
        (scrollAreaRef.current.querySelector(
          '[style*="overflow"]',
        ) as HTMLElement | null) ||
        (scrollAreaRef.current.firstElementChild as HTMLElement | null);

      if (viewport) {
        // Используем двойной requestAnimationFrame для гарантии рендера
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

  // Обработчик получения сообщений от AI через WebSocket

  const handleAiMessage = (message: IMessageNewSocket | any) => {
    // Фильтруем только AI сообщения (без order_id и project_id)
    // AI сообщения не имеют order_id и project_id, так как они не связаны с заказами/проектами
    console.log("handleAiMessage", message);

    setIsTyping(false);
    if (message?.method === notificationsTypes.ai_sample_not_ready) {
      // Обрабатываем входящие вопросы с вебсокета
      const questionText =
        "Дополните информацию: \n - " + message?.questions?.join("\n - ") || "";

      //   const newQuestions =
      //     message?.questions?.map((question) => ({
      //       id: uuidv4(),
      //       text: question,
      //     })) || [];

      const newQuestions = [
        {
          id: uuidv4(),
          text: questionText,
        },
      ];

      setThreadId(message?.thread_id);
      if (newQuestions.length > 0) {
        // Добавляем вопросы в очередь вопросов
        setQuestionFlow((prev) => {
          const updated = [...prev, ...newQuestions];

          // Если currentQuestion указывает за пределы массива (пользователь уже ответил на все вопросы),
          // устанавливаем его на индекс первого нового вопроса
          setCurrentQuestion((current) => {
            if (current === null) {
              return 0;
            }
            // Если currentQuestion >= prev.length, значит пользователь уже ответил на все существующие вопросы
            // и мы ждем новый вопрос - устанавливаем currentQuestion на индекс первого нового вопроса
            if (current >= prev.length) {
              return prev.length;
            }
            // Иначе оставляем как есть - useEffect автоматически покажет следующий вопрос
            return current;
          });

          return updated;
        });
      }
    } else if (message?.method === notificationsTypes.ai_sample_ready) {
      // Все вопросы заданы, можно показать результат
      setPendingQuestion(null);
      setIsComplete(true);
      setCurrentQuestion(null);
      const newParams = {
        age: (message as any)?.age,
        business: (message as any)?.business,
        female: (message as any)?.female,
        language: (message as any)?.language,
        male: (message as any)?.male,
        region: (message as any)?.region,
      };
      setParams({ filter: newParams });
    }
  };

  OrderMessageNewChat(handleAiMessage);

  useEffect(() => {
    console.log("questionFlow", questionFlow);
    if (currentQuestion === null) {
      return;
    }

    if (currentQuestion >= questionFlow.length) {
      // Ждем следующий вопрос с вебсокета
      setPendingQuestion(null);
      // Не устанавливаем isComplete, так как могут прийти еще вопросы
      return;
    }

    const nextQuestion = questionFlow[currentQuestion];
    if (!nextQuestion) {
      return;
    }

    // Проверяем, не показали ли мы уже этот вопрос
    const questionAlreadyShown = messages.some(
      (msg) => msg.id === nextQuestion.id && msg.role === "assistant",
    );

    if (questionAlreadyShown) {
      // Вопрос уже показан, устанавливаем его как pending
      setPendingQuestion(nextQuestion);
      return;
    }

    // Показываем новый вопрос с анимацией печати
    setIsTyping(true);
    const timer = setTimeout(() => {
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
      setIsTyping(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [currentQuestion, questionFlow, messages]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const payload = input.trim();
    const messageId = crypto.randomUUID();

    // Добавляем сообщение пользователя в UI
    const userMessage: Message = {
      id: messageId,
      role: "user",
      text: payload,
    };

    if (messages.length === 0) {
      // Первое сообщение пользователя - начинаем диалог
      setMessages([userMessage]);
      setInput("");
      setIsComplete(false);
      setCurrentQuestion(null); // Ждем первый вопрос с вебсокета
    } else {
      // Последующие сообщения - добавляем ответ пользователя
      setMessages((prev) => [...prev, userMessage]);
      setPendingQuestion(null);
      setInput("");
      // Увеличиваем индекс вопроса, чтобы показать следующий вопрос из очереди
      setCurrentQuestion((prev) => {
        if (prev === null) {
          return null; // Если вопросов еще нет, ждем
        }
        return prev + 1;
      });
    }

    // Отправляем сообщение через WebSocket в AI канал
    try {
      setIsTyping(true);

      const aiMessage: IMessageSendSocket | any = {
        user_id: userId,
        message: payload,
        method: MESSAGE_SEND_TYPE.AI_SAMPLE_REQUEST, // Используем существующий метод, можно изменить если нужен специальный для AI
        id: messageId,
        tread_id: treadId,
      };

      // Отправляем в AI канал напрямую через centrifuge
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
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
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
  };

  return (
    <div className={`flex h-full flex-col rounded-2xl  ${className ?? ""}`}>
      {/* Header */}
      <div className="grid justify-end mb-2 text-center">
        <div className="flex items-center justify-between">
          {messages.length > 0 || pendingQuestion ? (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            >
              <RotateCcw size={18} />
              Сбросить
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600">
              Напишите что вас интересует
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea
        ref={scrollAreaRef}
        className="flex flex-col w-full max-w-3xl gap-4 p-5 mx-auto mb-1 border h-72 bg-blue-50 rounded-2xl border-slate-200"
      >
        {messages.length === 0 && !pendingQuestion && (
          <div className="flex flex-col items-center justify-center text-center h-60">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full">
              <Sparkles className="text-blue-600" size={28} />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              Опишите что ищете
            </h2>
            <p className="max-w-sm text-sm text-slate-600">
              Мы зададим уточняющие вопросы для лучшего результата
            </p>
          </div>
        )}

        <div className="grid gap-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex p-1 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed [overflow-wrap:anywhere] ${
                  message.role === "user"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-800 shadow-sm ring-1 ring-slate-200"
                }`}
              >
                {message.role === "user" ? (
                  message.text
                ) : (
                  <TextType
                    text={[message.text]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter=""
                    loop={false}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {isTyping && (
          <div className="flex justify-start p-1 text-xs text-slate-500">
            Ассистент печатает…
          </div>
        )}

        {/* {isComplete && (
          <div className="flex justify-center pt-6">
            <button className="px-8 py-4 font-semibold text-white transition-all shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-xl">
              Подобрать каналы
            </button>
          </div>
        )} */}

        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input Area */}
      <div className="relative pt-5">
        {isComplete ? (
          <MyButton onClick={() => handleFind(params)}>
            <Sparkles />
            <p>Подобрать каналы</p>
          </MyButton>
        ) : (
          <>
            {pendingQuestion && !isComplete && (
              <div className="absolute top-0 left-0 flex items-center gap-2 text-xs text-slate-500">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                Ожидаем ваш ответ…
              </div>
            )}
            <div className="grid max-w-3xl gap-2 mx-auto">
              <div className="flex gap-3 p-2 border rounded-2xl border-slate-200 bg-slate-50">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    pendingQuestion
                      ? "Введите ваш ответ..."
                      : "Опишите что вы ищете..."
                  }
                  className="flex-1 px-4 py-3 text-sm bg-white border border-transparent resize-none rounded-xl focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-70"
                  rows={2}
                  disabled={isComplete || isTyping}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim() || isComplete || isTyping}
                  className="flex items-center justify-center p-3 text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <Send size={20} />
                </button>
              </div>

              <div className="text-xs text-slate-500">
                Enter для отправки, Shift+Enter для новой строки
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
