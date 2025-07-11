import { FC } from "react";
import styles from "./styles.module.scss";
import { cn } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { MOCK_PROFILE } from "@shared/config";
import {
  ENUM_ORGANIZATION_STATUS,
  ENUM_ORGANIZATION_TYPE,
  IUserDataNew,
} from "@entities/user";

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
      <div className={styles.block}>
        <div className={styles.top}>
          <p>{t("profile.user_block.organization_data.title")}</p>
          <button className={styles.button}>
            {t("profile.user_block.organization_data.edit")}
          </button>
        </div>
        <div className={styles.data}>
          <div className={styles.row}>
            <span className={styles.label}>
              {t("profile.user_block.organization_data.fields.type")}
            </span>
            <span className={styles.value}>
              {data?.organization?.type === ENUM_ORGANIZATION_TYPE.SELF_EMPLOYED
                ? t(
                    "profile.user_block.organization_data.organization_types.self_employed",
                  )
                : data?.organization?.type ===
                    ENUM_ORGANIZATION_TYPE.LEGAL_ENTITY
                  ? t(
                      "profile.user_block.organization_data.organization_types.entity",
                    )
                  : t(
                      "profile.user_block.organization_data.organization_types.individual",
                    )}
            </span>
          </div>

          {data?.organization?.pinfl ? (
            <div className={styles.row}>
              <span className={styles.label}>
                {t("profile.user_block.organization_data.fields.pinfl")}
              </span>
              <span className={styles.value}>{data?.organization?.pinfl}</span>
            </div>
          ) : (
            <div className={styles.row}>
              <span className={styles.label}>
                {t("profile.user_block.organization_data.fields.inn")}
              </span>
              <span className={styles.value}>{data?.organization?.inn}</span>
            </div>
          )}
          <div className={styles.row}>
            <span className={styles.label}>
              {t("profile.user_block.organization_data.fields.status")}
            </span>
            <span
              className={cn(
                styles.value,
                data?.organization?.status === ENUM_ORGANIZATION_STATUS.APPROVED
                  ? styles.approved
                  : styles.not_approved,
              )}
            >
              {data?.organization?.status === ENUM_ORGANIZATION_STATUS.APPROVED
                ? t(
                    "profile.user_block.organization_data.status_types.approved",
                  )
                : t(
                    "profile.user_block.organization_data.status_types.not_approved",
                  )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
