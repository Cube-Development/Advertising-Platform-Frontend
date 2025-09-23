import { Certificate } from "@shared/api";
import { parseCertificateAlias } from "./parce-certificate-alias";

export const filterCertificates = (
  certificates: Certificate[],
  pnfl: string | undefined,
  inn: string | undefined,
): Certificate[] => {
  if (pnfl) {
    const certificate = certificates?.find((certificate) => {
      const {
        pnfl: certificatePnfl,
        uid,
        organization,
      } = parseCertificateAlias(certificate.alias);
      
      // Если в сертификате есть организация, то сверяем только по ИНН организации
      if (!!organization) return uid === inn;

      // Если организации нет, то одновременно сверяем по ПНФЛ и ИНН
      return certificatePnfl === pnfl && uid === inn;
    });
    if (!certificate) return [];

    return [certificate];
  }
  return certificates;
};
