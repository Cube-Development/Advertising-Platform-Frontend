import { useClearCookiesOnPage } from "@shared/hooks";
import { CustomTitle, PdfPreview } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

const url = import.meta.env.VITE_SERVICE_RULES_FILE_URL;

export const ServiceRulesPage: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  return (
    <section className="container">
      <div className={styles.wrapper}>
        <CustomTitle
          title={t("service_rules_page.title")}
          variant="primary"
          truncate={false}
        />
        <div>
          <PdfPreview pdfUrl={url} filename="BLOGIX Service rules" />
        </div>
      </div>
    </section>
  );
};
