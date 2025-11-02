import { FC } from "react";
import {
  ENUM_VIEWER_ROLES,
  IAgencyOrderCard,
  projectStatus,
} from "@entities/project";
import { OrderCard } from "../order-card/order-card";
import {
  CheckPost,
  ReplaceChannel,
  ReplacePost,
  SeePost,
} from "@features/order";

interface OrdersListProps {
  orders: IAgencyOrderCard[];
  is_request_approve: projectStatus;
  project_id: string;
  viewer: ENUM_VIEWER_ROLES;
  code: number;
}

export const OrdersList: FC<OrdersListProps> = ({
  orders,
  is_request_approve,
  project_id,
  viewer,
  code,
}) => {
  return (
    <div className="shadow-lg rounded-[20px] border-[1px] border-[var(--Card-separator)] overflow-hidden">
      {orders?.map((order) => (
        <OrderCard
          key={order.id}
          is_request_approve={is_request_approve}
          project_id={project_id}
          subcard={order}
          CheckBtn={CheckPost}
          SeePostBtn={SeePost}
          ReplaceChannelBtn={ReplaceChannel}
          ReplacePostBtn={ReplacePost}
          viewer={viewer}
          code={code}
        />
      ))}
    </div>
  );
};
