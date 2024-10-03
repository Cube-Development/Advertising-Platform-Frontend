import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";

export const ApproveCampaign = () => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button__green" type="submit">
      {t(`create_order.payment.approve`)}
    </MyButton>
  );
};
