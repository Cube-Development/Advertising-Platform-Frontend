import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { MyButton } from "@shared/ui";
import { ArrowLongHorizontalIcon } from "@shared/assets";

interface PostGenerationProps {}

export const PostGeneration: FC<PostGenerationProps> = () => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button_white" className={styles.button}>
      {t(`create_order.create.generation`)}
      <ArrowLongHorizontalIcon className="active__icon" />
    </MyButton>
  );
};
