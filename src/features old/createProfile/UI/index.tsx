import { MyButton } from "@shared/ui";
import { ButtonHTMLAttributes, FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface CreateProfileProps {
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export const CreateProfile: FC<CreateProfileProps> = ({ props }) => {
  const { t } = useTranslation();

  return (
    <MyButton type="submit" {...props}>
      {t(`btn_add_profile`)}
    </MyButton>
  );
};
