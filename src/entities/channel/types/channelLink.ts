import { platformTypesNum, platformTypesStr } from "@entities/platform";

export interface IChannelLink {
  name: string;
  type: platformTypesStr;
  default_value: string;
  id: platformTypesNum;
}
