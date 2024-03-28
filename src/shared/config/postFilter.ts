export enum platformFilter {
    telegram = "telegram",
    instagram = "instagram",
    youtube = "youtube",
  }
  

  export const platformTypes = [
    {
      name: "create_order.create.filter.telegram",
      type: platformFilter.telegram,
      id: 1
    },
    {
        name: "create_order.create.filter.instagram",
        type: platformFilter.instagram,
        id: 2
    },
    {
        name: "create_order.create.filter.youtube",
        type: platformFilter.youtube,
        id: 3
    },
  ];