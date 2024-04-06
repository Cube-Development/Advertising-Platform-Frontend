export enum platformFilter {
  telegram = "telegram",
  instagram = "instagram",
  youtube = "youtube",
}

export const platformTypes = [
  {
    name: "platform_types.telegram.name",
    type: platformFilter.telegram,
    id: 1,
    default_value: "platform_types.telegram.default_value",
  },
  {
    name: "platform_types.instagram.name",
    type: platformFilter.instagram,
    id: 2,
    default_value: "platform_types.instagram.default_value",
  },
  {
    name: "platform_types.youtube.name",
    type: platformFilter.youtube,
    id: 3,
    default_value: "platform_types.youtube.default_value",
  },
];
