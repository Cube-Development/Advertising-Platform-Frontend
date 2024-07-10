import { FC } from "react";
import { MyButton } from "@shared/ui";
import { ArrowLongHorizontalIcon } from "@shared/assets";
import { useTranslation } from "react-i18next";

interface ContinueOrderProps {
  onClick: () => void;
}

export const ContinueOrder: FC<ContinueOrderProps> = (props) => {
  const { t } = useTranslation();
  return (
    <MyButton type="button" buttons_type="button__blue" {...props}>
      {t(`order_btn.continue`)}
      <ArrowLongHorizontalIcon className="default__icon__white" />
    </MyButton>
  );
};
