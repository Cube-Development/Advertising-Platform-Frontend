import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { PostIcon } from "@shared/assets";

export const SeePost: FC = () => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button__white" className={styles.button}>
      {t(`offer_btn.see_post`)} <PostIcon />
    </MyButton>
  );
};
