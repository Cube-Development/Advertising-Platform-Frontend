import {
  IAdminChannelData,
  IAdminComplaintData,
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

export const AdminProfile: IAdminProfileData = {
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
  name: "Maftuna R.",
};

export const AdminChannels: IAdminChannelData[] = [
  {
    owner: "1232132",
    status: 0,
    url: "https://t.me/MoneySwap_robot",
    date: "02.09.2022",
    text_limit: 100,
    id: "4a53b39c-451d-45f7-9571-fc59acc4fbf0",
    platform: 1,
    name: "NN",
    description:
      "Медиа про интернет, технологии и безопасность\nСотрудничество: @nnmanager\nЮтуб: https://youtube.com/naebnet",
    rate: 4.9,
    category: 1,
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    subscribers: 1467000,
    male: 70,
    female: 30,
    format: [
      {
        format: 1,
        format_name: {
          small: "0/24",
          big: "без топа 24 часа в ленте",
        },
        price: 6200000,
        views: 0,
        er: 0.0,
        cpv: 0.0,
      },
      {
        format: 2,
        format_name: {
          small: "1/24",
          big: "1 час в топе 24 в ленте",
        },
        price: 9200000,
        views: 0,
        er: 0.0,
        cpv: 0.0,
      },
    ],
    language: [
      { id: 1, name: "🇺🇿 Узбекский" },
      { id: 2, name: "🇬🇧 Английский" },
      { id: 3, name: "🇷🇺 Русский" },
      { id: 4, name: "🇷🇼 Каракалпакский" },
    ],
    age: [
      { id: 1, name: "до 18 лет" },
      { id: 2, name: "18-34 лет" },
      { id: 3, name: "35-44 лет" },
    ],
    region: [
      { id: 1, name: "Андижан" },
      { id: 2, name: "Бухара" },
      { id: 3, name: "Джизак" },
    ],
    complete: 10,
    complaints: 10,
    on_hold: 10,
    cancel: 10,
    not_complete: 10,
    in_progress: 10,
  },
  {
    owner: "1232132",
    status: 1,
    url: "https://t.me/MoneySwap_robot",
    date: "02.09.2022",
    text_limit: 1200,
    id: "4a53b39c-451d-45f7-9571-fc59acc4fbf1",
    platform: 3,
    name: "NN",
    description:
      "Медиа про интернет, технологии и безопасность\nСотрудничество: @nnmanager\nЮтуб: https://youtube.com/naebnet",
    rate: 4.9,
    category: 1,
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    subscribers: 1467000,
    male: 70,
    female: 30,
    format: [
      {
        format: 1,
        format_name: {
          small: "0/24",
          big: "без топа 24 часа в ленте",
        },
        price: 6200000,
        views: 0,
        er: 0.0,
        cpv: 0.0,
      },
      {
        format: 2,
        format_name: {
          small: "1/24",
          big: "1 час в топе 24 в ленте",
        },
        price: 9200000,
        views: 0,
        er: 0.0,
        cpv: 0.0,
      },
    ],
    language: [
      { id: 1, name: "🇺🇿 Узбекский" },
      { id: 2, name: "🇬🇧 Английский" },
      { id: 3, name: "🇷🇺 Русский" },
      { id: 4, name: "🇷🇼 Каракалпакский" },
    ],
    age: [
      { id: 1, name: "до 18 лет" },
      { id: 2, name: "18-34 лет" },
      { id: 3, name: "35-44 лет" },
    ],
    region: [
      { id: 1, name: "Андижан" },
      { id: 2, name: "Бухара" },
      { id: 3, name: "Джизак" },
    ],
    complete: 10,
    complaints: 10,
    on_hold: 10,
    cancel: 10,
    not_complete: 10,
    in_progress: 10,
  },
  {
    owner: "1232132",
    status: 2,
    url: "https://t.me/MoneySwap_robot",
    date: "02.09.2022",
    text_limit: 100,
    id: "4a53b39c-451d-45f7-9571-fc59acc4fbf2",
    platform: 2,
    name: "NN",
    description:
      "Медиа про интернет, технологии и безопасность\nСотрудничество: @nnmanager\nЮтуб: https://youtube.com/naebnet",
    rate: 4.9,
    category: 1,
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    subscribers: 1467000,
    male: 70,
    female: 30,
    format: [
      {
        format: 1,
        format_name: {
          small: "0/24",
          big: "без топа 24 часа в ленте",
        },
        price: 6200000,
        views: 0,
        er: 0.0,
        cpv: 0.0,
      },
      {
        format: 2,
        format_name: {
          small: "1/24",
          big: "1 час в топе 24 в ленте",
        },
        price: 9200000,
        views: 0,
        er: 0.0,
        cpv: 0.0,
      },
    ],
    language: [
      { id: 1, name: "🇺🇿 Узбекский" },
      { id: 2, name: "🇬🇧 Английский" },
      { id: 3, name: "🇷🇺 Русский" },
      { id: 4, name: "🇷🇼 Каракалпакский" },
    ],
    age: [
      { id: 1, name: "до 18 лет" },
      { id: 2, name: "18-34 лет" },
      { id: 3, name: "35-44 лет" },
    ],
    region: [
      { id: 1, name: "Андижан" },
      { id: 2, name: "Бухара" },
      { id: 3, name: "Джизак" },
    ],
    complete: 10,
    complaints: 10,
    on_hold: 10,
    cancel: 10,
    not_complete: 10,
    in_progress: 10,
  },
  {
    owner: "1232132",
    status: 3,
    url: "https://t.me/MoneySwap_robot",
    date: "02.09.2022",
    text_limit: 100,
    id: "4a53b39c-451d-45f7-9571-fc59acc4fbf3",
    platform: 1,
    name: "NN",
    description:
      "Медиа про интернет, технологии и безопасность\nСотрудничество: @nnmanager\nЮтуб: https://youtube.com/naebnet",
    rate: 4.9,
    category: 1,
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    subscribers: 1467000,
    male: 70,
    female: 30,
    format: [
      {
        format: 1,
        format_name: {
          small: "0/24",
          big: "без топа 24 часа в ленте",
        },
        price: 6200000,
        views: 0,
        er: 0.0,
        cpv: 0.0,
      },
      {
        format: 2,
        format_name: {
          small: "1/24",
          big: "1 час в топе 24 в ленте",
        },
        price: 9200000,
        views: 0,
        er: 0.0,
        cpv: 0.0,
      },
    ],
    language: [
      { id: 1, name: "🇺🇿 Узбекский" },
      { id: 2, name: "🇬🇧 Английский" },
      { id: 3, name: "🇷🇺 Русский" },
      { id: 4, name: "🇷🇼 Каракалпакский" },
    ],
    age: [
      { id: 1, name: "до 18 лет" },
      { id: 2, name: "18-34 лет" },
      { id: 3, name: "35-44 лет" },
    ],
    region: [
      { id: 1, name: "Андижан" },
      { id: 2, name: "Бухара" },
      { id: 3, name: "Джизак" },
    ],
    complete: 10,
    complaints: 10,
    on_hold: 10,
    cancel: 10,
    not_complete: 10,
    in_progress: 10,
  },
  {
    owner: "1232132",
    status: 5,
    url: "https://t.me/MoneySwap_robot",
    date: "02.09.2022",
    text_limit: 100,
    id: "4a53b39c-451d-45f7-9571-fc59acc4fbf5",
    platform: 1,
    name: "NN",
    description:
      "Медиа про интернет, технологии и безопасность\nСотрудничество: @nnmanager\nЮтуб: https://youtube.com/naebnet",
    rate: 4.9,
    category: 1,
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    subscribers: 1467000,
    male: 70,
    female: 30,
    format: [
      {
        format: 1,
        format_name: {
          small: "0/24",
          big: "без топа 24 часа в ленте",
        },
        price: 6200000,
        views: 0,
        er: 0.0,
        cpv: 0.0,
      },
      {
        format: 2,
        format_name: {
          small: "1/24",
          big: "1 час в топе 24 в ленте",
        },
        price: 9200000,
        views: 0,
        er: 0.0,
        cpv: 0.0,
      },
    ],
    language: [
      { id: 1, name: "🇺🇿 Узбекский" },
      { id: 2, name: "🇬🇧 Английский" },
      { id: 3, name: "🇷🇺 Русский" },
      { id: 4, name: "🇷🇼 Каракалпакский" },
    ],
    age: [
      { id: 1, name: "до 18 лет" },
      { id: 2, name: "18-34 лет" },
      { id: 3, name: "35-44 лет" },
    ],
    region: [
      { id: 1, name: "Андижан" },
      { id: 2, name: "Бухара" },
      { id: 3, name: "Джизак" },
    ],
    complete: 10,
    complaints: 10,
    on_hold: 10,
    cancel: 10,
    not_complete: 10,
    in_progress: 10,
  },
];

export const AdminUsers: IAdminUserData[] = [
  {
    id: "1111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Александр Иванов",
    email: "ivanov.alex@gmail.com",
    date: "15.10.2023",
    status: 1,
  },
  {
    id: "2111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Мария Соколова",
    email: "sokolova.masha@example.com",
    date: "23.08.2023",
    status: 0,
  },
  {
    id: "3111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Олег Петров",
    email: "oleg.petrov@example.com",
    date: "01.01.2023",
    status: 1,
  },
  {
    id: "4111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Елена Смирнова",
    email: "elena.smirnova@mail.com",
    date: "30.03.2023",
    status: 0,
  },
  {
    id: "5111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Дмитрий Орлов",
    email: "d.orlov@example.com",
    date: "14.06.2023",
    status: 1,
  },
  {
    id: "6111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Наталья Кузнецова",
    email: "n.kuznetsova@example.com",
    date: "22.05.2023",
    status: 0,
  },
  {
    id: "7111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Сергей Лебедев",
    email: "sergei.lebedev@example.com",
    date: "05.07.2023",
    status: 1,
  },
  {
    id: "8111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Алина Попова",
    email: "popova.alina@gmail.com",
    date: "10.11.2023",
    status: 0,
  },
  {
    id: "9111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Михаил Волков",
    email: "m.volkov@example.com",
    date: "18.12.2023",
    status: 1,
  },
  {
    id: "10111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Анна Киселева",
    email: "anna.kiseleva@gmail.com",
    date: "02.09.2023",
    status: 1,
  },
  {
    id: "11111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Иван Захаров",
    email: "ivan.zakharov@mail.com",
    date: "09.08.2023",
    status: 0,
  },
  {
    id: "12111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Екатерина Морозова",
    email: "morozova.ekaterina@gmail.com",
    date: "20.04.2023",
    status: 1,
  },
  {
    id: "13111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Павел Виноградов",
    email: "pavel.vinogradov@example.com",
    date: "17.02.2023",
    status: 0,
  },
  {
    id: "14111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Ольга Беляева",
    email: "belyaeva.olga@mail.com",
    date: "29.05.2023",
    status: 1,
  },
  {
    id: "15111111",
    avatar:
      "https://static6.tgstat.ru/channels/_0/81/81e6ccb9e917e37a2759b2f849da89c5.jpg",
    name: "Максим Зайцев",
    email: "zaytsev.max@example.com",
    date: "11.03.2023",
    status: 0,
  },
];

export const AdminTransactions: IAdminTransactionData[] = [
  {
    id: "16e5a703-d4f1-4f42-98be-cf88c7a58142",
    sender: "f7c409c5-6020-4646-8f2d-d96475e21136",
    receiver: "51a7e707-e38c-4b3e-b3db-c35e6c2f76b8",
    transaction_date: "10.11.2024",
    transaction_type: "Покупка товара",
    way_type: "Click",
    amount: 229900,
    status: 1,
    subcard: {
      id: "16e5a703-d4f1-4f42-98be-cf88c7a58142",
      status: 1,
      sender: {
        id: "f7c409c5-6020-4646-8f2d-d96475e21136",
        identification: "Оборотный",
      },
      receiver: {
        id: "51a7e707-e38c-4b3e-b3db-c35e6c2f76b8",
        identification: "Пользовательский",
        userId: "98765412",
      },
      transactions: [
        {
          id: "b2f702e7-f2c9-42f4-b0e0-d1739e34a402",
          transactionId: "b2f702e7-f2c9-42f4-b0e0-d1739e34a402",
          accountId: "b2f702e7-f2c9-42f4-b0e0-d1739e34a402",
          amount: 229900,
          datetime: "09:00 10.11.2024",
        },
        {
          id: "b7e30b61-2333-4f13-a133-3ecfa5b36cfa",
          transactionId: "b7e30b61-2333-4f13-a133-3ecfa5b36cfa",
          accountId: "b7e30b61-2333-4f13-a133-3ecfa5b36cfa",
          amount: 229900,
          datetime: "10:00 10.11.2024",
        },
        {
          id: "0da18f99-c9e0-416d-9173-9baf3e61a3a9",
          transactionId: "0da18f99-c9e0-416d-9173-9baf3e61a3a9",
          accountId: "0da18f99-c9e0-416d-9173-9baf3e61a3a9",
          amount: 229900,
          datetime: "11:00 10.11.2024",
        },
        {
          id: "d45ed6a1-5e6c-4fa7-83d7-e306f42b319d",
          transactionId: "d45ed6a1-5e6c-4fa7-83d7-e306f42b319d",
          accountId: "d45ed6a1-5e6c-4fa7-83d7-e306f42b319d",
          amount: 229900,
          datetime: "12:00 10.11.2024",
        },
      ],
      documents: [
        {
          filename: "Товар_заказан",
        },
        {
          filename: "Подтверждение_покупки",
        },
        {
          filename: "Распределение_средств",
        },
        {
          filename: "Договор_покупки",
        },
      ],
    },
  },
  {
    id: "a1c9f8c7-f988-4b5d-a52d-5d5ab7a04b72",
    sender: "b0b2f1f8-0e34-4885-a014-0a7b463d0796",
    receiver: "8c3d66ef-c590-42f3-9df2-2414d3c4ab79",
    transaction_date: "11.11.2024",
    transaction_type: "Вывод средств",
    way_type: "Payme",
    amount: 550000,
    status: 2,
    subcard: {
      id: "a1c9f8c7-f988-4b5d-a52d-5d5ab7a04b72",
      status: 2,
      sender: {
        id: "b0b2f1f8-0e34-4885-a014-0a7b463d0796",
        identification: "Оборотный",
      },
      receiver: {
        id: "8c3d66ef-c590-42f3-9df2-2414d3c4ab79",
        identification: "Пользовательский",
        userId: "45216578",
      },
      transactions: [
        {
          id: "e72de649-e6e7-4c98-9c9c-5cf5c212567b",
          transactionId: "e72de649-e6e7-4c98-9c9c-5cf5c212567b",
          accountId: "e72de649-e6e7-4c98-9c9c-5cf5c212567b",
          amount: 550000,
          datetime: "10:00 11.11.2024",
        },
        {
          id: "45b9d8e0-bcc1-4644-9322-7e28a321004e",
          transactionId: "45b9d8e0-bcc1-4644-9322-7e28a321004e",
          accountId: "45b9d8e0-bcc1-4644-9322-7e28a321004e",
          amount: 550000,
          datetime: "11:00 11.11.2024",
        },
        {
          id: "913a4e5f-99eb-4e7b-bc2d-8dbb1e5ab3f6",
          transactionId: "913a4e5f-99eb-4e7b-bc2d-8dbb1e5ab3f6",
          accountId: "913a4e5f-99eb-4e7b-bc2d-8dbb1e5ab3f6",
          amount: 550000,
          datetime: "12:00 11.11.2024",
        },
        {
          id: "f3e1b48e-7242-490b-8e8f-cb56c91c3326",
          transactionId: "f3e1b48e-7242-490b-8e8f-cb56c91c3326",
          accountId: "f3e1b48e-7242-490b-8e8f-cb56c91c3326",
          amount: 550000,
          datetime: "13:00 11.11.2024",
        },
      ],
      documents: [
        {
          filename: "Документ_о_выводе",
        },
        {
          filename: "Запрос_на_вывод",
        },
        {
          filename: "Подтверждение_вывода",
        },
      ],
    },
  },
  {
    id: "fc9e6d12-7a5e-49b8-9b58-e42c8308f597",
    sender: "272fce60-03a0-44cd-bc9e-1103f490e60f",
    receiver: "f8c1a7e7-72e7-4f16-bb5f-c81f9a7a2ad4",
    transaction_date: "12.11.2024",
    transaction_type: "Возврат средств",
    way_type: "Didox",
    amount: 720000,
    status: 0,
    subcard: {
      id: "fc9e6d12-7a5e-49b8-9b58-e42c8308f597",
      status: 0,
      sender: {
        id: "272fce60-03a0-44cd-bc9e-1103f490e60f",
        identification: "Оборотный",
      },
      receiver: {
        id: "f8c1a7e7-72e7-4f16-bb5f-c81f9a7a2ad4",
        identification: "Пользовательский",
        userId: "36928374",
      },
      transactions: [
        {
          id: "1c7c8310-fc1c-4a31-b98d-b99d67237f9d",
          transactionId: "1c7c8310-fc1c-4a31-b98d-b99d67237f9d",
          accountId: "1c7c8310-fc1c-4a31-b98d-b99d67237f9d",
          amount: 720000,
          datetime: "09:30 12.11.2024",
        },
        {
          id: "7055d56b-d271-4fae-b70f-d9ec640d5f13",
          transactionId: "7055d56b-d271-4fae-b70f-d9ec640d5f13",
          accountId: "7055d56b-d271-4fae-b70f-d9ec640d5f13",
          amount: 720000,
          datetime: "10:30 12.11.2024",
        },
        {
          id: "a436674d-1cf7-470f-b42d-73a5f30969e3",
          transactionId: "a436674d-1cf7-470f-b42d-73a5f30969e3",
          accountId: "a436674d-1cf7-470f-b42d-73a5f30969e3",
          amount: 720000,
          datetime: "11:30 12.11.2024",
        },
      ],
      documents: [
        {
          filename: "Доказательство_возврата",
        },
        {
          filename: "Выписка_о_платежах",
        },
        {
          filename: "Согласование_возврата",
        },
      ],
    },
  },
  {
    id: "8964d456-bfe7-46ad-93c9-e177db591c99",
    sender: "3312fcf7-504f-4863-8880-f58749acb742",
    receiver: "399adbd9-e264-4b9b-b82b-7361a36f44d3",
    transaction_date: "13.11.2024",
    transaction_type: "Пополнение счета",
    way_type: "Bank",
    amount: 125000,
    status: 1,
    subcard: {
      id: "8964d456-bfe7-46ad-93c9-e177db591c99",
      status: 1,
      sender: {
        id: "3312fcf7-504f-4863-8880-f58749acb742",
        identification: "Оборотный",
      },
      receiver: {
        id: "399adbd9-e264-4b9b-b82b-7361a36f44d3",
        identification: "Пользовательский",
        userId: "52738961",
      },
      transactions: [
        {
          id: "029bdc67-33a5-40a9-b632-490ae7d506f9",
          transactionId: "029bdc67-33a5-40a9-b632-490ae7d506f9",
          accountId: "029bdc67-33a5-40a9-b632-490ae7d506f9",
          amount: 125000,
          datetime: "10:00 13.11.2024",
        },
        {
          id: "1ad4f8b7-8693-4f68-99b5-e6bc07a8f3da",
          transactionId: "1ad4f8b7-8693-4f68-99b5-e6bc07a8f3da",
          accountId: "1ad4f8b7-8693-4f68-99b5-e6bc07a8f3da",
          amount: 125000,
          datetime: "11:00 13.11.2024",
        },
        {
          id: "9f0e28c3-8c95-47ea-a2c3-b39940cb8811",
          transactionId: "9f0e28c3-8c95-47ea-a2c3-b39940cb8811",
          accountId: "9f0e28c3-8c95-47ea-a2c3-b39940cb8811",
          amount: 125000,
          datetime: "12:00 13.11.2024",
        },
      ],
      documents: [
        {
          filename: "Подтверждение_пополнения",
        },
        {
          filename: "Соглашение_о_пополнении",
        },
      ],
    },
  },
  {
    id: "ced65ba6-b30b-4dbb-8032-98a1a779c8fc",
    sender: "9b28f28d-3246-4fbc-9708-784f8cf66312",
    receiver: "26a417cf-9602-40a9-bcc2-9d17723b479e",
    transaction_date: "14.11.2024",
    transaction_type: "Перевод между картами",
    way_type: "Phone",
    amount: 320000,
    status: 2,
    subcard: {
      id: "ced65ba6-b30b-4dbb-8032-98a1a779c8fc",
      status: 2,
      sender: {
        id: "9b28f28d-3246-4fbc-9708-784f8cf66312",
        identification: "Оборотный",
      },
      receiver: {
        id: "26a417cf-9602-40a9-bcc2-9d17723b479e",
        identification: "Пользовательский",
        userId: "84327961",
      },
      transactions: [
        {
          id: "9c2b65f5-b5f9-42b3-8cfb-1f7f9d17c7d1",
          transactionId: "9c2b65f5-b5f9-42b3-8cfb-1f7f9d17c7d1",
          accountId: "9c2b65f5-b5f9-42b3-8cfb-1f7f9d17c7d1",
          amount: 320000,
          datetime: "13:00 14.11.2024",
        },
        {
          id: "e5c8b267-437d-46a7-bcda-02feab249ac5",
          transactionId: "e5c8b267-437d-46a7-bcda-02feab249ac5",
          accountId: "e5c8b267-437d-46a7-bcda-02feab249ac5",
          amount: 320000,
          datetime: "14:00 14.11.2024",
        },
      ],
      documents: [
        {
          filename: "Документы_перевод",
        },
      ],
    },
  },
  {
    id: "a1f8e1d5-4a1e-4d89-a1a1-b7d6e1a1c4f1",
    sender: "e5f4d1a7-2b1c-4f68-b4b4-f1d8c6e3a4f9",
    receiver: "d8f3c7b5-4e1d-4f98-b8b8-d1f9e4d5a6b2",
    transaction_date: "01.11.2024",
    transaction_type: "Оплата за проект",
    way_type: "Click",
    amount: 6387030,
    status: 1,
    subcard: {
      id: "a1f8e1d5-4a1e-4d89-a1a1-b7d6e1a1c4f1",
      status: 1,
      sender: {
        id: "e5f4d1a7-2b1c-4f68-b4b4-f1d8c6e3a4f9",
        identification: "Оборотный",
      },
      receiver: {
        id: "d8f3c7b5-4e1d-4f98-b8b8-d1f9e4d5a6b2",
        identification: "Пользовательский",
        userId: "12121212",
      },
      transactions: [
        {
          id: "9b034e7d-cde4-4e43-b84e-8424a01df838",
          transactionId: "9b034e7d-cde4-4e43-b84e-8424a01df838",
          accountId: "9b034e7d-cde4-4e43-b84e-8424a01df838",
          amount: 6387030,
          datetime: "12:30 01.11.2024",
        },
        {
          id: "9b034e7d-cde4-4e43-b84e-8424a01df839",
          transactionId: "9b034e7d-cde4-4e43-b84e-8424a01df839",
          accountId: "9b034e7d-cde4-4e43-b84e-8424a01df839",
          amount: 6387030,
          datetime: "13:00 01.11.2024",
        },
        {
          id: "9b034e7d-cde4-4e43-b84e-8424a01df838",
          transactionId: "9b034e7d-cde4-4e43-b84e-8424a01df838",
          accountId: "9b034e7d-cde4-4e43-b84e-8424a01df838",
          amount: 6387030,
          datetime: "13:30 01.11.2024",
        },
        {
          id: "9b034e7d-cde4-4e43-b84e-8424a01df839",
          transactionId: "9b034e7d-cde4-4e43-b84e-8424a01df839",
          accountId: "9b034e7d-cde4-4e43-b84e-8424a01df839",
          amount: 6387030,
          datetime: "14:30 01.11.2024",
        },
      ],
      documents: [
        { filename: "Отчет_по_проекту_1" },
        { filename: "Договор_с_клиентом" },
      ],
    },
  },
  {
    id: "f2bcdca1-2e9f-4b36-b6c1-cb0a40f6e1c9",
    sender: "a4f1c5e7-5b2e-4d62-bc0f-82b71c3879c4",
    receiver: "c4d8f5b1-7b8c-4e1b-b7ac-abc95be3078b",
    transaction_date: "02.11.2024",
    transaction_type: "Покупка тарифа",
    way_type: "Payme",
    amount: 982345,
    status: 0,
    subcard: {
      id: "f2bcdca1-2e9f-4b36-b6c1-cb0a40f6e1c9",
      status: 0,
      sender: {
        id: "a4f1c5e7-5b2e-4d62-bc0f-82b71c3879c4",
        identification: "Оборотный",
      },
      receiver: {
        id: "c4d8f5b1-7b8c-4e1b-b7ac-abc95be3078b",
        identification: "Пользовательский",
        userId: "23232323",
      },
      transactions: [
        {
          id: "bd16e8d4-b4cd-4df0-a929-3fa21d64b7b7",
          transactionId: "bd16e8d4-b4cd-4df0-a929-3fa21d64b7b7",
          accountId: "bd16e8d4-b4cd-4df0-a929-3fa21d64b7b7",
          amount: 982345,
          datetime: "14:15 02.11.2024",
        },
      ],
      documents: [
        { filename: "Счет_фактура_по_тарифу_2" },
        { filename: "Контракт_с_поставщиком" },
        { filename: "Платежное_соглашение" },
      ],
    },
  },
  {
    id: "e92fb1f9-2908-44d9-8d51-5693d37a1c9c",
    sender: "b35a56ab-fc09-4593-9db0-7c5f6fdc3fe9",
    receiver: "315d8953-3456-4ab8-84cf-99fa29b41d4e",
    transaction_date: "03.11.2024",
    transaction_type: "Оплата за проект",
    way_type: "Didox",
    amount: 4567890,
    status: 1,
    subcard: {
      id: "e92fb1f9-2908-44d9-8d51-5693d37a1c9c",
      status: 1,
      sender: {
        id: "b35a56ab-fc09-4593-9db0-7c5f6fdc3fe9",
        identification: "Оборотный",
      },
      receiver: {
        id: "315d8953-3456-4ab8-84cf-99fa29b41d4e",
        identification: "Пользовательский",
        userId: "43192345",
      },
      transactions: [
        {
          id: "e0b8d98c-ef75-467a-8a58-71e8a02b9f2d",
          transactionId: "e0b8d98c-ef75-467a-8a58-71e8a02b9f2d",
          accountId: "e0b8d98c-ef75-467a-8a58-71e8a02b9f2d",
          amount: 4567890,
          datetime: "15:00 03.11.2024",
        },
      ],
      documents: [
        { filename: "Квитанция_оплаты_за_проект" },
        { filename: "Акт_выполненных_работ" },
      ],
    },
  },
  {
    id: "e36c8d17-c3f3-4b99-83ad-4694be9b1a21",
    sender: "4db9d7c1-c7ad-4729-b945-5313c8a3fdde",
    receiver: "11fe61c0-98a1-47d9-b872-d5048f12f4d6",
    transaction_date: "04.11.2024",
    transaction_type: "Возврат средств",
    way_type: "Click",
    amount: 1284305,
    status: 2,
    subcard: {
      id: "e36c8d17-c3f3-4b99-83ad-4694be9b1a21",
      status: 2,
      sender: {
        id: "4db9d7c1-c7ad-4729-b945-5313c8a3fdde",
        identification: "Оборотный",
      },
      receiver: {
        id: "11fe61c0-98a1-47d9-b872-d5048f12f4d6",
        identification: "Пользовательский",
        userId: "87654321",
      },
      transactions: [
        {
          id: "91d8b093-3a65-469f-b45d-c831b06d8e2b",
          transactionId: "91d8b093-3a65-469f-b45d-c831b06d8e2b",
          accountId: "91d8b093-3a65-469f-b45d-c831b06d8e2b",
          amount: 1284305,
          datetime: "16:30 04.11.2024",
        },
      ],
      documents: [
        { filename: "Платеж_возврат_по_сделке" },
        { filename: "Согласование_возврата" },
      ],
    },
  },
  {
    id: "10fba75a-324b-46a7-90a7-c6342d99e7b3",
    sender: "af6f5c80-bc9e-4c83-b585-6db96717d282",
    receiver: "0e370e58-4734-45d3-b5b1-d5e74e0a7a13",
    transaction_date: "05.11.2024",
    transaction_type: "Пополнение счета",
    way_type: "Payme",
    amount: 250000,
    status: 1,
    subcard: {
      id: "10fba75a-324b-46a7-90a7-c6342d99e7b3",
      status: 1,
      sender: {
        id: "af6f5c80-bc9e-4c83-b585-6db96717d282",
        identification: "Оборотный",
      },
      receiver: {
        id: "0e370e58-4734-45d3-b5b1-d5e74e0a7a13",
        identification: "Пользовательский",
        userId: "98765432",
      },
      transactions: [
        {
          id: "6c56b927-22ed-4694-b2d0-8f2c31bb1f98",
          transactionId: "6c56b927-22ed-4694-b2d0-8f2c31bb1f98",
          accountId: "6c56b927-22ed-4694-b2d0-8f2c31bb1f98",
          amount: 250000,
          datetime: "17:30 05.11.2024",
        },
      ],
      documents: [{ filename: "Платеж_пополнения_счета" }],
    },
  },
  {
    id: "e450cfb5-fd4d-44b8-b4c2-83203e5d68f3",
    sender: "b723e71e-2e65-4b55-b8d1-ecf870798f6f",
    receiver: "315d8953-3456-4ab8-84cf-99fa29b41d4e",
    transaction_date: "06.11.2024",
    transaction_type: "Оплата услуги",
    way_type: "Click",
    amount: 1123230,
    status: 1,
    subcard: {
      id: "e450cfb5-fd4d-44b8-b4c2-83203e5d68f3",
      status: 1,
      sender: {
        id: "b723e71e-2e65-4b55-b8d1-ecf870798f6f",
        identification: "Оборотный",
      },
      receiver: {
        id: "315d8953-3456-4ab8-84cf-99fa29b41d4e",
        identification: "Пользовательский",
        userId: "43242324",
      },
      transactions: [
        {
          id: "432432d4-f81c-4da0-a764-ff11233a777a",
          transactionId: "432432d4-f81c-4da0-a764-ff11233a777a",
          accountId: "432432d4-f81c-4da0-a764-ff11233a777a",
          amount: 1123230,
          datetime: "18:30 06.11.2024",
        },
      ],
      documents: [
        { filename: "Согласование_по_услуге" },
        { filename: "Платеж_за_услугу" },
      ],
    },
  },
  {
    id: "7c84ef90-418d-4b62-b9ac-c3d5bbd51f10",
    sender: "adbf74b8-89f3-4da3-aed1-74be271a9d9e",
    receiver: "ac89fb79-4578-43f4-a382-cb2b0e2ad3fc",
    transaction_date: "07.11.2024",
    transaction_type: "Возврат по ошибке",
    way_type: "Payme",
    amount: 546785,
    status: 2,
    subcard: {
      id: "7c84ef90-418d-4b62-b9ac-c3d5bbd51f10",
      status: 2,
      sender: {
        id: "adbf74b8-89f3-4da3-aed1-74be271a9d9e",
        identification: "Оборотный",
      },
      receiver: {
        id: "ac89fb79-4578-43f4-a382-cb2b0e2ad3fc",
        identification: "Пользовательский",
        userId: "12343242",
      },
      transactions: [
        {
          id: "27d8b11d-65b9-4a8c-854b-d2ec95cbff72",
          transactionId: "27d8b11d-65b9-4a8c-854b-d2ec95cbff72",
          accountId: "27d8b11d-65b9-4a8c-854b-d2ec95cbff72",
          amount: 546785,
          datetime: "19:30 07.11.2024",
        },
      ],
      documents: [
        { filename: "Ошибочный_платеж" },
        { filename: "Подтверждение_возврата" },
      ],
    },
  },
  {
    id: "88e742ba-e620-4f5f-929e-bb507f5b79e8",
    sender: "a4580d2a-620f-4f35-90b0-b3ab58a9fa5c",
    receiver: "c856746f-f5a7-4bb0-b1a4-1d30c6e074d1",
    transaction_date: "08.11.2024",
    transaction_type: "Продажа товара",
    way_type: "Payme",
    amount: 989500,
    status: 1,
    subcard: {
      id: "88e742ba-e620-4f5f-929e-bb507f5b79e8",
      status: 1,
      sender: {
        id: "a4580d2a-620f-4f35-90b0-b3ab58a9fa5c",
        identification: "Оборотный",
      },
      receiver: {
        id: "c856746f-f5a7-4bb0-b1a4-1d30c6e074d1",
        identification: "Пользовательский",
        userId: "98745321",
      },
      transactions: [
        {
          id: "ab01c092-2f90-41c5-8bc1-7ac423fa7ff5",
          transactionId: "ab01c092-2f90-41c5-8bc1-7ac423fa7ff5",
          accountId: "ab01c092-2f90-41c5-8bc1-7ac423fa7ff5",
          amount: 989500,
          datetime: "20:00 08.11.2024",
        },
      ],
      documents: [
        { filename: "Документы_по_продаже" },
        { filename: "Согласование_платежа" },
      ],
    },
  },
];

export const AdminReviews: IAdminReviewData[] = [
  {
    id: "d1f2g3h4-i5j6-k7l8-m9n0-o1p2q3r4s5t6",
    createdDate: "15.03.2023",
    closeDate: "15.03.2023",
    platform: {
      id: "f6g7h8i9-j0k1-l2m3-n4o5-p6q7r8s9t0u1",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      name: "AdPlace",
    },
    sender: {
      id: "v2w3x4y5-z6a7-b8c9-d0e1-f2g3h4i5j6k7",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "marketing.solutions@gmail.com",
      userId: "83746215",
    },
    review: {
      rate: 5,
      text: "Очень довольны сотрудничеством. Публикация была размещена точно в оговоренное время, с текстом и оформлением, полностью соответствующими нашим ожиданиям. Владелец канала проявил профессиональный подход, оперативно отвечал на все вопросы и учел все пожелания. Рекламный пост вызвал живой интерес у подписчиков, и мы получили больше откликов, чем рассчитывали. Рекомендуем сотрудничество и планируем обращаться снова для будущих кампаний! Очень довольны сотрудничеством. Публикация была размещена точно в оговоренное время, с текстом и оформлением, полностью соответствующими нашим ожиданиям. Владелец канала проявил профессиональный подход, оперативно отвечал на все вопросы и учел все пожелания. Рекламный пост вызвал живой интерес у подписчиков, и мы получили больше откликов, чем рассчитывали. Рекомендуем сотрудничество и планируем обращаться снова для будущих кампаний!Очень довольны сотрудничеством. Публикация была размещена точно в оговоренное время, с текстом и оформлением, полностью соответствующими нашим ожиданиям. Владелец канала проявил профессиональный подход, оперативно отвечал на все вопросы и учел все пожелания. Рекламный пост вызвал живой интерес у подписчиков, и мы получили больше откликов, чем рассчитывали. Рекомендуем сотрудничество и планируем обращаться снова для будущих кампаний!Очень довольны сотрудничеством. Публикация была размещена точно в оговоренное время, с текстом и оформлением, полностью соответствующими нашим ожиданиям. Владелец канала проявил профессиональный подход, оперативно отвечал на все вопросы и учел все пожелания. Рекламный пост вызвал живой интерес у подписчиков, и мы получили больше откликов, чем рассчитывали. Рекомендуем сотрудничество и планируем обращаться снова для будущих кампаний!",
    },
  },
  {
    id: "e2f3g4h5-i6j7-k8l9-m0n1-o2p3q4r5s6t7",
    createdDate: "10.04.2023",
    platform: {
      id: "u1v2w3x4-y5z6-a7b8-c9d0-e1f2g3h4i5j6",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      name: "PromoHub",
    },
    sender: {
      id: "g6h7i8j9-k0l1-m2n3-o4p5-q6r7s8t9u0v1",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "ads.agency@example.com",
      userId: "19283746",
    },
    review: {
      rate: 4,
      text: "Площадка оправдала ожидания, публикация прошла успешно, и мы наблюдали активное вовлечение аудитории. Несколько вопросов по технической части возникли, но администратор оперативно на них ответил. Рекламный пост привлек внимание целевой аудитории, и мы получили хорошую отдачу. Рекомендуем эту платформу для продвижения.",
    },
  },
  {
    id: "f3g4h5i6-j7k8-l9m0-n1o2-p3q4r5s6t7u8",
    createdDate: "28.05.2023",
    platform: {
      id: "w2x3y4z5-a6b7-c8d9-e0f1-g2h3i4j5k6l7",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      name: "MediaMarket",
    },
    sender: {
      id: "i9j0k1l2-m3n4-o5p6-q7r8-s9t0u1v2w3x4",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "contact@mediacorp.com",
      userId: "28374659",
    },
    review: {
      rate: 5,
      text: "Отличная платформа для рекламного продвижения. Сотрудничество прошло на высшем уровне: всё организовано чётко, владелец канала на связи, публикации в срок, креативно и качественно. Аудитория проявила активный интерес к посту, что положительно отразилось на нашем бренде. Будем пользоваться услугами этой площадки снова!",
    },
  },
  {
    id: "g4h5i6j7-k8l9-m0n1-o2p3-q4r5s6t7u8v9",
    createdDate: "12.06.2023",
    platform: {
      id: "v3w4x5y6-z7a8-b9c0-d1e2-f3g4h5i6j7k8",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      name: "AdExchange",
    },
    sender: {
      id: "o2p3q4r5-s6t7-u8v9-w0x1-y2z3a4b5c6d7",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "promotion.expert@gmail.com",
      userId: "73648219",
    },
    review: {
      rate: 3,
      text: "Площадка имеет хорошую базу пользователей, но некоторые моменты требуют улучшения. Публикация прошла успешно, но задержка по времени чуть помешала. В целом, аудитория откликнулась положительно, но немного доработок не помешало бы. Надеемся на улучшение сервиса в будущем.",
    },
  },
  {
    id: "h5i6j7k8-l9m0-n1o2-p3q4-r5s6t7u8v9w0",
    createdDate: "07.07.2023",
    platform: {
      id: "x4y5z6a7-b8c9-d0e1-f2g3-h4i5j6k7l8m9",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      name: "AdFlex",
    },
    sender: {
      id: "p3q4r5s6-t7u8-v9w0-x1y2-z3a4b5c6d7e8",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "ad.marketing.pro@example.com",
      userId: "56473829",
    },
    review: {
      rate: 4,
      text: "Хороший опыт работы с этой площадкой! Поддержка на высоте, администратор быстро реагировал на все запросы. Публикация прошла успешно, аудитория оказалась активной и отзывчивой. Планируем продолжить сотрудничество для дальнейших кампаний.",
    },
  },
  {
    id: "j1k2l3m4-n5o6-p7q8-r9s0-t1u2v3w4x5y6",
    createdDate: "14.08.2023",
    platform: {
      id: "y1z2a3b4-c5d6-e7f8-g9h0-i1j2k3l4m5n6",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      name: "Promo Digest",
    },
    sender: {
      id: "o5p6q7r8-s9t0-u1v2-w3x4-y5z6a7b8c9d0",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "partner.promodigest@gmail.com",
      userId: "18394756",
    },
    review: {
      rate: 5,
      text: "Отличная рекламная площадка! Все требования по оформлению поста были учтены. Администратор постоянно оставался на связи и помогал с оформлением. Рекламная кампания прошла успешно, получили большое количество новых клиентов. Рекомендуем!",
    },
  },
  {
    id: "a2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7",
    createdDate: "03.09.2023",
    platform: {
      id: "n3o4p5q6-r7s8-t9u0-v1w2-x3y4z5a6b7c8",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      name: "Digital Talks",
    },
    sender: {
      id: "l7m8n9o0-p1q2-r3s4-t5u6-v7w8x9y0z1a2",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "contact@digitaltalks.com",
      userId: "74628193",
    },
    review: {
      rate: 4,
      text: "Всё прошло гладко, аудитория откликнулась положительно. Несколько раз корректировали текст, но администратор был терпелив и помогал. Будем рекомендовать этот канал.",
    },
  },
  {
    id: "p3q4r5s6-t7u8-v9w0-x1y2-z3a4b5c6d7e8",
    createdDate: "27.10.2023",
    platform: {
      id: "y3z4a5b6-c7d8-e9f0-g1h2-i3j4k5l6m7n8",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      name: "Smart Market",
    },
    sender: {
      id: "w1x2y3z4-a5b6-c7d8-e9f0-g1h2i3j4k5l6",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "promo@smartmarket.com",
      userId: "92837465",
    },
    review: {
      rate: 3,
      text: "Неплохая платформа, но могли бы улучшить обратную связь. Публикация сработала, но без особых результатов. Возможно, воспользуемся снова, если будет лучшее обслуживание.",
    },
  },
  {
    id: "c8d9e0f1-g2h3-i4j5-k6l7-m8n9o0p1q2r3",
    createdDate: "11.11.2023",
    platform: {
      id: "j5k6l7m8-n9o0-p1q2-r3s4-t5u6v7w8x9y0",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      name: "Trend Hub",
    },
    sender: {
      id: "m2n3o4p5-q6r7-s8t9-u0v1-w2x3y4z5a6b7",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "trendhub.ads@gmail.com",
      userId: "64738291",
    },
    review: {
      rate: 5,
      text: "Сработано на отлично! Креативность и профессионализм команды Trend Hub впечатлили. Аудитория заинтересованная, пост собрал множество откликов. Будем продолжать сотрудничество!",
    },
  },
  {
    id: "d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9",
    createdDate: "15.12.2023",
    platform: {
      id: "t6u7v8w9-x0y1-z2a3-b4c5-d6e7f8g9h0i1",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      name: "Biz Adverts",
    },
    sender: {
      id: "r4s5t6u7-v8w9-x0y1-z2a3-b4c5d6e7f8g9",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "info@bizadverts.net",
      userId: "94736218",
    },
    review: {
      rate: 4,
      text: "Рекламная кампания прошла успешно, площадка выполнила свои обязательства. Немного задержек с обратной связью, но конечный результат нас устроил. С удовольствием обратимся снова.",
    },
  },
  {
    id: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    createdDate: "04.01.2024",
    platform: {
      id: "h1i2j3k4-l5m6-n7o8-p9q0-r1s2t3u4v5w6",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      name: "Market Arena",
    },
    sender: {
      id: "z0a1b2c3-d4e5-f6g7-h8i9-j0k1l2m3n4o5",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "ads@marketarena.com",
      userId: "78293541",
    },
    review: {
      rate: 5,
      text: "Отличный сервис! Администратор на связи 24/7, отзывчивый и доброжелательный. Пост собрал много просмотров и привлечённой аудитории. Будем обращаться регулярно.",
    },
  },
];

export const AdminComplaints: IAdminComplaintData[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "maria.smirnova@example.com",
      userId: "82417538",
    },
    date: "08.11.2024",
    priority: 1,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "andrey.petrova@example.com",
      userId: "13492857",
    },
    date: "07.11.2024",
    priority: 2,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "ivan.ivanov@example.com",
      userId: "57281934",
    },
    date: "06.11.2024",
    priority: 0,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "svetlana.kuznetsova@example.com",
      userId: "76134892",
    },
    date: "05.11.2024",
    priority: 1,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "alexey.nikitin@example.com",
      userId: "34819752",
    },
    date: "04.11.2024",
    priority: 2,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "olga.petrenko@example.com",
      userId: "92841736",
    },
    date: "03.11.2024",
    priority: 0,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "dmitry.mikhailov@example.com",
      userId: "18492675",
    },
    date: "02.11.2024",
    priority: 1,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "irina.novikova@example.com",
      userId: "93716284",
    },
    date: "01.11.2024",
    priority: 2,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "valery.pavlov@example.com",
      userId: "71829346",
    },
    date: "31.10.2024",
    priority: 0,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "elena.morozova@example.com",
      userId: "68294753",
    },
    date: "30.10.2024",
    priority: 1,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "nikolay.belov@example.com",
      userId: "49381726",
    },
    date: "29.10.2024",
    priority: 2,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "anna.vlasova@example.com",
      userId: "16294837",
    },
    date: "28.10.2024",
    priority: 0,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "sergey.sokolov@example.com",
      userId: "75923814",
    },
    date: "27.10.2024",
    priority: 1,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440014",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "polina.smirnova@example.com",
      userId: "83579162",
    },
    date: "26.10.2024",
    priority: 2,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440015",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "viktor.ivanov@example.com",
      userId: "61728394",
    },
    date: "25.10.2024",
    priority: 0,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440016",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "natalia.mironova@example.com",
      userId: "28391746",
    },
    date: "24.10.2024",
    priority: 1,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440017",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "alexandr.volkov@example.com",
      userId: "98471235",
    },
    date: "23.10.2024",
    priority: 2,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440018",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "tatyana.karpova@example.com",
      userId: "28765413",
    },
    date: "22.10.2024",
    priority: 0,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440019",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "igor.orlov@example.com",
      userId: "57283194",
    },
    date: "21.10.2024",
    priority: 1,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440020",
    theme: "Проблема с постом!",
    sender: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj70E7y_6zqDXJasRG7zxg-Ig_07aIuia_pw&s",
      email: "yuliya.kovaleva@example.com",
      userId: "62893741",
    },
    date: "20.10.2024",
    priority: 2,
  },
];

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
    // {
    //   id: "1",
    //   identifier: 2315484854,
    //   tarif: "Старт",
    //   created: "2024-09-01",
    //   name: "Campaign Alpha",
    //   budget: 50000000,
    // },
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

// export const activeChannelsMock: IChannelBlogger = {
//   page: 1,
//   elements: 10,
//   channels: [
//     {
//       id: "1",
//       name: "Активный канал 1",
//       category: "Технологии",
//       status: 1,
//       avatar: "https://example.com/avatar1.jpg",
//       channel_orders: {
//         wait: 5,
//         in_progress: 10,
//         completed: 20,
//         canceled_rejected: 2,
//       },
//       tags: [1, 2, 3],
//     },
//     {
//       id: "2",
//       name: "Активный канал 2",
//       category: "Наука",
//       status: 1,
//       avatar: "https://example.com/avatar2.jpg",
//       channel_orders: {
//         wait: 2,
//         in_progress: 8,
//         completed: 15,
//         canceled_rejected: 1,
//       },
//       tags: [2, 4],
//     },
//   ],
//   status: channelStatusFilter.active,
//   isLast: false,
// };

// export const inactiveChannelsMock: IChannelBlogger = {
//   page: 1,
//   elements: 10,
//   channels: [
//     {
//       id: "3",
//       name: "Неактивный канал 1",
//       category: "Развлечения",
//       status: 0,
//       avatar: "https://example.com/avatar3.jpg",
//       channel_orders: {
//         completed: 30,
//         canceled_rejected: 5,
//       },
//       tags: [3, 5],
//     },
//     {
//       id: "4",
//       name: "Неактивный канал 2",
//       category: "Новости",
//       status: 0,
//       avatar: "https://example.com/avatar4.jpg",
//       channel_orders: {
//         completed: 25,
//         canceled_rejected: 3,
//       },
//       tags: [1, 6],
//     },
//   ],
//   status: channelStatusFilter.inactive,
//   isLast: true,
// };

// export const moderationChannelsMock: IChannelBlogger = {
//   page: 1,
//   elements: 10,
//   channels: [
//     {
//       id: "5",
//       name: "Канал на модерации 1",
//       category: "Культура",
//       avatar: "https://example.com/avatar5.jpg",
//       created: "2024-09-15",
//     },
//     {
//       id: "6",
//       name: "Канал на модерации 2",
//       category: "Спорт",
//       avatar: "https://example.com/avatar6.jpg",
//       created: "2024-09-10",
//     },
//   ],
//   status: channelStatusFilter.moderation,
//   isLast: true,
// };

// export const moderationRejectChannelsMock: IChannelBlogger = {
//   page: 1,
//   elements: 10,
//   channels: [
//     {
//       id: "7",
//       name: "Отклоненный канал 1",
//       category: "Музыка",
//       avatar: "https://example.com/avatar7.jpg",
//       rejected_date: "2024-09-01",
//       reapplication_date: "2024-09-20",
//       reason: "причина бана которую будет писать модератор во время бана",
//     },
//     {
//       id: "8",
//       name: "Отклоненный канал 2",
//       category: "Туризм",
//       avatar: "https://example.com/avatar8.jpg",
//       rejected_date: "2024-08-28",
//       reapplication_date: "2024-09-18",
//       reason: "причина бана которую будет писать модератор во время бана",
//     },
//   ],
//   status: channelStatusFilter.active,
//   isLast: true,
// };

// export const blockedChannelsMock: IChannelBlogger = {
//   page: 1,
//   elements: 10,
//   channels: [
//     {
//       id: "9",
//       name: "Заблокированный канал 1",
//       category: "Политика",
//       avatar: "https://example.com/avatar9.jpg",
//       blocked_date: "2024-09-05",
//       reason: "причина бана которую будет писать модератор во время бана",
//     },
//     {
//       id: "10",
//       name: "Заблокированный канал 2",
//       category: "Экономика",
//       avatar: "https://example.com/avatar10.jpg",
//       blocked_date: "2024-09-12",
//       reason: "причина бана которую будет писать модератор во время бана",
//     },
//   ],
//   status: channelStatusFilter.active,
//   isLast: true,
// };

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
    // {
    //   id: "597f6eca-6276-4993-bfeb-53cbbbba6f02",
    //   identifier: 2,
    //   created: "24.09.2024",
    //   date_accept: "28.09.2024",
    //   name: "Order 2",
    //   category: "Category B",
    //   avatar: "avatar2.png",
    //   api_status: 2,
    //   order_status: "Pending",
    //   publish_date: {
    //     date_from: "26.09.2024",
    //     date_to: "27.09.2024",
    //   },
    //   publish_time: {
    //     time_from: "10:00",
    //     time_to: "20:00",
    //   },
    //   format: {
    //     small: "1/24",
    //     big: "1 час в топе 24 в ленте",
    //   },
    //   price: 550000,
    // },
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
