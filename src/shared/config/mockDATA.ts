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
    status: 1,
  },
};
