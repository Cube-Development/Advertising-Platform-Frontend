import {
  ACCOUNTING_DATE_SORTING_LIST,
  ACCOUNTING_PERIOD_LIST,
  ACCOUNTING_SIGNATURE_LIST,
  ACCOUNTING_STATUS_LIST,
  AccountingCard,
  ADMIN_ACCOUNTING_PERIOD_DAYS,
  ADMIN_ACCOUNTING_STATUS,
  ADMIN_ACCOUNTING_TYPE,
  EmptyState,
  getAdminAccountingReq,
  IAccountingTab,
  useGetAdminAccountingQuery,
} from "@entities/admin";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { SignAccounting } from "@features/adminPanel";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { NotLogin } from "@widgets/organization";
import { ArrowUpDown, CalendarClock, PenTool } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getUtcDateMinusDays } from "./model";
import { AccountingFilter } from "./UI";

interface IAdminAccountingForm extends getAdminAccountingReq {
  period: ADMIN_ACCOUNTING_PERIOD_DAYS;
}

export const Accounting: FC = () => {
  const { t } = useTranslation();
  const { isAuthEcp } = useAppSelector((state) => state.user);

  const { watch, setValue, reset } = useForm<IAdminAccountingForm>({
    defaultValues: {
      page: 1,
      elements_on_page: INTERSECTION_ELEMENTS.ADMIN_ACCOUNTING,
      wallet: ENUM_WALLETS_TYPE.DEPOSIT,
      type: ADMIN_ACCOUNTING_TYPE.TOP_UP,
      status: ADMIN_ACCOUNTING_STATUS.PENDING,
      date_sort: dateSortingTypes.decrease,
      period: ADMIN_ACCOUNTING_PERIOD_DAYS.ALL,
    },
  });

  const formState = watch();

  const getParams: getAdminAccountingReq = {
    page: formState?.page,
    elements_on_page: formState?.elements_on_page,
    wallet: formState?.wallet,
    type: formState?.type,
    status: formState?.status,
    date_sort: formState?.date_sort,
    from_: getUtcDateMinusDays(formState?.period || 0),
  };

  const { data, isLoading } = useGetAdminAccountingQuery(
    { ...getParams },
    { skip: !isAuthEcp },
  );

  if (!isAuthEcp) {
    return <NotLogin />;
  }

  const handleChangeTab = (item: IAccountingTab) => {
    reset({
      ...formState,
      ...item,
    });
    setValue("page", 1);
  };

  const handleOnChangePage = () => {
    setValue("page", (formState?.page || 1) + 1);
  };

  return (
    <div className="container">
      <div className="grid grid-flow-row gap-4">
        {/* Заголовок страницы */}
        <div className="[background:var(--Gradients-Gradient-5)] grid grid-flow-row gap-4 p-5 rounded-[15px]">
          <h1 className="text-2xl font-bold text-white md:text-3xl leading-[0.75]">
            {t("admin_panel.accounting.title")}
          </h1>
          <div className="flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between md:text-lg">
            <p className="text-white">
              {t("admin_panel.accounting.description")}
            </p>
          </div>
        </div>

        <div className="grid grid-rows-4 gap-4 py-5 md:grid-cols-4 md:grid-rows-1">
          <AccountingFilter
            title={t("admin_panel.accounting.tabs.category.title")}
            icon={ArrowUpDown}
            baseList={ACCOUNTING_STATUS_LIST}
            onChange={handleChangeTab}
            defaultValue={ACCOUNTING_STATUS_LIST?.findIndex(
              (item) =>
                item?.wallet === formState?.wallet &&
                item?.type === formState?.type,
            )}
          />
          <AccountingFilter
            title={t("admin_panel.accounting.tabs.signature.title")}
            icon={PenTool}
            baseList={ACCOUNTING_SIGNATURE_LIST}
            onChange={handleChangeTab}
            defaultValue={ACCOUNTING_SIGNATURE_LIST?.findIndex(
              (item) => item?.status === formState?.status,
            )}
          />
          <AccountingFilter
            title={t("admin_panel.accounting.tabs.period.title")}
            icon={CalendarClock}
            baseList={ACCOUNTING_PERIOD_LIST}
            onChange={handleChangeTab}
            defaultValue={ACCOUNTING_PERIOD_LIST?.findIndex(
              (item) => item?.period === formState?.period,
            )}
          />
          <AccountingFilter
            title={t("admin_panel.accounting.tabs.sorting.title")}
            icon={ArrowUpDown}
            baseList={ACCOUNTING_DATE_SORTING_LIST}
            onChange={handleChangeTab}
            defaultValue={ACCOUNTING_DATE_SORTING_LIST?.findIndex(
              (item) => item?.date_sort === formState?.date_sort,
            )}
          />
        </div>

        {/* Сетка карточек документов */}

        {!!data?.items?.length ? (
          <div>
            <div className="grid grid-cols-1 gap-6">
              {data?.items?.map((item) => (
                <AccountingCard
                  key={item.id}
                  transaction={item}
                  signAccounting={SignAccounting}
                />
              ))}
            </div>
            {!data?.isLast && (
              <div
                className="grid items-center justify-center"
                onClick={handleOnChangePage}
              >
                {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
              </div>
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};
