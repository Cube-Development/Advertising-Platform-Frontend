import {
  ADMIN_COMPLAINT_FORM,
  ADMIN_COMPLAINT_STATUS,
  getAdminOrderComplaintsReq,
  useGetAdminOrderComplaintsQuery,
} from "@entities/admin";
import { BarSubfilter } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { pageFilter } from "@shared/routing";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ComplaintsList } from "../complaintsList";
import styles from "./styles.module.scss";

export const Complaints: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { watch, setValue } = useForm<getAdminOrderComplaintsReq>({
    defaultValues: {
      page: 1,
      elements_on_page: INTERSECTION_ELEMENTS.ADMIN_COMPLAINTS,
      order_complaint_status: ADMIN_COMPLAINT_STATUS.WAIT,
    },
  });
  const formFields = watch();
  const { data, isLoading, isFetching } = useGetAdminOrderComplaintsQuery({
    ...formFields,
  });

  const handleOnChangePage = () => {
    setValue(ADMIN_COMPLAINT_FORM.PAGE, formFields?.page + 1);
  };

  const setComplaintFilter = (filter: ADMIN_COMPLAINT_STATUS) => {
    setValue(ADMIN_COMPLAINT_FORM.PAGE, 1);
    setValue(ADMIN_COMPLAINT_FORM.STATUS, filter);
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h1>{t("admin_panel.pages.complaints")}</h1>
          <p>
            {t("admin_panel.pages.moderation")}
            <span> / {t("admin_panel.pages.complaints")}</span>
          </p>
        </div>
        <div className={styles.table}>
          <div className={styles.filter}>
            <BarSubfilter
              page={pageFilter.adminComplaint}
              resetValues={() => {}}
              complaintsFilter={formFields?.order_complaint_status}
              changeComplaintsFilter={setComplaintFilter}
            />
          </div>
          <ComplaintsList
            data={
              (data?.order_complaint_status ===
                formFields.order_complaint_status &&
                data) ||
              undefined
            }
            status={formFields.order_complaint_status}
            isLoading={isLoading}
            isFetching={isFetching}
            handleChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
};
