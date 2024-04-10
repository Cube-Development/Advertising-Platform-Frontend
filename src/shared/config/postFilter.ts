import { platformTypesStr, platformTypesNum } from "./platformTypes";

export const platformTypes = [
  {
    name: "platform_types.telegram.name",
    type: platformTypesStr.telegram,
    id: platformTypesNum.telegram,
    default_value: "platform_types.telegram.default_value",
  },
  {
    name: "platform_types.instagram.name",
    type: platformTypesStr.instagram,
    id: platformTypesNum.instagram,
    default_value: "platform_types.instagram.default_value",
  },
  {
    name: "platform_types.youtube.name",
    type: platformTypesStr.youtube,
    id: platformTypesNum.youtube,
    default_value: "platform_types.youtube.default_value",
  },
];
