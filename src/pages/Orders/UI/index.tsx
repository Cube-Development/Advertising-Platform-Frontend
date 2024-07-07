import { roles } from "@shared/config/roles";
import { useAppSelector } from "@shared/store";
import { AdvOrders, ManagerOrders } from "@widgets/project";
import { FC } from "react";

export const OrdersPage: FC = () => {
  const { role } = useAppSelector((state) => state.user);

  return (
    <>
      {role === roles.advertiser ? (
        <AdvOrders />
      ) : (
        role === roles.manager && <ManagerOrders />
      )}
    </>
  );
};
