import { ArrowIcon2 } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const PaymentDidox: FC = () => {
  const { t } = useTranslation();
  return (
    <MyButton className={styles.button}>
      <div>
        {t(`topup_btn.send`)}
        <ArrowIcon2 />
      </div>
    </MyButton>
  );
};
