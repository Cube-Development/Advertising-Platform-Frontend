import type { IQrCodeUrl } from "@entities/project";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ISeeOfdQrProps {
  qrCodeUrl?: IQrCodeUrl | null;
}

const toValidUrl = (value?: string | null): string | undefined => {
  const url = value?.trim();
  return url || undefined;
};

export const SeeOfdQr: FC<ISeeOfdQrProps> = ({ qrCodeUrl }) => {
  const { t } = useTranslation();
  const saleCheck = toValidUrl(qrCodeUrl?.sale_check);
  const refundSaleCheck = toValidUrl(qrCodeUrl?.refund_sale_check);

  if (!saleCheck && !refundSaleCheck) return null;

  return (
    <div className={styles.wrapper}>
      {saleCheck && (
        <a
          href={saleCheck}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {t("order_btn.ofd.sale_check")}
        </a>
      )}
      {refundSaleCheck && (
        <a
          href={refundSaleCheck}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {t("order_btn.ofd.refund_sale_check")}
        </a>
      )}
    </div>
  );
};
