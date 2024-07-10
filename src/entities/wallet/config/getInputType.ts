import { ILegalData, legalData } from "@entities/wallet";

export function getInputLegalType(inputType: keyof ILegalData): string {
  switch (inputType) {
    case legalData.type_legal:
    case legalData.INN:
    case legalData.bank_mfo:
    case legalData.PNFL:
    case legalData.registration_number:
    case legalData.card_number:
      return "number";
    case legalData.name:
    case legalData.address:
    case legalData.checking_account:
    case legalData.bank_name:
    case legalData.registration_date:
    case legalData.transit_account:
    case legalData.card_date:
      return "text";
    case legalData.email:
      return "email";
    case legalData.phone:
      return "tel";
    default:
      return "text";
  }
}
