import { platformTypesNum } from "@entities/platform";

export interface IChannelBlogger {
  page: number;
  elements: number;
  channels: AllChannelTypes[];
  status?: string;
  isLast?: boolean;
}

export type AllChannelTypes =
  | IActiveChannel
  | IInactiveChannel
  | IModerationChannel
  | IModerationRejectChannel
  | IBlockedChannel;

export interface IActiveChannel {
  id: string;
  platform: platformTypesNum;
  name: string;
  category: string;
  status: number;
  avatar: string;
  channel_orders: IActiveChannelOrders;
  tags: number[];
  rate?: number;
}

export interface IActiveChannelOrders {
  wait: number;
  in_progress: number;
  completed: number;
  canceled_rejected: number;
}

export interface IInactiveChannel {
  id: string;
  platform: platformTypesNum;
  name: string;
  category: string;
  status: number;
  avatar: string;
  channel_orders: InactiveChannelOrders;
  tags: number[];
  rate?: number;
}

export interface InactiveChannelOrders {
  completed: number;
  canceled_rejected: number;
}

export interface IModerationChannel {
  id: string;
  platform: platformTypesNum;
  name: string;
  category: string;
  avatar: string;
  created: string;
}

export interface IModerationRejectChannel {
  id: string;
  platform: platformTypesNum;
  name: string;
  category: string;
  avatar: string;
  rejected_date: string;
  reapplication_date: string;
  reason: string;
}

export interface IBlockedChannel {
  id: string;
  platform: platformTypesNum;
  name: string;
  category: string;
  avatar: string;
  blocked_date: string;
  reason: string;
}
