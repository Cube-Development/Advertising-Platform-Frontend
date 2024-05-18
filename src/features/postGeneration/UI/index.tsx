import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface PostGenerationProps {}

export const PostGeneration: FC<PostGenerationProps> = () => {
  const { t } = useTranslation();
  return (
    <MyButton
      type="button"
      buttons_type="button_white"
      className={styles.button}
    >
      {t(`create_order.create.generation`)}
      <ArrowLongHorizontalIcon className="active__icon" />
    </MyButton>
  );
};
