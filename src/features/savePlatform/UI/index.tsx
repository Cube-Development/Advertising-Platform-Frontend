import { MyButton } from "@shared/ui";
import { ButtonHTMLAttributes, FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const SavePlatform: FC = () => {
  const { t } = useTranslation();

  return <MyButton>{t(`add_platform_btn.save`)}</MyButton>;
};
