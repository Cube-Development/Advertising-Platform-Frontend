import {
  DocumentCard,
  EmptyState,
  ENUM_DOCUMENT_STATUS,
  ENUM_DOCUMENT_STATUS_TAB,
  IDocumentsForm,
  useGetDocumentsEDOQuery,
} from "@entities/documents";
import { SignDocument } from "@features/documents";
import { OfferSignModal, useRenderOfferModal } from "@features/organization";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import {
  cn,
  CustomMiniTabItem,
  CustomMiniTabs,
  ShowMoreBtn,
  SpinnerLoader,
} from "@shared/ui";
import { NotLogin } from "@widgets/organization";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DOCUMENT_STATUS_LIST } from "./model";
import DidoxLogo from "/images/organization/didox-logo.svg";

export const Documents: FC = () => {
  const { t } = useTranslation();
  const { isAuthEcp } = useAppSelector((state) => state.user);
  const { isShowModal, setIsShowModal } = useRenderOfferModal();

  const { watch, setValue } = useForm<IDocumentsForm>({
    defaultValues: {
      owner: 1 as 0 | 1,
      page: 1,
      limit: INTERSECTION_ELEMENTS.DOCUMENTS,
      tabStatus: ENUM_DOCUMENT_STATUS_TAB.INBOX,
      categoryStatus: [],
    },
  });

  const formState = watch();

  const getParams = {
    owner: formState?.owner,
    page: formState?.page,
    limit: formState?.limit,
    ...(formState?.categoryStatus?.length
      ? { status: formState.categoryStatus.join(",") }
      : {}),
  };

  const { data, isLoading } = useGetDocumentsEDOQuery(
    { ...getParams },
    { skip: !isAuthEcp },
  );
  const { data: documents } = data || { data: [] };

  if (!isAuthEcp) {
    return <NotLogin />;
  }

  const handleChangeTab = (
    tab: ENUM_DOCUMENT_STATUS_TAB,
    categoryStatus: ENUM_DOCUMENT_STATUS[],
    owner?: 0 | 1,
  ) => {
    setValue("tabStatus", tab);
    setValue("categoryStatus", categoryStatus);
    setValue("owner", owner);
    setValue("page", 1);
  };

  const handleOnChangePage = () => {
    setValue("page", (formState?.page || 1) + 1);
  };

  return (
    <div className="container">
      <OfferSignModal
        open={isShowModal}
        haveTrigger={false}
        setOpen={setIsShowModal}
      />
      <div className="page_wrapper">
        {/* Заголовок страницы */}
        <div className="!bg-[#341F47] p-5 grid grid-flow-row gap-4">
          <div className="grid items-end justify-start grid-flow-col gap-4">
            <img src={DidoxLogo} alt="didox-log" className="h-12" />
            <h1 className="text-3xl font-bold text-white">
              {t("documents_page.title")}
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-white">{t("documents_page.description")}</p>
          </div>
        </div>

        <CustomMiniTabs>
          {DOCUMENT_STATUS_LIST.map((item) => (
            <CustomMiniTabItem
              key={item.tabStatus}
              onClick={() => {
                handleChangeTab(item.tabStatus, item.status, item?.owner);
              }}
              active={formState.tabStatus === item.tabStatus}
              className="flex items-center gap-2"
            >
              <div
                className={cn(
                  "p-1 rounded-lg transition-colors duration-200 ",
                  formState.tabStatus === item.tabStatus
                    ? "text-white bg-[#4d37b3]"
                    : "text-gray-600",
                )}
              >
                <item.icon size={20} />
              </div>
              {t(item.label)}
            </CustomMiniTabItem>
          ))}
        </CustomMiniTabs>

        {/* Сетка карточек документов */}

        {documents?.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 gap-6">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.doc_id}
                  document={doc}
                  signDocument={SignDocument}
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
