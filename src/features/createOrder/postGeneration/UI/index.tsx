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
      buttons_type="button__white"
      className={styles.button}
    >
      <p className="truncate">{t(`create_order.create.generation`)}</p>
      <div>
        <ArrowLongHorizontalIcon className="active__icon" />
      </div>
    </MyButton>
  );
};
