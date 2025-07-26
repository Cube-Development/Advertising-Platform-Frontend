import {
  DocumentCard,
  EmptyState,
  ENUM_DOCUMENT_STATUS,
  ENUM_DOCUMENT_STATUS_TAB,
  ENUM_DOCUMENT_TYPE,
  IDocumentsForm,
  useCreateDocumentEDOMutation,
  useGetDocumentsEDOQuery,
} from "@entities/documents";
import { SignDocument } from "@features/documents";
import {
  FILE_LINK,
  MockDocumentData,
} from "@features/documents/sign-document/mock";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import {
  cn,
  CustomMiniTabItem,
  CustomMiniTabs,
  ShowMoreBtn,
  SpinnerLoader,
} from "@shared/ui";
import { fileUrlToBase64 } from "@shared/utils";
import { NotLogin } from "@widgets/organization";
import { FileText } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DOCUMENT_STATUS_LIST } from "./model";
import DidoxLogo from "/images/organization/didox-logo.svg";

export const Documents: FC = () => {
  const { t } = useTranslation();

  const { watch, setValue } = useForm<IDocumentsForm>({
    defaultValues: {
      owner: 1 as 0 | 1,
      page: 1,
      limit: INTERSECTION_ELEMENTS.DOCUMENTS,
      tabStatus: ENUM_DOCUMENT_STATUS_TAB.INBOX,
      allStatus: [],
    },
  });

  const formState = watch();

  const getParams = {
    owner: formState?.owner,
    page: formState?.page,
    limit: formState?.limit,
    ...(formState?.allStatus?.length
      ? { status: formState.allStatus.join(",") }
      : {}),
  };

  const { data, isLoading } = useGetDocumentsEDOQuery({ ...getParams });
  const { data: documents } = data || { data: [] };

  const { isAuthEcp } = useAppSelector((state) => state.user);

  const [create, { isLoading: isCreating }] = useCreateDocumentEDOMutation();

  const handleNewDocument = async () => {
    const response = await fileUrlToBase64(FILE_LINK);
    console.log("Base64 of the document:", response);

    const document = await create({
      data: { data: MockDocumentData.data, document: response },
      type: ENUM_DOCUMENT_TYPE.CUSTOM_DOCUMENT,
      lang: "ru",
    }).unwrap();
  };

  if (!isAuthEcp) {
    return <NotLogin />;
  }

  const handleChangeTab = (
    tab: ENUM_DOCUMENT_STATUS_TAB,
    allTabs: ENUM_DOCUMENT_STATUS[],
    owner?: 0 | 1,
  ) => {
    setValue("tabStatus", tab);
    setValue("allStatus", allTabs);
    setValue("owner", owner);
    setValue("page", 1);
  };

  const handleOnChangePage = () => {
    setValue("page", (formState?.page || 1) + 1);
  };

  return (
    <div className="container">
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
            <div className="mt-4 sm:mt-0">
              <button
                onClick={handleNewDocument}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FileText className="w-4 h-4 mr-2" />
                Создать демо документ
              </button>
            </div>
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
