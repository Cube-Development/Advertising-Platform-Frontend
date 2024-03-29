import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { EyeDisabledIcon } from "@shared/assets/icons/eyeDisabled";
import { MyButton } from "@shared/ui";

interface PostDispayProps {}

export const PostDispay: FC<PostDispayProps> = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <p>{t("create_order.create.result")}</p>
      <div className={styles.middle}>
        <div>
          <EyeDisabledIcon />
        </div>
        <span>{t("create_order.create.post")}</span>
      </div>
      <div className={styles.bottom}>
        <MyButton className={styles.button}>
          <p>{t("create_order.create.template")}</p>
        </MyButton>
        <div>
          <div className={styles.stroke} />
        </div>
      </div>
    </div>
  );
};
