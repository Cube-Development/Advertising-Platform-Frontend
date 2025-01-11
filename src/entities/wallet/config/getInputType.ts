import { formDataLength, ILegalData, legalData } from "@entities/wallet";
import { HTMLInputTypeAttribute } from "react";

export function getInputLegalType(
  inputType: keyof ILegalData,
): HTMLInputTypeAttribute {
  switch (inputType) {
    case legalData.type_legal:
    case legalData.INN:
    case legalData.bank_mfo:
    case legalData.PNFL:
    case legalData.registration_number:
    case legalData.card_number:
    case legalData.transit_account:
    case legalData.checking_account:
      return "text";
    case legalData.name:
    case legalData.address:
    case legalData.bank_name:
    case legalData.registration_date:
      return "text";
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

export function getInputLegalLength(inputType: keyof ILegalData): number {
  switch (inputType) {
    case legalData.type_legal:
      return formDataLength.type_legal;
    case legalData.INN:
      return formDataLength.INN;
    case legalData.bank_mfo:
      return formDataLength.bank_mfo;
    case legalData.PNFL:
      return formDataLength.PNFL;
    case legalData.registration_number:
      return formDataLength.registration_number;
    case legalData.card_number:
      return formDataLength.card_number;
    case legalData.name:
      return formDataLength.name;
    case legalData.address:
      return formDataLength.address;
    case legalData.checking_account:
      return formDataLength.account;
    case legalData.bank_name:
      return formDataLength.bank_name;
    case legalData.registration_date:
      return formDataLength.registration_date;
    case legalData.transit_account:
      return formDataLength.account;
    case legalData.card_date:
      return formDataLength.card_date;
    case legalData.email:
      return formDataLength.email;
    case legalData.phone:
      return formDataLength.phone;
    default:
      return formDataLength.default;
  }
}
