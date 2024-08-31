export interface IChannelBlogger {
  page: number;
  elements: number;
  channels:
    | IActiveChannel[]
    | IInactiveChannel[]
    | IModerationChannel[]
    | IModerationRejectChannel[]
    | IBlockedChannel[];
  status?: string;
  isLast?: boolean;
}

// export interface IActiveChannelBlogger {
//   page: number;
//   elements: number;
//   channels: IActiveChannel[];
// }

export type AllChannelTypes =
  | IActiveChannel
  | IInactiveChannel
  | IModerationChannel
  | IModerationRejectChannel
  | IBlockedChannel;

export interface IActiveChannel {
  id: string;
  name: string;
  category: string;
  status: number;
  avatar: string;
  channel_orders: IActiveChannelOrders;
  tags: number[];
}

export interface IActiveChannelOrders {
  wait: number;
  in_progress: number;
  completed: number;
  canceled_rejected: number;
}

//
// export interface IInactiveChannelBlogger {
//   page: number;
//   elements: number;
//   channels: IInactiveChannel[];
// }

export interface IInactiveChannel {
  id: string;
  name: string;
  category: string;
  status: number;
  avatar: string;
  channel_orders: InactiveChannelOrders;
  tags: number[];
}

export interface InactiveChannelOrders {
  completed: number;
  canceled_rejected: number;
}

//
// export interface IModerationChannelBlogger {
//   page: number;
//   elements: number;
//   channels: IModerationChannel[];
// }

export interface IModerationChannel {
  id: string;
  name: string;
  category: string;
  avatar: string;
  created: string;
}

//
// export interface IModerationRejectChannelBlogger {
//   page: number;
//   elements: number;
//   channels: IModerationRejectChannel[];
// }

export interface IModerationRejectChannel {
  id: string;
  name: string;
  category: string;
  avatar: string;
  rejected_date: string;
  reapplication_date: string;
}

//
// export interface IBlockedChannelBlogger {
//   page: number;
//   elements: number;
//   channels: IBlockedChannel[];
// }

export interface IBlockedChannel {
  id: string;
  name: string;
  category: string;
  avatar: string;
  blocked_date: string;
}
