import { FC } from "react";
import { Cta } from "@widgets/cta";
import { Services } from "@widgets/services";
import { Partners } from "@widgets/partners";
import { HowItWorks } from "@widgets/howItWorks";
import { WhyChooseUs } from "@widgets/whyChooseUs";
import { Customers } from "@widgets/customers";
import { CalculateIncome } from "@widgets/calculateIncome";

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
