import { Customers, Partners, Steps, Top } from "@widgets/turnkey";
import { FC } from "react";

export const TurnkeyPage: FC = () => {
  return (
    <>
      <Top />
      <Partners />
      <Steps />
      <Customers />
    </>
  );
};
