import {
  Cta,
  Customers,
  HowItWorks,
  Partners,
  Services,
  Turnkey,
  WhyChooseUs,
} from "@widgets/mainPages";
import { FC } from "react";

export const MainPage: FC = () => {
  const page = "main_page_advertiser";

  return (
    <>
      <Cta page={page} />
      <Services page={page} />
      <Partners page={page} />
      <HowItWorks page={page} />
      <WhyChooseUs page={page} />
      <Turnkey page={page} />
      <Customers page={page} />
    </>
  );
};
