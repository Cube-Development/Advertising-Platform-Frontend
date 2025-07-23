import { PROFILE_STATUS, PROFILE_TYPE } from "@entities/wallet";
import { Certificate } from "@shared/api";
import {
  ENUM_DIGITAL_LOGIN_TYPE,
  ENUM_DIGITAL_SIGNATURE_AUTH,
} from "./digital-auth.enum";

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
  password?: string;
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

export interface IDigitalAuthData {
  certificate: Certificate | null;
  digitalAuthType: ENUM_DIGITAL_SIGNATURE_AUTH;
  digitalLoginType: ENUM_DIGITAL_LOGIN_TYPE;
}

export interface IDigitalFormData extends ILegalData, IDigitalAuthData {}
