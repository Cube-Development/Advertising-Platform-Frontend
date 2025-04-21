import { getAdminUsersReq, useGetAdminUsersQuery } from "@entities/admin";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { UsersList } from "../usersList";
import styles from "./styles.module.scss";

export const Users: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { watch, setValue } = useForm<getAdminUsersReq>({
    defaultValues: { elements_on_page: INTERSECTION_ELEMENTS.ADMIN_USERS },
  });
  const formFields = watch();
  const { data, isLoading, isFetching } = useGetAdminUsersQuery({
    ...formFields,
  });
  const handleOnChangePage = () => {
    setValue("last", data?.last);
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h1>{t("admin_panel.pages.users")}</h1>
          <p>
            {t("admin_panel.pages.home")}
            <span> / {t("admin_panel.pages.users")}</span>
          </p>
        </div>
        <div className={styles.table}>
          <UsersList
            data={data}
            isLoading={isLoading}
            isFetching={isFetching}
            handleChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
};
