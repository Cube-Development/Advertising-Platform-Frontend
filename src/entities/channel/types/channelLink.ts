import {
  platformTypesNum,
  platformTypesStr,
  PostTypesNum,
} from "@entities/platform";

export interface IChannelLink {
  id: platformTypesNum;
  name: string;
  type: platformTypesStr;
  default_value: string;
  post_types: IPostTypes[];
}

export interface IPostTypes {
  id: PostTypesNum;
  name: string;
}

export interface IIdentificationParams {
  link: string;
  platform: IChannelLink;
  checked?: boolean;
}
