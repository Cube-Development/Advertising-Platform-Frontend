import { Certificate } from "@shared/api";
import { parseCertificateAlias } from "./parce-certificate-alias";

export const filterCertificates = (
  certificates: Certificate[],
  pnfl: string | undefined,
): Certificate[] => {
  if (pnfl) {
    const certificate = certificates?.find(
      (certificate) => parseCertificateAlias(certificate?.alias)?.pnfl === pnfl,
    );

    if (!certificate) return [];

    return [certificate];
  }
  return certificates;
};
