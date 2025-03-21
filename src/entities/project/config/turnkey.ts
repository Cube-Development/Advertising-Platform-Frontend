export enum TarifTypes {
  base = "base",
  standard = "standard",
  complex = "complex",
}

export enum TarifIndex {
  base = 1,
  standard = 2,
  complex = 3,
}

export enum TarifPrice {
  base = 1250000,
  standard = 5500000,
  complex = 15300000,
}

interface ITarifParameter {
  type: TarifTypes;
  index: TarifIndex;
  price: TarifPrice;
}

export const TarifParameters: ITarifParameter[] = [
  { type: TarifTypes.base, index: TarifIndex.base, price: TarifPrice.base },
  {
    type: TarifTypes.standard,
    index: TarifIndex.standard,
    price: TarifPrice.standard,
  },
  {
    type: TarifTypes.complex,
    index: TarifIndex.complex,
    price: TarifPrice.complex,
  },
];

export enum tarifData {
  // back  data
  tariff_ident = "tariff_ident",
  comment = "comment",
  links = "links",
  attached_files = "attached_files",
  //front data
  url = "url",
  files = "files",
  dragActive = "dragActive",
  isTarifBought = "isTarifBought",
  isHaveBalance = "isHaveBalance",
  isDropFile = "isDropFile",
  uploadProgress = "uploadProgress",
}
