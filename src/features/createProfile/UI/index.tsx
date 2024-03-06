import { paths } from "@shared/routing";
import { MyButton } from "@shared/ui";
import { ButtonHTMLAttributes, FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface CreateProfileProps {
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export const CreateProfile: FC<CreateProfileProps> = ({ props }) => {
  const { t } = useTranslation();

  return <MyButton {...props}>{t(`btn_add_profile`)}</MyButton>;
};
