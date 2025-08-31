import { Certificate } from "@shared/api";
import { parseCertificateAlias } from "./parce-certificate-alias";

export const filterCertificates = (
  certificates: Certificate[],
  pnfl: string | undefined,
  inn: string | undefined,
): Certificate[] => {
  if (pnfl) {
    const certificate = certificates?.find((certificate) => {
      const { pnfl: certificatePnfl, uid } = parseCertificateAlias(
        certificate.alias,
      );
      return certificatePnfl === pnfl || uid === inn;
    });
    if (!certificate) return [];

    return [certificate];
  }
  return certificates;
};
