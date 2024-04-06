export interface IProfileData {
  type_legal?: number;
  name: string;
  address: string;
  INN: number;
  checking_account: string;
  bank_name: string;
  bank_mfo: number;
  phone: string;
  email: string;
  PNFL: number;
  registration_number: number;
  registration_date: string;
  transit_account: string;
  card_number: number;
  card_date: string;
}

// export interface IProfileData {
//   type_legal?: number;
//   name: string;
//   address?: string;
//   INN?: number;
//   checking_account?: string;
//   bank_name: string;
//   bank_mfo: number;
//   phone: string;
//   email: string;
//   PNFL?: number;
//   registration_numbe?: number;
//   registration_date?: string;
//   transit_account?: string;
//   card_number?: number;
//   card_date?: string;
// }

export interface ILegalCardShort {
  legal_id: string;
  type_legal: number;
  name: string;
  INN?: number;
  PNFL?: number;
}

export interface ILegalCard extends IProfileData {
  user_id: string;
  legal_id: string;
}
