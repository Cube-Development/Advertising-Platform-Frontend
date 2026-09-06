import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface IOfdCheckLinkProps {
  url?: string | null;
}

const toValidUrl = (value?: string | null): string | undefined => {
  const trimmed = value?.trim();
  return trimmed || undefined;
};

export const OfdCheckLink: FC<IOfdCheckLinkProps> = ({ url }) => {
  const { t } = useTranslation();
  const ofdUrl = toValidUrl(url);

  if (!ofdUrl) return null;

  return (
    <a
      href={ofdUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      {t("wallet_history.tab.ofd_check")}
    </a>
  );
};
