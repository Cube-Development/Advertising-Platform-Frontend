import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface CreatePostProps {
  onClick?: () => void;
}

export const CreatePost: FC<CreatePostProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <MyButton
      buttons_type="button__green"
      onClick={onClick}
      className={styles.button}
    >
      <p>{t(`cart_btn.create_post`)}</p>
      <ArrowLongHorizontalIcon className="default__icon__white" />
    </MyButton>
  );
};
