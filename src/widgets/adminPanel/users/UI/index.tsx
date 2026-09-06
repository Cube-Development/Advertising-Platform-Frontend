import {
  ADMIN_USER_FILTER_ALL,
  ADMIN_USER_FILTER_TABS,
  ADMIN_USER_STATUS,
  AdminUserStatusFilter,
  IGetAdminUsersReq,
  useGetAdminUsersQuery,
} from "@entities/admin-panel";
import { channelData } from "@entities/channel";
import { SearchFilter } from "@features/catalog";
import { BarStatusFilter } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { UsersList } from "../users-list";
import styles from "./styles.module.scss";

type UsersForm = Omit<IGetAdminUsersReq, "status"> & {
  statusFilter: AdminUserStatusFilter;
  search?: string | null;
};

const SEARCH_FIELD = "search" as channelData;

const USER_STATUS_TABS = ADMIN_USER_FILTER_TABS.map((tab) => ({
  name: tab.name,
  type: tab.type,
}));

export const Users: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { watch, setValue } = useForm<UsersForm>({
    defaultValues: {
      elements_on_page: INTERSECTION_ELEMENTS.ADMIN_USERS,
      search: "",
      statusFilter: ADMIN_USER_FILTER_ALL,
    },
  });
  const formFields = watch();
  const { search, statusFilter, last, elements_on_page } = formFields;

  const queryArgs: IGetAdminUsersReq = {
    elements_on_page,
    ...(last ? { last } : {}),
    ...(search?.trim() ? { search: search.trim() } : {}),
    ...(statusFilter !== ADMIN_USER_FILTER_ALL
      ? { status: statusFilter as ADMIN_USER_STATUS }
      : {}),
  };

  const { data, isLoading, isFetching } = useGetAdminUsersQuery(queryArgs, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data:
        ((data?.search ?? null) === (search?.trim() || null) &&
          data?.status ===
            (statusFilter !== ADMIN_USER_FILTER_ALL
              ? statusFilter
              : undefined) &&
          data) ||
        undefined,
    }),
  });

  const handleOnChangePage = () => {
    if (data?.last) {
      setValue("last", data.last);
    }
  };

  const changeTab = (filter: AdminUserStatusFilter) => {
    setValue("last", undefined);
    setValue("statusFilter", filter);
  };

  useEffect(() => {
    setValue("last", undefined);
  }, [formFields.search, formFields.statusFilter, setValue]);

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{t("admin_panel.pages.users")}</h1>
        <div className={styles.filters}>
          <div className="grid grid-flow-row gap-3">
            <div className="w-full max-w-[420px]">
              <SearchFilter
                type={SEARCH_FIELD}
                onChange={setValue}
                value={formFields.search || ""}
              />
            </div>
            <BarStatusFilter
              changeStatus={(v) => changeTab(v as AdminUserStatusFilter)}
              statusFilter={formFields.statusFilter}
              projectStatus={USER_STATUS_TABS}
            />
          </div>
        </div>
        <UsersList
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          handleChange={handleOnChangePage}
        />
      </div>
    </div>
  );
};
