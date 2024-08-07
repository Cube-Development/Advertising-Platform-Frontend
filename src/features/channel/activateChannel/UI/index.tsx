import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ActivateChannelProps {
  onClick?: () => void;
}

export const ActivateChannel: FC<ActivateChannelProps> = ({ onClick }) => {
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
