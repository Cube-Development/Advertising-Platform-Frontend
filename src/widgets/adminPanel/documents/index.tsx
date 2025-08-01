import {
  DocumentCard,
  EmptyState,
  IDocumentsForm,
  useGetDocumentsEDOQuery,
} from "@entities/documents";
import { SignDocument } from "@features/documents";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { NotLogin } from "@widgets/organization";
import { ArrowUpDown, FileWarning, PenTool } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  DOCUMENT_SIGNATURE_LIST,
  DOCUMENT_STATUS_LIST,
  DOCUMENT_TYPE_LIST,
  IDocumentTab,
} from "./model";
import { DocumentFilter } from "./UI";
import DidoxLogo from "/images/organization/didox-logo.svg";

export const Documents: FC = () => {
  const { t } = useTranslation();
  const { isAuthEcp } = useAppSelector((state) => state.user);

  const { watch, setValue } = useForm<IDocumentsForm>({
    defaultValues: {
      owner: 1 as 0 | 1,
      page: 1,
      limit: INTERSECTION_ELEMENTS.DOCUMENTS,
      categoryStatus: [],
      signStatus: [],
    },
  });

  const formState = watch();

  const getParams = {
    owner: formState?.owner,
    page: formState?.page,
    limit: formState?.limit,
    ...(formState?.categoryStatus?.length || formState?.signStatus?.length
      ? {
          status: [...formState?.categoryStatus, ...formState?.signStatus].join(
            ",",
          ),
        }
      : {}),
    ...(formState?.doctype ? { doctype: formState.doctype } : {}),
  };

  const { data, isLoading } = useGetDocumentsEDOQuery(
    { ...getParams },
    { skip: !isAuthEcp },
  );
  const { data: documents } = data || { data: [] };

  if (!isAuthEcp) {
    return <NotLogin />;
  }

  const handleChangeTab = (item: IDocumentTab) => {
    setValue("categoryStatus", item?.status || []);
    setValue("owner", item?.owner);
    setValue("page", 1);
  };

  const handleOnChangePage = () => {
    setValue("page", (formState?.page || 1) + 1);
  };

  const handleChangeDocType = (item: IDocumentTab) => {
    setValue("doctype", item?.docType!);
    setValue("page", 1);
  };
  const handleChangeSingStatus = (item: IDocumentTab) => {
    setValue("signStatus", item?.status || []);
    setValue("page", 1);
  };

  return (
    <div className="container">
      <div className="grid grid-flow-row gap-4">
        {/* Заголовок страницы */}
        <div className="!bg-[#341F47] p-5 grid grid-flow-row gap-4">
          <div className="grid items-end justify-start grid-flow-col gap-4">
            <img src={DidoxLogo} alt="didox-log" className="h-12" />
            <h1 className="text-3xl font-bold text-white">
              {t("admin_panel.documents.title")}
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-white">
              {t("admin_panel.documents.description")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 py-5">
          <DocumentFilter
            title={t("admin_panel.documents.tabs.category.title")}
            icon={ArrowUpDown}
            baseList={DOCUMENT_STATUS_LIST}
            onChange={handleChangeTab}
            defaultValue={DOCUMENT_STATUS_LIST?.findIndex(
              (item) =>
                item?.status === formState?.categoryStatus &&
                item?.owner === formState?.owner,
            )}
          />
          <DocumentFilter
            title={t("admin_panel.documents.tabs.type.title")}
            icon={FileWarning}
            baseList={DOCUMENT_TYPE_LIST}
            onChange={handleChangeDocType}
            defaultValue={DOCUMENT_TYPE_LIST?.findIndex(
              (item) => item?.docType === formState?.doctype,
            )}
          />
          <DocumentFilter
            title={t("admin_panel.documents.tabs.signature.title")}
            icon={PenTool}
            baseList={DOCUMENT_SIGNATURE_LIST}
            onChange={handleChangeSingStatus}
            defaultValue={DOCUMENT_SIGNATURE_LIST?.findIndex(
              (item) => item?.status === formState?.signStatus,
            )}
          />
        </div>

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
