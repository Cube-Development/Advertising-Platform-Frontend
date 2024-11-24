import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";

export interface IViewBloggerOrder {
  count: number;
  values: IOfferType[];
}

interface IOfferType {
  type: string;
  count: number;
  value: IOfferStatus[];
}

interface IOfferStatus {
  status: offerStatusFilter;
  count: number;
}

export interface IViewBloggerChannel {
  count: number;
  values: IChannelType[];
}

interface IChannelType {
  type: string;
  count: number;
  value: IChannelStatus[];
}

interface IChannelStatus {
  status: channelStatusFilter;
  count: number;
}
