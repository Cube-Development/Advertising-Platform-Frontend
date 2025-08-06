import {
  ENUM_ORGANIZATION_STATUS,
  ORGANIZATION_STATUS_LIST,
  useGetOrganizationQuery,
} from "@entities/organization";
import {
  ENUM_ORGANIZATION_TYPE,
  IUserDataNew,
  useGetUserQueryQuery,
} from "@entities/user";
import { OfferSignModal } from "@features/organization";
import { MOCK_PROFILE } from "@shared/config";
import { cn } from "@shared/ui";
import { formatDate } from "@shared/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface IUserDataFormProps {
  // add your props here
}

export const UserDataForm: FC<IUserDataFormProps> = ({}) => {
  const { t } = useTranslation();
  const data = MOCK_PROFILE as IUserDataNew;
  const { data: organization } = useGetOrganizationQuery();
  const { data: user } = useGetUserQueryQuery();
  const status =
    ORGANIZATION_STATUS_LIST.find(
      (item) => item.status === organization?.status,
    )?.label || "";

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
            <span className={styles.value}>
              {user?.email || "_______________"}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>
              {t("profile.user_block.user_data.fields.date")}
            </span>
            <span className={styles.value}>
              {user?.created ? formatDate(user?.created) : "_______________"}
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
      {!!organization && (
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
                {data?.organization?.type ===
                ENUM_ORGANIZATION_TYPE.SELF_EMPLOYED
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

            {organization?.PINFL ? (
              <div className={styles.row}>
                <span className={styles.label}>
                  {t("profile.user_block.organization_data.fields.pinfl")}
                </span>
                <span className={styles.value}>{organization?.PINFL}</span>
              </div>
            ) : (
              <div className={styles.row}>
                <span className={styles.label}>
                  {t("profile.user_block.organization_data.fields.inn")}
                </span>
                <span className={styles.value}>{organization?.TIN}</span>
              </div>
            )}
            <div className={styles.row}>
              <span className={styles.label}>
                {t("profile.user_block.organization_data.fields.status")}
              </span>
              <span
                className={cn(
                  styles.value,
                  organization?.status === ENUM_ORGANIZATION_STATUS.ACTIVE
                    ? styles.approved
                    : styles.not_approved,
                )}
              >
                {t(status)}
              </span>
            </div>
            <OfferSignModal />
          </div>
        </div>
      )}
    </div>
  );
};
