import { EyeDisabledIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

export const EmptyPost = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      {/* <p className={styles.result}>{t("create_order.create.result")}</p> */}
      <p></p>
      <div className={styles.middle}>
        <div>
          <EyeDisabledIcon />
        </div>
        <span>{t("create_order.create.post")}</span>
      </div>
      <div className={styles.bottom}>
        <MyButton className={styles.button}>
          <p className="gradient_color">{t("create_order.create.template")}</p>
        </MyButton>
        <div>
          <div className={styles.stroke} />
        </div>
      </div>
    </div>
  );
};
