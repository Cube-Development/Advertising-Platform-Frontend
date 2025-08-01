import {
  ENUM_DOCUMENT_STATUS,
  ENUM_DOCUMENT_STATUS_TAB,
  ENUM_DOCUMENT_TYPE,
} from "./documents.enum";

export interface IGetDocumentEDORequest {
  owner?: 0 | 1; // 1 - исходящие, 0 - входящие
  page?: number; // 1..∞
  limit?: number; // 1..100

  // Даты (в формате yyyy-mm-dd), необязательные
  dateFromCreated?: string;
  dateToCreated?: string;
  dateFromUpdated?: string;
  dateToUpdated?: string;
  signDateFrom?: string;
  signDateTo?: string;

  doctype?: ENUM_DOCUMENT_TYPE; // Тип документа (например, "001", "005" и т.п.)
  name?: string; // Номер документа
  sum?: number; // Сумма документа

  docDateFromCreated?: string;
  docDateToCreated?: string;

  contractName?: string; // Номер договора
  contractDate?: string; // Дата договора (yyyy-mm-dd)

  hasCommittent?: 0 | 1; // Комиссионерский документ
  hasLgota?: 0 | 1; // Документ с льготой
  hasMarks?: 0 | 1; // Документ с маркировкой
  oneSide?: 0 | 1; // Односторонний документ

  status?: string; // Статус документа
}

export interface IDocumentsForm extends IGetDocumentEDORequest {
  tabStatus: ENUM_DOCUMENT_STATUS_TAB;
  categoryStatus: ENUM_DOCUMENT_STATUS[];
  signStatus: ENUM_DOCUMENT_STATUS[];
}

export interface IGetDocumentEDOResponse {
  data: IDocumentEDO[];
  total: number;
  next_page_url: string | null;
  source: string;
  isLast?: boolean; // Опционально, для указания последней страницы
}

export interface IDocumentEDO {
  pid: number;
  doc_id: string;
  usersTaxId: string;
  name: string;
  doc_date: string;
  doc_status: ENUM_DOCUMENT_STATUS;
  doctype: ENUM_DOCUMENT_TYPE;
  contract_number: string;
  contract_date: string;
  owner: number;
  agent: number;
  partnerTin: string;
  partnerAllowProposals: number;
  partnerCompany: string;
  partnerPhone: string;
  total_sum: number;
  total_delivery_sum: number;
  total_vat_sum: number;
  total_delivery_sum_with_vat: number;
  oneside: number;
  has_committent: number;
  has_vat: boolean;
  has_lgota: number;
  has_marks: number;
  roaming_id: string;
  signed: string;
  updated: string;
  updated_date: string;
  updated_unix: number;
  created: string;
  created_unix: number;
  partiesID: string;
  lgota_codes: string;
  factura_type: number;
  sellerAccount: string;
  status_comment: any;
  internal_status: any;
  internal_comment: any;
  internal_status_alarm: any;
  mark_codes: any;
  branch_num: any;
}

export interface ICreateDocumentEDORequest {
  data: object;
  document: string; // base64 строка документа
}

export interface IGetDocumentEDOToSignResponse {
  data: {
    json: object;
    document: {
      doc_id: string;
      _id: string;
      id: string;
      name: string;
      internal_status: any;
      updated: string;
      created: string;
      doctype: string;
      factura_type: number;
      reverse_calc: boolean;
      authorTaxId: any;
      signature: any;
      additional: Array<any>;
      extended_json: any;
      status_comment: string;
      status: number;
      doc_status: number;
      owner: number;
      internal_comment: any;
      is_creator: number;
      has_edit_restriction: boolean;
    };
    toSign: any;
    isValid: boolean;
    relatedDocuments: Array<any>;
    requestToByResponse: any;
  };
}
