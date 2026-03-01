import { Certificate } from "@shared/api";
import { ENUM_DIGITAL_LOGIN_TYPE } from "./digital-auth.enum";

export interface IDidoxPasswordData {
  password: string;
  PNFL: number;
}

export interface IDidoxCertificateData {
  certificate: Certificate | null;
}

export interface IDidoxFormData
  extends IDidoxPasswordData, IDidoxCertificateData {
  digitalLoginType: ENUM_DIGITAL_LOGIN_TYPE;
}
