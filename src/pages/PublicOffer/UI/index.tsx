import { useClearCookiesOnPage } from "@shared/hooks";
import { FC } from "react";
import styles from "./styles.module.scss";

import { CustomTitle, PdfPreview } from "@shared/ui";
import { useTranslation } from "react-i18next";

const url =
  import.meta.env.VITE_PUBLIC_OFFER_FILE_URL ||
  "https://nui4ea25hw.ufs.sh/f/3yHpL8ecIjWBGAqcY0yiv8MmkAOcS96R5lIUntwWZheLzdxg";

export const PublicOfferPage: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  return (
    <section className="container">
      <div className={styles.wrapper}>
        <CustomTitle
          title={t("public_offer_page.title")}
          variant="primary"
          truncate={false}
        />
        <div>
          <PdfPreview pdfUrl={url} filename="BLOGIX Public offer" />
        </div>
      </div>
    </section>
  );
};
