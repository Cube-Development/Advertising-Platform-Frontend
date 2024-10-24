import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { SaveIcon } from "@shared/assets";

export const SaveCart: FC = () => {
  const { t } = useTranslation();
  return (
    <MyButton className={styles.button}>
      <SaveIcon />
      <p className="gradient_color">{t(`cart_btn.save`)}</p>
    </MyButton>
  );
};
