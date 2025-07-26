import { IUserDataNew } from "@entities/user";
import { MOCK_PROFILE } from "@shared/config";
import { cn } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface IUserDataFormProps {
  // add your props here
}

export const UserDataForm: FC<IUserDataFormProps> = ({}) => {
  const { t } = useTranslation();
  const data = MOCK_PROFILE as IUserDataNew;
  return (
    <div className={cn(styles.wrapper, "frame")}>
      <div className={styles.block}>
        <div className={styles.top}>
          <p>{t("profile.user_block.user_data.title")}</p>
          <button className={styles.button}>
            {t("profile.user_block.user_data.edit")}
          </button>
        </div>
        <div className={styles.data}>
          <div className={styles.row}>
            <span className={styles.label}>
              {t("profile.user_block.user_data.fields.name")}
            </span>
            <span className={styles.value}>{data?.name || "-"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>
              {t("profile.user_block.user_data.fields.email")}
            </span>
            <span className={styles.value}>{data?.email || "-"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>
              {t("profile.user_block.user_data.fields.date")}
            </span>
            <span className={styles.value}>
              {data?.registrationDate || "-"}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>
              {t("profile.user_block.user_data.fields.phone")}
            </span>
            <span className={styles.value}>{data?.phone || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
