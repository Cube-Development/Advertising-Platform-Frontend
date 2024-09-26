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

export const managerActiveCARDS: IManagerProjects = {
  page: 1,
  elements: 1,
  projects: [
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur. Dignissim egestas suspendisse quam ac leo viverra aliquet tortor ullamcorper. Sodales adipiscing faucibus ullamcorper vivamus. Id volutpat eu mattis ultrices id felis tristique venenatis. In tellus amet nibh viverra magna bibendum sed pellentesque tincidunt.Lorem ipsum dolor sit amet consectetur. Dignissim egestas suspendisse quam ac leo viverra aliquet tortor ullamcorper. Sodales adipiscing faucibus ullamcorper vivamus. Id volutpat eu mattis ultrices id felis tristique venenatis. In tellus amet nibh viverra magna bibendum sed pellentesque tincidunt.Lorem ipsum dolor sit amet consectetur. Dignissim egestas suspendisse quam ac leo viverra aliquet tortor ullamcorper. Sodales adipiscing faucibus ullamcorper vivamus. Id volutpat eu mattis ultrices id felis tristique venenatis. In tellus amet nibh viverra magna bibendum sed pellentesque tincidunt.quam ac leo viverra aliquet tortor ullamcorper. Sodales adipiscing faucibus ullamcorper vivamus. Id volutpat eu mattis ultrices id felis tristique venenatis. ",
      links: [
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
      ],
      files: [
        {
          content:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s",
          content_type: 2,
        },
        {
          content:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO06pOmBndDO0isERXC_9xx43Y3YB7rDDnBg&s",
          content_type: 2,
        },
        {
          content:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s",
          content_type: 2,
        },
        {
          content:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO06pOmBndDO0isERXC_9xx43Y3YB7rDDnBg&s",
          content_type: 2,
        },
        {
          content:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s",
          content_type: 2,
        },
        {
          content:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO06pOmBndDO0isERXC_9xx43Y3YB7rDDnBg&s",
          content_type: 2,
        },
      ],
      id: "31111111wdsdfsdfsdf6",
      identifier: 1111111,
      tariff_date: "20.01.2024",
      tariff_name: "Начальный",
      project_name: "КУБИКИ",
      project_id: "КУБИКИ",
      orders: 10,
      views: 10000,
      budget: 9990000,
      completed: 200,
      canceled_rejected: 1000,
      wait: 500,
      in_progress: 300,
      moderation: 100,
      subcards: [
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 4,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 3,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 1,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 9,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 2,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 10,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
      ],
    },
    {
      id: "3111sdfsdfsdf11116",
      identifier: 1111111,
      tariff_date: "20.01.2024",
      tariff_name: "Начальный",
      project_name: "КУБИКИ",
      project_id: "КУБИКИ",
      orders: 10,
      views: 10000,
      budget: 9990000,
      completed: 2,
      canceled_rejected: 10,
      wait: 5,
      in_progress: 3,
      moderation: 1,
      subcards: [
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 4,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 3,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 1,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 9,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 2,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 10,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
      ],
    },
    {
      id: "3111werewrwer11116",
      identifier: 1111111,
      tariff_date: "20.01.2024",
      tariff_name: "Начальный",
      project_name: "КУБИКИ",
      project_id: "КУБИКИ",
      orders: 10,
      views: 10000,
      budget: 9990000,
      completed: 2,
      canceled_rejected: 10,
      wait: 5,
      in_progress: 3,
      moderation: 1,
      subcards: [
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 4,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 3,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 1,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 9,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 2,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 10,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
      ],
    },
  ],
};

export const managerCompletedCARDS: IManagerProjects = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "311111116",
      identifier: 1111111,
      tariff_date: "20.01.2024",
      tariff_name: "Начальный",
      project_name: "КУБИКИ",
      project_id: "КУБИКИ",
      orders: 10,
      views: 10000,
      budget: 9990000,
      completed: 2,
      canceled_rejected: 10,
      wait: 5,
      in_progress: 3,
      moderation: 1,
      report: true,
      subcards: [
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 4,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 3,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 5,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
      ],
    },
    {
      id: "311111116",
      identifier: 1111111,
      tariff_date: "20.01.2024",
      tariff_name: "Начальный",
      project_name: "КУБИКИ",
      project_id: "КУБИКИ",
      orders: 10,
      views: 10000,
      budget: 9990000,
      completed: 2,
      canceled_rejected: 10,
      wait: 5,
      in_progress: 3,
      moderation: 1,
      subcards: [
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 4,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 3,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 5,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
      ],
    },
  ],
};

export const managerAgreedCARDS: IManagerProjects = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "311111116",
      identifier: 1111111,
      tariff_date: "20.01.2024",
      tariff_name: "Начальный",
      project_name: "КУБИКИ",
      project_id: "КУБИКИ",
      orders: 10,
      views: 10000,
      budget: 9990000,
      completed: 2,
      is_request_approve: true,
      canceled_rejected: 10,
      wait: 5,
      in_progress: 3,
      moderation: 1,
      subcards: [
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 11,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 13,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
      ],
    },

    {
      id: "311111116",
      identifier: 2222111,
      tariff_date: "23.01.2024",
      tariff_name: "Начальный",
      project_name: "КУБИКИ",
      project_id: "КУБИКИ",
      orders: 10,
      views: 10360,
      budget: 9990220,
      completed: 2,
      canceled_rejected: 10,
      wait: 5,
      is_request_approve: false,
      in_progress: 3,
      moderation: 1,
      subcards: [
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 12,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
        {
          id: "1",
          date_coming: "22.10.2022",
          name: "BVZ",
          order_status: "BVZ",
          category: "CAtegory",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
          api_status: 12,
          publish_date: {
            date_from: "20.10.2023",
            date_to: "22.10.2023",
          },
          publish_time: {
            time_from: "17:00",
            time_to: "19:00",
          },
          format: {
            small: "1/24",
            big: "1 час в топе 24 в ленте",
          },
          price: 202222222,
          subscribers: 333333333,
          views: 44444,
          er: 1.2,
          cpv: 22.2,
          male: 30,
          female: 70,
        },
      ],
    },
  ],
};

export const managerNewCARDS: IManagerNewProjects = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "31231132",
      project_id: "fdsfsdf",
      identifier: 31231132,
      tariff_date: "20.01.2024",
      tariff_name: "Комплексный",
      budget: 99999999,
      comment:
        "Lorem ipsum dolor sit amet consectetur. Dignissim egestas suspendisse quam ac leo viverra aliquet tortor ullamcorper. Sodales adipiscing faucibus ullamcorper vivamus. Id volutpat eu mattis ultrices id felis tristique venenatis. In tellus amet nibh viverra magna bibendum sed pellentesque tincidunt.Lorem ipsum dolor sit amet consectetur. Dignissim egestas suspendisse quam ac leo viverra aliquet tortor ullamcorper. Sodales adipiscing faucibus ullamcorper vivamus. Id volutpat eu mattis ultrices id felis tristique venenatis. In tellus amet nibh viverra magna bibendum sed pellentesque tincidunt.Lorem ipsum dolor sit amet consectetur. Dignissim egestas suspendisse quam ac leo viverra aliquet tortor ullamcorper. Sodales adipiscing faucibus ullamcorper vivamus. Id volutpat eu mattis ultrices id felis tristique venenatis. In tellus amet nibh viverra magna bibendum sed pellentesque tincidunt.quam ac leo viverra aliquet tortor ullamcorper. Sodales adipiscing faucibus ullamcorper vivamus. Id volutpat eu mattis ultrices id felis tristique venenatis. ",
      links: [
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
      ],
      files: [
        {
          content:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s",
          content_type: 2,
        },
        {
          content:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO06pOmBndDO0isERXC_9xx43Y3YB7rDDnBg&s",
          content_type: 2,
        },
        {
          content:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s",
          content_type: 2,
        },
        {
          content:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO06pOmBndDO0isERXC_9xx43Y3YB7rDDnBg&s",
          content_type: 2,
        },
        {
          content:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s",
          content_type: 2,
        },
        {
          content:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO06pOmBndDO0isERXC_9xx43Y3YB7rDDnBg&s",
          content_type: 2,
        },
        // {
        //   content:
        //   "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
        //   content_type: 2,
        // },
      ],
    },
  ],
};

export const advMyProjectActiveCARDS = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "147c8ee0-7f3e-4c71-9a35-50df6c50c273",
      identifier: 294600372731,
      created: "10.09.2024",
      name: "SEX",
      count_channels: 0,
      views: 12,
      budget: 0.0,
      remainder: 0.0,
      completed: 0,
      canceled_rejected: 0,
      wait: 0,
      in_progress: 0,
      moderation: 0,
    },
    {
      id: "147c8ee0-7f3e-4c71-9a35-50df6c50c273",
      identifier: 294600372731,
      created: "10.09.2024",
      name: "SEX",
      count_channels: 0,
      views: 12,
      budget: 0.0,
      remainder: 0.0,
      completed: 0,
      canceled_rejected: 0,
      wait: 0,
      in_progress: 0,
      moderation: 0,
    },
    {
      id: "147c8ee0-7f3e-4c71-9a35-50df6c50c273",
      identifier: 294600372731,
      created: "10.09.2024",
      name: "SEX",
      count_channels: 0,
      views: 12,
      budget: 0.0,
      remainder: 0.0,
      completed: 0,
      canceled_rejected: 0,
      wait: 0,
      in_progress: 0,
      moderation: 0,
    },
  ],
};
// export const advMyProjectActiveCARDS: IAdvProjects = {
//   page: 1,
//   elements: 1,
//   projects: [
//     {
//       id: "31111111",
//       created: "20.01.2024",
//       tarif: "Начальный",
//       name: "КУБИКИ",
//       count_channels: 10,
//       views: 10000,
//       budget: 9990000,
//       completed: 2,
//       canceled_rejected: 10,
//       wait: 5,
//       in_progress: 3,
//       moderation: 1,
//       subcard: [
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 4,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 3,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 9,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 2,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 10,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//       ],
//     },
//   ],
// };

// export const advMyProjectCompleteCARDS: IAdvProjects = {
//   page: 1,
//   elements: 1,
//   projects: [
//     {
//       id: "31111111",
//       created: "20.01.2024",
//       tarif: "Начальный",
//       name: "КУБИКИ",
//       count_channels: 10,
//       views: 10000,
//       budget: 9990000,
//       completed: 2,
//       canceled_rejected: 10,
//       wait: 5,
//       in_progress: 3,
//       moderation: 1,
//       subcard: [
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 4,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 3,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//       ],
//     },
//   ],
// };

// export const advManagerProjectActiveCARDS: IAdvProjects = {
//   page: 1,
//   elements: 1,
//   projects: [
//     {
//       id: "31111111",
//       created: "20.01.2024",
//       tarif: "Начальный",
//       name: "КУБИКИ",
//       count_channels: 10,
//       views: 10000,
//       budget: 9990000,
//       completed: 2,
//       canceled_rejected: 10,
//       wait: 5,
//       in_progress: 3,
//       moderation: 1,
//       subcard: [
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 4,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 3,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 9,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 1,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 2,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//       ],
//     },
//   ],
// };

// export const advManagerProjectAgreedCARDS: IAdvProjects = {
//   page: 1,
//   elements: 1,
//   projects: [
//     {
//       id: "31111111",
//       created: "20.01.2024",
//       tarif: "Начальный",
//       name: "КУБИКИ",
//       count_channels: 10,
//       views: 10000,
//       budget: 9990000,
//       completed: 2,
//       canceled_rejected: 10,
//       wait: 5,
//       in_progress: 3,
//       moderation: 1,
//       subcard: [
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 11,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//       ],
//     },
//   ],
// };

// export const advManagerProjectCompleteCARDS: IAdvProjects = {
//   page: 1,
//   elements: 1,
//   projects: [
//     {
//       id: "31111111",
//       created: "20.01.2024",
//       tarif: "Начальный",
//       name: "КУБИКИ",
//       count_channels: 10,
//       views: 10000,
//       budget: 9990000,
//       completed: 2,
//       canceled_rejected: 10,
//       wait: 5,
//       in_progress: 3,
//       moderation: 1,
//       subcard: [
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 4,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 3,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//       ],
//     },
//   ],
// };

// export const advManagerProjectOnDevelopCARDS: IAdvManagerProjectsDev = {
//   page: 1,
//   elements: 1,
//   projects: [
//     {
//       id: "31111111",
//       created: "20.01.2024",
//       tarif: "Начальный",
//       name: "КУБИКИ",
//       budget: 9990000,
//     },
//     {
//       id: "31111111",
//       created: "20.01.2024",
//       tarif: "Начальный",
//       name: "КУБИКИ",
//       budget: 9990000,
//     },
//     {
//       id: "31111111",
//       created: "20.01.2024",
//       tarif: "Начальный",
//       name: "КУБИКИ",
//       budget: 9990000,
//     },
//     {
//       id: "31111111",
//       created: "20.01.2024",
//       tarif: "Начальный",
//       name: "КУБИКИ",
//       budget: 9990000,
//     },
//   ],
// };

// export const advSavedProjectCompleteCARDS: IAdvProjects = {
//   page: 1,
//   elements: 1,
//   projects: [
//     {
//       id: "31111111",
//       created: "20.01.2024",
//       tarif: "Начальный",
//       name: "КУБИКИ",
//       count_channels: 10,
//       views: 10000,
//       budget: 9990000,
//       completed: 2,
//       canceled_rejected: 10,
//       wait: 5,
//       in_progress: 3,
//       moderation: 1,
//       subcard: [
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 4,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//         {
//           id: "1",
//           date_coming: "22.10.2022",
//           name: "BVZ",
//           order_status: "BVZ",
//           category: "CAtegory",
//           avatar:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
//           api_status: 3,
//           publish_date: {
//             date_from: "20.10.2023",
//             date_to: "22.10.2023",
//           },
//           publish_time: {
//             time_from: "17:00",
//             time_to: "19:00",
//           },
//           format: {
//             small: "1/24",
//             big: "1 час в топе 24 в ленте",
//           },
//           price: 202222222,
//           subscribers: 333333333,
//           views: 44444,
//           er: 1.2,
//           cpv: 22.2,
//           male: 30,
//           female: 70,
//         },
//       ],
//     },
//   ],
// };

// export const STATS: IChannelStatistics = {
//   orders: 1034,
//   subs: 3500554,
//   views: 22232,
//   posts: 8,
//   er: 15.4,
//   cpv: 1000,
// };

// export const REVIEWS: IReviewCard[] = [
//   {
//     avatar:
//       "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
//     email: "email@gmail.com",
//     date: "18.08.2022",
//     rate: 5,
//     text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
//     email: "222email@gmail.com",
//     date: "15.08.2022",
//     rate: 5,
//     text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
//     email: "333email@gmail.com",
//     date: "1.08.2022",
//     rate: 5,
//     text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
//     email: "444email@gmail.com",
//     date: "28.07.2022",
//     rate: 5,
//     text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
//     email: "email@gmail.com",
//     date: "18.08.2022",
//     rate: 5,
//     text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
//     email: "222email@gmail.com",
//     date: "15.08.2022",
//     rate: 5,
//     text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
//     email: "333email@gmail.com",
//     date: "1.08.2022",
//     rate: 5,
//     text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
//     email: "444email@gmail.com",
//     date: "28.07.2022",
//     rate: 5,
//     text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
//     email: "email@gmail.com",
//     date: "18.08.2022",
//     rate: 5,
//     text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
//     email: "222email@gmail.com",
//     date: "15.08.2022",
//     rate: 5,
//     text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
//     email: "333email@gmail.com",
//     date: "1.08.2022",
//     rate: 5,
//     text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
//     email: "444email@gmail.com",
//     date: "28.07.2022",
//     rate: 5,
//     text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
//   },
// ];

// export const REVIEWS5: IReviewCard[] = [
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "emily.johnson@example.com",
//     date: "25.08.2024",
//     rate: 5,
//     text: "Реклама на этом канале превзошла все ожидания! Отличный охват и огромное количество положительных откликов. Кампания прошла успешно, и я полностью доволен результатами. Определенно рекомендую!",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "david.martin@example.com",
//     date: "20.08.2024",
//     rate: 5,
//     text: "Великолепные результаты рекламы! Охват был значительно больше, чем ожидалось, и интерес к нашему продукту вырос в разы. Отличная работа и очень довольны итогами кампании!",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "sophie.wilson@example.com",
//     date: "15.08.2024",
//     rate: 5,
//     text: "Рекламная кампания на этом канале оказалась полностью успешной. Превзошла все ожидания с точки зрения охвата и вовлеченности. Отличное сотрудничество и отличные результаты.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "matthew.clark@example.com",
//     date: "10.08.2024",
//     rate: 5,
//     text: "Прекрасные результаты! Реклама была размещена отлично, и охват был просто невероятным. Рекламная кампания привлекла много клиентов и обеспечила отличные результаты. Определенно буду продолжать сотрудничество.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "olivia.baker@example.com",
//     date: "05.08.2024",
//     rate: 5,
//     text: "Огромное спасибо за отличное размещение рекламы! Охват оказался намного лучше, чем ожидалось, и результаты были впечатляющими. Это было именно то, что нам нужно было. Очень довольны и рекомендуем!",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "emily.johnson@example.com",
//     date: "25.08.2024",
//     rate: 5,
//     text: "Реклама на этом канале превзошла все ожидания! Отличный охват и огромное количество положительных откликов. Кампания прошла успешно, и я полностью доволен результатами. Определенно рекомендую!",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "david.martin@example.com",
//     date: "20.08.2024",
//     rate: 5,
//     text: "Великолепные результаты рекламы! Охват был значительно больше, чем ожидалось, и интерес к нашему продукту вырос в разы. Отличная работа и очень довольны итогами кампании!",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "sophie.wilson@example.com",
//     date: "15.08.2024",
//     rate: 5,
//     text: "Рекламная кампания на этом канале оказалась полностью успешной. Превзошла все ожидания с точки зрения охвата и вовлеченности. Отличное сотрудничество и отличные результаты.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "matthew.clark@example.com",
//     date: "10.08.2024",
//     rate: 5,
//     text: "Прекрасные результаты! Реклама была размещена отлично, и охват был просто невероятным. Рекламная кампания привлекла много клиентов и обеспечила отличные результаты. Определенно буду продолжать сотрудничество.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "olivia.baker@example.com",
//     date: "05.08.2024",
//     rate: 5,
//     text: "Огромное спасибо за отличное размещение рекламы! Охват оказался намного лучше, чем ожидалось, и результаты были впечатляющими. Это было именно то, что нам нужно было. Очень довольны и рекомендуем!",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "emily.johnson@example.com",
//     date: "25.08.2024",
//     rate: 5,
//     text: "Реклама на этом канале превзошла все ожидания! Отличный охват и огромное количество положительных откликов. Кампания прошла успешно, и я полностью доволен результатами. Определенно рекомендую!",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "david.martin@example.com",
//     date: "20.08.2024",
//     rate: 5,
//     text: "Великолепные результаты рекламы! Охват был значительно больше, чем ожидалось, и интерес к нашему продукту вырос в разы. Отличная работа и очень довольны итогами кампании!",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "sophie.wilson@example.com",
//     date: "15.08.2024",
//     rate: 5,
//     text: "Рекламная кампания на этом канале оказалась полностью успешной. Превзошла все ожидания с точки зрения охвата и вовлеченности. Отличное сотрудничество и отличные результаты.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "matthew.clark@example.com",
//     date: "10.08.2024",
//     rate: 5,
//     text: "Прекрасные результаты! Реклама была размещена отлично, и охват был просто невероятным. Рекламная кампания привлекла много клиентов и обеспечила отличные результаты. Определенно буду продолжать сотрудничество.",
//   },
//   {
//     avatar:
//       "https://i.pinimg.com/236x/9a/2e/90/9a2e90d99e0b8f4ce9c945889ac608d8.jpg",
//     email: "olivia.baker@example.com",
//     date: "05.08.2024",
//     rate: 5,
//     text: "Огромное спасибо за отличное размещение рекламы! Охват оказался намного лучше, чем ожидалось, и результаты были впечатляющими. Это было именно то, что нам нужно было. Очень довольны и рекомендуем!",
//   },
// ];

// export const REVIEWS4: IReviewCard[] = [
//   {
//     avatar:
//       "https://cdn.pixabay.com/photo/2017/10/03/07/01/sky-2811461_1280.jpg",
//     email: "john.doe@example.com",
//     date: "25.08.2024",
//     rate: 4,
//     text: "Канал интересный и полезный, но иногда информация выходит с задержкой. Контент качественный, но хотелось бы более регулярных обновлений и разнообразия. В целом, хороший выбор для тех, кто хочет быть в курсе событий.",
//   },
//   {
//     avatar:
//       "https://cdn.pixabay.com/photo/2017/10/03/07/01/sky-2811461_1280.jpg",
//     email: "jane.smith@example.com",
//     date: "20.08.2024",
//     rate: 4,
//     text: "Хороший канал с качественным контентом. Однако, иногда публикации выходят с задержкой. В целом, информация полезная и актуальная, но хотелось бы увидеть больше регулярных обновлений.",
//   },
//   {
//     avatar:
//       "https://cdn.pixabay.com/photo/2017/10/03/07/01/sky-2811461_1280.jpg",
//     email: "michael.brown@example.com",
//     date: "15.08.2024",
//     rate: 4,
//     text: "Канал предоставляет полезную информацию, но есть время, когда контент появляется не так часто, как хотелось бы. В целом, это хороший ресурс, и я рекомендую его для получения актуальных данных.",
//   },
//   {
//     avatar:
//       "https://cdn.pixabay.com/photo/2017/10/03/07/01/sky-2811461_1280.jpg",
//     email: "emily.jones@example.com",
//     date: "10.08.2024",
//     rate: 4,
//     text: "Интересный канал с хорошими обзорами. Хотелось бы видеть более частые обновления и больше разнообразных тем. В целом, я доволен качеством предоставляемой информации.",
//   },
//   {
//     avatar:
//       "https://cdn.pixabay.com/photo/2017/10/03/07/01/sky-2811461_1280.jpg",
//     email: "jane.smith@example.com",
//     date: "20.08.2024",
//     rate: 4,
//     text: "Хороший канал с качественным контентом. Однако, иногда публикации выходят с задержкой. В целом, информация полезная и актуальная, но хотелось бы увидеть больше регулярных обновлений.",
//   },
//   {
//     avatar:
//       "https://cdn.pixabay.com/photo/2017/10/03/07/01/sky-2811461_1280.jpg",
//     email: "michael.brown@example.com",
//     date: "15.08.2024",
//     rate: 4,
//     text: "Канал предоставляет полезную информацию, но есть время, когда контент появляется не так часто, как хотелось бы. В целом, это хороший ресурс, и я рекомендую его для получения актуальных данных.",
//   },
//   {
//     avatar:
//       "https://cdn.pixabay.com/photo/2017/10/03/07/01/sky-2811461_1280.jpg",
//     email: "emily.jones@example.com",
//     date: "10.08.2024",
//     rate: 4,
//     text: "Интересный канал с хорошими обзорами. Хотелось бы видеть более частые обновления и больше разнообразных тем. В целом, я доволен качеством предоставляемой информации.",
//   },
//   {
//     avatar:
//       "https://cdn.pixabay.com/photo/2017/10/03/07/01/sky-2811461_1280.jpg",
//     email: "david.wilson@example.com",
//     date: "05.08.2024",
//     rate: 4,
//     text: "Канал предоставляет качественный контент, но публикации иногда выходят с опозданием. В целом, информация полезная и интересная, но хотелось бы улучшить регулярность обновлений.",
//   },
// ];

// export const REVIEWS3: IReviewCard[] = [
//   {
//     avatar:
//       "https://flomaster.top/uploads/posts/2022-06/1654633605_5-flomaster-club-p-zheltie-risunki-legkie-krasivo-5.jpg",
//     email: "alice.miller@example.com",
//     date: "23.08.2024",
//     rate: 3,
//     text: "Канал имеет потенциал, но контент часто повторяется, и обновления приходят не регулярно. Информация может быть полезной, но требуется больше разнообразия и своевременности.",
//   },
//   {
//     avatar:
//       "https://flomaster.top/uploads/posts/2022-06/1654633605_5-flomaster-club-p-zheltie-risunki-legkie-krasivo-5.jpg",
//     email: "charles.davis@example.com",
//     date: "18.08.2024",
//     rate: 3,
//     text: "В целом, канал неплохой, но иногда публикации не соответствуют заявленной теме. Было бы хорошо, если бы обновления выходили чаще и информация была бы более актуальной.",
//   },
//   {
//     avatar:
//       "https://flomaster.top/uploads/posts/2022-06/1654633605_5-flomaster-club-p-zheltie-risunki-legkie-krasivo-5.jpg",
//     email: "susan.lee@example.com",
//     date: "10.08.2024",
//     rate: 3,
//     text: "Канал содержит полезные материалы, но некоторые посты выглядят устаревшими. Хотелось бы увидеть больше новинок и более частые обновления.",
//   },
//   {
//     avatar:
//       "https://flomaster.top/uploads/posts/2022-06/1654633605_5-flomaster-club-p-zheltie-risunki-legkie-krasivo-5.jpg",
//     email: "robert.johnson@example.com",
//     date: "05.08.2024",
//     rate: 3,
//     text: "Информация на канале иногда бывает интересной, но частота публикаций оставляет желать лучшего. Есть моменты, когда контент повторяется. В целом, улучшение качества и регулярности будет плюсом.",
//   },
//   {
//     avatar:
//       "https://flomaster.top/uploads/posts/2022-06/1654633605_5-flomaster-club-p-zheltie-risunki-legkie-krasivo-5.jpg",
//     email: "linda.wilson@example.com",
//     date: "01.08.2024",
//     rate: 3,
//     text: "Канал имеет некоторые интересные моменты, но общая частота и качество обновлений требуют улучшения. Рекомендую следить за новыми публикациями, чтобы увидеть улучшения.",
//   },
// ];

// export const REVIEWS2: IReviewCard[] = [
//   {
//     avatar:
//       "https://st4.depositphotos.com/12328584/28866/i/450/depositphotos_288668274-stock-illustration-moon-isolated-on-white-background.jpg",
//     email: "james.carter@example.com",
//     date: "25.08.2024",
//     rate: 2,
//     text: "Разместил рекламу на этом канале, но результаты были крайне неудовлетворительными. Охват оказался значительно ниже обещанного, и взаимодействие с аудиторией было минимальным. Не рекомендую для рекламных кампаний.",
//   },
//   {
//     avatar:
//       "https://st4.depositphotos.com/12328584/28866/i/450/depositphotos_288668274-stock-illustration-moon-isolated-on-white-background.jpg",
//     email: "patricia.martinez@example.com",
//     date: "20.08.2024",
//     rate: 2,
//     text: "Реклама на этом канале не принесла ожидаемых результатов. Охват был очень низким, а качество взаимодействия с клиентами оставляет желать лучшего. Не оправдал ожиданий.",
//   },
//   {
//     avatar:
//       "https://st4.depositphotos.com/12328584/28866/i/450/depositphotos_288668274-stock-illustration-moon-isolated-on-white-background.jpg",
//     email: "william.rodriguez@example.com",
//     date: "15.08.2024",
//     rate: 2,
//     text: "Купил рекламное размещение, но полученные результаты оказались разочаровывающими. Контент был размещен не так, как было обещано, и не привлек нужную аудиторию. Не рекомендую этот канал для рекламы.",
//   },
//   {
//     avatar:
//       "https://st4.depositphotos.com/12328584/28866/i/450/depositphotos_288668274-stock-illustration-moon-isolated-on-white-background.jpg",
//     email: "nancy.brown@example.com",
//     date: "10.08.2024",
//     rate: 2,
//     text: "Размещение рекламы на этом канале не дало ожидаемого эффекта. Реклама была недостаточно заметна и не привлекла нужное количество целевых клиентов. Очень разочарован результатом.",
//   },
//   {
//     avatar:
//       "https://st4.depositphotos.com/12328584/28866/i/450/depositphotos_288668274-stock-illustration-moon-isolated-on-white-background.jpg",
//     email: "thomas.jackson@example.com",
//     date: "05.08.2024",
//     rate: 2,
//     text: "Реклама на этом канале оказалась неэффективной. Охват был значительно меньше, чем было заявлено, и не было никакого взаимодействия с аудиторией. Не рекомендую для продвижения вашего продукта.",
//   },
// ];

// export const REVIEWS1: IReviewCard[] = [
//   {
//     avatar: "https://stihi.ru/pics/2011/08/16/7559.jpg",
//     email: "sandra.green@example.com",
//     date: "25.08.2024",
//     rate: 1,
//     text: "Разместил рекламу на этом канале и абсолютно разочарован результатами. Реклама была плохо видна, охват был мизерным, и нет никакого взаимодействия с целевой аудиторией. Потеря времени и денег.",
//   },
//   {
//     avatar: "https://stihi.ru/pics/2011/08/16/7559.jpg",
//     email: "robert.lee@example.com",
//     date: "20.08.2024",
//     rate: 1,
//     text: "Реклама на этом канале полностью провалилась. Ожидал намного большего, но результат был нулевым. Никакой видимости и интереса к продукту. Абсолютно не рекомендую для рекламных кампаний.",
//   },
//   {
//     avatar: "https://stihi.ru/pics/2011/08/16/7559.jpg",
//     email: "karen.wright@example.com",
//     date: "15.08.2024",
//     rate: 1,
//     text: "Провал рекламной кампании. Не получил никаких результатов, несмотря на обещания. Реклама не была замечена и не привлекла никакого внимания. Очень разочарован.",
//   },
//   {
//     avatar: "https://stihi.ru/pics/2011/08/16/7559.jpg",
//     email: "johnson.michael@example.com",
//     date: "10.08.2024",
//     rate: 1,
//     text: "Абсолютно неудачная рекламная кампания. Результаты были хуже, чем ожидалось. Реклама не дала никаких позитивных откликов и не привлекла целевую аудиторию. Не стоит своих денег.",
//   },
//   {
//     avatar: "https://stihi.ru/pics/2011/08/16/7559.jpg",
//     email: "lisa.james@example.com",
//     date: "05.08.2024",
//     rate: 1,
//     text: "Реклама оказалась полной катастрофой. Результаты далеко не оправдали ожидания. Охват был минимальным, и нет никакого отклика от целевой аудитории. Очень разочарован и не рекомендую.",
//   },
// ];

// export const REVIEWSBYRATE = {
//   1: REVIEWS1,
//   2: REVIEWS2,
//   3: REVIEWS3,
//   4: REVIEWS4,
//   5: REVIEWS5,
// };

// export const RATING = {
//   rate: 4.9,
//   count: 357,
//   rating_type: [
//     { type: 5, count: 298 },
//     { type: 4, count: 11 },
//     { type: 3, count: 36 },
//     { type: 2, count: 7 },
//     { type: 1, count: 5 },
//   ],
// };

export const MY_PROJECT_ACTIVE_SUBCARD: IAdvSubprojects = {
  page: 1,
  elements: 6,
  orders: [
    {
      id: "f6a7b8c9-d012-3456-7890-1abcdef23456",
      identifier: 106,
      date_coming: "2024-09-05",
      name: "Аренда авто",
      category: "Аренда авто",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      api_status: 9,
      order_status: "Завершён",
      publish_date: {
        date_from: "2024-09-01",
        date_to: "2024-09-07",
      },
      publish_time: {
        time_from: "09:00",
        time_to: "19:00",
      },
      format: {
        small: "1/24",
        big: "1 час в топе 24 часа в ленте",
      },
      price: 15000,
      post_url: "https://example.com/post6",
      subscribers: 85000,
      views: 270000,
      male: 65,
      female: 35,
      er: 4.7,
      cpv: 0.06,
    },
    {
      id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
      identifier: 101,
      date_coming: "2024-09-15",
      name: "Суперкар для аренды",
      category: "Авто, мото",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      api_status: 2,
      order_status: "В ожидании",
      publish_date: {
        date_from: "2024-09-20",
        date_to: "2024-09-30",
      },
      publish_time: {
        time_from: "08:00",
        time_to: "20:00",
      },
      format: {
        small: "1/24",
        big: "1 час в топе 24 часа в ленте",
      },
      price: 12000,
      post_url: "https://example.com/post1",
      subscribers: 50000,
      views: 150000,
      male: 60,
      female: 40,
      er: 4.5,
      cpv: 0.08,
    },
    {
      id: "b2c3d4e5-f6a7-8901-2345-67890abcdef1",
      identifier: 102,
      date_coming: "2024-09-12",
      name: "Модная электроника",
      category: "Автомобильная электроника",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      api_status: 4,
      order_status: "Опубликован",
      publish_date: {
        date_from: "2024-09-18",
        date_to: "2024-09-25",
      },
      publish_time: {
        time_from: "10:00",
        time_to: "22:00",
      },
      format: {
        small: "1/24",
        big: "1 час в топе 24 часа в ленте",
      },
      price: 8000,
      post_url: "https://example.com/post2",
      subscribers: 75000,
      views: 250000,
      male: 70,
      female: 30,
      er: 3.8,
      cpv: 0.1,
    },
    {
      id: "c3d4e5f6-a789-0123-4567-890abcdef123",
      identifier: 103,
      date_coming: "2024-09-10",
      name: "Аренда недвижимости",
      category: "Аренда недвижимости",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      api_status: 5,
      order_status: "Завершён",
      publish_date: {
        date_from: "2024-09-05",
        date_to: "2024-09-15",
      },
      publish_time: {
        time_from: "09:00",
        time_to: "19:00",
      },
      format: {
        small: "1/24",
        big: "1 час в топе 24 часа в ленте",
      },
      price: 20000,
      post_url: "https://example.com/post3",
      subscribers: 120000,
      views: 300000,
      male: 55,
      female: 45,
      er: 5.0,
      cpv: 0.07,
    },
    {
      id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
      identifier: 101,
      date_coming: "2024-09-15",
      name: "Суперкар для аренды",
      category: "Авто, мото",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      api_status: 3,
      order_status: "В ожидании",
      publish_date: {
        date_from: "2024-09-20",
        date_to: "2024-09-30",
      },
      publish_time: {
        time_from: "08:00",
        time_to: "20:00",
      },
      format: {
        small: "1/24",
        big: "1 час в топе 24 часа в ленте",
      },
      price: 12000,
      post_url: "https://example.com/post1",
      subscribers: 50000,
      views: 150000,
      male: 60,
      female: 40,
      er: 4.5,
      cpv: 0.08,
    },

    {
      id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
      identifier: 101,
      date_coming: "2024-09-15",
      name: "Суперкар для аренды",
      category: "Авто, мото",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      api_status: 1,
      order_status: "В ожидании",
      publish_date: {
        date_from: "2024-09-20",
        date_to: "2024-09-30",
      },
      publish_time: {
        time_from: "08:00",
        time_to: "20:00",
      },
      format: {
        small: "1/24",
        big: "1 час в топе 24 часа в ленте",
      },
      price: 12000,
      post_url: "https://example.com/post1",
      subscribers: 50000,
      views: 150000,
      male: 60,
      female: 40,
      er: 4.5,
      cpv: 0.08,
    },

    {
      id: "f6a7b8c9-d012-3456-7890-1abcdef23456",
      identifier: 106,
      date_coming: "2024-09-05",
      name: "Аренда авто",
      category: "Аренда авто",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      api_status: 10,
      order_status: "Завершён",
      publish_date: {
        date_from: "2024-09-01",
        date_to: "2024-09-07",
      },
      publish_time: {
        time_from: "09:00",
        time_to: "19:00",
      },
      format: {
        small: "1/24",
        big: "1 час в топе 24 часа в ленте",
      },
      price: 15000,
      post_url: "https://example.com/post6",
      subscribers: 85000,
      views: 270000,
      male: 65,
      female: 35,
      er: 4.7,
      cpv: 0.06,
    },
  ],
};

export const MY_PROJECT_SAVE_CARDS: IAdvTemplateProjects = {
  page: 1,
  elements: 6,
  projects: [
    {
      id: "1",
      identifier: 2315484854,
      count: 5,
      created: "2024-09-01",
      name: "Campaign Alpha",
      budget: 50000000,
    },
    // {
    //   id: "2",
    //   identifier: 8554546,
    //   count: 7,
    //   created: "2024-08-20",
    //   name: "Campaign Beta",
    //   budget: 75000000,
    // },
    // {
    //   id: "3",
    //   identifier: 79564654,
    //   count: 3,
    //   created: "2024-07-15",
    //   name: "Campaign Gamma",
    //   budget: 60000000,
    // },
    // {
    //   id: "4",
    //   identifier: 2356454,
    //   count: 3,
    //   created: "2024-09-05",
    //   name: "Campaign Delta",
    //   budget: 80000000,
    // },
    // {
    //   id: "5",
    //   identifier: 2356454,
    //   count: 1,
    //   created: "2024-08-10",
    //   name: "Campaign Epsilon",
    //   budget: 45000000,
    // },
  ],
};

export const MY_PROJECT_MANAGER_DEV_CARDS: IAdvManagerProjectsDev = {
  page: 1,
  elements: 6,
  projects: [
    {
      id: "1",
      identifier: 2315484854,
      tarif: "Старт",
      created: "2024-09-01",
      name: "Campaign Alpha",
      budget: 50000000,
    },
    // {
    //   id: "2",
    //   identifier: 8554546,
    //   tarif: "Старт",
    //   created: "2024-08-20",
    //   name: "Campaign Beta",
    //   budget: 75000000,
    // },
    // {
    //   id: "3",
    //   identifier: 79564654,
    //   tarif: "Стандарт",
    //   created: "2024-07-15",
    //   name: "Campaign Gamma",
    //   budget: 60000000,
    // },
    // {
    //   id: "4",
    //   identifier: 2356454,
    //   tarif: "Стандарт",
    //   created: "2024-09-05",
    //   name: "Campaign Delta",
    //   budget: 80000000,
    // },
    // {
    //   id: "5",
    //   identifier: 2356454,
    //   tarif: "Стандарт",
    //   created: "2024-08-10",
    //   name: "Campaign Epsilon",
    //   budget: 45000000,
    // },
  ],
};

export const activeChannelsMock: IChannelBlogger = {
  page: 1,
  elements: 10,
  channels: [
    {
      id: "1",
      name: "Активный канал 1",
      category: "Технологии",
      status: 1,
      avatar: "https://example.com/avatar1.jpg",
      channel_orders: {
        wait: 5,
        in_progress: 10,
        completed: 20,
        canceled_rejected: 2,
      },
      tags: [1, 2, 3],
    },
    {
      id: "2",
      name: "Активный канал 2",
      category: "Наука",
      status: 1,
      avatar: "https://example.com/avatar2.jpg",
      channel_orders: {
        wait: 2,
        in_progress: 8,
        completed: 15,
        canceled_rejected: 1,
      },
      tags: [2, 4],
    },
  ],
  status: channelStatusFilter.active,
  isLast: false,
};

export const inactiveChannelsMock: IChannelBlogger = {
  page: 1,
  elements: 10,
  channels: [
    {
      id: "3",
      name: "Неактивный канал 1",
      category: "Развлечения",
      status: 0,
      avatar: "https://example.com/avatar3.jpg",
      channel_orders: {
        completed: 30,
        canceled_rejected: 5,
      },
      tags: [3, 5],
    },
    {
      id: "4",
      name: "Неактивный канал 2",
      category: "Новости",
      status: 0,
      avatar: "https://example.com/avatar4.jpg",
      channel_orders: {
        completed: 25,
        canceled_rejected: 3,
      },
      tags: [1, 6],
    },
  ],
  status: channelStatusFilter.inactive,
  isLast: true,
};

export const moderationChannelsMock: IChannelBlogger = {
  page: 1,
  elements: 10,
  channels: [
    {
      id: "5",
      name: "Канал на модерации 1",
      category: "Культура",
      avatar: "https://example.com/avatar5.jpg",
      created: "2024-09-15",
    },
    {
      id: "6",
      name: "Канал на модерации 2",
      category: "Спорт",
      avatar: "https://example.com/avatar6.jpg",
      created: "2024-09-10",
    },
  ],
  status: channelStatusFilter.moderation,
  isLast: true,
};

export const moderationRejectChannelsMock: IChannelBlogger = {
  page: 1,
  elements: 10,
  channels: [
    {
      id: "7",
      name: "Отклоненный канал 1",
      category: "Музыка",
      avatar: "https://example.com/avatar7.jpg",
      rejected_date: "2024-09-01",
      reapplication_date: "2024-09-20",
      reason: "причина бана которую будет писать модератор во время бана",
    },
    {
      id: "8",
      name: "Отклоненный канал 2",
      category: "Туризм",
      avatar: "https://example.com/avatar8.jpg",
      rejected_date: "2024-08-28",
      reapplication_date: "2024-09-18",
      reason: "причина бана которую будет писать модератор во время бана",
    },
  ],
  status: channelStatusFilter.active,
  isLast: true,
};

export const blockedChannelsMock: IChannelBlogger = {
  page: 1,
  elements: 10,
  channels: [
    {
      id: "9",
      name: "Заблокированный канал 1",
      category: "Политика",
      avatar: "https://example.com/avatar9.jpg",
      blocked_date: "2024-09-05",
      reason: "причина бана которую будет писать модератор во время бана",
    },
    {
      id: "10",
      name: "Заблокированный канал 2",
      category: "Экономика",
      avatar: "https://example.com/avatar10.jpg",
      blocked_date: "2024-09-12",
      reason: "причина бана которую будет писать модератор во время бана",
    },
  ],
  status: channelStatusFilter.active,
  isLast: true,
};

export const My_CHANNELS = {
  page: 1,
  elements: 30,
  channels: [
    {
      id: "0a5de3e6-56fc-4b42-9c03-cb003b2f7bb8",
      name: "NN",
      category: "Digital и IT",
      status: 1,
      avatar:
        "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
      channel_orders: {
        wait: 0,
        in_progress: 0,
        completed: 0,
        canceled_rejected: 0,
      },
      tags: [],
    },
    {
      id: "63f78c26-58f0-444f-9b57-0a410f5d38ac",
      name: "Wylsacom Red",
      category: "Гаджеты",
      status: 1,
      avatar:
        "https://static6.tgstat.ru/channels/_0/07/0759b82303d700c50c174fe7518d4d4a.jpg",
      channel_orders: {
        wait: 0,
        in_progress: 0,
        completed: 0,
        canceled_rejected: 0,
      },
      tags: [],
    },
    {
      id: "15097641-096f-4fcf-9196-1d0459aae394",
      name: "Romancev768",
      category: "Гаджеты",
      status: 1,
      avatar:
        "https://static9.tgstat.ru/channels/_0/d4/d46e5f4762657de7ea8279240282a32c.jpg",
      channel_orders: {
        wait: 0,
        in_progress: 0,
        completed: 0,
        canceled_rejected: 0,
      },
      tags: [],
    },
  ],
};

export const BLOGGER_OFFERS: IBloggerOffers = {
  page: 0,
  elements: 12,
  orders: [
    // {
    //   id: "497f6eca-6276-4993-bfeb-53cbbbba6f01",
    //   identifier: 1,
    //   created: "24.09.2024",
    //   date_accept: "24.09.2024",
    //   name: "Order 1",
    //   category: "Category A",
    //   avatar: "avatar1.png",
    //   api_status: 1,
    //   order_status: "Accepted",
    //   publish_date: {
    //     date_from: "25.09.2024",
    //     date_to: "26.09.2024",
    //   },
    //   publish_time: {
    //     time_from: "09:00",
    //     time_to: "18:00",
    //   },
    //   format: {
    //     small: "0/24",
    //     big: "без топа 24 часа в ленте",
    //   },
    //   price: 500000,
    // },
    {
      id: "597f6eca-6276-4993-bfeb-53cbbbba6f02",
      identifier: 2,
      created: "24.09.2024",
      date_accept: "24.09.2024",
      name: "Order 2",
      category: "Category B",
      avatar: "avatar2.png",
      api_status: 2,
      order_status: "Pending",
      publish_date: {
        date_from: "26.09.2024",
        date_to: "27.09.2024",
      },
      publish_time: {
        time_from: "10:00",
        time_to: "20:00",
      },
      format: {
        small: "1/24",
        big: "1 час в топе 24 в ленте",
      },
      price: 550000,
    },
    // {
    //   id: "697f6eca-6276-4993-bfeb-53cbbbba6f03",
    //   identifier: 3,
    //   created: "24.09.2024",
    //   date_accept: "24.09.2024",
    //   name: "Order 3",
    //   category: "Category C",
    //   avatar: "avatar3.png",
    //   api_status: 3,
    //   order_status: "Completed",
    //   publish_date: {
    //     date_from: "28.09.2024",
    //     date_to: "29.09.2024",
    //   },
    //   publish_time: {
    //     time_from: "08:00",
    //     time_to: "16:00",
    //   },
    //   format: {
    //     small: "2/24",
    //     big: "2 часа в топе 48 в ленте",
    //   },
    //   price: 600000,
    // },
    // {
    //   id: "797f6eca-6276-4993-bfeb-53cbbbba6f04",
    //   identifier: 4,
    //   created: "24.09.2024",
    //   date_accept: "24.09.2024",
    //   name: "Order 4",
    //   category: "Category D",
    //   avatar: "avatar4.png",
    //   api_status: 4,
    //   order_status: "In Progress",
    //   publish_date: {
    //     date_from: "29.09.2024",
    //     date_to: "30.09.2024",
    //   },
    //   publish_time: {
    //     time_from: "07:00",
    //     time_to: "15:00",
    //   },
    //   format: {
    //     small: "3/72",
    //     big: "3 часа в топе 72 в ленте",
    //   },
    //   price: 650000,
    // },
    // {
    //   id: "897f6eca-6276-4993-bfeb-53cbbbba6f05",
    //   identifier: 5,
    //   created: "24.09.2024",
    //   date_accept: "24.09.2024",
    //   name: "Order 5",
    //   category: "Category E",
    //   avatar: "avatar5.png",
    //   api_status: 5,
    //   order_status: "Cancelled",
    //   publish_date: {
    //     date_from: "01.10.2024",
    //     date_to: "02.10.2024",
    //   },
    //   publish_time: {
    //     time_from: "11:00",
    //     time_to: "19:00",
    //   },
    //   format: {
    //     small: "0/24",
    //     big: "без топа 24 часа в ленте",
    //   },
    //   price: 700000,
    // },
    // {
    //   id: "997f6eca-6276-4993-bfeb-53cbbbba6f06",
    //   identifier: 6,
    //   created: "24.09.2024",
    //   date_accept: "24.09.2024",
    //   name: "Order 6",
    //   category: "Category F",
    //   avatar: "avatar6.png",
    //   api_status: 6,
    //   order_status: "Returned",
    //   publish_date: {
    //     date_from: "03.10.2024",
    //     date_to: "04.10.2024",
    //   },
    //   publish_time: {
    //     time_from: "09:30",
    //     time_to: "17:30",
    //   },
    //   format: {
    //     small: "1/24",
    //     big: "1 час в топе 24 в ленте",
    //   },
    //   price: 750000,
    // },
    // {
    //   id: "a97f6eca-6276-4993-bfeb-53cbbbba6f07",
    //   identifier: 7,
    //   created: "24.09.2024",
    //   date_accept: "24.09.2024",
    //   name: "Order 7",
    //   category: "Category G",
    //   avatar: "avatar7.png",
    //   api_status: 7,
    //   order_status: "Pending",
    //   publish_date: {
    //     date_from: "05.10.2024",
    //     date_to: "06.10.2024",
    //   },
    //   publish_time: {
    //     time_from: "10:00",
    //     time_to: "20:00",
    //   },
    //   format: {
    //     small: "2/24",
    //     big: "2 часа в топе 48 в ленте",
    //   },
    //   price: 800000,
    // },
    // {
    //   id: "b97f6eca-6276-4993-bfeb-53cbbbba6f08",
    //   identifier: 8,
    //   created: "24.09.2024",
    //   date_accept: "24.09.2024",
    //   name: "Order 8",
    //   category: "Category H",
    //   avatar: "avatar8.png",
    //   api_status: 8,
    //   order_status: "Completed",
    //   publish_date: {
    //     date_from: "07.10.2024",
    //     date_to: "08.10.2024",
    //   },
    //   publish_time: {
    //     time_from: "08:00",
    //     time_to: "16:00",
    //   },
    //   format: {
    //     small: "3/72",
    //     big: "3 часа в топе 72 в ленте",
    //   },
    //   price: 850000,
    // },
    // {
    //   id: "c97f6eca-6276-4993-bfeb-53cbbbba6f09",
    //   identifier: 9,
    //   created: "24.09.2024",
    //   date_accept: "24.09.2024",
    //   name: "Order 9",
    //   category: "Category I",
    //   avatar: "avatar9.png",
    //   api_status: 9,
    //   order_status: "In Progress",
    //   publish_date: {
    //     date_from: "09.10.2024",
    //     date_to: "10.10.2024",
    //   },
    //   publish_time: {
    //     time_from: "07:00",
    //     time_to: "15:00",
    //   },
    //   format: {
    //     small: "0/24",
    //     big: "без топа 24 часа в ленте",
    //   },
    //   price: 900000,
    // },
    // {
    //   id: "d97f6eca-6276-4993-bfeb-53cbbbba6f10",
    //   identifier: 10,
    //   created: "24.09.2024",
    //   date_accept: "24.09.2024",
    //   name: "Order 10",
    //   category: "Category J",
    //   avatar: "avatar10.png",
    //   api_status: 10,
    //   order_status: "Cancelled",
    //   publish_date: {
    //     date_from: "11.10.2024",
    //     date_to: "12.10.2024",
    //   },
    //   publish_time: {
    //     time_from: "07:00",
    //     time_to: "15:00",
    //   },
    //   format: {
    //     small: "0/24",
    //     big: "без топа 24 часа в ленте",
    //   },
    //   price: 950000,
    // },
    // {
    //   id: "e97f6eca-6276-4993-bfeb-53cbbbba6f11",
    //   identifier: 11,
    //   created: "24.09.2024",
    //   date_accept: "24.09.2024",
    //   name: "Order 11",
    //   category: "Category K",
    //   avatar: "avatar11.png",
    //   api_status: 11,
    //   order_status: "Returned",
    //   publish_date: {
    //     date_from: "13.10.2024",
    //     date_to: "14.10.2024",
    //   },
    //   publish_time: {
    //     time_from: "09:30",
    //     time_to: "17:30",
    //   },
    //   format: {
    //     small: "1/24",
    //     big: "1 час в топе 24 в ленте",
    //   },
    //   price: 1000000,
    // },
    // {
    //   id: "f97f6eca-6276-4993-bfeb-53cbbbba6f12",
    //   identifier: 12,
    //   created: "24.09.2024",
    //   date_accept: "24.09.2024",
    //   name: "Order 12",
    //   category: "Category L",
    //   avatar: "avatar12.png",
    //   api_status: 12,
    //   order_status: "Pending",
    //   publish_date: {
    //     date_from: "15.10.2024",
    //     date_to: "16.10.2024",
    //   },
    //   publish_time: {
    //     time_from: "10:00",
    //     time_to: "20:00",
    //   },
    //   format: {
    //     small: "2/24",
    //     big: "2 часа в топе 48 в ленте",
    //   },
    //   price: 1100000,
    // },
  ],
};
