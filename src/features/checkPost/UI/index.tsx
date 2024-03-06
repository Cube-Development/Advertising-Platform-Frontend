import { ArrowIcon2 } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const CheckPost: FC = () => {
  const { t } = useTranslation();
  return (
    <MyButton className={styles.button}>
      <div>
        {t(`order_btn.check`)}
        <ArrowIcon2 />
      </div>
    </MyButton>
  );
};
