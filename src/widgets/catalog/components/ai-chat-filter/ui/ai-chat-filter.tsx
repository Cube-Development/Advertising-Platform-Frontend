import { MyButton, ScrollArea, TextType } from "@shared/ui";
import { RotateCcw, Send, Sparkles } from "lucide-react";
import { type FC, type KeyboardEvent } from "react";
import { useAiChatFilter } from "../model";
import { ICatalogFilter } from "@entities/project";

export interface AiChatFilterProps {
  className?: string;
  handleFind: (value: ICatalogFilter) => void;
}

export const AiChatFilter: FC<AiChatFilterProps> = ({
  className,
  handleFind,
}) => {
  const {
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
  } = useAiChatFilter(handleFind);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
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
        className="flex flex-col w-full max-w-3xl gap-4 p-5 mx-auto border h-72 bg-blue-50 rounded-2xl border-slate-200"
      >
        {messages.length === 0 && !pendingQuestion && (
          <div className="flex flex-col items-center justify-center text-center h-52">
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
                    typingSpeed={40}
                    showCursor={false}
                    loop={false}
                    onUpdate={() => {
                      // безопасный и надёжный автоскролл
                      messagesEndRef?.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                      });
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex justify-start h-5 p-1 text-xs text-slate-500"
          ref={messagesEndRef}
        >
          {isTyping && (
            <TextType
              text={["Ассистент печатает..."]}
              typingSpeed={75}
              showCursor={false}
              pauseDuration={1000}
            />
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="relative pt-6">
        {isComplete ? (
          <MyButton onClick={handleFindWithParams}>
            <Sparkles />
            <p>Подобрать каналы</p>
          </MyButton>
        ) : (
          <>
            {pendingQuestion && !isComplete && (
              <div className="absolute left-0 flex items-center gap-2 text-xs top-1 text-slate-500">
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
                  className="flex-1 px-4 py-3 text-base bg-white border border-transparent resize-none rounded-xl focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-70"
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
