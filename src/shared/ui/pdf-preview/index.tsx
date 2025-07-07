import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { Download, Loader } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Document, Page } from "react-pdf";
import { Button } from "../shadcn-ui";
import { downloadFileOnDevice } from "@shared/utils";

interface IPdfPreviewProps {
  pdfUrl: string;
  filename?: string;
}

export const PdfPreview: FC<IPdfPreviewProps> = ({ pdfUrl, filename }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const screen = useWindowWidth();
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  const getPageWidth = () => {
    if (screen >= BREAKPOINT.LG) return 800;
    if (screen >= BREAKPOINT.MD) return screen - 2 * 30; // 708
    if (screen >= BREAKPOINT.SM) return screen - 2 * 20; // 526
    if (screen >= BREAKPOINT.XS) return screen - 2 * 20; // 335
    return screen - 2 * 15; // fallback
  };

  const pageWidth = getPageWidth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const index = pagesRef.current.findIndex(
            (el) => el === visibleEntry.target,
          );
          if (index !== -1) setCurrentPage(index + 1);
        }
      },
      {
        root: null,
        threshold: 0.5,
      },
    );

    pagesRef.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [numPages]);

  const handleDownload = () => {
    downloadFileOnDevice(pdfUrl, (filename || "File") + ".pdf");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-center ">
        <div
          className="flex flex-row items-center justify-between"
          style={{ width: pageWidth }}
        >
          <div className="flex flex-row gap-2 py-2 px-6  text-sm font-medium text-center text-white rounded-lg grid-col top-2 right-2 bg-black/60 w-[200px] justify-between">
            <span>{t("pdf_previewer.page")}</span>
            <span>
              {currentPage} / {numPages}
            </span>
          </div>
          <div>
            <Button variant="outline" onClick={handleDownload}>
              <Download size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative h-screen pb-5 -m-3 overflow-y-scroll scroll-snap-y-mandatory scroll">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-row gap-1 h-[70vh] w-full items-center justify-center text-lg font-bold gradient_color ">
              {t("pdf_previewer.load.load")}
              <Loader
                size={32}
                className="animate-spin text-[var(--Personal-colors-main)]"
              />
            </div>
          }
          error={
            <div className="flex h-[70vh] w-full items-center justify-center text-destructive text-lg font-bold">
              {t("pdf_previewer.load.fail")}
            </div>
          }
          className="flex flex-col gap-4"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div
              key={index}
              ref={(el) => (pagesRef.current[index] = el)}
              className="flex items-center justify-center scroll-snap-start"
            >
              <Page
                pageNumber={index + 1}
                width={pageWidth}
                loading={""}
                error={""}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="!p-0 overflow-hidden frame"
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
};
