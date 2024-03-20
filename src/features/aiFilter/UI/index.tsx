import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { MyButton } from "@shared/ui";
import { RobotIcon } from "@shared/assets";

export const AiFilter: FC = () => {
  const { t } = useTranslation();
  return (
    <MyButton className={styles.button}>
      <div className={styles.wrapper}>
        <RobotIcon />
        {t(`catalog.generation_btn`)}
      </div>
    </MyButton>
  );
};
