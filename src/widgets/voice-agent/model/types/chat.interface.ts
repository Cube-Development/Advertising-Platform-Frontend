export enum ENUM_CHAT_MESSAGE_TYPE {
  AGENT = "agent",
  USER = "user",
}

export interface IChatMessage {
  id: string;
  text: string;
  type: ENUM_CHAT_MESSAGE_TYPE;
  timestamp: number;
  firstReceivedTime?: number;
}
