import { roles } from "@shared/config/roles";
import { useAppSelector } from "@shared/store";
import { AdvOrdersBlock } from "@widgets/advOrdersBlock";
import { ManagerOrdersBlock } from "@widgets/managerOrdersBlock";
import { FC } from "react";

export const OrdersPage: FC = () => {
  const { role } = useAppSelector((state) => state.user);

  return (
    <>
      {role === roles.advertiser ? (
        <AdvOrdersBlock />
      ) : (
        role === roles.manager && <ManagerOrdersBlock />
      )}
    </>
  );
};
