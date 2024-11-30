import {
  adminComplaintForm,
  adminComplaintTypesFilter,
  getAdminOrderComplaintsReq,
  useGetAdminOrderComplaintsQuery,
} from "@entities/admin";
import { BarSubfilter } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ComplaintsList } from "../complaintsList";
import styles from "./styles.module.scss";

export const Complaints: FC = () => {
  const { t } = useTranslation();
  const { watch, setValue } = useForm<getAdminOrderComplaintsReq>({
    defaultValues: {
      page: 1,
      elements_on_page: INTERSECTION_ELEMENTS.adminComplaints,
      order_complaint_status: adminComplaintTypesFilter.wait,
    },
  });
  const formFields = watch();
  const { data, isLoading, isFetching } = useGetAdminOrderComplaintsQuery({
    ...formFields,
  });

  const handleOnChangePage = () => {
    setValue(adminComplaintForm.page, formFields?.page + 1);
  };

  const setComplaintFilter = (filter: adminComplaintTypesFilter) => {
    setValue(adminComplaintForm.page, 1);
    setValue(adminComplaintForm.order_complaint_status, filter);
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
            isLoading={isLoading}
            isFetching={isFetching}
            handleChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
};
