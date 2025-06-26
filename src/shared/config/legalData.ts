import { HTMLInputTypeAttribute } from "react";

export enum formDataLength {
  type_legal = 20,
  name = 255,
  address = 255,
  INN = 9,
  account = 20,
  bank_name = 255,
  bank_mfo = 5,
  phone = 12,
  email = 50,
  email_code = 6,
  PNFL = 14,
  registration_number = 20,
  registration_date = 20,
  card_number = 20,
  card_date = 20,
  default = 20,
  amount = 10,
}

export enum legalData {
  type_legal = "type_legal",
  name = "name",
  address = "address",
  INN = "INN",
  checking_account = "checking_account",
  bank_name = "bank_name",
  bank_mfo = "bank_mfo",
  phone = "phone",
  email = "email",
  PNFL = "PNFL",
  registration_number = "registration_number",
  registration_date = "registration_date",
  transit_account = "transit_account",
  card_number = "card_number",
  card_date = "card_date",
  amount = "amount",
}

export function getInputLegalType(inputType: string): HTMLInputTypeAttribute {
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

export function getInputLegalLength(inputType: string): number {
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
      return formDataLength.phone + 1;
    default:
      return formDataLength.default;
  }
}
