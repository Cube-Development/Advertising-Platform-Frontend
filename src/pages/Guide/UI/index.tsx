import { FC, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Document, Page } from "react-pdf";
import { GUIDES_LIST } from "@entities/faq";
import { ENUM_PATHS } from "@shared/routing";
import { ArrowLeft, Loader2 } from "lucide-react";
import "@shared/config/pdf";

export const GuidePage: FC = () => {
  const { guide_id } = useParams();
  const guide = GUIDES_LIST.find((guide) => guide.guide_id === guide_id);
  const [numPages, setNumPages] = useState<number>(0);
  const { t, i18n } = useTranslation();

  if (!guide) {
    return <Navigate to={ENUM_PATHS.FAQ} />;
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const getPageWidth = () => {
    const containerWidth = Math.min(1200, window.innerWidth - 64);
    return containerWidth;
  };

  return (
    <div className="min-h-screen">
      <div className="container md:py-6 py-4">
        <Link
          to={ENUM_PATHS.FAQ}
          className="w-fit my-10 block bg-[var(--Personal-colors-main2)] hover:scale-105 border-[var(--Personal-colors-main)] rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out"
        >
          <ArrowLeft className="mobile-xl:size-10 size-6 stroke-[1px] text-white" />
        </Link>
        <h1 className="text-center lg:text-2xl md:text-xl mobile-xl:text-lg text-base font-semibold text-gray-800 mb-6">
          {t(guide.title)}
        </h1>
      </div>
      <div className="container pb-6">
        <div className="w-full rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-200 p-4">
          <Document
            file={
              guide.guide_source[
                i18n.language as keyof typeof guide.guide_source
              ]
            }
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex justify-center items-center py-20">
                <Loader2 className="size-8 animate-spin text-blue-600" />
              </div>
            }
            error={
              <div className="flex justify-center items-center py-20 text-red-600">
                Ошибка загрузки PDF
              </div>
            }
            className="flex flex-col items-center gap-4"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-lg"
                width={getPageWidth()}
                loading=""
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};
