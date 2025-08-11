export interface ParsedCertificateInfo {
  cn: string;
  name: string;
  surname: string;
  location: string;
  region: string;
  organization: string;
  pnfl: string;
  uid: string | null;
  validFrom: string;
  validTo: string;
}

export interface IGetTimestampRequest {
  pkcs7: string;
  signatureHex: string;
}

export interface IGetTimestampResponse {
  success: boolean;
  isAttachedPkcs7?: boolean;
  timeStampTokenB64: string;
}

export interface IGetTokenRequest {
  PNFL: number | string;
  lang: "ru" | "uz";
  signature?: string;
  password?: string;
}

export interface IGetTokenResponse {
  token: string;
  related_companies?: string[] | null;
  related_branches?: string[] | null;
  taxId?: string[];
}

export interface IGetAccountEDO {
  mobile: string;
  email: string;
  notifications: 0 | 1;
  messengers: string[];
}

export interface ISignUpRequest {
  mobile: string;
  email: string;
  password: string;
  accept: boolean;
  signature: string;
}

export interface IGetProfileEDO {
  vatRate: any;
  fullName: string;
  shortName: string;
  itemReleasedFio: any;
  itemReleasedPinfl: any;
  vat: number;
  excise: number;
  logo: any;
  account: any;
  bankCode: string;
  oked: any;
  address: string;
  regionId: number;
  districtId: string;
  phone: string;
  mobile: string;
  email: string;
  accountant: any;
  director: any;
  directorTin: any;
  directorPinfl: any;
  notifications: number;
  isPremium: number;
  additionalAccounts: Array<any>;
  mfo: any;
  additionalMfos: Array<any>;
  company: string;
  vatRegCode: any;
  pinfl: string;
  partner: any;
  origin: any;
  incomingDraftsVisibility: any;
  autofillDocThruContractId: boolean;
  type: any;
  types: any;
  useCodesFromDb: boolean;
  allowProposals: number;
  isDidoxS: any;
  accountantPinfl: any;
  balance: number;
  blockAds: number;
  itemreleasedoptions: Array<any>;
  shouldShowGiftMessage: boolean;
  supplierPermissions: Array<any>;
  shouldUseDocumentsHistory: boolean;
  updates: Array<any>;
  tin: string;
  name: string;
  VATRegStatus: number;
  vatCode: any;
  offerSigned: number;
  messengers: {
    telegram: string;
  };
}
