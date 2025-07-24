import {
  DocumentCard,
  ENUM_DOCUMENT_TYPE,
  useCreateDocumentEDOMutation,
  useGetDocumentsEDOQuery,
} from "@entities/documents";
import { SignDocument } from "@features/documents";
import {
  FILE_LINK,
  MockDocumentData,
} from "@features/documents/sign-document/mock";
import { fileUrlToBase64 } from "@shared/utils";
import { FileText } from "lucide-react";
import { FC } from "react";

export const DocumentsPage: FC = () => {
  const { data, isLoading } = useGetDocumentsEDOQuery({
    owner: 1,
    page: 1,
    limit: 100,
    status: "0",
  });
  const { data: documents } = data || { data: [] };

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

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Заголовок страницы */}
        <div className="mb-8">
          <div className="flex flex-col mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                Документы
              </h1>
              <p className="text-gray-600">
                Список документов для просмотра и подписания
              </p>
            </div>
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

        {/* Сетка карточек документов */}
        <div className="grid grid-cols-1 gap-6">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.doc_id}
              document={doc}
              signDocument={SignDocument}
            />
          ))}
        </div>

        {/* Сообщение, если документов нет */}
        {documents.length === 0 && (
          <div className="py-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Документы не найдены
            </h3>
            <p className="text-gray-500">
              На данный момент нет документов для отображения.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
