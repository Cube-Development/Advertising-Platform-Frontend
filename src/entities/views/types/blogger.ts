import { ENUM_CHANNEL_STATUS } from "@entities/channel";
import { ENUM_OFFER_STATUS } from "@entities/offer";

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
  status: ENUM_OFFER_STATUS;
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
  status: ENUM_CHANNEL_STATUS;
  count: number;
}
