export const enum topup {
  commission = 3,
  min = 50000,
  max = 1000000000,
}

export const enum withdrawal {
  commission = 3,
  min = 50000,
  max = 1000000000,
}

export enum paymentTypes {
  payme = "payme",
  click = "click",
  didox = "didox",
}

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
