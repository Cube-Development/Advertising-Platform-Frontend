import { FC } from "react";
import { Cta } from "@widgets/cta";
import { Services } from "@widgets/services";
import { Partners } from "@widgets/partners";
import { HowItWorks } from "@widgets/howItWorks";
import { WhyChooseUs } from "@widgets/whyChooseUs";
import { Turnkey } from "@widgets/turnkey";
import { Customers } from "@widgets/customers";

export const MainPage: FC = () => {
  const page = "main_page_advertiser";

  return (
    <>
      <Cta page={page} />
      {/* <Services page={page} />
      <Partners page={page} />
      <HowItWorks page={page} />
      <WhyChooseUs page={page} />
      <Turnkey page={page} />
      <Customers page={page} /> */}
    </>
  );
};
