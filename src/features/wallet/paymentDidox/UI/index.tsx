import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const PaymentDidox: FC = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <MyButton
      {...props}
      // buttons_type="button__white"
      className={styles.button}
      type="submit"
    >
      {t(`topup_btn.send`)}
      <ArrowLongHorizontalIcon className="icon__white" />
    </MyButton>
  );
};
