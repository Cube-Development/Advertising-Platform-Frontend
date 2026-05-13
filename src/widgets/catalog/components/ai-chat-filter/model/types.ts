import { ICatalogFilter } from "@entities/project";

export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
}

export interface Question {
  id: string;
  text: string;
}

export interface IMessageSendAISocket {
  user_id: string;
  message: string;
  method: string;
  id: string;
  thread_id: string | null;
}

export interface IMessageNewAISocket
  extends IMessageSendAISocket, ICatalogFilter {
  questions: string[];
}
