import { useGetAdminUserInfoQuery } from "@entities/admin";
import { useClearCookiesOnPage } from "@shared/hooks";
import { paths } from "@shared/routing";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.scss";

export const UserInfo: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { id: user_id } = useParams<{ id: string }>();
  // const { setValue, watch } = useForm<IAdminUserInfo>({
  //   defaultValues: {
  //     name: card?.name || "",
  //     email: card?.email || "",
  //     // phone: card?.phone || "",
  //     // location: card?.location || "",
  //     password: "",
  //     // telegram: card?.telegram || "",
  //   },
  // });
  // const formState = watch();

  const {
    data: card,
    isLoading,
    isFetching,
  } = useGetAdminUserInfoQuery({
    id: user_id || "",
  });

  // const card = AdmiinComplaintInfo;
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Link to={paths.adminUsers}>
            <h1>{t("admin_panel.pages.users")}</h1>
          </Link>
          <Link to={paths.adminUsers}>
            <p>
              {t("admin_panel.pages.home")}
              <span>
                {" "}
                / {t("admin_panel.pages.users")} / #{user_id}
              </span>
            </p>
          </Link>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>{t("admin_panel.userInfo.card.title")}</p>
          <div className={styles.info}>
            <div className={styles.input__wrapper}>
              <span>{t("admin_panel.userInfo.card.first_name")}</span>
              <input
                value={card?.first_name}
                disabled={true}
                // onChange={(e) => setValue("name", e.target.value)}
              />
            </div>
            <div className={styles.input__wrapper}>
              <span>{t("admin_panel.userInfo.card.surname")}</span>
              <input
                value={card?.surname}
                disabled={true}
                // onChange={(e) => setValue("name", e.target.value)}
              />
            </div>
            <div className={styles.input__wrapper}>
              <span>{t("admin_panel.userInfo.card.email")}</span>
              <input
                value={card?.email}
                disabled={true}
                // onChange={(e) => setValue("email", e.target.value)}
              />
            </div>
            <div className={styles.input__wrapper}>
              <span>{t("admin_panel.userInfo.card.phone")}</span>
              <input
                value={card?.phone}
                disabled={true}
                // onChange={(e) => setValue("phone", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
