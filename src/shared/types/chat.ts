export interface IChat {
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
