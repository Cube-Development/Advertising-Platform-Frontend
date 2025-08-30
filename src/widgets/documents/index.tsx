import {
  DocumentCard,
  DocumentSelect,
  EmptyState,
  ENUM_DOCUMENT_STATUS_TAB,
  IDocumentsForm,
  IDocumentTab,
  useGetDocumentsEDOQuery,
} from "@entities/documents";
import { SignDocument } from "@features/documents";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { NotLogin } from "@widgets/organization";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DOCUMENT_STATUS_LIST } from "./model";
import DidoxLogo from "/images/organization/didox-logo.svg";

export const Documents: FC = () => {
  const { t } = useTranslation();
  const { isAuthEcp } = useAppSelector((state) => state.user);

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

  const { data, isLoading, isFetching } = useGetDocumentsEDOQuery(
    { ...getParams },
    { skip: !isAuthEcp },
  );
  const { data: documents } = data || { data: [] };

  if (!isAuthEcp) {
    return <NotLogin />;
  }

  const handleChangeTab = (item: IDocumentTab) => {
    setValue("tabStatus", item?.tabStatus!);
    setValue("categoryStatus", item?.status!);
    setValue("owner", item?.owner);
    setValue("page", 1);
  };

  const handleOnChangePage = () => {
    setValue("page", (formState?.page || 1) + 1);
  };

  return (
    <div className="container">
      <div className="page_wrapper">
        {/* Заголовок страницы */}
        <div className="!bg-[#341F47] p-5 grid grid-flow-row gap-4 rounded-[15px]">
          <div className="grid items-end justify-start grid-flow-col gap-2 md:gap-4">
            <img src={DidoxLogo} alt="didox-log" className="h-8 md:h-12" />
            {/* <h1 className="text-2xl font-bold text-white md:text-3xl leading-[0.75]">
              {t("documents_page.title")}
            </h1> */}
          </div>
          <div className="flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between md:text-lg">
            <p className="text-white">{t("documents_page.description")}</p>
          </div>
        </div>

        <DocumentSelect
          tabs={DOCUMENT_STATUS_LIST}
          activeTab={formState?.tabStatus}
          onClick={handleChangeTab}
        />

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
                {isLoading || isFetching ? <SpinnerLoader /> : <ShowMoreBtn />}
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
