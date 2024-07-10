import { MessageStatus, RecipientType } from "../config";

export interface IChat {
  id: string;
  campaign?: string;
  name: string;
  avatar: string;
  messages: IMessage[];
}

export interface IMessage {
  type: string;
  message: string;
  date: string;
  time: string;
}

// /////////////////////////////////
export interface IOrderMessageNewSocket {
  id: string;
  method?: string;
  recipient: string;
  order_id?: string;
  project_id?: string;
  message: string;
  message_date: string;
  message_time: string;
  status: number;
}

export interface IOrderMessageAll {
  order_id?: string;
  project_id?: string;
  recipient: string;
  project_name: string;
  channel_name: string;
  avatar: string;
  last_message: string;
  unread_count: number;
  message_date: string;
  message_time: string;
}

export interface IReadOrderMessage {
  id: string;
  order_id: string;
  message: string;
  recipient: RecipientType;
  message_date: string;
  message_time: string;
  status: MessageStatus;
}

export interface IOrderMessageSendSocket {
  order_id?: string;
  project_id?: string;
  user_id: string;
  message: string;
}
