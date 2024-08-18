import { IReviewData } from "@entities/channel";
import {
  IAdvManagerProjectsDev,
  IAdvProjects,
  IFilterSearch,
} from "@entities/project";

export const managerActiveCARDS = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "31111111",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
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
      id: "31111112",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
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
      id: "31111113",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
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

export const managerCompletedCARDS = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "31111114",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
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
      id: "31111115",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
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

export const managerAgreedCARDS = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "311111116",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
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
      id: "311111117",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
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

export const managerNewCARDS = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: 31231132,
      date: "20.01.2024",
      tarif: "Комплексный",
      price: 99999999,
      comment:
        "Lorem ipsum dolor sit amet consectetur. Dignissim egestas suspendisse quam ac leo viverra aliquet tortor ullamcorper. Sodales adipiscing faucibus ullamcorper vivamus. Id volutpat eu mattis ultrices id felis tristique venenatis. In tellus amet nibh viverra magna bibendum sed pellentesque tincidunt.Lorem ipsum dolor sit amet consectetur. Dignissim egestas suspendisse quam ac leo viverra aliquet tortor ullamcorper. Sodales adipiscing faucibus ullamcorper vivamus. Id volutpat eu mattis ultrices id felis tristique venenatis. In tellus amet nibh viverra magna bibendum sed pellentesque tincidunt.Lorem ipsum dolor sit amet consectetur. Dignissim egestas suspendisse quam ac leo viverra aliquet tortor ullamcorper. Sodales adipiscing faucibus ullamcorper vivamus. Id volutpat eu mattis ultrices id felis tristique venenatis. In tellus amet nibh viverra magna bibendum sed pellentesque tincidunt.quam ac leo viverra aliquet tortor ullamcorper. Sodales adipiscing faucibus ullamcorper vivamus. Id volutpat eu mattis ultrices id felis tristique venenatis. ",
      url: [
        "https://strident-thump.info",
        "https://strident-thump.info",
        "https://strident-thump.info",
      ],
      file: [
        "https://resizing.flixster.com/MlIScHjOtyNAq7SfItBGYoGjbQ8=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/NowShowing/146687/146687_aa.jpg",
        "https://resizing.flixster.com/MlIScHjOtyNAq7SfItBGYoGjbQ8=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/NowShowing/146687/146687_aa.jpg",
        "https://resizing.flixster.com/MlIScHjOtyNAq7SfItBGYoGjbQ8=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/NowShowing/146687/146687_aa.jpg",
        "https://resizing.flixster.com/MlIScHjOtyNAq7SfItBGYoGjbQ8=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/NowShowing/146687/146687_aa.jpg",
      ],
    },
  ],
};

export const advMyProjectActiveCARDS: IAdvProjects = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "31111111",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
      views: 10000,
      budget: 9990000,
      completed: 2,
      canceled_rejected: 10,
      wait: 5,
      in_progress: 3,
      moderation: 1,
      subcard: [
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

export const advMyProjectCompleteCARDS: IAdvProjects = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "31111111",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
      views: 10000,
      budget: 9990000,
      completed: 2,
      canceled_rejected: 10,
      wait: 5,
      in_progress: 3,
      moderation: 1,
      subcard: [
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
      ],
    },
  ],
};

export const advManagerProjectActiveCARDS: IAdvProjects = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "31111111",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
      views: 10000,
      budget: 9990000,
      completed: 2,
      canceled_rejected: 10,
      wait: 5,
      in_progress: 3,
      moderation: 1,
      subcard: [
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
      ],
    },
  ],
};

export const advManagerProjectAgreedCARDS: IAdvProjects = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "31111111",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
      views: 10000,
      budget: 9990000,
      completed: 2,
      canceled_rejected: 10,
      wait: 5,
      in_progress: 3,
      moderation: 1,
      subcard: [
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
      ],
    },
  ],
};

export const advManagerProjectCompleteCARDS: IAdvProjects = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "31111111",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
      views: 10000,
      budget: 9990000,
      completed: 2,
      canceled_rejected: 10,
      wait: 5,
      in_progress: 3,
      moderation: 1,
      subcard: [
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
      ],
    },
  ],
};

export const advManagerProjectOnDevelopCARDS: IAdvManagerProjectsDev = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "31111111",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      budget: 9990000,
    },
    {
      id: "31111111",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      budget: 9990000,
    },
    {
      id: "31111111",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      budget: 9990000,
    },
    {
      id: "31111111",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      budget: 9990000,
    },
  ],
};

export const advSavedProjectCompleteCARDS: IAdvProjects = {
  page: 1,
  elements: 1,
  projects: [
    {
      id: "31111111",
      created: "20.01.2024",
      tarif: "Начальный",
      name: "КУБИКИ",
      count_channels: 10,
      views: 10000,
      budget: 9990000,
      completed: 2,
      canceled_rejected: 10,
      wait: 5,
      in_progress: 3,
      moderation: 1,
      subcard: [
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
      ],
    },
  ],
};

export const RecommendCARDS: IFilterSearch[] = [
  {
    platform: 1,
    business: [
      {
        id: 1,
        name: "Авто, мото",
      },
      {
        id: 2,
        name: "Автомобильная электроника",
      },
      {
        id: 3,
        name: "Автосервис",
      },
    ],
    age: [
      {
        id: 2,
        name: "18-34 лет",
      },
      {
        id: 3,
        name: "35-44 лет",
      },
      {
        id: 4,
        name: "45-54 лет",
      },
    ],
    language: [
      {
        id: 1,
        name: "🇺🇿 Узбекский",
      },
      {
        id: 2,
        name: "🇬🇧 Английский",
      },
      {
        id: 3,
        name: "🇷🇺 Русский",
      },
    ],
    region: [
      {
        id: 7,
        name: "Самарканд",
      },
      {
        id: 8,
        name: "Сурхандарья",
      },
      {
        id: 9,
        name: "Сырдарья",
      },
      {
        id: 10,
        name: "Ташкент",
      },
      {
        id: 11,
        name: "Фергана",
      },
      {
        id: 12,
        name: "Хорезм",
      },
      {
        id: 13,
        name: "Таш. Область",
      },
    ],
    male: 50,
    female: 50,
  },
  {
    platform: 1,
    business: [
      {
        id: 2,
        name: "Автомобильная электроника",
      },
      {
        id: 3,
        name: "Автосервис",
      },
    ],
    age: [
      {
        id: 2,
        name: "18-34 лет",
      },

      {
        id: 4,
        name: "45-54 лет",
      },
    ],
    language: [
      {
        id: 3,
        name: "🇷🇺 Русский",
      },
    ],
    region: [
      {
        id: 7,
        name: "Самарканд",
      },
      {
        id: 8,
        name: "Сурхандарья",
      },

      {
        id: 12,
        name: "Хорезм",
      },
      {
        id: 13,
        name: "Таш. Область",
      },
    ],
    male: 0,
    female: 100,
  },
];

export const AIRecommendCARDS: IFilterSearch[] = [
  {
    platform: 1,
    business: [
      {
        id: 1,
        name: "Авто, мото",
      },
      {
        id: 2,
        name: "Автомобильная электроника",
      },
    ],
    age: [
      {
        id: 4,
        name: "45-54 лет",
      },
    ],
    language: [
      {
        id: 2,
        name: "🇬🇧 Английский",
      },
    ],
    region: [
      {
        id: 7,
        name: "Самарканд",
      },
    ],
    male: 75,
    female: 25,
  },
  {
    platform: 1,
    business: [
      {
        id: 2,
        name: "Автомобильная электроника",
      },
      {
        id: 3,
        name: "Автосервис",
      },
    ],
    age: [
      {
        id: 2,
        name: "18-34 лет",
      },
    ],
    language: [
      {
        id: 3,
        name: "🇷🇺 Русский",
      },
    ],
    region: [
      {
        id: 13,
        name: "Таш. Область",
      },
    ],
    male: 90,
    female: 10,
  },
];

export const REVIEWS: IReviewData[] = [
  {
    avatar:
      "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
    email: "email@gmail.com",
    date: "18.08.2022",
    rate: 5,
    text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
    email: "222email@gmail.com",
    date: "15.08.2022",
    rate: 5,
    text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
    email: "333email@gmail.com",
    date: "1.08.2022",
    rate: 5,
    text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/d4/c4/42/d4c442a8ceddb5a7b6fe793b6d3c3c41.jpg",
    email: "444email@gmail.com",
    date: "28.07.2022",
    rate: 5,
    text: "абота с этим заказчиком превзошла все мои ожидания. С самого начала нашему сотрудничеству сопутствовала четкость и ясность в постановке задач. Заказчик проявил глубокое понимание проекта, что позволило быстро войти в курс дела и приступить к выполнению работы.",
  },
];

export const RATING = {
  rate: 4.9,
  count: 345,
  rating_type: [
    { type: 5, count: 298 },
    { type: 4, count: 11 },
    { type: 3, count: 36 },
    { type: 2, count: 0 },
    { type: 1, count: 0 },
  ],
};
