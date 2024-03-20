import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { ProtectIcon3 } from "@shared/assets";
import { CreatePosts } from "@features/createPost";

export const CreatePost: FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div>
            <ProtectIcon3 />
          </div>
          <p>{t("cart.create_post.title")}</p>
          <span>{t("cart.create_post.text")}</span>
        </div>
        <div className={styles.data}>
          <div className={styles.data__row}>
            <p>{t("cart.create_post.subscribers")}</p>
            <span>2 083 015</span>
          </div>
          <div className={styles.data__row}>
            <p>{t("cart.create_post.views")}</p>
            <span>218 000</span>
          </div>
          <div className={styles.data__row}>
            <p>{t("cart.create_post.commission")}</p>
            <span>3%</span>
          </div>
        </div>
        <div className={styles.finnaly}>
          <p>{t("cart.create_post.commission")}:</p>
          <span>6 870 000 {t("symbol")}</span>
        </div>
        <div className={styles.button}>
          <CreatePosts />
        </div>
      </div>
    </div>
  );
};
