import { roles } from "@shared/config/roles";
import { useAppSelector } from "@shared/store";
import { FC } from "react";

export const OrdersPage: FC = () => {
  const { role } = useAppSelector((state) => state.user);

  return (
    <>
      {/* {role === roles.advertiser ? (
        <AdvOrdersBlock />
      ) : (
        role === roles.manager && <ManagerOrdersBlock />
      )} */}
    </>
  );
};
