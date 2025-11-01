import { FC } from "react";
import { OrdersList, TopInfo } from "../components";
import { IAgencyProjectCard } from "@entities/project";

// const project_data_mock: IAgencyProjectCard = {
//     id: "project-123",
//     identifier: 1,
//     created: "2024-01-15T10:00:00Z",
//     project_name: "Тестовый проект",
//     count_channels: 5,
//     is_request_approve: projectStatus.changed,
//     views: 12500,
//     budget: 500000,
//     remainder: 250000,
//     completed: 3,
//     canceled_rejected: 1,
//     canceled: 1,
//     wait: 1,
//     in_progress: 2,
//     viewer: ENUM_VIEWER_ROLES.CUSTOMER,
//     orders: [
//         {
//             id: "order-1",
//             identifier: 1,
//             channel_id: "channel-123",
//             channel_url: "https://example.com/channel/123",
//             date_coming: "2024-01-20T12:00:00Z",
//             name: "Канал про технологии",
//             category: "Технологии",
//             avatar: "https://via.placeholder.com/100",
//             order_status: "Запущен",
//             api_status: orderStatus.wait,
//             publish_date: "2024-01-30",
//             publish_time: {
//                 time_from: "10:00",
//                 time_to: "18:00"
//             },
//             format: {
//                 small: "feed",
//                 big: "FullHd_vertical"
//             },
//             price: 50000,
//             subscribers: 150000,
//             views: 35000,
//             er: 8.5,
//             cpv: 1.43,
//             male: 65,
//             female: 35,
//             desire: [],
//             platform: platformTypesNum.telegram,
//             rate: 4.5,
//             post_deeplink: "https://t.me/channel/123"
//         },
//         {
//             id: "order-2",
//             identifier: 2,
//             channel_id: "channel-456",
//             channel_url: "https://example.com/channel/456",
//             date_coming: "2024-01-18T14:30:00Z",
//             name: "Канал про бизнес",
//             category: "Бизнес",
//             avatar: "https://via.placeholder.com/100",
//             order_status: "Выполнен",
//             api_status: orderStatus.completed,
//             publish_date: "2024-01-22",
//             publish_time: {
//                 time_from: "12:00",
//                 time_to: "20:00"
//             },
//             format: {
//                 small: "feed",
//                 big: "feed"
//             },
//             price: 75000,
//             subscribers: 200000,
//             views: 45000,
//             er: 9.2,
//             cpv: 1.67,
//             male: 55,
//             female: 45,
//             post_url: "https://example.com/post/2",
//             platform: platformTypesNum.instagram,
//             rate: 5.0,
//             post_deeplink: "https://instagram.com/p/123"
//         },
//         {
//             id: "order-3",
//             identifier: 3,
//             channel_id: "channel-789",
//             channel_url: "https://example.com/channel/789",
//             date_coming: "2024-01-22T09:00:00Z",
//             name: "Канал про путешествия",
//             category: "Путешествия",
//             avatar: "https://via.placeholder.com/100",
//             order_status: "Ожидание размещения",
//             api_status: orderStatus.wait,
//             publish_date: "2024-02-01",
//             publish_time: {
//                 time_from: "08:00",
//                 time_to: "22:00"
//             },
//             format: {
//                 small: "FullHd_horizontal",
//                 big: "FullHd_horizontal"
//             },
//             price: 100000,
//             subscribers: 300000,
//             views: 80000,
//             er: 10.5,
//             cpv: 1.25,
//             male: 40,
//             female: 60,
//             post_url: undefined,
//             desire: [],
//             platform: platformTypesNum.youtube,
//             rate: undefined,
//             post_deeplink: "https://youtube.com/watch?v=123"
//         },
//         {
//             id: "order-4",
//             identifier: 1,
//             channel_id: "channel-123",
//             channel_url: "https://example.com/channel/123",
//             date_coming: "2024-01-20T12:00:00Z",
//             name: "Канал про технологии",
//             category: "Технологии",
//             avatar: "https://via.placeholder.com/100",
//             order_status: "В процессе",
//             api_status: orderStatus.canceled,
//             publish_date: "2024-01-25",
//             publish_time: {
//                 time_from: "10:00",
//                 time_to: "18:00"
//             },
//             format: {
//                 small: "feed",
//                 big: "FullHd_vertical"
//             },
//             price: 50000,
//             subscribers: 150000,
//             views: 35000,
//             er: 8.5,
//             cpv: 1.43,
//             male: 65,
//             female: 35,
//             desire: [],
//             platform: platformTypesNum.telegram,
//             rate: 4.5,
//             post_deeplink: "https://t.me/channel/123"
//         },
//         {
//             id: "order-5",
//             identifier: 1,
//             channel_id: "channel-123",
//             channel_url: "https://example.com/channel/123",
//             date_coming: "2024-01-20T12:00:00Z",
//             name: "Канал про технологии",
//             category: "Технологии",
//             avatar: "https://via.placeholder.com/100",
//             order_status: "Пост размещен",
//             api_status: orderStatus.order_review,
//             publish_date: "2024-01-25",
//             publish_time: {
//                 time_from: "10:00",
//                 time_to: "18:00"
//             },
//             format: {
//                 small: "feed",
//                 big: "FullHd_vertical"
//             },
//             price: 50000,
//             subscribers: 150000,
//             views: 35000,
//             er: 8.5,
//             cpv: 1.43,
//             male: 65,
//             female: 35,
//             desire: [
//                 {
//                     desire_type: desireStatus.replace_channel_request,
//                     comment: "Нужно заменить канал"
//                 },
//                 {
//                     desire_type: desireStatus.replace_post_request,
//                     comment: "Нужно заменить пост на другой"
//                 }
//             ],
//             platform: platformTypesNum.telegram,
//             rate: 4.5,
//             post_deeplink: "https://t.me/channel/123"
//         },
//         {
//             id: "order-5",
//             identifier: 1,
//             channel_id: "channel-123",
//             channel_url: "https://example.com/channel/123",
//             date_coming: "2024-01-20T12:00:00Z",
//             name: "Канал про технологии",
//             category: "Технологии",
//             avatar: "https://via.placeholder.com/100",
//             order_status: "Пост размещен",
//             api_status: orderStatus.order_review,
//             publish_date: "2024-01-25",
//             publish_time: {
//                 time_from: "10:00",
//                 time_to: "18:00"
//             },
//             format: {
//                 small: "feed",
//                 big: "FullHd_vertical"
//             },
//             price: 50000,
//             subscribers: 150000,
//             views: 35000,
//             er: 8.5,
//             cpv: 1.43,
//             male: 65,
//             female: 35,
//             desire: [
//                 {
//                     desire_type: desireStatus.replace_post_request,
//                     comment: "Нужно заменить пост"
//                 }
//             ],
//             platform: platformTypesNum.telegram,
//             rate: 4.5,
//             post_deeplink: "https://t.me/channel/123"
//         },
//         {
//             id: "order-5",
//             identifier: 1,
//             channel_id: "channel-123",
//             channel_url: "https://example.com/channel/123",
//             date_coming: "2024-01-20T12:00:00Z",
//             name: "Канал про технологии",
//             category: "Технологии",
//             avatar: "https://via.placeholder.com/100",
//             order_status: "В процессе",
//             api_status: orderStatus.order_review,
//             publish_date: "2024-01-25",
//             publish_time: {
//                 time_from: "10:00",
//                 time_to: "18:00"
//             },
//             format: {
//                 small: "feed",
//                 big: "FullHd_vertical"
//             },
//             price: 50000,
//             subscribers: 150000,
//             views: 35000,
//             er: 8.5,
//             cpv: 1.43,
//             male: 65,
//             female: 35,
//             desire: [],
//             platform: platformTypesNum.telegram,
//             rate: 4.5,
//             post_deeplink: "https://t.me/channel/123"
//         },
//     ],
// };

interface AgencyProjectProps {
  project_data: IAgencyProjectCard;
  code: number;
}

export const AgencyProject: FC<AgencyProjectProps> = ({
  project_data,
  code,
}) => {
  return (
    <div className="grid grid-flow-row md:gap-10 gap-6 lg:mt-10 md:mt-6 mt-0">
      <TopInfo
        project_name={project_data.project_name}
        is_request_approve={project_data.is_request_approve!}
        count_channels={project_data.count_channels}
        budget={project_data.budget}
        views={project_data.views}
        in_progress={project_data.in_progress || 0}
        completed={project_data.completed}
        canceled={project_data.canceled_rejected || 0}
        wait={project_data.wait || 0}
        remainder={project_data.remainder}
        viewer={project_data.viewer}
        project_id={project_data.id}
        code={code}
      />
      <OrdersList
        orders={project_data.orders || []}
        is_request_approve={project_data.is_request_approve!}
        project_id={project_data.id}
        viewer={project_data.viewer}
        code={code}
      />
    </div>
  );
};
