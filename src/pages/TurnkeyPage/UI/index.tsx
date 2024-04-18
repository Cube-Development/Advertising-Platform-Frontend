import { TurnkeyCustomers } from "@widgets/turnkeyCustomers";
import { TurnkeyPartners } from "@widgets/turnkeyPartners";
import { TurnkeySteps } from "@widgets/turnkeySteps";
import { TurnkeyTop } from "@widgets/turnkeyTop";
import { FC } from "react";

export const TurnkeyPage: FC = () => {
  return (
    <>
      <TurnkeyTop />
      <TurnkeyPartners />
      <TurnkeySteps />
      <TurnkeyCustomers />
    </>
  );
};
