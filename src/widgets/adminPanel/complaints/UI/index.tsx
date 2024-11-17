import {
  adminComplaintTypesFilter,
  adminReviewTypesFilter,
  complaintStatus,
  IAdminComplaints,
  IAdminReviews,
} from "@entities/admin";
import { dateSortingTypes } from "@entities/platform";
import { HistoryReq, useGetHistoryQuery } from "@entities/wallet";
import { BarSubfilter } from "@features/other";
import {
  AdminComplaints,
  INTERSECTION_ELEMENTS,
  Languages,
} from "@shared/config";
import { pageFilter } from "@shared/routing";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ComplaintsList } from "../complaintsList";
import styles from "./styles.module.scss";

export const Complaints: FC = () => {
  const { t, i18n } = useTranslation();
  const wait = AdminComplaints.filter(
    (item) => item.status === complaintStatus.wait,
  );
  const active = AdminComplaints.filter(
    (item) => item.status === complaintStatus.active,
  );
  const complite = AdminComplaints.filter(
    (item) => item.status === complaintStatus.complite,
  );

  const [complaintsFilter, setComplaintFilter] =
    useState<adminComplaintTypesFilter>(adminComplaintTypesFilter.wait);
  const [complaintsData, setComplaintsData] = useState<IAdminComplaints>({
    page: 1,
    elements: wait.length,
    complaints: wait.slice(0, INTERSECTION_ELEMENTS.adminComplaints),
  });

  useEffect(() => {
    if (complaintsFilter === adminComplaintTypesFilter.wait) {
      setComplaintsData({
        ...complaintsData,
        elements: wait.length,
        complaints: wait.slice(
          0,
          complaintsData.page * INTERSECTION_ELEMENTS.adminComplaints,
        ),
      });
    } else if (complaintsFilter === adminComplaintTypesFilter.active) {
      setComplaintsData({
        ...complaintsData,
        elements: active.length,
        complaints: active,
      });
    } else {
      setComplaintsData({
        ...complaintsData,
        elements: complite.length,
        complaints: complite,
      });
    }
  }, [complaintsFilter]);

  const handle = () => {};

  ////
  // удалить

  const language = Languages.find((lang) => lang.name === i18n.language);
  const [currentPage, setCurrentPage] = useState(1);

  const getParams: HistoryReq = {
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.history,
    date_sort: dateSortingTypes.decrease,
  };

  const { data, isLoading, isFetching } = useGetHistoryQuery(getParams);

  const handleOnChangePage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setComplaintsData({ ...complaintsData, page: complaintsData.page + 1 });
  };

  /////

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
              resetValues={handle}
              complaintsFilter={complaintsFilter}
              changeComplaintsFilter={setComplaintFilter}
            />
          </div>
          <ComplaintsList
            data={complaintsData}
            isLoading={isLoading}
            isFetching={isFetching}
            handleChange={handleOnChangePage}
            status={complaintsFilter}
          />
        </div>
      </div>
    </div>
  );
};
