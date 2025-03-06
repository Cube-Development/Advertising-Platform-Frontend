import { roles } from "@entities/user";
import {
  MessageSendType as MessageSendType,
  MessageStatus,
  chatType,
  RecipientType,
  notificationsTypes,
} from "../config";

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
export interface IAllMessages {
  history: IMessageNewSocket[];
  isLast?: boolean;
}

export interface IMessageNewSocket {
  id: string;
  method?: MessageSendType | notificationsTypes;
  recipient: string;
  order_id?: string;
  project_id?: string;
  message: string;
  formated_date: string;
  formated_time: string;
  message_date: string;
  message_time: string;
  message_datetime: string;
  status: number;
  message_id?: string;
}

export interface IChatData {
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
  type: chatType;
  formated_date: string;
  formated_time: string;
  message_datetime: string;
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

export interface IMessageSendSocket {
  order_id?: string;
  project_id?: string;
  user_id: string;
  message: string;
  method: MessageSendType;
}

export interface IChatProps {
  isMain?: boolean;
  isOrder?: boolean;
  isProject?: boolean;
  orderId?: string;
  projectId?: string;
  toRole?: roles;
  isFull?: boolean;
}
