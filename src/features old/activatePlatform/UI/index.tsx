import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ActivatePlatformProps {
  onClick?: () => void;
}

export const ActivatePlatform: FC<ActivatePlatformProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <MyButton
      onClick={onClick}
      buttons_type="button__blue"
      className={styles.button}
    >
      {t(`platform_btn.activate`)}
    </MyButton>
  );
};
