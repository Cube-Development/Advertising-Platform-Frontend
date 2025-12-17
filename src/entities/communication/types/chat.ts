import { ENUM_ROLES } from "@entities/user";
import {
  MESSAGE_SEND_TYPE as MESSAGE_SEND_TYPE,
  MESSAGE_STATUS,
  CHAT_TYPE,
  RECIPIENT_TYPE,
  notificationsTypes,
} from "../config";
import { ContentType } from "@entities/project";

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

export interface IMess {
  content_type: ContentType;
  content: string;
  name?: string;
}

export interface IMessageNewSocket {
  id: string;
  method?: MESSAGE_SEND_TYPE | notificationsTypes;
  recipient: string;
  order_id?: string;
  project_id?: string;
  message: string | IMess;
  formatted_date: string;
  formatted_time: string;
  // created_date: string;
  // created_time: string;
  created_date: string;
  created_time: string;
  message_datetime: string;
  status: number;
  message_id?: string;
  questions?: string[];
}

export interface IChatData {
  order_id?: string;
  project_id?: string;
  recipient: string;
  project_name: string;
  channel_name: string;
  avatar: string;
  last_message: IMess;
  unread_count: number;
  created_date: string;
  created_time: string;
  type: CHAT_TYPE;
  formatted_date: string;
  formatted_time: string;
  message_datetime: string;
}

export interface IReadOrderMessage {
  id: string;
  order_id: string;
  message: string;
  recipient: RECIPIENT_TYPE;
  created_date: string;
  created_time: string;
  status: MESSAGE_STATUS;
}

export interface IMessageSendSocket {
  order_id?: string;
  project_id?: string;
  user_id: string;
  message: string;
  method: MESSAGE_SEND_TYPE;
  id: string;
}

export interface IChatProps {
  isMain?: boolean;
  isOrder?: boolean;
  isProject?: boolean;
  orderId?: string;
  projectId?: string;
  toRole?: ENUM_ROLES;
  isFull?: boolean;
}
