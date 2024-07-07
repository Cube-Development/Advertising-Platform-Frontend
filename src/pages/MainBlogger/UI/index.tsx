import { FC } from "react";
import {
  CalculateIncome,
  Cta,
  Customers,
  HowItWorks,
  Partners,
  Services,
  WhyChooseUs,
} from "@widgets/mainPages";

export const MainBloggerPage: FC = () => {
  const page = "main_page_blogger";
  return (
    <>
      <Cta page={page} />
      <Services page={page} />
      <Partners page={page} />
      <HowItWorks page={page} />
      <WhyChooseUs page={page} />
      <CalculateIncome page={page} />
      <Customers page={page} />
    </>
  );
};
