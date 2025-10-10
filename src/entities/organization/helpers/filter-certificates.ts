import { Certificate } from "@shared/api";
import { parseCertificateAlias } from "./parce-certificate-alias";

export const filterCertificates = (
  certificates: Certificate[],
  pnfl: string | undefined,
  inn: string | undefined,
): Certificate[] => {
  if (!certificates?.length) return [];

  const filteredCertificates: Certificate[] = [];

  certificates.forEach((certificate) => {
    const {
      pnfl: certificatePnfl,
      uid: certificateInn, // Теперь это ИНН из любого поля
      organization,
    } = parseCertificateAlias(certificate.alias);

    console.log("Certificate analysis:", {
      name: certificate.name,
      organization,
      certificatePnfl,
      certificateInn,
      providedPnfl: pnfl,
      providedInn: inn,
    });

    // Первый уровень фильтрации: ищем совпадения по ПИНФЛ или ИНН
    let hasFirstLevelMatch = false;

    // Проверяем совпадение ПИНФЛ
    if (pnfl && certificatePnfl === pnfl) {
      hasFirstLevelMatch = true;
    }

    // Проверяем совпадение ИНН
    if (inn && certificateInn === inn) {
      hasFirstLevelMatch = true;
    }

    if (!hasFirstLevelMatch) {
      console.log(
        "❌ Certificate not matched (first level):",
        certificate.name,
      );
      return;
    }

    // Второй уровень фильтрации: строгая проверка
    let hasSecondLevelMatch = false;

    if (inn && pnfl) {
      // Если есть и ИНН и ПИНФЛ - проверяем совпадения
      const pnflMatch = certificatePnfl === pnfl;
      const innMatch = certificateInn === inn;

      // Если в сертификате есть и ИНН и ПИНФЛ - требуем совпадение по ОБОИМ
      if (certificateInn && certificatePnfl) {
        if (pnflMatch && innMatch) {
          hasSecondLevelMatch = true;
          console.log(
            "✅ Certificate matched (both INN and PINFL in cert):",
            certificate.name,
          );
        } else {
          console.log(
            "❌ Certificate not matched (need both INN and PINFL in cert):",
            certificate.name,
            {
              pnflMatch,
              innMatch,
              certificatePnfl,
              certificateInn,
              providedPnfl: pnfl,
              providedInn: inn,
            },
          );
        }
      } else {
        // Если в сертификате нет ИНН или ПИНФЛ - достаточно совпадения по одному из параметров
        if (pnflMatch || innMatch) {
          hasSecondLevelMatch = true;
          console.log(
            "✅ Certificate matched (partial match - cert missing some data):",
            certificate.name,
            {
              pnflMatch,
              innMatch,
              certificatePnfl,
              certificateInn,
              providedPnfl: pnfl,
              providedInn: inn,
            },
          );
        } else {
          console.log(
            "❌ Certificate not matched (no partial match):",
            certificate.name,
          );
        }
      }
    } else if (inn && !pnfl) {
      // Если есть только ИНН - ищем совпадение только по ИНН
      if (certificateInn === inn) {
        hasSecondLevelMatch = true;
        console.log("✅ Certificate matched (INN only):", certificate.name);
      } else {
        console.log("❌ Certificate not matched (INN only):", certificate.name);
      }
    } else if (pnfl && !inn) {
      // Если есть только ПИНФЛ - ищем совпадение только по ПИНФЛ
      if (certificatePnfl === pnfl) {
        hasSecondLevelMatch = true;
        console.log("✅ Certificate matched (PINFL only):", certificate.name);
      } else {
        console.log(
          "❌ Certificate not matched (PINFL only):",
          certificate.name,
        );
      }
    }

    if (hasSecondLevelMatch) {
      filteredCertificates.push(certificate);
    }
  });

  console.log("Filtered certificates:", filteredCertificates.length);
  return filteredCertificates;
};
