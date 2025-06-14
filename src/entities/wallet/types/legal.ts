import { PROFILE_TYPE, PROFILE_STATUS, SUBPROFILE_TYPE } from "../config";

export interface IExtendedProfileData extends ILegalData {
  amount: string;
  is_fee_included?: boolean;
}

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
  subprofileFilter: {
    type: SUBPROFILE_TYPE;
    id: PROFILE_STATUS;
  };
}

export interface ILegalCardShort {
  legal_id: string;
  type_legal: number;
  name: string;
  INN?: number;
  PNFL?: number;
}

export interface ILegalCard extends ILegalData {
  user_id: string;
  legal_id: string;
}

export interface IBlockData {
  title: string;
  parameters: IRowData[];
}

export interface IRowData {
  label: string;
  type: keyof ILegalData;
  validate: {
    required: string;
    validate?: any;
    onChange?: any;
  };
}

export interface IParameterData {
  title: string;
  default_value?: string;
  description: string;
}
