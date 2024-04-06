import { chatRoles } from "@shared/config/roles";

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
