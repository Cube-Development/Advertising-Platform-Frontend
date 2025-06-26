import { PROFILE_STATUS, PROFILE_TYPE } from "@entities/wallet";

export interface ILegalData {
  type_legal?: number;
  name: string;
  address?: string;
  INN?: number;
  checking_account?: string;
  bank_name: string;
  bank_mfo: number;
  phone: string;
  email: string;
  PNFL?: number;
  registration_number?: number;
  registration_date?: string;
  transit_account?: string;
  card_number?: number;
  card_date?: string;
  profileFilter: {
    type: PROFILE_TYPE;
    id?: PROFILE_STATUS;
  };
}
