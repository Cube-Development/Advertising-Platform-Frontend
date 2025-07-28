import {
  IAdminChannelData,
  IAdminComplaintData,
  IAdminComplaintInfoData,
  IAdminReviewData,
  IAdminTransactionData,
  IAdminUserData,
} from "@entities/admin";
import { IAdminProfileData } from "@entities/admin/types/profile";
import {
  channelStatusFilter,
  IActiveChannel,
  IBlockedChannel,
  IChannelBlogger,
  IInactiveChannel,
  IModerationChannel,
  IModerationRejectChannel,
  IReviewCard,
} from "@entities/channel";
import { IBloggerOffers } from "@entities/offer";
import {
  IAdvManagerProjectsDev,
  IAdvManagerProjectsDevCard,
  IAdvProjects,
  IAdvSubprojects,
  IAdvTemplateProjects,
  IFilterSearch,
  IManagerNewProjects,
  IManagerProjects,
} from "@entities/project";
import { IUserDataNew } from "@entities/user";

export const viewsAdvProjects = {
  count: 29,
  values: [
    {
      type: "my_project",
      count: 13,
      value: [
        {
          status: "my_project_active",
          count: 1,
        },
        {
          status: "completed",
          count: 2,
        },
      ],
    },
    {
      type: "manager_project",
      count: 22,
      value: [
        {
          status: "manager_project_active",
          count: 5,
        },
        {
          status: "develop",
          count: 6,
        },
        {
          status: "request_approve",
          count: 7,
        },
        {
          status: "completed",
          count: 8,
        },
      ],
    },
  ],
};

export const viewsWalletTransactions = {
  count: 5,
  values: [{ type: "transactions", count: 5, value: [] }],
};

export const viewsBloggerOffers = {
  count: 20,
  values: [
    {
      type: "my_orders",
      count: 0,
      value: [
        {
          status: "active",
          count: 0,
        },
        {
          status: "wait",
          count: 0,
        },
        {
          status: "completed",
          count: 0,
        },
        {
          status: "canceled",
          count: 0,
        },
        {
          status: "on_moderation",
          count: 0,
        },
        {
          status: "rejected",
          count: 0,
        },
      ],
    },
  ],
};

export const viewsBloggerChannels = {
  count: 15,
  values: [
    {
      type: "my_channels",
      count: 0,
      value: [
        {
          status: "active",
          count: 0,
        },
        {
          status: "moderation",
          count: 0,
        },
        {
          status: "rejected",
          count: 0,
        },
        {
          status: "banned",
          count: 0,
        },
      ],
    },
  ],
};

export const AdminProfile: IAdminProfileData = {
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
  name: "Maftuna R.",
};

export const MOCK_ADD_SELF_EMPLOYED = {
  user_id: "65eb2033-02e8-4165-a209-e29919403fa5",
  legal_id: "380c4bbf-94f7-4ec1-9441-2232af06af65",
  type_legal: 3,
  name: "фывфыв",
  checking_account: "11111111111111111111",
  bank_name: "фыв",
  bank_mfo: 12345,
  phone: "998973452134",
  email: "dami@gmail.com",
  PNFL: 12345678901235,
  registration_number: 123456789,
  registration_date: "22.09.2022",
};

export const MOCK_ADD_LEGAL = {
  user_id: "65eb2033-02e8-4165-a209-e29919403fa5",
  legal_id: "73159baa-b35d-4646-ad05-55d69162e367",
  type_legal: 1,
  name: "Роман",
  address: "Амир Темур шоҳ кўчас",
  INN: 546546546,
  checking_account: "99999999999999999999",
  bank_name: "Ipoteka Bank",
  bank_mfo: 55555,
  phone: "998936285130",
  email: "iswift977@gmail.com",
};

export const MOCK_PROFILE = {
  email: "sample@gmail.com",
  phone: "+998901234567",
  name: "Иван Петров",
  registrationDate: "22.02.2024",
  organization: {
    type: "SelfEmployed",
    pinfl: "12345678901234",
    status: "active",
  },
};

export const MOCK_SITE_CATALOG = [
  {
    id: "9a7b2f9f-21d4-4c1d-b045-0ffb12db5a1a",
    platform: 4,
    name: "Dario",
    description:
      "Новостной канал, освещающий актуальные события Узбекистана и мира",
    rate: 4.9,
    category: "Новости",
    avatar: "",
    subscribers: 83000,
    male: 50,
    female: 50,
    format: [
      {
        format: 8,
        format_name: {
          small: "Сайт",
          big: "Сайт",
        },
        price: 8500000,
        views: 83000,
        er: 0.0975,
        cpv: 102.41,
      },
      {
        format: 6,
        format_name: {
          small: "Telegram",
          big: "Telegram",
        },
        price: 6200000,
        views: 82000,
        er: 0.0988,
        cpv: 75.61,
      },
      {
        format: 7,
        format_name: {
          small: "Instagram",
          big: "Instagram",
        },
        price: 2800000,
        views: 28000,
        er: 0.1,
        cpv: 100.0,
      },
    ],
    selected_format: [],
    channel_languages: [1, 2, 3],
  },
  {
    id: "5f50f1e9-4e2e-4b5a-9e3f-0e8231b7181c",
    platform: 4,
    name: "Kun.uz",
    description:
      "Новостной канал Узбекистана, публикующий актуальные материалы.",
    rate: 4.9,
    category: "Новости",
    avatar: "",
    subscribers: 568565,
    male: 50,
    female: 50,
    format: [
      {
        format: 8,
        format_name: { small: "Сайт", big: "Сайт" },
        price: 9800000,
        views: 282000,
        er: 0.282,
        cpv: 34.75,
      },
      {
        format: 7,
        format_name: { small: "Telegram", big: "Telegram" },
        price: 27000000,
        views: 332777,
        er: 0.3328,
        cpv: 81.16,
      },
      {
        format: 6,
        format_name: { small: "Instagram", big: "Instagram" },
        price: 9500000,
        views: 568565,
        er: 0.5686,
        cpv: 16.7,
      },
    ],
    selected_format: [],
    channel_languages: [1, 2, 3],
  },
  {
    id: "2f3eea80-b64e-48d3-8cf3-5ea54b93f3f2",
    platform: 4,
    name: "Gazeta.uz",
    description:
      "Новостной канал Узбекистана, публикующий актуальные материалы.",
    rate: 4.9,
    category: "Новости",
    avatar: "",
    subscribers: 92688,
    male: 50,
    female: 50,
    format: [
      {
        format: 8,
        format_name: { small: "Сайт", big: "Сайт" },
        price: 9200000,
        views: 92588,
        er: 0.0926,
        cpv: 99.38,
      },
      {
        format: 6,
        format_name: { small: "Telegram", big: "Telegram" },
        price: 6000000,
        views: 21688,
        er: 0.0217,
        cpv: 276.67,
      },
      {
        format: 7,
        format_name: { small: "Instagram", big: "Instagram" },
        price: 8000000,
        views: 13800,
        er: 0.0138,
        cpv: 579.71,
      },
    ],
    selected_format: [],
    channel_languages: [1, 2, 3],
  },
  {
    id: "75a31c2f-3cfc-4b47-a818-d77c9a2e5d52",
    platform: 4,
    name: "Uznews",
    description:
      "Новостной канал Узбекистана, публикующий актуальные материалы.",
    rate: 4.9,
    category: "Новости",
    avatar: "",
    subscribers: 245884,
    male: 50,
    female: 50,
    format: [
      {
        format: 8,
        format_name: { small: "Сайт", big: "Сайт" },
        price: 5800000,
        views: 64000,
        er: 0.064,
        cpv: 90.63,
      },
      {
        format: 7,
        format_name: { small: "Telegram", big: "Telegram" },
        price: 7800000,
        views: 20631,
        er: 0.0206,
        cpv: 378.26,
      },
      {
        format: 6,
        format_name: { small: "Instagram", big: "Instagram" },
        price: 7800000,
        views: 153000,
        er: 0.153,
        cpv: 50.98,
      },
    ],
    selected_format: [],
    channel_languages: [1, 2, 3],
  },
  {
    id: "c43b2c24-8881-4c17-a168-9241865cb0f4",
    platform: 4,
    name: "Podrobno.uz",
    description:
      "Новостной канал Узбекистана, публикующий актуальные материалы.",
    rate: 4.9,
    category: "Новости",
    avatar: "",
    subscribers: 167000,
    male: 50,
    female: 50,
    format: [
      {
        format: 8,
        format_name: { small: "Сайт", big: "Сайт" },
        price: 4800000,
        views: 27090,
        er: 0.0271,
        cpv: 177.2,
      },
      {
        format: 7,
        format_name: { small: "Telegram", big: "Telegram" },
        price: 3300000,
        views: 12427,
        er: 0.0124,
        cpv: 265.56,
      },
      {
        format: 6,
        format_name: { small: "Instagram", big: "Instagram" },
        price: 2000000,
        views: 167000,
        er: 0.167,
        cpv: 11.98,
      },
    ],
    selected_format: [],
    channel_languages: [1, 2, 3],
  },
];

export const MOCK_CREATE_ORDERS = [
  {
    id: "caa0943f-4593-47d8-907a-33372710a711",
    channel_url: "https://www.instagram.com/im.merem/",
    name: "im.merem",
    category: "Блоги",
    avatar:
      "https://iswift2bucket.s3.amazonaws.com/avatar/17841439861600917.jpg?response-cache-control=no-cache%2C%20no-store%2C%20must-revalidate&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYTCOAI7V3EBLTQ4S%2F20250717%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250717T141926Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=fed84f21a39cd92787d9c422fa0a37f2bc88a3925803daae729ec104bf5e95fd",
    platform: 1,
    post_type: 4,
  },
  {
    id: "caa0943f-4593-47d8-907a-33372710a711",
    channel_url: "https://www.instagram.com/im.merem/",
    name: "im.merem",
    category: "Блоги",
    avatar:
      "https://iswift2bucket.s3.amazonaws.com/avatar/17841439861600917.jpg?response-cache-control=no-cache%2C%20no-store%2C%20must-revalidate&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYTCOAI7V3EBLTQ4S%2F20250717%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250717T141926Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=fed84f21a39cd92787d9c422fa0a37f2bc88a3925803daae729ec104bf5e95fd",
    platform: 4,
    post_type: 5,
  },
  {
    id: "44b4554a-ead8-4c72-bd88-40721cb6ed0d",
    channel_url: "https://t.me/muhrim",
    name: "Muhrim / Муҳрим",
    category: "Блоги",
    avatar:
      "https://iswift2bucket.s3.amazonaws.com/avatar/-1001102452995.jpg?response-cache-control=no-cache%2C%20no-store%2C%20must-revalidate&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYTCOAI7V3EBLTQ4S%2F20250717%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250717T141927Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8e23ee86b554f7eb8febf8494b965889d4c4afcfb5678a2929102ece7239d76f",
    platform: 4,
    post_type: 6,
  },
  {
    id: "44b4554a-ead8-4c72-bd88-50721cb6ed0d",
    channel_url: "https://t.me/muhrim",
    name: "Muhrim / Муҳрим",
    category: "Блоги",
    avatar:
      "https://iswift2bucket.s3.amazonaws.com/avatar/-1001102452995.jpg?response-cache-control=no-cache%2C%20no-store%2C%20must-revalidate&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYTCOAI7V3EBLTQ4S%2F20250717%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250717T141927Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8e23ee86b554f7eb8febf8494b965889d4c4afcfb5678a2929102ece7239d76f",
    platform: 4,
    post_type: 7,
  },
];
